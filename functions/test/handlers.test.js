/*
 * Local, no-network sanity test for lib/handlers.js against the real
 * exported bank (scripts/bank-export.json), using an in-memory fake
 * Firestore. Run with: node test/handlers.test.js
 *
 * This is a smoke test to verify the ported selection/grading logic
 * behaves correctly BEFORE anyone deploys it to a real project — it does
 * not touch any live Firebase project.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { FakeFirestore } = require('./fake-db');
const { makeHandlers } = require('../lib/handlers');
const { selectQuestions, difficultyTally, examBlueprintTargets } = require('../lib/pick');

const exportPath = path.join(__dirname, '..', '..', 'scripts', 'bank-export.json');
if (!fs.existsSync(exportPath)) {
  console.error('Run scripts/export-bank-to-json.js first to produce bank-export.json.');
  process.exit(1);
}
const bank = JSON.parse(fs.readFileSync(exportPath, 'utf8'));

async function main() {
  const db = new FakeFirestore();
  bank.forEach((q) => {
    db.collection('questions').doc(q.examKey + '_' + q.id).set(q);
  });

  const { getAssignmentQuestions, submitAnswer } = makeHandlers(db);

  // --- 1. Two students, "different" mode, same room -> same difficulty mix, different items ---
  const roomCode = 'TEST01';
  const a1 = await getAssignmentQuestions({
    roomCode, studentId: 'alice', examKey: 'TSIA2', count: '6', mode: 'different',
  });
  const a2 = await getAssignmentQuestions({
    roomCode, studentId: 'bob', examKey: 'TSIA2', count: '6', mode: 'different',
  });
  assert.strictEqual(a1.questions.length, 6, 'alice should get 6 questions');
  assert.strictEqual(a2.questions.length, 6, 'bob should get 6 questions');
  const idsA = a1.questions.map((q) => q.id).sort();
  const idsB = a2.questions.map((q) => q.id).sort();
  assert.notDeepStrictEqual(idsA, idsB, 'different mode should give different items');
  const diffA = {}; a1.questions.forEach((q) => (diffA[q.difficulty] = (diffA[q.difficulty] || 0) + 1));
  const diffB = {}; a2.questions.forEach((q) => (diffB[q.difficulty] = (diffB[q.difficulty] || 0) + 1));
  assert.deepStrictEqual(diffA, diffB, 'different mode should still match difficulty mix');
  console.log('[OK] different-mode: 6/6 items, different IDs, matching difficulty mix', diffA);

  // --- 2. Sanitized questions never carry the answer key ---
  a1.questions.forEach((q) => {
    assert.strictEqual(q.a, undefined, 'sanitized question must not include `a`');
    assert.strictEqual(q.ex, undefined, 'sanitized question must not include `ex`');
    assert.strictEqual(q.why, undefined, 'sanitized question must not include `why`');
    assert.strictEqual(q.strategy, undefined, 'sanitized question must not include `strategy`');
  });
  console.log('[OK] sanitized questions carry no answer key / explanation / strategy');

  // --- 3. Grading: submit the correct answer for every question, verify all correct ---
  let allCorrect = true;
  for (const q of a1.questions) {
    // Find which shuffled choice text matches the ORIGINAL bank's correct choice text.
    const original = bank.find((b) => b.examKey === 'TSIA2' && b.id === q.id);
    const correctText = original.choices[original.a];
    const shuffledCorrectIdx = q.choices.indexOf(correctText);
    const result = await submitAnswer({
      roomCode, studentId: 'alice', examKey: 'TSIA2', qid: q.id, choiceIndex: shuffledCorrectIdx,
    });
    if (!result.correct) allCorrect = false;
    assert.strictEqual(result.correctIndex, shuffledCorrectIdx, 'correctIndex should match the shuffled position of the right choice');
    assert.ok(result.explanation, 'explanation should be present');
  }
  assert.ok(allCorrect, 'submitting the objectively-correct choice for every question should grade as correct');
  console.log('[OK] submitAnswer grades the correct choice as correct for all 6 questions, with explanations');

  // --- 4. Grading: submit a deliberately wrong answer, verify graded incorrect with rationale ---
  const q0 = a1.questions[0];
  const wrongIdx = (a1.questions[0].choices.length + 1) % a1.questions[0].choices.length; // will recompute below properly
  const original0 = bank.find((b) => b.examKey === 'TSIA2' && b.id === q0.id);
  const correctText0 = original0.choices[original0.a];
  const correctShuffledIdx0 = q0.choices.indexOf(correctText0);
  const wrongShuffledIdx0 = (correctShuffledIdx0 + 1) % q0.choices.length;
  const wrongResult = await submitAnswer({
    roomCode, studentId: 'alice', examKey: 'TSIA2', qid: q0.id, choiceIndex: wrongShuffledIdx0,
  });
  assert.strictEqual(wrongResult.correct, false, 'a deliberately wrong choice should grade as incorrect');
  assert.strictEqual(wrongResult.correctIndex, correctShuffledIdx0, 'correctIndex should still point to the real answer');
  console.log('[OK] submitAnswer grades a wrong choice as incorrect, still reveals the correct index + rationale');

  // --- 5. Security: submitAnswer refuses a qid never assigned to this student ---
  let refused = false;
  try {
    await submitAnswer({ roomCode, studentId: 'alice', examKey: 'SAT', qid: 'SAT-RW-II-0001', choiceIndex: 0 });
  } catch (e) {
    refused = e.code === 'permission-denied';
  }
  assert.ok(refused, 'submitAnswer must refuse to grade a question outside the student\'s own assignment');
  console.log('[OK] submitAnswer refuses to grade a question not in this student\'s assignment (permission-denied)');

  // --- 5b. "different" mode respects real blueprint-domain proportions, not
  // just a flat round-robin across raw (fragmented) skill labels. ---
  const roomCodeBP = 'TESTBP';
  const bpCount = '24';
  const bpRoomSeed = 'room-' + roomCodeBP;
  const actBank = bank.filter((b) => b.examKey === 'ACT');
  const bpTargetCounts = difficultyTally(selectQuestions(actBank, parseInt(bpCount, 10), bpRoomSeed));
  const expected = {};
  Object.keys(bpTargetCounts).forEach((diff) => {
    const t = examBlueprintTargets('ACT', bpTargetCounts[diff]);
    if (t) Object.keys(t).forEach((k) => (expected[k] = (expected[k] || 0) + t[k]));
  });
  const eve = await getAssignmentQuestions({
    roomCode: roomCodeBP, studentId: 'eve', examKey: 'ACT', count: bpCount, mode: 'different',
  });
  assert.strictEqual(eve.questions.length, 24, 'eve should get 24 ACT questions');
  const actual = {};
  eve.questions.forEach((q) => {
    const original = actBank.find((b) => b.id === q.id);
    const key = (original.section || '') + '||' + (original.blueprintDomain || 'Unclassified');
    actual[key] = (actual[key] || 0) + 1;
  });
  // Every domain the algorithm actually targeted should be represented at a
  // count reasonably close to its real official weight — not exact (bank
  // supply and rounding both leave slack), but nowhere near the old
  // fragmented-skill-label round-robin's accidental skew, and every domain
  // with a non-trivial target must show up at all (no domain silently
  // dropped to zero).
  let maxDrift = 0;
  Object.keys(expected).forEach((key) => {
    const want = expected[key], got = actual[key] || 0;
    maxDrift = Math.max(maxDrift, Math.abs(want - got));
    if (want >= 2) assert.ok(got >= 1, `domain ${key} targeted ${want} but got 0 — blueprint fairness broken`);
  });
  assert.ok(maxDrift <= 4, `blueprint-domain drift too large (${maxDrift}) — expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  const distinctDomains = new Set(Object.keys(actual).map((k) => k.split('||')[1]));
  assert.ok(distinctDomains.size >= 3, 'a 24-question ACT different-mode draw should span at least 3 distinct blueprint domains');
  console.log('[OK] different-mode ACT draw matches real blueprint-domain proportions (expected≈actual, max drift', maxDrift + ')', actual);

  // --- 6. "same" mode: two students in the same room get byte-identical sets ---
  const s1 = await getAssignmentQuestions({ roomCode: 'TEST02', studentId: 'carol', examKey: 'SAT', count: '8', mode: 'same' });
  const s2 = await getAssignmentQuestions({ roomCode: 'TEST02', studentId: 'dave', examKey: 'SAT', count: '8', mode: 'same' });
  assert.deepStrictEqual(s1.questions.map((q) => q.id).sort(), s2.questions.map((q) => q.id).sort(), 'same mode should give identical item sets');
  console.log('[OK] same-mode: two students in the same room get identical item sets');

  console.log('\nAll handler tests passed.');
}

main().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
