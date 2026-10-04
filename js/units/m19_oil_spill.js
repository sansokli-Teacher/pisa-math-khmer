/* Unit 19 — កំពប់ប្រេង (Oil Spill) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ការកំពប់ប្រេងលើផ្ទៃសមុទ្រ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'កប៉ាល់ដឹកប្រេងមួយបានជួបគ្រោះថ្នាក់ និងកំពប់ប្រេងលើផ្ទៃសមុទ្រ។ រូបភាពផ្កាយរណបខាងក្រោមបង្ហាញពីតំបន់កំពប់ប្រេងនៅលើក្រឡាចត្រង្គផែនទី ដែលក្រឡាមួយមានវិមាត្រ ១០ km × ១០ km (ផ្ទៃក្រឡា ១០០ km²)។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t19_oil_spill.svg',
        alt: 'ផែនទីក្រឡាចត្រង្គកំពប់ប្រេង',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm19',
    no: 19,
    label: 'ប្រធានបទ ១៩',
    title: 'កំពប់ប្រេង',
    en: 'Oil Spill',
    collection: 'moeys',
    grade: 8,
    blurb: 'ប៉ាន់ស្មានផ្ទៃក្រឡារូបរាងមិនទៀងទាត់លើក្រឡាចត្រង្គផែនទីមាត្រដ្ឋាន។',
    questions: {
      m19q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') return { pts: 1, note: 'ត្រឹមត្រូវ (ជម្រើស ខ ៖ ប្រហែល 1500 km²)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ជម្រើស ខ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (ប្រហែល 1 500 km²)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ក្រឡាចត្រង្គ ១ ក្រឡាមានទំហំ 10 km × 10 km = 100 km²។<br>' +
          '• រាប់ចំនួនក្រឡាដែលគ្របដណ្តប់ដោយស្នាមប្រេង (រួមទាំងក្រឡាពេញ និងក្រឡាកន្លះ) មានប្រហែល 15 ក្រឡា។<br>' +
          '• ផ្ទៃក្រឡាប៉ាន់ស្មាន = 15 × 100 km² = <b>1 500 km²</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលផែនទីក្រឡាចត្រង្គនៃតំបន់កំពប់ប្រេងនៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m19q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលផែនទីនៅផ្ទាំងខាងស្តាំ (ក្រឡា ១ = ១០០ km²)។'),
          W.p('<b>តើតម្លៃមួយណាខាងក្រោមនេះ ជាការប៉ាន់ស្មានដ៏ល្អបំផុតនៃផ្ទៃក្រឡាសរុបដែលរងការកំពប់ប្រេង គិតជាគីឡូម៉ែត្រការ៉េ (km²)?</b>', 'q-lead'),
          W.radios(ctx, 'm19q1', 'choice', [
            { v: 'A', html: 'ក. ប្រហែល 500 km²' },
            { v: 'B', html: 'ខ. ប្រហែល 1 500 km²' },
            { v: 'C', html: 'គ. ប្រហែល 3 000 km²' },
            { v: 'D', html: 'ឃ. ប្រហែល 6 000 km²' }
          ])
        ),
        right: stimulus
      }
    ]
  });
})();
