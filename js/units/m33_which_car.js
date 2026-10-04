/* Unit 33 — តើឡានមួយណាជាជម្រើសល្អ? (Which Car?) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ព័ត៌មានលម្អិតនៃរថយន្តទាំង ៤ ប្រភេទ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'បុប្ផា ទើបទទួលបានប័ណ្ណបើកបរ ហើយចង់ទិញរថយន្តផ្ទាល់ខ្លួនជាលើកដំបូង។ ខាងក្រោមជាព័ត៌មានលម្អិតនៃរថយន្ត ៤ ម៉ូដែលដែលនាងបានឃើញនៅកន្លែងលក់រថយន្ត ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t33_which_car.svg',
        alt: 'តារាងទិន្នន័យលក្ខណៈបច្ចេកទេស និងតម្លៃរថយន្ត',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm33',
    no: 33,
    label: 'ប្រធានបទ ៣៣',
    title: 'តើឡានមួយណា?',
    en: 'Which Car?',
    collection: 'moeys',
    grade: 7,
    blurb: 'វិភាគលក្ខខណ្ឌច្រើនចម្រុះលើតារាងទិន្នន័យ ប្រៀបធៀបទំហំស៊ីឡាំង និងគណនាប្រាក់ពន្ធ។',
    questions: {
      m33q1: {
        label: 'សំណួរ ១',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') return { pts: 1, note: 'ត្រឹមត្រូវ (បូលតេ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ខ. បូលតេ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (បូលតេ / Bolte)</b><br><br>' +
          '<b>ផ្ទៀងផ្ទាត់លក្ខខណ្ឌទាំង ៣ ៖</b><br>' +
          '• ចម្ងាយបានធ្វើដំណើរ ≤ 120 000 km ៖ Bolte (115 000 km) ត្រូវ។<br>' +
          '• ផលិតនៅ ឬក្រោយឆ្នាំ 2000 ៖ Bolte (2000) ត្រូវ។<br>' +
          '• តម្លៃផ្សព្វផ្សាយ ≤ 4500 zeds ៖ Bolte (4450 zeds) ត្រូវ។'
      },
      m33q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'D') return { pts: 1, note: 'ត្រឹមត្រូវ (ឌីហ្សែល)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ឃ. ឌីហ្សែល)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ឃ (ឌីហ្សែល / Dezal)</b><br><br>' +
          '• ទំហំស៊ីឡាំង ៖ Dezal (1.783 L) < Alpha (1.790 L) < Bolte (1.796 L) < Castel (1.820 L)។'
      },
      m33q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'tax', label: 'ប្រាក់ពន្ធបន្ថែម (zeds)' }],
        summary: (r) => (r.tax ? r.tax + ' zeds' : '—'),
        score: (r) => {
          const raw = (r.tax || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 120) return { pts: 1, note: 'ត្រឹមត្រូវ (120 zeds)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 120 zeds)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 120 zeds</b><br><br>' +
          '• តម្លៃផ្សព្វផ្សាយរថយន្ត អាល់ហ្វា (Alpha) = 4800 zeds។<br>' +
          '• ប្រាក់ពន្ធបន្ថែម 2.5% = 4800 × 0.025 = <b>120 zeds</b>។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m33q1'],
        left: (ctx) => W.stack(
          W.instr('បុប្ផា ចង់បានរថយន្តមួយដែលបំពេញតាមលក្ខខណ្ឌទាំង ៣ នេះ ៖'),
          W.instr('• ចម្ងាយដែលបានធ្វើដំណើរមិនលើសពី 120 000 km<br>• ផលិតនៅក្នុង ឬក្រោយឆ្នាំ 2000<br>• តម្លៃពេលផ្សព្វផ្សាយលក់មិនលើសពី 4500 zeds'),
          W.instr('តើរថយន្តមួយណាដែលត្រូវនឹងលក្ខខណ្ឌរបស់បុប្ផា?'),
          W.mcq(ctx, 'm33q1', 'choice', [
            { k: 'A', text: 'ក. អាល់ហ្វា (Alpha)' },
            { k: 'B', text: 'ខ. បូលតេ (Bolte)' },
            { k: 'C', text: 'គ. កាស្តែល (Castel)' },
            { k: 'D', text: 'ឃ. ឌីហ្សែល (Dezal)' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m33q2'],
        left: (ctx) => W.stack(
          W.instr('តើរថយន្តមួយណាដែលមានទំហំស៊ីឡាំងនៃម៉ាស៊ីន (លីត្រ) តូចជាងគេ?'),
          W.mcq(ctx, 'm33q2', 'choice', [
            { k: 'A', text: 'ក. អាល់ហ្វា (Alpha - 1.79 L)' },
            { k: 'B', text: 'ខ. បូលតេ (Bolte - 1.796 L)' },
            { k: 'C', text: 'គ. កាស្តែល (Castel - 1.82 L)' },
            { k: 'D', text: 'ឃ. ឌីហ្សែល (Dezal - 1.783 L)' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m33q3'],
        left: (ctx) => W.stack(
          W.instr('បុប្ផា នឹងត្រូវបង់ប្រាក់ 2.5% បន្ថែមលើតម្លៃផ្សព្វផ្សាយលក់ សម្រាប់ពន្ធរថយន្ត។'),
          W.instr('តើនាងត្រូវបង់ពន្ធបន្ថែមប៉ុន្មាន zeds សម្រាប់រថយន្ត អាល់ហ្វា (Alpha)?'),
          W.input(ctx, 'm33q3', 'tax', { label: 'ប្រាក់ពន្ធបន្ថែម (zeds) ៖', width: '150px', type: 'number' })
        ),
        right: stimulus
      }
    ]
  });
})();
