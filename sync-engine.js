/*
 * ScorePath Practice — student account sync engine
 *
 * Exposes window.ScorePathSync = { configured, boot(), signIn(), createAccount(), deviceProfile() }
 *
 * Without a real Firebase config (see firebase-config.js), every method
 * that would need a server is honest about it: signIn/createAccount throw
 * a clear, friendly error instead of pretending to create a cloud account.
 * deviceProfile() always works — it's just local storage, no password,
 * no network, matching what student-account.html tells the user.
 */
(function () {
  const LOCAL_KEY = "scorepath_device_profile_v1";
  const FIREBASE_JS_BASE = "https://www.gstatic.com/firebasejs/10.12.2/";
  const CONFIG = window.SCOREPATH_FIREBASE_CONFIG || null;

  let app = null;
  let auth = null;
  let db = null;
  let firebaseReadyPromise = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-scorepath-fb="' + src + '"]');
      if (existing) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.setAttribute("data-scorepath-fb", src);
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }

  async function ensureFirebase() {
    if (!CONFIG) return false;
    if (firebaseReadyPromise) return firebaseReadyPromise;
    firebaseReadyPromise = (async () => {
      try {
        await loadScript(FIREBASE_JS_BASE + "firebase-app-compat.js");
        await loadScript(FIREBASE_JS_BASE + "firebase-auth-compat.js");
        await loadScript(FIREBASE_JS_BASE + "firebase-firestore-compat.js");
        await loadScript(FIREBASE_JS_BASE + "firebase-database-compat.js");
        if (!window.firebase) return false;
        if (!window.firebase.apps.length) app = window.firebase.initializeApp(CONFIG);
        else app = window.firebase.apps[0];
        auth = window.firebase.auth();
        db = window.firebase.firestore();
        return true;
      } catch (e) {
        return false;
      }
    })();
    return firebaseReadyPromise;
  }

  function boot() {
    if (CONFIG) ensureFirebase();
  }

  const NOT_CONFIGURED_MSG =
    'Cloud sync is not configured yet on this deployment. Use "Continue on This Device Only" instead, or ask the site owner to complete the Firebase setup in FIREBASE-SETUP.md.';

  async function signIn(email, password) {
    if (!CONFIG) throw new Error(NOT_CONFIGURED_MSG);
    const ok = await ensureFirebase();
    if (!ok) throw new Error("Could not reach the sync service. Check your connection or use device-only mode.");
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  }

  async function createAccount(email, password, profile) {
    if (!CONFIG) throw new Error(NOT_CONFIGURED_MSG);
    const ok = await ensureFirebase();
    if (!ok) throw new Error("Could not reach the sync service. Check your connection or use device-only mode.");
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    try {
      await db
        .collection("students")
        .doc(cred.user.uid)
        .set({
          firstName: (profile && profile.firstName) || "",
          grade: (profile && profile.grade) || "",
          createdAt: new Date().toISOString(),
        });
    } catch (e) {
      // Account creation still succeeded even if the profile write failed;
      // surface nothing scary to the student here.
    }
    return cred.user;
  }

  function deviceProfile(profile) {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        firstName: (profile && profile.firstName) || "",
        grade: (profile && profile.grade) || "",
        savedAt: new Date().toISOString(),
      })
    );
  }

  function getDeviceProfile() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  window.ScorePathSync = {
    configured: !!CONFIG,
    boot,
    signIn,
    createAccount,
    deviceProfile,
    getDeviceProfile,
  };
})();
