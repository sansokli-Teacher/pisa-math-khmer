/* Unit 16 (MoEYS 2025 / PISA M446) — ឧបករណ៍ដែលខូច (Faulty Devices)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៣៧–៤១ (ប្រធានបទទី ១៦)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ឧបករណ៍ដែលខូច';
  const EN_TITLE = 'Faulty Devices';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ទិន្នន័យឧបករណ៍ខូចប្រចាំថ្ងៃនៃក្រុមហ៊ុនទាំងពីរ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ក្រុមហ៊ុន អេឡិចទ្រិក (Electrix) និង ត្រូនីច (Tronics) ផលិតឧបករណ៍ចាក់វីដេអូ និងឧបករណ៍ចាក់សំឡេង។ ' +
      'នៅចុងបញ្ចប់នៃដំណើរការផលិតកម្មប្រចាំថ្ងៃ ឧបករណ៍ត្រូវបានធ្វើតេស្ត ហើយឧបករណ៍ដែលមានបញ្ហា ត្រូវបានដកចេញ និងបញ្ជូនទៅជួសជុល។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t16_faulty_devices.svg',
        alt: 'តារាងប្រៀបធៀបឧបករណ៍ខូចរវាងក្រុមហ៊ុន Electrix និង Tronics',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_ROWS = [
    'ក្រុមហ៊ុន Electrix ផលិតឧបករណ៍ចាក់វីដេអូច្រើនជាងក្រុមហ៊ុន Tronics។',
    'ក្រុមហ៊ុន Tronics មានភាគរយខូចនៃឧបករណ៍ចាក់សំឡេងខ្ពស់ជាងក្រុមហ៊ុន Electrix។',
    'ក្នុងចំណោមឧបករណ៍ទាំងអស់ដែលផលិតដោយ Electrix ឧបករណ៍ចាក់សំឡេងមានចំនួនច្រើនជាងឧបករណ៍ចាក់វីដេអូ។',
  ];

  PISA.registerUnit({
    id: 'm16',
    no: 16,
    label: 'ប្រធានបទ ១៦',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការវិភាគភាគរយនៃបរិមាណខុសគ្នា និងការគណនាអត្រាខូចរួម (PISA M446)។',
    questions: {
      m16q1: {
        label: 'សំណួរ ១',
        format: 'តារាងចម្លើយឆ្លាស់ (បាទ/ចាស ឬ ទេ)',
        max: 1,
        parts: [{ k: '0', label: 'ប្រយោគ ១' }, { k: '1', label: 'ប្រយោគ ២' }, { k: '2', label: 'ប្រយោគ ៣' }],
        summary: (r) => [0, 1, 2].map(i => ({ Y: 'បាទ/ចាស', N: 'ទេ' }[r[i]] || '—')).join(' / '),
        score: (r) => {
          const vals = [r['0'], r['1'], r['2']];
          if (vals.every(v => !v)) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          // Key: ទេ, ទេ, បាទ/ចាស (N, N, Y)
          if (vals[0] === 'N' && vals[1] === 'N' && vals[2] === 'Y') {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (ទេ, ទេ, បាទ/ចាស)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ៖ ទេ, ទេ, បាទ/ចាស)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ទេ, ទេ, បាទ/ចាស</b><br>' +
          '• ប្រយោគ ១ ៖ <b>ទេ</b> (Electrix ផលិត 2 000 តិចជាង Tronics ផលិត 7 000)។<br>' +
          '• ប្រយោគ ២ ៖ <b>ទេ</b> (Tronics ខូច 2% ទាបជាង Electrix ខូច 3%)។<br>' +
          '• ប្រយោគ ៣ ៖ <b>បាទ/ចាស</b> (Electrix ផលិតសំឡេង 6 000 ច្រើនជាងវីដេអូ 2 000)។',
      },

      m16q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរពន្យល់',
        max: 1,
        parts: [{ k: 'explanation', label: 'ការពន្យល់' }],
        summary: (r) => r.explanation || '—',
        score: (r) => {
          const raw = (r.explanation || '').trim().toLowerCase();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Key insight: 5% of 2000 = 100 video players, but 3% of 6000 = 180 audio players.
          // 100 < 180, so fewer video players are sent to repair than audio players!
          const mentions100 = /100/.test(raw);
          const mentions180 = /180/.test(raw);
          const mentionsTotalCalc = /2000.*5%|5%.*2000|6000.*3%|3%.*6000/.test(raw);

          if ((mentions100 && mentions180) || mentionsTotalCalc) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (5% នៃ 2000 = 100 តិចជាង 3% នៃ 6000 = 180)' };
          }
          if (/ចំនួនសរុប|ផលិត|ច្រើនជាង|តិចជាង|បរិមាណ/.test(raw)) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (បានកត់សម្គាល់ពីភាពខុសគ្នានៃចំនួនផលិត ប៉ុន្តែខ្វះការគណនាលេខជាក់លាក់)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ត្រូវបង្ហាញថា 5% នៃ 2000 = 100 តិចជាង 3% នៃ 6000 = 180)' };
        },
        key: '<b>ការពន្យល់ត្រឹមត្រូវ ៖</b><br>' +
          'អ្នកធ្វើតេស្តអះអាងមិនត្រឹមត្រូវទេ ពីព្រោះ ៖<br>' +
          '• ចំនួនឧបករណ៍ចាក់វីដេអូដែលខូច ៖ 5% នៃ 2 000 = <b>100 គ្រឿង</b><br>' +
          '• ចំនួនឧបករណ៍ចាក់សំឡេងដែលខូច ៖ 3% នៃ 6 000 = <b>180 គ្រឿង</b><br>' +
          'ដោយសារ 100 < 180 ដូច្នេះចំនួនឧបករណ៍ចាក់សំឡេងដែលត្រូវបញ្ជូនទៅជួសជុលជាក់ស្តែង មានច្រើនជាងឧបករណ៍ចាក់វីដេអូ។',
      },

      m16q3: {
        label: 'សំណួរ ៣',
        format: 'សំណើរើស និងគណនា',
        max: 1,
        parts: [
          { k: 'company', label: 'ក្រុមហ៊ុនដែលមានភាគរយខូចទាបជាង' },
          { k: 'calc', label: 'ការបង្ហាញការគណនា' },
        ],
        summary: (r) => (r.company || '—') + (r.calc ? ' · ' + r.calc : ''),
        score: (r) => {
          const comp = (r.company || '').trim().toLowerCase();
          const calc = (r.calc || '').trim().toLowerCase();
          const all = comp + ' ' + calc;

          if (!comp && !calc) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Electrix: Total = 2000 + 6000 = 8000. Faulty = 100 + 180 = 280. Rate = 280 / 8000 = 3.5%
          // Tronics: Total = 7000 + 1000 = 8000. Faulty = (4% of 7000) + (2% of 1000) = 280 + 20 = 300. Rate = 300 / 8000 = 3.75%
          // Lower company: Electrix (3.5% < 3.75%)
          const choosesElectrix = /electrix|អេឡិច/.test(all);
          const has3_5 = /3\.5%|3,5%|280/.test(all);
          const has3_75 = /3\.75%|3,75%|300/.test(all);

          if (choosesElectrix && (has3_5 || has3_75)) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (ក្រុមហ៊ុន Electrix មានអត្រាខូចរួម 3.5% ទាបជាង Tronics ដែលមាន 3.75%)' };
          }
          if (choosesElectrix) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ជ្រើសរើស Electrix ត្រឹមត្រូវ ប៉ុន្តែខ្វះការបង្ហាញភាគរយ 3.5% និង 3.75%)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ក្រុមហ៊ុន Electrix មានអត្រាខូចរួម 3.5% ទាបជាងក្រុមហ៊ុន Tronics 3.75%)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ក្រុមហ៊ុន អេឡិចទ្រិក (Electrix)</b><br><br>' +
          '<b>របៀបគណនាអត្រាខូចរួម ៖</b><br>' +
          '• <b>ក្រុមហ៊ុន Electrix ៖</b><br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- ផលិតសរុប ៖ 2 000 + 6 000 = 8 000 គ្រឿង<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- ខូចសរុប ៖ (5% នៃ 2 000) + (3% នៃ 6 000) = 100 + 180 = 280 គ្រឿង<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- អត្រាខូចរួម ៖ 280 / 8 000 = <b>3.5%</b><br><br>' +
          '• <b>ក្រុមហ៊ុន Tronics ៖</b><br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- ផលិតសរុប ៖ 7 000 + 1 000 = 8 000 គ្រឿង<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- ខូចសរុប ៖ (4% នៃ 7 000) + (2% នៃ 1 000) = 280 + 20 = 300 គ្រឿង<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;- អត្រាខូចរួម ៖ 300 / 8 000 = <b>3.75%</b><br><br>' +
          'ដោយសារ 3.5% < 3.75% ដូច្នេះ <b>ក្រុមហ៊ុន Electrix</b> មានភាគរយទាបជាង។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលតារាងទិន្នន័យឧបករណ៍ខូច នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៦)</b> — កូដ OECD PISA: <b>M446 (Faulty Devices)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m16q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលតារាងទិន្នន័យនៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>ចូរជ្រើសរើសពាក្យ «បាទ/ចាស» ឬ «ទេ» សម្រាប់ប្រយោគនីមួយៗខាងក្រោមនេះ ៖</b>', 'q-lead'),
          W.choiceTable(ctx, 'm16q1', {
            head: 'ប្រយោគអំណះអំណាង',
            cols: [{ v: 'Y', html: 'បាទ/ចាស' }, { v: 'N', html: 'ទេ' }],
            rows: Q1_ROWS,
          })
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m16q2'],
        left: (ctx) => W.stack(
          W.instr('អ្នកធ្វើតេស្តម្នាក់នៅក្រុមហ៊ុន Electrix បាននិយាយថា៖ «ដោយសារភាគរយខូចនៃឧបករណ៍ចាក់វីដេអូគឺ 5% ធំជាងភាគរយខូចនៃឧបករណ៍ចាក់សំឡេង 3% ដូច្នេះឧបករណ៍ចាក់វីដេអូត្រូវបានបញ្ជូនទៅជួសជុលច្រើនជាងឧបករណ៍ចាក់សំឡេង»។'),
          W.p('<b>ចូរបង្ហាញ និងពន្យល់ថាហេតុអ្វីបានជាការអះអាងរបស់អ្នកធ្វើតេស្តនេះ មិនត្រឹមត្រូវ ៖</b>', 'q-lead'),
          W.textarea(ctx, 'm16q2', 'explanation', 'សូមបង្ហាញការគណនាចំនួនគ្រឿងខូចជាក់ស្តែងនៅទីនេះ...', 5)
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m16q3'],
        left: (ctx) => W.stack(
          W.instr('ពិចារណាលើផលិតផលសរុប (ទាំងឧបករណ៍ចាក់វីដេអូ និងឧបករណ៍ចាក់សំឡេង) នៃក្រុមហ៊ុននីមួយៗ។'),
          W.p('<b>តើក្រុមហ៊ុនមួយណាមានភាគរយខូចរួមទាបជាងគេ?</b>', 'q-lead'),
          W.radios(ctx, 'm16q3', 'company', [
            { v: 'electrix', html: '<b>ក្រុមហ៊ុន អេឡិចទ្រិក (Electrix)</b>' },
            { v: 'tronics', html: '<b>ក្រុមហ៊ុន ត្រូនីច (Tronics)</b>' },
          ]),
          h('div', { style: 'margin-top: 14px;' },
            W.p('<b>ចូរបង្ហាញការគណនារបស់អ្នកដោយប្រើទិន្នន័យក្នុងតារាង ៖</b>', 'q-lead'),
            W.textarea(ctx, 'm16q3', 'calc', 'សូមបង្ហាញរបៀបគណនាភាគរយខូចរួមនៃក្រុមហ៊ុនទាំងពីរ...', 5)
          )
        ),
        right: stimulus,
      },
    ],
  });
})();
