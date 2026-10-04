/* Unit 12 (MoEYS 2025 / PISA M555) — ការហោះហើរទៅកាន់ទីអវកាស (Space Flight)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ២៨–២៩ (ប្រធានបទទី ១២)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការហោះហើរទៅកាន់ទីអវកាស';
  const EN_TITLE = 'Space Flight';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ស្ថានីយអវកាស មៀរ៍ (Mir) ក្នុងគន្លងផែនដី'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ស្ថានីយអវកាស មៀរ៍ (Mir) ស្ថិតនៅលើគន្លងគោចរអស់រយៈពេល <b>15 ឆ្នាំ</b> ' +
      'និងវិលជុំវិញផែនដីប្រមាណ <b>86 500 ជុំ</b> អំឡុងពេលដែលវាស្ថិតនៅក្នុងទីអវកាស។<br><br>' +
      'រយៈពេលនៃការស្នាក់នៅវែងបំផុតរបស់អវកាសយានិកម្នាក់នៅក្នុងស្ថានីយ មៀរ៍ (Mir) នោះ គឺប្រហែល <b>680 ថ្ងៃ</b>។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t12_space_flight.svg',
        alt: 'ទិន្នន័យនៃការហោះហើររបស់ស្ថានីយអវកាស Mir',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក.</b> 110 ជុំ' },
    { v: 'B', html: '<b>ខ.</b> 1 100 ជុំ' },
    { v: 'C', html: '<b>គ.</b> 11 000 ជុំ' },
    { v: 'D', html: '<b>ឃ.</b> 110 000 ជុំ' },
  ];

  PISA.registerUnit({
    id: 'm12',
    no: 12,
    label: 'ប្រធានបទ ១២',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការប៉ាន់ស្មានសមាមាត្រ និងផលធៀបចំនួនជុំវិលជុំវិញផែនដី (PISA M555)។',
    questions: {
      m12q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (Multiple Choice)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => ({ A: 'ក. 110 ជុំ', B: 'ខ. 1 100 ជុំ', C: 'គ. 11 000 ជុំ', D: 'ឃ. 110 000 ជុំ' }[r.choice] || r.choice || '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'C') return { pts: 1, note: 'ត្រឹមត្រូវ (គ. 11 000 ជុំ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ គ. 11 000 ជុំ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ គ. 11 000 ជុំ</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '១. ចំនួនថ្ងៃសរុបក្នុងរយៈពេល 15 ឆ្នាំ ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;15 ឆ្នាំ × 365 ថ្ងៃ ≈ 5 475 ថ្ងៃ<br>' +
          '២. ចំនួនជុំដែលស្ថានីយវិលក្នុងមួយថ្ងៃជាមធ្យម ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;86 500 ជុំ ÷ 5 475 ថ្ងៃ ≈ 15.8 ជុំ/ថ្ងៃ<br>' +
          '៣. ចំនួនជុំប៉ាន់ស្មានក្នុងរយៈពេល 680 ថ្ងៃ ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;680 ថ្ងៃ × 15.8 ជុំ/ថ្ងៃ ≈ 10 744 ជុំ ≈ <b>11 000 ជុំ</b> (ជម្រើស <b>គ</b>)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានស្ថានីយអវកាស Mir នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១២)</b> — កូដ OECD PISA: <b>M555 (Space Flight)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m12q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលទិន្នន័យនៃការហោះហើររបស់ស្ថានីយ Mir នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>តាមការប៉ាន់ស្មាន តើអវកាសយានិកម្នាក់ហោះជុំវិញផែនដីប៉ុន្មានជុំ (អំឡុងពេលស្នាក់នៅ 680 ថ្ងៃ)?</b>', 'q-lead'),
          W.radios(ctx, 'm12q1', 'choice', Q1_OPTS)
        ),
        right: stimulus,
      },
    ],
  });
})();
