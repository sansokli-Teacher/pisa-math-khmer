/* Unit 35 — ការលក់កាសែត (Selling Newspapers) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ប្រព័ន្ធប្រាក់កម្រៃរបស់អ្នកលក់កាសែត'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'នៅក្នុងប្រទេសហ្ស៊ិតឡង់ (Zedland) មានក្រុមហ៊ុនកាសែតពីរប្រកួតប្រជែងជ្រើសរើសអ្នកលក់ ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t35_selling_newspapers.svg',
        alt: 'ផ្ទាំងរូបភាពប្រព័ន្ធប្រាក់កម្រៃរបស់កាសែតទាំងពីរ',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('div', { class: 'cba-callout', style: 'background:#eff6ff; border-left:4px solid #0284c7; padding:8px 12px; font-size:0.9rem; margin-top:8px;' },
      '• <b>កាសែត ស៊ីដឡែនស្តារ</b> ៖ 0.20 zeds/ច្បាប់ សម្រាប់ 240 ច្បាប់ដំបូង + 0.40 zeds/ច្បាប់ សម្រាប់កាសែតបន្ថែម។<br>' +
      '• <b>កាសែត ស៊ីដឡែនដេលី</b> ៖ 60 zeds ប្រាក់ខែគោលប្រចាំសប្តាហ៍ + 0.05 zeds/ច្បាប់ ដែលលក់បាន។'
    )
  );

  PISA.registerUnit({
    id: 'm35',
    no: 35,
    label: 'ប្រធានបទ ៣៥',
    title: 'ការលក់កាសែត',
    en: 'Selling Newspapers',
    collection: 'moeys',
    grade: 7,
    blurb: 'គណនាប្រាក់ចំណូលតាមរូបមន្តពហុដំណាក់កាល រកចំនួនលក់បញ្ច្រាស និងជ្រើសរើសក្រាបត្រឹមត្រូវ។',
    questions: {
      m35q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'income', label: 'ប្រាក់កម្រៃសរុប (zeds)' }],
        summary: (r) => (r.income ? r.income + ' zeds' : '—'),
        score: (r) => {
          const raw = (r.income || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 92) return { pts: 1, note: 'ត្រឹមត្រូវ (92 zeds)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 92 zeds)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 92 zeds</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• 240 ច្បាប់ដំបូង = 240 × 0.20 = 48 zeds។<br>' +
          '• 110 ច្បាប់បន្ថែម (350 - 240) = 110 × 0.40 = 44 zeds។<br>' +
          '• ប្រាក់កម្រៃសរុប = 48 + 44 = <b>92 zeds</b>។'
      },
      m35q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'copies', label: 'ចំនួនកាសែតដែលបានលក់' }],
        summary: (r) => (r.copies ? r.copies + ' ច្បាប់' : '—'),
        score: (r) => {
          const raw = (r.copies || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseInt(raw, 10);
          if (v === 280) return { pts: 1, note: 'ត្រឹមត្រូវ (280 ច្បាប់)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 280 ច្បាប់)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 280 ច្បាប់</b><br><br>' +
          '• ប្រាក់កម្រៃបន្ថែមលើប្រាក់គោល = 74 - 60 = 14 zeds។<br>' +
          '• ចំនួនកាសែតដែលលក់បាន = 14 ÷ 0.05 = <b>280 ច្បាប់</b>។'
      },
      m35q3: {
        label: 'សំណួរ ៣',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ក្រាប ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'C') return { pts: 1, note: 'ត្រឹមត្រូវ (ក្រាប គ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ក្រាប គ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ គ (ក្រាប C)</b><br><br>' +
          '• កាសែតដេលី ចាប់ផ្តើមពីតម្លៃ 60 zeds នៅលើអ័ក្ស y ហើយមានជម្រាលរាបស្មើ 0.05។<br>' +
          '• កាសែតស្តារ ចេញពីគល់ (0,0) មានជម្រាល 0.20 រហូតដល់ 240 ច្បាប់ រួចកាច់ឡើងចោតជាងមុន (ជម្រាល 0.40)។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m35q1'],
        left: (ctx) => W.stack(
          W.instr('ជាមធ្យម ចិន្តា លក់បាន 350 ច្បាប់នៃកាសែតស៊ីដឡែនស្តារ ជាប្រចាំសប្តាហ៍។'),
          W.instr('តើនាងទទួលបានប្រាក់កម្រៃជាមធ្យមប៉ុន្មាន zeds ក្នុងមួយសប្តាហ៍?'),
          W.input(ctx, 'm35q1', 'income', { label: 'ចំនួនទឹកប្រាក់ជា zeds ៖', width: '150px', type: 'number' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m35q2'],
        left: (ctx) => W.stack(
          W.instr('ដាលីស លក់កាសែតស៊ីដឡែនដេលី។ ក្នុងមួយសប្តាហ៍នាងទទួលបានប្រាក់កម្រៃសរុប 74 zeds។'),
          W.instr('តើនាងលក់កាសែតបានចំនួនប៉ុន្មានច្បាប់ក្នុងសប្តាហ៍នោះ?'),
          W.input(ctx, 'm35q2', 'copies', { label: 'ចំនួនកាសែតដែលនាងបានលក់ ៖', width: '150px', type: 'number' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m35q3'],
        left: (ctx) => W.stack(
          W.instr('តើក្រាបមួយណាខាងក្រោមនេះតំណាងឱ្យភាពត្រឹមត្រូវនៃទំនាក់ទំនងរវាងចំនួនកាសែតលក់បាន និងប្រាក់កម្រៃដែលកាសែតទាំងពីរផ្តល់ជូន?'),
          W.mcq(ctx, 'm35q3', 'choice', [
            { k: 'A', text: 'ក. ក្រាប ក (Graph A)' },
            { k: 'B', text: 'ខ. ក្រាប ខ (Graph B)' },
            { k: 'C', text: 'គ. ក្រាប គ (Graph C)' },
            { k: 'D', text: 'ឃ. ក្រាប ឃ (Graph D)' }
          ])
        ),
        right: stimulus
      }
    ]
  });
})();
