/* Unit 09 (MoEYS 2025 / PISA M505) — លំយោល (Swings)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ២២–២៣ (ប្រធានបទទី ៩)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'លំយោល';
  const EN_TITLE = 'Swings';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការយោលទោង និងកម្ពស់ជើងផុតពីដី'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'លុនា កំពុងតែអង្គុយលើទោង។ គាត់ចាប់ផ្តើមយោលទោង។ គាត់ព្យាយាមយោលឱ្យបានខ្ពស់បំផុតតាមដែលអាចធ្វើបាន។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t09_swings.svg',
        alt: 'ក្រាបកម្ពស់ជើងផុតពីដីធៀបនឹងរយៈពេល',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក. ក្រាប ក</b> (រលកកម្ពស់កាន់តែខ្ពស់ឡើងៗជាលំដាប់)' },
    { v: 'B', html: '<b>ខ. ក្រាប ខ</b> (រលកកម្ពស់ស្មើៗគ្នាថេរ)' },
    { v: 'C', html: '<b>គ. ក្រាប គ</b> (ធ្នូកោងត្រួតគ្នា)' },
    { v: 'D', html: '<b>ឃ. ក្រាប ឃ</b> (បន្ទាត់ត្រង់កើនឡើងជាប់)' },
  ];

  PISA.registerUnit({
    id: 'm09',
    no: 9,
    label: 'ប្រធានបទ ៩',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 5,
    blurb: 'ការបកស្រាយទិន្នន័យក្រាបនៃបាតុភូតចលនាយោលតាមពេលវេលា (PISA M505)។',
    questions: {
      m09q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (Multiple Choice)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើសក្រាប' }],
        summary: (r) => {
          const names = { A: 'ក្រាប ក', B: 'ក្រាប ខ', C: 'ក្រាប គ', D: 'ក្រាប ឃ' };
          return names[r.choice] || r.choice || '—';
        },
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'A') {
            return { pts: 1, note: 'ត្រឹមត្រូវ (ក្រាប ក)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ក្រាប ក)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ក (ក្រាប ក)</b><br><br>' +
          '<b>ការពន្យល់គណិតវិទ្យា និងរូបវិទ្យា ៖</b><br>' +
          '• នៅពេល លុនា យោលទោង ចលនាជើងរបស់គាត់ជាចលនាយោលទៅមក (Periodic Motion) ដែលមានកំពូលខ្ពស់ (ពេលយោលដល់ចំណុចខ្ពស់បំផុត) និងចំណុចទាបបំផុត (ពេលទោងកាត់ចំចំណុចលំនឹងជិតដល់ដី)។ ដូច្នេះក្រាបត្រូវតែជារលកយោលចុះឡើង មិនមែនជាបន្ទាត់ត្រង់ (ឃ) ឬធ្នូកោងប្លែក (គ) ឡើយ។<br>' +
          '• ដោយសារគាត់ចាប់ផ្តើមយោលពីដំបូង ហើយ «ព្យាយាមយោលឱ្យបានខ្ពស់បំផុតតាមដែលអាចធ្វើបាន» នោះអំព្លីទុត (កម្ពស់អតិបរមានៃរលកនីមួយៗ) ត្រូវតែកើនឡើងជាលំដាប់ធំជាងមុន ដែលត្រូវគ្នានឹង <b>ក្រាប ក</b>។ ចំណែកក្រាប ខ បង្ហាញពីកម្ពស់ថេរដែលមិនត្រូវនឹងការប្រឹងយោលឱ្យកាន់តែខ្ពស់ឡើងនោះឡើយ។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលដ្យាក្រាមក្រាបលំយោល នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៩)</b> — កូដ OECD PISA: <b>M505 (Swings)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m09q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាបទាំងបួន ក, ខ, គ, ឃ នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('លុនា កំពុងតែអង្គុយលើទោង។ គាត់ចាប់ផ្តើមយោលទោង។ គាត់ព្យាយាមយោលឱ្យបានខ្ពស់បំផុតតាមដែលអាចធ្វើបាន។'),
          W.p('<b>តើដ្យាក្រាមមួយណាត្រឹមត្រូវបំផុត ដែលបង្ហាញថាកម្ពស់ជើងរបស់គាត់ផុតពីដី នៅពេលគាត់យោលទោង?</b>', 'q-lead'),
          W.radios(ctx, 'm09q1', 'choice', Q1_OPTS)
        ),
        right: stimulus,
      },
    ],
  });
})();
