/*
 * ScorePath — server-side question serving + grading.
 *
 * The point of this file: the real question bank (question text, choices,
 * AND the correct-answer index/explanation/strategy) lives only in
 * Firestore, populated by scripts/upload-bank-to-firestore.js, and is never
 * readable by any client (see firestore.rules — default-deny). A browser
 * only ever learns two things through the two functions below:
 *   1. getAssignmentQuestions — the exact N questions picked for THIS
 *      student's THIS assignment (no answer key, no explanation, no
 *      strategy tip, choices already shuffled) — never the other ~2,770+
 *      unused questions in the bank.
 *   2. submitAnswer — after a student picks a choice for one question,
 *      whether it was correct plus the explanation/rationale for that one
 *      question only — never the full answer key up front.
 *
 * This intentionally mirrors the exact selection algorithm already used
 * client-side in student-room.html (see lib/pick.js) so a room's
 * "Same Questions" vs. "Different Questions" behavior is unchanged — only
 * WHERE the selection runs has moved (server, not the student's browser).
 *
 * Two more callables, createRoom/endRoom, back the real access-control
 * model added alongside them (see lib/handlers.js's own top comment for
 * the full rationale): a room must be created by an authenticated teacher
 * before any student can be served questions in it, and getAssignmentQuestions/
 * submitAnswer both require the caller to be signed in (teacher email/password,
 * or anonymous student — see student-auth.js) as the exact studentId/teacherUid
 * they claim to be.
 *
 * The actual request/response logic lives in lib/handlers.js as plain,
 * transport-agnostic functions (so it can be unit-tested — see
 * test/handlers.test.js — without a live Firestore project). This file is
 * just the thin Callable-Functions wrapper around them.
 *
 * Scope of this pass: the CLASSROOM flow (student-room.html + teachers.html)
 * only. index.html's individual self-practice / adaptive / essay pages
 * still grade client-side against the local bank — migrating those too is
 * a separate, larger follow-on (see BACKEND-SETUP.md).
 */
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { makeHandlers, HandlerError } = require('./lib/handlers');

initializeApp();
const db = getFirestore();
const handlers = makeHandlers(db, { serverTimestamp: () => FieldValue.serverTimestamp() });

function wrap(handlerFn) {
  return onCall({ cors: true }, async (request) => {
    try {
      return await handlerFn(request.data, request.auth);
    } catch (err) {
      if (err instanceof HandlerError) throw new HttpsError(err.code, err.message);
      console.error(err);
      throw new HttpsError('internal', 'Unexpected server error.');
    }
  });
}

exports.getAssignmentQuestions = wrap(handlers.getAssignmentQuestions);
exports.submitAnswer = wrap(handlers.submitAnswer);
exports.createRoom = wrap(handlers.createRoom);
exports.endRoom = wrap(handlers.endRoom);
