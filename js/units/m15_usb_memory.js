/* Unit 15 (MoEYS 2025 / PISA M571) — អង្គចងចាំ (Memory / USB Drive)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៣៤–៣៦ (ប្រធានបទទី ១៥)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'អង្គចងចាំ';
  const EN_TITLE = 'Memory';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការគ្រប់គ្រងទំហំផ្ទុកលើ USB Flash Drive'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'សុខា មានឧបករណ៍អង្គចងចាំមួយ (USB Flash Drive 1 GB = 1000 MB) សម្រាប់ផ្ទុកតន្ត្រី និងរូបថត។ ' +
      'ក្រាប និងតារាងខាងក្រោមបង្ហាញពីស្ថានភាពផ្ទុកបច្ចុប្បន្ន ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t15_usb_memory.svg',
        alt: 'ស្ថានភាពផ្ទុកទិន្នន័យលើឧបករណ៍ USB 1 GB',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q2_OPTS = [
    { v: 'A', html: '<b>ក. ក្រាប ក</b> (តន្ត្រី 550 MB, រូបថត 198 MB, ថតថ្មី 350 MB)' },
    { v: 'B', html: '<b>ខ. ក្រាប ខ</b> (តន្ត្រី 650 MB, រូបថត 350 MB, ទំនេរ 0 MB)' },
    { v: 'C', html: '<b>គ. ក្រាប គ</b> (តន្ត្រី 300 MB, រូបថត 198 MB, ថតថ្មី 350 MB, ទំនេរ 152 MB)' },
    { v: 'D', html: '<b>ឃ. ក្រាប ឃ</b> (តន្ត្រីប្រហែល 450 MB, រូបថត 198 MB, ថតថ្មី 350 MB, ទំនេរតូចចង្អៀត)' },
  ];

  PISA.registerUnit({
    id: 'm15',
    no: 15,
    label: 'ប្រធានបទ ១៥',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 5,
    blurb: 'ការបូកដកទំហំផ្ទុកឯកសារមេកាបៃ (MB) និងការបកស្រាយក្រាបអង្គចងចាំ (PISA M571)។',
    questions: {
      m15q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ជាក់ និងលើកឧទាហរណ៍',
        max: 1,
        parts: [
          { k: 'can_delete', label: 'អាចធ្វើបានឬទេ?' },
          { k: 'albums', label: 'ឈ្មោះអាល់ប៊ុមទាំងពីរដែលត្រូវលុប' },
        ],
        summary: (r) => (r.can_delete === 'Y' ? 'បាទ/ចាស' : (r.can_delete || '—')) + (r.albums ? ' · ' + r.albums : ''),
        score: (r) => {
          const cd = (r.can_delete || '').trim();
          const alb = (r.albums || '').trim().toLowerCase();
          if (!cd && !alb) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Needed space: 350 - 152 = 198 MB.
          // Deleting 2 albums whose sum >= 198 MB:
          // e.g. Album 8 (125) + Album 1 (100) = 225 >= 198
          // Album 8 (125) + Album 7 (75) = 200 >= 198
          // Album 8 (125) + Album 3 (80) = 205 >= 198
          // Album 8 (125) + Album 6 (80) = 205 >= 198
          // Album 8 (125) + Album 2 (75) = 200 >= 198
          // Album 1 (100) + Album 3 (80) = 180 < 198 (not enough)
          const lat = PISA.latin(alb);
          const mentions8 = /8|៨/.test(alb) || /eight|8/.test(lat);
          const mentionsAnotherLarge = /1|១|2|២|3|៣|6|៦|7|៧/.test(alb);

          if ((cd === 'Y' || /បាទ|ចាស|yes/i.test(cd)) && (mentions8 && mentionsAnotherLarge)) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (អាចធ្វើបាន ដោយលុបអាល់ប៊ុម ៨ ជាមួយអាល់ប៊ុម ១, ២, ៣, ៦ ឬ ៧ ដែលមានផលបូក ≥ 198 MB)' };
          }
          if (cd === 'Y' || /បាទ|ចាស|yes/i.test(cd)) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ឆ្លើយ «បាទ/ចាស» ត្រូវ ប៉ុន្តែមិនទាន់បានបញ្ជាក់អាល់ប៊ុមត្រឹមត្រូវ)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (សុខាអាចធ្វើបាន ដោយសារអាល់ប៊ុមទី ៨ បូកនឹងអាល់ប៊ុមទី ១, ២, ៣, ៦ ឬ ៧ មានទំហំលើសពី 198 MB)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ បាទ/ចាស អាចធ្វើបាន។</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ទំហំទំនេរដែលត្រូវការបន្ថែម ៖ 350 MB - 152 MB = <b>198 MB</b><br>' +
          '• ឧទាហរណ៍នៃការលុបអាល់ប៊ុម ២ ដែលផ្តល់ទំហំ ≥ 198 MB ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- <b>អាល់ប៊ុម ១ (100 MB) និង អាល់ប៊ុម ៨ (125 MB)</b> ៖ សរុប 225 MB ≥ 198 MB<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- <b>អាល់ប៊ុម ៧ (75 MB) និង អាល់ប៊ុម ៨ (125 MB)</b> ៖ សរុប 200 MB ≥ 198 MB<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- <b>អាល់ប៊ុម ៣ ឬ ៦ (80 MB) និង អាល់ប៊ុម ៨ (125 MB)</b> ៖ សរុប 205 MB ≥ 198 MB',
      },

      m15q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (Multiple Choice)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើសក្រាប' }],
        summary: (r) => r.choice || '—',
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'D') return { pts: 1, note: 'ត្រឹមត្រូវ (ឃ. ក្រាប ឃ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ឃ. ក្រាប ឃ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ឃ (ក្រាប ឃ)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b> ក្រោយពេលលុបអាល់ប៊ុមតន្ត្រីប្រហែល 200 MB តន្ត្រីនៅសល់ប្រហែល 450 MB, រូបថតនៅរក្សាដដែល 198 MB, ថតថ្មីមាន 350 MB ហើយទំហំទំនេរនៅសល់តិចតួច ដែលត្រូវនឹងទម្រង់នៃ <b>ក្រាប ឃ</b>។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលទិន្នន័យអង្គចងចាំ USB នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៥)</b> — កូដ OECD PISA: <b>M571 (Memory)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ២',
        split: 44,
        items: ['m15q1'],
        left: (ctx) => W.stack(
          W.instr('សុខា ចង់ផ្ទុកថតឯកសារថ្មីមួយទំហំ 350 MB ចូលក្នុង USB ប៉ុន្តែទំហំទំនេរមានត្រឹមតែ 152 MB ប៉ុណ្ណោះ។ គាត់សម្រេចចិត្តលុបអាល់ប៊ុមតន្ត្រីយ៉ាងច្រើន ២។'),
          W.p('<b>តើសុខា អាចលុបអាល់ប៊ុមតន្ត្រីយ៉ាងច្រើន ២ ដើម្បីឱ្យមានទំហំទំនេរគ្រប់គ្រាន់ 350 MB បានដែរ ឬទេ?</b>', 'q-lead'),
          W.radios(ctx, 'm15q1', 'can_delete', [
            { v: 'Y', html: '<b>បាទ/ចាស</b> (អាចធ្វើបាន)' },
            { v: 'N', html: '<b>ទេ</b> (មិនអាចធ្វើបានទេ)' },
          ]),
          h('div', { style: 'margin-top: 14px;' },
            W.p('<b>ប្រសិនបើ «បាទ/ចាស» ចូរផ្តល់ឈ្មោះអាល់ប៊ុមទាំងពីរដែលគាត់អាចលុបបាន ៖</b>', 'q-lead'),
            W.textarea(ctx, 'm15q1', 'albums', 'ឧ. អាល់ប៊ុម ១ និង អាល់ប៊ុម ៨', 3)
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ២',
        split: 44,
        items: ['m15q2'],
        left: (ctx) => W.stack(
          W.instr('ពីរបីសប្តាហ៍ក្រោយមក សុខា បានលុបអាល់ប៊ុមតន្ត្រីមួយចំនួន និងបានបញ្ចូលថតឯកសារ 350 MB នោះរួចរាល់។'),
          W.p('<b>តើក្រាបណាមួយខាងក្រោម តំណាងឱ្យស្ថានភាពអង្គចងចាំថ្មីរបស់សុខា?</b>', 'q-lead'),
          W.radios(ctx, 'm15q2', 'choice', Q2_OPTS)
        ),
        right: stimulus,
      },
    ],
  });
})();
