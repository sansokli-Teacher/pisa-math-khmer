/* Unit 27 — សំណង់ពីគ្រាប់ឡុកឡាក់ (Dice Building) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'សំណង់ពីគ្រាប់ឡុកឡាក់'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'សំណង់មួយត្រូវបានរៀបឡើងដោយប្រើគ្រាប់ឡុកឡាក់ស្តង់ដារចំនួន ៧ គ្រាប់ (មុខនីមួយៗមានលេខពី ១ ដល់ ៦ ហើយផលបូកលេខលើមុខទល់មុខគ្នាជានិច្ចស្មើនឹង ៧)។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t27_dice_building.svg',
        alt: 'សំណង់គ្រាប់ឡុកឡាក់',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm27',
    no: 27,
    label: 'ប្រធានបទ ២៧',
    title: 'សំណង់ពីគ្រាប់ឡុកឡាក់',
    en: 'Dice Building',
    collection: 'moeys',
    grade: 7,
    blurb: 'វិភាគទិដ្ឋភាពធរណីមាត្រ 3D និងផលបូកគ្រាប់ចុចខាងលើនៃសំណង់គ្រាប់ឡុកឡាក់។',
    questions: {
      m27q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'dots', label: 'ចំនួនចំណុច' }],
        summary: (r) => (r.dots ? r.dots + ' ចំណុច' : '—'),
        score: (r) => {
          const raw = (r.dots || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 17) return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (17 ចំណុច)' };
          if (num === 16) return { pts: 0.5, note: 'ត្រឹមត្រូវមួយផ្នែក (16 ចំណុច)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 17)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 17 (ពិន្ទុពេញ)</b> (ឬ 16 ពិន្ទុមិនពេញ)<br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• ដោយផ្អែកលើមុខដែលមើលឃើញនៅចំហៀង និងវិធានផលបូកមុខទល់គ្នាស្មើ 7 (1 ↔ 6, 2 ↔ 5, 3 ↔ 4) យើងអាចកំណត់លេខនៃមុខខាងលើនៃគ្រាប់ឡុកឡាក់ទាំង 5 ដែលមើលឃើញពីលើ។<br>' +
          '• ផលបូកចំនួនចំណុចនៅលើមុខខាងលើទាំង 5 គឺស្មើនឹង <b>17</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលរូបភាពសំណង់គ្រាប់ឡុកឡាក់នៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m27q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 17',
            value: ctx.val('m27q1', 'dots') || '',
            'aria-label': 'ចំនួនចំណុច'
          });
          inp.addEventListener('input', () => ctx.setVal('m27q1', 'dots', inp.value));

          return W.stack(
            W.instr('នៅពេលដែលសំណង់ត្រូវបានមើលពីលើ មានតែគ្រាប់ឡុកឡាក់ចំនួន ៥ ប៉ុណ្ណោះដែលអាចមើលឃើញ។'),
            W.p('<b>តើចំនួនចំណុចសរុបដែលយើងអាចមើលឃើញពេលដែលសំណង់នេះត្រូវបានមើលពីខាងលើ ស្មើនឹងប៉ុន្មាន?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ចំនួនចំណុចសរុប ៖'),
              inp
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
