(function(){
 const CFG=window.SCOREPATH_FIREBASE_CONFIG||{};
 const configured=!!(CFG.apiKey&&CFG.projectId&&CFG.databaseURL);
 const PROFILE='scorepath_v19_profile';
 const SYNC_KEYS=['scorepath_v2_goal','scorepath_v13_goals','scorepath_v13_notes','scorepath_review_schedule','scorepath_error_reasons','scorepath_sAT_store','scorepath_aCT_store','scorepath_tSI_store'];
 function profile(){try{return JSON.parse(localStorage.getItem(PROFILE)||'null')}catch(e){return null}}
 function saveProfile(p){localStorage.setItem(PROFILE,JSON.stringify(p));window.dispatchEvent(new CustomEvent('scorepath:profile',{detail:p}))}
 function exportData(){const data={profile:profile(),savedAt:new Date().toISOString(),items:{}};for(const k of Object.keys(localStorage)){if(k.startsWith('scorepath'))data.items[k]=localStorage.getItem(k)}return data}
 function importData(data){if(!data||!data.items)return;Object.entries(data.items).forEach(([k,v])=>{if(k.startsWith('scorepath')&&typeof v==='string')localStorage.setItem(k,v)});if(data.profile)saveProfile(data.profile)}
 async function firebase(){if(!configured)return null; try{
  const [{initializeApp,getApps},{getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut:fbSignOut},{getFirestore,doc,setDoc,getDoc,serverTimestamp}]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
   import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')]);
  const app=getApps().length?getApps()[0]:initializeApp(CFG),auth=getAuth(app),db=getFirestore(app);
  return {auth,db,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,fbSignOut,doc,setDoc,getDoc,serverTimestamp};
 }catch(e){console.warn('ScorePath cloud sync unavailable; using local fallback.',e);return null}}
 async function cloudSave(){const f=await firebase();if(!f||!f.auth.currentUser)return false;await f.setDoc(f.doc(f.db,'students',f.auth.currentUser.uid),{payload:exportData(),updatedAt:f.serverTimestamp()},{merge:true});return true}
 async function cloudLoad(){const f=await firebase();if(!f||!f.auth.currentUser)return false;const snap=await f.getDoc(f.doc(f.db,'students',f.auth.currentUser.uid));if(snap.exists()&&snap.data().payload)importData(snap.data().payload);return true}
 async function createAccount(email,password,p){const f=await firebase();if(!f)throw new Error('Cloud account setup is not configured yet.');const c=await f.createUserWithEmailAndPassword(f.auth,email,password);saveProfile({...p,email,uid:c.user.uid,cloud:true});await cloudSave();return c.user}
 async function signIn(email,password){const f=await firebase();if(!f)throw new Error('Cloud account setup is not configured yet.');const c=await f.signInWithEmailAndPassword(f.auth,email,password);await cloudLoad();return c.user}
 async function signOut(){const f=await firebase();if(f)await f.fbSignOut(f.auth)}
 function deviceProfile(p){saveProfile({...p,cloud:false,deviceOnly:true});return profile()}
 async function boot(){document.documentElement.dataset.scorepathCloud=configured?'ready':'local'; if(configured){const f=await firebase();if(f)f.onAuthStateChanged(f.auth,u=>window.dispatchEvent(new CustomEvent('scorepath:auth',{detail:{user:u}})))}}
 window.ScorePathSync={configured,profile,saveProfile,deviceProfile,exportData,importData,cloudSave,cloudLoad,createAccount,signIn,signOut,boot};
})();