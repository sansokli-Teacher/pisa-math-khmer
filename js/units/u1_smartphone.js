/* Unit 1 — ការប្រើប្រាស់ស្មាតហ្វូន (Smartphone Use)
 * Source: teacher guide chapter 8, screens 1–5 (oecd_ex1_*.tikz) and keys.
 * The book's screens 4 and 5 are one question with two tabs; here they are
 * one screen with the tabs working.
 */
(function () {
  'use strict';
  const { h, s, W } = PISA;

  // Country data as printed in the book. The hidden English name is the sort
  // key for column A: the book's table is "sorted by country name" in that
  // order (Bangladesh, Indonesia, Japan, ...).
  const DATA = [
    { km: 'បង់ក្លាដេស', en: 'Bangladesh', pop: '166.735', usr: '8.921', pct: 5, wage: 0.35, a: 'west' },
    { km: 'ឥណ្ឌូនេស៊ី', en: 'Indonesia', pop: '266.357', usr: '67.57', pct: 25, wage: 1.8, a: 'east' },
    { km: 'ជប៉ុន', en: 'Japan', pop: '125.738', usr: '65.282', pct: 52, wage: 6.85, a: 'west' },
    { km: 'ម៉ាឡេស៊ី', en: 'Malaysia', pop: '31.571', usr: '20.98', pct: 38, wage: 2.4, a: 'west' },
    { km: 'ប៉ាគីស្ថាន', en: 'Pakistan', pop: '200.663', usr: '23.228', pct: 12, wage: 2.05, a: 'west' },
    { km: 'ហ្វីលីពីន', en: 'Philippines', pop: '105.341', usr: '28.627', pct: 27, wage: 1.45, a: 'north' },
    { km: 'ថៃ', en: 'Thailand', pop: '68.416', usr: '30.486', pct: 45, wage: 3.0, a: 'west' },
    { km: 'តួកគី', en: 'Turkey', pop: '81.086', usr: '44.771', pct: 55, wage: 6.6, a: 'east' },
    { km: 'វៀតណាម', en: 'Vietnam', pop: '96.357', usr: '29.043', pct: 30, wage: 1.95, a: 'south' },
  ];
  // Label placement on the wage graph differs from the population graph
  // (oecd_ex1_s5.tikz), so points do not collide.
  const WAGE_ANCHOR = { Turkey: 'south', Japan: 'west', Thailand: 'west', Malaysia: 'west', Vietnam: 'west', Philippines: 'east', Indonesia: 'north', Pakistan: 'west', Bangladesh: 'west' };

  // mode 0: columns A–C only; 1: column D headed but empty; 2: column D filled.
  function sheet(ctx, mode) {
    return W.sheet(ctx, 'u1-sort', {
      cols: [
        { letter: 'A', head: 'ប្រទេស' },
        { letter: 'B', head: 'ចំនួនប្រជាជន<br>(លាននាក់)', num: true },
        { letter: 'C', head: 'ចំនួនអ្នកប្រើ<br>ស្មាតហ្វូន<br>(លាននាក់)', num: true },
        { letter: 'D', head: mode > 0 ? 'ភាគរយអ្នកប្រើ<br>ស្មាតហ្វូន' : '', num: true },
      ],
      noSortCols: mode < 2 ? [3] : [],
      rows: DATA.map((d) => ({
        cells: [d.km, d.pop, d.usr, mode > 1 ? d.pct + '%' : ''],
        keys: [d.en, parseFloat(d.pop), parseFloat(d.usr), mode > 1 ? d.pct : null],
      })),
    });
  }

  function scatter(which) {
    const W_ = 560, H_ = 360, ml = 64, mr = 24, mt = 16, mb = 56;
    const pw = W_ - ml - mr, ph = H_ - mt - mb;
    const xMax = which === 'pop' ? 300 : 8;
    const xTicks = which === 'pop' ? [0, 50, 100, 150, 200, 250, 300] : [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const X = (v) => ml + (v / xMax) * pw;
    const Y = (v) => mt + ph - (v / 60) * ph;
    const svg = s('svg', { viewBox: `0 0 ${W_} ${H_}`, class: 'chart', role: 'img',
      'aria-label': 'ក្រាហ្វភាគរយអ្នកប្រើស្មាតហ្វូន ធៀបនឹង' + (which === 'pop' ? 'ចំនួនប្រជាជន' : 'ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង') });
    [0, 10, 20, 30, 40, 50, 60].forEach((v) => {
      svg.append(s('line', { x1: ml, x2: ml + pw, y1: Y(v), y2: Y(v), class: 'grid' }));
      svg.append(s('text', { x: ml - 8, y: Y(v) + 4, 'text-anchor': 'end', class: 'tick', text: v + '%' }));
    });
    xTicks.forEach((v) => {
      svg.append(s('line', { x1: X(v), x2: X(v), y1: mt + ph, y2: mt + ph + 5, class: 'axis' }));
      svg.append(s('text', { x: X(v), y: mt + ph + 20, 'text-anchor': 'middle', class: 'tick', text: v }));
    });
    svg.append(s('line', { x1: ml, x2: ml, y1: mt, y2: mt + ph, class: 'axis' }));
    svg.append(s('line', { x1: ml, x2: ml + pw, y1: mt + ph, y2: mt + ph, class: 'axis' }));
    svg.append(s('text', { x: ml + pw / 2, y: H_ - 10, 'text-anchor': 'middle', class: 'alabel',
      text: which === 'pop' ? 'ចំនួនប្រជាជន (លាននាក់)' : 'ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង (Zeds)' }));
    svg.append(s('text', { x: 16, y: mt + ph / 2, 'text-anchor': 'middle', class: 'alabel',
      transform: `rotate(-90 16 ${mt + ph / 2})`, text: 'ភាគរយអ្នកប្រើស្មាតហ្វូន' }));
    DATA.forEach((d) => {
      const xv = which === 'pop' ? parseFloat(d.pop) : d.wage;
      const cx = X(xv), cy = Y(d.pct);
      svg.append(s('circle', { cx, cy, r: 5, class: 'pt' }));
      const a = which === 'pop' ? d.a : WAGE_ANCHOR[d.en];
      const pos = {
        east: { x: cx - 9, y: cy + 4, ta: 'end' },
        west: { x: cx + 9, y: cy + 4, ta: 'start' },
        south: { x: cx, y: cy - 10, ta: 'middle' },
        north: { x: cx, y: cy + 19, ta: 'middle' },
      }[a];
      svg.append(s('text', { x: pos.x, y: pos.y, 'text-anchor': pos.ta, class: 'plabel', text: d.km }));
    });
    return svg;
  }

  const TITLE = 'ការប្រើប្រាស់ស្មាតហ្វូន';
  const T_F = [{ v: 'T', html: 'ពិត', label: 'ពិត' }, { v: 'F', html: 'មិនពិត', label: 'មិនពិត' }];
  const Q2_ROWS = [
    'ប្រទេសដែលមានចំនួនប្រជាជនច្រើនជាងគេ ក៏មានចំនួនអ្នកប្រើស្មាតហ្វូនច្រើនជាងគេដែរ។',
    'ប្រទេសដែលមានចំនួនអ្នកប្រើស្មាតហ្វូនតិចជាងគេ ក៏មានចំនួនប្រជាជនតិចជាងគេដែរ។',
    'ប្រទេសដែលមានភាគរយអ្នកប្រើស្មាតហ្វូនខ្ពស់ជាងគេ ក៏មានចំនួនប្រជាជនតិចជាងគេដែរ។',
    'ប្រទេសដែលមានភាគរយអ្នកប្រើស្មាតហ្វូនមធ្យម ក៏ជាប្រទេសដែលមានចំនួនអ្នកប្រើស្មាតហ្វូនមធ្យមដែរ។',
  ];
  const Q2_KEY = ['T', 'F', 'F', 'T'];
  const Q1_OPTS = [
    { v: 'BdivC', html: 'ចែកតម្លៃជួរ B នឹងតម្លៃជួរ C៖<span class="formula">B ÷ C</span>' },
    { v: 'BpCdivC', html: 'ចែកផលបូកនៃតម្លៃជួរ B និងជួរ C នឹងតម្លៃជួរ C៖<span class="formula">(B + C) ÷ C</span>' },
    { v: 'CdivB', html: 'ចែកតម្លៃជួរ C នឹងតម្លៃជួរ B៖<span class="formula">C ÷ B</span>' },
    { v: 'BdivBpC', html: 'ចែកតម្លៃជួរ B នឹងផលបូកនៃតម្លៃជួរ B និងជួរ C៖<span class="formula">B ÷ (B + C)</span>' },
  ];
  const Q1_TEXT = { BdivC: 'B ÷ C', BpCdivC: '(B + C) ÷ C', CdivB: 'C ÷ B', BdivBpC: 'B ÷ (B + C)' };
  const TF_TEXT = { T: 'ពិត', F: 'មិនពិត' };
  const tfSummary = (r, n) => Array.from({ length: n }, (_, i) => TF_TEXT[r[i]] || '—').join(' / ');

  PISA.registerUnit({
    id: 'u1',
    no: 1,
    title: TITLE,
    en: 'Smartphone Use',
    blurb: 'តារាងគណនាដែលតម្រៀបទិន្នន័យបាន និងក្រាហ្វដែលប្ដូរអថេរតាមផ្ទាំង។',
    questions: {
      u1q1: {
        label: 'សំណួរ ១', format: 'សំណួរពហុជ្រើសរើស', max: 1,
        parts: [{ k: 'choice' }],
        summary: (r) => Q1_TEXT[r.choice] || '—',
        score: (r) => ({ pts: r.choice === 'CdivB' ? 1 : 0 }),
        key: 'ជម្រើសទី ៣ គឺ <b>C ÷ B</b>។ ភាគរយអ្នកប្រើស្មាតហ្វូនបានមកពីចំនួនអ្នកប្រើ (ជួរ C) ចែកនឹងចំនួនប្រជាជន (ជួរ B) រួចគុណនឹង ១០០ ដើម្បីបង្ហាញជាភាគរយ។ ជម្រើសក្រៅពីនេះ គឺទទួលបាន<b>ពិន្ទុសូន្យ</b>។',
      },
      u1q2: {
        label: 'សំណួរ ២', format: 'សំណួរចម្លើយឆ្លាស់ (ពិត/មិនពិត)', max: 1,
        parts: [0, 1, 2, 3].map((i) => ({ k: String(i) })),
        summary: (r) => tfSummary(r, 4),
        score: (r) => ({ pts: Q2_KEY.every((v, i) => r[i] === v) ? 1 : 0 }),
        key: '<b>ពិត / មិនពិត / មិនពិត / ពិត</b>។ អំណះអំណាងទី ១ ពិត ព្រោះឥណ្ឌូនេស៊ីមានទាំងចំនួនប្រជាជនច្រើនជាងគេ (266.357) និងអ្នកប្រើច្រើនជាងគេ (67.57)។ អំណះអំណាងទី ២ មិនពិត ព្រោះបង់ក្លាដេសមានអ្នកប្រើតិចជាងគេ តែម៉ាឡេស៊ីទេដែលមានប្រជាជនតិចជាងគេ។ អំណះអំណាងទី ៣ មិនពិត ព្រោះតួកគីមានភាគរយខ្ពស់ជាងគេ (55%) តែប្រជាជនតិចជាងគេគឺម៉ាឡេស៊ី។ អំណះអំណាងទី ៤ ពិត ព្រោះវៀតណាមជាមធ្យមទាំងភាគរយ (30%) និងចំនួនអ្នកប្រើ (29.043)។',
      },
      u1q3: {
        label: 'សំណួរ ៣', format: 'សំណួរចម្លើយវែង (ជ្រើសរើស រួចពន្យល់)', max: 2,
        parts: [{ k: 'choice' }, { k: 'why' }],
        summary: (r) => ({ pop: 'ចំនួនប្រជាជន', wage: 'ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង' }[r.choice] || '—') + ' | ហេតុផល៖ ' + (r.why || '—'),
        score: (r) => (r.choice === 'wage'
          ? { pts: null, note: 'ជម្រើសត្រឹមត្រូវ — គ្រូត្រូវអានការពន្យល់' }
          : { pts: 0, note: r.choice ? 'ជម្រើសមិនត្រឹមត្រូវ' : 'មិនបានជ្រើសរើស' }),
        key: '<b>ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង</b>។ ក្រាហ្វនេះបង្ហាញនិន្នាការកើនឡើងច្បាស់លាស់ ផ្ទុយពីផ្ទាំងមុន។ <b>ពិន្ទុពេញ</b> លុះត្រាតែរើសត្រូវ ហើយសំអាងលើក្រាហ្វទាំងពីរ រីឯការរើសត្រូវដោយពន្យល់ក្រៅទិន្នន័យក្រាហ្វ បានត្រឹម<b>ពិន្ទុមិនពេញលេញ</b>។<br>ផ្ទាំង «ចំនួនប្រជាជន» ជាភស្តុតាង<b>អវិជ្ជមាន</b>៖ ចំណុចលើក្រាហ្វរាយប៉ាយគ្មានលំនាំ ដូច្នេះចំនួនប្រជាជនពុំមែនជាអថេរដែលពន្យល់ការកើនឡើងឡើយ។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 40,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: (ctx) => W.stack(
          W.p('តារាងគណនាបង្ហាញចំនួនប្រជាជន (គិតជាលាននាក់) និងចំនួនអ្នកប្រើប្រាស់ស្មាតហ្វូន (គិតជាលាននាក់) សម្រាប់ប្រទេសមួយចំនួន ក្នុងទ្វីបអាស៊ី។ ទិន្នន័យត្រូវបានតម្រៀបតាមឈ្មោះប្រទេស។'),
          sheet(ctx, 0)),
      },
      {
        tag: 'សំណួរ ១ / ៣', split: 40, items: ['u1q1'],
        left: (ctx) => W.stack(
          W.instr('សូមមើលតារាង «ការប្រើប្រាស់ស្មាតហ្វូន» នៅខាងស្ដាំ។ សូមចុចលើជម្រើសមួយ ដើម្បីឆ្លើយសំណួរ។'),
          W.p('តើប្រមាណវិធីណាលើជួរ B និង C ដែលនឹងកំណត់តម្លៃត្រឹមត្រូវក្នុងជួរ D?', 'q'),
          W.p('<u>សម្រាប់ប្រទេសនីមួយៗ៖</u>'),
          W.radios(ctx, 'u1q1', 'choice', Q1_OPTS)),
        right: (ctx) => W.stack(
          W.p('តារាងគណនាខាងក្រោមបង្ហាញចំនួនប្រជាជន (គិតជាលាននាក់) និងចំនួនអ្នកប្រើប្រាស់ស្មាតហ្វូន (គិតជាលាននាក់) សម្រាប់ប្រទេសមួយចំនួន ក្នុងទ្វីបអាស៊ី។ ទិន្នន័យត្រូវបានតម្រៀបតាមឈ្មោះប្រទេស។'),
          sheet(ctx, 1)),
      },
      {
        tag: 'សំណួរ ២ / ៣', split: 40, items: ['u1q2'],
        left: (ctx) => W.stack(
          W.instr('អ្នកអាចតម្រៀបទិន្នន័យក្នុងតារាងគណនា ដោយចុចប៊ូតុងតម្រៀបនៅលើក្បាលជួរ។ ទិន្នន័យនឹងត្រូវតម្រៀបពីតូចទៅធំ។'),
          W.instr('សូមប្រើប៊ូតុងតម្រៀបជាជំនួយ ដើម្បីវិនិច្ឆ័យអំណះអំណាងនីមួយៗ។'),
          W.instr('សូមចុច «ពិត» ឬ «មិនពិត» សម្រាប់អំណះអំណាងនីមួយៗខាងក្រោម។'),
          W.choiceTable(ctx, 'u1q2', { cols: T_F, rows: Q2_ROWS })),
        right: (ctx) => W.stack(
          W.p('ទិន្នន័យសម្រាប់ភាគរយអ្នកប្រើប្រាស់ស្មាតហ្វូន ត្រូវបានបញ្ចូលទៅក្នុងតារាងគណនា នៅជួរ D។'),
          sheet(ctx, 2)),
      },
      {
        tag: 'សំណួរ ៣ / ៣', split: 38, items: ['u1q3'],
        left: (ctx) => W.stack(
          W.p('អ្នកអាចប្ដូរអថេរនៅលើអ័ក្សដេក រវាង <b>ចំនួនប្រជាជន (លាននាក់)</b> និង <b>ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង (ជាប្រាក់ Zeds)</b> សម្រាប់ប្រទេសនីមួយៗ ដោយចុចលើផ្ទាំងដែលត្រូវគ្នា។'),
          W.p('សូមចុចលើផ្ទាំងនីមួយៗ ដើម្បីសិក្សាក្រាហ្វទាំងពីរ រួចឆ្លើយសំណួរខាងក្រោម។'),
          W.p('ចំពោះអថេរណាមួយ (ចំនួនប្រជាជន ឬប្រាក់ឈ្នួលអប្បបរមា) ដែលភាគរយអ្នកប្រើស្មាតហ្វូនក្នុងប្រទេសមួយ <b>កើនឡើង</b> នៅពេលតម្លៃអថេរនោះកើនឡើង?', 'q'),
          W.radios(ctx, 'u1q3', 'choice', [
            { v: 'pop', html: 'ចំនួនប្រជាជន' },
            { v: 'wage', html: 'ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង' },
          ]),
          W.p('សូមពន្យល់ពីហេតុផលរបស់អ្នក៖'),
          W.textarea(ctx, 'u1q3', 'why', 'សូមវាយការពន្យល់នៅទីនេះ', 4)),
        right: (ctx) => W.stack(
          W.p('ក្រាហ្វបង្ហាញភាគរយអ្នកប្រើស្មាតហ្វូនរបស់ប្រទេសនីមួយៗ ធៀបនឹង <b>ចំនួនប្រជាជន (លាននាក់)</b> ឬ <b>ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយម៉ោង (ជាប្រាក់ Zeds)</b>។'),
          W.tabs(ctx, 'u1-graph', [
            { label: 'ចំនួនប្រជាជន', color: '#B04A4A', light: '#EBD2D2', render: () => scatter('pop') },
            { label: 'ប្រាក់ឈ្នួលក្នុងមួយម៉ោង', color: '#C07A3A', light: '#F2DEC8', render: () => scatter('wage') },
          ])),
      },
    ],
  });
})();
