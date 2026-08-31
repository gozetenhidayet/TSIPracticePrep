/*
 * ScorePath Practice — thin client for the server-side Cloud Functions in
 * functions/index.js (getAssignmentQuestions, submitAnswer, createRoom,
 * endRoom).
 *
 * Requires firebase-init.js to have run first (it will `await` its
 * readiness promise if present). Only meaningful once a real Firebase
 * project is configured AND the Cloud Functions are deployed — callers
 * should check `ScorePathRealtime.isCloudSynced` first and fall back to
 * local grading against the local bank when it's false, exactly like every
 * other Firebase-gated feature in this project. This file does nothing on
 * its own; it only exposes the calls for teachers.html/student-room.html
 * to use.
 *
 * All four functions now require the caller to be signed in (see
 * functions/lib/handlers.js's own comment for why) — the Functions SDK
 * attaches the caller's current Firebase Auth ID token to every
 * httpsCallable() call automatically, so nothing extra is needed here;
 * teacher-auth.js/student-auth.js just need to have actually signed the
 * caller in first.
 */
window.ScorePathBackend = (function () {
  async function ensureFunctions() {
    if (window.ScorePathFirebaseReady) await window.ScorePathFirebaseReady;
    if (!window.firebase || typeof window.firebase.functions !== 'function') {
      throw new Error('Firebase Functions SDK is not loaded/configured.');
    }
    return window.firebase.functions();
  }

  async function call(name, payload) {
    const functions = await ensureFunctions();
    const res = await functions.httpsCallable(name)(payload);
    return res.data;
  }

  return {
    getAssignmentQuestions: (payload) => call('getAssignmentQuestions', payload),
    submitAnswer: (payload) => call('submitAnswer', payload),
    createRoom: (payload) => call('createRoom', payload),
    endRoom: (payload) => call('endRoom', payload),
  };
})();
