/* Unit 07 (MoEYS 2025 / PISA M467) — ស្ករគ្រាប់ពណ៌ (Coloured Candies)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ១៨–១៩ (ប្រធានបទទី ៧)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ស្ករគ្រាប់ពណ៌';
  const EN_TITLE = 'Coloured Candies';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការចាប់យកស្ករគ្រាប់ពណ៌ពីក្នុងថង់'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ម្តាយរបស់ វិបុល អនុញ្ញាតឱ្យគាត់ចាប់យកស្ករមួយគ្រាប់ពីក្នុងថង់។ គាត់មិនអាចមើលឃើញស្ករគ្រាប់ទាំងនោះទេ។ ' +
      'ក្រាបខាងក្រោមបង្ហាញពីចំនួនស្ករគ្រាប់តាមពណ៌នីមួយៗនៅក្នុងថង់។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t07_candies_chart.svg',
        alt: 'ក្រាបបង្គោលបង្ហាញចំនួនគ្រាប់ស្ករតាមពណ៌នីមួយៗ',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក.</b> 10%' },
    { v: 'B', html: '<b>ខ.</b> 20%' },
    { v: 'C', html: '<b>គ.</b> 25%' },
    { v: 'D', html: '<b>ឃ.</b> 50%' },
  ];

  PISA.registerUnit({
    id: 'm07',
    no: 7,
    label: 'ប្រធានបទ ៧',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 9,
    blurb: 'ការគណនាប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍ទោលពីទិន្នន័យក្រាបបង្គោល (PISA M467)។',
    questions: {
      m07q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (Multiple Choice)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => {
          const names = { A: 'ក. 10%', B: 'ខ. 20%', C: 'គ. 25%', D: 'ឃ. 50%' };
          return names[r.choice] || r.choice || '—';
        },
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') {
            return { pts: 1, note: 'ត្រឹមត្រូវ (ខ. 20%)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ខ. 20%)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ. 20%</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '១. រកចំនួនគ្រាប់ស្ករសរុបទាំងអស់ក្នុងថង់ ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;6 (ក្រហម) + 5 (ទឹកក្រូច) + 3 (លឿង) + 3 (បៃតង) + 2 (ខៀវ) + 4 (ផ្កាឈូក) + 2 (ស្វាយ) + 5 (ត្នោត) = <b>30 គ្រាប់</b><br>' +
          '២. ចំនួនគ្រាប់ស្ករពណ៌ក្រហមមាន ៖ <b>6 គ្រាប់</b><br>' +
          '៣. ប្រូបាប៊ីលីតេដែលចាប់បានស្ករគ្រាប់ពណ៌ក្រហម ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;P(ក្រហម) = 6 / 30 = 1 / 5 = 0.20 = <b>20%</b> (ត្រូវនឹងជម្រើស <b>ខ</b>)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាបបង្គោលនៃគ្រាប់ស្ករគ្រាប់ នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៧)</b> — កូដ OECD PISA: <b>M467 (Coloured Candies)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m07q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាបបង្គោលចំនួនគ្រាប់ស្ករនៅផ្ទាំងខាងស្ដាំ។'),
          W.p('ម្តាយរបស់ វិបុល អនុញ្ញាតឱ្យគាត់ចាប់យកស្ករមួយគ្រាប់ពីក្នុងថង់។ គាត់មិនអាចមើលឃើញស្ករគ្រាប់ទាំងនោះទេ។'),
          W.p('<b>តើប្រូបាបដែល វិបុល ចាប់បានស្ករគ្រាប់ពណ៌ក្រហម ស្មើនឹងប៉ុន្មាន?</b>', 'q-lead'),
          W.radios(ctx, 'm07q1', 'choice', Q1_OPTS)
        ),
        right: stimulus,
      },
    ],
  });
})();
