/* Scoring rules for the book's own units (gold units U006/U008/U009 and
 * practice units ក–ឍ). Every rule below restates the rubric in the book's
 * answer key (units/unitNNN_name/scoring.tex and practice_tests/test_answer_key.tex, _ext.tex); the
 * key text itself is shown to the teacher on the results page, and the
 * teacher can override any automatic score there.
 *
 * Response parts, as js/units/book_units.js names them:
 *   opt        the chosen option: a Khmer letter (ក ខ គ ឃ) or, for tick-box
 *              options, its position "1", "2", "3"
 *   "0" "1" …  one row of a true/false style table; the value is the column
 *              index as a string ("0" = first column, e.g. ពិត)
 *   a1 a2 …    typed answers on answer lines, in order
 *   why        a written explanation
 *   x1 x2 …    labelled example lines
 *   g4-1 …     the fill-in grid (row-column)
 * A rule returns { pts } (pts: null = the teacher marks it) and an optional
 * note for the teacher.
 */
(function () {
  'use strict';

  const num = (s) => { const p = PISA.parseAnswer(s); return p ? p.value : null; };
  // A typed percentage: 23, 23%, 0.23 and 14/60 all read as 23.
  const pct = (s) => {
    const p = PISA.parseAnswer(s);
    if (!p) return null;
    if (p.fraction) return p.value * 100;
    if (p.percent) return p.value;
    return p.value <= 1 && p.value > 0 ? p.value * 100 : p.value;
  };
  const near = (v, target, tol) => v != null && Math.abs(v - target) <= (tol == null ? 1e-9 : tol);
  const KM = (n) => PISA.km(n);

  // --- rule builders -------------------------------------------------------
  const choice = (right, pts) => (r) => ({ pts: r.opt === right ? pts : 0 });
  const value = (part, test, pts) => (r) => ({ pts: test(r[part]) ? pts : 0 });
  // Rows of a table: `levels` maps "number of rows right" to points.
  const rows = (key, levels) => (r) => {
    const n = key.filter((v, i) => r[String(i)] === v).length;
    let pts = 0;
    Object.keys(levels).forEach((k) => { if (n >= Number(k) && levels[k] > pts) pts = levels[k]; });
    return { pts, note: KM(n) + ' / ' + KM(key.length) + ' ជួរត្រឹមត្រូវ' };
  };
  // "Choose, then explain": the wrong choice scores 0 as the rubric says;
  // the right choice goes to the teacher for the explanation.
  const chooseExplain = (right) => (r) => (r.opt === right
    ? { pts: null, note: 'ជម្រើសត្រឹមត្រូវ — គ្រូត្រូវអានការពន្យល់' }
    : { pts: 0, note: r.opt ? 'ជម្រើសមិនត្រឹមត្រូវ' : 'មិនបានជ្រើសរើស' });
  const teacher = () => () => ({ pts: null });

  // --- a tiny expression checker for U008 Q1 (C = 2,000 + 100n) ------------
  function exprValue(src, n) {
    let s = PISA.latin(src).replace(/\s+/g, '').replace(/^c=/i, '').replace(/(\d),(?=\d{3})/g, '$1')
      .replace(/[×xX*·]/g, '*').replace(/[÷:]/g, '/').replace(/[−–]/g, '-');
    if (!/^[0-9.n+\-*/()]+$/i.test(s)) return null;
    s = s.replace(/N/g, 'n');
    let p = 0;
    const peek = () => s[p];
    function expr() {
      let v = term();
      while (peek() === '+' || peek() === '-') { const op = s[p++]; const r = term(); v = op === '+' ? v + r : v - r; }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const c = peek();
        if (c === '*' || c === '/') { p++; const r = unary(); v = c === '*' ? v * r : v / r; }
        else if (c === 'n' || c === '(' || (c && /[0-9.]/.test(c))) v *= unary();
        else return v;
      }
    }
    function unary() {
      if (peek() === '-') { p++; return -unary(); }
      if (peek() === '+') { p++; return unary(); }
      if (peek() === '(') { p++; const v = expr(); if (peek() === ')') p++; return v; }
      if (peek() === 'n') { p++; return n; }
      const m = /^[0-9]*\.?[0-9]+/.exec(s.slice(p));
      if (!m) throw new Error('syntax');
      p += m[0].length;
      return parseFloat(m[0]);
    }
    try {
      const v = expr();
      return p === s.length ? v : null;
    } catch (e) { return null; }
  }
  const sameExpr = (src, f) => src != null && [1, 3, 10, 37].every((n) => near(exprValue(src, n), f(n), 1e-6));
  PISA.exprValue = exprValue; // for the self-test

  const shopKh = (s) => { const t = String(s || ''); return /ខ/.test(t) && !/ក/.test(t); };

  PISA.bookScoring = {
    // ------------------------------------------------------ U006 dice (G7)
    g006q1: choice('គ', 1),
    g006q2: (r) => {
      const v = pct(r.a1);
      if (near(v, 23)) return { pts: 2 };
      if (v != null && v > 23.2 && v < 23.4) return { pts: 1, note: 'មិនទាន់បង្គត់ជាចំនួនគត់' };
      return { pts: 0, note: 'បើសិស្សបង្ហាញ 14 ÷ 60 × 100 ត្រឹមត្រូវ តែគណនាខុស គ្រូអាចកែជាពិន្ទុមិនពេញ (១)' };
    },
    g006q3: teacher(),
    // ------------------------------------------------ U008 print shop (G8)
    g008q1: (r) => {
      const a = sameExpr(r.a1, (n) => 2000 + 100 * n);
      const b = sameExpr(r.a2, (n) => 150 * n);
      return { pts: a && b ? 2 : a || b ? 1 : 0, note: (a ? 'ហាង ក ត្រូវ' : 'ហាង ក មិនត្រូវ') + ' · ' + (b ? 'ហាង ខ ត្រូវ' : 'ហាង ខ មិនត្រូវ') };
    },
    g008q2: (r) => {
      const a = near(num(r.a1), 4000);
      const b = near(num(r.a2), 3000);
      const s = shopKh(r.a3);
      if (a && b && s) return { pts: 2 };
      if ((a && b) || ((a || b) && s)) return { pts: 1 };
      return { pts: 0 };
    },
    g008q3: teacher(),
    // ------------------------------------------------ U009 water tower (G9)
    g009q1: (r) => ({
      pts: null,
      note: (near(num(r.a1), 14.4, 0.001) ? 'ចម្លើយ 14.4 ត្រឹមត្រូវ' : 'ចម្លើយមិនមែន 14.4') + ' — គ្រូត្រូវពិនិត្យវិធីសមាមាត្រ',
    }),
    g009q2: choice('ខ', 1),
    g009q3: teacher(),

    // ------------------------------------------------ ក electricity bill
    paq1: value('a1', (s) => near(num(s), 24000), 1),
    paq2: choice('គ', 2),
    paq3: teacher(),
    // ------------------------------------------------ ខ motodop fares
    pbq1: rows(['0', '0', '1'], { 2: 1, 3: 2 }),
    pbq2: value('a1', (s) => near(num(s), 5), 1),
    pbq3: teacher(),
    // ------------------------------------------------ គ water tank
    pcq1: choice('ខ', 1),
    pcq2: chooseExplain('2'),
    pcq3: value('a1', (s) => near(num(s), 16), 2),
    // ------------------------------------------------ ឃ air quality
    pdq1: teacher(),
    pdq2: choice('គ', 2),
    pdq3: value('a1', (s) => near(num(s), 109), 2),
    // ------------------------------------------------ ង algae
    peq1: value('a1', (s) => near(num(s), 64), 1),
    peq2: rows(['1', '0', '0'], { 2: 1, 3: 2 }),
    peq3: chooseExplain('2'),
    // ------------------------------------------------ ច breakfast
    pfq1: choice('ខ', 1),
    pfq2: value('a1', (s) => near(pct(s), 90), 2),
    pfq3: chooseExplain('2'),
    // ------------------------------------------------ ឆ rice field
    pgq1: choice('គ', 1),
    pgq2: value('a1', (s) => { const v = num(s); return v != null && v >= 3600 && v <= 4300; }, 2),
    pgq3: chooseExplain('2'),
    // ------------------------------------------------ ជ rice yield
    phq1: choice('ខ', 2),
    phq2: rows(['0', '1', '0', '1'], { 3: 1, 4: 2 }),
    phq3: chooseExplain('2'),
    // ------------------------------------------------ ឈ powers
    piq1: rows(['0', '1', '1'], { 2: 1, 3: 2 }),
    piq2: choice('គ', 2),
    piq3: choice('ក', 2),
    // ------------------------------------------------ ញ always / sometimes / never
    pjq1: rows(['0', '1'], { 1: 1, 2: 2 }),
    pjq2: rows(['0', '1', '2', '0', '1', '2'], { 3: 1, 4: 2, 6: 3 }),
    pjq3: teacher(),
    // ------------------------------------------------ ដ tiling pattern
    pkq1: (r) => {
      const want = { 3: 'ខខកខខក', 4: 'កខខកខខ' };
      const ok = [3, 4].map((row) => want[row].split('').every((ch, i) => r['g' + row + '-' + (i + 1)] === ch));
      const n = ok.filter(Boolean).length;
      return { pts: n === 2 ? 2 : n === 1 ? 1 : 0, note: KM(n) + ' / ២ ជួរដេកត្រឹមត្រូវទាំងស្រុង' };
    },
    pkq2: choice('ខ', 2),
    pkq3: chooseExplain('1'),
    // ------------------------------------------------ ឋ delivery ratings
    plq1: value('a1', (s) => near(pct(s), 20), 2),
    plq2: (r) => {
      const a = near(pct(r.a1), 42.5, 0.05);
      const b = near(pct(r.a2), 8.5, 0.05);
      if (a && b) return { pts: 3 };
      if (a || b) return { pts: 2, note: 'ត្រូវមួយ' };
      if (near(pct(r.a1), 8.5, 0.05) && near(pct(r.a2), 42.5, 0.05)) return { pts: 1, note: 'រកបាន 17 តែភាគបែងច្រឡំគ្នា' };
      return { pts: 0 };
    },
    plq3: chooseExplain('2'),
    // ------------------------------------------------ ឌ city routes
    pmq1: value('a1', (s) => near(num(s), 8), 2),
    pmq2: chooseExplain('2'),
    pmq3: (r) => {
      const n = [r[0] === '0', r[1] === '1'].filter(Boolean).length;
      if (n === 2) return { pts: null, note: 'ពិត/មិនពិត ត្រឹមត្រូវទាំងពីរ — គ្រូត្រូវអានការពន្យល់ (២ ឬ ៣ ពិន្ទុ)' };
      return { pts: n, note: KM(n) + ' / ២ ត្រឹមត្រូវ' };
    },
    // ------------------------------------------------ ឍ savings table
    pnq1: value('a1', (s) => near(num(s), 200000), 2),
    pnq2: rows(['3', '0', '1'], { 1: 1, 2: 2, 3: 3 }),
    pnq3: chooseExplain('2'),
  };

  // Questions whose paper version has room for working; the screen adds a
  // box for it (the rubric gives credit for the method).
  PISA.bookWorkBox = { g009q1: true };
})();
