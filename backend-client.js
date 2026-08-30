/*
 * ScorePath Practice — thin client for the two server-side Cloud Functions
 * in functions/index.js (getAssignmentQuestions, submitAnswer).
 *
 * Requires firebase-init.js to have run first (it will `await` its
 * readiness promise if present). Only meaningful once a real Firebase
 * project is configured AND the Cloud Functions are deployed — callers
 * should check `ScorePathRealtime.isCloudSynced` first and fall back to
 * local grading against the local bank when it's false, exactly like every
 * other Firebase-gated feature in this project. This file does nothing on
 * its own; it only exposes the two calls for student-room.html to use.
 */
window.ScorePathBackend = (function () {
  async function ensureFunctions() {
    if (window.ScorePathFirebaseReady) await window.ScorePathFirebaseReady;
    if (!window.firebase || typeof window.firebase.functions !== 'function') {
      throw new Error('Firebase Functions SDK is not loaded/configured.');
    }
    return window.firebase.functions();
  }

  return {
    async getAssignmentQuestions(payload) {
      const functions = await ensureFunctions();
      const call = functions.httpsCallable('getAssignmentQuestions');
      const res = await call(payload);
      return res.data;
    },
    async submitAnswer(payload) {
      const functions = await ensureFunctions();
      const call = functions.httpsCallable('submitAnswer');
      const res = await call(payload);
      return res.data;
    },
  };
})();
