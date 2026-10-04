/* Unit 06 (MoEYS 2025 / PISA M159) — កាក់ (Coins)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ១៥–១៧ (ប្រធានបទទី ៦)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'កាក់';
  const EN_TITLE = 'Coins';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការរចនាសំណុំកាក់ថ្មី'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'អ្នកត្រូវបានស្នើសុំឱ្យរចនាសំណុំកាក់ថ្មីមួយ។ កាក់ទាំងអស់មានរាងជារង្វង់ និងពណ៌ប្រាក់ ប៉ុន្តែមានអង្កត់ផ្ចិតខុសៗគ្នា។<br><br>' +
      'អ្នកស្រាវជ្រាវបានរកឃើញថា កាក់ល្អមួយ ត្រូវបំពេញតាមតម្រូវការដូចខាងក្រោម ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t06_coins.svg',
        alt: 'លក្ខខណ្ឌនៃការរចនាសំណុំកាក់ប្រាក់ថ្មី',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm06',
    no: 6,
    label: 'ប្រធានបទ ៦',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 7,
    blurb: 'ការគណនាភាគរយនៃការកើនឡើង និងការបង្កើនចំនួនធាតុអតិបរមានៃសំណុំកាក់ (PISA M159)។',
    questions: {
      m06q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលបញ្ជីអង្កត់ផ្ចិតកាក់ (mm)',
        max: 1,
        parts: [
          { k: 'coins', label: 'អង្កត់ផ្ចិតកាក់ក្នុងសំណុំ (mm)' },
          { k: 'explanation', label: 'ការពន្យល់ ឬរបៀបគណនា' }
        ],
        summary: (r) => (r.coins || '—') + (r.explanation ? ' · ' + r.explanation : ''),
        score: (r) => {
          const raw = (r.coins || '').trim();
          const exp = (r.explanation || '').trim();
          const allText = raw + ' ' + exp;

          if (!raw && !exp) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Parse numbers from the answer
          const nums = (allText.match(/\b\d+\b/g) || []).map(Number);
          
          // Full credit: 15, 20, 26, 34, 45
          const has15 = nums.includes(15);
          const has20 = nums.includes(20);
          const has26 = nums.includes(26);
          const has34 = nums.includes(34);
          const has45 = nums.includes(45);

          if (has15 && has20 && has26 && has34 && has45) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (15 – 20 – 26 – 34 – 45 mm)' };
          }

          // Check partial credit:
          // 1. First 4 correct (15, 20, 26, 34)
          // 2. First 3 correct (15, 20, 26)
          // 3. Other valid sets that fulfill criteria but not maximum: e.g. 15-21-29-39 or 15-30-45
          if (has15 && has20 && has26 && has34) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ត្រូវ ៤ កាក់ដំបូង 15 – 20 – 26 – 34)' };
          }
          if (has15 && has20 && has26) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (ត្រូវ ៣ កាក់ដំបូង 15 – 20 – 26)' };
          }
          if (has15 && nums.length >= 3) {
            // Check if strictly valid sequence where each >= 1.3 * prev and max <= 45
            let valid = true;
            for (let i = 1; i < nums.length; i++) {
              if (nums[i] < Math.ceil(nums[i-1] * 1.3) || nums[i] > 45) {
                valid = false;
                break;
              }
            }
            if (valid) {
              return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (សំណុំត្រឹមត្រូវតាមលក្ខខណ្ឌ ប៉ុន្តែមិនទាន់បានចំនួនកាក់ច្រើនបំផុត)' };
            }
          }

          return { pts: 0, note: 'មិនត្រឹមត្រូវ (សំណុំកាក់ច្រើនបំផុតគឺ ៖ 15, 20, 26, 34, 45 mm)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវពេញលេញ ៖ 15 – 20 – 26 – 34 – 45 (mm)</b><br><br>' +
          '<b>របៀបគណនាដើម្បីទទួលបានកាក់ច្រើនបំផុត ៖</b><br>' +
          'ដើម្បីឱ្យមានចំនួនកាក់ច្រើនបំផុត កាក់នីមួយៗត្រូវតែយកអង្កត់ផ្ចិតតូចបំផុតដែលអាចធ្វើទៅបាន (កើនឡើងយ៉ាងតិច 30% គឺគុណនឹង 1.3 រួចបង្គត់ឡើងជាចំនួនគត់) ៖<br>' +
          '• <b>កាក់ទី ១ ៖</b> 15 mm (តាមលក្ខខណ្ឌកំណត់)<br>' +
          '• <b>កាក់ទី ២ ៖</b> 15 × 1.3 = 19.5 mm → យកចំនួនគត់តូចបំផុតគឺ <b>20 mm</b><br>' +
          '• <b>កាក់ទី ៣ ៖</b> 20 × 1.3 = <b>26 mm</b><br>' +
          '• <b>កាក់ទី ៤ ៖</b> 26 × 1.3 = 33.8 mm → យកចំនួនគត់តូចបំផុតគឺ <b>34 mm</b><br>' +
          '• <b>កាក់ទី ៥ ៖</b> 34 × 1.3 = 44.2 mm → យកចំនួនគត់តូចបំផុតគឺ <b>45 mm</b> (ដល់កម្រិតអតិបរមា 45 mm)<br>' +
          '• (ប្រសិនបើបន្តទៀត 45 × 1.3 = 58.5 mm > 45 mm ហួសលក្ខខណ្ឌកំណត់)។<br><br>' +
          'ដូច្នេះ សំណុំកាក់ដែលមានកាក់ច្រើនបំផុតរួមមាន <b>៥ កាក់</b> គឺ ៖ <b>15, 20, 26, 34, 45 mm</b>។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលលក្ខខណ្ឌនៃការរចនាសំណុំកាក់ នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ៦)</b> — កូដ OECD PISA: <b>M159 (Coins)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m06q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 15, 20, 26, 34, 45',
            value: ctx.val('m06q1', 'coins') || '',
            'aria-label': 'បញ្ជីអង្កត់ផ្ចិតកាក់'
          });
          inp.addEventListener('input', () => ctx.setVal('m06q1', 'coins', inp.value));

          return W.stack(
            W.instr('សូមពិនិត្យមើលលក្ខខណ្ឌទាំង ៣ នៃការរចនាកាក់នៅផ្ទាំងខាងស្ដាំ។'),
            W.p('អ្នកត្រូវបានស្នើសុំឱ្យរចនាសំណុំកាក់មួយដែលបំពេញតាមតម្រូវការខាងលើ។ អ្នកគួរចាប់ផ្ដើមពីកាក់ដែលមានអង្កត់ផ្ចិត <b>15 mm</b> ហើយសំណុំកាក់របស់អ្នកគួរតែមានកាក់ច្រើនបំផុតតាមដែលអាចធ្វើទៅបាន។'),
            W.p('<b>តើអង្កត់ផ្ចិតនៃកាក់នៅក្នុងសំណុំកាក់របស់អ្នក នឹងស្មើប៉ុន្មានខ្លះ?</b>', 'q-lead'),
            W.p('<i>(សូមសរសេរបញ្ជីអង្កត់ផ្ចិតកាក់ទាំងអស់ គិតជា mm ដោយបំបែកដោយសញ្ញាក្បៀស ឬដកឃ្លា)</i>', 'hint'),
            h('div', { style: 'margin: 8px 0 16px;' }, inp),
            W.p('<b>ការពន្យល់ ឬរបៀបគណនា (ជម្រើសបន្ថែម) ៖</b>', 'q-lead'),
            W.textarea(ctx, 'm06q1', 'explanation', 'សូមបង្ហាញរបៀបគណនារបស់អ្នកនៅទីនេះ...', 4)
          );
        },
        right: stimulus,
      },
    ],
  });
})();
