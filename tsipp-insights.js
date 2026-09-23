/*!
 * TSI Practice Prep – insights (tsipp-insights.js)
 * 1. Answer log: records each submitted practice answer with the student's
 *    confidence tap (Guessing / Not Sure / Confident). Hooks into the site's
 *    own renderQ / renderSAT / renderACT, the same way the site's v5 script does.
 * 2. Hidden weaknesses: "confident but wrong".
 * 3. Error pattern detector: skill, difficulty and question-feature patterns.
 * 4. Fix My Mistakes: a 12-minute recovery session built from the real bank.
 * 5. Study Tutor upgrade: hint that eliminates a choice, simpler steps,
 *    and a similar question from the verified bank (no invented questions).
 * Everything is stored in this browser (key tsipp_log_v1). Load after tsipp-data.js.
 */
(function (global, doc) {
  'use strict';
  var T = global.TSIPP = global.TSIPP || {};
  var LOG = 'tsipp_log_v1', MAX = 1500, DAY = 86400000;
  var SHELLS = [['practiceShell', 'TSIA2'], ['satPracticeShell', 'SAT'], ['actPracticeShell', 'ACT']];

  // ---------- engine access (globals from practice-engine-core.js) ----------
  function engineState(exam) {
    try {
      /* global state, satState, actState */
      if (exam === 'SAT') return typeof satState !== 'undefined' ? satState : null;
      if (exam === 'ACT') return typeof actState !== 'undefined' ? actState : null;
      return typeof state !== 'undefined' ? state : null;
    } catch (e) { return null; }
  }
  function bank(exam) { var b = global.ScorePathBank && global.ScorePathBank[exam]; return Array.isArray(b) ? b : []; }
  function activeExam() {
    for (var i = 0; i < SHELLS.length; i++) { var el = doc.getElementById(SHELLS[i][0]); if (el && el.classList.contains('show')) return SHELLS[i][1]; }
    return null;
  }
  function currentQ() {
    var exam = activeExam(); if (!exam) return null;
    var st = engineState(exam); if (!st || !st.set) return null;
    var q = st.set[st.i]; return q ? { exam: exam, st: st, q: q } : null;
  }

  // ---------- storage ----------
  function readLog() { try { var v = JSON.parse(global.localStorage.getItem(LOG) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function writeLog(arr) {
    try { global.localStorage.setItem(LOG, JSON.stringify(arr.slice(-MAX))); } catch (e) { }
    try { global.dispatchEvent(new CustomEvent('tsipp:change')); } catch (e) { }
  }

  // ---------- question features (for pattern detection) ----------
  var FEATURES = [
    ['negative', 'negative numbers or sign changes', function (s) { return /(^|[\s(=+×x*÷\/,])[-−–]\s?\d|negative/i.test(s); }],
    ['fraction', 'fractions', function (s) { return /\d\s*\/\s*\d|fraction/i.test(s); }],
    ['percent', 'percents', function (s) { return /%|percent/i.test(s); }],
    ['exponent', 'exponents or powers', function (s) { return /\^|²|³|<sup>|exponent|squared|cubed/i.test(s); }],
    ['except', '“NOT / EXCEPT / LEAST” wording', function (s) { return /\b(NOT|EXCEPT|LEAST)\b/.test(s); }],
    ['units', 'unit conversions or units', function (s) { return /\b(miles?|feet|foot|inch(es)?|meters?|km|hours?|minutes?|seconds?|gallons?|liters?|pounds?)\b/i.test(s) && /\bper\b|convert|each|rate/i.test(s); }],
    ['data', 'tables, graphs or charts', function (s) { return /\b(table|graph|chart|scatterplot|histogram|data)\b/i.test(s); }],
    ['word', 'long word problems', function (s) { return s.replace(/<[^>]+>/g, '').length > 220 && /\d/.test(s); }]
  ];
  function featuresOf(q) {
    var s = String(q.q || q.question || '');
    return FEATURES.filter(function (f) { try { return f[2](s); } catch (e) { return false; } }).map(function (f) { return f[0]; });
  }
  function featureLabel(id) { for (var i = 0; i < FEATURES.length; i++) if (FEATURES[i][0] === id) return FEATURES[i][1]; return id; }
  function normDiff(d) { d = String(d || '').toLowerCase(); return d.indexOf('hard') > -1 ? 'hard' : d.indexOf('easy') > -1 ? 'easy' : d ? 'medium' : ''; }

  // ---------- 1. answer logger ----------
  var pendingConf = {};              // exam|qid -> 'guess'|'unsure'|'sure'
  var logged = typeof WeakMap === 'function' ? new WeakMap() : null;
  function confValue(v) { v = String(v || '').toLowerCase(); return v.indexOf('guess') > -1 ? 'guess' : v.indexOf('not') > -1 ? 'unsure' : v.indexOf('confident') > -1 ? 'sure' : ''; }

  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-conf],[data-sat-conf],[data-act-conf]');
    if (!b) return;
    var c = currentQ(); if (!c) return;
    pendingConf[c.exam + '|' + c.q.id] = confValue(b.getAttribute('data-conf') || b.getAttribute('data-sat-conf') || b.getAttribute('data-act-conf'));
  }, true);

  function afterRender(exam) {
    var st = engineState(exam); if (!st || !st.set) return;
    var q = st.set[st.i]; if (!q || !q.id) return;
    if (!(st.submitted && st.submitted[q.id])) return;
    var ans = st.answers ? st.answers[q.id] : undefined; if (ans === undefined) return;
    var seen = logged ? logged.get(st.set) : null;
    if (logged && !seen) { seen = {}; logged.set(st.set, seen); }
    if (seen && seen[q.id]) return;
    if (seen) seen[q.id] = 1;
    var key = exam + '|' + q.id;
    var log = readLog();
    log.push({ t: Date.now(), e: exam, id: q.id, sk: q.skill || '', sec: q.section || '', d: normDiff(q.difficulty),
      ok: ans === q.a, c: pendingConf[key] || '', f: featuresOf(q), m: st.mode || '' });
    delete pendingConf[key];
    writeLog(log);
  }
  function wrap(name, exam) {
    var old = global[name];
    if (typeof old !== 'function' || old.__tsipp) return;
    var fn = function () { var r = old.apply(this, arguments); try { afterRender(exam); } catch (e) { } return r; };
    fn.__tsipp = true; global[name] = fn;
  }
  function hook() { wrap('renderQ', 'TSIA2'); wrap('renderSAT', 'SAT'); wrap('renderACT', 'ACT'); }

  // ---------- 2 + 3. insights ----------
  function pct(a, b) { return b ? Math.round(a * 100 / b) : 0; }
  function insights(exam) {
    var since = Date.now() - 30 * DAY;
    var rows = readLog().filter(function (r) { return r.e === exam && r.t >= since; });
    var withConf = rows.filter(function (r) { return r.c; });
    var sureWrong = rows.filter(function (r) { return r.c === 'sure' && !r.ok; });
    var bySkill = {};
    sureWrong.forEach(function (r) { bySkill[r.sk] = (bySkill[r.sk] || 0) + 1; });
    var hidden = { count: sureWrong.length, sureTotal: rows.filter(function (r) { return r.c === 'sure'; }).length,
      skills: Object.keys(bySkill).map(function (k) { return { skill: k, n: bySkill[k] }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 3) };

    var patterns = [];
    var overallMiss = rows.length ? rows.filter(function (r) { return !r.ok; }).length / rows.length : 0;

    // Overconfidence by skill
    var skills = {};
    rows.forEach(function (r) { (skills[r.sk] = skills[r.sk] || []).push(r); });
    Object.keys(skills).forEach(function (sk) {
      var s = skills[sk].filter(function (r) { return r.c === 'sure'; });
      var acc = pct(s.filter(function (r) { return r.ok; }).length, s.length);
      if (s.length >= 4 && acc < 60) patterns.push({ score: 90 - acc, skill: sk, kind: 'overconfident',
        text: 'You feel confident on ' + sk + ', but you get ' + acc + '% of those right.' });
    });
    // Harder questions
    Object.keys(skills).forEach(function (sk) {
      var hard = skills[sk].filter(function (r) { return r.d === 'hard'; }), rest = skills[sk].filter(function (r) { return r.d && r.d !== 'hard'; });
      if (hard.length >= 3 && rest.length >= 3) {
        var ha = pct(hard.filter(function (r) { return r.ok; }).length, hard.length), ra = pct(rest.filter(function (r) { return r.ok; }).length, rest.length);
        if (ra - ha >= 30) patterns.push({ score: ra - ha, skill: sk, kind: 'hard',
          text: 'Your accuracy drops from ' + ra + '% to ' + ha + '% on harder ' + sk + ' questions.' });
      }
    });
    // Question features (this week)
    var week = rows.filter(function (r) { return r.t >= Date.now() - 7 * DAY; });
    FEATURES.forEach(function (f) {
      var hit = week.filter(function (r) { return (r.f || []).indexOf(f[0]) > -1; });
      var miss = hit.filter(function (r) { return !r.ok; });
      if (hit.length >= 4 && miss.length >= 3 && miss.length / hit.length >= overallMiss + 0.2) {
        var skillCount = {}; miss.forEach(function (r) { skillCount[r.sk] = (skillCount[r.sk] || 0) + 1; });
        var topSkill = Object.keys(skillCount).sort(function (a, b) { return skillCount[b] - skillCount[a]; })[0];
        patterns.push({ score: pct(miss.length, hit.length), skill: topSkill, kind: 'feature',
          text: 'You missed ' + miss.length + ' of ' + hit.length + ' questions with ' + f[1] + ' this week.' });
      }
    });
    // Guessing
    var guesses = withConf.filter(function (r) { return r.c === 'guess'; }).length;
    if (withConf.length >= 10 && guesses / withConf.length >= 0.25) patterns.push({ score: 40, kind: 'guess',
      text: 'You marked “Guessing” on ' + pct(guesses, withConf.length) + '% of questions. Slow down on the first read and eliminate two choices before guessing.' });
    // Recent slump in one skill
    Object.keys(skills).forEach(function (sk) {
      var last = skills[sk].slice(-5);
      if (last.length === 5 && last.filter(function (r) { return !r.ok; }).length >= 4) patterns.push({ score: 70, skill: sk, kind: 'slump',
        text: 'You missed 4 of your last 5 ' + sk + ' questions. Review the rule before practicing more.' });
    });

    patterns.sort(function (a, b) { return b.score - a.score; });
    var seenText = {};
    patterns = patterns.filter(function (p) { if (seenText[p.text]) return false; seenText[p.text] = 1; return true; }).slice(0, 4);
    return { answers: rows.length, withConf: withConf.length, hidden: hidden, patterns: patterns, ready: rows.length >= 15 };
  }

  // ---------- 4. Fix My Mistakes ----------
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function recentMissIds(exam) {
    var seen = {}, out = [];
    // 1) review items due now, 2) latest logged misses, 3) engine mistake list
    try {
      var sched = JSON.parse(global.localStorage.getItem('scorepath_review_schedule_v7') || '{}');
      Object.keys(sched).map(function (k) { return sched[k]; })
        .filter(function (r) { return r && r.exam === exam; })
        .sort(function (a, b) { return new Date(a.due) - new Date(b.due); })
        .forEach(function (r) { if (!seen[r.id]) { seen[r.id] = 1; out.push(r.id); } });
    } catch (e) { }
    readLog().filter(function (r) { return r.e === exam && !r.ok; }).reverse().forEach(function (r) { if (!seen[r.id]) { seen[r.id] = 1; out.push(r.id); } });
    var s = null;
    try { /* global store, satStore, actStore */ s = exam === 'SAT' ? satStore : exam === 'ACT' ? actStore : store; } catch (e) { }
    ((s && s.mistakes) || []).slice().reverse().forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
    return out;
  }
  function planFix(exam) {
    var B = bank(exam); if (!B.length) return null;
    var byId = {}; B.forEach(function (q) { byId[q.id] = q; });
    var old = recentMissIds(exam).map(function (id) { return byId[id]; }).filter(Boolean).slice(0, 3);
    if (!old.length) return null;
    var recent = {}; readLog().filter(function (r) { return r.t > Date.now() - 7 * DAY; }).forEach(function (r) { recent[r.id] = 1; });
    var used = {}; old.forEach(function (q) { used[q.id] = 1; });
    var skills = old.map(function (q) { return q.skill; });
    function pick(filter, n) {
      var pool = shuffle(B.filter(function (q) { return !used[q.id] && !recent[q.id] && filter(q); }));
      if (pool.length < n) pool = pool.concat(shuffle(B.filter(function (q) { return !used[q.id] && filter(q) && pool.indexOf(q) < 0; })));
      var out = pool.slice(0, n); out.forEach(function (q) { used[q.id] = 1; }); return out;
    }
    var similar = [];
    for (var i = 0; similar.length < 4 && i < 8; i++) similar = similar.concat(pick(function (q) { return q.skill === skills[i % skills.length]; }, 1));
    var checks = pick(function (q) { return skills.indexOf(q.skill) > -1 && normDiff(q.difficulty) !== 'easy'; }, 2);
    var rules = [];
    old.forEach(function (q) { if (q.strategy && rules.indexOf(q.strategy) < 0) rules.push(q.strategy); });
    return { exam: exam, old: old, similar: similar, checks: checks, rules: rules.slice(0, 3),
      skills: skills.filter(function (s, i) { return s && skills.indexOf(s) === i; }), total: old.length + similar.length + checks.length };
  }
  function launchFix(plan) {
    if (!plan || typeof global.v9SetPending !== 'function' || typeof global.v9Launch !== 'function') { alert('Recovery sessions are not available right now.'); return; }
    var set = plan.old.concat(plan.similar, plan.checks);
    try { if (typeof randomizeSet === 'function') set = plan.old.concat(randomizeSet(plan.similar.concat(plan.checks))); } catch (e) { } /* global randomizeSet */
    var key = { TSIA2: 'tsi', SAT: 'sat', ACT: 'act' }[plan.exam];
    if (typeof global.v10ShowCenter === 'function') global.v10ShowCenter(key, true);
    global.v9SetPending({ exam: plan.exam, set: set, num: 0, timed: false, duration: 720, title: 'Fix My Mistakes · 12-minute recovery' });
    global.v9Launch(plan.exam);
  }

  // ---------- 5. Study Tutor upgrade ----------
  function sentences(s) {
    // no regex look-behind: older iPad Safari cannot parse it
    var parts = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/([.!?])\s+(?=[A-Z0-9(])/), out = [];
    for (var i = 0; i < parts.length; i += 2) { var t = (parts[i] + (parts[i + 1] || '')).trim(); if (t) out.push(t); }
    return out;
  }
  function tutorOut(nodes) {
    var box = doc.getElementById('v13TutorAnswer'); if (!box) return;
    while (box.firstChild) box.removeChild(box.firstChild);
    nodes.forEach(function (n) { box.appendChild(n); });
  }
  function el(tag, text, cls) { var e = doc.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; }
  var hintLevel = {};
  function tutorHint() {
    var c = currentQ(); if (!c) return;
    var q = c.q, k = c.exam + '|' + q.id;
    hintLevel[k] = (hintLevel[k] || 0) + 1;
    var out = [el('b', 'Hint ' + Math.min(hintLevel[k], 2) + (hintLevel[k] === 1 ? ' · what to look for' : ' · one choice you can cross out'))];
    if (hintLevel[k] === 1) out.push(el('p', q.strategy || 'Name the skill being tested, then predict the answer before reading the choices.'));
    else {
      var ans = c.st.answers ? c.st.answers[q.id] : undefined;
      var wrong = (q.choices || []).map(function (_, i) { return i; }).filter(function (i) { return i !== q.a && i !== ans && q.why && q.why[i]; });
      var i = wrong[Math.floor(Math.random() * wrong.length)];
      if (i === undefined) out.push(el('p', 'Re-read the question and check each choice against it.'));
      else { var lab = el('p'); lab.appendChild(el('b', 'Cross out ' + String.fromCharCode(65 + i) + '. ')); lab.appendChild(doc.createTextNode(String(q.why[i]).replace(/<[^>]+>/g, ''))); out.push(lab); }
      out.push(el('small', 'The answer stays hidden until you submit.', 'tsipp-tutor-note'));
    }
    tutorOut(out);
  }
  function tutorSimple() {
    var c = currentQ(); if (!c) return;
    var q = c.q, submitted = c.st.submitted && c.st.submitted[q.id];
    if (!submitted) { tutorOut([el('b', 'Simple plan'), el('p', q.strategy || 'Find what the question asks, remove choices that do not fit, then check your pick.'), el('small', 'Submit an answer to see the full explanation in simple steps.', 'tsipp-tutor-note')]); return; }
    var steps = sentences(q.ex).slice(0, 4);
    var ol = el('ol', '', 'tsipp-tutor-steps');
    steps.forEach(function (s) { ol.appendChild(el('li', s)); });
    tutorOut([el('b', 'The same explanation, one step at a time'), ol]);
  }
  function tutorSimilar() {
    var c = currentQ(); if (!c) return;
    var pool = bank(c.exam).filter(function (x) { return x.id !== c.q.id && x.skill === c.q.skill && Array.isArray(x.choices); });
    if (!pool.length) { tutorOut([el('p', 'No similar question is available for this skill yet.')]); return; }
    var x = pool[Math.floor(Math.random() * pool.length)];
    var wrap = el('div', '', 'tsipp-sim');
    wrap.appendChild(el('b', 'Try a similar ' + (x.skill || '') + ' question'));
    var stem = el('div', '', 'tsipp-sim-stem'); stem.innerHTML = x.q || ''; wrap.appendChild(stem); // first-party bank content (the site renders it the same way)
    var fb = el('div', '', 'tsipp-sim-fb');
    (x.choices || []).forEach(function (ch, i) {
      var b = el('button', '', 'tsipp-sim-choice'); b.type = 'button';
      b.innerHTML = '<span>' + String.fromCharCode(65 + i) + '</span> ' + ch;
      b.onclick = function () {
        wrap.querySelectorAll('.tsipp-sim-choice').forEach(function (o, j) { o.disabled = true; o.classList.toggle('is-right', j === x.a); o.classList.toggle('is-wrong', j === i && i !== x.a); });
        while (fb.firstChild) fb.removeChild(fb.firstChild);
        fb.appendChild(el('b', i === x.a ? 'Correct.' : 'Not quite.'));
        var why = el('p'); why.innerHTML = (i !== x.a && x.why && x.why[i] ? x.why[i] + ' ' : '') + (x.ex || ''); fb.appendChild(why);
      };
      wrap.appendChild(b);
    });
    wrap.appendChild(fb);
    tutorOut([wrap]);
  }
  function tutorAsk(text) {
    var c = currentQ(); if (!c || !global.TSIPP_AI_ENDPOINT) return;
    var q = c.q, submitted = !!(c.st.submitted && c.st.submitted[q.id]);
    tutorOut([el('p', 'Thinking…')]);
    fetch(global.TSIPP_AI_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exam: c.exam, questionId: q.id, message: String(text).slice(0, 500), submitted: submitted,
        studentAnswer: c.st.answers ? c.st.answers[q.id] : null }) })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (d) { tutorOut([el('p', String(d && d.reply || 'No answer.')), el('small', 'AI help can make mistakes. The written explanation is the checked answer.', 'tsipp-tutor-note')]); })
      .catch(function () { tutorOut([el('p', 'The tutor is not available right now. Try a hint or the step-by-step explanation.')]); });
  }
  function upgradeTutor() {
    var grid = doc.querySelector('#v13TutorModal .v13TutorGrid'); if (!grid || grid.__tsipp) return;
    grid.__tsipp = true;
    var hint = grid.querySelector('[data-v13-tutor="hint"]'); if (hint) { hint.textContent = 'Hint (no answer)'; hint.onclick = tutorHint; }
    var simple = grid.querySelector('[data-v13-tutor="simple"]'); if (simple) simple.onclick = tutorSimple;
    var sim = el('button', 'Try a similar question'); sim.type = 'button'; sim.onclick = tutorSimilar; grid.appendChild(sim);
    if (global.TSIPP_AI_ENDPOINT) {
      var f = el('form', '', 'tsipp-ask'), inp = el('input'); inp.type = 'text'; inp.placeholder = 'Ask about this question…'; inp.setAttribute('aria-label', 'Ask the tutor');
      var go = el('button', 'Ask'); go.type = 'submit'; f.appendChild(inp); f.appendChild(go);
      f.onsubmit = function (e) { e.preventDefault(); if (inp.value.trim()) tutorAsk(inp.value.trim()); };
      grid.parentNode.insertBefore(f, grid.nextSibling);
    }
  }

  // ---------- boot ----------
  function boot() { hook(); upgradeTutor(); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 400); });
  else setTimeout(boot, 400);
  global.addEventListener('load', function () { setTimeout(boot, 200); });

  T.insights = insights;
  T.planFix = planFix;
  T.launchFix = launchFix;
  T._log = readLog;
})(window, document);
