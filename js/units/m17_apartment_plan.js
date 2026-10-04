/* Unit 17 (MoEYS 2025 / PISA Buying an Apartment) — ការបញ្ជាទិញអាផាតមិន
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៤២–៤៣ (ប្រធានបទទី ១៧)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការបញ្ជាទិញអាផាតមិន';
  const EN_TITLE = 'Buying an Apartment';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ប្លង់បាតនៃអាផាតមិន'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'នេះជាប្លង់អាផាតមិន ដែលឪពុកម្តាយរបស់ វី ចង់បញ្ជាទិញពីភ្នាក់ងារលក់អចលនទ្រព្យ។ ' +
      'មាត្រដ្ឋាន ៖ <b>1 ឯកតាក្នុងប្លង់នេះ ស្មើនឹង 1 ម៉ែត្រ (m)</b>។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t17_apartment_plan.svg',
        alt: 'ប្លង់បាតអាផាតមិន បង្ហាញវិមាត្រទាំងបួន',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm17',
    no: 17,
    label: 'ប្រធានបទ ១៧',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការវាស់វែង និងការកំណត់ប្រវែងជ្រុង ៤ ដើម្បីគណនាផ្ទៃក្រឡាប្លង់បាតអាផាតមិន (PISA)។',
    questions: {
      m17q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរសរសេរកំណត់ប្រវែងជ្រុងទាំងបួន',
        max: 1,
        parts: [{ k: 'dimensions', label: 'ប្រវែងជ្រុងទាំងបួន និងការគណនា' }],
        summary: (r) => r.dimensions || '—',
        score: (r) => {
          const raw = (r.dimensions || '').trim().toLowerCase();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Key: 4 dimensions needed to calculate floor area:
          // e.g. 9.7m, 8.8m, 2.0m, 4.4m (Area = 9.7 x 8.8 - 2.0 x 4.4 = 76.56 m²)
          // or decomposition into rectangles using 4 key side lengths.
          const has9_7 = /9\.7|9,7/.test(raw);
          const has8_8 = /8\.8|8,8/.test(raw);
          const has2 = /2\.0|2m|2\s*m|2/.test(raw);
          const has4_4 = /4\.4|4,4/.test(raw);
          const hasArea = /76\.56|76,56|76\.6|77/.test(raw);

          if ((has9_7 && has8_8 && has2 && has4_4) || hasArea) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (កំណត់ជ្រុងទាំងបួន 9.7m, 8.8m, 2m, 4.4m ឬគណនាបាន 76.56 m²)' };
          }
          if (has9_7 || has8_8) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (បានបញ្ជាក់ប្រវែងសរុប ប៉ុន្តែខ្វះជ្រុងកាត់ចេញ)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ជ្រុងទាំងបួនដែលចាំបាច់គឺ 9.7m, 8.8m, 2m, 4.4m សម្រាប់គណនាផ្ទៃ 76.56 m²)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖</b><br><br>' +
          'ដើម្បីគណនាផ្ទៃក្រឡាបាតសរុបនៃអាផាតមិនដោយវាស់តែ <b>ជ្រុងចំនួន ៤</b> យើងអាចវាស់ ៖<br>' +
          '• <b>ប្រវែងបណ្តោយសរុប ៖</b> 9.7 m<br>' +
          '• <b>ប្រវែងទទឹងសរុប ៖</b> 8.8 m<br>' +
          '• <b>ប្រវែងទទឹងជ្រុងកាត់ចេញ (រានហាល) ៖</b> 2.0 m<br>' +
          '• <b>ប្រវែងបណ្តោយជ្រុងកាត់ចេញ (រានហាល) ៖</b> 4.4 m<br><br>' +
          '<b>រូបមន្តគណនាផ្ទៃក្រឡាសរុប ៖</b><br>' +
          '$$A = (9.7\text{ m} \times 8.8\text{ m}) - (2.0\text{ m} \times 4.4\text{ m}) = 85.36 - 8.80 = \mathbf{76.56\text{ m}^2}$$',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលប្លង់អាផាតមិន នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៧)</b> — កូដ OECD PISA: <b>Buying an Apartment</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m17q1'],
        left: (ctx) => W.stack(
          W.instr('ដើម្បីប៉ាន់ស្មានផ្ទៃក្រឡាអាផាតមិនសរុប អ្នកអាចវាស់ទំហំបន្ទប់នីមួយៗ ហើយបូកបញ្ចូលគ្នា។ ទោះបីយ៉ាងណាក៏ដោយ មានវិធីសាស្ត្រកាន់តែមានប្រសិទ្ធភាព ដោយគ្រាន់តែវាស់ជ្រុងទាំង ៤ ប៉ុណ្ណោះ។'),
          W.p('<b>ចូរកំណត់សម្គាល់លើប្រវែងជ្រុងបួន តាមរូបប្លង់ខាងស្តាំ ដែលចាំបាច់សម្រាប់ប៉ាន់ស្មានផ្ទៃក្រឡាបាតសរុបនៃអាផាតមិន ៖</b>', 'q-lead'),
          W.p('<i>(សូមបញ្ជាក់ប្រវែងជ្រុងទាំង ៤ ឬរបៀបគណនាផ្ទៃក្រឡា)</i>', 'hint'),
          W.textarea(ctx, 'm17q1', 'dimensions', 'ឧ. បណ្តោយសរុប 9.7m, ទទឹងសរុប 8.8m, កាត់ចេញ 2m និង 4.4m...', 5)
        ),
        right: stimulus,
      },
    ],
  });
})();
