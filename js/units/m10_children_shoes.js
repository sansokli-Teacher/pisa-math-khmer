/* Unit 10 (MoEYS 2025 / PISA M432) — ស្បែកជើងសម្រាប់កុមារ (Shoes for Children)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ២៤–២៥ (ប្រធានបទទី ១០)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ស្បែកជើងសម្រាប់កុមារ';
  const EN_TITLE = 'Shoes for Children';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការកំណត់ទំហំស្បែកជើងកុមារ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'តារាងខាងក្រោមនេះ បង្ហាញអំពីការកំណត់ទំហំស្បែកជើងនៅក្នុងប្រទេសហ្ស៊ិតឡង់ (Zedland) ' +
      'ដោយយោងទៅតាមប្រវែងបាតជើងផ្សេងៗគ្នា គិតជាមីលីម៉ែត្រ (mm) ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t10_shoe_sizes.svg',
        alt: 'តារាងរង្វាស់ប្រវែងបាតជើង និងទំហំស្បែកជើងសម្រាប់កុមារ',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm10',
    no: 10,
    label: 'ប្រធានបទ ១០',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 5,
    blurb: 'ការអាន និងបកស្រាយទិន្នន័យតារាងចន្លោះប្រវែង និងទំហំស្បែកជើង (PISA M432)។',
    questions: {
      m10q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខទំហំស្បែកជើង',
        max: 1,
        parts: [{ k: 'size', label: 'លេខទំហំស្បែកជើង' }],
        summary: (r) => (r.size ? 'ទំហំ ' + r.size : '—'),
        score: (r) => {
          const raw = (r.size || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 26) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (ទំហំ ២៦)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ទំហំ ២៦)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 26 (ទំហំ ២៦)</b><br><br>' +
          '<b>របៀបផ្ទៀងផ្ទាត់ក្នុងតារាង ៖</b><br>' +
          '• បាតជើងរបស់ ម៉ារី មានប្រវែង <b>163 mm</b>។<br>' +
          '• ពិនិត្យមើលចន្លោះប្រវែងក្នុងតារាង ៖ ចន្លោះពី <b>160 mm ទៅដល់ 166 mm</b> ត្រូវគ្នានឹងទំហំស្បែកជើងលេខ <b>26</b>។<br>' +
          '• ដោយសារ 160 ≤ 163 ≤ 166 ដូច្នេះ ម៉ារី គួរទិញស្បែកជើងទំហំលេខ <b>26</b>។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលតារាងទំហំស្បែកជើង នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១០)</b> — កូដ OECD PISA: <b>M432 (Shoes for Children)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m10q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 26',
            value: ctx.val('m10q1', 'size') || '',
            'aria-label': 'លេខទំហំស្បែកជើង'
          });
          inp.addEventListener('input', () => ctx.setVal('m10q1', 'size', inp.value));

          return W.stack(
            W.instr('សូមពិនិត្យមើលតារាងទំហំស្បែកជើងនៅផ្ទាំងខាងស្ដាំ។'),
            W.p('បាតជើងរបស់ ម៉ារី មានប្រវែង <b>163 mm</b>។'),
            W.p('<b>ចូរប្រើតារាងខាងលើដើម្បីកំណត់ថា តើទំហំស្បែកជើងនៃប្រទេសហ្ស៊ិតឡង់ លេខប៉ុន្មានដែល ម៉ារី គួរទិញយកមកប្រើ?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ទំហំស្បែកជើងលេខ ៖'),
              inp
            )
          );
        },
        right: stimulus,
      },
    ],
  });
})();
