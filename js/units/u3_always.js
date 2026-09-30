/* Unit 3 — ជានិច្ច ជួនកាល មិនដែល (Always Sometimes Never)
 * Source: teacher guide chapter 8, screens 1–4 (oecd_ex3_*.tikz) and keys.
 * Questions 2 and 3 use one full-width panel, as on the OECD screens.
 */
(function () {
  'use strict';
  const { h, s, W } = PISA;

  const stimulus = () => h('div', { class: 'stack asn-stim', html:
    '<p>អំណះអំណាងដែលមនុស្សនិយាយ ជាទូទៅអាចចែកជាបីប្រភេទ៖</p>' +
    '<p>អំណះអំណាងដែលពិត <b>ជានិច្ច</b><br>អំណះអំណាងដែលពិត <b>ជួនកាល</b> និង<br>អំណះអំណាងដែល <b>មិនដែល</b> ពិត។</p>' +
    '<p class="lbl">អំណះអំណាង៖</p><p class="quote">«ចំនួនមួយដែលចែកដាច់នឹង ៤ ក៏ចែកដាច់នឹង ២ ដែរ»</p>' +
    '<p>ពិត <b>ជានិច្ច</b> ព្រោះ ២ ជាកត្តានៃ ៤។</p>' +
    '<p class="lbl">អំណះអំណាង៖</p><p class="quote">«ចំនួនមួយដែលចែកដាច់នឹង ៩ ក៏ចែកដាច់នឹង ៦ ដែរ»</p>' +
    '<p>ពិត <b>ជួនកាល</b>។ ឧទាហរណ៍ ៣៦ ចែកដាច់នឹង ៩ និង ៦<br>ប៉ុន្តែ ២៧ ចែកដាច់នឹង ៩ តែមិនចែកដាច់នឹង ៦ ទេ។</p>' +
    '<p class="lbl">អំណះអំណាង៖</p><p class="quote">«ផលបូកនៃពីរចំនួនសេស គឺជាចំនួនសេស»</p>' +
    '<p><b>មិនដែល</b> ពិតទេ ព្រោះផលបូកនៃពីរចំនួនសេស តែងតែជាចំនួនគូ។</p>' });

  const ASN = [
    { v: 'A', html: 'ពិត<br>ជានិច្ច', label: 'ពិតជានិច្ច' },
    { v: 'S', html: 'ពិត<br>ជួនកាល', label: 'ពិតជួនកាល' },
    { v: 'N', html: 'មិនដែល<br>ពិត', label: 'មិនដែលពិត' },
  ];
  const ASN_TEXT = { A: 'ជានិច្ច', S: 'ជួនកាល', N: 'មិនដែល' };
  const listOf = (r, n) => Array.from({ length: n }, (_, i) => ASN_TEXT[r[i]] || '—').join(' / ');

  // Figure A (a square) and figure B (the same square with its top-right
  // corner cut out), with equal-side ticks and right-angle marks.
  function shapes() {
    const svg = s('svg', { viewBox: '0 0 300 140', class: 'shapes', role: 'img', 'aria-label': 'រូប A ជាការេ រូប B ជាការេដដែលដែលកាត់ជ្រុងខាងលើស្ដាំចេញ' });
    const ra = (x, y, dx, dy) => s('path', { d: `M${x + dx} ${y} L${x + dx} ${y + dy} L${x} ${y + dy}`, class: 'ra' });
    const ticks = (x0, y0, size) => [
      s('line', { x1: x0 - 6, x2: x0 + 6, y1: y0 + size / 2 - 3, y2: y0 + size / 2 - 3, class: 'tk' }),
      s('line', { x1: x0 - 6, x2: x0 + 6, y1: y0 + size / 2 + 3, y2: y0 + size / 2 + 3, class: 'tk' }),
      s('line', { x1: x0 + size / 2 - 3, x2: x0 + size / 2 - 3, y1: y0 + size - 6, y2: y0 + size + 6, class: 'tk' }),
      s('line', { x1: x0 + size / 2 + 3, x2: x0 + size / 2 + 3, y1: y0 + size - 6, y2: y0 + size + 6, class: 'tk' }),
    ];
    // A
    const ax = 20, ay = 15, sz = 110;
    svg.append(s('rect', { x: ax, y: ay, width: sz, height: sz, class: 'shp' }));
    svg.append(ra(ax, ay, 12, 12), ra(ax + sz, ay, -12, 12), ra(ax + sz, ay + sz, -12, -12), ra(ax, ay + sz, 12, -12));
    ticks(ax, ay, sz).forEach((t) => svg.append(t));
    svg.append(s('text', { x: ax + sz / 2, y: ay + sz / 2 + 7, 'text-anchor': 'middle', class: 'shl', text: 'A' }));
    // B
    const bx = 170, by = 15, cut = 50;
    svg.append(s('path', { d: `M${bx} ${by} L${bx + sz - cut} ${by} L${bx + sz - cut} ${by + cut} L${bx + sz} ${by + cut} L${bx + sz} ${by + sz} L${bx} ${by + sz} Z`, class: 'shp' }));
    svg.append(ra(bx, by, 12, 12), ra(bx + sz - cut, by, -12, 12), ra(bx + sz - cut, by + cut, 12, -12),
      ra(bx + sz, by + cut, -12, 12), ra(bx + sz, by + sz, -12, -12), ra(bx, by + sz, 12, -12));
    ticks(bx, by, sz).forEach((t) => svg.append(t));
    svg.append(s('text', { x: bx + 30, y: by + 40, 'text-anchor': 'middle', class: 'shl', text: 'B' }));
    return svg;
  }

  const TITLE = 'ជានិច្ច ជួនកាល មិនដែល';
  const Q2_KEY = ['S', 'A', 'N', 'A', 'N', 'S'];
  const Q3_ROWS = [
    'អ្នកដែលមានចំនួនកាក់ច្រើនជាងគេ គឺជាអ្នកដែលមានប្រាក់ច្រើនជាងគេ។',
    '<span class="m">A − B = B − A</span>',
    'បើបូកចំនួនដូចគ្នាទៅលើភាគយក និងភាគបែងនៃប្រភាគមួយ តម្លៃប្រភាគនឹងកើនឡើង។',
  ];

  function examplesTable(ctx) {
    const t = h('table', { class: 'ctable examples' });
    t.append(h('thead', {}, h('tr', {}, h('th', { class: 'st' }, 'អំណះអំណាង'), h('th', {}, 'ឧទាហរណ៍ពេលដែលវាពិត'), h('th', {}, 'ឧទាហរណ៍ពេលដែលវាមិនពិត'))));
    const tb = h('tbody');
    Q3_ROWS.forEach((row, i) => {
      tb.append(h('tr', {},
        h('td', { class: 'st', html: row }),
        h('td', {}, W.textarea(ctx, 'u3q3', i + 't', 'សូមបញ្ចូលឧទាហរណ៍នៅទីនេះ', 3)),
        h('td', {}, W.textarea(ctx, 'u3q3', i + 'f', 'សូមបញ្ចូលឧទាហរណ៍នៅទីនេះ', 3))));
    });
    t.append(tb);
    return t;
  }

  PISA.registerUnit({
    id: 'u3',
    no: 3,
    title: TITLE,
    en: 'Always Sometimes Never',
    blurb: 'វិនិច្ឆ័យថាអំណះអំណាងពិតជានិច្ច ពិតជួនកាល ឬមិនដែលពិត រួចរកឧទាហរណ៍ដោយខ្លួនឯង។',
    questions: {
      u3q1: {
        label: 'សំណួរ ១', format: 'សំណួរចម្លើយឆ្លាស់ (ជានិច្ច/ជួនកាល/មិនដែល)', max: 1,
        parts: [{ k: '0' }, { k: '1' }],
        summary: (r) => listOf(r, 2),
        score: (r) => ({ pts: r[0] === 'A' && r[1] === 'S' ? 1 : 0 }),
        key: '<b>ពិតជានិច្ច / ពិតជួនកាល</b>។ អំណះអំណាងទី ១ ពិតជានិច្ច ព្រោះក្មេងស្រីនោះកើតមកទាបជាងពាក់កណ្ដាលនៃកម្ពស់បច្ចុប្បន្ន ហើយកម្ពស់កើនឡើងជាបន្តបន្ទាប់ ដូច្នេះនាងច្បាស់ជាបានឆ្លងកាត់កម្ពស់ពាក់កណ្ដាលនោះ។ អំណះអំណាងទី ២ ពិតជួនកាល ព្រោះជាទូទៅពិត តែមិនពិតគ្រប់គូឡើយ។',
      },
      u3q2: {
        label: 'សំណួរ ២', format: 'សំណួរចម្លើយឆ្លាស់ (ជានិច្ច/ជួនកាល/មិនដែល)', max: 1,
        parts: [0, 1, 2, 3, 4, 5].map((i) => ({ k: String(i) })),
        summary: (r) => listOf(r, 6),
        score: (r) => ({ pts: Q2_KEY.every((v, i) => r[i] === v) ? 1 : 0 }),
        key: '<b>ជួនកាល / ជានិច្ច / មិនដែល / ជានិច្ច / មិនដែល / ជួនកាល</b>។<ol class="klist">' +
          '<li>ចំនួនគត់គូគុណនឹងខ្លួនឯង បានចំនួនគត់គូ។ ចំនួនគត់សេសគុណនឹងខ្លួនឯង បានចំនួនគត់សេស។</li>' +
          '<li>ការគុណនឹងពីរ តែងតែបានចំនួនគត់គូ។</li>' +
          '<li>ពាក់កណ្ដាលនៃចំនួនគត់សេស មិនដែលជាចំនួនគត់ឡើយ។</li>' +
          '<li><span class="m"><span class="frac"><span>6x + 2</span><span>2</span></span> = 3x + 1</span> ជាសមីការសមមូល ដូច្នេះ ពិតគ្រប់តម្លៃ x។</li>' +
          '<li>រូប B គឺរូប A ដែលកាត់ជ្រុងខាងស្ដាំចេញមួយ ដូច្នេះ បរិមាត្រនៅ<b>ស្មើគ្នា</b> មិនដែលតូចជាងឡើយ។</li>' +
          '<li>អាចកើតឡើង តែពុំមែនរាល់ពេលទេ។</li></ol>',
      },
      u3q3: {
        label: 'សំណួរ ៣', format: 'សំណួរសរសេរចម្លើយវែង', max: 1,
        parts: ['0t', '0f', '1t', '1f', '2t', '2f'].map((k) => ({ k })),
        summary: (r) => [0, 1, 2].map((i) => '(' + PISA.km(i + 1) + ') ពិត៖ ' + (r[i + 't'] || '—') + ' ; មិនពិត៖ ' + (r[i + 'f'] || '—')).join(' | '),
        score: () => ({ pts: null }),
        key: 'ឧទាហរណ៍គំរូខាងក្រោម ពុំមែនជាចម្លើយតែមួយគត់ឡើយ។<ol class="klist">' +
          '<li><b>ពិត</b> ពេលកាក់ទាំងអស់មានតម្លៃដូចគ្នា។ <b>មិនពិត</b> ពេលតម្លៃកាក់ខុសគ្នា ឧ. កាក់ ១០ គ្រាប់ តម្លៃ ១០០ រៀលក្នុងមួយគ្រាប់ (សរុប ១ ០០០ រៀល) តិចជាងកាក់ ២ គ្រាប់ តម្លៃ ១ ០០០ រៀលក្នុងមួយគ្រាប់ (សរុប ២ ០០០ រៀល)។</li>' +
          '<li><b>ពិត</b> តែពេល A = B ប៉ុណ្ណោះ ឧ. A = B = 5 នាំឱ្យ 5 − 5 = 0 ស្មើគ្នាទាំងសងខាង។ <b>មិនពិត</b> ពេល A ≠ B ឧ. A = 7 និង B = 3 នាំឱ្យ 7 − 3 = 4 តែ 3 − 7 = −4។</li>' +
          '<li><b>ពិត</b> សម្រាប់ប្រភាគតូចជាងមួយ ឧ. បូក ១ ទៅលើភាគយក និងភាគបែងនៃ 1/2 បាន 2/3 ដែលធំជាង។ <b>មិនពិត</b> សម្រាប់ប្រភាគធំជាងមួយ ឧ. 3/2 បាន 4/3 ដែលតូចជាងវិញ ហើយបើប្រភាគស្មើនឹងមួយ តម្លៃនៅដដែល។</li></ol>',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 42,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ៣', split: 44, items: ['u3q1'],
        left: (ctx) => W.stack(
          W.instr('ចំពោះអំណះអំណាងនីមួយៗ សូមបញ្ជាក់ថាវា <b>ពិតជានិច្ច</b> <b>ពិតជួនកាល</b> ឬ <b>មិនដែលពិត</b>។'),
          W.choiceTable(ctx, 'u3q1', {
            cols: ASN,
            rows: [
              'ក្មេងស្រីអាយុ ១៤ ឆ្នាំម្នាក់ ធ្លាប់មានកម្ពស់ត្រឹមពាក់កណ្ដាលនៃកម្ពស់បច្ចុប្បន្នរបស់ខ្លួន យ៉ាងហោចណាស់មួយដងក្នុងជីវិត។',
              'ក្មេងស្រីអាយុ ១៤ ឆ្នាំម្នាក់ ខ្ពស់ជាងក្មេងស្រីអាយុ ១០ ឆ្នាំម្នាក់។',
            ],
          })),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ៣', full: true, items: ['u3q2'],
        left: (ctx) => W.stack(
          W.instr('សម្រាប់អំណះអំណាងនីមួយៗ សូមបញ្ជាក់ថាវា <b>ពិតជានិច្ច</b>, <b>ពិតជួនកាល</b> ឬ <b>មិនដែលពិត</b>។'),
          W.choiceTable(ctx, 'u3q2', {
            cls: 'wide',
            cols: ASN,
            rows: [
              'នៅពេលចំនួនគត់មួយគុណនឹងខ្លួនវា លទ្ធផលជាចំនួនគត់គូ។',
              'ការគុណចំនួនគត់មួយនឹងពីរ បង្កើតបានចំនួនគត់គូ។',
              // Wording as printed in the book (oecd_ex3_s3.tikz); "គត់គត់"
              // looks like a doubled word -- flagged for the author.
              'ការចែកចំនួនគត់សេសមួយនឹងពីរ បង្កើតបានចំនួនគត់គត់។',
              '<span class="m">3x + 1 = <span class="frac"><span>6x + 2</span><span>2</span></span></span>',
              h('div', { class: 'shape-row' }, shapes(), h('span', {}, 'បរិមាត្រនៃរូប A ធំជាងបរិមាត្រនៃរូប B។')),
              'បើបោះកាក់ ៥០ ដង វានឹងចេញផ្នែកមុខ ២៥ ដង។',
            ],
          })),
      },
      {
        tag: 'សំណួរ ៣ / ៣', full: true, items: ['u3q3'],
        left: (ctx) => W.stack(
          W.p('អំណះអំណាងនីមួយៗខាងក្រោម ពិត <b>ជួនកាល</b>។'),
          W.p('ចំពោះអំណះអំណាងនីមួយៗ សូមផ្ដល់ឧទាហរណ៍មួយ ពេលដែលវាពិត និងឧទាហរណ៍មួយពេលដែលវាមិនពិត។', 'q'),
          examplesTable(ctx)),
      },
    ],
  });
})();
