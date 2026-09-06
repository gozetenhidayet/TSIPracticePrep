/*
 * TSI Practice Prep — Firebase SDK loader/initializer.
 *
 * Every other Firebase-touching file in this project (realtime-adapter.js,
 * backend-client.js) checks `window.firebase` at the moment it needs it —
 * but until this file existed, nothing ever actually loaded the Firebase
 * SDK or called `firebase.initializeApp()`, so `window.firebase` never
 * existed even once real credentials were pasted into firebase-config.js.
 * This file is what makes that pasted config actually take effect.
 *
 * Safe by default: if window.SCOREPATH_FIREBASE_CONFIG is still null (the
 * out-of-the-box state), this does nothing at all — no network request,
 * no window.firebase, every feature stays in its local/static fallback
 * mode exactly as before this file existed.
 *
 * Once real config is present, this lazily loads the Firebase compat SDKs
 * from Google's CDN (only once, only when needed — same "don't pay for
 * what you don't use" approach as the lazy-loaded question bank) and
 * exposes `window.ScorePathFirebaseReady`, a promise other scripts can
 * await before touching `window.firebase`.
 */
(function () {
  if (!window.SCOREPATH_FIREBASE_CONFIG) return; // stay fully local/static — nothing to do

  var SDK_VERSION = '10.12.2';
  var BASE = 'https://www.gstatic.com/firebasejs/' + SDK_VERSION + '/';

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  window.ScorePathFirebaseReady = (async function () {
    await loadScript(BASE + 'firebase-app-compat.js');
    // Loaded in parallel: each only matters once the corresponding
    // feature (classroom sync, callable functions, account auth) is
    // actually used, but compat SDKs must load after firebase-app-compat.
    await Promise.all([
      loadScript(BASE + 'firebase-database-compat.js'),
      loadScript(BASE + 'firebase-functions-compat.js'),
      loadScript(BASE + 'firebase-auth-compat.js'),
      loadScript(BASE + 'firebase-firestore-compat.js'),
    ]);
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(window.SCOREPATH_FIREBASE_CONFIG);
    }
    return window.firebase;
  })();
})();
