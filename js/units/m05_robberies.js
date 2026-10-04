/* Unit 05 (MoEYS 2025 / PISA M179) — ចោរកម្ម (Robberies)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ១១–១៤ (ប្រធានបទទី ៥)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ចោរកម្ម';
  const EN_TITLE = 'Robberies';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការរាយការណ៍ព័ត៌មានស្តីពីករណីចោរកម្ម'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'អ្នករាយការណ៍ព័ត៌មានទូរទស្សន៍ម្នាក់ បានបង្ហាញក្រាបនេះ ហើយនិយាយថា ៖<br>' +
      '<i style="color: #b91c1c;">«ក្រាបបង្ហាញថា មានការកើនឡើងយ៉ាងខ្លាំង នៃចំនួនចោរកម្មពីឆ្នាំ 1998 ដល់ឆ្នាំ 1999»</i>។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t05_robberies_chart.svg',
        alt: 'ក្រាបបង្គោលបង្ហាញចំនួនករណីចោរកម្មប្រចាំឆ្នាំ 1998 និង 1999',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_OPTS = [
    { v: 'N', html: '<b>ទេ</b> (មិនសមហេតុផលទេ)' },
    { v: 'Y', html: '<b>បាទ/ចាស</b> (សមហេតុផល)' },
  ];

  PISA.registerUnit({
    id: 'm05',
    no: 5,
    label: 'ប្រធានបទ ៥',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការវិភាគការបំភ័ន្តភ្នែកនៃក្រាបស្ថិតិ និងអត្រាកំណើនភាគរយពិតប្រាកដ (PISA M179)។',
    questions: {
      m05q1: {
        label: 'សំណួរ ១',
        format: 'សំណើរើស និងពន្យល់ហេតុផល',
        max: 1,
        parts: [
          { k: 'reasonable', label: 'ការបកស្រាយសមហេតុផល?' },
          { k: 'explanation', label: 'ការពន្យល់' },
        ],
        summary: (r) => (r.reasonable === 'N' ? 'ទេ' : (r.reasonable === 'Y' ? 'បាទ/ចាស' : '—')) + (r.explanation ? ' · ' + r.explanation : ''),
        score: (r) => {
          const choice = (r.reasonable || '').trim();
          const exp = (r.explanation || '').trim();

          if (!choice && !exp) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const lower = exp.toLowerCase();
          const lat = PISA.latin(lower);

          // Full credit criteria:
          // Must consider 'No' (or express that it's NOT a reasonable interpretation)
          // AND provide mathematical justification:
          // 1. Percentage increase is very small (~1.5% - 2%)
          // 2. Absolute increase is small (around 8 to 10 cases out of ~500)
          // 3. The graph vertical axis is truncated / starts at 500, visually exaggerating the bar height
          const mentionsSmallIncrease = /តិច|តូច|8|9|10|1\.5%|2%|ភាគរយ|500|508|516|មិនច្រើន/.test(lower) ||
            /small|little|few|percent|8|9|10|1\.5|2%|out of 500/.test(lat);

          const mentionsGraphDistortion = /អ័ក្ស|500|កាត់|បំភ័ន្ត|ចាប់ផ្តើម|ក្រាប|កម្ពស់|រូបរាង/.test(lower) ||
            /axis|truncated|scale|starts at 500|exaggerat|mislead/.test(lat);

          if (choice === 'N' || /ទេ|មិន|no/i.test(choice)) {
            if (mentionsSmallIncrease || mentionsGraphDistortion) {
              return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (ឆ្លើយ «ទេ» ព្រមទាំងពន្យល់ពីកំណើនតិចតួច ឬការបំភ័ន្តនៃអ័ក្សក្រាប)' };
            }
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ឆ្លើយ «ទេ» ប៉ុន្តែការពន្យល់មិនទាន់លម្អិត)' };
          }

          if (choice === 'Y' && mentionsGraphDistortion) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ផ្អែកលើរូបរាងក្រាប ប៉ុន្តែមិនបានបញ្ជាក់ពីទិន្នន័យជាក់ស្តែង)' };
          }

          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ការអះអាងរបស់អ្នករាយការណ៍មិនសមហេតុផលឡើយ)' };
        },
        key: '<b>ចម្លើយ ៖ ទេ (មិនសមហេតុផលទេ)</b><br><br>' +
          '<b>ការពន្យល់គាំទ្រ (ផ្តល់ហេតុផលយ៉ាងតិចមួយ) ៖</b><br>' +
          '• <b>កំណើនភាគរយតូចខ្លាំង ៖</b> ករណីចោរកម្មកើនពីប្រហែល 508 ទៅ 516 (កើនត្រឹមតែ 8 ទៅ 9 ករណីប៉ុណ្ណោះ) ដែលស្មើនឹងកំណើនត្រឹមតែប្រហែល <b>1.5% ទៅ 2%</b> ប៉ុណ្ណោះ ធៀបនឹងចំនួនសរុបជាង 500 ករណី មិនមែនជាការកើនឡើង «យ៉ាងខ្លាំង» ឡើយ។<br>' +
          '• <b>ការបំភ័ន្តនៃអ័ក្សឈរ (Truncated Y-axis) ៖</b> អ័ក្សឈរនៃក្រាបមិនបានចាប់ផ្តើមពីលេខ 0 ឡើយ គឺចាប់ផ្តើមពីលេខ 500 ដែលធ្វើឱ្យបង្គោលឆ្នាំ 1999 មើលទៅខ្ពស់ជាងបង្គោលឆ្នាំ 1998 ដល់ទៅ 2 ឬ 3 ដង បង្កើតជាការយល់ច្រឡំដល់អ្នកទស្សនា។<br><br>' +
          '<b>កម្រិតពិន្ទុ PISA ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ) ៖</b> ឆ្លើយ «ទេ» និងពន្យល់ត្រឹមត្រូវដោយផ្អែកលើអត្រាកំណើនភាគរយតូច (1.5% - 2%) ឬចំនួនកើនតិចតួច (8–10 ករណី) ឬក្រាបកាត់អ័ក្សត្រឹម 500។<br>' +
          '• <b>ពិន្ទុមិនពេញ (០.៥ ពិន្ទុ) ៖</b> ឆ្លើយ «ទេ» ដោយគ្រាន់តែបញ្ជាក់ថាកើន 8-10 ករណី ដោយមិនបានប្រៀបធៀបភាគរយ ឬពន្យល់ខ្វះចន្លោះ។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាន និងក្រាបចោរកម្ម នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៥)</b> — កូដ OECD PISA: <b>M179 (Robberies)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m05q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាបបង្គោលចោរកម្មនៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>តើអ្នកចាត់ទុកអំណះអំណាងរបស់អ្នករាយការណ៍ព័ត៌មានថា ជាការបកស្រាយដ៏សមហេតុផលនៃក្រាបដែរ ឬទេ?</b>', 'q-lead'),
          W.radios(ctx, 'm05q1', 'reasonable', Q1_OPTS),
          h('div', { style: 'margin-top: 16px;' },
            W.p('<b>ចូរផ្តល់ការពន្យល់ ដើម្បីគាំទ្រចម្លើយរបស់អ្នក ៖</b>', 'q-lead'),
            W.textarea(ctx, 'm05q1', 'explanation', 'សូមសរសេរការពន្យល់របស់អ្នកនៅទីនេះ...', 6)
          )
        ),
        right: stimulus,
      },
    ],
  });
})();
