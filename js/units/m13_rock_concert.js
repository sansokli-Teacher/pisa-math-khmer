/* Unit 13 (MoEYS 2025 / PISA M464) — កម្មវិធីប្រគំតន្ត្រីរ៉ក់ (Rock Concert)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៣០–៣១ (ប្រធានបទទី ១៣)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'កម្មវិធីប្រគំតន្ត្រីរ៉ក់';
  const EN_TITLE = 'Rock Concert';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ទីធ្លាសម្រាប់រៀបចំកម្មវិធីប្រគំតន្ត្រីរ៉ក់'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ទីធ្លាសម្រាប់ប្រារព្ធកម្មវិធីប្រគំតន្ត្រីរ៉ក់មួយកន្លែង មានរាងជាចតុកោណកែង មានវិមាត្រ <b>100 m × 50 m</b> ' +
      'ត្រូវបានគេរៀបចំឡើងសម្រាប់ទទួលទស្សនិកជនអញ្ជើញមកចូលទស្សនា។<br><br>' +
      'សំបុត្រសម្រាប់ចូលទស្សនាត្រូវបានគេលក់អស់ ហើយទីធ្លាទាំងមូលមានអ្នកឈរទស្សនាពេញទាំងអស់។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t13_rock_concert.svg',
        alt: 'ប្លង់ទីធ្លាកម្មវិធីប្រគំតន្ត្រីរ៉ក់',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក.</b> 2 000 នាក់' },
    { v: 'B', html: '<b>ខ.</b> 5 000 នាក់' },
    { v: 'C', html: '<b>គ.</b> 20 000 នាក់' },
    { v: 'D', html: '<b>ឃ.</b> 50 000 នាក់' },
    { v: 'E', html: '<b>ង.</b> 100 000 នាក់' },
  ];

  PISA.registerUnit({
    id: 'm13',
    no: 13,
    label: 'ប្រធានបទ ១៣',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការគណនាផ្ទៃក្រឡា និងការប៉ាន់ស្មានដង់ស៊ីតេទស្សនិកជន (PISA M464)។',
    questions: {
      m13q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (Multiple Choice)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => ({ A: '2 000 នាក់', B: '5 000 នាក់', C: '20 000 នាក់', D: '50 000 នាក់', E: '100 000 នាក់' }[r.choice] || r.choice || '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'C') return { pts: 1, note: 'ត្រឹមត្រូវ (គ. 20 000 នាក់)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ គ. 20 000 នាក់)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ គ. 20 000 នាក់</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '១. ផ្ទៃក្រឡាសរុបនៃទីធ្លាប្រគំតន្ត្រី ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;100 m × 50 m = <b>5 000 m²</b><br>' +
          '២. ដង់ស៊ីតេមនុស្សឈរពេញណែនក្នុងការប្រគំតន្ត្រី ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;ជាទូទៅមនុស្សឈរពេញមានដង់ស៊ីតេប្រហែល <b>4 នាក់ ក្នុង 1 m²</b><br>' +
          '៣. ចំនួនទស្សនិកជនប៉ាន់ស្មាន ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;5 000 m² × 4 នាក់/m² = <b>20 000 នាក់</b> (ត្រូវនឹងជម្រើស <b>គ</b>)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលប្លង់ទីធ្លាកម្មវិធីប្រគំតន្ត្រី នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៣)</b> — កូដ OECD PISA: <b>M464 (Rock Concert)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m13q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលទំហំវិមាត្រនៃទីធ្លាប្រគំតន្ត្រីនៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>តាមតួលេខខាងក្រោមនេះ តើតួលេខមួយណាត្រូវបានគេប៉ាន់ស្មានចំនួនទស្សនិកជនសរុប ដែលបានមកចូលរួមទស្សនាការប្រគំតន្ត្រីនោះ?</b>', 'q-lead'),
          W.radios(ctx, 'm13q1', 'choice', Q1_OPTS)
        ),
        right: stimulus,
      },
    ],
  });
})();
