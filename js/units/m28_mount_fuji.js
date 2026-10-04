/* Unit 28 — ការឡើងភ្នំហ្វូជី (Climbing Mount Fuji) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ផ្លូវឡើងភ្នំហ្វូជី (Gotemba Trail)'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ភ្នំហ្វូជី (Mount Fuji) បើកទទួលអ្នកឡើងភ្នំតែក្នុងរដូវក្តៅ ចាប់ពីថ្ងៃទី ១ ខែកក្កដា ដល់ថ្ងៃទី ២៧ ខែសីហា (៥៨ ថ្ងៃ)។ មនុស្សប្រហែល ២០០ ០០០ នាក់បានឡើងភ្នំហ្វូជីក្នុងអំឡុងពេលនេះ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t28_mount_fuji.svg',
        alt: 'ផ្លូវឡើងភ្នំហ្វូជី Gotemba Trail',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm28',
    no: 28,
    label: 'ប្រធានបទ ២៨',
    title: 'ការឡើងភ្នំហ្វូជី',
    en: 'Climbing Mount Fuji',
    collection: 'moeys',
    grade: 8,
    blurb: 'គណនាមធ្យមភាគអ្នកឡើងភ្នំប្រចាំថ្ងៃ កាលវិភាគពេលចេញដំណើរចុងក្រោយ និងប្រវែងជំហានមធ្យម។',
    questions: {
      m28q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (A-E)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'C') return { pts: 1, note: 'ត្រឹមត្រូវ (3400 នាក់)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 3400 នាក់)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ គ (3400 នាក់)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• រយៈពេលសរុប = 58 ថ្ងៃ។<br>' +
          '• ចំនួនមនុស្សឡើងជាមធ្យមក្នុងមួយថ្ងៃ = 200 000 ÷ 58 ≈ <b>3 448 នាក់ (ជម្រើសគ 3400)</b>។'
      },
      m28q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរបញ្ចូលម៉ោង',
        max: 1,
        parts: [{ k: 'time', label: 'ម៉ោងចេញដំណើរ' }],
        summary: (r) => (r.time ? r.time : '—'),
        score: (r) => {
          const raw = (r.time || '').toLowerCase();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = /11|11:00|11am|11\s*ព្រឹក/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ (ម៉ោង 11:00 am)' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ម៉ោង 11:00 am (11 ព្រឹក)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ពេលដើរឡើង 9 km ក្នុងល្បឿន 1.5 km/h = 6 ម៉ោង។<br>' +
          '• ពេលដើរចុះ 9 km ក្នុងល្បឿន 3.0 km/h = 3 ម៉ោង។<br>' +
          '• រយៈពេលសរុប = 6 + 3 = 9 ម៉ោង។<br>' +
          '• ត្រឡប់មកដល់ត្រឹមម៉ោង 8:00 pm (20:00) ៖ 20:00 - 9 ម៉ោង = <b>ម៉ោង 11:00 am</b>។'
      },
      m28q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'step', label: 'ប្រវែងជំហាន (cm)' }],
        summary: (r) => (r.step ? r.step + ' cm' : '—'),
        score: (r) => {
          const raw = (r.step || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseFloat(PISA.latin(raw).replace(/[^0-9.]/g, ''));
          if (num === 40 || num === 0.4) return { pts: 1, note: 'ត្រឹមត្រូវ (40 cm)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 40 cm)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 40 cm (ឬ 0.4 m)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ចម្ងាយ 9 km = 900 000 cm។<br>' +
          '• ចំនួនជំហាន = 22 500 ជំហាន។<br>' +
          '• ប្រវែងជំហានមធ្យម = 900 000 ÷ 22 500 = <b>40 cm</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានអំពីការឡើងភ្នំហ្វូជីនៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m28q1'],
        left: (ctx) => W.stack(
          W.instr('តើជាមធ្យមមានមនុស្សប៉ុន្មាននាក់ឡើងភ្នំហ្វូជី ក្នុងមួយថ្ងៃក្នុងអំឡុងពេល ៥៨ ថ្ងៃនោះ?'),
          W.radios(ctx, 'm28q1', 'choice', [
            { v: 'A', html: 'ក. 340 នាក់' },
            { v: 'B', html: 'ខ. 710 នាក់' },
            { v: 'C', html: 'គ. 3400 នាក់' },
            { v: 'D', html: 'ឃ. 7100 នាក់' },
            { v: 'E', html: 'ង. 7400 នាក់' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m28q2'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 150px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 11:00 am',
            value: ctx.val('m28q2', 'time') || '',
            'aria-label': 'ម៉ោងចេញដំណើរចុងក្រោយ'
          });
          inp.addEventListener('input', () => ctx.setVal('m28q2', 'time', inp.value));

          return W.stack(
            W.instr('តូរ៉ា ប៉ាន់ស្មានថាគាត់ដើរឡើងភ្នំក្នុងល្បឿនមធ្យម ១.៥ km/h ហើយដើរចុះមកវិញក្នុងល្បឿនលឿនជាង ២ ដង (៣.០ km/h)។'),
            W.p('<b>តើម៉ោងចុងក្រោយបង្អស់ដែលគាត់អាចចាប់ផ្តើមចេញដំណើរឡើងភ្នំ គឺនៅម៉ោងប៉ុន្មាន ដើម្បីឱ្យគាត់ត្រឡប់មកកន្លែងដើមវិញត្រឹមម៉ោង 8:00 pm?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ម៉ោងចេញដំណើរ ៖'),
              inp
            )
          );
        },
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m28q3'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 40',
            value: ctx.val('m28q3', 'step') || '',
            'aria-label': 'ប្រវែងជំហាន'
          });
          inp.addEventListener('input', () => ctx.setVal('m28q3', 'step', inp.value));

          return W.stack(
            W.instr('ឧបករណ៍រាប់ជំហានរបស់ តូរ៉ា បង្ហាញថាគាត់ដើរបាន ២២ ៥០០ ជំហាននៅលើផ្លូវ ៩ km។'),
            W.p('<b>គណនាប្រវែងជំហានជាមធ្យមរបស់គាត់គិតជាសង់ទីម៉ែត្រ (cm) ៖</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ប្រវែងជំហានមធ្យម ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'cm')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
