/* Unit 17 — ការបញ្ជាទិញអាផាតមិន (Buying an Apartment) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ប្លង់អាផាតមិន'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ប្លង់ខាងក្រោមនេះបង្ហាញអំពីវិមាត្រនៃបន្ទប់ផ្សេងៗក្នុងអាផាតមិនមួយ។ វិមាត្រសរុបខាងក្រៅគឺ ៩.៧ ម៉ែត្រ គុណនឹង ៨.៨ ម៉ែត្រ ដោយមានផ្នែកឆកមួយនៅជ្រុងខាងស្តាំទំហំ ២.០ ម៉ែត្រ គុណនឹង ៤.៤ ម៉ែត្រ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t17_apartment_plan.svg',
        alt: 'ប្លង់អាផាតមិន',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm17',
    no: 17,
    label: 'ប្រធានបទ ១៧',
    title: 'ការបញ្ជាទិញអាផាតមិន',
    en: 'Buying an Apartment',
    collection: 'moeys',
    grade: 8,
    blurb: 'គណនាផ្ទៃក្រឡាកម្រាលឥដ្ឋសរុបនៃអាផាតមិនតាមវិមាត្រប្លង់ស្ថាបត្យកម្ម។',
    questions: {
      m17q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ និងពន្យល់',
        max: 2,
        parts: [{ k: 'area', label: 'ផ្ទៃក្រឡាសរុប (m²)' }],
        summary: (r) => (r.area ? r.area + ' m²' : '—'),
        score: (r) => {
          const raw = (r.area || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const match = raw.match(/(\d+(?:\.\d+)?)/);
          if (match) {
            const val = parseFloat(match[1]);
            if (val >= 75 && val <= 78) return { pts: 2, note: 'ត្រឹមត្រូវពេញលេញ (ចន្លោះ 75 - 78 m²)' };
            if (val >= 70 && val <= 85) return { pts: 1, note: 'ត្រឹមត្រូវមួយផ្នែក' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ (ពិន្ទុពេញ ២) ៖ ចន្លោះពី 75 m² ដល់ 78 m² (ប្រហែល 76.56 m²)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ផ្ទៃក្រឡាចតុកោណកែងសរុបខាងក្រៅ = 9.7 m × 8.8 m = 85.36 m²។<br>' +
          '• ដកផ្ទៃឆកនៅជ្រុង = 2.0 m × 4.4 m = 8.80 m²។<br>' +
          '• ផ្ទៃក្រឡាសរុបនៃអាផាតមិន = 85.36 - 8.80 = <b>76.56 m²</b> (ទទួលយកចន្លោះ 75 ដល់ 78 m² ដោយរាប់បញ្ចូលកម្រាស់ជញ្ជាំង)។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលប្លង់អាផាតមិននៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m17q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលវិមាត្រនៃប្លង់អាផាតមិននៅផ្ទាំងខាងស្តាំ។'),
          W.p('<b>គណនាផ្ទៃក្រឡាកម្រាលឥដ្ឋសរុបនៃអាផាតមិននេះគិតជាម៉ែត្រការ៉េ (m²) ដោយបង្ហាញពីរបៀបគណនារបស់អ្នក ៖</b>', 'q-lead'),
          W.textarea(ctx, 'm17q1', 'area', { rows: 4, placeholder: 'បញ្ចូលផ្ទៃក្រឡា និងរបៀបគណនា...' })
        ),
        right: stimulus
      }
    ]
  });
})();
