(function(){
 const CFG=window.SCOREPATH_FIREBASE_CONFIG||{};const configured=!!(CFG.apiKey&&CFG.databaseURL&&CFG.projectId);
 async function firebaseBus(room,onMessage){try{
  const [{initializeApp,getApps},{getAuth,signInAnonymously},{getDatabase,ref,push,onChildAdded,off}]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js')]);
  const app=getApps().length?getApps()[0]:initializeApp(CFG),auth=getAuth(app);if(!auth.currentUser)await signInAnonymously(auth);const db=getDatabase(app),events=ref(db,'rooms/'+room+'/events');const seen=new Set();
  const unsub=onChildAdded(events,s=>{if(seen.has(s.key))return;seen.add(s.key);const v=s.val();if(v&&v.payload)onMessage({data:v.payload})});
  return {postMessage:m=>push(events,{payload:m,ts:Date.now(),sender:auth.currentUser?.uid||'anon'}),close:()=>off(events)};
 }catch(e){console.warn('Firebase realtime unavailable; local classroom fallback is active.',e);return null}}
 function localBus(room,onMessage){const c=new BroadcastChannel('scorepath-room-'+room);c.onmessage=onMessage;return c}
 async function create(room,onMessage){if(configured){const fb=await firebaseBus(room,onMessage);if(fb)return fb}return localBus(room,onMessage)}
 window.ScorePathRealtime={configured,create};
})();