/*
 * TSI Practice Prep — realtime classroom adapter
 *
 * Exposes window.ScorePathRealtime.create(room, handler) -> Promise<channel>
 * where channel.postMessage(data) sends an event and channel.close() ends it.
 *
 * Local demo mode (default): uses BroadcastChannel, which only relays
 * messages between tabs/windows in the SAME browser on the SAME device.
 * That's enough to demo the teacher/student flow in two tabs, but it is
 * NOT cross-device. This is intentional and documented in FIREBASE-SETUP.md
 * — no message here claims otherwise.
 *
 * Cloud mode: if firebase-config.js has real credentials AND the Firebase
 * Realtime Database SDK is loaded, room events sync through Firebase so a
 * teacher and students on different devices can share a live room.
 */
(function () {
  function localChannel(room) {
    let channel;
    try {
      channel = new BroadcastChannel("scorepath-room-" + room);
    } catch (e) {
      // Extremely old browsers without BroadcastChannel: degrade to a
      // same-tab no-op so the UI still renders instead of throwing.
      channel = {
        postMessage() {},
        close() {},
        addEventListener() {},
        removeEventListener() {},
      };
    }
    return channel;
  }

  function firebaseChannel(room, handler) {
    const db = window.firebase.database();
    const ref = db.ref("rooms/" + encodeURIComponent(room) + "/events");
    const startAt = Date.now();
    const query = ref.orderByChild("ts").startAt(startAt);
    const onAdd = (snap) => handler({ data: snap.val() });
    query.on("child_added", onAdd);
    return {
      postMessage(data) {
        ref.push(Object.assign({}, data, { ts: Date.now() })).catch(() => {});
      },
      close() {
        query.off("child_added", onAdd);
      },
    };
  }

  function canUseFirebase() {
    return !!(
      window.SCOREPATH_FIREBASE_CONFIG &&
      window.firebase &&
      window.firebase.apps &&
      window.firebase.apps.length &&
      typeof window.firebase.database === "function"
    );
  }

  window.ScorePathRealtime = {
    async create(room, handler) {
      // firebase-init.js loads the SDK asynchronously (only when real
      // config is present) — wait for it so a page that acts on load
      // doesn't race ahead of window.firebase actually existing yet.
      if (window.SCOREPATH_FIREBASE_CONFIG && window.ScorePathFirebaseReady) {
        try {
          await window.ScorePathFirebaseReady;
        } catch (e) {
          // SDK failed to load — fall through to local demo mode below.
        }
      }
      if (canUseFirebase()) {
        try {
          return firebaseChannel(room, handler);
        } catch (e) {
          // fall through to local demo mode below
        }
      }
      const channel = localChannel(room);
      channel.addEventListener("message", handler);
      return channel;
    },
    /** True when this session is actually syncing across devices via Firebase.
     * Only meaningful AFTER create() has resolved at least once (the SDK
     * load is asynchronous) — check it from inside/after a .then(), not
     * synchronously right after calling create(). */
    get isCloudSynced() {
      return canUseFirebase();
    },
  };
})();
