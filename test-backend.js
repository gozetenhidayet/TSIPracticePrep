#!/usr/bin/env node
/*
 * ScorePath — one-command reproducible backend test runner.
 *
 * Before this file existed, `cd functions && npm test` failed on a fresh
 * checkout with a bare "Run scripts/export-bank-to-json.js first" message
 * and nothing more — that script lives in a SEPARATE scripts/ package with
 * its own dependency (jsdom) that also had to be installed by hand first.
 * Two undocumented manual steps before the tests would even start.
 *
 * `npm test` from the repo root now does the whole thing in one command:
 *   1. Install scripts/'s own dependencies if missing (jsdom, for the
 *      headless-DOM bank export).
 *   2. Re-run the bank export (scripts/bank-export.json is gitignored on
 *      purpose — it's a generated artifact, not source — and cheap enough,
 *      under 2 seconds, to always regenerate fresh rather than trust a
 *      possibly-stale copy).
 *   3. Install functions/'s own dependencies if missing.
 *   4. Run the actual backend handler tests.
 *
 * Any failed step stops the run and forwards its real exit code, so CI or
 * a human reading the terminal sees exactly which step broke.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(label, cmd, args, cwd) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    console.error(`\n"${label}" failed (exit ${result.status}).`);
    process.exit(result.status || 1);
  }
}

const root = __dirname;
const scriptsDir = path.join(root, 'scripts');
const functionsDir = path.join(root, 'functions');

if (!fs.existsSync(path.join(scriptsDir, 'node_modules'))) {
  run('Install scripts/ dependencies (jsdom, for the bank export)', 'npm', ['install'], scriptsDir);
}

run('Export the live question bank to scripts/bank-export.json', 'npm', ['run', 'export-bank'], scriptsDir);

if (!fs.existsSync(path.join(functionsDir, 'node_modules'))) {
  run('Install functions/ dependencies', 'npm', ['install'], functionsDir);
}

run('Run backend handler tests', 'npm', ['test'], functionsDir);

console.log('\nAll backend tests passed.');
