/*!
 * TSI Practice Prep – Phase 1 data adapter (tsipp-data.js)
 * Reads the data the site ALREADY saves, so existing students see their
 * history on day one. Nothing here writes to the site's own keys except
 * the optional per-exam test date and nickname (own key: tsipp_prefs_v1).
 *
 * Sources used:
 *   store / satStore / actStore  (practice-engine-core.js)  -> .history[], .mistakes[]
 *   scorepath_error_reasons_v5   -> { questionId: 'Concept Gap' | 'Process Error' | 'Reading Trap' | 'Pacing / Guess' }
 *   scorepath_review_schedule_v7 -> { 'EXAM|id': { exam, id, stage, due, lastResult, updated } }
 *   scorepathV13Goals            -> { TSIAMath, TSIAELAR, SAT, ACT }
 *   scorepath_v2_goal            -> { goalExam, goalDate }   (fallback test date)
 *   scorepathTSISession / SAT / ACT -> unfinished session
 */
(function (global) {
  'use strict';

  var PREFS = 'tsipp_prefs_v1';
  var MIN_EVIDENCE = 5;
  var MASTERY_WINDOW = 20;
  var EXAMS = ['TSIA2', 'SAT', 'ACT'];
  var SESSION_KEYS = { TSIA2: 'scorepathTSISession', SAT: 'scorepathSATSession', ACT: 'scorepathACTSession' };

  var MISTAKE_TYPES = [
    { id: 'concept', label: 'Concept Gap', name: 'Concept gap', desc: 'Did not know the rule, formula or idea yet',
      tip: 'Open the quick lesson for this skill before practicing more questions.' },
    { id: 'process', label: 'Process Error', name: 'Process error', desc: 'Knew it, slipped on a step or calculation',
      tip: 'Write each step on the scratchpad and re-check signs and arithmetic before you submit.' },
    { id: 'reading', label: 'Reading Trap', name: 'Reading trap', desc: 'Misread a word, unit, qualifier or evidence',
      tip: 'Underline what the question actually asks (the unit, “NOT”, “most likely”) before reading the choices.' },
    { id: 'pacing', label: 'Pacing / Guess', name: 'Pacing / guess', desc: 'Ran short on time or guessed',
      tip: 'Skip a question after about 90 seconds, flag it, and come back instead of guessing early.' }
  ];

  // ---------- safe readers ----------
  function readJSON(key, fallback) {
    try { var v = JSON.parse(global.localStorage.getItem(key) || 'null'); return v === null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { global.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
    try { global.dispatchEvent(new CustomEvent('tsipp:change')); } catch (e) { }
  }
  // The engine declares these as globals in practice-engine-core.js.
  function engineStore(exam) {
    try {
      /* global store, satStore, actStore */
      if (exam === 'SAT') return typeof satStore !== 'undefined' ? satStore : null;
      if (exam === 'ACT') return typeof actStore !== 'undefined' ? actStore : null;
      return typeof store !== 'undefined' ? store : null;
    } catch (e) { return null; }
  }
  function examOfId(id, fallback) {
    id = String(id || '');
    if (id.indexOf('SAT-') === 0) return 'SAT';
    if (id.indexOf('ACT-') === 0) return 'ACT';
    if (id.indexOf('TSI-') === 0) return 'TSIA2';
    return fallback;
  }

  // ---------- dates ----------
  function dayKey(t) {
    var d = new Date(t);
    if (isNaN(d)) return '';
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysUntil(iso) {
    var a = new Date(dayKey(Date.now()) + 'T00:00:00'), b = new Date(iso + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }

  // ---------- prefs ----------
  function prefs() { return Object.assign({ name: '', testDates: {}, lastExam: '' }, readJSON(PREFS, {})); }
  function setPref(fn) { var p = prefs(); fn(p); writeJSON(PREFS, p); }

  // ---------- core reads ----------
  function history(exam) {
    var s = engineStore(exam);
    var rows = (s && Array.isArray(s.history)) ? s.history.slice() : [];
    return rows.filter(function (h) { return h && h.total > 0; })
      .sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  }

  function skillMap(exam) {
    var hist = history(exam);
    var agg = {};
    // newest first, stop counting a skill once it has MASTERY_WINDOW answers
    for (var i = hist.length - 1; i >= 0; i--) {
      var sk = hist[i].skills || {};
      Object.keys(sk).forEach(function (name) {
        var v = sk[name] || {}, a = agg[name] || (agg[name] = { name: name, total: 0, wTotal: 0, wCorrect: 0 });
        var t = +v.total || 0, c = +v.correct || 0;
        a.total += t;
        if (a.wTotal < MASTERY_WINDOW) { a.wTotal += t; a.wCorrect += c; }
      });
    }
    return Object.keys(agg).map(function (k) {
      var a = agg[k];
      var pct = a.wTotal ? Math.round(a.wCorrect * 100 / a.wTotal) : null;
      var enough = a.wTotal >= MIN_EVIDENCE;
      return {
        name: a.name, area: '', total: a.total, pct: enough ? pct : null,
        level: !enough ? 'none' : pct < 60 ? 'priority' : pct < 80 ? 'developing' : 'strong'
      };
    }).sort(function (a, b) {
      if (a.pct === null && b.pct === null) return b.total - a.total;
      if (a.pct === null) return 1;
      if (b.pct === null) return -1;
      return a.pct - b.pct;
    });
  }

  function mistakeDNA(exam) {
    var reasons = readJSON('scorepath_error_reasons_v5', {});
    var s = engineStore(exam);
    var missed = (s && Array.isArray(s.mistakes)) ? s.mistakes : [];
    var tagged = Object.keys(reasons).filter(function (id) { return examOfId(id, null) === exam || (examOfId(id, null) === null && missed.indexOf(id) > -1); });
    var rows = MISTAKE_TYPES.map(function (m) {
      var n = tagged.filter(function (id) { return reasons[id] === m.label; }).length;
      return { id: m.id, name: m.name, desc: m.desc, tip: m.tip, n: n, pct: 0 };
    });
    var total = rows.reduce(function (t, r) { return t + r.n; }, 0);
    rows.forEach(function (r) { r.pct = total ? Math.round(r.n * 100 / total) : 0; });
    var sorted = rows.slice().sort(function (a, b) { return b.n - a.n; });
    var untagged = missed.filter(function (id) { return !reasons[id]; }).length;
    return { total: total, rows: rows, top: sorted[0], topTwoPct: total ? sorted[0].pct + sorted[1].pct : 0, ready: total >= 5, untagged: untagged };
  }

  function reviewQueue(exam) {
    var sched = readJSON('scorepath_review_schedule_v7', {});
    var now = Date.now(), weekEnd = now + 7 * 86400000, today = dayKey(now);
    var items = Object.keys(sched).map(function (k) { return sched[k]; }).filter(function (r) { return r && r.exam === exam; });
    return {
      due: items.filter(function (r) { return new Date(r.due).getTime() <= now; }),
      week: items.filter(function (r) { var t = new Date(r.due).getTime(); return t > now && t <= weekEnd; }).length,
      total: items.length,
      reviewedToday: items.filter(function (r) { return r.updated && dayKey(r.updated) === today && r.lastResult === 'correct'; }).length,
      everCorrect: Object.keys(sched).some(function (k) { return sched[k] && sched[k].lastResult === 'correct'; })
    };
  }

  function trend(exam) {
    return history(exam).filter(function (h) { return h.total >= 5; }).slice(-6)
      .map(function (h) { return { pct: Math.round(h.score * 100 / h.total), n: h.total, date: h.date }; });
  }

  function allDays() {
    var days = {};
    EXAMS.forEach(function (e) { history(e).forEach(function (h) { var k = dayKey(h.date); if (k) days[k] = true; }); });
    return days;
  }
  function streakInfo() {
    var days = allDays(), now = Date.now(), today = dayKey(now);
    var n = 0, t = days[today] ? now : now - 86400000;
    while (days[dayKey(t)]) { n++; t -= 86400000; }
    var dow = (new Date().getDay() + 6) % 7, week = [];
    for (var i = 0; i < 7; i++) {
      var k = dayKey(now + (i - dow) * 86400000);
      week.push({ key: k, studied: !!days[k], isToday: k === today });
    }
    return { streak: n, week: week, studiedToday: !!days[today] };
  }

  function todayCounts(exam) {
    var today = dayKey(Date.now()), bySkill = {}, total = 0;
    history(exam).forEach(function (h) {
      if (dayKey(h.date) !== today) return;
      total += h.total;
      var sk = h.skills || {};
      Object.keys(sk).forEach(function (n) { bySkill[n] = (bySkill[n] || 0) + (+sk[n].total || 0); });
    });
    return { total: total, bySkill: bySkill };
  }

  function mission(exam, skills, rq) {
    var t = todayCounts(exam), tasks = [];
    var measured = skills.filter(function (x) { return x.pct !== null; });
    var priority = measured[0] || skills[0] || null;
    var second = measured[1] || null;
    if (rq.due.length) {
      var n = Math.min(rq.due.length, 5);
      tasks.push({ kind: 'review', title: 'Review ' + n + ' missed question' + (n > 1 ? 's' : ''), why: 'Spaced review · due today', min: Math.max(2, Math.round(n * 1.5)), goal: n, done: Math.min(rq.reviewedToday, n) });
    }
    if (priority) tasks.push({ kind: 'skill', skill: priority.name, title: '10 ' + priority.name + ' questions', why: 'Your #1 priority skill', min: 12, goal: 10, done: Math.min(t.bySkill[priority.name] || 0, 10) });
    if (tasks.length < 3 && second) tasks.push({ kind: 'skill', skill: second.name, title: '5 ' + second.name + ' questions', why: 'Second-weakest skill', min: 6, goal: 5, done: Math.min(t.bySkill[second.name] || 0, 5) });
    if (tasks.length < 3) {
      var used = tasks.reduce(function (s, x) { return s + (x.kind === 'skill' ? x.done : 0); }, 0);
      tasks.push({ kind: 'quick', title: '5-question mixed warm-up', why: 'Keeps every skill fresh', min: 5, goal: 5, done: Math.min(Math.max(t.total - used, 0), 5) });
    }
    tasks.forEach(function (x) { x.complete = x.done >= x.goal; });
    return { tasks: tasks, priority: priority, minutes: tasks.reduce(function (m, x) { return m + x.min; }, 0) };
  }

  // Same practice-estimate tables the site already publishes (v7 script).
  function interp(pts, x) {
    for (var i = 1; i < pts.length; i++) if (x <= pts[i][0]) {
      var a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return pts[pts.length - 1][1];
  }
  function estimate(exam, tr) {
    var last = tr.slice(-3);
    if (!last.length) return null;
    var acc = last.reduce(function (s, x) { return s + x.pct; }, 0) / last.length;
    var goals = Object.assign({ TSIAMath: 950, TSIAELAR: 945, SAT: 1450, ACT: 32 }, readJSON('scorepathV13Goals', {}));
    if (exam === 'SAT') {
      var v = Math.round(interp([[0, 400], [40, 850], [50, 1000], [60, 1120], [70, 1240], [80, 1360], [90, 1480], [100, 1600]], acc) / 10) * 10;
      var lo = Math.max(400, v - 40), hi = Math.min(1600, v + 40);
      return [{ label: 'Total score · goal ' + goals.SAT, range: lo + '–' + hi, status: hi >= goals.SAT ? 'Goal in range' : (goals.SAT - hi) + '+ to goal', tone: hi >= goals.SAT ? 'good' : 'warn' }];
    }
    if (exam === 'ACT') {
      var c = Math.round(interp([[0, 1], [40, 14], [50, 18], [60, 22], [70, 25], [80, 29], [90, 33], [100, 36]], acc));
      var l2 = Math.max(1, c - 1), h2 = Math.min(36, c + 1);
      return [{ label: 'Composite · goal ' + goals.ACT, range: l2 + '–' + h2, status: h2 >= goals.ACT ? 'Goal in range' : (goals.ACT - h2) + '+ to goal', tone: h2 >= goals.ACT ? 'good' : 'warn' }];
    }
    var a = Math.round(acc);
    var label = a >= 80 ? 'Strong readiness signal' : a >= 65 ? 'Developing readiness' : a >= 50 ? 'Needs targeted review' : 'Build fundamentals first';
    return [{ label: 'Recent accuracy · benchmarks Math ' + goals.TSIAMath + ', ELAR ' + goals.TSIAELAR, range: a + '%', status: label, tone: a >= 80 ? 'good' : a >= 65 ? 'warn' : 'bad' }];
  }

  function unfinished(exam) {
    var x = readJSON(SESSION_KEYS[exam], null);
    return !!(x && x.ids && x.ids.length);
  }

  function summary(exam) {
    var p = prefs();
    exam = exam || p.lastExam || 'TSIA2';
    var skills = skillMap(exam), rq = reviewQueue(exam), tr = trend(exam), st = streakInfo();
    var v2 = readJSON('scorepath_v2_goal', {});
    var date = p.testDates[exam] || (v2 && v2.goalExam === exam && v2.goalDate) || '';
    var hist = history(exam);
    var answered = hist.reduce(function (s, h) { return s + (+h.total || 0); }, 0);
    var answeredAll = EXAMS.reduce(function (s, e) { return s + history(e).reduce(function (t, h) { return t + (+h.total || 0); }, 0); }, 0);
    var perfect = EXAMS.some(function (e) { return history(e).some(function (h) { return h.total >= 10 && h.score === h.total; }); });
    return {
      exam: exam, name: p.name, answered: answered, sessions: hist.length,
      skills: skills, practiced: skills.length,
      dna: mistakeDNA(exam), review: rq, trend: tr, estimate: estimate(exam, tr),
      streak: st, mission: mission(exam, skills, rq),
      testDate: date, daysLeft: date ? daysUntil(date) : null,
      hasUnfinished: unfinished(exam),
      badges: [
        { label: '7-day streak', on: st.streak >= 7 },
        { label: '100 questions', on: answeredAll >= 100 },
        { label: 'Comeback', on: rq.everCorrect },
        { label: 'Perfect 10', on: perfect }
      ]
    };
  }

  global.TSIPP = Object.assign(global.TSIPP || {}, {
    summary: summary,
    setTestDate: function (exam, iso) { setPref(function (p) { if (iso) p.testDates[exam] = iso; else delete p.testDates[exam]; }); },
    setName: function (n) { setPref(function (p) { p.name = String(n || '').slice(0, 30); }); },
    setLastExam: function (e) { setPref(function (p) { p.lastExam = e; }); },
    history: history, dayKey: dayKey, EXAMS: EXAMS
  });
})(window);
