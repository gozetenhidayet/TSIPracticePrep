/*
 * TSI Practice Prep — export the question bank to JSON for Firestore migration.
 *
 * question-bank-core.js and practice-engine-core.js are written as browser
 * scripts (they reference `window`, `document`, `localStorage`) — there is
 * no standalone "just the data" file. This script loads both of them inside
 * a real (headless) DOM via jsdom, exactly like a browser tab would, then
 * reads back the resulting `window.ScorePathBank` — the same fully
 * deduplicated, assembled bank every practice page uses — and writes it to
 * bank-export.json.
 *
 * Run this yourself, from the scorepath repo root:
 *   cd scripts && npm install && npm run export-bank
 *
 * This never runs automatically and is never deployed with the site — it's
 * a one-time (or "re-run whenever the bank content changes") admin tool for
 * you to feed scripts/upload-bank-to-firestore.js.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const repoRoot = path.join(__dirname, '..');
const files = ['question-bank-core.js', 'practice-engine-core.js'];

async function main() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
    runScripts: 'dangerously',
  });
  const { window } = dom;

  // Minimal shims for browser APIs these files touch at load time that
  // jsdom doesn't fully implement (localStorage works in recent jsdom, but
  // BroadcastChannel does not — neither file needs it just to build the
  // bank, so a no-op stub is enough to avoid a load-time ReferenceError).
  if (typeof window.BroadcastChannel === 'undefined') {
    window.BroadcastChannel = function () {
      return { postMessage() {}, close() {}, addEventListener() {}, removeEventListener() {} };
    };
  }

  // spConsole is normally defined inline in each HTML page's own <script>
  // tag, right before these two files load — replicate that exact shim.
  const spConsoleShim = window.document.createElement('script');
  spConsoleShim.textContent =
    'function spConsole(method){try{var args=Array.prototype.slice.call(arguments,1);' +
    'if(window.console&&typeof console[method]==="function")console[method].apply(console,args);' +
    'else if(window.console&&typeof console.log==="function")console.log.apply(console,args);}catch(e){}}';
  window.document.body.appendChild(spConsoleShim);

  for (const file of files) {
    const code = fs.readFileSync(path.join(repoRoot, file), 'utf8');
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = code;
    window.document.body.appendChild(scriptEl);
  }

  const bank = window.ScorePathBank;
  if (!bank || !bank.SAT || !bank.ACT || !bank.TSIA2) {
    console.error('window.ScorePathBank did not populate as expected. Aborting — nothing written.');
    process.exit(1);
  }

  const counts = { SAT: bank.SAT.length, ACT: bank.ACT.length, TSIA2: bank.TSIA2.length };
  const total = counts.SAT + counts.ACT + counts.TSIA2;
  console.log('Extracted bank counts:', counts, '(total:', total + ')');

  // Flatten into one array with an explicit examKey per item, ready for
  // upload-bank-to-firestore.js. Every field the real site data has is kept
  // (including the answer key `a`, `ex`, `why`, `strategy`) — this JSON file
  // itself is the "real" source of truth and should be treated as sensitive
  // (don't publish it, don't commit it to a public repo).
  const flat = [];
  for (const examKey of ['SAT', 'ACT', 'TSIA2']) {
    bank[examKey].forEach((q) => flat.push(Object.assign({ examKey }, q)));
  }

  const outPath = path.join(__dirname, 'bank-export.json');
  fs.writeFileSync(outPath, JSON.stringify(flat, null, 2));
  console.log('Wrote', flat.length, 'questions to', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
