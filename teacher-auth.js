/*
 * TSI Practice Prep — real teacher authentication (Firebase Auth), gated
 * behind window.SCOREPATH_FIREBASE_CONFIG exactly like every other
 * Firebase-dependent feature in this project.
 *
 * Before this file existed, teacher-login.html's Sign In / Create Account
 * buttons did nothing but navigate straight to teachers.html — no account
 * was ever created and no password was ever checked (an honest banner on
 * the page said so). This file makes that real once the site owner has
 * configured a Firebase project; until then, window.ScorePathTeacherAuth
 * still exists but `isConfigured` is false and every page keeps today's
 * exact static-preview behavior.
 *
 * Firebase Authentication itself only stores email + password + an
 * optional display name — it has no field for school name or subject, so
 * on account creation this also writes a small profile document to
 * Firestore at teachers/{uid}. firestore.rules allows a signed-in user to
 * read/write ONLY their own teachers/{uid} document (see the rule added
 * alongside this file) — this is a normal, safe pattern for a user's own
 * profile data and is unrelated to the default-deny rule that protects the
 * real question bank / answer keys.
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

  function friendlyError(err) {
    var code = (err && err.code) || '';
    var map = {
      'auth/invalid-email': 'That email address looks invalid.',
      'auth/user-not-found': 'No teacher account found with that email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-credential': 'Incorrect email or password.',
      'auth/email-already-in-use': 'An account with that email already exists — try signing in instead.',
      'auth/weak-password': 'Choose a password with at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts — please wait a moment and try again.',
      'auth/network-request-failed': 'Network error — check your connection and try again.',
    };
    return map[code] || (err && err.message) || 'Something went wrong. Please try again.';
  }

  async function signIn(email, password) {
    var fb = await ready();
    try {
      var cred = await fb.auth().signInWithEmailAndPassword(String(email || '').trim(), String(password || ''));
      return cred.user;
    } catch (err) {
      throw new Error(friendlyError(err));
    }
  }

  async function signUp(profile) {
    var fb = await ready();
    var email = String((profile && profile.email) || '').trim();
    var password = String((profile && profile.password) || '');
    var firstName = String((profile && profile.firstName) || '').trim();
    var lastName = String((profile && profile.lastName) || '').trim();
    var school = String((profile && profile.school) || '').trim();
    var subject = String((profile && profile.subject) || '').trim();
    var displayName = (firstName + ' ' + lastName).trim();

    var user;
    try {
      var cred = await fb.auth().createUserWithEmailAndPassword(email, password);
      user = cred.user;
      if (displayName && typeof user.updateProfile === 'function') {
        await user.updateProfile({ displayName: displayName });
      }
    } catch (err) {
      throw new Error(friendlyError(err));
    }

    // Best-effort profile write — a teacher account still "works" (they're
    // signed in) even if this particular write fails for some reason, so
    // errors here are logged, not thrown, to avoid stranding a real new
    // account behind a Firestore hiccup.
    try {
      await fb.firestore().collection('teachers').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        school: school,
        subject: subject,
        email: email,
        createdAt: fb.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      if (window.console && console.warn) console.warn('Teacher profile write failed (account still created):', err);
    }

    return user;
  }

  async function signOutUser() {
    if (!isConfigured) return;
    var fb = await ready();
    await fb.auth().signOut();
  }

  /** Resolves with the current Firebase user, or null if signed out /
   * not configured. Waits for Firebase's own auth-state check to settle
   * (onAuthStateChanged fires once immediately with the real state). */
  function currentUser() {
    if (!isConfigured) return Promise.resolve(null);
    return ready().then(function (fb) {
      return new Promise(function (resolve) {
        // onAuthStateChanged is NOT guaranteed to fire asynchronously (some
        // SDK states/versions call back synchronously, before the
        // subscription function has even returned) — so `unsub` may still
        // be undefined the first time `handle` runs. Guard for both cases
        // instead of assuming async-only firing.
        var settled = false;
        var unsub;
        function handle(user) {
          if (settled) return;
          settled = true;
          resolve(user || null);
          if (typeof unsub === 'function') unsub();
          else Promise.resolve().then(function () { if (typeof unsub === 'function') unsub(); });
        }
        unsub = fb.auth().onAuthStateChanged(handle);
      });
    }).catch(function () { return null; });
  }

  window.ScorePathTeacherAuth = {
    isConfigured: isConfigured,
    signIn: signIn,
    signUp: signUp,
    signOut: signOutUser,
    currentUser: currentUser,
  };
})();
