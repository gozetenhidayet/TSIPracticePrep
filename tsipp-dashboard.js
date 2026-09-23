/*!
 * TSI Practice Prep – Phase 1 dashboard (tsipp-dashboard.js)
 * Needs tsipp-data.js first. Renders into <div id="tsipp-dashboard"></div>.
 * One panel instead of Command Center + Smart Learning + My Results + My Progress.
 * Buttons drive the site's existing engine (diagnostic, question bank, review),
 * so every answer is still recorded by practice-engine-core.js as before.
 */
(function (global, doc) {
  'use strict';
  var T = global.TSIPP;
  if (!T || !T.summary) { console.error('tsipp-dashboard.js: load tsipp-data.js first'); return; }

  var KEY = { TSIA2: 'tsi', SAT: 'sat', ACT: 'act' };
  var REVIEW_BTN = { TSIA2: 'v7ReviewTSI', SAT: 'v7ReviewSAT', ACT: 'v7ReviewACT' };
  var GUIDE = { TSIA2: 'tsia2.html', SAT: 'sat-practice-questions.html', ACT: 'act.html' };

  // ---------- actions: reuse the site's own controls ----------
  function byId(id) { return doc.getElementById(id); }
  function fire(el, type) { el.dispatchEvent(new Event(type, { bubbles: true })); }
  function showCenter(exam) {
    if (typeof global.v10ShowCenter === 'function') global.v10ShowCenter(KEY[exam]);
    else location.hash = KEY[exam] + '-center';
  }
  function bank(exam, skill, size) {
    var ex = byId('bankExam'), launch = byId('bankLaunch');
    if (!ex || !launch) { showCenter(exam); return; }
    ex.value = exam; fire(ex, 'change');
    setTimeout(function () {
      var sec = byId('bankSection'), sk = byId('bankSkill'), sz = byId('bankSize'), dif = byId('bankDifficulty');
      if (sec) { sec.value = 'All'; fire(sec, 'change'); }
      setTimeout(function () {
        if (sk) {
          var has = skill && Array.prototype.some.call(sk.options, function (o) { return o.value === skill; });
          sk.value = has ? skill : 'All'; fire(sk, 'change');
        }
        if (dif) { dif.value = 'All'; fire(dif, 'change'); }
        if (sz) { sz.value = String(size); fire(sz, 'change'); }
        launch.click();
      }, 80);
    }, 80);
  }
  var ACT = {
    diagnostic: function (exam) {
      var b = doc.querySelector('[data-v10-diag="' + KEY[exam] + '"]');
      if (b) b.click(); else showCenter(exam);
    },
    review: function (exam) { var b = byId(REVIEW_BTN[exam]); if (b && !b.disabled) b.click(); else showCenter(exam); },
    quick: function (exam) { bank(exam, 'All', 5); },
    practiceSkill: function (exam, skill) { bank(exam, skill, 10); },
    resume: function (exam) { showCenter(exam); }
  };
  T.actions = ACT;

  // ---------- tiny DOM helper (text is always textContent) ----------
  function h(tag, attrs, kids) {
    var el = doc.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === 'string' || typeof c === 'number' ? doc.createTextNode(String(c)) : c);
    });
    return el;
  }
  function svg(path) {
    var s = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'tsipp-ico');
    s.innerHTML = path; // static icon markup only
    return s;
  }
  var ICON = {
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1.2 2.5 2.2 2.5C11 8.5 11 5.5 12 3z"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    device: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>'
  };
  var DNA_COLORS = { concept: '#0F6E68', process: '#C2410C', reading: '#6B4E9B', pacing: '#7A8699' };

  function greeting() { var hr = new Date().getHours(); return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'; }
  function fmtDate(iso) { return iso ? new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''; }
  function card(cls, kids) { return h('section', { class: 'tsipp-card ' + (cls || '') }, kids); }
  function kicker(icon, text) { return h('div', { class: 'tsipp-kicker' }, [icon ? svg(ICON[icon]) : null, text]); }
  function btn(onclick, text, variant) { return h('button', { type: 'button', class: 'tsipp-btn tsipp-btn--' + (variant || 'primary'), onclick: onclick }, [text]); }

  // ---------- sections ----------
  function header(S, rerender) {
    var title;
    if (S.name) title = h('h2', { class: 'tsipp-h1', text: greeting() + ', ' + S.name });
    else {
      var input = h('input', { type: 'text', class: 'tsipp-name', placeholder: 'Add your first name (optional)', 'aria-label': 'Your first name', maxlength: '30' });
      input.addEventListener('change', function () { T.setName(input.value.trim()); });
      title = h('div', { class: 'tsipp-namewrap' }, [h('h2', { class: 'tsipp-h1', text: 'My dashboard' }), input]);
    }
    var tabs = h('div', { class: 'tsipp-tabs', role: 'group', 'aria-label': 'Choose exam' }, T.EXAMS.map(function (x) {
      return h('button', { type: 'button', class: 'tsipp-tab' + (x === S.exam ? ' is-on' : ''), 'aria-pressed': x === S.exam ? 'true' : 'false',
        onclick: function () { T.setLastExam(x); rerender(x); } }, [x]);
    }));
    var sub = S.answered >= 5
      ? S.exam + ' · ' + S.mission.tasks.length + ' short tasks today, about ' + S.mission.minutes + ' minutes'
      : S.exam + ' · start with a short diagnostic to build your plan';
    return h('div', { class: 'tsipp-head' }, [h('div', {}, [title, h('p', { class: 'tsipp-muted', text: sub })]), tabs]);
  }

  function testDayCard(S) {
    var body = (S.daysLeft !== null && S.daysLeft >= 0) ? [
      h('div', { class: 'tsipp-big' }, [h('span', { class: 'tsipp-num', text: String(S.daysLeft) }), h('span', { class: 'tsipp-unit', text: S.daysLeft === 1 ? 'day left' : 'days left' })]),
      h('div', { text: fmtDate(S.testDate) }),
      S.practiced ? h('div', { class: 'tsipp-muted tsipp-sm', text: 'You have practiced ' + S.practiced + ' ' + S.exam + ' skill' + (S.practiced > 1 ? 's' : '') + ' so far.' }) : null
    ] : [h('p', { class: 'tsipp-muted', text: S.exam === 'TSIA2' ? 'Add your testing-center appointment to get a countdown.' : 'Add your test date to get a countdown and a daily plan.' })];
    var input = h('input', { type: 'date', class: 'tsipp-date', value: S.testDate || '' });
    input.addEventListener('change', function () { T.setTestDate(S.exam, input.value); });
    return card('', [kicker('cal', 'Test day')].concat(body).concat([h('label', { class: 'tsipp-sm tsipp-datelabel' }, [S.testDate ? 'Change date' : 'Set date', input])]));
  }

  function estimateCard(S) {
    var kids = [kicker('chart', S.exam === 'TSIA2' ? 'Readiness (practice)' : 'Practice estimate')];
    if (S.estimate) S.estimate.forEach(function (r) {
      kids.push(h('div', { class: 'tsipp-est' }, [
        h('div', { class: 'tsipp-row' }, [h('span', { class: 'tsipp-muted tsipp-sm', text: r.label }), h('span', { class: 'tsipp-status tsipp-status--' + r.tone, text: r.status })]),
        h('div', { class: 'tsipp-est-range', text: r.range })
      ]));
    });
    else kids.push(h('p', { class: 'tsipp-muted', text: 'Finish a practice set of 5 or more questions to see an estimate.' }));
    kids.push(h('p', { class: 'tsipp-fine', text: S.exam === 'TSIA2'
      ? 'TSIA2 has no predicted scaled score here. Based on your last 3 sessions. Not an official score.'
      : 'Based on your last 3 sessions. Practice estimate only, not an official score.' }));
    return card('', kids);
  }

  function streakCard(S) {
    var d = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return card('', [
      kicker('flame', 'Study streak'),
      h('div', { class: 'tsipp-big' }, [h('span', { class: 'tsipp-num tsipp-warm', text: String(S.streak.streak) }), h('span', { class: 'tsipp-unit', text: S.streak.streak === 1 ? 'day' : 'days' })]),
      h('div', { class: 'tsipp-week', 'aria-label': 'Days studied this week: ' + S.streak.week.filter(function (w) { return w.studied; }).length + ' of 7' },
        S.streak.week.map(function (w, i) {
          return h('div', { class: 'tsipp-day' }, [h('span', { class: 'tsipp-dot' + (w.studied ? ' is-on' : '') + (w.isToday && !w.studied ? ' is-today' : '') }), h('span', { class: 'tsipp-sm tsipp-muted', text: d[i] })]);
        })),
      h('div', { class: 'tsipp-badges' }, S.badges.map(function (b) {
        return h('span', { class: 'tsipp-badge' + (b.on ? ' is-on' : ''), text: b.on ? b.label : b.label + ' · locked' });
      }))
    ]);
  }

  function missionCard(S) {
    var M = S.mission, done = M.tasks.filter(function (t) { return t.complete; }).length;
    return card('tsipp-span7', [
      h('div', { class: 'tsipp-row' }, [h('h3', { class: 'tsipp-h2', text: 'Today’s mission' }), h('span', { class: 'tsipp-muted tsipp-sm', text: done + ' of ' + M.tasks.length + ' done · about ' + M.minutes + ' min' })]),
      h('div', { class: 'tsipp-bar', role: 'progressbar', 'aria-label': 'Mission progress', 'aria-valuemin': '0', 'aria-valuemax': String(M.tasks.length), 'aria-valuenow': String(done) },
        [h('span', { style: 'width:' + Math.round(done * 100 / M.tasks.length) + '%' })]),
      h('ul', { class: 'tsipp-tasks' }, M.tasks.map(function (t) {
        var go = t.kind === 'review' ? function () { ACT.review(S.exam); } : t.kind === 'skill' ? function () { ACT.practiceSkill(S.exam, t.skill); } : function () { ACT.quick(S.exam); };
        return h('li', {}, [h('button', { type: 'button', class: 'tsipp-task' + (t.complete ? ' is-done' : ''), onclick: go }, [
          h('span', { class: 'tsipp-check' }, [t.complete ? svg(ICON.check) : null]),
          h('span', { class: 'tsipp-tasktext' }, [h('span', { class: 'tsipp-tasktitle', text: t.title }), h('span', { class: 'tsipp-sm tsipp-muted', text: t.why + ' · ' + t.done + '/' + t.goal })]),
          h('span', { class: 'tsipp-sm tsipp-muted', text: t.min + ' min' })
        ])]);
      })),
      h('div', { class: 'tsipp-actions' }, [
        S.hasUnfinished
          ? btn(function () { ACT.resume(S.exam); }, 'Continue where I left off')
          : btn(function () {
              var t = M.tasks.filter(function (x) { return !x.complete; })[0] || M.tasks[0];
              if (t.kind === 'review') ACT.review(S.exam);
              else if (t.kind === 'skill') ACT.practiceSkill(S.exam, t.skill);
              else ACT.quick(S.exam);
            }, 'Start next task'),
        btn(function () { ACT.quick(S.exam); }, '5-question warm-up', 'ghost')
      ])
    ]);
  }

  function priorityCard(S) {
    var p = S.mission.priority;
    if (!p) return null;
    var extra = S.dna.ready && S.dna.top && S.dna.top.n ? ' Your most common miss type is ' + S.dna.top.name.toLowerCase() + '.' : '';
    return card('tsipp-span5 tsipp-dark', [
      h('span', { class: 'tsipp-kicker tsipp-kicker--warm', text: 'Your #1 priority' }),
      h('div', { class: 'tsipp-h-display', text: p.name }),
      p.pct !== null ? h('div', { class: 'tsipp-row' }, [h('div', { class: 'tsipp-bar tsipp-bar--dark' }, [h('span', { style: 'width:' + p.pct + '%' })]), h('strong', { text: p.pct + '% mastery' })]) : null,
      h('p', { class: 'tsipp-dark-muted', text: (p.pct === null ? 'Not enough answers in this skill yet.' : 'Based on your most recent answers in this skill.') + extra }),
      h('div', { class: 'tsipp-actions' }, [
        btn(function () { ACT.practiceSkill(S.exam, p.name); }, 'Practice this skill', 'light'),
        h('a', { class: 'tsipp-btn tsipp-btn--outline-light', href: GUIDE[S.exam] }, ['Study guide'])
      ])
    ]);
  }

  function dnaCard(S) {
    var D = S.dna;
    var kids = [h('div', {}, [h('h3', { class: 'tsipp-h2', text: 'Mistake DNA' }),
      h('p', { class: 'tsipp-muted tsipp-sm', text: D.ready ? 'Why your last ' + D.total + ' tagged misses went wrong' : 'Appears after you tag 5 missed questions. Tagged so far: ' + D.total + '.' })])];
    if (D.ready) kids.push(h('div', { class: 'tsipp-stack', 'aria-hidden': 'true' }, D.rows.filter(function (r) { return r.n; }).map(function (r) {
      return h('span', { style: 'width:' + r.pct + '%;background:' + DNA_COLORS[r.id] });
    })));
    kids.push(h('ul', { class: 'tsipp-dna' }, D.rows.map(function (r) {
      return h('li', {}, [
        h('span', { class: 'tsipp-swatch', style: 'background:' + DNA_COLORS[r.id] }),
        h('span', { class: 'tsipp-tasktext' }, [h('strong', { text: r.name }), h('span', { class: 'tsipp-sm tsipp-muted', text: r.desc })]),
        h('span', { class: 'tsipp-sm tsipp-muted', text: r.n + ' Qs' }),
        h('span', { class: 'tsipp-pct', text: D.ready ? r.pct + '%' : '—' })
      ]);
    })));
    if (D.ready && D.top && D.top.n) kids.push(h('div', { class: 'tsipp-insight' }, [
      h('strong', { text: D.top.name + 's are your biggest leak (' + D.top.pct + '%).' }),
      h('span', { text: 'Try this: ' + D.top.tip + ' Your top two types cover ' + D.topTwoPct + '% of tagged misses.' })
    ]));
    kids.push(h('p', { class: 'tsipp-fine', text: D.untagged
      ? D.untagged + ' missed question' + (D.untagged > 1 ? 's are' : ' is') + ' not tagged yet. After a wrong answer, tap the reason under the explanation.'
      : 'Tag the reason under each explanation after a wrong answer to keep this accurate.' }));
    return card('', kids);
  }

  function skillCard(S) {
    var kids = [
      h('div', {}, [h('h3', { class: 'tsipp-h2', text: 'Skill map' }), h('p', { class: 'tsipp-muted tsipp-sm', text: 'Weakest first · mastery needs at least 5 questions' })]),
      h('div', { class: 'tsipp-legend' }, [['priority', 'Priority <60'], ['developing', 'Developing 60–79'], ['strong', 'Strong 80+'], ['none', 'Not enough data']].map(function (x) {
        return h('span', {}, [h('i', { class: 'tsipp-lg tsipp-lg--' + x[0] }), x[1]]);
      }))
    ];
    if (!S.skills.length) kids.push(h('p', { class: 'tsipp-muted', text: 'Skills appear here after your first practice set.' }));
    else kids.push(h('ul', { class: 'tsipp-skills' }, S.skills.slice(0, 12).map(function (s) {
      return h('li', {}, [h('button', { type: 'button', class: 'tsipp-skill', onclick: function () { ACT.practiceSkill(S.exam, s.name); }, 'aria-label': 'Practice ' + s.name }, [
        h('span', { class: 'tsipp-tasktext' }, [h('span', { text: s.name }), h('span', { class: 'tsipp-sm tsipp-muted', text: s.total + ' questions' })]),
        h('span', { class: 'tsipp-bar' }, [h('span', { class: 'tsipp-fill--' + s.level, style: 'width:' + (s.pct === null ? 6 : Math.max(s.pct, 4)) + '%' })]),
        h('span', { class: 'tsipp-pct tsipp-txt--' + s.level, text: s.pct === null ? '—' : s.pct + '%' })
      ])]);
    })));
    return card('', kids);
  }

  function insightsCard(S) {
    if (!T.insights) return null;
    var I = T.insights(S.exam), H = I.hidden;
    var kids = [h('div', {}, [h('h3', { class: 'tsipp-h2', text: 'Hidden weaknesses' }),
      h('p', { class: 'tsipp-muted tsipp-sm', text: 'From your confidence taps and answers in the last 30 days' })])];
    if (H.sureTotal) {
      kids.push(h('div', { class: 'tsipp-hidden' + (H.count ? ' is-alert' : '') }, [
        h('span', { class: 'tsipp-num-md', text: String(H.count) }),
        h('span', { class: 'tsipp-tasktext' }, [
          h('strong', { text: H.count ? 'Confident but wrong' : 'No confident misses' }),
          h('span', { class: 'tsipp-sm', text: H.count
            ? 'You tapped “Confident” and missed ' + H.count + ' of ' + H.sureTotal + ' questions' + (H.skills.length ? ', most in ' + H.skills.map(function (x) { return x.skill; }).join(', ') + '.' : '.')
            : 'Every question you marked “Confident” was right. Nice calibration.' })
        ])
      ]));
    } else kids.push(h('p', { class: 'tsipp-sm tsipp-muted', text: 'Tap Guessing, Not Sure or Confident before you submit. This card then shows where you feel sure but miss.' }));
    kids.push(h('h4', { class: 'tsipp-h4', text: 'Patterns we noticed' }));
    if (I.patterns.length) kids.push(h('ul', { class: 'tsipp-patterns' }, I.patterns.map(function (p) {
      return h('li', {}, [h('span', { text: p.text }), p.skill ? h('button', { type: 'button', class: 'tsipp-link', onclick: function () { ACT.practiceSkill(S.exam, p.skill); } }, ['Practice ' + p.skill + ' →']) : null]);
    })));
    else kids.push(h('p', { class: 'tsipp-sm tsipp-muted', text: I.ready ? 'No clear pattern right now. Keep practicing in untimed mode.' : 'Patterns appear after about 15 answers in practice mode. So far: ' + I.answers + '.' }));
    return card('tsipp-span7', kids);
  }

  function fixCard(S) {
    if (!T.planFix) return null;
    var P = T.planFix(S.exam);
    var kids = [h('span', { class: 'tsipp-kicker tsipp-kicker--warm', text: 'Fix my mistakes' })];
    if (!P) {
      kids.push(h('div', { class: 'tsipp-h-display', text: 'Nothing to fix yet' }));
      kids.push(h('p', { class: 'tsipp-dark-muted', text: 'Missed questions from practice will be turned into a short recovery session here.' }));
      return card('tsipp-span5 tsipp-dark', kids);
    }
    kids.push(h('div', { class: 'tsipp-h-display', text: 'A ' + Math.max(8, Math.round(P.total * 1.3)) + '-minute recovery session' }));
    kids.push(h('ul', { class: 'tsipp-fixlist' }, [
      [P.old.length, P.old.length === 1 ? 'old mistake to redo' : 'old mistakes to redo'],
      [P.similar.length, 'similar fresh questions'],
      [P.rules.length, P.rules.length === 1 ? 'rule review' : 'rule reviews'],
      [P.checks.length, 'mastery checks']
    ].filter(function (r) { return r[0]; }).map(function (r) { return h('li', {}, [h('strong', { text: String(r[0]) }), ' ' + r[1]]); })));
    if (P.skills.length) kids.push(h('p', { class: 'tsipp-dark-muted tsipp-sm', text: 'Skills: ' + P.skills.join(', ') }));
    var rules = null;
    if (P.rules.length) {
      rules = h('div', { class: 'tsipp-rules', hidden: true }, [h('strong', { text: 'Rule review' })].concat(P.rules.map(function (r) { var d = h('p'); d.textContent = String(r).replace(/<[^>]+>/g, ''); return d; })));
      kids.push(rules);
    }
    kids.push(h('div', { class: 'tsipp-actions' }, [
      btn(function () {
        if (rules && rules.hidden) { rules.hidden = false; this.textContent = 'Start recovery session'; return; }
        T.launchFix(P);
      }, P.rules.length ? 'Review the rules first' : 'Start recovery session', 'light')
    ]));
    return card('tsipp-span5 tsipp-dark', kids);
  }

  function trendCard(S) {
    var tr = S.trend, label = tr.length >= 2 ? tr[0].pct + '% → ' + tr[tr.length - 1].pct + '%' : '';
    return card('tsipp-span7', [
      h('div', { class: 'tsipp-row' }, [h('h3', { class: 'tsipp-h3', text: 'Accuracy, last ' + (tr.length || 6) + ' sessions' }), h('strong', { class: 'tsipp-txt--strong', text: label })]),
      tr.length ? h('div', { class: 'tsipp-trend' }, tr.map(function (x, i) {
        return h('div', { class: 'tsipp-col' }, [
          h('span', { class: 'tsipp-sm', text: x.pct + '%' }),
          h('span', { class: 'tsipp-colbar' + (i === tr.length - 1 ? ' is-last' : ''), style: 'height:' + Math.max(x.pct, 4) + '%' }),
          h('span', { class: 'tsipp-fine', text: new Date(x.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })
        ]);
      })) : h('p', { class: 'tsipp-muted', text: 'Finish a session of 5 or more questions to start your trend.' })
    ]);
  }

  function reviewCard(S) {
    var R = S.review;
    return card('tsipp-span5', [
      h('h3', { class: 'tsipp-h3', text: 'Review queue' }),
      h('div', { class: 'tsipp-trio' }, [
        h('div', {}, [h('span', { class: 'tsipp-num-md tsipp-txt--priority', text: String(R.due.length) }), h('span', { class: 'tsipp-sm tsipp-muted', text: 'Due today' })]),
        h('div', {}, [h('span', { class: 'tsipp-num-md', text: String(R.week) }), h('span', { class: 'tsipp-sm tsipp-muted', text: 'This week' })]),
        h('div', {}, [h('span', { class: 'tsipp-num-md', text: String(R.total) }), h('span', { class: 'tsipp-sm tsipp-muted', text: 'In queue' })])
      ]),
      h('p', { class: 'tsipp-muted tsipp-sm', text: 'Missed questions come back after 1, 3, 7, 21 and 45 days.' }),
      R.due.length ? btn(function () { ACT.review(S.exam); }, 'Review ' + R.due.length + ' due question' + (R.due.length > 1 ? 's' : ''), 'ghost') : h('p', { class: 'tsipp-sm', text: 'Nothing due today.' })
    ]);
  }

  function footer(S) {
    return h('div', { class: 'tsipp-foot' }, [
      svg(ICON.device),
      h('span', { class: 'tsipp-grow', text: 'Progress is saved in this browser. Sign in to keep it on other devices.' }),
      btn(function () { printReport(S); }, 'Print weekly report for a parent', 'ghost'),
      S.testDate ? btn(function () { downloadICS(S); }, 'Add test date to calendar', 'ghost') : null
    ]);
  }

  function emptyState(S) {
    return card('tsipp-empty', [
      h('h3', { class: 'tsipp-h2', text: 'Your dashboard builds itself as you practice' }),
      h('p', { class: 'tsipp-muted', text: 'Answer a few questions and this page will show your weakest skill, why you miss questions, and a short plan for today.' }),
      h('ol', { class: 'tsipp-steps' }, [
        h('li', {}, [h('strong', { text: 'Find your gaps. ' }), 'A short mixed diagnostic samples every skill.']),
        h('li', {}, [h('strong', { text: 'See why you miss. ' }), 'Mistake DNA sorts misses into four types.']),
        h('li', {}, [h('strong', { text: 'Get today’s plan. ' }), 'Three short tasks aimed at your weakest skill.'])
      ]),
      h('div', { class: 'tsipp-actions' }, [btn(function () { ACT.diagnostic(S.exam); }, 'Take the ' + S.exam + ' diagnostic'), btn(function () { ACT.quick(S.exam); }, 'Try 5 questions', 'ghost')])
    ]);
  }

  // ---------- extras ----------
  function downloadICS(S) {
    var d = S.testDate.replace(/-/g, ''), n = new Date(S.testDate + 'T12:00:00'); n.setDate(n.getDate() + 1);
    var d2 = n.getFullYear() + String(n.getMonth() + 1).padStart(2, '0') + String(n.getDate()).padStart(2, '0');
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TSI Practice Prep//Study Plan//EN', 'BEGIN:VEVENT',
      'UID:' + S.exam + '-' + d + '@tsipracticeprep.com', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + d, 'DTEND;VALUE=DATE:' + d2,
      'SUMMARY:' + S.exam + ' test day', 'DESCRIPTION:Confirm time and location with your test center.',
      'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:' + S.exam + ' is tomorrow', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = h('a', { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), download: S.exam.toLowerCase() + '-test-day.ics' });
    doc.body.appendChild(a); a.click(); a.remove();
  }

  function printReport(S) {
    var weekAgo = Date.now() - 7 * 86400000;
    var wk = T.history(S.exam).filter(function (x) { return new Date(x.date).getTime() >= weekAgo; });
    var q = wk.reduce(function (s, x) { return s + x.total; }, 0), ok = wk.reduce(function (s, x) { return s + x.score; }, 0);
    var days = {}; wk.forEach(function (x) { days[T.dayKey(x.date)] = 1; });
    var m = S.skills.filter(function (x) { return x.pct !== null; });
    var w = global.open('', '_blank');
    if (!w) { alert('Please allow pop-ups to print the report.'); return; }
    var d = w.document; d.title = 'Weekly practice report';
    var st = d.createElement('style');
    st.textContent = 'body{font:14px/1.5 Georgia,serif;color:#1B2230;max-width:640px;margin:40px auto;padding:0 24px}h1{font-size:26px;margin:0 0 4px}table{width:100%;border-collapse:collapse;margin:16px 0}td{padding:8px 4px;border-bottom:1px solid #ddd}td:last-child{text-align:right;font-weight:600}.m{color:#555;font-size:12px}';
    d.head.appendChild(st);
    function add(tag, text, cls) { var e = d.createElement(tag); e.textContent = text; if (cls) e.className = cls; d.body.appendChild(e); }
    add('h1', 'Weekly practice report' + (S.name ? ' · ' + S.name : ''));
    add('p', S.exam + ' · ' + new Date(weekAgo).toLocaleDateString() + ' – ' + new Date().toLocaleDateString(), 'm');
    var t = d.createElement('table'); d.body.appendChild(t);
    [['Questions answered', String(q)], ['Accuracy', q ? Math.round(ok * 100 / q) + '%' : '—'], ['Days studied', Object.keys(days).length + ' of 7'],
      ['Current streak', S.streak.streak + ' days'],
      ['Strongest skill', m.length ? m[m.length - 1].name + ' (' + m[m.length - 1].pct + '%)' : '—'],
      ['Needs attention', m.length ? m[0].name + ' (' + m[0].pct + '%)' : '—'],
      ['Questions waiting for review', String(S.review.total)],
      ['Test date', S.testDate ? fmtDate(S.testDate) + ' (' + S.daysLeft + ' days)' : 'Not set']
    ].forEach(function (r) { var tr = t.insertRow(); tr.insertCell().textContent = r[0]; tr.insertCell().textContent = r[1]; });
    add('p', 'From tsipracticeprep.com, saved on this device. Practice results are learning indicators, not official TSIA2, SAT or ACT scores.', 'm');
    setTimeout(function () { w.print(); }, 300);
  }

  // ---------- mount ----------
  function mount(el, exam) {
    if (!el) return;
    var showAll = false;
    function render(x) {
      var S = T.summary(x || exam); exam = S.exam;
      var root = h('div', { class: 'tsipp' }, [header(S, render), h('div', { class: 'tsipp-grid3' }, [testDayCard(S), estimateCard(S), streakCard(S)])]);
      if (S.answered < 5) root.appendChild(emptyState(S));
      else {
        root.appendChild(h('div', { class: 'tsipp-grid12' }, [missionCard(S), priorityCard(S)]));
        root.appendChild(h('div', { class: 'tsipp-grid12' }, [insightsCard(S), fixCard(S)]));
        // On phones the detailed analysis starts folded so the page stays short.
        var more = h('div', { class: 'tsipp-analysis' + (showAll ? '' : ' is-collapsed'), id: 'tsipp-analysis' }, [
          h('div', { class: 'tsipp-grid2' }, [dnaCard(S), skillCard(S)]),
          h('div', { class: 'tsipp-grid12' }, [trendCard(S), reviewCard(S)])
        ]);
        root.appendChild(h('button', { type: 'button', class: 'tsipp-toggle', 'aria-expanded': showAll ? 'true' : 'false', 'aria-controls': 'tsipp-analysis',
          onclick: function () { showAll = !showAll; render(exam); } }, [showAll ? 'Hide full analysis' : 'Show Mistake DNA, skill map & trends']));
        root.appendChild(more);
      }
      root.appendChild(footer(S));
      while (el.firstChild) el.removeChild(el.firstChild);
      el.appendChild(root);
    }
    var t = null;
    function soon() { clearTimeout(t); t = setTimeout(function () { render(exam); }, 150); }
    render(exam);
    global.addEventListener('tsipp:change', soon);
    global.addEventListener('storage', soon);
    // Refresh after a practice set closes or a mistake reason is tagged.
    doc.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-reason],.practiceShell button,[id$="Finish"],[id*="finish"],[id*="Exit"]')) setTimeout(soon, 900);
    });
    doc.addEventListener('visibilitychange', function () { if (!doc.hidden) soon(); });
  }

  T.mountDashboard = mount;
  function boot() { var el = byId('tsipp-dashboard'); if (el) mount(el, el.getAttribute('data-exam') || undefined); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 300); });
  else setTimeout(boot, 300);
})(window, document);
