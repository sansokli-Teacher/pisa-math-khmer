/* Unit 38 — ទីធ្លា (Patios) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ប្លង់ក្រាលឥដ្ឋទីធ្លាផ្ទះថ្មី'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ឌីណា ចង់ក្រាលឥដ្ឋនៅទីធ្លារាងចតុកោណកែងនៅផ្ទះថ្មីរបស់គាត់។ ទីធ្លាមានបណ្តោយ 5.25 ម៉ែត្រ និងទទឹង 3.00 ម៉ែត្រ។ គាត់ត្រូវការឥដ្ឋ 81 ដុំ ក្នុងមួយម៉ែត្រការ៉េ ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t38_patios.svg',
        alt: 'ប្លង់ទីធ្លាក្រាលឥដ្ឋរាងចតុកោណកែង',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm38',
    no: 38,
    label: 'ប្រធានបទ ៣៨',
    title: 'ទីធ្លា',
    en: 'Patios',
    collection: 'moeys',
    grade: 7,
    blurb: 'គណនាផ្ទៃក្រឡាចតុកោណកែង និងចំនួនដុំឥដ្ឋសរុបសម្រាប់ក្រាលទីធ្លា។',
    questions: {
      m38q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'bricks', label: 'ចំនួនដុំឥដ្ឋសរុប' }],
        summary: (r) => (r.bricks ? r.bricks + ' ដុំ' : '—'),
        score: (r) => {
          const raw = (r.bricks || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 1276 || v === 1275 || v === 1275.75) return { pts: 1, note: 'ត្រឹមត្រូវ (' + v + ' ដុំ)' };
          if (v === 15.75 || v === 1215) return { pts: 0.5, note: 'បានពិន្ទុមួយផ្នែក (គណនាផ្ទៃ 15.75 m² ត្រូវ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 1276 ឬ 1275 ដុំ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 1276 ឬ 1275 ឬ 1275.75 ដុំ</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ផ្ទៃក្រឡាទីធ្លា = 5.25 m × 3.00 m = 15.75 m²។<br>' +
          '• ចំនួនដុំឥដ្ឋសរុប = 15.75 × 81 = <b>1275.75 ដុំ (បង្គត់ជា 1276 ដុំ)</b>។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m38q1'],
        left: (ctx) => W.stack(
          W.instr('ឌីណា ចង់ក្រាលឥដ្ឋនៅទីធ្លារាងចតុកោណកែងនៅផ្ទះថ្មីរបស់គាត់។ ទីធ្លាមានបណ្តោយ 5.25 ម៉ែត្រ និងទទឹង 3.00 ម៉ែត្រ។ គាត់ត្រូវការឥដ្ឋ 81 ដុំ ក្នុងមួយម៉ែត្រការ៉េ។'),
          W.instr('គណនាចំនួនឥដ្ឋដែលឌីណាត្រូវការសម្រាប់រៀបចំទីធ្លាទាំងមូល ៖'),
          W.input(ctx, 'm38q1', 'bricks', { label: 'ចំនួនដុំឥដ្ឋសរុប ៖', width: '160px', type: 'number' })
        ),
        right: stimulus
      }
    ]
  });
})();
