/* Unit 4 — ការក្រាលការ៉ូ (Tiling)
 * Source: teacher guide chapter 8, screens 1–7 (oecd_ex4_*.tikz) and keys.
 * Tiles are drawn the way oecd_ex4_tiles.tikz draws them:
 *   A = two diagonal bands, B = a plus sign, C = a quarter arc + one band.
 * Grid rows are numbered from the bottom (row 1) up, columns from the left.
 */
(function () {
  'use strict';
  const { h, s, W } = PISA;

  // ------------------------------------------------------------- tiles ---
  function tileSvg(type) {
    const svg = s('svg', { viewBox: '0 0 1 1', class: 'tile', 'aria-hidden': 'true' });
    if (type === 'A') {
      svg.append(s('polygon', { points: '0,0.31 0.69,1 0.31,1 0,0.69' }), s('polygon', { points: '0.31,0 0.69,0 1,0.31 1,0.69' }));
    } else if (type === 'B') {
      svg.append(s('rect', { x: 0, y: 0.29, width: 1, height: 0.42 }), s('rect', { x: 0.29, y: 0, width: 0.42, height: 1 }));
    } else if (type === 'C') {
      svg.append(s('path', { d: 'M0.62 1 A0.62 0.62 0 0 0 0 0.38', fill: 'none', stroke: '#000', 'stroke-width': 0.38 }),
        s('polygon', { points: '0.31,0 0.69,0 1,0.31 1,0.69' }));
    }
    return svg;
  }
  const TILE_NAME = { A: 'ការ៉ូ A', B: 'ការ៉ូ B', C: 'ការ៉ូ C' };
  function tileSwatch(type) {
    return h('figure', { class: 'swatch' }, h('div', { class: 'tcell big' }, tileSvg(type)), h('figcaption', {}, TILE_NAME[type]));
  }
  const swatches = (...types) => h('div', { class: 'swatches' }, ...types.map(tileSwatch));

  // rows: strings listed TOP row first, as in the book; 'O' = empty cell.
  // opts.frame = { c0, c1, r0, r1 } (1-based, rows from the bottom) draws the
  // red square; opts.labels adds row/column numbers; opts.cell(r, c, ch) may
  // return a custom cell node.
  function tileGrid(rows, opts) {
    opts = opts || {};
    const nR = rows.length;
    const nC = rows[0].length;
    const wrap = h('div', { class: 'tgrid-wrap' + (opts.labels ? ' labelled' : '') });
    const grid = h('div', { class: 'tgrid' + (opts.small ? ' small' : '') });
    grid.style.gridTemplateColumns = `repeat(${nC}, var(--cell))`;
    rows.forEach((line, ti) => {
      const r = nR - ti; // row number from the bottom
      line.split('').forEach((ch, ci) => {
        const c = ci + 1;
        const cell = opts.cell ? opts.cell(r, c, ch) : h('div', { class: 'tcell' }, ch === 'O' ? null : tileSvg(ch));
        // explicit placement, so the red frame can overlap the cells
        cell.style.gridRow = String(ti + 1);
        cell.style.gridColumn = String(c);
        grid.append(cell);
      });
    });
    if (opts.frame) {
      const f = opts.frame;
      const fr = h('div', { class: 'red-frame' });
      fr.style.gridColumn = `${f.c0} / ${f.c1 + 1}`;
      fr.style.gridRow = `${nR - f.r1 + 1} / ${nR - f.r0 + 2}`;
      grid.append(fr);
    }
    if (opts.labels) {
      const rl = h('div', { class: 'row-labels' });
      for (let r = nR; r >= 1; r--) rl.append(h('span', {}, r));
      const cl = h('div', { class: 'col-labels' });
      cl.style.gridTemplateColumns = `repeat(${nC}, var(--cell))`;
      for (let c = 1; c <= nC; c++) cl.append(h('span', {}, c));
      wrap.append(rl, grid, h('div'), cl);
    } else wrap.append(grid);
    return wrap;
  }

  // ----------------------------------------------------- Q1 drag & drop ---
  const Q1_START = ['OOOOOO', 'ABAOOO', 'BABAOO', 'ABABAO'];
  const Q1_EMPTY = [];
  Q1_START.forEach((line, ti) => line.split('').forEach((ch, ci) => {
    if (ch === 'O') Q1_EMPTY.push((4 - ti) + '-' + (ci + 1));
  }));
  const q1Key = (k) => { const [r, c] = k.split('-').map(Number); return (r + c) % 2 === 0 ? 'A' : 'B'; };

  function q1Board(ctx) {
    const holder = h('div', { class: 'stack' });
    function draw() {
      holder.innerHTML = '';
      const palette = h('div', { class: 'palette' });
      ['A', 'B'].forEach((t) => {
        const src = h('div', { class: 'tcell big src', title: 'អូស ' + TILE_NAME[t] }, tileSvg(t));
        W.dragSource(src, t, () => h('div', { class: 'tcell big' }, tileSvg(t)));
        palette.append(h('figure', { class: 'swatch' }, src, h('figcaption', {}, TILE_NAME[t])));
      });
      holder.append(palette);
      holder.append(tileGrid(Q1_START, {
        labels: true,
        cell: (r, c, ch) => {
          if (ch !== 'O') return h('div', { class: 'tcell given' }, tileSvg(ch));
          const k = r + '-' + c;
          const v = ctx.val('u4q1', k);
          const cell = h('div', { class: 'tcell drop' + (v ? ' filled' : ''), title: 'ជួរដេក ' + r + ' ជួរឈរ ' + c, 'aria-label': 'ក្រឡាទំនេរ ជួរដេក ' + r + ' ជួរឈរ ' + c }, v ? tileSvg(v) : null);
          W.dropTarget(cell, (t) => { ctx.setVal('u4q1', k, t); draw(); }, v ? () => { ctx.setVal('u4q1', k, null); draw(); } : null);
          return cell;
        },
      }));
      holder.append(h('p', { class: 'hint' }, 'អាចចុចជ្រើសការ៉ូ រួចចុចលើក្រឡាទំនេរ ជំនួសការអូសក៏បាន។ ដើម្បីដកការ៉ូចេញ ចុចលើក្រឡានោះ ពេលមិនមានការ៉ូណាត្រូវបានជ្រើស។'));
    }
    draw();
    return holder;
  }

  // -------------------------------------------------- Q2 pseudo-code ---
  const LABELS = [
    { v: 'IF', kind: 'blue' }, { v: 'THEN', kind: 'blue' }, { v: 'ELSE', kind: 'blue' },
    { v: 'TILE A', kind: 'red' }, { v: 'TILE B', kind: 'red' },
  ];
  const KIND = { IF: 'blue', THEN: 'blue', ELSE: 'blue', 'TILE A': 'red', 'TILE B': 'red' };
  const chip = (v, extra) => h('span', { class: 'chip chip-' + KIND[v] + (extra ? ' ' + extra : '') }, v);

  function q2Code(ctx) {
    const holder = h('div', { class: 'stack' });
    function slot(k, kind) {
      const v = ctx.val('u4q2', k);
      const el = h('span', { class: 'slot slot-' + kind + (v ? ' filled' : ''), 'aria-label': 'ប្រឡោះទទេ' }, v ? chip(v) : ' ');
      W.dropTarget(el, (p) => { ctx.setVal('u4q2', k, p); draw(); }, v ? () => { ctx.setVal('u4q2', k, null); draw(); } : null);
      return el;
    }
    const fixed = (v) => chip(v, 'fixed');
    function draw() {
      holder.innerHTML = '';
      const pal = h('div', { class: 'palette chips' });
      LABELS.forEach((l) => {
        const c = chip(l.v, 'src');
        W.dragSource(c, l.v, () => chip(l.v));
        pal.append(c);
      });
      holder.append(pal);
      const code = h('div', { class: 'code' },
        h('div', { class: 'code-h' }, 'សេចក្តីណែនាំការក្រាលការ៉ូ (TILING INSTRUCTIONS)'),
        h('div', { class: 'cl' }, 'សម្រាប់ ជួរដេក = 1 ដល់ 4'),
        h('div', { class: 'cl i1 cmt' }, '«ជាដំបូង កំណត់ការ៉ូនៅខាងឆ្វេងបង្អស់នៃជួរដេក»'),
        h('div', { class: 'cl i2' }, fixed('IF'), ' ជួរដេក ជាជួរដេកលេខសេស'),
        h('div', { class: 'cl i3' }, fixed('THEN'), ' ការ៉ូដំបូងគេ គឺ ', slot('s1', 'red')),
        h('div', { class: 'cl i3' }, fixed('ELSE'), ' ការ៉ូដំបូងគេ គឺ ', slot('s2', 'red')),
        h('div', { class: 'cl i1 cmt' }, '«បំពេញជួរដេកដោយការបន្ថែមការ៉ូ»'),
        h('div', { class: 'cl i2' }, fixed('IF'), ' ការ៉ូមុន គឺ ', slot('s3', 'red')),
        h('div', { class: 'cl i3' }, slot('s4', 'blue'), ' ប្រើ ', slot('s5', 'red')),
        h('div', { class: 'cl i3' }, slot('s6', 'blue'), ' ប្រើ ', slot('s7', 'red')),
        h('div', { class: 'cl' }, 'ជួរដេកបន្ទាប់ (Next row)'));
      holder.append(code);
      holder.append(h('p', { class: 'hint' }, 'អាចចុចជ្រើសស្លាក រួចចុចលើប្រឡោះ ជំនួសការអូសក៏បាន។ ដើម្បីដកស្លាកចេញ ចុចលើប្រឡោះនោះ ពេលមិនមានស្លាកណាត្រូវបានជ្រើស។'));
    }
    draw();
    return holder;
  }

  // --------------------------------------------- Q3 (m; n) diagram ---
  function mnDiagram() {
    const svg = s('svg', { viewBox: '0 0 170 120', class: 'mn', role: 'img', 'aria-label': 'ទីតាំង (m; n) គឺជួរឈរទី m និងជួរដេកទី n' });
    for (let i = 0; i <= 5; i++) svg.append(s('line', { x1: 24 + i * 26, x2: 24 + i * 26, y1: 8, y2: 96, class: 'mg' }));
    for (let j = 0; j <= 4; j++) svg.append(s('line', { x1: 24, x2: 154, y1: 8 + j * 22, y2: 8 + j * 22, class: 'mg' }));
    svg.append(s('rect', { x: 128, y: 8, width: 26, height: 22, class: 'mcell' }));
    svg.append(s('text', { x: 12, y: 24, 'text-anchor': 'middle', class: 'mlab', text: 'n' }));
    svg.append(s('text', { x: 141, y: 114, 'text-anchor': 'middle', class: 'mlab', text: 'm' }));
    return svg;
  }

  // ------------------------------------------------ Q4 letter grid ---
  const Q4_CELLS = ['4-4', '4-5', '4-6', '3-4', '3-5', '3-6', '2-5', '2-6'];
  const q4Key = (k) => { const [r, c] = k.split('-').map(Number); return ((c - r) % 3 + 3) % 3 === 0 ? 'B' : 'C'; };
  function toLetter(v) {
    const t = String(v).replace(/ប/g, 'B').replace(/ច/g, 'C').toUpperCase().replace(/[^A-Z]/g, '');
    return t.slice(-1);
  }
  function q4Grid(ctx) {
    const grid = h('div', { class: 'lgrid' });
    const inputs = [];
    for (let r = 4; r >= 1; r--) {
      for (let c = 1; c <= 6; c++) {
        const k = r + '-' + c;
        const inFrame = c >= 4 && r >= 2;
        const cell = h('div', { class: 'lcell' + (inFrame ? ' in' : '') });
        cell.style.gridRow = String(5 - r);
        cell.style.gridColumn = String(c);
        if (k === '2-4') cell.append(h('span', { class: 'given' }, 'C'));
        else if (inFrame) {
          const inp = W.input(ctx, 'u4q4', k, '', {
            maxlength: 2, cls: 'letter', label: 'ជួរដេក ' + r + ' ជួរឈរ ' + c,
            transform: toLetter,
            onInput: (el) => { if (el.value) { const i = inputs.indexOf(el); if (inputs[i + 1]) inputs[i + 1].focus(); } },
          });
          inputs.push(inp);
          cell.append(inp);
        }
        grid.append(cell);
      }
    }
    const fr = h('div', { class: 'red-frame' });
    fr.style.gridColumn = '4 / 7';
    fr.style.gridRow = '1 / 4';
    grid.append(fr);
    return grid;
  }

  // ------------------------------------------------ Q5 mini blocks ---
  function mini(rows) {
    const g = h('div', { class: 'mini' });
    rows.forEach((r) => r.split('').forEach((ch) => g.append(h('span', {}, ch))));
    return g;
  }
  const Q5_BLOCKS = [['ABC', 'BAC', 'BCA'], ['BCA', 'CAB', 'ACB'], ['ABC', 'BCA', 'BAC'], ['ABC', 'BCA', 'CAB']];
  const RULES = [
    'បើ <i>m</i> + <i>n</i> ជាចំនួនគត់សេស ប្រើការ៉ូ A<br>បើមិនដូច្នោះទេ ប្រើ B',
    'បើ <i>m</i> + <i>n</i> ជាចំនួនគត់គូ ប្រើការ៉ូ A<br>បើមិនដូច្នោះទេ ប្រើ B',
    'បើ <i>m</i> × <i>n</i> ជាចំនួនគត់សេស ប្រើការ៉ូ A<br>បើមិនដូច្នោះទេ ប្រើ B',
    'បើ <i>m</i> × <i>n</i> ជាចំនួនគត់គូ ប្រើការ៉ូ A<br>បើមិនដូច្នោះទេ ប្រើ B',
    'បើ <i>m</i> សេស ហើយ <i>n</i> សេស ប្រើការ៉ូ A<br>បើមិនដូច្នោះទេ ប្រើ B',
    'បើ <i>m</i> និង <i>n</i> សុទ្ធតែសេស ឬសុទ្ធតែគូ ប្រើ A<br>បើមិនដូច្នោះ ប្រើ B',
  ];
  const checked = (r, keys) => keys.filter((k) => r[k]);
  const anyChecked = (keys) => (r) => keys.some((k) => r[k]);

  const TITLE = 'ការក្រាលការ៉ូ';
  const Q1_GRID_INTRO = ['OOOOOO', 'ABAOOO', 'BABAOO', 'ABABAO'];
  const Q4_PATTERN = ['BCCOOO', 'CCBCOO', 'CBCCBO', 'BCCBCC'];
  const Q5_PATTERN = ['BCABCA', 'CABCAB', 'ABCABC', 'BCABCA', 'CABCAB', 'ABCABC'];

  PISA.registerUnit({
    id: 'u4',
    no: 4,
    title: TITLE,
    en: 'Tiling',
    blurb: 'អូសទម្លាក់ការ៉ូ បំពេញកូដ IF/THEN/ELSE និងរកវិធានពិជគណិតនៃលំនាំ។',
    questions: {
      u4q1: {
        label: 'សំណួរ ១', format: 'សំណួរសរសេរចម្លើយខ្លី (អូសទម្លាក់)', max: 1,
        answered: (r) => Q1_EMPTY.every((k) => r[k]),
        summary: (r) => [1, 2, 3, 4].map((row) => 'ជួរដេក ' + PISA.km(row) + '៖ ' + [1, 2, 3, 4, 5, 6].map((c) => {
          const k = row + '-' + c;
          return Q1_EMPTY.includes(k) ? (r[k] || '_') : '·';
        }).join('')).join(' | '),
        score: (r) => ({ pts: Q1_EMPTY.every((k) => r[k] === q1Key(k)) ? 1 : 0, note: PISA.km(Q1_EMPTY.filter((k) => r[k] === q1Key(k)).length) + ' / ១២ ក្រឡាត្រឹមត្រូវ' }),
        key: 'ជួរដេកទី ១ (ក្រោមបង្អស់)៖ A, B, A, B, A, <b>B</b><br>ជួរដេកទី ២៖ B, A, B, A, <b>B, A</b><br>ជួរដេកទី ៣៖ A, B, A, <b>B, A, B</b><br>ជួរដេកទី ៤ (លើបង្អស់)៖ <b>B, A, B, A, B, A</b>។<br>សិស្សត្រូវសម្គាល់ថា ការ៉ូ A និង B ត្រូវរៀបឆ្លាស់គ្នាជានិច្ចទាំងតាមជួរដេក និងតាមជួរឈរ។',
      },
      u4q2: {
        label: 'សំណួរ ២', format: 'សំណួរសរសេរចម្លើយខ្លី (អូសទម្លាក់ក្នុងកូដ)', max: 1,
        parts: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map((k) => ({ k })),
        summary: (r) => ['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map((k, i) => PISA.km(i + 1) + '៖ ' + (r[k] || '—')).join(' | '),
        score: (r) => {
          const fixedOk = r.s1 === 'TILE A' && r.s2 === 'TILE B' && r.s4 === 'THEN' && r.s6 === 'ELSE';
          const branchA = r.s3 === 'TILE A' && r.s5 === 'TILE B' && r.s7 === 'TILE A';
          const branchB = r.s3 === 'TILE B' && r.s5 === 'TILE A' && r.s7 === 'TILE B';
          return { pts: fixedOk && (branchA || branchB) ? 1 : 0 };
        },
        key: 'ប្រឡោះទី ១ (THEN)៖ <b>TILE A</b><br>ប្រឡោះទី ២ (ELSE)៖ <b>TILE B</b><br>ប្រឡោះទី ៣ (IF)៖ <b>TILE A</b><br>ប្រឡោះទី ៤ និង ៥៖ <b>THEN</b> ប្រើ <b>TILE B</b> — ប្រឡោះទី ៦ និង ៧៖ <b>ELSE</b> ប្រើ <b>TILE A</b>។<br>ហេតុផល៖ ជួរដេកលេខសេស (ជួរ ១ និង ៣) ចាប់ផ្តើមដោយការ៉ូ A ជានិច្ច រីឯជួរដេកលេខគូ (ជួរ ២ និង ៤) ចាប់ផ្តើមដោយការ៉ូ B។ បន្ទាប់មក គ្រប់ពេលដែលការ៉ូមុនជា A នោះការ៉ូបន្តបន្ទាប់ត្រូវតែជា B (THEN TILE B) បើមិនដូច្នោះទេ ត្រូវតែជា A (ELSE TILE A)។' +
          '<p class="knote">កំណត់សម្គាល់របស់កម្មវិធី៖ ចម្លើយសមមូល «IF ការ៉ូមុន គឺ TILE B / THEN ប្រើ TILE A / ELSE ប្រើ TILE B» ក៏ផ្ដល់លំនាំដដែល ហើយកម្មវិធីទទួលយកជាចម្លើយត្រឹមត្រូវដែរ។</p>',
      },
      u4q3: {
        label: 'សំណួរ ៣', format: 'សំណួរចម្លើយឆ្លាស់ (ជ្រើសរើសទាំងអស់ដែលត្រូវ)', max: 1,
        answered: anyChecked(['r1', 'r2', 'r3', 'r4', 'r5', 'r6']),
        summary: (r) => { const c = checked(r, ['r1', 'r2', 'r3', 'r4', 'r5', 'r6']); return c.length ? 'វិធានទី ' + c.map((k) => PISA.km(k.slice(1))).join(', ') : '—'; },
        score: (r) => {
          const c = checked(r, ['r1', 'r2', 'r3', 'r4', 'r5', 'r6']);
          return { pts: c.length === 2 && r.r2 && r.r6 ? 1 : 0 };
        },
        key: '<b>ជ្រើសរើស វិធានទី ២ និងវិធានទី ៦</b>៖<br>• <b>វិធានទី ២៖</b> «បើ m + n ជាលេខគូ ប្រើការ៉ូ A បើមិនដូច្នោះទេ ប្រើការ៉ូ B» (ត្រឹមត្រូវ ព្រោះនៅ (1; 1) ⇒ 1 + 1 = 2 គូ → A; នៅ (2; 2) ⇒ 2 + 2 = 4 គូ → A; នៅ (1; 2) ⇒ 1 + 2 = 3 សេស → B; នៅ (2; 1) ⇒ 2 + 1 = 3 សេស → B)។<br>• <b>វិធានទី ៦៖</b> «បើ m និង n សុទ្ធតែជាលេខសេស ឬសុទ្ធតែជាលេខគូ ប្រើការ៉ូ A បើមិនដូច្នោះទេ ប្រើការ៉ូ B» (ត្រឹមត្រូវ ព្រោះផលបូកចំនួនពីរជាលេខគូ លុះត្រាតែចំនួនទាំងពីរមានភាវៈគូ-សេសដូចគ្នា)។ វិធានដទៃទៀតសុទ្ធតែមិនពិតគ្រប់ករណី។',
      },
      u4q4: {
        label: 'សំណួរ ៤', format: 'សំណួរសរសេរចម្លើយខ្លី', max: 1,
        parts: Q4_CELLS.map((k) => ({ k })),
        summary: (r) => 'ជួរលើ៖ ' + ['4-4', '4-5', '4-6'].map((k) => r[k] || '_').join(' ') +
          ' | ជួរកណ្ដាល៖ ' + ['3-4', '3-5', '3-6'].map((k) => r[k] || '_').join(' ') +
          ' | ជួរក្រោម៖ C ' + ['2-5', '2-6'].map((k) => r[k] || '_').join(' '),
        score: (r) => ({ pts: Q4_CELLS.every((k) => r[k] === q4Key(k)) ? 1 : 0, note: PISA.km(Q4_CELLS.filter((k) => r[k] === q4Key(k)).length) + ' / ៨ ក្រឡាត្រឹមត្រូវ' }),
        key: 'អក្សរដែលត្រូវបំពេញក្នុងស៊ុមក្រហម 3 × 3 (ពីលើចុះក្រោម)៖<br>ជួរលើ (ជួរដេក ៤)៖ <b>B C C</b><br>ជួរកណ្តាល (ជួរដេក ៣)៖ <b>C C B</b><br>ជួរក្រោម (ជួរដេក ២)៖ [C] <b>B C</b> (ដែល C នៅជ្រុងក្រោមឆ្វេងត្រូវបានផ្តល់ឱ្យស្រាប់)។<br><b>ការពន្យល់៖</b> លំនាំនេះមានខួប ៣ ទាំងតាមជួរដេក និងជួរឈរ។ ជួរដេកទី ១ មានលំនាំ B, C, C, B, C, C។ ជួរដេកទី ២ រំកិល ១ ជំហាន បាន C, B, C, C, B, C។ ជួរដេកទី ៣ រំកិលបន្ត បាន C, C, B, C, C, B។ ជួរដេកទី ៤ វិលត្រឡប់មកដូចជួរទី ១ គឺ B, C, C, B, C, C។',
      },
      u4q5: {
        label: 'សំណួរ ៥', format: 'សំណួរចម្លើយឆ្លាស់ (ជ្រើសរើសទាំងអស់ដែលត្រូវ)', max: 1,
        answered: anyChecked(['b1', 'b2', 'b3', 'b4']),
        summary: (r) => { const c = checked(r, ['b1', 'b2', 'b3', 'b4']); return c.length ? 'ជម្រើសទី ' + c.map((k) => PISA.km(k.slice(1))).join(', ') : '—'; },
        score: (r) => ({ pts: r.b4 && !r.b1 && !r.b2 && !r.b3 ? 1 : 0 }),
        key: '<b>ជម្រើសទី ៤ ប៉ុណ្ណោះដែលត្រឹមត្រូវ</b> (A B C / B C A / C A B)។<br><b>ការពន្យល់៖</b> ក្នុងប្លុកនេះ ជួរដេកនីមួយៗគឺជាជួរដេកខាងលើវា ដែលរំកិលទៅឆ្វេងមួយជំហានតាមវដ្ត (A, B, C)។ ពេលយកប្លុកនេះទៅក្រាលផ្ទួនៗលើប្លង់ វាបង្កើតបានជាឆ្នូតអង្កត់ទ្រូងស្របគ្នានៃការ៉ូ A, B និង C ដែលរត់កាត់ប្លង់ទាំងមូលដោយមិនដាច់លំនាំឡើយ។<br><b>ជម្រើសដទៃទៀត៖</b> ជម្រើសទី ១ ខុសត្រង់ជួរកណ្ដាល (B, A, C ជំនួស B, C, A) ជម្រើសទី ២ ខុសត្រង់ជួរក្រោម (A, C, B ជំនួស A, B, C) និងជម្រើសទី ៣ ក៏ខុសត្រង់ជួរក្រោមដែរ (B, A, C ជំនួស C, A, B)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 41,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: () => W.stack(
          W.p('ជាងក្រាលការ៉ូម្នាក់ កំពុងក្រាលកម្រាលបន្ទប់។ គាត់មានការ៉ូពីរប្រភេទផ្សេងគ្នាដែលអាចប្រើប្រាស់បាន គឺការ៉ូ A និងការ៉ូ B។'),
          swatches('A', 'B'),
          W.p('ដោយប្រើតែការ៉ូ A គាត់បង្កើតបានលំនាំខាងឆ្វេងខាងក្រោម ហើយដោយប្រើតែការ៉ូ B គាត់បង្កើតបានលំនាំខាងស្តាំខាងក្រោម។'),
          h('div', { class: 'grid-pair' },
            tileGrid(['AAAA', 'AAAA', 'AAAA', 'AAAA'], { small: true }),
            tileGrid(['BBBB', 'BBBB', 'BBBB', 'BBBB'], { small: true }))),
      },
      {
        tag: 'សំណួរ ១ / ៥', split: 41, items: ['u4q1'],
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើល «ការក្រាលការ៉ូ» នៅខាងស្តាំ។<br>ប្រើការអូសទម្លាក់ (drag-and-drop) ដើម្បីបំពេញកិច្ចការ។'),
          W.p('លំនាំក្រាលការ៉ូនៅខាងស្តាំ ត្រូវបានបង្កើតឡើងដោយការផ្គុំផ្សំការ៉ូទាំងពីរប្រភេទ។ ជាងក្រាលការ៉ូបន្តក្រាលកម្រាលបន្ទប់ ដោយពង្រីកលំនាំតាមរបៀបដដែល។'),
          W.p('ចូរសិក្សាលំនាំនេះ។'),
          W.p('ប្រើកណ្ដុររបស់អ្នក ដើម្បីអូសទម្លាក់ការ៉ូទៅក្នុងទីតាំងត្រឹមត្រូវ និងបញ្ចប់ការក្រាលកម្រាលបន្ទប់ដែលនៅសល់ ដោយប្រើលំនាំដដែលនេះ។', 'q')),
        right: (ctx) => q1Board(ctx),
      },
      {
        tag: 'សំណួរ ២ / ៥', split: 46, items: ['u4q2'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើល «ការក្រាលការ៉ូ» នៅខាងស្ដាំ។'),
          W.p('ជាងក្រាលការ៉ូចង់បង្កើតសេចក្តីណែនាំមួយ ដែលអ្នកដទៃអាចប្រើ ដើម្បីបង្កើតលំនាំដូចគ្នា។ ចូរអូសទម្លាក់ធាតុខាងក្រោមទៅក្នុងប្រឡោះទទេ។', 'q'),
          q2Code(ctx)),
        right: () => W.stack(swatches('A', 'B'), tileGrid(Q1_GRID_INTRO, { labels: true })),
      },
      {
        tag: 'សំណួរ ៣ / ៥', split: 44, items: ['u4q3'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើល «ការក្រាលការ៉ូ» នៅខាងស្តាំ។ ចុចលើជម្រើសដើម្បីឆ្លើយសំណួរ។'),
          W.p('ជាងក្រាលការ៉ូចង់ទស្សន៍ទាយការ៉ូដែលត្រូវដាក់នៅទីតាំងណាមួយ ឧទាហរណ៍ទីតាំង (<i>m</i>; <i>n</i>)។'),
          W.p('សូមសិក្សាការ៉ូទាំងបួនក្នុងស៊ុមក្រហម រួចជ្រើសរើស<b>វិធានទាំងអស់</b> ដែលទស្សន៍ទាយបានត្រឹមត្រូវសម្រាប់គ្រប់ទីតាំង (<i>m</i>; <i>n</i>)។', 'q'),
          W.checkTable(ctx, 'u4q3', { head: 'វិធាន (Rule)', rows: RULES.map((html, i) => ({ k: 'r' + (i + 1), html, label: 'វិធានទី ' + (i + 1) })) })),
        right: () => W.stack(
          swatches('A', 'B'),
          h('div', { class: 'grid-pair' },
            tileGrid(Q1_GRID_INTRO, { labels: true, frame: { c0: 1, c1: 2, r0: 1, r1: 2 } }),
            mnDiagram())),
      },
      {
        tag: 'ការពិភាក្សា', split: 41,
        left: () => W.stack(
          W.instr('សូមអានសេចក្តីណែនាំ'),
          W.p('របៀបមួយទៀតក្នុងការពណ៌នាលំនាំ គឺគ្រាន់តែសរសេរតួអក្សរនៃការ៉ូនីមួយៗទៅក្នុងទីតាំងក្រឡាដែលត្រូវគ្នា។'),
          W.p('ចូរសិក្សាការប្រើប្រាស់តួអក្សរដើម្បីកត់ត្រាលំនាំក្រាលការ៉ូ។ បន្ទាប់មក ចុចលើសញ្ញាព្រួញ «បន្ទាប់»។')),
        right: () => W.stack(
          swatches('A', 'B'),
          tileGrid(Q1_GRID_INTRO, { small: true }),
          tileGrid(Q1_GRID_INTRO, { small: true, cell: (r, c, ch) => h('div', { class: 'tcell letter' }, ch === 'O' ? '' : ch) })),
      },
      {
        tag: 'សំណួរ ៤ / ៥', split: 44, items: ['u4q4'],
        left: (ctx) => W.stack(
          W.p('លំនាំក្រាលការ៉ូនៅខាងស្តាំ ត្រូវបានបង្កើតឡើងដោយការផ្គុំផ្សំការ៉ូពីរប្រភេទ គឺ B និង C។ អាមៀ (Ameer) បន្តក្រាលកម្រាលបន្ទប់ ដោយពង្រីកលំនាំតាមរបៀបដដែល។'),
          W.p('ចូរសិក្សាលំនាំនេះ។'),
          W.p('ការ៉េពណ៌ក្រហមនៅលើក្រឡាចត្រង្គខាងក្រោម ត្រូវគ្នានឹងការ៉េពណ៌ក្រហមនៅលើក្រឡាចត្រង្គខាងស្តាំ។ ចូរប្រើតួអក្សរ B និង C ដើម្បីកត់ត្រាការ៉ូដែលត្រូវដាក់នៅទីតាំងនីមួយៗនៃការ៉េពណ៌ក្រហម។', 'q'),
          q4Grid(ctx)),
        right: () => W.stack(
          swatches('B', 'C'),
          tileGrid(Q4_PATTERN, { frame: { c0: 4, c1: 6, r0: 2, r1: 4 } })),
      },
      {
        tag: 'សំណួរ ៥ / ៥', split: 44, items: ['u4q5'],
        left: (ctx) => W.stack(
          W.p('លំនាំនៅខាងស្តាំ ជាផ្នែកមួយពីផ្ទៃធំជាងនេះ ដែលបង្កើតឡើងដោយការ៉ូបីប្រភេទ គឺ A, B និង C។'),
          W.p('ចូរសិក្សាលំនាំនេះ។'),
          W.p('តើកូដណាខ្លះខាងក្រោម ពណ៌នាឯកតា 3 × 3 ដែលធ្វើដដែលៗ (repeat) រួចបង្កើតបានលំនាំនេះ? (<b>ជ្រើសរើសទាំងអស់ដែលត្រូវ</b>)', 'q'),
          W.checkTable(ctx, 'u4q5', {
            head: 'ឯកតា 3 × 3 សម្រាប់បង្កើតលំនាំ',
            cls: 'blocks',
            rows: Q5_BLOCKS.map((b, i) => ({ k: 'b' + (i + 1), node: mini(b), label: 'ជម្រើសទី ' + (i + 1) })),
          })),
        right: () => W.stack(swatches('A', 'B', 'C'), tileGrid(Q5_PATTERN)),
      },
    ],
  });
})();
