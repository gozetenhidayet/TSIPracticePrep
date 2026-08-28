# ScorePath V19 Firebase Setup

V19 includes a safe local fallback. To enable real cross-device accounts and classroom sync:

1. Create a Firebase project and Web App.
2. Enable Authentication: Email/Password for student/teacher accounts and Anonymous for class-code students.
3. Enable Firestore for student sync and Realtime Database for classroom events.
4. Paste the Web App values into `firebase-config.js`.
5. Replace the development database rules with production rules that limit teachers to rooms they own and students to rooms they joined.
6. Test two separate browsers/devices before launch.

Do not publish with open Realtime Database rules. The included adapter intentionally falls back to BroadcastChannel/local demo when Firebase is not configured.
