/* Unit 29 — អ្នកជិះកង់ ឌីណា (Helen the Cyclist) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ដំណើរជិះកង់របស់ ឌីណា'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ឌីណា ជិះកង់កម្សាន្ត។ កង់របស់នាងមានបំពាក់ឧបករណ៍វាស់ល្បឿន និងចម្ងាយធ្វើដំណើរ (Speedometer) ដែលបង្ហាញព័ត៌មានលម្អិតពីដំណើររបស់នាង។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t29_bicycle_racing.svg',
        alt: 'ដំណើរជិះកង់របស់ ឌីណា',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm29',
    no: 29,
    label: 'ប្រធានបទ ២៩',
    title: 'អ្នកជិះកង់ ឌីណា',
    en: 'Helen the Cyclist',
    collection: 'moeys',
    grade: 7,
    blurb: 'វិភាគល្បឿនមធ្យម រយៈពេល និងការគណនាល្បឿនជើងទៅ និងត្រឡប់មកវិញ។',
    questions: {
      m29q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') return { pts: 1, note: 'ត្រឹមត្រូវ (ល្បឿនមធ្យមទាំងពីរដូចគ្នា)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ជម្រើស ខ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (ល្បឿនមធ្យម ១០ នាទីដំបូងដូចនឹង ៥ នាទីបន្ទាប់)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• ១០ នាទីដំបូងជិះបាន 4 km → v = 4 km ÷ (10/60 h) = 24 km/h។<br>' +
          '• ៥ នាទីបន្ទាប់ជិះបាន 2 km → v = 2 km ÷ (5/60 h) = 24 km/h។<br>' +
          '• ល្បឿនមធ្យមទាំងពីរដំណាក់កាលគឺស្មើគ្នា (24 km/h)។'
      },
      m29q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'A') return { pts: 1, note: 'ត្រឹមត្រូវ (ចំណាយពេល ២០ នាទី)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ជម្រើស ក)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ក (ចំណាយពេល ២០ នាទី)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• ចម្ងាយទៅផ្ទះមីង = 6 km ក្នុងល្បឿនមធ្យម 18 km/h។<br>' +
          '• រយៈពេល t = 6 ÷ 18 h = 1/3 ម៉ោង = <b>20 នាទី</b>។'
      },
      m29q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'speed', label: 'ល្បឿនមធ្យម (km/h)' }],
        summary: (r) => (r.speed ? r.speed + ' km/h' : '—'),
        score: (r) => {
          const raw = (r.speed || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 28) return { pts: 1, note: 'ត្រឹមត្រូវ (28 km/h)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 28 km/h)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 28 km/h</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ជើងទៅ ៖ 4 km ក្នុងពេល 9 នាទី។<br>' +
          '• ជើងត្រឡប់មកវិញ ៖ 3 km ក្នុងពេល 6 នាទី។<br>' +
          '• ចម្ងាយសរុប = 4 + 3 = 7 km។<br>' +
          '• រយៈពេលសរុប = 9 + 6 = 15 នាទី = 0.25 ម៉ោង។<br>' +
          '• ល្បឿនមធ្យមសរុប = 7 km ÷ 0.25 h = <b>28 km/h</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានដំណើរជិះកង់របស់ ឌីណា នៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m29q1'],
        left: (ctx) => W.stack(
          W.instr('ឌីណា ជិះកង់បានចម្ងាយ ៤ km ក្នុងរយៈពេល ១០ នាទីដំបូង ហើយបន្ទាប់មក ២ km ក្នុងរយៈពេល ៥ នាទីបន្ទាប់។'),
          W.p('<b>តើអំណះអំណាងមួយណាត្រឹមត្រូវ?</b>', 'q-lead'),
          W.radios(ctx, 'm29q1', 'choice', [
            { v: 'A', html: 'ក. ល្បឿនមធ្យម ១០ នាទីដំបូងធំជាងល្បឿនមធ្យម ៥ នាទីបន្ទាប់' },
            { v: 'B', html: 'ខ. ល្បឿនមធ្យម ១០ នាទីដំបូងដូចនឹងល្បឿនមធ្យម ៥ នាទីបន្ទាប់' },
            { v: 'C', html: 'គ. ល្បឿនមធ្យម ១០ នាទីដំបូងតូចជាងល្បឿនមធ្យម ៥ នាទីបន្ទាប់' },
            { v: 'D', html: 'ឃ. មិនអាចប្រាប់បានពីព័ត៌មានដែលបានផ្តល់' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m29q2'],
        left: (ctx) => W.stack(
          W.instr('ឌីណា ជិះកង់ចម្ងាយ ៦ km ទៅផ្ទះមីងរបស់នាងដោយល្បឿនមធ្យម ១៨ km/h។'),
          W.p('<b>តើអំណះអំណាងមួយណាត្រឹមត្រូវ?</b>', 'q-lead'),
          W.radios(ctx, 'm29q2', 'choice', [
            { v: 'A', html: 'ក. វាបានចំណាយពេល ២០ នាទី ដើម្បីទៅដល់ផ្ទះមីងរបស់នាង' },
            { v: 'B', html: 'ខ. វាបានចំណាយពេល ៣០ នាទី ដើម្បីទៅដល់ផ្ទះមីងរបស់នាង' },
            { v: 'C', html: 'គ. វាបានចំណាយពេល ៣ ម៉ោង ដើម្បីទៅដល់ផ្ទះមីងរបស់នាង' },
            { v: 'D', html: 'ឃ. មិនអាចប្រាប់បានទេថា ឌីណា ត្រូវចំណាយពេលប៉ុន្មាន' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m29q3'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 28',
            value: ctx.val('m29q3', 'speed') || '',
            'aria-label': 'ល្បឿនមធ្យម'
          });
          inp.addEventListener('input', () => ctx.setVal('m29q3', 'speed', inp.value));

          return W.stack(
            W.instr('ឌីណា ជិះកង់ទៅមាត់ទន្លេចម្ងាយ ៤ km ក្នុងពេល ៩ នាទី ហើយត្រឡប់មកវិញតាមផ្លូវកាត់ ៣ km ក្នុងពេល ៦ នាទី។'),
            W.p('<b>គណនាល្បឿនមធ្យមសរុបគិតជា km/h ៖</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ល្បឿនមធ្យម ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'km/h')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
