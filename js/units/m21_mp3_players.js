/* Unit M21 — ម៉ាស៊ីនចាក់ MP3 (MP3 Players)
 * Source: MoEYS PISA 2025 Sample Items (2Math-PISA-Sample-Items.pdf, pages 56–59, Topic 21)
 * Original PISA Items: M445 / PM924 (Q1, Q2, Q3)
 * Grade Level: 7–8
 * Sub-discipline: ចំនួន និង ពីជគណិត (Quantity & Algebra)
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ម៉ាស៊ីនចាក់ MP3';
  const YES_NO = [
    { v: 'Y', html: 'បាទ/ចាស', label: 'បាទ/ចាស' },
    { v: 'N', html: 'ទេ', label: 'ទេ' },
  ];
  const ynText = { Y: 'បាទ/ចាស', N: 'ទេ' };
  const ynSummary = (r, n) => Array.from({ length: n }, (_, i) => ynText[r[i]] || '—').join(' / ');

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក.</b> នាងបានបញ្ចូលតម្លៃទំនិញណាមួយពីរដង។' },
    { v: 'B', html: '<b>ខ.</b> នាងភ្លេចបញ្ចូលតម្លៃណាមួយក្នុងចំណោមតម្លៃទាំងបី។' },
    { v: 'C', html: '<b>គ.</b> នាងបានភ្លេចបញ្ចូលខ្ទង់ចុងក្រោយនៃតម្លៃមួយ (បន្សល់ទុកលេខចុងក្រោយ)។' },
    { v: 'D', html: '<b>ឃ.</b> នាងបានច្រឡំដកតម្លៃណាមួយ។' },
  ];
  const Q1_NAMES = {
    A: 'ក. បញ្ចូលតម្លៃទំនិញណាមួយពីរដង',
    B: 'ខ. ភ្លេចបញ្ចូលតម្លៃណាមួយក្នុងចំណោមតម្លៃទាំងបី',
    C: 'គ. ភ្លេចបញ្ចូលខ្ទង់ចុងក្រោយនៃតម្លៃមួយ',
    D: 'ឃ. ច្រឡំដកតម្លៃណាមួយ',
  };

  const Q2_ROWS = [
    'ម៉ាស៊ីនចាក់ MP3 និងកាស',
    'ម៉ាស៊ីនចាក់ MP3 និងឧបករណ៍បំពងសំឡេង',
    'ឧបករណ៍ទាំង ៣ — ម៉ាស៊ីនចាក់ MP3 កាស និងឧបករណ៍បំពងសំឡេង',
  ];
  const Q2_KEY = ['Y', 'Y', 'N'];

  const Q3_ROWS = [
    '\\(s = w + 0.375\\)',
    '\\(w = s - 0.375s\\)',
    '\\(s = 1.375w\\)',
    '\\(w = 0.625s\\)',
  ];
  const Q3_KEY = ['N', 'N', 'Y', 'N'];

  // Reusable stimulus component with enhanced, high-definition colored products
  function stimulus() {
    return W.stack(
      h('div', { class: 'stimulus-card', style: 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);' },
        h('div', { style: 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px;' },
          h('h3', { style: 'margin: 0; font-size: 1.1rem; color: #1e3a8a; font-weight: 700; display: flex; align-items: center; gap: 8px;' },
            h('span', { style: 'font-size: 1.3rem;' }, '🎵'),
            'ពិភពជំនាញនៃតន្ត្រី — Music City'
          ),
          h('span', { style: 'background: #e0f2fe; color: #0369a1; font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid #bae6fd;' }, 'តារាងតម្លៃទំនិញ (MP3)')
        ),
        
        // 3-Column Modern Product Showcase
        h('div', { style: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 14px;' },
          // Col 1: MP3 Player
          h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;' },
            h('div', { style: 'font-weight: 700; color: #1e293b; font-size: 0.95rem; margin-bottom: 6px;' }, 'ម៉ាស៊ីនចាក់ MP3'),
            h('div', { style: 'height: 125px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #ffffff; border-radius: 6px; padding: 4px;' },
              h('img', {
                src: 'assets/moeys/t21_item_mp3.jpg',
                alt: 'ម៉ាស៊ីនចាក់ MP3',
                style: 'max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 4px;'
              })
            ),
            h('div', { style: 'background: #eff6ff; color: #1d4ed8; font-weight: 800; font-size: 1.05rem; padding: 6px 4px; border-radius: 6px; border: 1px solid #bfdbfe;' }, '155 zeds')
          ),
          // Col 2: Headphones
          h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between;' },
            h('div', { style: 'font-weight: 700; color: #1e293b; font-size: 0.95rem; margin-bottom: 6px;' }, 'កាស (Headphones)'),
            h('div', { style: 'height: 125px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #ffffff; border-radius: 6px; padding: 4px;' },
              h('img', {
                src: 'assets/moeys/t21_item_headphones.jpg',
                alt: 'កាស',
                style: 'max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 4px;'
              })
            ),
            h('div', { style: 'background: #eff6ff; color: #1d4ed8; font-weight: 800; font-size: 1.05rem; padding: 6px 4px; border-radius: 6px; border: 1px solid #bfdbfe;' }, '86 zeds')
          ),
          // Col 3: Speakers
          h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between;' },
            h('div', { style: 'font-weight: 700; color: #1e293b; font-size: 0.92rem; margin-bottom: 6px;' }, 'ឧបករណ៍បំពងសំឡេង'),
            h('div', { style: 'height: 125px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #ffffff; border-radius: 6px; padding: 4px;' },
              h('img', {
                src: 'assets/moeys/t21_item_speakers.jpg',
                alt: 'ឧបករណ៍បំពងសំឡេង',
                style: 'max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 4px;'
              })
            ),
            h('div', { style: 'background: #eff6ff; color: #1d4ed8; font-weight: 800; font-size: 1.05rem; padding: 6px 4px; border-radius: 6px; border: 1px solid #bfdbfe;' }, '79 zeds')
          )
        ),

        // Original Scan Comparison Accordion
        h('details', { style: 'margin-top: 10px; font-size: 0.82rem; color: #64748b; background: #f8fafc; padding: 6px 10px; border-radius: 6px; border: 1px dashed #cbd5e1;' },
          h('summary', { style: 'cursor: pointer; font-weight: 500;' }, 'មើលរូបភាពដើមដកស្រង់ពីសៀវភៅ PISA (ស-ខ្មៅ)'),
          h('div', { style: 'margin-top: 8px; text-align: center;' },
            h('img', {
              src: 'assets/moeys/t21_mp3_prices.jpg',
              alt: 'រូបភាពដើមពីសៀវភៅ',
              style: 'max-width: 100%; height: auto; border-radius: 4px; border: 1px solid #e2e8f0;'
            })
          )
        )
      )
    );
  }

  PISA.registerUnit({
    id: 'm21',
    no: 21,
    title: TITLE,
    en: 'MP3 Players',
    collection: 'moeys',
    badge: 'ប្រធានបទ ២១',
    blurb: 'ការគណនាតម្លៃទំនិញ ភាគរយបញ្ចុះតម្លៃ និងរូបមន្តតម្លៃលក់ដុំធៀបនឹងតម្លៃលក់រាយ។',
    questions: {
      m21q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរពហុជ្រើសរើស',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => Q1_NAMES[r.choice] || '—',
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          return r.choice === 'C'
            ? { pts: 1, note: 'ត្រឹមត្រូវ (គ)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>គ. នាងបានភ្លេចបញ្ចូលខ្ទង់ចុងក្រោយនៃតម្លៃមួយ</b> (បន្សល់ទុកលេខចុងក្រោយ)។<br><br>' +
          '<b>ការពន្យល់លម្អិត៖</b><br>' +
          'ផលបូកត្រឹមត្រូវនៃតម្លៃទំនិញទាំងបីគឺ៖<br>' +
          '\\[155 + 86 + 79 = 320\\text{ zeds}\\]<br>' +
          'ប៉ុន្តែលទ្ធផលដែល គន្ធា ទទួលបាននៅលើម៉ាស៊ីនគិតលេខគឺ <b>248</b>។<br>' +
          'សាកល្បងពិនិត្យករណីនាងភ្លេចចុចលេខ 9 នៃតម្លៃ 79 (គឺវាយត្រឹមតែលេខ 7)៖<br>' +
          '\\[155 + 86 + 7 = 248\\]<br>' +
          'ដែលត្រូវគ្នានឹងកំហុស «ភ្លេចបញ្ចូលខ្ទង់ចុងក្រោយនៃតម្លៃមួយ»។<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ជ្រើសរើស គ<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
      m21q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរចម្លើយឆ្លាស់ (បាទ/ចាស ឬ ទេ)',
        max: 1,
        parts: [0, 1, 2].map((i) => ({ k: String(i), label: Q2_ROWS[i] })),
        summary: (r) => ynSummary(r, 3),
        score: (r) => {
          const ans = [r[0], r[1], r[2]];
          if (ans.every((a) => !a)) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = Q2_KEY.every((v, i) => r[i] === v);
          return ok
            ? { pts: 1, note: 'ត្រឹមត្រូវ (បាទ/ចាស, បាទ/ចាស, ទេ)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>បាទ/ចាស, បាទ/ចាស, ទេ</b> តាមលំដាប់។<br><br>' +
          '<b>ការពន្យល់លម្អិត៖</b><br>' +
          'កម្មវិធីបញ្ចុះតម្លៃ 20% មានន័យថាតម្លៃត្រូវបង់គឺ \\(100\\% - 20\\% = 80\\% = 0.8\\) នៃតម្លៃដើម។ ' +
          'សំបូរ មានថវិកាចំនួន <b>200 zeds</b>។<br>' +
          '• <b>ម៉ាស៊ីនចាក់ MP3 និងកាស៖</b><br>' +
          '  តម្លៃដើម \\(155 + 86 = 241\\text{ zeds}\\)។ បញ្ចុះតម្លៃ 20% នៅសល់ \\(241 \\times 0.8 = 192.8\\text{ zeds} \\le 200\\text{ zeds}\\) → <b>បាទ/ចាស</b> (អាចទិញបាន)<br>' +
          '• <b>ម៉ាស៊ីនចាក់ MP3 និងឧបករណ៍បំពងសំឡេង៖</b><br>' +
          '  តម្លៃដើម \\(155 + 79 = 234\\text{ zeds}\\)។ បញ្ចុះតម្លៃ 20% នៅសល់ \\(234 \\times 0.8 = 187.2\\text{ zeds} \\le 200\\text{ zeds}\\) → <b>បាទ/ចាស</b> (អាចទិញបាន)<br>' +
          '• <b>ឧបករណ៍ទាំង ៣ (MP3, កាស និងឧបករណ៍បំពងសំឡេង)៖</b><br>' +
          '  តម្លៃដើម \\(155 + 86 + 79 = 320\\text{ zeds}\\)។ បញ្ចុះតម្លៃ 20% នៅសល់ \\(320 \\times 0.8 = 256\\text{ zeds} > 200\\text{ zeds}\\) → <b>ទេ</b> (មិនអាចទិញបាន)<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ចម្លើយត្រឹមត្រូវទាំងបី៖ បាទ/ចាស, បាទ/ចាស, ទេ<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
      m21q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរចម្លើយឆ្លាស់ (បាទ/ចាស ឬ ទេ)',
        max: 1,
        parts: [0, 1, 2, 3].map((i) => ({ k: String(i), label: 'រូបមន្ត ' + (i + 1) })),
        summary: (r) => ynSummary(r, 4),
        score: (r) => {
          const ans = [r[0], r[1], r[2], r[3]];
          if (ans.every((a) => !a)) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = Q3_KEY.every((v, i) => r[i] === v);
          return ok
            ? { pts: 1, note: 'ត្រឹមត្រូវ (ទេ, ទេ, បាទ/ចាស, ទេ)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ទេ, ទេ, បាទ/ចាស, ទេ</b> តាមលំដាប់។<br><br>' +
          '<b>ការពន្យល់លម្អិត៖</b><br>' +
          'ប្រាក់ចំណេញត្រូវបានគណនាជាភាគរយ 37.5% នៃតម្លៃលក់ដុំ \\(w\\)។ ដូច្នេះ៖<br>' +
          '\\[\\text{តម្លៃលក់រាយ } s = \\text{តម្លៃលក់ដុំ } w + \\text{ប្រាក់ចំណេញ}\\]<br>' +
          '\\[s = w + 37.5\\% \\times w = w + 0.375w = (1 + 0.375)w = 1.375w\\]<br>' +
          'ពិនិត្យរូបមន្តនីមួយៗ៖<br>' +
          '1. \\(s = w + 0.375\\) ៖ <b>ទេ</b> (0.375 ត្រូវគុណនឹង \\(w\\))<br>' +
          '2. \\(w = s - 0.375s\\) ៖ <b>ទេ</b> (37.5% គិតលើ \\(w\\) មិនមែនលើ \\(s\\) ទេ)<br>' +
          '3. \\(s = 1.375w\\) ៖ <b>បាទ/ចាស</b> (ត្រូវតាមរូបមន្តខាងលើ)<br>' +
          '4. \\(w = 0.625s\\) ៖ <b>ទេ</b> (\\(w = \\frac{s}{1.375} \\approx 0.727s \\ne 0.625s\\))<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ចម្លើយត្រឹមត្រូវទាំងបួន៖ ទេ, ទេ, បាទ/ចាស, ទេ<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 42,
        left: () => W.stack(
          W.instr('សូមអានព័ត៌មានអំពី «ម៉ាស៊ីនចាក់ MP3» នៅខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; margin-top: 10px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ២១)</b> របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ)។<br><br>' +
              'អ្នកអាចប្រើប្រាស់<b>ម៉ាស៊ីនគិតលេខ</b>នៅលើរបារឧបករណ៍ខាងលើបាន ពេលកំពុងដោះស្រាយសំណួរ។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 42,
        items: ['m21q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលតារាងតម្លៃនៅផ្ទាំងខាងស្ដាំ។ សូមជ្រើសរើសចម្លើយមួយដែលត្រឹមត្រូវ។'),
          W.p('គន្ធា បានបន្ថែមតម្លៃសម្រាប់ម៉ាស៊ីនចាក់ MP3 កាស និងឧបករណ៍បំពងសំឡេងនៅលើម៉ាស៊ីនគិតលេខរបស់នាង។'),
          h('div', { style: 'display: flex; align-items: center; gap: 12px; margin: 8px 0 14px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 6px;' },
            h('span', { style: 'font-size: 0.92rem; color: #475569;' }, 'អេក្រង់ម៉ាស៊ីនគិតលេខរបស់នាងបង្ហាញ៖'),
            h('div', { style: 'background: #cbd5e1; border: 2px solid #64748b; border-radius: 4px; padding: 2px 10px; font-family: monospace; font-size: 1.4rem; font-weight: 700; color: #0f172a; letter-spacing: 2px;' }, '248')
          ),
          W.p('ចម្លើយរបស់ គន្ធា គឺមិនត្រឹមត្រូវទេ។ នាងបានធ្វើឱ្យមានកំហុសមួយក្នុងចំណោមកំហុសខាងក្រោម។'),
          W.p('<b>តើនាងបានធ្វើកំហុសមួយណា?</b>', 'q-lead'),
          W.radios(ctx, 'm21q1', 'choice', Q1_OPTS)
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 42,
        items: ['m21q2'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៅផ្ទាំងខាងស្ដាំ។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('ហាងម្ញូស៊ីកស៊ីធី (Music City) មានកម្មវិធីលក់បញ្ចុះតម្លៃ។ នៅពេលអ្នកទិញទំនិញពីរ ឬច្រើនមុខនៅក្នុងកម្មវិធីលក់នេះ ហាងម្ញូស៊ីកស៊ីធី (Music City) នឹង<b>បញ្ចុះតម្លៃ 20%</b> នៃតម្លៃលក់ធម្មតា។'),
          W.p('<b>សំបូរ មាន 200 zeds ដើម្បីចំណាយ។ តើគាត់មានលទ្ធភាពទិញបានអ្វីខ្លះ?</b>', 'q-lead'),
          W.p('ចូរគូសរង្វង់ជុំវិញពាក្យ «បាទ/ចាស» ឬ «ទេ» សម្រាប់ជម្រើសនីមួយៗខាងក្រោម៖', 'hint'),
          W.choiceTable(ctx, 'm21q2', {
            head: 'ឧបករណ៍ ឬទំនិញ',
            cols: YES_NO,
            rows: Q2_ROWS,
          })
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 42,
        items: ['m21q3'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៅផ្ទាំងខាងស្ដាំ។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('តម្លៃលក់រាយនៃ MP3 បានគិតបញ្ចូលប្រាក់ចំណេញ <b>37.5%</b> ។ ចំពោះតម្លៃលក់ដុំវិញ គេមិនគិតបញ្ចូលប្រាក់ចំណេញនេះទេ។'),
          W.p('ប្រាក់ចំណេញត្រូវបានគណនាជាភាគរយនៃតម្លៃលក់ដុំ។'),
          W.p('<b>តើរូបមន្តមួយណាត្រឹមត្រូវ ដែលបង្ហាញពីទំនាក់ទំនងរវាងតម្លៃលក់ដុំ \\(w\\) និងតម្លៃលក់រាយ \\(s\\)?</b>', 'q-lead'),
          W.p('ចូរគូសរង្វង់ជុំវិញពាក្យ «បាទ/ចាស» ឬ «ទេ» សម្រាប់រូបមន្តនីមួយៗខាងក្រោម៖', 'hint'),
          W.choiceTable(ctx, 'm21q3', {
            head: 'រូបមន្ត',
            cols: YES_NO,
            rows: Q3_ROWS,
          })
        ),
        right: stimulus,
      },
    ],
  });
})();
