/*
 * TSI Practice Prep — anonymous student session (Firebase Auth), gated
 * behind window.SCOREPATH_FIREBASE_CONFIG exactly like every other
 * Firebase-dependent feature in this project.
 *
 * Joining a classroom room has never required a real student account —
 * "Class Code + First Name + Last Initial + Grade" is the whole join flow,
 * on purpose (see teachers.html's own guide). This file does not change
 * that: it silently signs each visitor into an anonymous Firebase Auth
 * session in the background — no form, no password, nothing the student
 * sees or fills in — so the server-side Cloud Functions in
 * functions/index.js have a real `request.auth.uid` to check requests
 * against, instead of trusting a client-picked random ID with no identity
 * behind it at all (see functions/lib/handlers.js's own comment for why
 * that mattered). Before Firebase is configured, `isConfigured` is false
 * and `ensureSignedIn()` resolves to `null` — student-room.html's existing
 * local/unauthenticated random ID keeps working exactly as it does today.
 *
 * Requires Anonymous sign-in to be enabled in the Firebase console (Build →
 * Authentication → Sign-in method → Anonymous) — see BACKEND-SETUP.md.
 */
(function () {
  var isConfigured = !!window.SCOREPATH_FIREBASE_CONFIG;

  async function ready() {
    if (!isConfigured) throw new Error('Firebase is not configured — see BACKEND-SETUP.md.');
    if (window.ScorePathFirebaseReady) await window.ScorePathFirebaseReady;
    if (!window.firebase || typeof window.firebase.auth !== 'function') {
      throw new Error('Firebase Auth SDK did not load.');
    }
    return window.firebase;
  }

  var signInPromise = null;

  /** Resolves to the signed-in Firebase user (creating an anonymous
   * session on first call), or null if Firebase isn't configured. Safe to
   * call repeatedly — the sign-in only actually happens once per page
   * load; later calls reuse the same in-flight/resolved promise. */
  function ensureSignedIn() {
    if (!isConfigured) return Promise.resolve(null);
    if (!signInPromise) {
      signInPromise = ready().then(function (fb) {
        var current = fb.auth().currentUser;
        if (current) return current;
        return fb.auth().signInAnonymously().then(function (cred) { return cred.user; });
      }).catch(function (err) {
        signInPromise = null; // allow a retry on the next call instead of caching a failure forever
        throw err;
      });
    }
    return signInPromise;
  }

  window.ScorePathStudentAuth = {
    isConfigured: isConfigured,
    ensureSignedIn: ensureSignedIn,
  };
})();
