/* Unit 24 — ការបើកបរកប៉ាល់ (Sailing Ships) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'កប៉ាល់ដឹកទំនិញប្រើប៉ោងខ្យល់ (NewWave)'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'កប៉ាល់ដឹកទំនិញស្ទើរតែ ៩៥% លើពិភពលោកប្រើប្រាស់ប្រេងឥន្ធនៈម៉ាស៊ូត។ វិស្វករកំពុងសិក្សាគម្រោងបំពាក់ប៉ោងខ្យល់នៅកម្ពស់ខ្ពស់លើកប៉ាល់ ដើម្បីជួយកាត់បន្ថយការប្រើប្រាស់ប្រេង។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t24_racing_car.svg',
        alt: 'កប៉ាល់ NewWave និងប៉ោងខ្យល់នៅកម្ពស់ 150m',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('p', { class: 'cba-callout', style: 'background:#eff6ff; border-left:4px solid #0284c7; padding:8px 12px; font-size:0.9rem; margin-top:8px;' },
      'ប៉ោងខ្យល់ត្រូវបានបង្ហោះដល់កម្ពស់ ១៥០ m លើនីវ៉ូដំបូលកប៉ាល់ ដែលនៅទីនោះខ្យល់បក់ខ្លាំងជាងលើផ្ទៃទឹកប្រហែល ២៥%។ ខ្សែពួរទាញកប៉ាល់ក្រោមមុំ ៤៥°។'
    )
  );

  PISA.registerUnit({
    id: 'm24',
    no: 24,
    label: 'ប្រធានបទ ២៤',
    title: 'ការបើកបរកប៉ាល់',
    en: 'Sailing Ships',
    collection: 'moeys',
    grade: 8,
    blurb: 'គណនាល្បឿនខ្យល់នៅកម្ពស់ខ្ពស់ ប្រវែងខ្សែពួរតាមត្រីកោណកែង និងរយៈពេលទូទាត់រួចថ្លៃដើម។',
    questions: {
      m24q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (A-E)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'D') return { pts: 1, note: 'ត្រឹមត្រូវ (30 km/h)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 30 km/h)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ឃ (30 km/h)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ល្បឿនខ្យល់លើដំបូលកប៉ាល់ = 24 km/h។<br>' +
          '• នៅកម្ពស់ 150 m ខ្យល់បក់ខ្លាំងជាង 25% ៖ 24 × (1 + 0.25) = 24 × 1.25 = <b>30 km/h</b>។'
      },
      m24q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') return { pts: 1, note: 'ត្រឹមត្រូវ (212 m)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 212 m)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (212 m)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ត្រីកោណកែងមានជ្រុងឈម (កម្ពស់) = 150 m និងមុំ = 45°។<br>' +
          '• ប្រវែងខ្សែពួរ (អ៊ីប៉ូតេនុស) = 150 ÷ sin(45°) = 150 × √2 ≈ 150 × 1.414 ≈ <b>212 m</b>។'
      },
      m24q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលលេខ និងពន្យល់',
        max: 1,
        parts: [{ k: 'years', label: 'ចំនួនឆ្នាំ' }],
        summary: (r) => (r.years ? r.years + ' ឆ្នាំ' : '—'),
        score: (r) => {
          const raw = (r.years || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = /8\.5|8,5|8|9/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ (ប្រហែល 8.5 ឆ្នាំ)' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ប្រហែល 8.5 ឆ្នាំ (ចន្លោះពី 8 ដល់ 9 ឆ្នាំ)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ប្រេងប្រើប្រាស់ប្រចាំឆ្នាំ = 3.5 លានលីត្រ × 0.42 zed/លីត្រ = 1 470 000 zeds។<br>' +
          '• សន្សំបាន 20% ក្នុងមួយឆ្នាំ = 1 470 000 × 0.20 = 294 000 zeds/ឆ្នាំ។<br>' +
          '• រយៈពេលទូទាត់រួចថ្លៃដើម 2 500 000 zeds ៖ 2 500 000 ÷ 294 000 ≈ <b>8.5 ឆ្នាំ</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានកប៉ាល់ប្រើប៉ោងខ្យល់នៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m24q1'],
        left: (ctx) => W.stack(
          W.instr('នៅពេលល្បឿនខ្យល់លើដំបូលកប៉ាល់មាន ២៤ km/h តើល្បឿនខ្យល់បក់ប៉ះប៉ោងខ្យល់នៅកម្ពស់ ១៥០ m មានតម្លៃប្រហែលប៉ុន្មាន?'),
          W.radios(ctx, 'm24q1', 'choice', [
            { v: 'A', html: 'ក. 6 km/h' },
            { v: 'B', html: 'ខ. 18 km/h' },
            { v: 'C', html: 'គ. 25 km/h' },
            { v: 'D', html: 'ឃ. 30 km/h' },
            { v: 'E', html: 'ង. 49 km/h' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m24q2'],
        left: (ctx) => W.stack(
          W.instr('តើខ្សែពួរដែលចងភ្ជាប់ប៉ោងខ្យល់នឹងកប៉ាល់មានប្រវែងប្រហែលប៉ុន្មានម៉ែត្រ ដើម្បីឱ្យវាទាញកប៉ាល់ក្រោមមុំ ៤៥° នៅកម្ពស់ឈរ ១៥០ m?'),
          W.radios(ctx, 'm24q2', 'choice', [
            { v: 'A', html: 'ក. 173 m' },
            { v: 'B', html: 'ខ. 212 m' },
            { v: 'C', html: 'គ. 285 m' },
            { v: 'D', html: 'ឃ. 300 m' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m24q3'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 8.5',
            value: ctx.val('m24q3', 'years') || '',
            'aria-label': 'ចំនួនឆ្នាំ'
          });
          inp.addEventListener('input', () => ctx.setVal('m24q3', 'years', inp.value));

          return W.stack(
            W.instr('ថ្លៃបំពាក់ប៉ោងខ្យល់លើកប៉ាល់ NewWave អស់ចំនួន ២ ៥០០ ០០០ zeds។ ប្រេងឥន្ធនៈមានតម្លៃ ០.៤២ zeds ក្នុង ១ លីត្រ ហើយកប៉ាល់ប្រើប្រាស់ ៣.៥ លានលីត្រ/ឆ្នាំ។ ប៉ោងខ្យល់ជួយកាត់បន្ថយប្រេង ២០%។'),
            W.p('<b>តើត្រូវចំណាយពេលប៉ុន្មានឆ្នាំដើម្បីទូទាត់រួចថ្លៃបំពាក់ឧបករណ៍?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ចំនួនឆ្នាំ ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ឆ្នាំ')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
