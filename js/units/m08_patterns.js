/* Unit 08 (MoEYS 2025 / PISA Patterns) — លំនាំគំរូ (Patterns)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ២០–២១ (ប្រធានបទទី ៨)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'លំនាំគំរូ';
  const EN_TITLE = 'Patterns';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'លំនាំគំរូរាងជណ្តើរដោយប្រើការ៉េ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ស៊ូ បានសង់លំនាំគំរូរាងជណ្តើរដោយប្រើការ៉េ។ រូបខាងក្រោមនេះជាដំណាក់កាលដែលគាត់បានសង់ ៖<br>' +
      'ដូចដែលអ្នកបានឃើញ គាត់បានប្រើការ៉េចំនួន <b>មួយ (1)</b> នៅដំណាក់កាលទី 1, ' +
      'ការ៉េចំនួន <b>បី (3)</b> នៅដំណាក់កាលទី 2, ' +
      'និងការ៉េចំនួន <b>ប្រាំមួយ (6)</b> នៅដំណាក់កាលទី 3។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t08_patterns.svg',
        alt: 'លំនាំគំរូរាងជណ្តើរដោយប្រើការ៉េ',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm08',
    no: 8,
    label: 'ប្រធានបទ ៨',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 5,
    blurb: 'ការស្វែងរកលំនាំគំរូតួលេខ និងការបន្តលំដាប់ជណ្តើរការ៉េ (PISA Patterns)។',
    questions: {
      m08q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលចំនួនលេខ',
        max: 1,
        parts: [{ k: 'squares', label: 'ចំនួនការ៉េនៅដំណាក់កាលទី ៤' }],
        summary: (r) => (r.squares ? r.squares + ' ការ៉េ' : '—'),
        score: (r) => {
          const raw = (r.squares || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 10) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (10 ការ៉េ)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 10 ការ៉េ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 10 ការ៉េ</b><br><br>' +
          '<b>របៀបរកលំនាំគំរូ ៖</b><br>' +
          '• ដំណាក់កាលទី 1 ៖ 1 ការ៉េ<br>' +
          '• ដំណាក់កាលទី 2 ៖ 1 + 2 = 3 ការ៉េ (ថែមជួរឈរថ្មីកម្ពស់ 2)<br>' +
          '• ដំណាក់កាលទី 3 ៖ 1 + 2 + 3 = 6 ការ៉េ (ថែមជួរឈរថ្មីកម្ពស់ 3)<br>' +
          '• ដំណាក់កាលទី 4 ៖ 1 + 2 + 3 + 4 = <b>10 ការ៉េ</b> (ថែមជួរឈរថ្មីកម្ពស់ 4)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលលំនាំគំរូរាងជណ្តើរ នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៨)</b> — កូដ OECD PISA: <b>Patterns</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m08q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 10',
            value: ctx.val('m08q1', 'squares') || '',
            'aria-label': 'ចំនួនការ៉េ'
          });
          inp.addEventListener('input', () => ctx.setVal('m08q1', 'squares', inp.value));

          return W.stack(
            W.instr('សូមពិនិត្យមើលលំនាំគំរូរាងជណ្តើរនៅផ្ទាំងខាងស្ដាំ។'),
            W.p('ដូចដែលអ្នកបានឃើញ គាត់បានប្រើការ៉េចំនួនមួយនៅដំណាក់កាលទី 1 ការ៉េចំនួនបីនៅដំណាក់កាលទី 2 និងការ៉េចំនួនប្រាំមួយនៅដំណាក់កាលទី 3។'),
            W.p('<b>តើការ៉េចំនួនប៉ុន្មាន ដែលគាត់ត្រូវប្រើនៅដំណាក់កាលទី 4?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ការ៉េ')
            )
          );
        },
        right: stimulus,
      },
    ],
  });
})();
