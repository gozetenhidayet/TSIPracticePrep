/*
 * Pure business logic for the callable functions, decoupled from the
 * Firebase Functions Framework transport layer so it can be unit-tested
 * with a plain in-memory `db` stand-in (see functions/test/handlers.test.js)
 * without needing a live Firestore project or the emulator.
 *
 * `db` must implement the small subset of the Admin Firestore API these
 * handlers use: db.collection(name).where(field,'==',val).get(),
 * db.collection(name).doc(id).get(), db.collection(name).doc(id).set(data).
 * The real firebase-admin Firestore instance satisfies this already.
 *
 * Access model (added in the pass that also fixed the ACT section-weight
 * bug — see README's "Thirty-sixth pass"): before this, both
 * getAssignmentQuestions and submitAnswer accepted any roomCode/studentId
 * a caller sent, with no check that the caller was signed in, no check
 * that studentId was actually THEIR id, and no check that the room had
 * ever been created by a real teacher. Any client that knew the two
 * function names could invoke them directly with made-up values — the
 * exact gap BACKEND-SETUP.md's "What this does NOT cover" section already
 * disclosed ("No rate limiting or abuse protection... unauthenticated
 * random student ID..."). Now:
 *   - Every call requires a real Firebase Auth identity (`request.auth`) —
 *     teachers via real email/password (teacher-auth.js), students via
 *     anonymous auth (student-auth.js). Neither requires the student to
 *     create a real account; anonymous sign-in is silent and instant.
 *   - `data.studentId` must equal the caller's own `auth.uid` — a caller
 *     can no longer request or submit answers under an arbitrary studentId
 *     they didn't authenticate as.
 *   - `getAssignmentQuestions`/`submitAnswer` both require the room to
 *     exist in the `rooms` collection and be `active` — rooms are only
 *     ever created by `createRoom` (which itself requires a real signed-in
 *     caller) and closed by `endRoom`. A room that was never created, or
 *     was already ended, is rejected before any question ever gets read.
 *   - A simple per-caller rate limit on getAssignmentQuestions (the one
 *     call that reads real bank content) slows down a single identity
 *     scripting repeated calls to harvest the bank faster than one real
 *     student would ever need to.
 * This is a meaningful floor, not a ceiling — it does not replace Firebase
 * App Check (still a reasonable next step, still not added here; see
 * BACKEND-SETUP.md) and the rate limiter below is a plain read-then-write
 * counter, not an atomic transaction, so it's a deterrent against casual
 * scripted abuse, not a hard guarantee under concurrent requests from the
 * same identity.
 */
const {
  selectQuestions,
  selectQuestionsBalanced,
  difficultyTally,
  parseCount,
  shuffleChoicesForAssignment,
  FULL_SECTION_COUNTS,
} = require('./pick');

const EXAMS = ['SAT', 'ACT', 'TSIA2'];
const MAX_COUNT = 40;
const MIN_COUNT = 4;

// getAssignmentQuestions rate limit: generous enough that no real student
// or "Different Questions" classroom of ~35 ever hits it in normal use,
// tight enough to stop a script from repeatedly re-requesting fresh sets
// to slowly harvest the bank under one identity.
const ASSIGNMENT_RATE_LIMIT = 20;
const ASSIGNMENT_RATE_WINDOW_MS = 60 * 1000;

class HandlerError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code; // maps to an HttpsError code in index.js
  }
}

function assertNonEmptyString(v, name) {
  if (typeof v !== 'string' || !v.trim()) {
    throw new HandlerError('invalid-argument', `${name} must be a non-empty string.`);
  }
}

function assertAuthed(auth) {
  if (!auth || !auth.uid) {
    throw new HandlerError('unauthenticated', 'Sign in (a teacher account, or the automatic anonymous student session) is required.');
  }
  return auth.uid;
}

function assertOwnStudentId(data, auth) {
  const uid = assertAuthed(auth);
  assertNonEmptyString(data.studentId, 'studentId');
  if (data.studentId !== uid) {
    throw new HandlerError('permission-denied', 'studentId must match your own signed-in session.');
  }
  return uid;
}

/* Fifty-ninth pass: createRoom used to only call assertAuthed — ANY signed-in
 * identity, including the automatic anonymous session every student gets
 * from student-auth.js, could create a room. This app only ever produces
 * two kinds of signed-in identity: a real teacher (teacher-auth.js, real
 * email/password sign-in) or an anonymous student (student-auth.js,
 * signInAnonymously()). Firebase Auth's own ID token always records which
 * provider produced it (token.firebase.sign_in_provider === 'anonymous' for
 * the student case) — checking that a caller is NOT anonymous is therefore
 * a real, immediately-usable teacher-role check with no new schema, custom
 * claim, or Firestore profile lookup needed. Fails closed: an unrecognized
 * or missing provider is rejected, not allowed through. */
function assertTeacher(auth) {
  const uid = assertAuthed(auth);
  const provider = auth.token && auth.token.firebase && auth.token.firebase.sign_in_provider;
  if (!provider || provider === 'anonymous') {
    throw new HandlerError(
      'permission-denied',
      'A signed-in teacher account (not an anonymous student session) is required to create a room.'
    );
  }
  return uid;
}

function sanitizeForClient(q) {
  return {
    id: q.id,
    section: q.section || '',
    skill: q.skill || '',
    difficulty: q.difficulty || 'Medium',
    passage: q.passage || null,
    q: q.q || '',
  };
}

function makeHandlers(db, { serverTimestamp, now } = {}) {
  const clock = now || (() => Date.now());

  async function requireActiveRoom(roomCode) {
    assertNonEmptyString(roomCode, 'roomCode');
    const snap = await db.collection('rooms').doc(roomCode).get();
    const room = snap.exists ? snap.data() : null;
    if (!room || room.active !== true) {
      throw new HandlerError('failed-precondition', 'This room does not exist or is no longer active.');
    }
    return room;
  }

  async function checkAssignmentRateLimit(uid) {
    const key = uid + '_getAssignmentQuestions';
    const ref = db.collection('rateLimits').doc(key);
    const snap = await ref.get();
    const existing = snap.exists ? snap.data() : null;
    const nowMs = clock();
    let count = 1;
    let windowStart = nowMs;
    if (existing && typeof existing.windowStart === 'number' && nowMs - existing.windowStart < ASSIGNMENT_RATE_WINDOW_MS) {
      windowStart = existing.windowStart;
      count = (existing.count || 0) + 1;
      if (count > ASSIGNMENT_RATE_LIMIT) {
        throw new HandlerError('resource-exhausted', 'Too many assignment requests — please wait a minute and try again.');
      }
    }
    await ref.set({ count, windowStart });
  }

  async function createRoom(data, auth) {
    data = data || {};
    const uid = assertTeacher(auth);
    assertNonEmptyString(data.roomCode, 'roomCode');
    if (!EXAMS.includes(data.examKey)) {
      throw new HandlerError('invalid-argument', 'examKey must be one of ' + EXAMS.join(', '));
    }
    const ref = db.collection('rooms').doc(data.roomCode);
    const existing = await ref.get();
    if (existing.exists && existing.data().active === true) {
      throw new HandlerError('already-exists', 'That room code is already in use — try again for a new code.');
    }
    await ref.set({
      teacherUid: uid,
      examKey: data.examKey,
      active: true,
      createdAt: serverTimestamp ? serverTimestamp() : clock(),
    });
    return { roomCode: data.roomCode };
  }

  async function endRoom(data, auth) {
    data = data || {};
    const uid = assertAuthed(auth);
    assertNonEmptyString(data.roomCode, 'roomCode');
    const ref = db.collection('rooms').doc(data.roomCode);
    const snap = await ref.get();
    const room = snap.exists ? snap.data() : null;
    if (!room) return { ended: true }; // already gone — treat as success, nothing to close
    if (room.teacherUid !== uid) {
      throw new HandlerError('permission-denied', 'Only the teacher who created this room can end it.');
    }
    await ref.set(Object.assign({}, room, { active: false, endedAt: serverTimestamp ? serverTimestamp() : clock() }));
    return { ended: true };
  }

  async function getAssignmentQuestions(data, auth) {
    data = data || {};
    const uid = assertOwnStudentId(data, auth);
    if (!EXAMS.includes(data.examKey)) {
      throw new HandlerError('invalid-argument', 'examKey must be one of ' + EXAMS.join(', '));
    }
    const room = await requireActiveRoom(data.roomCode);
    // Fifty-ninth pass: the room's own stored examKey (set once, at
    // createRoom, and never client-controlled again) used to be fetched
    // here and then simply discarded — nothing compared it to the
    // examKey the CALLER sent on this request. A student sitting in a
    // room the teacher created as SAT could pass examKey:"ACT" (or
    // "TSIA2") and be served that other bank instead, mid-room. The
    // room's exam is the source of truth; a request for any other exam
    // in that room is rejected before it ever reaches Firestore.
    if (room.examKey !== data.examKey) {
      throw new HandlerError(
        'failed-precondition',
        `This room was created for ${room.examKey}, not ${data.examKey}.`
      );
    }
    await checkAssignmentRateLimit(uid);

    // Fifty-ninth pass: MAX_COUNT=40 used to cap every request unconditionally,
    // which silently truncated a legitimate "Full section" request (98 SAT /
    // 131 ACT / 44 TSIA2 — see parseCount's new examKey-aware handling in
    // ./pick) down to whatever fit under 40. The teacher-facing count
    // selector is a fixed 4-option dropdown (10/20/30 questions or "Full
    // section" — never free text), so raising the effective cap specifically
    // to that exam's own real full-section size for a genuine Full section
    // request is safe: it can never be abused to ask for more than the exam
    // actually has.
    const effectiveMax = Math.max(MAX_COUNT, FULL_SECTION_COUNTS[data.examKey] || 0);
    const n = Math.max(MIN_COUNT, Math.min(effectiveMax, parseCount(String(data.count || ''), data.examKey)));
    const mode = data.mode === 'same' ? 'same' : 'different';

    const snap = await db.collection('questions').where('examKey', '==', data.examKey).get();
    const bank = snap.docs.map((d) => d.data());
    if (!bank.length) {
      throw new HandlerError(
        'failed-precondition',
        `No ${data.examKey} questions found in Firestore — has scripts/upload-bank-to-firestore.js been run?`
      );
    }

    const roomSeed = 'room-' + data.roomCode;
    let picked;
    if (mode === 'same') {
      picked = selectQuestions(bank, n, roomSeed);
    } else {
      const targetCounts = difficultyTally(selectQuestions(bank, n, roomSeed));
      picked = selectQuestionsBalanced(bank, n, 'student-' + data.studentId, targetCounts, data.examKey);
    }

    const assignmentKey = data.roomCode + '_' + data.studentId;
    const items = {};
    const sanitized = picked.map((q) => {
      const docId = data.examKey + '_' + q.id;
      const { choices, permutation } = shuffleChoicesForAssignment(q, data.studentId + '|' + docId);
      items[docId] = permutation;
      return Object.assign(sanitizeForClient(q), { choices });
    });

    await db
      .collection('assignments')
      .doc(assignmentKey)
      .set({
        roomCode: data.roomCode,
        studentId: data.studentId,
        examKey: data.examKey,
        items,
        updatedAt: serverTimestamp ? serverTimestamp() : clock(),
      });

    return { questions: sanitized };
  }

  async function submitAnswer(data, auth) {
    data = data || {};
    assertOwnStudentId(data, auth);
    assertNonEmptyString(data.qid, 'qid');
    if (!EXAMS.includes(data.examKey)) {
      throw new HandlerError('invalid-argument', 'examKey must be one of ' + EXAMS.join(', '));
    }
    if (!Number.isInteger(data.choiceIndex) || data.choiceIndex < 0 || data.choiceIndex > 3) {
      throw new HandlerError('invalid-argument', 'choiceIndex must be an integer 0-3.');
    }
    await requireActiveRoom(data.roomCode);

    const docId = data.examKey + '_' + data.qid;
    const assignmentKey = data.roomCode + '_' + data.studentId;
    const assignmentSnap = await db.collection('assignments').doc(assignmentKey).get();
    const assignment = assignmentSnap.exists ? assignmentSnap.data() : null;
    const permutation = assignment && assignment.items && assignment.items[docId];
    if (!permutation) {
      throw new HandlerError('permission-denied', 'This question was not part of your assignment.');
    }

    const questionSnap = await db.collection('questions').doc(docId).get();
    if (!questionSnap.exists) {
      throw new HandlerError('not-found', 'Question not found.');
    }
    const question = questionSnap.data();

    const originalChoiceIdx = permutation[data.choiceIndex];
    const correct = originalChoiceIdx === question.a;
    const correctIndex = permutation.indexOf(question.a);
    const why = Array.isArray(question.why) ? question.why[originalChoiceIdx] || '' : '';

    return { correct, correctIndex, explanation: question.ex || '', why };
  }

  return { getAssignmentQuestions, submitAnswer, createRoom, endRoom };
}

module.exports = { makeHandlers, HandlerError, EXAMS, ASSIGNMENT_RATE_LIMIT };
