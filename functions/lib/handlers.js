/*
 * Pure business logic for the two callable functions, decoupled from the
 * Firebase Functions Framework transport layer so it can be unit-tested
 * with a plain in-memory `db` stand-in (see functions/test/handlers.test.js)
 * without needing a live Firestore project or the emulator.
 *
 * `db` must implement the small subset of the Admin Firestore API these
 * handlers use: db.collection(name).where(field,'==',val).get(),
 * db.collection(name).doc(id).get(), db.collection(name).doc(id).set(data).
 * The real firebase-admin Firestore instance satisfies this already.
 */
const {
  selectQuestions,
  selectQuestionsBalanced,
  difficultyTally,
  parseCount,
  shuffleChoicesForAssignment,
} = require('./pick');

const EXAMS = ['SAT', 'ACT', 'TSIA2'];
const MAX_COUNT = 40;
const MIN_COUNT = 4;

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

function makeHandlers(db, { serverTimestamp } = {}) {
  async function getAssignmentQuestions(data) {
    data = data || {};
    assertNonEmptyString(data.roomCode, 'roomCode');
    assertNonEmptyString(data.studentId, 'studentId');
    if (!EXAMS.includes(data.examKey)) {
      throw new HandlerError('invalid-argument', 'examKey must be one of ' + EXAMS.join(', '));
    }
    const n = Math.max(MIN_COUNT, Math.min(MAX_COUNT, parseCount(String(data.count || ''))));
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
      picked = selectQuestionsBalanced(bank, n, 'student-' + data.studentId, targetCounts);
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
        updatedAt: serverTimestamp ? serverTimestamp() : Date.now(),
      });

    return { questions: sanitized };
  }

  async function submitAnswer(data) {
    data = data || {};
    assertNonEmptyString(data.roomCode, 'roomCode');
    assertNonEmptyString(data.studentId, 'studentId');
    assertNonEmptyString(data.qid, 'qid');
    if (!EXAMS.includes(data.examKey)) {
      throw new HandlerError('invalid-argument', 'examKey must be one of ' + EXAMS.join(', '));
    }
    if (!Number.isInteger(data.choiceIndex) || data.choiceIndex < 0 || data.choiceIndex > 3) {
      throw new HandlerError('invalid-argument', 'choiceIndex must be an integer 0-3.');
    }

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

  return { getAssignmentQuestions, submitAnswer };
}

module.exports = { makeHandlers, HandlerError, EXAMS };
