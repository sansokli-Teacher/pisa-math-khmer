/* Unit 36 — ទ្វារវិល (Revolving Door) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ទ្វារវិល ៣ ស្លាប និងប្លង់ពីលើ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ទ្វារវិលមួយមានស្លាប ៣ អាចបង្វិលក្នុងចន្លោះរាងជារង្វង់។ អង្កត់ផ្ចិតនៃលំហខាងក្នុងទ្វារវិលមានប្រវែង 2 m (200 cm)។ ស្លាបទ្វារទាំង ៣ បែងចែកចន្លោះជារង្វង់ជាបីផ្នែកស្មើៗគ្នា ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t36_revolving_door.svg',
        alt: 'ប្លង់ពីលើនៃទ្វារវិល ៣ ស្លាប',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('p', { class: 'cba-callout', style: 'background:#eff6ff; border-left:4px solid #0284c7; padding:8px 12px; font-size:0.9rem; margin-top:8px;' },
      'ទំហំបើកទាំងពីរនៃទ្វារ (ខ្សែធ្នូដាច់ៗ) មានទំហំដូចគ្នា។ ប្រសិនបើការបើកទាំងនេះធំពេក ស្លាបបង្វិលមិនអាចបិទជិតទេ ហើយខ្យល់អាចចេញចូលដោយសេរីតាមច្រកចូល និងច្រកចេញ។'
    )
  );

  PISA.registerUnit({
    id: 'm36',
    no: 36,
    label: 'ប្រធានបទ ៣៦',
    title: 'ទ្វារវិល',
    en: 'Revolving Door',
    collection: 'moeys',
    grade: 8,
    blurb: 'គណនាមុំផ្ចិតនៃរង្វង់ ប្រវែងធ្នូអតិបរមាដើម្បីកុំឱ្យច្រកចំហរ និងចំណុះផ្ទុកមនុស្សសរុប។',
    questions: {
      m36q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'angle', label: 'រង្វាស់មុំ (ដឺក្រេ)' }],
        summary: (r) => (r.angle ? r.angle + '°' : '—'),
        score: (r) => {
          const raw = (r.angle || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 120 || v === 240) return { pts: 1, note: 'ត្រឹមត្រូវ (' + v + '°)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 120°)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 120°</b> (ឬ 240°)<br><br>' +
          '• រង្វង់មួយជុំមាន 360° បែងចែកជា ៣ ស្លាបស្មើគ្នា ៖ 360° ÷ 3 = <b>120°</b>។'
      },
      m36q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'arc', label: 'ប្រវែងធ្នូអតិបរមា (cm)' }],
        summary: (r) => (r.arc ? r.arc + ' cm' : '—'),
        score: (r) => {
          const raw = (r.arc || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if ((v >= 103 && v <= 105) || v === 100) return { pts: 1, note: 'ត្រឹមត្រូវ (' + v + ' cm)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវស្ថិតក្នុងចន្លោះ 103 ដល់ 105 cm)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ចន្លោះ 103 ដល់ 105 cm (ប្រហែល 104.7 cm)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• បរិមាត្ររង្វង់ទ្វារ = π × d = 200π ≈ 628.3 cm។<br>' +
          '• ដើម្បីកុំឱ្យខ្យល់ចេញចូលដោយសេរី ធ្នូបើកមិនត្រូវលើសពី 1/6 នៃបរិមាត្ររង្វង់ ៖ 628.3 ÷ 6 ≈ <b>104.7 cm</b>។'
      },
      m36q3: {
        label: 'សំណួរ ៣',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'D') return { pts: 1, note: 'ត្រឹមត្រូវ (720 នាក់)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ឃ. 720)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ឃ (720 នាក់)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ១ ជុំមាន ៣ ចន្លោះ × ២ នាក់ = ៦ នាក់/ជុំ។<br>' +
          '• ក្នុង ១ នាទីវិល ៤ ជុំ = ៤ × ៦ = ២៤ នាក់/នាទី។<br>' +
          '• ក្នុងរយៈពេល ៣០ នាទី = ២៤ × ៣០ = <b>720 នាក់</b>។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m36q1'],
        left: (ctx) => W.stack(
          W.instr('តើមុំប៉ុន្មានដឺក្រេដែលផ្គុំឡើងដោយស្លាបទ្វារទាំងពីរដែលនៅជាប់គ្នា?'),
          W.input(ctx, 'm36q1', 'angle', { label: 'រង្វាស់មុំ (ដឺក្រេ) ៖', width: '130px', type: 'number' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m36q2'],
        left: (ctx) => W.stack(
          W.instr('តើប្រវែងធ្នូអតិបរមាស្មើប៉ុន្មានគិតជាសង់ទីម៉ែត្រ (cm) សម្រាប់ទ្វារនីមួយៗដែលអាចបើកបាន ដើម្បីកុំឱ្យខ្យល់ចេញចូលដោយសេរីតាមច្រកចេញចូលនោះ?'),
          W.input(ctx, 'm36q2', 'arc', { label: 'ប្រវែងធ្នូអតិបរមា (cm) ៖', width: '150px', type: 'number' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m36q3'],
        left: (ctx) => W.stack(
          W.instr('ទ្វារវិលបាន 4 ជុំពេញក្នុងមួយនាទី។ បន្ទប់នីមួយៗក្នុងផ្នែកទាំងបីរបស់ទ្វារអាចផ្ទុកមនុស្សច្រើនបំផុត 2 នាក់។'),
          W.instr('តើមានចំនួនមនុស្សច្រើនបំផុតប៉ុន្មាននាក់ ដែលអាចចូលអាគារបានតាមទ្វារក្នុងរយៈពេល 30 នាទី?'),
          W.mcq(ctx, 'm36q3', 'choice', [
            { k: 'A', text: 'ក. 60' },
            { k: 'B', text: 'ខ. 180' },
            { k: 'C', text: 'គ. 240' },
            { k: 'D', text: 'ឃ. 720' }
          ])
        ),
        right: stimulus
      }
    ]
  });
})();
