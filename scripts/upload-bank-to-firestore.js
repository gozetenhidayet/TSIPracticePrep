/*
 * ScorePath — upload bank-export.json into Firestore.
 *
 * This is the second half of the migration: takes the JSON produced by
 * export-bank-to-json.js and writes each question into a `questions`
 * collection in YOUR Firestore project, keyed by `${examKey}_${id}` so the
 * Cloud Functions in functions/index.js can look items up directly.
 *
 * The `questions` collection is never readable by clients (see
 * firestore.rules — it default-denies everything) — only the Admin SDK,
 * which this script uses and which the Cloud Functions use, can read it.
 * This is the whole point: the real bank + answer keys live only here and
 * in your own Firestore console, never in a file the browser downloads.
 *
 * Prerequisites (all things only you can do — see BACKEND-SETUP.md):
 *   1. Create a Firebase project on the Blaze (pay-as-you-go) plan.
 *   2. Enable Firestore in that project.
 *   3. Generate a service-account key: Firebase console → Project settings
 *      → Service accounts → Generate new private key. Save the downloaded
 *      JSON file somewhere OUTSIDE this repo (never commit it).
 *   4. Run: cd scripts && npm install
 *   5. Run: GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-key.json node upload-bank-to-firestore.js
 *
 * Safe to re-run: it overwrites each question doc by its deterministic ID,
 * so re-running after editing the bank and re-exporting just updates
 * existing docs (no duplicates).
 */
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const exportPath = path.join(__dirname, 'bank-export.json');
if (!fs.existsSync(exportPath)) {
  console.error('bank-export.json not found. Run `npm run export-bank` first.');
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS is not set. Point it at your service-account ' +
      'JSON key file, e.g.:\n' +
      '  GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node upload-bank-to-firestore.js'
  );
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

const BATCH_LIMIT = 400; // Firestore batched writes cap at 500 ops; stay under it.

async function main() {
  const questions = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
  console.log('Uploading', questions.length, 'questions to Firestore collection "questions"...');

  let written = 0;
  for (let i = 0; i < questions.length; i += BATCH_LIMIT) {
    const chunk = questions.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();
    chunk.forEach((q) => {
      const docId = `${q.examKey}_${q.id}`;
      batch.set(db.collection('questions').doc(docId), q);
    });
    await batch.commit();
    written += chunk.length;
    console.log(`  ${written} / ${questions.length} written...`);
  }

  console.log('Done. Uploaded', written, 'questions.');
  console.log(
    'Next: deploy the Cloud Functions (functions/) and the Firestore rules ' +
      '(firestore.rules) — see BACKEND-SETUP.md.'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
