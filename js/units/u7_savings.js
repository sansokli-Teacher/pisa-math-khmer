/* Unit 7 — ការពិសោធនិម្មិតលើការសន្សំប្រាក់ (Savings Simulation)
 * Source: teacher guide chapter 8, screens 1–9 (oecd_ex7_*.tikz) and keys.
 *
 * The simulator knows three of four variables and computes the fourth, with
 * monthly deposits at the end of each month and the annual rate compounded
 * monthly (r = rate / 12). Display rounding reproduces every value printed in
 * the book's simulator screens:
 *   total savings  -> nearest 5 Zeds   (495, 2165, 505, 2350)
 *   monthly deposit-> nearest Zed      (405, 92, 255, 82)
 *   duration       -> nearest month    (97, 55, 81, 49; 300, 150, 184, 112)
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  // ------------------------------------------------------------- maths ---
  function compute(out, v) {
    const r = v.rate / 1200;
    if (out === 'T') {
      const t = r ? (v.P * (Math.pow(1 + r, v.n) - 1)) / r : v.P * v.n;
      return Math.round(t / 5) * 5;
    }
    if (out === 'P') {
      if (!(v.n > 0)) return null;
      const p = r ? (v.T * r) / (Math.pow(1 + r, v.n) - 1) : v.T / v.n;
      return Math.round(p);
    }
    if (out === 'n') {
      if (!(v.P > 0)) return null;
      const n = r ? Math.log(1 + (v.T * r) / v.P) / Math.log(1 + r) : v.T / v.P;
      return Math.round(n);
    }
    return null;
  }
  PISA.savingsCompute = compute; // exposed for the self-test

  const VARS = [
    { k: 'n', label: 'រយៈពេលសន្សំ', unit: 'ខែ', min: 0, max: 120, step: 1, col: 'រយៈពេល<br>(ខែ)' },
    { k: 'P', label: 'ប្រាក់តម្កល់ប្រចាំខែ', unit: 'Zeds', min: 0, max: 200, step: 1, col: 'តម្កល់ប្រចាំខែ<br>(Zeds)' },
    { k: 'rate', label: 'អត្រាការប្រាក់ប្រចាំឆ្នាំ', unit: '% ក្នុងមួយឆ្នាំ', min: 0, max: 15, step: 1, col: 'អត្រា<br>ការប្រាក់ (%)' },
    { k: 'T', label: 'ប្រាក់សន្សំសរុប', unit: 'Zeds', min: 0, max: 10000, step: 50, col: 'សន្សំសរុប<br>(Zeds)' },
  ];
  const MODES = [
    { v: '', label: 'ជ្រើសរើសអ្វីដែលអ្នកចង់ពិសោធនិម្មិត៖' },
    { v: 'T', label: 'ចំនួនសរុបដែលអ្នកនឹងសន្សំបាន' },
    { v: 'P', label: 'ប្រាក់តម្កល់ប្រចាំខែដែលអ្នកគួរបង់' },
    { v: 'n', label: 'រយៈពេលដែលអ្នកត្រូវការដើម្បីសន្សំ' },
  ];
  const ZERO = { n: 0, P: 0, rate: 0, T: 0 };

  // preset: { mode, vals, rows: [[n, P, rate, T], ...] }; locked = read-only
  function simulator(ctx, key, preset, locked) {
    const init = () => ({
      mode: (preset && preset.mode) || '',
      vals: Object.assign({}, ZERO, preset && preset.vals),
      rows: ((preset && preset.rows) || []).map((r) => ({ n: r[0], P: r[1], rate: r[2], T: r[3], out: preset.mode })),
    });
    const st = locked ? init() : ctx.ui(key, init);
    const box = h('div', { class: 'sim' + (locked ? ' locked' : '') });
    const save = () => { if (!locked) ctx.setUi(key, st); };

    function draw() {
      box.innerHTML = '';
      const out = st.mode;
      if (out) st.vals[out] = compute(out, st.vals);
      box.append(h('div', { class: 'sim-title' }, 'កម្មវិធីពិសោធនិម្មិតសន្សំប្រាក់ (SAVINGS SIMULATOR)'));

      const sel = h('select', { class: 'sim-select', 'aria-label': 'ជ្រើសរើសអ្វីដែលចង់ពិសោធនិម្មិត', disabled: locked });
      MODES.forEach((m) => {
        const o = h('option', { value: m.v }, m.label);
        if (m.v === '') o.disabled = true;
        if (m.v === out) o.selected = true;
        sel.append(o);
      });
      sel.addEventListener('change', () => { st.mode = sel.value; save(); draw(); });
      box.append(h('div', { class: 'sim-step' }, h('span', { class: 'in' }, 'ជំហានទី ១៖ ជ្រើសរើសអ្វីដែលចង់ពិសោធនិម្មិត៖'), sel));
      box.append(h('div', { class: 'sim-step' }, h('span', { class: 'in' }, 'ជំហានទី ២៖ បំពេញព័ត៌មានដោយប្រើរបារ (ពណ៌ក្រហម)')));

      const rows = h('div', { class: 'sim-vars' });
      VARS.forEach((v) => {
        const isOut = v.k === out;
        const enabled = !!out && !isOut && !locked;
        const cls = isOut ? 'out' : 'in';
        const cur = st.vals[v.k];
        const range = h('input', { type: 'range', min: v.min, max: v.max, step: v.step, disabled: !enabled, 'aria-label': v.label });
        range.value = cur == null ? v.min : Math.min(v.max, Math.max(v.min, cur));
        const valEl = h('span', { class: 'sim-val ' + cls }, cur == null ? '—' : String(cur));
        const set = (x) => {
          st.vals[v.k] = Math.min(v.max, Math.max(v.min, x));
          if (st.mode) st.vals[st.mode] = compute(st.mode, st.vals);
          save();
          draw();
        };
        range.addEventListener('input', () => {
          st.vals[v.k] = Number(range.value);
          valEl.textContent = range.value;
          if (st.mode) {
            st.vals[st.mode] = compute(st.mode, st.vals);
            const o = box.querySelector('.sim-val.out');
            if (o) o.textContent = st.vals[st.mode] == null ? '—' : String(st.vals[st.mode]);
          }
        });
        range.addEventListener('change', () => { save(); draw(); });
        const dec = h('button', { type: 'button', class: 'sim-arr', disabled: !enabled, 'aria-label': 'បន្ថយ ' + v.label, onclick: () => set((st.vals[v.k] || 0) - v.step) }, '◀');
        const inc = h('button', { type: 'button', class: 'sim-arr', disabled: !enabled, 'aria-label': 'បង្កើន ' + v.label, onclick: () => set((st.vals[v.k] || 0) + v.step) }, '▶');
        rows.append(h('div', { class: 'sim-row' },
          h('span', { class: 'sim-lbl ' + cls }, v.label + '៖'),
          h('span', { class: 'sim-slider' }, dec, range, inc),
          valEl,
          h('span', { class: 'sim-unit ' + cls }, v.unit)));
      });
      box.append(rows);

      const msg = h('div', { class: 'sim-msg', role: 'status' });
      const saveBtn = h('button', {
        type: 'button', class: 'sim-btn', disabled: locked,
        onclick: () => {
          if (!st.mode || st.vals[st.mode] == null) { msg.textContent = 'សូមជ្រើសរើសអ្វីដែលចង់ពិសោធនិម្មិត និងបំពេញតម្លៃជាមុនសិន។'; return; }
          if (st.rows.length >= 5) { msg.textContent = 'តារាងពេញហើយ (៥ ការពិសោធនិម្មិត)។ ចុច «លុបទិន្នន័យ» ដើម្បីចាប់ផ្ដើមថ្មី។'; return; }
          st.rows.push({ n: st.vals.n, P: st.vals.P, rate: st.vals.rate, T: st.vals.T, out: st.mode });
          save();
          draw();
        },
      }, 'រក្សាទុកទិន្នន័យ');
      const clearBtn = h('button', { type: 'button', class: 'sim-btn', disabled: locked, onclick: () => { st.rows = []; save(); draw(); } }, 'លុបទិន្នន័យ');
      box.append(h('div', { class: 'sim-btns' }, saveBtn, clearBtn), msg);

      const t = h('table', { class: 'sim-table' });
      const hr = h('tr', {}, h('th', { html: 'ពិសោធនិម្មិត<br>#' }));
      VARS.forEach((v) => hr.append(h('th', { html: v.col })));
      t.append(h('thead', {}, hr));
      const tb = h('tbody');
      for (let i = 0; i < 5; i++) {
        const r = st.rows[i];
        const tr = h('tr', {}, h('td', {}, String(i + 1)));
        VARS.forEach((v) => tr.append(h('td', { class: r ? (r.out === v.k ? 'out' : 'in') : '' }, r ? String(r[v.k]) : '')));
        tb.append(tr);
      }
      t.append(tb);
      box.append(t);
    }
    draw();
    return box;
  }

  // ------------------------------------------------------------ screens ---
  const HOWTO = () => W.stack(
    W.instr('ការប្រើឧបករណ៍ពិសោធនិម្មិតមានពីរជំហាន៖'),
    h('ol', { class: 'steps' }, h('li', {}, 'ជ្រើសរើសអ្វីដែលចង់ពិសោធនិម្មិត និង'), h('li', {}, 'បញ្ចូលតម្លៃនៃអថេរពាក់ព័ន្ធ។')),
    W.instr('ឧបករណ៍ពិសោធនិម្មិតអនុញ្ញាតឱ្យរក្សាទុកព័ត៌មានបានរហូតដល់ប្រាំការពិសោធនិម្មិតក្នុងពេលតែមួយ។'),
    W.instr('សូមស្វែងយល់ពីរបៀបដែលឧបករណ៍ពិសោធនិម្មិតដំណើរការ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'));

  const PRESET_T = { mode: 'T', vals: { n: 48, P: 40, rate: 10 }, rows: [[12, 40, 6, 495], [48, 40, 6, 2165], [12, 40, 10, 505], [48, 40, 10, 2350]] };
  const PRESET_P = { mode: 'P', vals: { n: 48, rate: 12, T: 5000 }, rows: [[12, 405, 6, 5000], [48, 92, 6, 5000], [18, 255, 12, 5000], [48, 82, 12, 5000]] };
  const PRESET_N = { mode: 'n', vals: { P: 80, rate: 12, T: 5000 }, rows: [[97, 40, 6, 5000], [55, 80, 6, 5000], [81, 40, 12, 5000], [49, 80, 12, 5000]] };
  const PRESET_SISVE = { mode: 'n', vals: { P: 40, rate: 6, T: 6000 }, rows: [[300, 20, 0, 6000], [150, 40, 0, 6000], [184, 20, 6, 6000], [112, 40, 6, 6000]] };

  const SIM_COLS = [
    { k: 'need', html: 'ដឹងចំនួនប្រាក់ត្រូវការ' },
    { k: 'month', html: 'ដឹងចំនួនសន្សំក្នុងខែ' },
    { k: 'time', html: 'ដឹងពេលដែលត្រូវការ' },
  ];
  const SIM_ROWS = [
    { k: 'n', html: 'ពិសោធនិម្មិតរយៈពេលសន្សំ', key: ['need', 'month'] },
    { k: 'P', html: 'ពិសោធនិម្មិតប្រាក់តម្កល់ប្រចាំខែ', key: ['need', 'time'] },
    { k: 'T', html: 'ពិសោធនិម្មិតប្រាក់សន្សំសរុប', key: ['month', 'time'] },
  ];
  // "Choose two statements for each simulation": a third tick in a row is
  // refused, so the student has to untick one first.
  function pickTwo(ctx) {
    const t = h('table', { class: 'ctable picktwo' });
    t.append(h('thead', {},
      h('tr', {}, h('th', { class: 'st', rowspan: 2 }, 'ការពិសោធនិម្មិត'), h('th', { colspan: 3 }, 'អំណះអំណាង')),
      h('tr', {}, ...SIM_COLS.map((c) => h('th', { class: 'cc', html: c.html })))));
    const tb = h('tbody');
    SIM_ROWS.forEach((row) => {
      const tr = h('tr', {}, h('td', { class: 'st' }, row.html));
      SIM_COLS.forEach((c) => {
        const part = row.k + '-' + c.k;
        const inp = h('input', { type: 'checkbox', 'aria-label': row.html + ' — ' + c.html });
        inp.checked = !!ctx.val('u7q2', part);
        inp.addEventListener('change', () => {
          if (inp.checked) {
            const n = SIM_COLS.filter((cc) => ctx.val('u7q2', row.k + '-' + cc.k)).length;
            if (n >= 2) { inp.checked = false; return; }
          }
          ctx.setVal('u7q2', part, inp.checked ? true : null);
        });
        tr.append(h('td', { class: 'cc' }, h('label', { class: 'cell-hit' }, inp)));
      });
      tb.append(tr);
    });
    t.append(tb);
    return t;
  }

  const QUOTE = 'ស៊ីស្វេបានធ្វើការពិសោធនិម្មិតមួយចំនួន។ នាងនិយាយថា៖ «<b>ខ្ញុំសង្កេតឃើញថា ពេលគ្មានការប្រាក់ ហើយបង្កើនប្រាក់តម្កល់ប្រចាំខែទ្វេដង នោះរយៈពេលសន្សំថយចុះពាក់កណ្ដាល។ ប៉ុន្តែពេលមានការប្រាក់ ការបង្កើនប្រាក់តម្កល់ទ្វេដង មិនធ្វើឱ្យរយៈពេលថយចុះពាក់កណ្ដាលទេ។</b>»';

  const num = (str) => { const p = PISA.parseAnswer(str); return p ? p.value : null; };

  PISA.registerUnit({
    id: 'u7',
    no: 7,
    title: 'ការពិសោធនិម្មិតលើការសន្សំប្រាក់',
    en: 'Savings Simulation',
    blurb: 'ប្រើឧបករណ៍ពិសោធនិម្មិតការសន្សំ ដែលដឹងអថេរបី រួចគណនាអថេរទីបួន។',
    questions: {
      u7q1: {
        label: 'សំណួរ ១', format: 'សំណួរសរសេរចម្លើយខ្លី (៣ ផ្នែក)', max: 1,
        parts: [{ k: 'a', label: '(១) សន្សំសរុប' }, { k: 'b', label: '(២) តម្កល់ប្រចាំខែ' }, { k: 'c', label: '(៣) ចំនួនខែ' }],
        score: (r) => {
          const ok = [PISA.inRange(num(r.a), 3110, 3125), PISA.inRange(num(r.b), 98, 100), PISA.inRange(num(r.c), 48, 50)];
          const n = ok.filter(Boolean).length;
          return { pts: n === 3 ? 1 : 0, note: PISA.km(n) + ' / ៣ ផ្នែកត្រឹមត្រូវ' };
        },
        key: '(១) ប្រមាណ <b>៣ ១១៨ Zeds</b> — (២) ប្រមាណ <b>៩៩ Zeds ក្នុងមួយខែ</b> — (៣) ប្រមាណ <b>៤៩ ខែ</b>។<br><b>ចម្លើយដែលទទួលស្គាល់៖</b> ចម្លើយក្បែរៗនេះក៏បានដែរ ព្រោះឧបករណ៍បង្គត់តម្លៃ។ តម្លៃទាំងនេះគណនាតាមរូបមន្តការប្រាក់ផ្សំប្រចាំខែ ហើយផ្ទៀងផ្ទាត់នឹងជួរទី ៤ របស់ស៊ីស្វេ (៤០ Zeds/ខែ អត្រា ៦% រយៈពេល ១១២ ខែ ផ្ដល់ ៦ ០០០ Zeds)។' +
          '<p class="knote">កំណត់សម្គាល់របស់កម្មវិធី៖ ឧបករណ៍បង្គត់ប្រាក់សន្សំសរុបទៅ ៥ Zeds ជិតបំផុត ដូច្នេះវាបង្ហាញ ៣ ១២០។ កម្មវិធីទទួលយក ៣ ១១០ ដល់ ៣ ១២៥ / ៩៨ ដល់ ១០០ / ៤៨ ដល់ ៥០ ហើយផ្ដល់ពិន្ទុពេញ លុះត្រាតែត្រូវទាំងបីផ្នែក។</p>',
      },
      u7q2: {
        label: 'សំណួរ ២', format: 'សំណួរចម្លើយឆ្លាស់ (ជ្រើសរើសពីរក្នុងមួយជួរ)', max: 1,
        answered: (r) => SIM_ROWS.every((row) => SIM_COLS.filter((c) => r[row.k + '-' + c.k]).length === 2),
        summary: (r) => SIM_ROWS.map((row) => row.html + '៖ ' + (SIM_COLS.filter((c) => r[row.k + '-' + c.k]).map((c) => c.html).join(' + ') || '—')).join(' | '),
        score: (r) => ({
          pts: SIM_ROWS.every((row) => SIM_COLS.every((c) => !!r[row.k + '-' + c.k] === row.key.includes(c.k))) ? 1 : 0,
        }),
        key: 'គោលការណ៍គឺ ត្រូវដឹងអថេរពីរផ្សេងទៀត ទើបគណនាអថេរទីបីបាន។<br><b>ពិសោធនិម្មិតរយៈពេល៖</b> ដឹងចំនួនប្រាក់ដែលត្រូវការ និងចំនួនសន្សំបានក្នុងមួយខែ។<br><b>ពិសោធនិម្មិតប្រាក់តម្កល់ប្រចាំខែ៖</b> ដឹងចំនួនប្រាក់ដែលត្រូវការ និងពេលដែលត្រូវការ។<br><b>ពិសោធនិម្មិតប្រាក់សន្សំសរុប៖</b> ដឹងចំនួនសន្សំបានក្នុងមួយខែ និងពេលដែលត្រូវការ។',
      },
      u7q3: {
        label: 'សំណួរ ៣', format: 'សំណួរចម្លើយវែង (ជ្រើសរើស រួចពន្យល់)', max: 1,
        parts: [{ k: 'a', label: '(១)', map: { always: 'ពិតជានិច្ច', some: 'ពិតជួនកាល' } }, { k: 'b', label: '(២)', map: { small: 'តម្កល់តូចជាង', big: 'តម្កល់ធំជាង' } }, { k: 'why', label: '(៣)' }],
        score: (r) => (r.a === 'always' && r.b === 'small'
          ? { pts: null, note: 'ផ្នែក (១) និង (២) ត្រឹមត្រូវ — គ្រូត្រូវអានហេតុផល (៣)' }
          : { pts: 0, note: 'ផ្នែក (១) ឬ (២) មិនត្រឹមត្រូវ' }),
        key: '<b>(១) ពិតជានិច្ច។</b> គ្មានការប្រាក់៖ ១៥០ ជាពាក់កណ្ដាលពិតប្រាកដនៃ ៣០០។ អត្រា ៦%៖ ១១២ ធំជាងពាក់កណ្ដាលនៃ ១៨៤ គឺ ៩២។<br><b>(២) ពេលប្រាក់តម្កល់ប្រចាំខែតូចជាង។</b> ការឡើងអត្រាពី ០% ទៅ ៦% សន្សំបាន ១១៦ ខែ (៣០០ → ១៨៤) តែបានតែ ៣៨ ខែ (១៥០ → ១១២)។<br><b>(៣) ព្រោះពេលតម្កល់តិច ការសន្សំយូរជាង</b> ការប្រាក់ក៏មានពេលផ្សំច្រើនជាង ហើយចូលរួមចំណែកធំជាងក្នុងចំនួនសរុប។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 42,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: () => h('div', { class: 'stack', html:
          '<p>ស៊ីស្វេ និងឪពុកម្ដាយរបស់នាង កំពុងពិភាក្សាអំពីរបៀបសន្សំប្រាក់ ដើម្បីគាំទ្រការចំណាយពេលនាងចូលរៀនមហាវិទ្យាល័យ។ ពួកគេបានរកឃើញកម្មវិធីពិសោធនិម្មិតការសន្សំតាមអ៊ីនធឺណិតមួយ ដែលអនុញ្ញាតឱ្យស្វែងយល់ពីវិធីផ្សេងៗដើម្បីសម្រេចលទ្ធផលដែលពួកគេចង់បាន។</p>' +
          '<p>ឧបករណ៍ពិសោធនិម្មិតនេះពិចារណាលើអថេរបួន៖</p><ul>' +
          '<li><b>ប្រាក់តម្កល់ប្រចាំខែ</b>៖ ចំនួនប្រាក់ដែលគ្រួសារដាក់ចូលគណនីសន្សំរៀងរាល់ខែ</li>' +
          '<li><b>រយៈពេលសន្សំ</b>៖ ចំនួនខែដែលគ្រួសារដាក់ប្រាក់ចូលគណនី</li>' +
          '<li><b>អត្រាការប្រាក់ប្រចាំឆ្នាំ</b> ដែលគណនីសន្សំទទួលបាន និង</li>' +
          '<li><b>ប្រាក់សន្សំសរុប</b>៖ ចំនួនសរុបដែលនឹងសន្សំបាននៅចុងរយៈពេលសន្សំ។</li></ul>' +
          '<p>កម្មវិធីនេះអនុញ្ញាតឱ្យធ្វើការពិសោធនិម្មិតបីបែប៖</p><ul>' +
          '<li><b>ប្រាក់សន្សំសរុប</b>៖ ចំនួនសរុបដែលនឹងកកកុញ បើដឹងប្រាក់តម្កល់ប្រចាំខែ អត្រាការប្រាក់ និងរយៈពេល;</li>' +
          '<li><b>ប្រាក់តម្កល់ប្រចាំខែ</b>៖ ចំនួនដែលត្រូវតម្កល់ជារៀងរាល់ខែ ដើម្បីសម្រេចប្រាក់សន្សំគោលដៅ; និង</li>' +
          '<li><b>រយៈពេលសន្សំ</b>៖ ចំនួនខែដែលត្រូវការ ដើម្បីសម្រេចប្រាក់សន្សំគោលដៅ។</li></ul>' }),
      },
      { tag: 'សេចក្ដីណែនាំ', split: 40, noTitle: true, left: HOWTO, right: (ctx) => simulator(ctx, 'u7-sim-s2', null) },
      { tag: 'សេចក្ដីណែនាំ', split: 40, noTitle: true, left: HOWTO, right: (ctx) => simulator(ctx, 'u7-sim-s3', PRESET_T) },
      { tag: 'សេចក្ដីណែនាំ', split: 40, noTitle: true, left: HOWTO, right: (ctx) => simulator(ctx, 'u7-sim-s4', PRESET_P) },
      { tag: 'សេចក្ដីណែនាំ', split: 40, noTitle: true, left: HOWTO, right: (ctx) => simulator(ctx, 'u7-sim-s5', PRESET_N) },
      {
        tag: 'សំណួរ ១ / ៣', split: 40, noTitle: true, items: ['u7q1'],
        left: (ctx) => W.stack(
          W.p('សូមប្រើឧបករណ៍ពិសោធនិម្មិត ដើម្បីគណនាចំនួនដែលមិនស្គាល់ ក្នុងស្ថានភាពនីមួយៗ។'),
          h('div', { class: 'subq', html: '<p>១. តើស៊ីស្វេនឹងសន្សំបានប៉ុន្មាន Zeds សរុប បើនាង៖</p><ul><li>តម្កល់ ៦០ Zeds ក្នុងមួយខែ</li><li>ក្នុងរយៈពេល ៤៨ ខែ</li><li>ដោយអត្រាការប្រាក់ប្រចាំឆ្នាំ ៤%។</li></ul>' }),
          W.input(ctx, 'u7q1', 'a', 'សូមបញ្ចូលចម្លើយ', { cls: 'short', label: 'ចម្លើយទី ១' }),
          h('div', { class: 'subq', html: '<p>២. តើស៊ីស្វេត្រូវតម្កល់ប៉ុន្មាន Zeds ជារៀងរាល់ខែ បើនាង៖</p><ul><li>ចង់សន្សំបាន ៤ ០០០ Zeds</li><li>ក្នុងរយៈពេល ៣៦ ខែ</li><li>ដោយអត្រាការប្រាក់ប្រចាំឆ្នាំ ៨%។</li></ul>' }),
          W.input(ctx, 'u7q1', 'b', 'សូមបញ្ចូលចម្លើយ', { cls: 'short', label: 'ចម្លើយទី ២' }),
          h('div', { class: 'subq', html: '<p>៣. តើត្រូវចំណាយពេលប៉ុន្មានខែ ដើម្បីឱ្យស៊ីស្វេ៖</p><ul><li>សន្សំបាន ៦ ០០០ Zeds</li><li>ដោយតម្កល់ ១០០ Zeds ក្នុងមួយខែ</li><li>ដោយអត្រាការប្រាក់ប្រចាំឆ្នាំ ១០%។</li></ul>' }),
          W.input(ctx, 'u7q1', 'c', 'សូមបញ្ចូលចម្លើយ', { cls: 'short', label: 'ចម្លើយទី ៣' })),
        right: (ctx) => simulator(ctx, 'u7-sim-q1', null),
      },
      {
        tag: 'សំណួរ ២ / ៣', split: 42, noTitle: true, items: ['u7q2'],
        left: (ctx) => W.stack(
          W.p('សម្រាប់ការពិសោធនិម្មិតនីមួយៗ សូមជ្រើសរើស <b>អំណះអំណាងពីរ</b> ដែលបញ្ជាក់ពីមូលហេតុនៃការប្រើពិសោធនិម្មិតនោះ។', 'q'),
          pickTwo(ctx)),
        right: (ctx) => simulator(ctx, 'u7-sim-q2', null),
      },
      {
        tag: 'សំណួរ ៣ / ៣', split: 42, noTitle: true, items: ['u7q3'],
        left: (ctx) => W.stack(
          W.p(QUOTE),
          W.instr('សូមចុចលើផ្ទាំងនីមួយៗ ដើម្បីសិក្សាកំណត់ត្រាពិសោធនិម្មិតរបស់ស៊ីស្វេ និងធ្វើការពិសោធនិម្មិតដោយខ្លួនឯង។'),
          W.p('១. សូមបំពេញអំណះអំណាង៖ ការសង្កេតរបស់ស៊ីស្វេគឺ', 'q'),
          W.radios(ctx, 'u7q3', 'a', [{ v: 'always', html: 'ពិតជានិច្ច' }, { v: 'some', html: 'ពិតជួនកាល អាស្រ័យលើអត្រាការប្រាក់' }]),
          W.p('២. សូមបំពេញអំណះអំណាង៖ សម្រាប់ប្រាក់សន្សំសរុបថេរ និងប្រាក់តម្កល់ប្រចាំខែថេរ ការកើនឡើងនៃអត្រាការប្រាក់ បន្ថយរយៈពេលសន្សំបានច្រើនជាង នៅពេល៖', 'q'),
          W.radios(ctx, 'u7q3', 'b', [{ v: 'small', html: 'ប្រាក់តម្កល់ប្រចាំខែតូចជាង' }, { v: 'big', html: 'ប្រាក់តម្កល់ប្រចាំខែធំជាង' }]),
          W.p('៣. សូមផ្ដល់ហេតុផលសម្រាប់អំណះអំណាងដែលអ្នកបានបំពេញក្នុងសំណួរទី ២។', 'q'),
          W.textarea(ctx, 'u7q3', 'why', 'សូមផ្ដល់ហេតុផល', 3)),
        right: (ctx) => W.tabs(ctx, 'u7-q3-tab', [
          { label: 'ពិសោធនិម្មិតរបស់ស៊ីស្វេ', color: '#C55A11', light: '#F8CBAD', render: () => simulator(ctx, 'u7-sim-sisve', PRESET_SISVE, true) },
          { label: 'ពិសោធនិម្មិតទទេ', color: '#548235', light: '#C5E0B4', render: () => simulator(ctx, 'u7-sim-q3', null) },
        ]),
      },
    ],
  });
})();
