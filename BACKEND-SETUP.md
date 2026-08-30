# Turning on server-side question serving (so the real bank never reaches a browser)

## What this is

Right now, on `index.html`'s self-practice pages, the entire question bank —
every question, choice, **and the correct answer** — ships as plain
client-side JavaScript (`question-bank-core.js` + `practice-engine-core.js`)
to any browser that loads them. That means anyone who opens their browser's
DevTools console and types `window.ScorePathBank` can see all ~2,775
questions and their answer keys instantly. Grading also happens entirely in
the browser (`i === q.a`), so the answer key has to be sitting right there
in the page for that comparison to even work.

This pass adds a real server-side alternative **for the classroom flow**
(`teachers.html` creating a room, students joining through
`student-room.html`): the question bank and answer keys live only in your
own Firestore database, a student's browser only ever receives the exact
questions assigned to *them* (no answer key, no explanation, no strategy
tip), and grading happens on the server. Nothing about the individual
self-practice pages on `index.html` (SAT/ACT/TSIA2 solo practice, adaptive
practice tests, the Essay Labs) changes in this pass — those still grade
client-side against the local bank. Migrating those too is a separate,
larger follow-on project (see "What this does NOT cover" below).

**This is 100% opt-in and inert until you do the steps below.** With
`firebase-config.js` left as `null` (the default), every page behaves
exactly as it did before this pass — nothing here activates on its own.

## What you'll need

- A Google account and a **real Firebase project on the Blaze
  (pay-as-you-go) plan** — Cloud Functions require Blaze even if your usage
  stays within the free monthly quota. There is no way around this; only
  you can create this project and accept its billing terms.
- The [Firebase CLI](https://firebase.google.com/docs/cli) installed on
  your own machine (`npm install -g firebase-tools`), since deploying
  Cloud Functions and Firestore rules to your live project has to run from
  a machine you're logged into Firebase from — this can't be done from
  inside this delivered code.
- Node.js 20 on your own machine, to run the one-time migration scripts.

## Setup steps

1. **Create the Firebase project.**
   Go to [console.firebase.google.com](https://console.firebase.google.com),
   create a project, then upgrade it to the Blaze plan (Project settings →
   Usage and billing). Add a Web App to the project and copy its config
   object.

2. **Paste your config into `firebase-config.js`.**
   Replace `window.SCOREPATH_FIREBASE_CONFIG = null;` with your real values
   (the file already has a commented example of the shape). This alone
   activates `firebase-init.js`, which will start loading the Firebase SDK
   for every visitor — but nothing server-side exists yet until the next
   steps, so `ScorePathRealtime.isCloudSynced` will still report `false`
   until Firestore/Functions are actually deployed and populated.

3. **Enable Firestore** in the Firebase console (Build → Firestore Database
   → Create database). Any region; start in production mode (locked) —
   `firestore.rules` in this repo already default-denies all direct client
   access, which is what you want.

4. **Log in and connect the CLI to your project**, from this repo's root:
   ```
   firebase login
   firebase use --add        # pick your project, give it an alias like "default"
   ```

5. **Deploy the Cloud Functions and Firestore rules:**
   ```
   cd functions && npm install && cd ..
   firebase deploy --only functions,firestore:rules
   ```
   This publishes `getAssignmentQuestions` and `submitAnswer` (see
   `functions/index.js`) and locks down direct Firestore access to the
   `questions`/`assignments` collections (see `firestore.rules`).

6. **Migrate the question bank into Firestore.** This is the step that
   moves the real bank + answer keys out of the browser-downloadable JS
   files and into your own database:
   ```
   cd scripts && npm install
   npm run export-bank
   ```
   This loads `question-bank-core.js` + `practice-engine-core.js` in a
   headless DOM (via `jsdom`) exactly like a browser would, and writes the
   resulting `window.ScorePathBank` to `scripts/bank-export.json` — treat
   this file as sensitive (it contains every answer key) and don't commit
   it to a public repo. Then:
   ```
   Generate a service-account key: Firebase console → Project settings →
   Service accounts → Generate new private key. Save it OUTSIDE this repo.

   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-key.json npm run upload-bank
   ```
   This uploads all ~2,775 questions into your Firestore `questions`
   collection. Re-run both commands any time the bank content changes —
   both are safe to re-run (they overwrite by deterministic document ID,
   no duplicates).

7. **Test with two real devices/browsers** before trusting this in a real
   classroom: create a room in `teachers.html`, join from `student-room.html`
   on a second device, start the room, and confirm questions render and
   grade correctly. Open DevTools on the student device and confirm
   `window.ScorePathBank` is `undefined` and no `question-bank-core.js` /
   `practice-engine-core.js` network request ever fires — that's the whole
   point of this pass.

## How to verify it's actually working

- `ScorePathRealtime.isCloudSynced` (check from the browser console) should
  be `true` once everything above is deployed and configured.
- On `student-room.html`, once a teacher starts a room, the Network tab
  should show calls to `getAssignmentQuestions`/`submitAnswer` (your
  Cloud Functions URL) — and should **not** show `question-bank-core.js` or
  `practice-engine-core.js` being requested at all.
- `window.ScorePathBank` should be `undefined` throughout the whole session.

If any of the steps above aren't done yet (no Firestore data, functions not
deployed, config still `null`), the site automatically falls back to
exactly today's behavior — the local bank, lazy-loaded on Join, graded in
the browser. Nothing breaks partway through; each step is additive.

## What this does NOT cover (be clear-eyed about this before relying on it)

- **`index.html`'s individual self-practice, adaptive practice tests, and
  Essay Labs still grade client-side against the local bank.** Only the
  classroom flow (`teachers.html` + `student-room.html`) uses the new
  server-side path. Migrating the rest means reworking roughly 40+
  separate answer-checking call sites across `index.html`,
  `question-bank-core.js`, and `practice-engine-core.js` — a much larger
  project than this pass, not attempted here.
- **This cannot make the site 100% leak-proof against a determined,
  patient person.** Whatever question a student is actively looking at
  necessarily reaches their browser and renders on their screen — that's
  true for any client-rendered quiz, static or backed by a real server, and
  a screenshot or a slow, patient rebuild of the bank by repeatedly taking
  assignments is not something any client-side app can fully prevent. What
  this DOES stop is the trivial, instant case: a single `console.log` (or a
  `curl` on the static `.js` files) dumping the entire bank and every
  answer key in one shot. That's the real, meaningful gap this closes.
- **No rate limiting or abuse protection is built into the two Cloud
  Functions yet.** `student-room.html` still generates a fresh, unauthenticated
  random student ID per visit with no login — the same trust model the
  classroom feature already used before this pass. Someone could still
  create many fake "students" in a room to slowly harvest more questions
  than one real student would see. Firebase App Check (an anti-abuse
  layer Google provides) would meaningfully raise this bar and is a
  reasonable next step, but wasn't added in this pass.
- **Ongoing cost.** Firestore reads and Cloud Functions invocations cost
  money past Firebase's free tier once real traffic arrives — review
  Firebase's current pricing before launching this to real students.
