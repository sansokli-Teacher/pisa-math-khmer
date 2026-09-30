/* Unit 2 — ភាពស្រស់ស្អាតនៃស្វ័យគុណ (The Beauty of Powers)
 * Source: teacher guide chapter 8, screens 1–4 (oecd_ex2_*.tikz) and keys.
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack powers-stim', html:
    '<p>នៅពេលអ្នកគុណលេខដដែលៗច្រើនដង អ្នកអាចប្រើសញ្ញាណនៃស្វ័យគុណ ដើម្បីសរសេរសង្ខេបនូវអ្វីដែលអ្នកកំពុងធ្វើ។</p>' +
    '<p>ឧទាហរណ៍៖</p>' +
    '<p class="eq-line"><span class="m">8 × 8 × 8 × 8 = 8<sup>4</sup></span><span class="eq-note">(គុណលេខ ៨ ចំនួនបួនដង)</span></p>' +
    '<p>និង</p>' +
    '<p class="eq-line"><span class="m">7 × 7 × 7 × 7 × 7 × 7 = 7<sup>6</sup></span><span class="eq-note">(គុណលេខ ៧ ចំនួនប្រាំមួយដង)</span></p>' });

  // 7^1 .. 7^9 with the last digit in red (oecd_ex2_s4.tikz).
  function powersTable() {
    const t = h('table', { class: 'pow-table' });
    let v = 1;
    for (let n = 1; n <= 9; n++) {
      v *= 7;
      // thin-space thousands grouping, as printed: 5 764 801
      const grouped = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      t.append(h('tr', {},
        h('td', { class: 'pl', html: '7<sup>' + n + '</sup> =' }),
        h('td', { class: 'pv' }, grouped.slice(0, -1), h('span', { class: 'last' }, grouped.slice(-1)))));
    }
    return t;
  }

  const TITLE = 'ភាពស្រស់ស្អាតនៃស្វ័យគុណ';
  const TF = [{ v: 'T', html: 'ពិត', label: 'ពិត' }, { v: 'F', html: 'មិនពិត', label: 'មិនពិត' }];
  const TF_TEXT = { T: 'ពិត', F: 'មិនពិត' };

  PISA.registerUnit({
    id: 'u2',
    no: 2,
    title: TITLE,
    en: 'The Beauty of Powers',
    blurb: 'ការគិតហេតុផលលើស្វ័យគុណ ពីកម្រិតសាមញ្ញទៅស្មុគស្មាញ ក្នុងបរិបទគណិតវិទ្យាសុទ្ធ។',
    questions: {
      u2q1: {
        label: 'សំណួរ ១', format: 'សំណួរចម្លើយឆ្លាស់ (ពិត/មិនពិត)', max: 1,
        parts: [{ k: '0' }, { k: '1' }],
        summary: (r) => (TF_TEXT[r[0]] || '—') + ' / ' + (TF_TEXT[r[1]] || '—'),
        score: (r) => ({ pts: r[0] === 'T' && r[1] === 'F' ? 1 : 0 }),
        key: '<b>ពិត / មិនពិត</b>។ អំណះអំណាងទី ១ ពិត ព្រោះ 8<sup>16</sup> = 8 × 8<sup>15</sup> ដូច្នេះវាធំជាងពិតប្រាកដ ៨ ដង។ អំណះអំណាងទី ២ មិនពិត ព្រោះ 8<sup>10</sup> = 8<sup>9</sup> × 8 ដូច្នេះវាធំជាងលេខ ៨ ចំនួន 8<sup>9</sup> ដង មិនមែន ១០ ដងឡើយ។',
      },
      u2q2: {
        label: 'សំណួរ ២', format: 'សំណួរពហុជ្រើសរើស', max: 1,
        parts: [{ k: 'choice' }],
        summary: (r) => r.choice || '—',
        score: (r) => ({ pts: r.choice === '−1' ? 1 : 0 }),
        key: '<b>−1</b>។ ដោយស្វ័យគុណ 43 ជាលេខសេស យើងបាន (−5)<sup>43</sup> = −(5<sup>43</sup>) នាំឱ្យ (−5)<sup>43</sup> + (5)<sup>43</sup> = 0។ ដូច្នេះនៅសល់ត្រឹម (−1)<sup>43</sup> = −1។',
      },
      u2q3: {
        label: 'សំណួរ ៣', format: 'សំណួរពហុជ្រើសរើស', max: 1,
        parts: [{ k: 'choice' }],
        summary: (r) => r.choice || '—',
        score: (r) => ({ pts: r.choice === '9' ? 1 : 0 }),
        key: '<b>9</b>។ ខ្ទង់ចុងក្រោយដដែលៗតាមវដ្ត 7, 9, 3, 1។ ដោយ 190 = 4 × 47 + 2 នោះ ចំនួន 7<sup>190</sup> ស្ថិតនៅទីតាំងទី ២ ក្នុងវដ្ត ដូច្នេះខ្ទង់ចុងក្រោយគឺ 9។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 42,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ៣', split: 42, items: ['u2q1'],
        left: (ctx) => W.stack(
          W.instr('សូមមើល «ភាពស្រស់ស្អាតនៃស្វ័យគុណ» នៅខាងស្ដាំ។ សូមចុច «ពិត» ឬ «មិនពិត» សម្រាប់អំណះអំណាងនីមួយៗ។'),
          W.choiceTable(ctx, 'u2q1', {
            cols: TF,
            rows: [
              'លេខ 8<sup>16</sup> ធំជាងលេខ 8<sup>15</sup> ចំនួន ៨ ដង។',
              'លេខ 8<sup>10</sup> ធំជាងលេខ ៨ ចំនួន ១០ ដង។',
            ],
          })),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ៣', split: 42, items: ['u2q2'],
        left: (ctx) => W.stack(
          W.instr('សូមមើល «ភាពស្រស់ស្អាតនៃស្វ័យគុណ» នៅខាងស្ដាំ។<br>សូមចុចលើជម្រើសមួយ ដើម្បីឆ្លើយសំណួរ។'),
          h('p', { class: 'big-expr', html: '(−5)<sup>43</sup> + (−1)<sup>43</sup> + (5)<sup>43</sup>' }),
          W.p('តើតម្លៃនៃកន្សោមខាងលើគឺជាប៉ុន្មាន?', 'q'),
          W.radios(ctx, 'u2q2', 'choice', ['−1', '1', '0', '5'].map((v) => ({ v, html: '<span class="m">' + v + '</span>' })))),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ៣ / ៣', split: 42, items: ['u2q3'],
        left: (ctx) => W.stack(
          W.instr('សូមមើលតារាងនៅខាងស្ដាំ។ សូមចុចលើជម្រើសមួយ ដើម្បីឆ្លើយសំណួរ។'),
          W.p('តើខ្ទង់ចុងក្រោយនៃលេខ 7<sup>190</sup> គឺជាលេខអ្វី?', 'q'),
          W.radios(ctx, 'u2q3', 'choice', ['1', '3', '7', '9'].map((v) => ({ v, html: '<span class="m">' + v + '</span>' })))),
        right: () => W.stack(
          W.p('តារាងខាងក្រោមបង្ហាញស្វ័យគុណប្រាំបួនដំបូងនៃលេខ ៧។'),
          W.p('សូមកត់សម្គាល់ថា តម្លៃទាំងនោះកើនឡើងលឿនប៉ុណ្ណា!'),
          W.p('ខ្ទង់ចុងក្រោយនៃលេខទាំងនេះ ដើរតាមលំនាំជាក់លាក់មួយ។<br>សូមសិក្សាលំនាំនោះ ដើម្បីឆ្លើយសំណួរ។'),
          powersTable()),
      },
    ],
  });
})();
