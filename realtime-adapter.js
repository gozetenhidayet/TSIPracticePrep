/*
 * ScorePath Practice — realtime classroom adapter
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
    create(room, handler) {
      if (canUseFirebase()) {
        try {
          return Promise.resolve(firebaseChannel(room, handler));
        } catch (e) {
          // fall through to local demo mode below
        }
      }
      const channel = localChannel(room);
      channel.addEventListener("message", handler);
      return Promise.resolve(channel);
    },
    /** True when this session is actually syncing across devices via Firebase. */
    get isCloudSynced() {
      return canUseFirebase();
    },
  };
})();
