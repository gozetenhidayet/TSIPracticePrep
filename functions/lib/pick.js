/*
 * Ported selection logic — originally client-side in student-room.html,
 * where it ran against the full local `window.ScorePathBank`. Here it runs
 * server-side (Cloud Functions) against a bank array already loaded from
 * Firestore, so the SELECTION itself never has to happen in a browser that
 * can see the whole bank. Behavior is intentionally identical to the
 * client version (same seeded-shuffle algorithm) so a room's "Same
 * Questions" vs. "Different Questions" guarantees are unchanged.
 */

function seededRand(seedStr) {
  let h = 0;
  for (const c of String(seedStr)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return function () {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

function shuffleWithRand(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseCount(countLabel) {
  const m = /(\d+)/.exec(countLabel || '');
  return m ? Math.max(4, Math.min(40, parseInt(m[1], 10))) : 24;
}

/** Selects `n` questions round-robin across skill buckets, seeded — no
 * choice-order shuffling here (see shuffleChoicesForAssignment below). */
function selectQuestions(bank, n, seedStr) {
  if (!bank.length) return [];
  const rand = seededRand(seedStr);
  const bySkill = {};
  bank.forEach((qq) => {
    const k = (qq.section || '') + '|' + (qq.skill || '');
    (bySkill[k] = bySkill[k] || []).push(qq);
  });
  const skillKeys = Object.keys(bySkill).sort();
  skillKeys.forEach((k) => (bySkill[k] = shuffleWithRand(bySkill[k], rand)));
  const picked = [];
  let idx = 0,
    guard = 0;
  while (picked.length < n && guard < n * 20) {
    const k = skillKeys[idx % skillKeys.length];
    if (bySkill[k].length) picked.push(bySkill[k].shift());
    idx++;
    guard++;
    if (!skillKeys.some((k2) => bySkill[k2].length)) break;
  }
  return shuffleWithRand(picked, rand);
}

function difficultyTally(set) {
  const t = {};
  (set || []).forEach((qq) => {
    const d = qq.difficulty || 'Medium';
    t[d] = (t[d] || 0) + 1;
  });
  return t;
}

/** "Different Questions" mode: every student gets their own shuffled items,
 * but the same shared Easy/Medium/Hard mix (targetCounts, derived once from
 * the room's own seed) so a teacher's cross-student comparison stays fair. */
function selectQuestionsBalanced(bank, n, seedStr, targetCounts) {
  if (!bank.length) return [];
  const rand = seededRand(seedStr);
  const bySkillDiff = {};
  bank.forEach((qq) => {
    const sk = (qq.section || '') + '|' + (qq.skill || ''),
      d = qq.difficulty || 'Medium',
      key = sk + '||' + d;
    (bySkillDiff[key] = bySkillDiff[key] || []).push(qq);
  });
  Object.keys(bySkillDiff).forEach((k) => (bySkillDiff[k] = shuffleWithRand(bySkillDiff[k], rand)));
  const skillKeys = [...new Set(bank.map((qq) => (qq.section || '') + '|' + (qq.skill || '')))].sort();
  const picked = [];
  Object.keys(targetCounts).forEach((diff) => {
    let need = targetCounts[diff],
      idx = 0,
      guard = 0;
    while (need > 0 && guard < (need + skillKeys.length) * 10) {
      const key = skillKeys[idx % skillKeys.length] + '||' + diff;
      if (bySkillDiff[key] && bySkillDiff[key].length) {
        picked.push(bySkillDiff[key].shift());
        need--;
      }
      idx++;
      guard++;
    }
  });
  if (picked.length < n) {
    const used = new Set(picked.map((q) => q.id));
    const leftover = shuffleWithRand(
      bank.filter((q) => !used.has(q.id)),
      rand
    );
    picked.push(...leftover.slice(0, n - picked.length));
  }
  return shuffleWithRand(picked.slice(0, n), rand);
}

/** Shuffles ONE question's choice order for one specific student+question,
 * seeded so it's stable if the assignment is re-fetched. Returns the
 * shuffled choice text array plus `permutation` (permutation[i] = the
 * ORIGINAL choice index now sitting at shuffled position i) so a later
 * grading call can map a submitted shuffled-index back to the original
 * `a`/`why[]` without ever sending the original order to the client. */
function shuffleChoicesForAssignment(question, seedStr) {
  const rand = seededRand(seedStr);
  const order = shuffleWithRand(
    question.choices.map((_, i) => i),
    rand
  );
  return {
    choices: order.map((origIdx) => question.choices[origIdx]),
    permutation: order, // permutation[shuffledIdx] = origIdx
  };
}

module.exports = {
  seededRand,
  shuffleWithRand,
  parseCount,
  selectQuestions,
  difficultyTally,
  selectQuestionsBalanced,
  shuffleChoicesForAssignment,
};
