/* Unit 37 — ការធ្វើតេស្តវិទ្យាសាស្ត្រ (Science Test) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'កំណត់ត្រាពិន្ទុតេស្តវិទ្យាសាស្ត្រ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'នៅសាលារបស់ម៉ីលីង គ្រូមុខវិជ្ជាវិទ្យាសាស្ត្របានដាក់តេស្តដែលមានពិន្ទុពេញ 100។ ម៉ីលីង ទទួលបានពិន្ទុមធ្យម 60 លើការធ្វើតេស្ត ៤ លើកដំបូង។ ដល់សំណួរតេស្តលើកទី ៥ នាងទទួលបានពិន្ទុ 80 ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t37_science_test.svg',
        alt: 'កំណត់ត្រាពិន្ទុតេស្តវិទ្យាសាស្ត្ររបស់ ម៉ីលីង',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm37',
    no: 37,
    label: 'ប្រធានបទ ៣៧',
    title: 'ការធ្វើតេស្តវិទ្យាសាស្ត្រ',
    en: 'Science Test',
    collection: 'moeys',
    grade: 8,
    blurb: 'គណនាមធ្យមភាគទិន្នន័យចម្រុះពីមធ្យមភាគមុន និងពិន្ទុតេស្តថ្មីបន្ថែម។',
    questions: {
      m37q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'avg', label: 'ពិន្ទុមធ្យម' }],
        summary: (r) => (r.avg ? r.avg + ' ពិន្ទុ' : '—'),
        score: (r) => {
          const raw = (r.avg || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 64) return { pts: 1, note: 'ត្រឹមត្រូវ (64 ពិន្ទុ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 64)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 64 ពិន្ទុ</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ពិន្ទុសរុបនៃ ៤ តេស្តដំបូង = 4 × 60 = 240 ពិន្ទុ។<br>' +
          '• ពិន្ទុសរុបទាំង ៥ តេស្ត = 240 + 80 = 320 ពិន្ទុ។<br>' +
          '• ពិន្ទុមធ្យមនៃតេស្តទាំង ៥ = 320 ÷ 5 = <b>64 ពិន្ទុ</b>។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m37q1'],
        left: (ctx) => W.stack(
          W.instr('នៅសាលារបស់ម៉ីលីង គ្រូមុខវិជ្ជាវិទ្យាសាស្ត្ររបស់នាង បានដាក់តេស្តដែលមានពិន្ទុ 100។ ម៉ីលីង បានពិន្ទុមធ្យម 60 លើការធ្វើតេស្តមុខវិជ្ជាវិទ្យាសាស្ត្របួនសំណួរតេស្តដំបូង។ សំណួរតេស្តទីប្រាំ នាងទទួលបានពិន្ទុ 80។'),
          W.instr('តើពិន្ទុមធ្យមលើតេស្តមុខវិជ្ជាវិទ្យាសាស្ត្រទាំងប្រាំសំណួររបស់ម៉ីលីង ស្មើប៉ុន្មាន?'),
          W.input(ctx, 'm37q1', 'avg', { label: 'ពិន្ទុមធ្យម ៖', width: '150px', type: 'number' })
        ),
        right: stimulus
      }
    ]
  });
})();
