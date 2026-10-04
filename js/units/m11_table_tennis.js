/* Unit 11 (MoEYS 2025 / PISA M543) — ការប្រកួតវាយប៉េងប៉ុង (Table Tennis Tournament)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ២៦–២៧ (ប្រធានបទទី ១១)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការប្រកួតវាយប៉េងប៉ុង';
  const EN_TITLE = 'Table Tennis Tournament';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការរៀបចំកាលវិភាគប្រកួតវាយប៉េងប៉ុងវិលជុំ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'បូរិន, ចន្ថា, រតនា និង សុភ័ក្ត្រ បានបង្កើតក្រុមហ្វឹកហាត់មួយនៅក្នុងក្លឹបកីឡាវាយប៉េងប៉ុង។ ' +
      'កីឡាករម្នាក់ៗប្រាថ្នាចង់ជួបប្រកួតគ្នាម្តងម្នាក់ៗឱ្យបានគ្រប់ៗគ្នា។ ' +
      'ពួកគេបានរៀបចំតុចំនួនពីរសម្រាប់ការប្រកួតទាំងនេះ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t11_table_tennis.svg',
        alt: 'កាលវិភាគនៃការប្រកួតវាយប៉េងប៉ុង',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm11',
    no: 11,
    label: 'ប្រធានបទ ១១',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 10,
    blurb: 'ការរៀបចំកាលវិភាគប្រកួតវិលជុំ និងបន្សំគូប្រកួត (PISA M543)។',
    questions: {
      m11q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបំពេញកាលវិភាគ',
        max: 1,
        parts: [
          { k: 'r2_t1', label: 'ជុំទី ២ - តុទី ១' },
          { k: 'r2_t2', label: 'ជុំទី ២ - តុទី ២' },
          { k: 'r3_t1', label: 'ជុំទី ៣ - តុទី ១' },
          { k: 'r3_t2', label: 'ជុំទី ៣ - តុទី ២' },
        ],
        summary: (r) => 'ជុំ២: [' + (r.r2_t1 || '—') + ' | ' + (r.r2_t2 || '—') + '], ជុំ៣: [' + (r.r3_t1 || '—') + ' | ' + (r.r3_t2 || '—') + ']',
        score: (r) => {
          const r2t1 = (r.r2_t1 || '').toLowerCase();
          const r2t2 = (r.r2_t2 || '').toLowerCase();
          const r3t1 = (r.r3_t1 || '').toLowerCase();
          const r3t2 = (r.r3_t2 || '').toLowerCase();

          if (!r2t1 && !r2t2 && !r3t1 && !r3t2) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const allText = r2t1 + ' | ' + r2t2 + ' | ' + r3t1 + ' | ' + r3t2;
          const lat = PISA.latin(allText);

          const hasBR = /បូរិន.*រតនា|រតនា.*បូរិន|borin.*rattana|rattana.*borin/.test(allText) || /b.*r/.test(lat);
          const hasCS = /ចន្ថា.*សុភ័|សុភ័.*ចន្ថា|chantha.*sopheak|sopheak.*chantha/.test(allText) || /c.*s/.test(lat);
          const hasBS = /បូរិន.*សុភ័|សុភ័.*បូរិន|borin.*sopheak|sopheak.*borin/.test(allText) || /b.*s/.test(lat);
          const hasCR = /ចន្ថា.*រតនា|រតនា.*ចន្ថា|chantha.*rattana|rattana.*chantha/.test(allText) || /c.*r/.test(lat);

          if (hasBR && hasCS && hasBS && hasCR) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (កាលវិភាគបំពេញត្រឹមត្រូវគ្រប់គូប្រកួត)' };
          }

          return { pts: 0, note: 'មិនត្រឹមត្រូវ (គូប្រកួតដែលនៅសល់ត្រូវមាន បូរិន-រតនា, ចន្ថា-សុភ័ក្ត្រ, បូរិន-សុភ័ក្ត្រ, ចន្ថា-រតនា)' };
        },
        key: '<b>កាលវិភាគត្រឹមត្រូវ ៖</b><br><br>' +
          '• <b>ជុំទី ១ ៖</b> តុទី ១ (បូរិន - ចន្ថា) | តុទី ២ (រតនា - សុភ័ក្ត្រ)<br>' +
          '• <b>ជុំទី ២ ៖</b> តុទី ១ (<b>បូរិន - រតនា</b>) | តុទី ២ (<b>ចន្ថា - សុភ័ក្ត្រ</b>)<br>' +
          '• <b>ជុំទី ៣ ៖</b> តុទី ១ (<b>បូរិន - សុភ័ក្ត្រ</b>) | តុទី ២ (<b>ចន្ថា - រតនា</b>)<br>' +
          '<i>(ជុំទី ២ និងជុំទី ៣ អាចឆ្លាស់គ្នាបាន)</i>',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៃការប្រកួតវាយប៉េងប៉ុង នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១១)</b> — កូដ OECD PISA: <b>M543 (Table Tennis Tournament)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m11q1'],
        left: (ctx) => {
          const makeInp = (part, ph) => {
            const el = h('input', {
              type: 'text',
              class: 'resp-input',
              style: 'font-size: 0.95rem; width: 100%; padding: 6px 10px; border: 1.2px solid #cbd5e1; border-radius: 6px;',
              placeholder: ph,
              value: ctx.val('m11q1', part) || '',
              'aria-label': ph
            });
            el.addEventListener('input', () => ctx.setVal('m11q1', part, el.value));
            return el;
          };

          return W.stack(
            W.instr('ចូរបំពេញកាលវិភាគនៃការប្រកួត ដោយសរសេរឈ្មោះកីឡាករនៅក្នុងការប្រកួតនីមួយៗ ៖'),
            W.p('<b>ជុំទី ២ ៖</b>', 'q-lead'),
            h('div', { style: 'display: flex; gap: 12px; margin-bottom: 12px;' },
              h('div', { style: 'flex: 1;' }, h('span', { style: 'font-size: 0.85rem; color: #64748b;' }, 'តុទី ១ ៖'), makeInp('r2_t1', 'ឧ. បូរិន - រតនា')),
              h('div', { style: 'flex: 1;' }, h('span', { style: 'font-size: 0.85rem; color: #64748b;' }, 'តុទី ២ ៖'), makeInp('r2_t2', 'ឧ. ចន្ថា - សុភ័ក្ត្រ'))
            ),
            W.p('<b>ជុំទី ៣ ៖</b>', 'q-lead'),
            h('div', { style: 'display: flex; gap: 12px; margin-bottom: 12px;' },
              h('div', { style: 'flex: 1;' }, h('span', { style: 'font-size: 0.85rem; color: #64748b;' }, 'តុទី ១ ៖'), makeInp('r3_t1', 'ឧ. បូរិន - សុភ័ក្ត្រ')),
              h('div', { style: 'flex: 1;' }, h('span', { style: 'font-size: 0.85rem; color: #64748b;' }, 'តុទី ២ ៖'), makeInp('r3_t2', 'ឧ. ចន្ថា - រតនា'))
            )
          );
        },
        right: stimulus,
      },
    ],
  });
})();
