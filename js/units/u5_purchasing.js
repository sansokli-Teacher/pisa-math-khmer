/* Unit 5 — ការសម្រេចចិត្តទិញ (Purchasing Decisions)
 * Source: teacher guide chapter 8, screens 1–6 (oecd_ex5_*.tikz) and keys.
 * The book's screens 3/4 and 5/6 are two questions shown with each of two
 * tabs; here each question is one screen with the tabs working.
 */
(function () {
  'use strict';
  const { h, s, W } = PISA;

  const STARS = [
    { label: 'ផ្កាយ ៥ (5 star)', n: 47, pct: '29%' },
    { label: 'ផ្កាយ ៤ (4 star)', n: 41, pct: '25%' },
    { label: 'ផ្កាយ ៣ (3 star)', n: 34, pct: '21%' },
    { label: 'ផ្កាយ ២ (2 star)', n: 28, pct: '17%' },
    { label: 'ផ្កាយ ១ (1 star)', n: 13, pct: '8%' },
  ];
  const REASONS = [
    ['កាសមកដល់យឺត', 13],
    ['កាសមិនបានមកដល់សោះ', 4],
    ['ខ្សែរងការខូចខាត ឬបាត់', 7],
    ['កាសម្ខាង ឬសងខាងបាក់ខូច', 4],
    ['ប្រអប់វេចខ្ចប់មិនទាក់ទាញ', 5],
    ['វាយតម្លៃច្រឡំ (មតិល្អ តែដាក់ពិន្ទុទាប)', 8],
  ];

  function star() {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 ? 19 : 40;
      pts.push((44 + r * Math.cos(a)).toFixed(1) + ',' + (46 + r * Math.sin(a)).toFixed(1));
    }
    return s('svg', { viewBox: '0 0 88 88', class: 'star', 'aria-hidden': 'true' },
      s('polygon', { points: pts.join(' ') }),
      s('text', { x: 44, y: 53, 'text-anchor': 'middle', text: '3.5' }));
  }
  function earbuds() {
    return s('svg', { viewBox: '0 0 120 90', class: 'earbuds', 'aria-hidden': 'true' },
      s('path', { d: 'M34 40 C 34 70, 60 62, 60 82 M86 40 C 86 70, 60 62, 60 82', class: 'cable' }),
      s('circle', { cx: 30, cy: 26, r: 14, class: 'bud' }), s('circle', { cx: 30, cy: 26, r: 6, class: 'mesh' }),
      s('rect', { x: 27, y: 36, width: 7, height: 10, rx: 3, class: 'bud' }),
      s('circle', { cx: 90, cy: 26, r: 14, class: 'bud' }), s('circle', { cx: 90, cy: 26, r: 6, class: 'mesh' }),
      s('rect', { x: 86, y: 36, width: 7, height: 10, rx: 3, class: 'bud' }),
      s('rect', { x: 55, y: 70, width: 10, height: 8, rx: 2, class: 'bud' }));
  }

  function card() {
    const bars = h('div', { class: 'pc-bars' });
    STARS.forEach((st) => {
      const fill = h('span', { class: 'pc-fill' });
      fill.style.width = ((st.n / 47) * 72).toFixed(1) + '%';
      bars.append(h('div', { class: 'pc-row' }, h('span', { class: 'pc-lbl' }, st.label), h('span', { class: 'pc-bar' }, fill), h('span', { class: 'pc-n' }, st.n + ' (' + st.pct + ')')));
    });
    return h('div', { class: 'pcard-wrap' },
      h('div', { class: 'pcard' },
        h('div', { class: 'pc-title' }, 'Stereo Headphone Earbuds and Microphone'),
        h('div', { class: 'pc-body' }, h('div', { class: 'pc-star' }, star(), h('div', { class: 'pc-avg', html: 'ពិន្ទុមធ្យម<br>ពី ១៦៣ មតិ' })), bars)),
      earbuds());
  }

  function summaryTable() {
    const t = h('table', { class: 'reasons' });
    t.append(h('thead', {}, h('tr', {}, h('th', {}, 'មូលហេតុនៃការវាយតម្លៃ'), h('th', {}, 'ចំនួន'))));
    const tb = h('tbody');
    REASONS.forEach(([lbl, n]) => tb.append(h('tr', {}, h('td', {}, lbl), h('td', { class: 'n' }, n))));
    t.append(tb);
    return h('div', { class: 'pcard-wrap' }, t, earbuds());
  }

  const tabs = (ctx) => W.tabs(ctx, 'u5-tab', [
    { label: 'Online reviews', color: '#A54137', light: '#EBD2C3', render: card },
    { label: 'Summary table', color: '#D7640C', light: '#F5D7B4', render: summaryTable },
  ]);

  const RED = 'អង់ដ្រេអាបានពិនិត្យមើលមតិយោបល់របស់អ្នកវាយតម្លៃទាំងអស់ ហើយកត់សម្គាល់ឃើញថា មានតែអ្នកវាយតម្លៃផ្កាយ ១ និង ២ ប៉ុណ្ណោះ ដែលបញ្ចេញមតិអំពីគុណភាពអន់ ឬអំពីផលិតផលមកដល់យឺត ឬមិនមកដល់សោះ។';
  const USE = 'ប្រើព័ត៌មានពីផ្ទាំង <b>Online reviews</b> និងផ្ទាំង <b>Summary table</b> ព្រមទាំងម៉ាស៊ីនគិតលេខដែលមានស្រាប់ ដើម្បីឆ្លើយសំណួរខាងក្រោម៖';
  // Question 2's screens (oecd_ex5_s5/s6) word the same two notes slightly
  // differently; each question keeps its own screen's wording.
  const RED2 = 'អង់ដ្រេអាបានពិនិត្យមើលគ្រប់មតិយោបល់ ហើយកត់សម្គាល់ឃើញថា មានតែអ្នកវាយតម្លៃផ្កាយ ១ និង ២ ប៉ុណ្ណោះ ដែលបញ្ចេញមតិអំពីគុណភាពអន់ ឬទំនិញមកដល់យឺត ឬមិនមកដល់សោះ។';
  const USE2 = 'ប្រើព័ត៌មានពីផ្ទាំង <b>Online reviews</b> និង <b>Summary table</b> ព្រមទាំងម៉ាស៊ីនគិតលេខ ដើម្បីឆ្លើយសំណួរខាងក្រោម៖';

  function qrTable(rows) {
    const t = h('table', { class: 'qr' });
    t.append(h('thead', {}, h('tr', {}, h('th', {}, 'សំណួរ (Question)'), h('th', {}, 'ចម្លើយ (Response)'))));
    const tb = h('tbody');
    rows.forEach(([q, input]) => tb.append(h('tr', {}, h('td', { class: 'qq', html: q }), h('td', { class: 'rr' }, input))));
    t.append(tb);
    return t;
  }

  // A typed answer as a percentage: 6.75, 6.75%, 0.0675 and 11/163 all read
  // as 6.75.
  function asPercent(str) {
    const p = PISA.parseAnswer(str);
    if (!p) return null;
    if (p.fraction) return p.value * 100;
    if (p.percent) return p.value;
    return p.value <= 1 ? p.value * 100 : p.value;
  }

  PISA.registerUnit({
    id: 'u5',
    no: 5,
    title: 'ការសម្រេចចិត្តទិញ',
    en: 'Purchasing Decisions',
    blurb: 'អានមតិវាយតម្លៃអនឡាញ រួចជ្រើសភាគបែងត្រឹមត្រូវ ដើម្បីគណនាភាគរយ។',
    questions: {
      u5q1: {
        label: 'សំណួរ ១', format: 'សំណួរសរសេរចម្លើយខ្លី', max: 2,
        parts: [{ k: 'a', label: 'គុណភាពអន់ (% នៃការវាយតម្លៃសរុប)' }, { k: 'b', label: 'មកដល់យឺត ឬមិនមកដល់ (% នៃផ្កាយ ១ និង ២)' }],
        score: (r) => {
          const a = asPercent(r.a);
          const b = asPercent(r.b);
          const okA = PISA.inRange(a, 6.7, 6.8);
          const okB = PISA.inRange(b, 41, 42);
          const swapped = PISA.inRange(a, 26.5, 27.1) && PISA.inRange(b, 10.3, 10.5);
          if (okA && okB) return { pts: 2 };
          if (okA || okB) return { pts: 1, note: 'ត្រូវតែមួយអនុសំណួរ' };
          if (swapped) return { pts: 1, note: 'ភាគយកត្រូវ តែភាគបែងច្រឡំគ្នា' };
          return { pts: 0 };
        },
        key: 'តារាងសង្ខេបផ្ដល់<b>ភាគយក</b> រីឯភាគបែងអានពីកាតនៅផ្ទាំង Online reviews។<br>' +
          '<b>អនុសំណួរទី ១ (គុណភាពអន់)៖</b> (7 + 4) ÷ 163 ≈ <b>6.75%</b> (ទទួលយក 6.7% ដល់ 6.8%)។ <i>កំហុសញឹកញាប់៖</i> ចែកនឹង 41 បាន 26.8%។<br>' +
          '<b>អនុសំណួរទី ២ (ដឹកជញ្ជូន)៖</b> (13 + 4) ÷ 41 ≈ <b>41.46%</b> (ទទួលយក 41% ដល់ 42%)។ <i>កំហុសញឹកញាប់៖</i> ចែកនឹង 163 បាន 10.4%។<br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b> ពេញបើត្រូវទាំងពីរ មិនពេញបើត្រូវតែមួយ ឬភាគយកត្រូវ តែភាគបែងច្រឡំគ្នា។',
      },
      u5q2: {
        label: 'សំណួរ ២', format: 'សំណួរសរសេរចម្លើយខ្លី', max: 1,
        parts: [{ k: 'a' }],
        summary: (r) => r.a || '—',
        score: (r) => {
          const p = PISA.parseAnswer(r.a);
          if (!p) return { pts: 0 };
          const v = p.fraction ? p.value : p.percent || p.value > 1 ? p.value / 100 : p.value;
          return { pts: PISA.inRange(v, 0.1, 0.105) ? 1 : 0 };
        },
        key: 'ប្រូបាប៊ីលីតេជួបបញ្ហាដឹកជញ្ជូនគឺ (13 + 4) ÷ 163 ≈ <b>10.43%</b>។<br><b>ចម្លើយដែលទទួលស្គាល់៖</b> ចន្លោះ 10% ដល់ 10.5% ប្រភាគ 17/163 ឬទសភាគ 0.10 ដល់ 0.104។<br><i>កំហុសញឹកញាប់៖</i> ចែកនឹង 41 បាន 41.5% ឬភ្លេចករណី «មិនមកដល់សោះ» ទាំង 4 បាន 13/163 ≈ 8%។<br>ភាគបែងគឺ N = 163 គឺអ្នកទិញ<b>ទាំងអស់</b> ព្រោះគ្រប់អ្នកទិញសុទ្ធតែឆ្លងកាត់ការដឹកជញ្ជូន មិនមែនត្រឹមក្រុមផ្កាយ ១ និង ២ (41 នាក់) ឡើយ។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 40,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT)។'),
        right: () => W.stack(
          W.p('អង់ដ្រេអា (Andrea) កំពុងស្វែងរកទិញកាសស្តាប់ត្រចៀកថ្មីមួយគូនៅលើប្រព័ន្ធអនឡាញ។ នាងបានរកឃើញកាសមួយគូដែលនាងពេញចិត្ត។ ប៉ុន្តែ នាងកត់សម្គាល់ឃើញថា ទោះបីជាចំនួនអ្នកវាយតម្លៃសរុបមានចំនួនតិចតួចក៏ដោយ ក៏ផលិតផលនេះទទួលបានការវាយតម្លៃអវិជ្ជមាន (ផ្កាយ ១ និងផ្កាយ ២) ជាច្រើន ពោលគឺសរុបរហូតដល់ ២៥% នៃការវាយតម្លៃទាំងអស់។'),
          card()),
      },
      {
        tag: 'សេចក្ដីណែនាំបន្ត', split: 40,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំបន្ថែម រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT)។'),
        right: () => W.stack(
          W.p('ដើម្បីជួយដល់ការសម្រេចចិត្តថាតើគួរទិញផលិតផលនេះឬអត់ អង់ដ្រេអាបានសិក្សាលើមតិយោបល់របស់អ្នកវាយតម្លៃផ្កាយ ១ និង ២ ហើយកត់សម្គាល់ឃើញថាមតិមួយចំនួន មិនទាក់ទងនឹងគុណភាព ឬមុខងាររបស់ផលិតផលនោះឡើយ។ នាងបានចាត់ក្រុមការឆ្លើយតប និងសង្ខេបការរកឃើញរបស់នាងក្នុងតារាងខាងក្រោម៖'),
          summaryTable()),
      },
      {
        tag: 'សំណួរ ១ / ២', split: 42, items: ['u5q1'],
        left: (ctx) => W.stack(
          W.p(RED, 'red-note'),
          W.p(USE, 'small'),
          qrTable([
            ['តើការវាយតម្លៃអំពី<b>គុណភាពអន់</b>នៃផលិតផល មានប៉ុន្មានភាគរយនៃ<b>ការវាយតម្លៃសរុប</b>?', W.input(ctx, 'u5q1', 'a', '', { label: 'ចម្លើយ អនុសំណួរទី ១' })],
            ['តើការវាយតម្លៃអំពីផលិតផល<b>មកដល់យឺត ឬមិនមកដល់សោះ</b> មានប៉ុន្មានភាគរយនៃ<b>ការវាយតម្លៃផ្កាយ ១ និង ២</b>?', W.input(ctx, 'u5q1', 'b', '', { label: 'ចម្លើយ អនុសំណួរទី ២' })],
          ])),
        right: tabs,
      },
      {
        tag: 'សំណួរ ២ / ២', split: 42, items: ['u5q2'],
        left: (ctx) => W.stack(
          W.p(RED2, 'red-note'),
          W.p(USE2, 'small'),
          qrTable([
            ['អង់ដ្រេអាបារម្ភអំពីកាសដែលមកដល់យឺត ឬមិនមកដល់សោះ។<br><br>ផ្អែកលើព័ត៌មានក្នុងផ្ទាំង <b>Online reviews</b> និង <b>Summary table</b> តើផលិតផលនេះទំនងជានឹង<b>មកដល់យឺត ឬមិនមកដល់សោះ</b>កម្រិតណា?<br><br><b>ចូរបញ្ជាក់ចម្លើយជាប្រភាគ ឬភាគរយ។</b>',
              W.input(ctx, 'u5q2', 'a', '', { label: 'ចម្លើយ' })],
          ])),
        right: tabs,
      },
    ],
  });
})();
