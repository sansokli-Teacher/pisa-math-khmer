/* PISA-style computer-based test (CBA) engine.
 *
 * Plain JavaScript with no build step and no ES modules, so the app runs by
 * double-clicking index.html (file://), from a USB stick, or on GitHub Pages.
 *
 * A unit file calls PISA.registerUnit({...}); see js/units/*.js. This file
 * owns the session state, the screen chrome (top bar, panels, dialogs), the
 * forward-only navigation, the clock, and the results page.
 */
(function () {
  'use strict';

  const PISA = (window.PISA = { units: [], W: {} });

  // ---------------------------------------------------------------- DOM ---
  function applyAttrs(el, attrs) {
    if (!attrs) return;
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
  }
  // Text written with a few formatting tags (<b>, <i>, <br>) and the entities &nbsp; &gt; &lt; &amp; is drawn
  // as formatted text, not as the raw tags. Nothing else is read as markup, so what a student types can
  // never add anything but bold, italic or a line break.
  const FMT_TEST = /<\/?(?:b|i|br)\s*\/?>|&(?:nbsp|gt|lt|amp);/i;
  const ENT = { nbsp: '\u00a0', gt: '>', lt: '<', amp: '&' };
  const unent = (s) => s.replace(/&(nbsp|gt|lt|amp);/gi, (m, e) => ENT[e.toLowerCase()]);
  function formatted(str) {
    if (!FMT_TEST.test(str)) return document.createTextNode(str);
    const frag = document.createDocumentFragment(), stack = [frag], tag = /<(\/?)(b|i|br)\s*\/?>/gi;
    let last = 0, m;
    const text = (s) => { if (s) stack[stack.length - 1].appendChild(document.createTextNode(unent(s))); };
    while ((m = tag.exec(str))) {
      text(str.slice(last, m.index));
      last = m.index + m[0].length;
      const name = m[2].toLowerCase();
      if (name === 'br') { if (!m[1]) stack[stack.length - 1].appendChild(document.createElement('br')); continue; }
      if (!m[1]) { const e = document.createElement(name); stack[stack.length - 1].appendChild(e); stack.push(e); }
      else if (stack.length > 1 && stack[stack.length - 1].tagName.toLowerCase() === name) stack.pop();
    }
    text(str.slice(last));
    return frag;
  }
  function appendKids(el, kids) {
    for (const k of kids.flat(Infinity)) {
      if (k == null || k === false) continue;
      el.appendChild(k instanceof Node ? k : formatted(String(k)));
    }
  }
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    applyAttrs(el, attrs);
    appendKids(el, kids);
    return el;
  }
  const SVGNS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, ...kids) {
    const el = document.createElementNS(SVGNS, tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (k === 'text') el.textContent = v;
        else if (k === 'class') el.setAttribute('class', v);
        else el.setAttribute(k, v);
      }
    }
    appendKids(el, kids);
    return el;
  }
  // Raw HTML fragment (trusted, authored in the unit files).
  function raw(html, tag) {
    return h(tag || 'div', { html });
  }
  PISA.h = h;
  PISA.s = s;
  PISA.raw = raw;

  // ------------------------------------------------------------ numbers ---
  const KM_DIGITS = '០១២៣៤៥៦៧៨៩';
  PISA.km = (n) => String(n).replace(/[0-9]/g, (d) => KM_DIGITS[d]);
  // Mathematics written as TeX between \\( \\) or \\[ \\] (the textbook tasks) is drawn by
  // KaTeX when it is loaded; every screen and the results page call this.
  PISA.typeset = (el) => {
    if (!el || !window.renderMathInElement) return;
    window.renderMathInElement(el, {
      delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
      macros: { '\\arc': '\\overset{\\frown}{#1}' },
      throwOnError: false,
      strict: 'ignore',
    });
  };
  PISA.latin = (str) => String(str == null ? '' : str).replace(/[០-៩]/g, (c) => String(c.charCodeAt(0) - 0x17e0));

  // Reads a typed numeric answer. Accepts Khmer digits, a percent sign or the
  // word ភាគរយ, a fraction a/b, spaces or commas as thousands separators, and a
  // comma as decimal point when it is not followed by exactly three digits.
  PISA.parseAnswer = function (input) {
    let t = PISA.latin(input).trim();
    if (!t) return null;
    const percent = /%|ភាគរយ/.test(t);
    t = t.replace(/ភាគរយ|%|zeds?|ខែ|ដុល្លារ|រៀល/gi, '');
    t = t.replace(/[\s  ​]/g, '').replace(/[−–]/g, '-').replace(/÷/g, '/');
    const frac = t.match(/^(-?\d+(?:[.,]\d+)?)\/(-?\d+(?:[.,]\d+)?)$/);
    if (frac) {
      const a = parseFloat(frac[1].replace(',', '.'));
      const b = parseFloat(frac[2].replace(',', '.'));
      if (!b) return null;
      return { value: a / b, percent, fraction: true };
    }
    if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g, '');
    else t = t.replace(',', '.');
    if (!/^-?\d*\.?\d+$/.test(t)) return null;
    return { value: parseFloat(t), percent, fraction: false };
  };
  PISA.inRange = (v, lo, hi) => v != null && v >= lo - 1e-9 && v <= hi + 1e-9;

  // ------------------------------------------------------------ storage ---
  // Browser storage can be missing or blocked (private windows, some school
  // machines). Every access is guarded; the app still works without it, it
  // just cannot resume after a reload.
  const KEY = 'pisa-cba-khmer:v1';
  const store = {
    get() {
      try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
    },
    set(v) {
      try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* ignore */ }
    },
    clear() {
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    },
  };

  let state = null;
  let enteredAt = 0;
  PISA.saved = () => store.get();
  PISA.clearSaved = () => store.clear();
  function save() { if (!state.preview) store.set(state); }

  // -------------------------------------------------------------- units ---
  PISA.registerUnit = (u) => PISA.units.push(u);
  PISA.unit = (id) => PISA.units.find((u) => u.id === id);
  PISA.questionIds = (u) => Object.keys(u.questions || {});

  
  // ----------------------------------------------------------- mock exam ---
  PISA.sampleMockUnits = function (count) {
    const moeys = PISA.units.filter((u) => u.collection === 'moeys');
    const shuffled = moeys.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length)).map((u) => u.id);
  };


  let mockTimerInterval = null;
  function startMockTimer() {
    if (mockTimerInterval) clearInterval(mockTimerInterval);
    const update = () => {
      if (!state || !state.mock || state.finishedAt) {
        clearInterval(mockTimerInterval);
        return;
      }
      const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
      const remaining = Math.max(0, state.mock.duration - elapsed);
      state.mock.remaining = remaining;
      const el = document.getElementById('mock-countdown');
      if (el) {
        const mm = Math.floor(remaining / 60);
        const ss = remaining % 60;
        const timeStr = String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
        el.innerHTML = '<span class="t-icon">⏱</span> <span class="t-label">នៅសល់ </span><b>' + PISA.km(timeStr) + '</b>';
        if (remaining <= 60) {
          el.className = 'tb-timer timer-danger';
        } else if (remaining <= 300) {
          el.className = 'tb-timer timer-warn';
        } else {
          el.className = 'tb-timer';
        }
      }
      if (remaining <= 0) {
        clearInterval(mockTimerInterval);
        dialog(
          ['អស់ពេលប្រឡងហើយ!', 'ពេលវេលាដែលបានកំណត់ត្រូវបានបញ្ចប់។ ប្រព័ន្ធនឹងគណនាពិន្ទុ និងបង្ហាញលទ្ធផលដោយស្វ័យប្រវត្តិ។'],
          [{ label: 'ពិនិត្យលទ្ធផល', primary: true, action: finish }]
        );
      }
    };
    update();
    mockTimerInterval = setInterval(update, 1000);
  }

  // --------------------------------------------------------- session ---
  PISA.start = function (opts) {
    state = {
      v: 1,
      student: { name: opts.name || '', klass: opts.klass || '', teacher: opts.teacher || '', school: opts.school || '' },
      mode: opts.mode === 'practice' ? 'practice' : 'test',
      unitIds: opts.unitIds.slice(),
      pos: { u: opts.u || 0, s: opts.s || 0 },
      responses: {},
      ui: {},
      teacher: {},
      times: {},
      startedAt: Date.now(),
      finishedAt: null,
      preview: !!opts.preview,
      mock: opts.mock ? {
        duration: opts.mock.durationSeconds || 1800,
        title: opts.mock.title || 'តេស្តគំរូ PISA',
        remaining: opts.mock.durationSeconds || 1800,
      } : null,
    };
    save();
    showScreen();
  };
  PISA.resume = function (saved) {
    state = saved;
    if (state.finishedAt) showResults();
    else showScreen();
  };

  function unitAt(i) { return PISA.unit(state.unitIds[i]); }
  function curUnit() { return unitAt(state.pos.u); }
  function curScreen() { return curUnit().screens[state.pos.s]; }
  function screenKey() { return state.unitIds[state.pos.u] + ':' + state.pos.s; }

  function recordTime() {
    if (!enteredAt) return;
    const k = screenKey();
    state.times[k] = (state.times[k] || 0) + (Date.now() - enteredAt);
    enteredAt = 0;
  }

  // Context handed to a screen's render functions. Responses are stored per
  // question id as an object of named parts; `ui` holds view state (open tab,
  // sort column, simulator rows) that is not scored but should survive a
  // reload.
  function makeCtx() {
    return {
      val(qid, part) {
        const r = state.responses[qid];
        return r ? r[part] : undefined;
      },
      setVal(qid, part, v) {
        const r = (state.responses[qid] = state.responses[qid] || {});
        if (v === '' || v == null) delete r[part];
        else r[part] = v;
        save();
      },
      resp(qid) { return state.responses[qid] || {}; },
      ui(key, init) {
        if (!(key in state.ui)) state.ui[key] = typeof init === 'function' ? init() : init;
        return state.ui[key];
      },
      setUi(key, v) { state.ui[key] = v; save(); },
      mode: state.mode,
    };
  }

  // ------------------------------------------------------------- icons ---
  const ICON = {
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="#fff" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.2 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    calc: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="#fff" stroke-width="1.6"/><rect x="7.5" y="5.5" width="9" height="3.2" fill="#fff"/><g fill="#fff"><rect x="7.5" y="11" width="2.4" height="2.2"/><rect x="10.8" y="11" width="2.4" height="2.2"/><rect x="14.1" y="11" width="2.4" height="2.2"/><rect x="7.5" y="15" width="2.4" height="2.2"/><rect x="10.8" y="15" width="2.4" height="2.2"/><rect x="14.1" y="15" width="2.4" height="2.2"/></g></svg>',
    help: '<svg viewBox="0 0 24 24"><text x="12" y="17.5" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" font-family="Arial, sans-serif">?</text></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15.5 5.5 8 12l7.5 6.5z" fill="#fff"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M8.5 5.5 16 12l-7.5 6.5z" fill="#fff"/></svg>',
  };
  PISA.ICON = ICON;   // the tutorial shows the same buttons
  function iconBtn(name, label, onclick, disabled) {
    const b = h('button', { class: 'tb-btn tb-' + name, type: 'button', title: label, 'aria-label': label, html: ICON[name], disabled: !!disabled });
    if (!disabled) b.addEventListener('click', onclick);
    return b;
  }

  // ------------------------------------------------------------ screen ---
  function showScreen() {
    PISA.calc && PISA.calc.close();
    PISA.W.clearSelection && PISA.W.clearSelection();
    const unit = curUnit();
    const scr = curScreen();
    const ctx = makeCtx();
    const app = document.getElementById('app');
    app.className = 'app-test';
    app.innerHTML = '';
    document.title = unit.title + ' — ' + scr.tag;

    const win = h('div', { class: 'cba-window' });
    win.append(topBar(unit), body(unit, scr, ctx), learnTray(unit, scr), footer(unit));
    app.append(win);
    PISA.typeset(win);
    if (PISA.mathBar) PISA.mathBar(win);
    enteredAt = Date.now();
    if (state && state.mock) startMockTimer();
    const first = win.querySelector('.panel-content');
    if (first) first.scrollTop = 0;
  }

  // ------------------------------------------------- the answer-checking tray ---
  // Practice mode only. Under the screen, a slim bar opens a tray where the student checks an answer, tries
  // again, and sees the book's model answer. Test mode has no tray. The tutorial has its own checks.
  PISA.lessonLink = (u) => u.lessonUrl || (u.collection === 'textbook' && u.grade && u.lesson
    ? 'https://khmermath.org/lesson/g' + u.grade + '/L' + String(u.lesson).padStart(2, '0') + '.html' : null);
  function hasAnswer(unit, qid) {
    const q = unit.questions[qid], r = state.responses[qid] || {};
    if (q.answered && q.answered(r)) return true;
    return (q.parts || []).some((p) => r[p.k] != null && String(r[p.k]).trim() !== '');
  }
  function checkOf(unit, qid) {
    const q = unit.questions[qid], r = state.responses[qid] || {};
    if (!hasAnswer(unit, qid)) return { res: 'blank' };
    const a = q.score ? q.score(r) : { pts: null };
    if (a.pts == null) return { res: 'open', note: a.note };
    const max = q.max || 1;
    return { res: a.pts >= max ? 'full' : a.pts > 0 ? 'partial' : 'none', pts: a.pts, max, note: a.note };
  }
  const TRAY_WORDS = {
    full: ['ត្រឹមត្រូវ', 'ok'], partial: ['ត្រូវខ្លះ', 'part'], none: ['មិនទាន់ត្រឹមត្រូវ', 'no'],
    open: ['ប្រៀបធៀបចម្លើយរបស់អ្នកជាមួយចម្លើយគំរូ', 'open'], blank: ['សូមឆ្លើយសិន ហើយចុចពិនិត្យ', 'blank'],
  };
  function learnTray(unit, scr) {
    if (state.mode !== 'practice' || unit.collection === 'tutorial') return null;
    const ids = (scr.items || []).filter((qid) => unit.questions[qid]);
    if (!ids.length) return null;
    state.checks = state.checks || {};
    const tray = h('section', { class: 'lt', 'aria-label': 'ពិនិត្យចម្លើយ' });
    const head = h('button', { type: 'button', class: 'lt-head', 'aria-expanded': 'false' });
    const body = h('div', { class: 'lt-body' });
    tray.append(head, body);
    const isOpen = () => !!state.ui['lt-open'];
    function draw() {
      tray.classList.toggle('open', isOpen());
      head.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');
      head.innerHTML = '';
      head.append(h('span', { class: 'lt-title' }, 'ពិនិត្យចម្លើយ'));
      ids.forEach((qid) => {
        const c = state.checks[qid];
        head.append(h('span', { class: 'lt-chip' + (c && c.res ? ' ' + TRAY_WORDS[c.res][1] : '') },
          unit.questions[qid].label, c && c.res === 'full' ? ' ✓' : c && (c.res === 'none' || c.res === 'partial') ? ' ✗' : ''));
      });
      head.append(h('span', { class: 'lt-caret', 'aria-hidden': 'true' }, isOpen() ? '▾' : '▴'));
      body.innerHTML = '';
      if (!isOpen()) return;
      ids.forEach((qid) => body.append(block(qid)));
      PISA.typeset(body);
    }
    function block(qid) {
      const q = unit.questions[qid], c = state.checks[qid] || {};
      const box = h('div', { class: 'lt-q' });
      box.append(h('h3', {}, q.label));
      if (!c.res || c.res === 'blank') {
        const row = h('div', { class: 'lt-row' });
        row.append(h('button', { type: 'button', class: 'lt-btn lt-primary', onclick: () => {
          const r = checkOf(unit, qid);
          state.checks[qid] = { res: r.res, pts: r.pts, max: r.max, note: r.note, n: (c.n || 0) + (r.res === 'blank' ? 0 : 1), shown: r.res === 'open' };
          save(); draw();
        } }, 'ពិនិត្យចម្លើយនេះ'));
        if (q.hint) row.append(h('button', { type: 'button', class: 'lt-btn', onclick: () => { c.hint = !c.hint; state.checks[qid] = c; draw(); } }, 'គន្លឹះ'));
        box.append(row);
        if (c.res === 'blank') box.append(h('p', { class: 'lt-say blank' }, TRAY_WORDS.blank[0]));
        if (c.hint && q.hint) box.append(h('div', { class: 'lt-hint', html: q.hint }));
        return box;
      }
      const [word, cls] = TRAY_WORDS[c.res];
      box.append(h('p', { class: 'lt-say ' + cls }, c.res === 'partial' ? word + ' (' + PISA.km(c.pts) + ' / ' + PISA.km(c.max) + ')' : word));
      if (c.note) box.append(h('p', { class: 'lt-note' }, c.note));
      const row = h('div', { class: 'lt-row' });
      if (c.res === 'none' || c.res === 'partial') {
        row.append(h('button', { type: 'button', class: 'lt-btn lt-primary', onclick: () => {
          delete state.responses[qid]; state.checks[qid] = { res: null, n: c.n }; save(); showScreen();
        } }, 'ព្យាយាមម្ដងទៀត'));
        if (!c.shown) row.append(h('button', { type: 'button', class: 'lt-btn', onclick: () => { c.shown = true; save(); draw(); } }, 'មើលចម្លើយគំរូ'));
      }
      if (row.childNodes.length) box.append(row);
      if (c.res === 'full' || c.shown) {
        box.append(h('div', { class: 'lt-key' }, h('div', { class: 'lt-key-h' }, 'ចម្លើយគំរូ'), raw(q.key || '')));
        const link = PISA.lessonLink(unit);
        if (link) box.append(h('a', { class: 'lt-link', href: link, target: '_blank', rel: 'noopener' }, 'រៀនមេរៀននេះឡើងវិញ ▸'));
      }
      return box;
    }
    head.addEventListener('click', () => { state.ui['lt-open'] = !isOpen(); save(); draw(); });
    draw();
    return tray;
  }

  function topBar(unit) {
    const bar = h('header', { class: 'cba-top' });
    bar.append(h('div', { class: 'brand' }, 'គណិតវិទ្យាតាមបែប PISA'));
    const prog = h('div', { class: 'progress', title: 'វឌ្ឍនភាពក្នុងប្រធានបទនេះ' });
    unit.screens.forEach((_, i) => {
      prog.append(h('span', { class: 'sq' + (i === state.pos.s ? ' on' : '') }));
    });
    bar.append(prog);
    bar.append(iconBtn('clock', 'ពេលវេលា', toggleClock));
    if (state.mock) {
      const timerPill = h('div', { class: 'tb-timer', id: 'mock-countdown', title: 'ពេលវេលាប្រឡងនៅសល់' });
      bar.append(timerPill);
    }
    if (state.unitIds.length > 1) {
      bar.append(h('div', { class: 'unit-count' }, 'ប្រធានបទ ' + PISA.km(state.pos.u + 1) + ' / ' + PISA.km(state.unitIds.length)));
    }
    bar.append(h('div', { class: 'tb-spacer' }));
    if (state.mode === 'practice') bar.append(h('div', { class: 'mode-tag' }, 'របៀបហាត់រៀន'));
    bar.append(iconBtn('calc', 'ម៉ាស៊ីនគិតលេខ', () => PISA.calc.toggle()));
    bar.append(iconBtn('help', 'ជំនួយ', showHelp));
    const atStart = state.pos.u === 0 && state.pos.s === 0;
    bar.append(iconBtn('back', 'ថយក្រោយ', goBack, state.mode !== 'practice' || atStart));
    bar.append(iconBtn('next', 'បន្ទាប់', goNext));
    return bar;
  }

  function body(unit, scr, ctx) {
    const b = h('main', { class: 'cba-body' + (scr.full ? ' full' : '') });
    if (scr.full) {
      const p = h('section', { class: 'panel panel-full' });
      const c = content(scr.left, ctx);
      c.append(stepNav());
      p.append(labelBox(unit, scr), c);
      b.append(p);
      return b;
    }
    const left = h('section', { class: 'panel panel-left' });
    left.style.flexBasis = (scr.split || 42) + '%';
    const lc = content(scr.left, ctx);
    lc.append(stepNav());
    left.append(labelBox(unit, scr), lc);
    const right = h('section', { class: 'panel panel-right' });
    if (!scr.noTitle) right.append(h('h2', { class: 'rp-title' }, unit.title));
    right.append(content(scr.right, ctx));
    b.append(left, right);
    return b;
  }
  // Big Back / Next buttons under the answers, so students need not reach
  // for the small arrows in the top bar. Back only exists in practice mode,
  // as the real test is forward-only.
  function stepNav() {
    const lastScreen = state.pos.s === curUnit().screens.length - 1;
    const lastUnit = state.pos.u === state.unitIds.length - 1;
    const atStart = state.pos.u === 0 && state.pos.s === 0;
    const nav = h('div', { class: 'step-nav' });
    if (state.mode === 'practice') {
      nav.append(h('button', { type: 'button', class: 'step-btn step-back', disabled: atStart, onclick: goBack }, '◀ ថយក្រោយ'));
    }
    nav.append(h('button', { type: 'button', class: 'step-btn step-next', onclick: goNext },
      lastScreen && lastUnit ? 'បញ្ចប់ ✓' : 'បន្ទាប់ ▶'));
    return nav;
  }
  function labelBox(unit, scr) {
    return h('div', { class: 'label-box' }, h('div', { class: 'lb-title' }, unit.title), h('div', { class: 'lb-tag' }, scr.tag));
  }
  function content(what, ctx) {
    const c = h('div', { class: 'panel-content' });
    if (!what) return c;
    const out = typeof what === 'function' ? what(ctx) : what;
    if (typeof out === 'string') c.insertAdjacentHTML('beforeend', out);
    else appendKids(c, [out]);
    return c;
  }
  function footer(unit) {
    if (!unit.footer && unit.collection === 'moeys') {
      return h('footer', { class: 'cba-foot' }, 'ដកស្រង់ពី «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥» របស់ក្រសួងអប់រំ យុវជន និងកីឡា · រៀបចំឡើងវិញជាតេស្តលើកុំព្យូទ័រ — មិនមែនជាកម្មវិធីតេស្តផ្លូវការរបស់ OECD ទេ');
    }
    return h('footer', { class: 'cba-foot' }, unit.footer ||
      'ផ្អែកលើឧទាហរណ៍ «' + unit.en + '» — OECD (2023), PISA 2022 Assessment and Analytical Framework, Annex 2.A, © OECD 2023, CC BY-NC-SA 3.0 IGO · ' +
      'បកប្រែ និងគូរឡើងវិញដោយក្រុមការងារ — មិនមែនជាកម្មវិធីតេស្តផ្លូវការរបស់ OECD ទេ');
  }

  // --------------------------------------------------------- navigation ---
  function isAnswered(unit, qid) {
    const q = unit.questions[qid];
    const r = state.responses[qid] || {};
    if (q.answered) return q.answered(r);
    return (q.parts || []).every((p) => {
      const v = r[p.k];
      return v != null && String(v).trim() !== '';
    });
  }

  function goNext() {
    const unit = curUnit();
    const scr = curScreen();
    const lastScreen = state.pos.s === unit.screens.length - 1;
    const lastUnit = state.pos.u === state.unitIds.length - 1;
    const missing = (scr.items || []).some((qid) => !isAnswered(unit, qid));
    const msgs = [];
    if (missing) msgs.push('អ្នកមិនទាន់បានឆ្លើយសំណួរនេះគ្រប់ផ្នែកនៅឡើយទេ។');
    if (state.mode === 'test' && (missing || lastScreen)) {
      msgs.push(lastScreen && !lastUnit
        ? 'បើចុច «បន្ត» អ្នកនឹងចូលទៅប្រធានបទបន្ទាប់ ហើយមិនអាចត្រឡប់មកប្រធានបទនេះវិញបានទេ។'
        : 'បើចុច «បន្ត» អ្នកមិនអាចត្រឡប់មកកែចម្លើយវិញបានទេ។');
    }
    if (lastScreen && lastUnit) msgs.push('នេះជាអេក្រង់ចុងក្រោយ។ ចុច «បន្ត» ដើម្បីបញ្ចប់ និងមើលលទ្ធផល។');

    const proceed = () => {
      recordTime();
      if (!lastScreen) state.pos.s += 1;
      else if (!lastUnit) state.pos = { u: state.pos.u + 1, s: 0 };
      else return finish();
      save();
      showScreen();
    };
    if (msgs.length) {
      dialog(msgs, [
        { label: missing ? 'ត្រឡប់ទៅឆ្លើយ' : 'បោះបង់' },
        { label: 'បន្ត', primary: true, action: proceed },
      ]);
    } else proceed();
  }

  function goBack() {
    if (state.mode !== 'practice') return;
    recordTime();
    if (state.pos.s > 0) state.pos.s -= 1;
    else if (state.pos.u > 0) {
      state.pos.u -= 1;
      state.pos.s = curUnit().screens.length - 1;
    }
    save();
    showScreen();
  }

  function finish() {
    state.finishedAt = Date.now();
    save();
    showResults();
  }

  // ------------------------------------------------------------ dialogs ---
  function dialog(lines, buttons) {
    const back = h('div', { class: 'dlg-back' });
    const close = () => back.remove();
    const box = h('div', { class: 'dlg', role: 'dialog', 'aria-modal': 'true' });
    lines.forEach((l) => box.append(h('p', {}, l)));
    const row = h('div', { class: 'dlg-btns' });
    buttons.forEach((b) => {
      row.append(h('button', {
        type: 'button',
        class: 'btn' + (b.primary ? ' btn-primary' : ''),
        onclick: () => { close(); if (b.action) b.action(); },
      }, b.label));
    });
    box.append(row);
    back.append(box);
    document.body.append(back);
    const prim = row.querySelector('.btn-primary') || row.querySelector('button');
    if (prim) prim.focus();
  }
  PISA.dialog = dialog;

  function showHelp() {
    const back = h('div', { class: 'dlg-back' });
    const box = h('div', { class: 'dlg dlg-wide' });
    box.innerHTML =
      '<h3>ជំនួយ</h3>' +
      '<ul class="help-list">' +
      '<li><span class="hi hi-sq"></span>ការ៉េពណ៌បៃតងនៅខាងលើ បង្ហាញអេក្រង់នៃប្រធានបទនេះ។ ការ៉េពណ៌ស គឺអេក្រង់ដែលអ្នកកំពុងមើល។</li>' +
      '<li><span class="hi">' + ICON.clock + '</span>ចុចនាឡិកា ដើម្បីមើលរយៈពេលដែលអ្នកបានប្រើ។</li>' +
      '<li><span class="hi hi-green">' + ICON.calc + '</span>ចុចម៉ាស៊ីនគិតលេខ ដើម្បីបើក ឬបិទម៉ាស៊ីនគិតលេខនៅលើអេក្រង់។</li>' +
      '<li><span class="hi hi-green">' + ICON.next + '</span>ចុចព្រួញ «បន្ទាប់» ដើម្បីទៅអេក្រង់បន្ទាប់។ ' +
      (state && state.mode === 'practice'
        ? 'ក្នុងរបៀបហាត់រៀន អ្នកអាចចុចព្រួញ «ថយក្រោយ» បាន។'
        : 'ក្នុងរបៀបតេស្ត អ្នកមិនអាចត្រឡប់ក្រោយបានទេ ដូចតេស្ត PISA ពិត។') + '</li>' +
      '<li>សំណួរខ្លះឱ្យអ្នក<b>ចុចជម្រើស</b> ខ្លះឱ្យ<b>វាយចម្លើយ</b> ខ្លះឱ្យ<b>អូសទម្លាក់</b>។ អាន «សេចក្ដីណែនាំ» ពណ៌ទ្រេតនៅខាងឆ្វេងរាល់ពេល។</li>' +
      '<li>ពេលវាយលេខ អ្នកអាចប្រើលេខខ្មែរ (១២៣) ឬលេខឡាតាំង (123) ក៏បាន។</li>' +
      '</ul>';
    box.append(h('div', { class: 'dlg-btns' }, h('button', { type: 'button', class: 'btn btn-primary', onclick: () => back.remove() }, 'យល់ហើយ')));
    back.append(box);
    back.addEventListener('click', (e) => { if (e.target === back) back.remove(); });
    document.body.append(back);
  }

  // -------------------------------------------------------------- clock ---
  let clockTimer = null;
  function fmtElapsed(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const hh = Math.floor(t / 3600);
    const mm = Math.floor((t % 3600) / 60);
    const ss = t % 60;
    const two = (n) => String(n).padStart(2, '0');
    return PISA.km((hh ? hh + ':' : '') + two(mm) + ':' + two(ss));
  }
  function toggleClock() {
    const old = document.querySelector('.clock-pop');
    if (old) { old.remove(); clearInterval(clockTimer); return; }
    const pop = h('div', { class: 'clock-pop', role: 'status' });
    const tick = () => { pop.textContent = 'រយៈពេលដែលបានប្រើ ' + fmtElapsed(Date.now() - state.startedAt); };
    tick();
    clockTimer = setInterval(() => { if (!pop.isConnected) clearInterval(clockTimer); else tick(); }, 1000);
    document.querySelector('.cba-top').append(pop);
  }

  // ------------------------------------------------------------ results ---
  const CREDIT = { full: 'ពិន្ទុពេញ', partial: 'ពិន្ទុមិនពេញ', none: 'គ្មានពិន្ទុ' };

  // The teacher's mark, when given, overrides the automatic one: the rubric
  // sometimes rewards working that a program cannot see.
  function scoreOf(unit, qid) {
    const q = unit.questions[qid];
    const r = state.responses[qid] || {};
    const auto = q.score ? q.score(r) : { pts: null };
    const t = state.teacher[qid];
    const final = t != null ? t : auto.pts != null ? auto.pts : null;
    return { q, r, auto, teacher: t, final, max: q.max || 1 };
  }
  const unitHeading = (u) => (u.label || PISA.km(u.no)) + ' · ' + u.title;

  // What a student has done, kept in this browser only (no account): one line per finished session.
  const HKEY = 'pisa-cba-khmer:history';
  PISA.history = () => { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } };
  PISA.clearHistory = () => { try { localStorage.removeItem(HKEY); } catch (e) { /* ignore */ } };
  function recordHistory(units) {
    if (state.preview || state.recorded || units.some((u) => u.collection === 'tutorial')) return;
    const per = units.map((u) => {
      let got = 0, max = 0, pend = 0;
      PISA.questionIds(u).forEach((qid) => { const sc = scoreOf(u, qid); if (sc.final != null) { got += sc.final; max += sc.max; } else pend += 1; });
      return { id: u.id, got, max, pend };
    });
    const list = PISA.history();
    list.push({
      t: state.finishedAt || Date.now(), name: state.student.name || '', mode: state.mock ? 'mock' : state.mode,
      got: per.reduce((n, x) => n + x.got, 0), max: per.reduce((n, x) => n + x.max, 0), units: per,
    });
    try { localStorage.setItem(HKEY, JSON.stringify(list.slice(-60))); } catch (e) { /* ignore */ }
    state.recorded = true;
    save();
  }

  // For the student: the questions to look at again, each with the answer given, the book's model answer
  // and the way back to the lesson. Questions answered in full are only counted.
  function reviewSection(units) {
    const all = [];
    units.forEach((u) => PISA.questionIds(u).forEach((qid) => all.push({ u, qid, sc: scoreOf(u, qid) })));
    const done = (x) => x.sc.final != null && x.sc.final >= x.sc.max;
    const good = all.filter(done), again = all.filter((x) => !done(x));
    const sec = h('section', { class: 'rv' });
    sec.append(h('h2', {}, 'ពិនិត្យឡើងវិញ'),
      h('p', { class: 'rv-sum' }, h('b', {}, PISA.km(good.length)), ' សំណួរត្រឹមត្រូវ · ', h('b', {}, PISA.km(again.length)), ' សំណួរត្រូវមើលម្ដងទៀត'));
    if (!again.length) { sec.append(h('p', { class: 'rv-none' }, 'សំណួរទាំងអស់ត្រឹមត្រូវ។')); return sec; }
    again.forEach(({ u, qid, sc }) => {
      const wait = sc.final == null;
      const said = answerText(sc.q, sc.r), drawn = PISA.mathHtml && PISA.mathHtml(said);
      const card = h('article', { class: 'rv-card' });
      card.append(h('div', { class: 'rv-top' }, h('span', { class: 'rv-unit' }, unitHeading(u)),
        h('span', { class: 'pill ' + (wait ? 'wait' : sc.final > 0 ? 'part' : 'no') }, wait ? 'ប្រៀបធៀបជាមួយចម្លើយគំរូ' : PISA.km(sc.final) + ' / ' + PISA.km(sc.max))));
      card.append(h('h3', {}, sc.q.label),
        h('div', { class: 'rv-said' }, h('b', {}, 'ចម្លើយរបស់អ្នក៖ '), drawn ? h('span', { html: drawn }) : h('span', {}, said)),
        h('div', { class: 'rv-key' }, h('div', { class: 'rv-key-h' }, 'ចម្លើយគំរូ'), raw(sc.q.key || '')));
      const link = PISA.lessonLink(u);
      if (link) card.append(h('a', { class: 'rv-link', href: link, target: '_blank', rel: 'noopener' }, 'រៀនមេរៀននេះឡើងវិញ ▸'));
      sec.append(card);
    });
    const ids = [...new Set(again.map((x) => x.u.id))];
    sec.append(h('p', { class: 'rv-act' }, h('button', { type: 'button', class: 'btn btn-primary', onclick: () => PISA.start({ name: state.student.name, klass: state.student.klass, teacher: state.student.teacher, school: state.student.school, mode: 'practice', unitIds: ids }) },
      'ហាត់ម្ដងទៀត ' + PISA.km(ids.length) + ' ប្រធានបទនេះ (មានចម្លើយភ្លាមៗ)')));
    return sec;
  }

  function screenOf(unit, qid) {
    return unit.screens.findIndex((sc) => (sc.items || []).includes(qid));
  }

  function answerText(q, r) {
    if (q.summary) return q.summary(r);
    return (q.parts || []).map((p) => {
      let v = r[p.k];
      if (v == null || v === '') v = '—';
      else if (p.map) v = p.map[v] || v;
      return (p.label ? p.label + '៖ ' : '') + v;
    }).join(' | ');
  }

  function showResults() {
    PISA.calc && PISA.calc.close();
    const app = document.getElementById('app');
    // a teacher's mark redraws the page: keep the place then, start at the top otherwise
    const arriving = !app.classList.contains('app-results');
    app.className = 'app-results km hm';
    app.innerHTML = '';
    document.title = 'លទ្ធផល — តេស្តគណិតវិទ្យាលើកុំព្យូទ័រ (CBA)';
    // the khmermath.org header and footer around the page (js/main.js)
    const framed = (page) => {
      if (PISA.siteHeader) app.append(PISA.siteHeader({ label: 'ទំព័រដើមតេស្ត', onclick: () => { clearHash(); PISA.home(); window.scrollTo(0, 0); } }));
      app.append(h('main', { class: 'km-res-main' }, h('div', { class: 'km-wrap' }, page)));
      if (PISA.siteFooter) app.append(PISA.siteFooter());
      if (arriving) window.scrollTo(0, 0);
    };

    const units = state.unitIds.map((id) => PISA.unit(id));
    recordHistory(units);
    if (units.length === 1 && units[0].results) {
      const u = units[0];
      const own = u.results({
        score: (qid) => scoreOf(u, qid).final,
        home: () => { state = null; clearHash(); PISA.home(); },
        again: () => PISA.start({ name: '', mode: 'practice', unitIds: [u.id], preview: true }),
      });
      framed(own);
      PISA.typeset(own);
      return;
    }

    let total = 0, max = 0, pending = 0, marked = 0;
    units.forEach((u) => PISA.questionIds(u).forEach((qid) => {
      const sc = scoreOf(u, qid);
      max += sc.max;
      if (sc.final != null) total += sc.final; else pending += 1;
      if (sc.teacher != null) marked += 1;
    }));

    const page = h('div', { class: 'results' });
    const who = [state.student.name, state.student.klass, state.student.school].filter(Boolean).join(' · ');
    page.append(h('header', { class: 'res-head' },
      h('h1', {}, 'លទ្ធផល'),
      h('p', { class: 'res-sub' }, (who ? who + ' — ' : '') + (state.mode === 'test' ? 'របៀបតេស្ត' : 'របៀបហាត់រៀន') +
        ' — រយៈពេល ' + fmtElapsed((state.finishedAt || Date.now()) - state.startedAt))));

    const totals = h('div', { class: 'res-totals' },
      h('div', { class: 'tot' }, h('div', { class: 'tot-num' }, PISA.km(total) + ' / ' + PISA.km(max)), h('div', { class: 'tot-lbl' }, 'ពិន្ទុសរុប (មិនទាន់រាប់សំណួររង់ចាំគ្រូ)')),
      h('div', { class: 'tot' + (pending ? ' tot-warn' : '') }, h('div', { class: 'tot-num' }, PISA.km(pending)), h('div', { class: 'tot-lbl' }, 'សំណួររង់ចាំគ្រូដាក់ពិន្ទុ')),
      h('div', { class: 'tot' }, h('div', { class: 'tot-num' }, PISA.km(marked)), h('div', { class: 'tot-lbl' }, 'សំណួរដែលគ្រូបានដាក់ ឬកែពិន្ទុ')));
    page.append(totals);

    const pct = max > 0 ? Math.round((total / max) * 100) : 0;
    const durationStr = fmtElapsed((state.finishedAt || Date.now()) - state.startedAt);

    // Certificate card
    const certWrap = h('div', { class: 'pisa-cert-wrap' });
    certWrap.innerHTML =
      '<div class="pisa-cert" id="pisa-certificate">' +
        '<div class="cert-inner">' +
          '<div class="cert-head">' +
            '<div class="cert-kingdom">ព្រះរាជាណាចក្រកម្ពុជា<br><span class="cert-motto">ជាតិ សាសនា ព្រះមហាក្សត្រ</span><br><svg class="cert-wave" width="90" height="8" viewBox="0 0 90 8" fill="none"><path d="M2 4 Q 12 1, 22 4 T 42 4 T 62 4 T 82 4" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg></div>' +
            '<div class="cert-logo-row">' +
              '<img src="assets/img/logo.svg" alt="Logo" class="cert-logo" width="36" height="36">' +
              '<div class="cert-org">' +
                '<h3>KhmerMath · PISA Computer-Based Assessment</h3>' +
                '<p>ថ្នាលវាយតម្លៃសមត្ថភាពគណិតវិទ្យាតាមបែបអន្តរជាតិ PISA លើកុំព្យូទ័រ</p>' +
              '</div>' +
            '</div>' +
            '<h1 class="cert-title">វិញ្ញាបនបត្រការហាត់គណិតវិទ្យា</h1>' +
            '<div class="cert-subtitle">CERTIFICATE OF MATHEMATICS PRACTICE</div>' +
          '</div>' +
          '<div class="cert-body">' +
            '<p class="cert-intro">វិញ្ញាបនបត្រនេះបញ្ជាក់ជូនដល់ ៖</p>' +
            '<div class="cert-name">' + (state.student.name || 'សិស្សានុសិស្ស') + (state.student.klass ? ' <span class="cert-klass">(ថ្នាក់ ' + state.student.klass + ')</span>' : '') + '</div>' +
            (state.student.school || state.student.teacher ? '<p class="cert-intro">' + [state.student.school, state.student.teacher ? 'គ្រូបង្រៀន៖ ' + state.student.teacher : ''].filter(Boolean).join(' · ') + '</p>' : '') +
            '<p class="cert-text">បានបំពេញការប្រឡងតេស្តគណិតវិទ្យាតាមបែប PISA លើកុំព្យូទ័រ (CBA) ដោយទទួលបានលទ្ធផលដូចខាងក្រោម ៖</p>' +
            '<div class="cert-grid">' +
              '<div class="c-box"><div class="c-val">' + PISA.km(total) + ' / ' + PISA.km(max) + '</div><div class="c-lbl">ពិន្ទុសរុប</div></div>' +
              '<div class="c-box"><div class="c-val">' + PISA.km(pct) + '%</div><div class="c-lbl">អត្រាជោគជ័យ</div></div>' +
              '<div class="c-box c-gold"><div class="c-val">ការហាត់សាកល្បង</div><div class="c-lbl">មិនមែនលទ្ធផល PISA ផ្លូវការ</div></div>' +
            '</div>' +
            '<div class="cert-level-desc">ពិន្ទុនេះជាលទ្ធផលនៃការហាត់នៅលើគេហទំព័រ KhmerMath ដើម្បីរៀន។ វាមិនមែនជាកម្រិតសមត្ថភាព PISA ផ្លូវការ ហើយមិនត្រូវប្រៀបធៀបជាមួយលទ្ធផល PISA ពិតទេ។</div>' +
          '</div>' +
          '<div class="cert-foot">' +
            '<div class="cert-foot-col" style="text-align:left;">' +
              '<div>កាលបរិច្ឆេទ ៖ <b>' + new Date().toLocaleDateString('km-KH') + '</b></div>' +
              '<div>រយៈពេលប្រើប្រាស់ ៖ <b>' + durationStr + '</b></div>' +
            '</div>' +
            '<div class="cert-seal">' +
              '<div class="seal-inner">★ PISA ★<br>CBA<br>KHMERMATH</div>' +
            '</div>' +
            '<div class="cert-foot-col" style="text-align:right;">' +
              '<div>ការហាត់នៅលើ KhmerMath</div>' +
              '<b>cba.khmermath.org</b>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    page.append(reviewSection(units));
    const byProcess = processSection(units);
    if (byProcess) page.append(byProcess);
    page.append(certWrap);

    const fromMoeys = units.every((u) => u.collection === 'moeys');
    const fromTextbook = units.every((u) => u.collection === 'textbook');
    page.append(h('p', { class: 'res-note' },
      (fromMoeys
        ? 'ចម្លើយគំរូ និងការដាក់ពិន្ទុ យកតាម «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥» របស់នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា។ '
        : fromTextbook
        ? 'ចម្លើយគំរូ យកតាមដំណោះស្រាយក្នុងសៀវភៅ «គណិតវិទ្យាថ្នាក់ទី៩ បែបទំនើប» (បើសៀវភៅមាន) ពុំមែនជាកូនសោដាក់ពិន្ទុផ្លូវការរបស់ OECD ទេ។ '
        : 'ចម្លើយគំរូ និងការដាក់ពិន្ទុ យកតាមសៀវភៅណែនាំគ្រូ ដែលជាការចងក្រងរបស់គម្រោង ពុំមែនជាកូនសោដាក់ពិន្ទុផ្លូវការរបស់ OECD ទេ។ ') +
      'សំណួរសរសេរចម្លើយវែង ត្រូវការគ្រូអាន និងដាក់ពិន្ទុដោយប្រើប៊ូតុងនៅជួរនីមួយៗ។ គ្រូក៏អាចកែពិន្ទុស្វ័យប្រវត្តិបានដែរ ពេលអត្រាកំណែផ្តល់ពិន្ទុលើវិធីធ្វើ។'));

    page.append(h('h2', { class: 'res-teacher-h' }, 'សម្រាប់គ្រូ៖ តារាងពិន្ទុ និងការដាក់ពិន្ទុ'));
    units.forEach((u) => {
      const sec = h('section', { class: 'res-unit' });
      sec.append(h('h2', {}, unitHeading(u) + ' ', u.en && u.en !== u.label ? h('span', { class: 'en' }, '(' + u.en + ')') : null));
      if (u.note) sec.append(h('details', { class: 'unit-note' }, h('summary', {}, 'កំណត់សម្គាល់សម្រាប់គ្រូ'), raw(u.note)));
      const tbl = h('table', { class: 'res-table' });
      tbl.append(h('thead', {}, h('tr', {},
        h('th', {}, 'សំណួរ'), h('th', {}, 'ចម្លើយរបស់សិស្ស'), h('th', {}, 'ពិន្ទុ'), h('th', {}, 'ចម្លើយគំរូ'))));
      const tb = h('tbody');
      PISA.questionIds(u).forEach((qid) => tb.append(resultRow(u, qid)));
      tbl.append(tb);
      sec.append(tbl);
      page.append(sec);
    });

    function printCertificateOnly() {
      document.body.classList.add('print-cert-only');
      window.print();
      setTimeout(() => document.body.classList.remove('print-cert-only'), 800);
    }

    page.append(h('div', { class: 'res-actions' },
      h('button', { type: 'button', class: 'btn btn-primary', onclick: printCertificateOnly }, '🖨️ បោះពុម្ពវិញ្ញាបនបត្រ (A4)'),
      h('button', { type: 'button', class: 'btn', onclick: () => window.print() }, '📄 របាយការណ៍លម្អិត (PDF)'),
      h('button', { type: 'button', class: 'btn', onclick: downloadCSV }, '📥 ទាញយកលទ្ធផល (CSV)'),
      h('button', { type: 'button', class: 'btn', onclick: downloadJSON }, 'ទាញយកទិន្នន័យពេញ (JSON)'),
      h('button', {
        type: 'button', class: 'btn btn-quiet', onclick: () => dialog(
          ['ចាប់ផ្ដើមវគ្គថ្មី? លទ្ធផលនេះនឹងត្រូវលុបចេញពីកុំព្យូទ័រនេះ។ សូមទាញយក CSV មុនសិន បើត្រូវការ។'],
          [{ label: 'បោះបង់' }, { label: 'ចាប់ផ្ដើមថ្មី', primary: true, action: () => { store.clear(); state = null; PISA.home(); } }]),
      }, 'ចាប់ផ្ដើមវគ្គថ្មី')));
    // a session opened from a textbook lesson offers the way back to it
    const back = units.every((u) => u.lessonUrl) && units[0].lessonUrl;
    if (back) {
      page.insertBefore(h('p', { class: 'res-back' },
        h('a', { class: 'btn btn-primary', href: back }, '◀ ត្រឡប់ទៅមេរៀន'),
        state.preview ? h('button', { type: 'button', class: 'btn', onclick: () => location.reload() }, '↻ ធ្វើម្ដងទៀត') : null),
      page.children[1]);
    }
    page.append(h('p', { class: 'res-help', html:
      'ឃើញកំហុសក្នុងសំណួរ ឬចម្លើយគំរូ? <a href="https://t.me/pisamathAI" target="_blank" rel="noopener">ប្រាប់យើងតាម Telegram</a> ដោយសេរី — ' +
      'ប្រាប់ឈ្មោះប្រធានបទ និងលេខសំណួរ។ · <a href="https://khmermath.org/about.html#support" target="_blank" rel="noopener">♥ គាំទ្រ KhmerMath</a>' }));
    framed(page);
    PISA.typeset(page);
    if (window.kmVisits) window.kmVisits.refresh();
  }

  // Points by the PISA process each question tests, and by its estimated
  // level, for the questions the teacher guide tags (the project's own
  // units). A question waiting for the teacher is counted once marked.
  const PROCESSES = [
    ['ការបម្លែងបញ្ហា', 'Formulate'],
    ['ការអនុវត្តគណិតវិទ្យា', 'Employ'],
    ['ការបកស្រាយ និងវាយតម្លៃ', 'Interpret and evaluate'],
  ];
  const LEVELS = ['1c', '1b', '1a', '2', '3', '4', '5', '6'];
  function groupBy(units, tag, order) {
    const groups = new Map();
    units.forEach((u) => PISA.questionIds(u).forEach((qid) => {
      const v = u.questions[qid][tag];
      if (!v) return;
      const sc = scoreOf(u, qid);
      const g = groups.get(v) || { key: v, n: 0, got: 0, max: 0, wait: 0 };
      g.n += 1;
      if (sc.final == null) g.wait += 1;
      else { g.got += sc.final; g.max += sc.max; }
      groups.set(v, g);
    }));
    const rank = (k) => { const i = order.indexOf(k); return i < 0 ? order.length : i; };
    return [...groups.values()].sort((a, b) => rank(a.key) - rank(b.key));
  }
  function meter(label, sub, g) {
    const share = g.max ? g.got / g.max : 0;
    const said = g.max ? PISA.km(g.got) + ' / ' + PISA.km(g.max) + ' ពិន្ទុ' : 'មិនទាន់មានពិន្ទុ';
    const wait = g.wait ? 'រង់ចាំគ្រូ ' + PISA.km(g.wait) + ' សំណួរ' : '';
    return h('div', { class: 'mt-row', title: label + ': ' + [said, PISA.km(g.n) + ' សំណួរ', wait].filter(Boolean).join(' · ') },
      h('div', { class: 'mt-lbl' }, label, sub ? h('span', { class: 'mt-sub', lang: 'en' }, sub) : null),
      h('div', { class: 'mt-track', role: 'img', 'aria-label': label + ' ' + said },
        h('span', { class: 'mt-fill', style: { width: (share * 100).toFixed(1) + '%' } })),
      h('div', { class: 'mt-val' }, said, wait ? h('span', { class: 'mt-wait' }, wait) : null));
  }
  function processSection(units) {
    const procs = groupBy(units, 'process', PROCESSES.map((p) => p[0]));
    if (!procs.length) return null;
    const levels = groupBy(units, 'level', LEVELS);
    const english = Object.fromEntries(PROCESSES);
    const untagged = units.reduce((n, u) => n + PISA.questionIds(u).filter((qid) => !u.questions[qid].process).length, 0);
    return h('section', { class: 'res-proc' },
      h('h2', {}, 'លទ្ធផលតាមដំណើរការគណិតវិទ្យា'),
      h('div', { class: 'mt-cols' },
        h('div', {}, h('h3', {}, 'ដំណើរការ'), ...procs.map((g) => meter(g.key, english[g.key], g))),
        h('div', {}, h('h3', {}, 'កម្រិតប៉ាន់ស្មាន'), ...levels.map((g) => meter('កម្រិត ' + PISA.km(g.key), '', g)))),
      h('p', { class: 'res-note' },
        'រាប់តែសំណួរដែលសៀវភៅណែនាំគ្រូបានកំណត់ដំណើរការ និងកម្រិត (ប្រធានបទគំរូ និងប្រធានបទគម្រោង)។ ' +
        'ការកំណត់ទាំងនេះ ជាការប៉ាន់ស្មានរបស់អ្នករៀបរៀង មិនមែនការក្រិតតាមខ្នាតផ្លូវការរបស់ PISA ទេ។ សំណួររង់ចាំគ្រូ រាប់បញ្ចូលពេលគ្រូដាក់ពិន្ទុរួច។' +
        (untagged ? ' សំណួរ ' + PISA.km(untagged) + ' ផ្សេងទៀតក្នុងវគ្គនេះ (From PISA 2022 ឬលំហាត់តាមកម្រិតថ្នាក់) មិនមានការកំណត់នេះទេ។' : '')));
  }

  function resultRow(u, qid) {
    const sc = scoreOf(u, qid);
    const tr = h('tr');
    tr.append(h('td', { class: 'c-q' }, h('b', {}, sc.q.label), h('div', { class: 'fmt' }, sc.q.format || '')));
    const said = answerText(sc.q, sc.r);
    const drawn = PISA.mathHtml && PISA.mathHtml(said);
    tr.append(drawn ? h('td', { class: 'c-a', html: drawn }) : h('td', { class: 'c-a' }, said));
    const cell = h('td', { class: 'c-s' });
    const grp = h('div', { class: 'tchr' });
    for (let pts = sc.max; pts >= 0; pts--) {
      const lbl = pts === sc.max ? CREDIT.full : pts === 0 ? CREDIT.none : CREDIT.partial;
      grp.append(h('button', {
        type: 'button',
        class: 'tbtn' + (sc.teacher === pts ? ' on' : ''),
        onclick: () => {
          if (sc.teacher === pts) delete state.teacher[qid];
          else state.teacher[qid] = pts;
          save();
          showResults();
        },
      }, lbl + ' (' + PISA.km(pts) + ')'));
    }
    if (sc.final != null) {
      const cls = sc.final === sc.max ? 'ok' : sc.final > 0 ? 'part' : 'no';
      cell.append(h('span', { class: 'pill ' + cls }, PISA.km(sc.final) + ' / ' + PISA.km(sc.max)));
      if (sc.teacher != null) cell.append(h('div', { class: 'snote' }, sc.auto.pts != null && sc.auto.pts !== sc.teacher
        ? 'គ្រូបានកែពី ' + PISA.km(sc.auto.pts) + ' ទៅ ' + PISA.km(sc.teacher)
        : 'គ្រូបានដាក់ពិន្ទុ'));
    } else {
      cell.append(h('span', { class: 'pill wait' }, 'រង់ចាំគ្រូ'));
    }
    if (sc.auto.note) cell.append(h('div', { class: 'snote' }, sc.auto.note));
    // Pending items show the buttons; automatically scored ones keep them
    // folded away under "កែពិន្ទុ" so the table stays readable.
    if (sc.auto.pts == null) cell.append(grp);
    else cell.append(h('details', { class: 'fix' }, h('summary', {}, 'កែពិន្ទុ'), grp));
    tr.append(cell);
    tr.append(h('td', { class: 'c-k' }, h('details', {}, h('summary', {}, 'មើលចម្លើយគំរូ'), raw(sc.q.key || ''))));
    return tr;
  }

  function csvCell(v) {
    const t = String(v == null ? '' : v);
    return /[",\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
  }
  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const a = h('a', { href: URL.createObjectURL(blob), download: name });
    document.body.append(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function fileStem() {
    const d = new Date(state.startedAt);
    const stamp = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0');
    const nm = (state.student.name || 'student').replace(/[\\/:*?"<>|\s]+/g, '_');
    return 'pisa-cba_' + nm + '_' + stamp;
  }
  function downloadCSV() {
    let totEarned = 0, totMax = 0;
    state.unitIds.forEach((id) => {
      const u = PISA.unit(id);
      PISA.questionIds(u).forEach((qid) => {
        const sc = scoreOf(u, qid);
        totMax += sc.max;
        if (sc.final != null) totEarned += sc.final;
      });
    });
    const sPct = totMax > 0 ? Math.round((totEarned / totMax) * 100) : 0;

    const rows = [
      ['របាយការណ៍លទ្ធផលតេស្តគណិតវិទ្យា PISA CBA (cba.khmermath.org)'],
      ['ឈ្មោះសិស្ស', state.student.name || 'សិស្ស', 'ថ្នាក់', state.student.klass || '—'],
      ['សាលា', state.student.school || '—', 'គ្រូបង្រៀន', state.student.teacher || '—'],
      ['កាលបរិច្ឆេទ', new Date(state.startedAt).toLocaleDateString('km-KH'), 'របៀបតេស្ត', state.mock ? state.mock.title : (state.mode === 'test' ? 'របៀបតេស្ត' : 'របៀបហាត់រៀន')],
      ['ពិន្ទុសរុប', totEarned + ' / ' + totMax, 'ភាគរយ', sPct + '%'],
      [''],
      ['student', 'class', 'school', 'teacher', 'mode', 'unit', 'question', 'answer', 'auto_points', 'teacher_points', 'final_points', 'max_points', 'screen_seconds', 'process', 'level']
    ];
    state.unitIds.forEach((id) => {
      const u = PISA.unit(id);
      PISA.questionIds(u).forEach((qid) => {
        const sc = scoreOf(u, qid);
        const si = screenOf(u, qid);
        const secs = si >= 0 ? Math.round((state.times[id + ':' + si] || 0) / 1000) : '';
        rows.push([state.student.name, state.student.klass, state.student.school || '', state.student.teacher || '', state.mode, u.en, sc.q.label, answerText(sc.q, sc.r),
          sc.auto.pts == null ? '' : sc.auto.pts, sc.teacher == null ? '' : sc.teacher, sc.final == null ? '' : sc.final, sc.max, secs,
          sc.q.process || '', sc.q.level || '']);
      });
    });
    // BOM so Excel opens the Khmer text as UTF-8.
    download(fileStem() + '.csv', '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n'), 'text/csv;charset=utf-8');
  }
  function downloadJSON() {
    download(fileStem() + '.json', JSON.stringify(state, null, 2), 'application/json');
  }

  // Leaves the address without its #tutorial / #unit=… part, so a reload
  // opens the home page. Browsers refuse replaceState on some file:// pages.
  function clearHash() {
    if (!location.hash) return;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
  }
  PISA.clearHash = clearHash;

  PISA.showResults = () => showResults();
  PISA.state = () => state;
})();
