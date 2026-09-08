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

/* Fifty-ninth pass: this used to have no "Full section" case at all, unlike
 * its client-side twin in student-room.html (which already special-cased it
 * correctly). A teacher picking "Full section" for a cloud-synced room sent
 * that literal string as `countLabel`; since it contains no digits, the old
 * /(\d+)/ regex found nothing and silently fell back to 24 questions
 * server-side — regardless of exam, and regardless of the real section size
 * (98 for SAT, 131 for ACT, 44 for TSIA2). Mirrors FULL_SECTION_COUNTS from
 * student-room.html exactly so both code paths agree. */
const FULL_SECTION_COUNTS = { SAT: 98, ACT: 131, TSIA2: 44 };

function parseCount(countLabel, examKey) {
  if (/full section/i.test(countLabel || '')) {
    return FULL_SECTION_COUNTS[examKey] || 44;
  }
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

/*
 * Real per-exam section-length weights, used to proportion a whole-exam
 * classroom assignment across sections (a teacher picks an exam, not a
 * single section, so a "Different Questions" set can span all of them).
 * Sourced the same way as SCOREPATH_BLUEPRINT_WEIGHTS in
 * practice-engine-core.js: SAT's two Reading & Writing modules (27 each) vs.
 * two Math modules (22 each) from the official Digital SAT design; the
 * current ACT's official core section lengths (English 50, Math 45,
 * Reading 36 — the same 131-question total actStageConfig's Full ACT Core
 * Simulation already uses client-side — plus Science 40 optional); TSIA2 has
 * no single fixed official total (it's computer-adaptive), so
 * Mathematics/ELAR are weighted equally here, matching how this project
 * already treats TSIA2 diagnostic/timed sampling client-side
 * (question-bank-core.js's selectSet).
 */
const SECTION_WEIGHTS = {
  SAT: { 'Reading & Writing': 54, Math: 44 },
  ACT: { English: 50, Math: 45, Reading: 36, 'Science (Optional)': 40 },
  TSIA2: { Mathematics: 1, ELAR: 1 },
};

/*
 * The same official per-domain weights adaptivePick's domainTargetCounts()
 * uses client-side (practice-engine-core.js, SCOREPATH_BLUEPRINT_WEIGHTS).
 * Duplicated here because Cloud Functions run as an independent Node module
 * with no access to the browser bundle — keep the two tables in sync if
 * either one changes.
 */
const DOMAIN_WEIGHTS = {
  SAT: {
    'Reading & Writing': { 'Information & Ideas': 0.26, 'Craft & Structure': 0.28, 'Expression of Ideas': 0.2, 'Standard English Conventions': 0.26 },
    Math: { Algebra: 0.35, 'Advanced Math': 0.35, 'Problem-Solving & Data Analysis': 0.15, 'Geometry & Trigonometry': 0.15 },
  },
  ACT: {
    English: { 'Production of Writing': 0.4, 'Knowledge of Language': 0.2, 'Conventions of Standard English': 0.4 },
    Math: { 'Number & Quantity': 0.11, Algebra: 0.19, Functions: 0.19, Geometry: 0.19, 'Statistics & Probability': 0.13, 'Integrating Essential Skills': 0.19 },
    Reading: { 'Key Ideas & Details': 0.48, 'Craft & Structure': 0.3, 'Integration of Knowledge & Ideas': 0.22 },
    'Science (Optional)': { 'Interpretation of Data': 0.42, 'Scientific Investigation': 0.24, 'Evaluating Scientific Arguments and Models with Evidence': 0.34 },
  },
  TSIA2: {
    Mathematics: { 'Quantitative Reasoning': 0.3, 'Algebraic Reasoning': 0.35, 'Geometric and Spatial Reasoning': 0.15, 'Probabilistic and Statistical Reasoning': 0.2 },
    ELAR: { 'Literary Text Analysis': 0.133, 'Informational Text Analysis and Synthesis': 0.367, 'Essay Revision and Editing': 0.133, 'Sentence Revision, Editing, and Completion': 0.367 },
  },
};

/** Largest-remainder rounding: turns fractional weight*total targets into
 * whole-number per-key counts that always sum to exactly `total`. */
function largestRemainderCounts(weightMap, total) {
  const keys = Object.keys(weightMap);
  if (!keys.length || !total) return {};
  const totalWeight = keys.reduce((sum, k) => sum + weightMap[k], 0) || 1;
  const rows = keys.map((k) => ({ k, exact: (total * weightMap[k]) / totalWeight }));
  const counts = {};
  let assigned = 0;
  rows.forEach((r) => {
    counts[r.k] = Math.floor(r.exact);
    assigned += counts[r.k];
  });
  let remainder = total - assigned;
  rows.sort((a, b) => (b.exact - Math.floor(b.exact)) - (a.exact - Math.floor(a.exact)));
  for (let i = 0; i < remainder && rows.length; i++) counts[rows[i % rows.length].k]++;
  return counts;
}

/** Real per-"section||domain" target counts for `count` questions of one
 * exam — the server-side equivalent of adaptivePick's domainTargetCounts,
 * extended one level since a classroom assignment spans a whole exam (every
 * section at once) rather than one section at a time like solo practice.
 * Returns null for an exam with no weight table (shouldn't happen for
 * SAT/ACT/TSIA2, the only three EXAMS this backend supports). */
function examBlueprintTargets(examKey, count) {
  const sectionWeights = SECTION_WEIGHTS[examKey];
  const domainWeights = DOMAIN_WEIGHTS[examKey];
  if (!sectionWeights || !domainWeights || !count) return null;
  const sectionCounts = largestRemainderCounts(sectionWeights, count);
  const targets = {};
  Object.keys(sectionCounts).forEach((section) => {
    const weights = domainWeights[section];
    const want = sectionCounts[section];
    if (!weights || !want) return;
    const domainCounts = largestRemainderCounts(weights, want);
    Object.keys(domainCounts).forEach((domain) => {
      if (domainCounts[domain]) targets[section + '||' + domain] = domainCounts[domain];
    });
  });
  return targets;
}

/** "Different Questions" mode: every student gets their own shuffled items,
 * with the same shared Easy/Medium/Hard mix (targetCounts, derived once from
 * the room's own seed) so a teacher's cross-student comparison stays fair —
 * AND, within each difficulty tier, the same real official blueprint-domain
 * proportions real adaptive practice already uses (e.g. an ACT English pick
 * lands close to Production of Writing 40% / Knowledge of Language 20% /
 * Conventions of Standard English 40%, not an accidental skew from however
 * many differently-worded skill labels happen to exist for each domain).
 * Falls back to a flat, domain-agnostic round-robin only for an exam with no
 * weight table, or when a specific (section, domain, difficulty) combination
 * is under-supplied in the bank — the same combination this backend can't
 * invent items for; the difficulty mix itself is never broken by a shortfall. */
function selectQuestionsBalanced(bank, n, seedStr, targetCounts, examKey) {
  if (!bank.length) return [];
  const rand = seededRand(seedStr);
  const byKey = {};
  bank.forEach((qq) => {
    const section = qq.section || '',
      domain = qq.blueprintDomain || 'Unclassified',
      d = qq.difficulty || 'Medium',
      key = section + '||' + domain + '||' + d;
    (byKey[key] = byKey[key] || []).push(qq);
  });
  Object.keys(byKey).forEach((k) => (byKey[k] = shuffleWithRand(byKey[k], rand)));
  const domainKeys = [...new Set(bank.map((qq) => (qq.section || '') + '||' + (qq.blueprintDomain || 'Unclassified')))].sort();

  const picked = [];
  Object.keys(targetCounts).forEach((diff) => {
    const tierCount = targetCounts[diff];
    if (!tierCount) return;
    const tierPicked = [];
    const blueprintTargets = examBlueprintTargets(examKey, tierCount);
    const sectionDomainKeys = blueprintTargets ? Object.keys(blueprintTargets) : domainKeys;
    sectionDomainKeys.forEach((sd) => {
      let need = blueprintTargets ? blueprintTargets[sd] : 0;
      const key = sd + '||' + diff;
      while (need > 0 && byKey[key] && byKey[key].length) {
        tierPicked.push(byKey[key].shift());
        need--;
      }
    });
    if (!blueprintTargets) {
      // No real weight table for this exam — flat round-robin across
      // whatever (section, domain) keys exist, same spirit as before.
      let need = tierCount, idx = 0, guard = 0;
      while (need > 0 && guard < (need + domainKeys.length) * 10 && domainKeys.length) {
        const key = domainKeys[idx % domainKeys.length] + '||' + diff;
        if (byKey[key] && byKey[key].length) {
          tierPicked.push(byKey[key].shift());
          need--;
        }
        idx++;
        guard++;
      }
    }
    // Shortfall in one or more (section, domain) targets for this tier —
    // fill the remainder from ANY item at the SAME difficulty first, so the
    // difficulty guarantee this function promises is never broken by an
    // under-supplied domain.
    if (tierPicked.length < tierCount) {
      const usedIds = new Set(tierPicked.map((q) => q.id));
      const sameDiffLeftover = shuffleWithRand(
        bank.filter((q) => (q.difficulty || 'Medium') === diff && !usedIds.has(q.id)),
        rand
      );
      tierPicked.push(...sameDiffLeftover.slice(0, tierCount - tierPicked.length));
    }
    picked.push(...tierPicked.slice(0, tierCount));
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
  examBlueprintTargets, // exported for testing (see functions/test/handlers.test.js)
  FULL_SECTION_COUNTS, // exported for testing (see functions/test/handlers.test.js)
};
