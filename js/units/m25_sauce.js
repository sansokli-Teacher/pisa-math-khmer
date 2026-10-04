/* Unit 25 — ទឹកជ្រលក់ (Sauce) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'រូបមន្តលាយទឹកជ្រលក់សាលាដិ៍'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'អ្នកកំពុងធ្វើទឹកជ្រលក់ដោយខ្លួនឯងសម្រាប់ស្រោចសាលាដិ៍។ នេះជារូបមន្តគ្រឿងផ្សំសម្រាប់ទឹកជ្រលក់ ១០០ មីលីលីត្រ (100 mL) ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t25_sauce.svg',
        alt: 'រូបមន្តលាយទឹកជ្រលក់សាលាដិ៍',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm25',
    no: 25,
    label: 'ប្រធានបទ ២៥',
    title: 'ទឹកជ្រលក់',
    en: 'Sauce',
    collection: 'moeys',
    grade: 7,
    blurb: 'ដោះស្រាយចំណោទសមាមាត្រត្រង់ ដើម្បីគណនាបរិមាណប្រេងសាលាដិ៍សម្រាប់ទឹកជ្រលក់ 150 mL។',
    questions: {
      m25q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'oil', label: 'ប្រេងសាលាដិ៍ (mL)' }],
        summary: (r) => (r.oil ? r.oil + ' mL' : '—'),
        score: (r) => {
          const raw = (r.oil || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 90) return { pts: 1, note: 'ត្រឹមត្រូវ (90 mL)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 90 mL)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 90 mL</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ទឹកជ្រលក់ 100 mL ត្រូវការប្រេងសាលាដិ៍ 60 mL។<br>' +
          '• មេគុណសមាមាត្រសម្រាប់ 150 mL គឺ 150 ÷ 100 = 1.5 ដង។<br>' +
          '• បរិមាណប្រេងសាលាដិ៍ត្រូវប្រើ ៖ 60 × 1.5 = <b>90 mL</b> (ឬ 60 + 30 = 90 mL)។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលរូបមន្តគ្រឿងផ្សំទឹកជ្រលក់នៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m25q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 90',
            value: ctx.val('m25q1', 'oil') || '',
            'aria-label': 'ប្រេងសាលាដិ៍'
          });
          inp.addEventListener('input', () => ctx.setVal('m25q1', 'oil', inp.value));

          return W.stack(
            W.instr('សូមពិនិត្យមើលរូបមន្តនៅផ្ទាំងខាងស្តាំ។'),
            W.p('<b>តើអ្នកត្រូវប្រើប្រេងសាលាដិ៍ប៉ុន្មានមីលីលីត្រ (mL) ដើម្បីផលិតបានទឹកជ្រលក់ ១៥០ mL?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ប្រេងសាលាដិ៍ ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'mL')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
