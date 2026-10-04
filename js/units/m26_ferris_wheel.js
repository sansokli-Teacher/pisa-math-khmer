/* Unit 26 — កន្ត្រកវិល (Ferris Wheel) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'កន្ត្រកវិលមាត់ទន្លេ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'កន្ត្រកវិលដ៏ធំមួយស្ថិតនៅលើច្រាំងទន្លេ។ កន្ត្រកវិលមានអង្កត់ផ្ចិត ១៤០ ម៉ែត្រ ហើយចំណុចខ្ពស់បំផុតមានកម្ពស់ ១៥០ ម៉ែត្រ ខាងលើផ្ទៃទឹកទន្លេ។ កន្ត្រកវិលបានមួយជុំពេញក្នុងរយៈពេល ៤០ នាទីក្នុងល្បឿនថេរ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t26_ferris_wheel.svg',
        alt: 'កន្ត្រកវិលមាត់ទន្លេ និងចំណុច P, Q, R, S, M',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm26',
    no: 26,
    label: 'ប្រធានបទ ២៦',
    title: 'កន្ត្រកវិល',
    en: 'Ferris Wheel',
    collection: 'moeys',
    grade: 7,
    blurb: 'គណនាកម្ពស់ផ្ចិតរង្វង់ពីផ្ទៃទឹក និងទីតាំងអ្នកជិះតាមខួបនៃចលនារង្វិលស្មើ។',
    questions: {
      m26q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'height', label: 'ចម្ងាយពីផ្ទៃទឹក (m)' }],
        summary: (r) => (r.height ? r.height + ' m' : '—'),
        score: (r) => {
          const raw = (r.height || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 80) return { pts: 1, note: 'ត្រឹមត្រូវ (80 m)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 80 m)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 80 m</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• អង្កត់ផ្ចិត d = 140 m → កាំ r = 140 ÷ 2 = 70 m។<br>' +
          '• កំពូលខ្ពស់បំផុតមានកម្ពស់ 150 m ពីផ្ទៃទឹក។<br>' +
          '• ចម្ងាយពីផ្ចិត M ទៅផ្ទៃទឹកទន្លេ = 150 - 70 = <b>80 m</b>។'
      },
      m26q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'C') return { pts: 1, note: 'ត្រឹមត្រូវ (ត្រង់ចំណុច S)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ត្រង់ចំណុច S)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ គ (ត្រង់ចំណុច S)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• កន្ត្រកវិល ១ ជុំពេញ (360°) ប្រើពេល 40 នាទី។<br>' +
          '• រយៈពេល 30 នាទីត្រូវនឹង 30/40 = 3/4 ជុំ (270°)។<br>' +
          '• ចាប់ផ្តើមពី P (បាតក្រោម) ៖ 10 នាទីនៅ Q, 20 នាទីនៅ R (កំពូល), 30 នាទីនៅ <b>S</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលរូបភាពកន្ត្រកវិលនៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ២',
        split: 44,
        items: ['m26q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 80',
            value: ctx.val('m26q1', 'height') || '',
            'aria-label': 'ចម្ងាយពីផ្ទៃទឹក'
          });
          inp.addEventListener('input', () => ctx.setVal('m26q1', 'height', inp.value));

          return W.stack(
            W.instr('អក្សរ M នៅក្នុងរូបតាងឱ្យផ្ចិតនៃកន្ត្រកវិល។'),
            W.p('<b>តើចម្ងាយពីផ្ទៃទឹកទន្លេទៅចំណុច M ស្មើនឹងប៉ុន្មានម៉ែត្រ (m)?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ចម្ងាយពីផ្ទៃទឹកទៅផ្ចិត M ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'm')
            )
          );
        },
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ២',
        split: 44,
        items: ['m26q2'],
        left: (ctx) => W.stack(
          W.instr('ខេមរា ចាប់ផ្តើមជិះកន្ត្រកវិលត្រង់ទីតាំងចំណុច P។'),
          W.p('<b>តើ ខេមរា នៅត្រង់ចំណុចណា បន្ទាប់ពីកន្ត្រកវិលបានរយៈពេល ៣០ នាទី?</b>', 'q-lead'),
          W.radios(ctx, 'm26q2', 'choice', [
            { v: 'A', html: 'ក. ត្រង់ចំណុច R' },
            { v: 'B', html: 'ខ. នៅចន្លោះចំណុច R និង ចំណុច S' },
            { v: 'C', html: 'គ. ត្រង់ចំណុច S' },
            { v: 'D', html: 'ឃ. នៅចន្លោះចំណុច S និង ចំណុច P' }
          ])
        ),
        right: stimulus
      }
    ]
  });
})();
