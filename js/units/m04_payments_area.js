/* Unit 04 (MoEYS 2025 / PISA Payments by Area) — ការបង់ប្រាក់តាមទំហំផ្ទៃក្រឡា
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៨–១០ (ប្រធានបទទី ៤)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការបង់ប្រាក់តាមទំហំផ្ទៃក្រឡា';
  const EN_TITLE = 'Payments by Area';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការទិញអាគារផ្ទះល្វែងរួមគ្នា'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'មនុស្សដែលរស់នៅក្នុងអាគារផ្ទះល្វែងមួយ បានសម្រេចចិត្តទិញអាគារនោះ។ ' +
      'ពួកគេនឹងប្រមូលលុយដាក់រួមគ្នា ដោយមនុស្សម្នាក់ៗនឹងបង់ប្រាក់ទៅតាមទំហំផ្ទៃក្រឡាផ្ទះល្វែងរបស់ខ្លួន។<br><br>' +
      '<b>ឧទាហរណ៍ ៖</b> បុរសម្នាក់ដែលរស់នៅក្នុងផ្ទះល្វែងដែលកាន់កាប់ <b>មួយភាគប្រាំ (1/5)</b> នៃផ្ទៃដីសរុបផ្ទះល្វែងទាំងអស់ ' +
      'នឹងត្រូវបង់ <b>មួយភាគប្រាំ (1/5)</b> នៃតម្លៃសរុបនៃអាគារនោះ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t04_apartment_building.svg',
        alt: 'ដ្យាក្រាមផ្ទះល្វែងទាំងបី និងការបង់ប្រាក់តាមទំហំផ្ទៃក្រឡា',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_ROWS = [
    'មនុស្សដែលរស់នៅក្នុងផ្ទះល្វែងធំបំផុត នឹងត្រូវបង់ប្រាក់ច្រើនជាងមនុស្សដែលរស់នៅក្នុងផ្ទះល្វែងតូចបំផុត រាល់មួយម៉ែត្រការ៉េ (m²) នៃផ្ទះល្វែងរបស់គាត់។',
    'បើយើងដឹងពីផ្ទៃដីនៃផ្ទះល្វែងពីរ និងតម្លៃនៃផ្ទះល្វែងមួយ នោះយើងអាចគណនាតម្លៃនៃផ្ទះល្វែងទីពីរបាន។',
    'បើយើងដឹងពីតម្លៃនៃអាគារ និងចំនួនទឹកប្រាក់ដែលម្ចាស់ផ្ទះនីមួយៗបង់ នោះយើងអាចគណនាផ្ទៃដីសរុបនៃផ្ទះល្វែងទាំងអស់បាន។',
    'បើតម្លៃសរុបនៃអាគារត្រូវបានចុះតម្លៃចំនួន 10% នោះម្ចាស់ផ្ទះនីមួយៗនឹងបង់ប្រាក់តិចជាងមុន 10%។',
  ];

  const Q1_COLS = [
    { v: 'T', html: 'ត្រឹមត្រូវ', label: 'ត្រឹមត្រូវ' },
    { v: 'F', html: 'មិនត្រឹមត្រូវ', label: 'មិនត្រឹមត្រូវ' },
  ];

  PISA.registerUnit({
    id: 'm04',
    no: 4,
    label: 'ប្រធានបទ ៤',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 8,
    blurb: 'ការគណនាសមាមាត្រ និងការវិភាគសមាមាត្រផ្ទៃក្រឡានឹងតម្លៃទិញអាគារ (PISA)។',
    questions: {
      m04q1: {
        label: 'សំណួរ ១',
        format: 'តារាងចម្លើយឆ្លាស់ (ត្រឹមត្រូវ / មិនត្រឹមត្រូវ)',
        max: 1,
        parts: [
          { k: '0', label: 'ប្រយោគ ១' },
          { k: '1', label: 'ប្រយោគ ២' },
          { k: '2', label: 'ប្រយោគ ៣' },
          { k: '3', label: 'ប្រយោគ ៤' },
        ],
        summary: (r) => {
          const m = { T: 'ត្រឹមត្រូវ', F: 'មិនត្រឹមត្រូវ' };
          return [0, 1, 2, 3].map(i => m[r[i]] || '—').join(' / ');
        },
        score: (r) => {
          const vals = [r['0'], r['1'], r['2'], r['3']];
          if (vals.every(v => !v)) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          // Key: មិនត្រឹមត្រូវ, ត្រឹមត្រូវ, មិនត្រឹមត្រូវ, ត្រឹមត្រូវ (F, T, F, T)
          if (vals[0] === 'F' && vals[1] === 'T' && vals[2] === 'F' && vals[3] === 'T') {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (មិនត្រឹមត្រូវ, ត្រឹមត្រូវ, មិនត្រឹមត្រូវ, ត្រឹមត្រូវ)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ៖ មិនត្រឹមត្រូវ, ត្រឹមត្រូវ, មិនត្រឹមត្រូវ, ត្រឹមត្រូវ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖</b><br>' +
          '• ប្រយោគ ១ ៖ <b>មិនត្រឹមត្រូវ</b> (តម្លៃក្នុងមួយម៉ែត្រការ៉េគឺថេរស្មើគ្នាសម្រាប់គ្រប់ផ្ទះល្វែងទាំងអស់)។<br>' +
          '• ប្រយោគ ២ ៖ <b>ត្រឹមត្រូវ</b> (ដោយសារតម្លៃសមាមាត្រផ្ទាល់នឹងផ្ទៃដី៖ តម្លៃ២ = ផ្ទៃ២/ផ្ទៃ១ × តម្លៃ១)។<br>' +
          '• ប្រយោគ ៣ ៖ <b>មិនត្រឹមត្រូវ</b> (យើងដឹងត្រឹមតែសមាមាត្រភាគរយ % មិនអាចទាញរកចំនួនម៉ែត្រការ៉េពិតប្រាកដបានទេ បើគ្មានផ្ទៃដីផ្ទះណាមួយ)។<br>' +
          '• ប្រយោគ ៤ ៖ <b>ត្រឹមត្រូវ</b> (ការបញ្ចុះតម្លៃ 10% លើតម្លៃសរុប នាំឱ្យតម្លៃចំណែកនីមួយៗចុះ 10% ដូចគ្នា)។',
      },

      m04q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរ និងគណនា',
        max: 1,
        parts: [
          { k: 'amount', label: 'ចំនួនទឹកប្រាក់ដែលត្រូវបង់ (zeds)' },
          { k: 'steps', label: 'អំណះអំណាង និងការគណនា' },
        ],
        summary: (r) => (r.amount ? r.amount + ' zeds' : '—') + (r.steps ? ' · ' + r.steps : ''),
        score: (r) => {
          const amt = (r.amount || '').replace(/\s+|,/g, '');
          const steps = (r.steps || '').replace(/\s+|,/g, '');
          const combined = amt + ' ' + steps;

          if (!amt && !steps) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Correct answer is 102 000 zeds (or 102000)
          if (amt === '102000' || /102000/.test(combined)) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (102 000 zeds)' };
          }

          // Check partial credit (e.g. calculation setup correct with minor slip like 10200 or 1020)
          if (/85.*300000.*250|300000.*85.*250/.test(combined)) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (របៀបគណនាត្រឹមត្រូវ ប៉ុន្តែមានកំហុសលេខចុងក្រោយ)' };
          }

          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 102 000 zeds)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 102 000 zeds</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '១. ផ្ទៃក្រឡាសរុបនៃផ្ទះល្វែងទាំងបី ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;95 m² + 85 m² + 70 m² = 250 m²<br>' +
          '២. តម្លៃក្នុងមួយម៉ែត្រការ៉េ (m²) ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;300 000 zeds ÷ 250 m² = 1 200 zeds/m²<br>' +
          '៣. ចំនួនទឹកប្រាក់ដែលម្ចាស់ផ្ទះល្វែងទី ២ ត្រូវបង់ (ទំហំ 85 m²) ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;85 m² × 1 200 zeds = <b>102 000 zeds</b><br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;(ឬ (85 / 250) × 300 000 = 102 000 zeds)',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៃការទិញអាគារ នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៤)</b> — កូដ OECD PISA: <b>Payments by Area</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ២',
        split: 44,
        items: ['m04q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៃការទិញអាគារនៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>ចូរជ្រើសរើសពាក្យ «ត្រឹមត្រូវ» ឬ «មិនត្រឹមត្រូវ» សម្រាប់ប្រយោគនីមួយៗខាងក្រោមនេះ ៖</b>', 'q-lead'),
          W.choiceTable(ctx, 'm04q1', {
            head: 'ប្រយោគអំណះអំណាង',
            cols: Q1_COLS,
            rows: Q1_ROWS,
          })
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ២',
        split: 44,
        items: ['m04q2'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 180px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 102000',
            value: ctx.val('m04q2', 'amount') || '',
            'aria-label': 'ចំនួនទឹកប្រាក់'
          });
          inp.addEventListener('input', () => ctx.setVal('m04q2', 'amount', inp.value));

          return W.stack(
            W.instr('មានផ្ទះល្វែងចំនួនបីនៅក្នុងអាគារ ដែលផ្ទះល្វែងទីមួយធំជាងគេ មានផ្ទៃដីសរុប 95 m² ផ្ទះល្វែងទីពីរ និងទីបីមានផ្ទៃដី 85 m² និង 70 m² រៀងគ្នា។ តម្លៃលក់សម្រាប់អាគារទាំងមូលគឺ 300 000 zeds។'),
            W.p('<b>តើម្ចាស់ផ្ទះល្វែងទីពីរត្រូវបង់ប្រាក់ប៉ុន្មាន zeds?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 10px 0 16px;' },
              inp,
              h('span', { style: 'font-weight: bold; color: #475569;' }, 'zeds')
            ),
            W.p('<b>ចូរបង្ហាញអំណះអំណាង ឬរបៀបគណនារបស់អ្នក ៖</b>', 'q-lead'),
            W.textarea(ctx, 'm04q2', 'steps', 'សូមបង្ហាញរបៀបគណនានៅទីនេះ...', 4)
          );
        },
        right: stimulus,
      },
    ],
  });
})();
