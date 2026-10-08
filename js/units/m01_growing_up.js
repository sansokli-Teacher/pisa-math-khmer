/* Unit 01 (MoEYS 2025 / PISA M150) — ការលូតកម្ពស់ (Growing Up)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ១–៥ (ប្រធានបទទី ១)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការលូតកម្ពស់';
  const EN_TITLE = 'Growing Up';

  // Stimulus displayed on the right panel
  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'យុវជនលូតកម្ពស់កាន់តែខ្ពស់ឡើងៗ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'ក្នុងឆ្នាំ 1998 កម្ពស់ជាមធ្យមរបស់ក្មេងប្រុស និងក្មេងស្រីក្នុងប្រទេសហូឡង់ ត្រូវបានបង្ហាញដោយក្រាបខាងក្រោមនេះ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t01_growth_chart.svg',
        alt: 'ក្រាបកម្ពស់ជាមធ្យមរបស់ក្មេងប្រុស និងក្មេងស្រី ក្នុងប្រទេសហូឡង់ ឆ្នាំ 1998',
        style: 'max-width: 100%; width: 560px; height: auto;'
      })
    )
  );

  PISA.registerUnit({
    id: 'm01',
    no: 1,
    label: 'ប្រធានបទ ១',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 8,
    blurb: 'ការបកស្រាយទិន្នន័យពីក្រាបខ្សែស្តីពីការលូតកម្ពស់ជាមធ្យមរបស់ក្មេងប្រុស និងក្មេងស្រី ក្នុងប្រទេសហូឡង់ (PISA M150)។',
    questions: {
      m01q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរសរសេរចម្លើយខ្លី',
        max: 1,
        parts: [{ k: 'height', label: 'កម្ពស់ជាមធ្យមក្នុងឆ្នាំ 1980 (cm)' }],
        summary: (r) => (r.height ? r.height + ' cm' : '—'),
        score: (r) => {
          const raw = (r.height || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const p = PISA.parseAnswer(raw);
          if (p && PISA.inRange(p.value, 168.25, 168.35)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (168.3 cm)' };
          }
          const lat = PISA.latin(raw).replace(',', '.');
          if (/\b168\.3\b/.test(lat)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (168.3 cm)' };
          }
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ' };
        },
        key: "<p><b>ពិន្ទុពេញ៖</b> 168.3 cm (ឯកតាផ្តល់ឱ្យរួចហើយ)។</p><p><b>គ្មានពិន្ទុ៖</b> ចម្លើយផ្សេង ឬរំលង។</p><p style=\"color:#64748b;font-size:.85em;margin-top:8px\">កម្រិតសមត្ថភាព PISA៖ 506 · សិស្ស OECD ឆ្លើយត្រូវ 61% · ជំនាញដែលត្រូវការ៖ បណ្ដុំសមត្ថភាពបង្កើតឡើងវិញ</p>",
      },

      m01q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរពន្យល់',
        max: 1,
        parts: [{ k: 'explain', label: 'ការពន្យល់ពីអត្រាលូតលាស់' }],
        summary: (r) => r.explain || '—',
        score: (r) => {
          const raw = (r.explain || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const lat = PISA.latin(raw.toLowerCase());
          // The guide gives credit for "the curve is less steep / flattens / slope decreases after 12".
          // A word list cannot tell that from "girls mature earlier", so only clear wording is credited
          // here; every other answer is left for the teacher to mark.
          const clear = /មិនសូវចោត|មិនចោត|ចោតតិច|ភាពចោត|រាបស្មើ|រាបទៅ|ខ្សែកោងរាប|ក្រាបរាប|ងាកចេញ|ឈប់កើន|ឈប់ឡើង|ជម្រាល|អត្រាបម្រែបម្រួល/.test(raw) ||
            /flatten|less steep|slope|gradient|plateau/.test(lat);
          if (clear) return { pts: 1, note: 'សំដៅលើភាពចោតនៃខ្សែកោងថយចុះ (គ្រូអាចកែបាន)' };
          return { pts: null, note: 'រង់ចាំគ្រូពិនិត្យ' };
        },
        key: "<p><b>ពិន្ទុពេញ៖</b> ចម្លើយសំដៅលើ «ការផ្លាស់ប្ដូរ» ជម្រាលនៃក្រាបក្មេងស្រី (ជាក់លាក់ ឬដោយប្រយោល) តាមមួយក្នុងបីផ្លូវ៖</p><ol><li><b>ភាសាប្រចាំថ្ងៃ</b> — ភាពចោតថយចុះចាប់ពី 12 ឆ្នាំ៖ «ខ្សែកោងកាន់តែរាបស្មើ» · «វាមិនឡើងលើត្រង់ទៀត វាងាកចេញក្រៅ» · «ខ្សែកោងឈប់កើនឡើង» · «ខ្សែកោងក្មេងស្រីងាកចេញ ហើយខ្សែកោងក្មេងប្រុសកើនឡើង»។</li><li><b>ភាសាគណិតវិទ្យា</b> — «ចំណោតបន្ទាត់ប៉ះថយចុះ» · «អត្រាបម្រែបម្រួលថយចុះចាប់ពីអាយុ 12 ឆ្នាំ» · [គណនាមុំនៃខ្សែកោងចំពោះអ័ក្ស x មុន និងក្រោយ 12 ឆ្នាំ]។ ពាក្យ «ជម្រាល» «លំហូ» «អត្រាបម្រែបម្រួល» ចាត់ជាភាសាគណិតវិទ្យា។</li><li><b>ប្រៀបធៀបកំណើនជាក់ស្តែង</b> (អាចបង្កប់ន័យ) — អាយុ 10 ដល់ 12 លូតប្រហែល 15 cm តែអាយុ 12 ដល់ 20 លូតបានត្រឹមតែ 17 cm · ជាមធ្យមប្រហែល 7.5 cm ក្នុងមួយឆ្នាំ ទល់នឹងប្រហែល 2 cm ក្នុងមួយឆ្នាំ។</li></ol><p><b>គ្មានពិន្ទុ៖</b></p><ul><li>ឆ្លើយតែថាកម្ពស់ក្មេងស្រីក្រោមក្មេងប្រុស ដោយមិននិយាយពីភាពចោតនៃក្រាបក្មេងស្រី ឬការប្រៀបធៀបអត្រាកំណើនមុន និងក្រោយ 12 ឆ្នាំ (ឧ. «ខ្សែកោងក្មេងស្រីធ្លាក់ក្រោមខ្សែកោងក្មេងប្រុស»)។ <i>បើសិស្សថាក្រាបស្រីកាន់តែចោតតិច ក៏ដូចជាធ្លាក់ក្រោមក្រាបប្រុស ត្រូវផ្តល់ពិន្ទុពេញ។</i></li><li>ចម្លើយមិនសំដៅលើលក្ខណៈនៃក្រាប៖ «ក្មេងស្រីពេញវ័យឆាប់» · «ស្រីឆ្លងកាត់ភាពពេញវ័យមុនប្រុស ហើយលូតលាស់លឿនជាងមុន» · «ក្មេងស្រីមិនលូតកម្ពស់ច្រើនទេក្រោយ 12 ឆ្នាំ» <i>(មានតែអំណះអំណាង មិនយោងទៅក្រាប)</i>។</li><li>ចម្លើយផ្សេងទៀត ឬរំលង។</li></ul><p style=\"color:#64748b;font-size:.85em;margin-top:8px\">កម្រិតសមត្ថភាព PISA៖ 559 · សិស្ស OECD ឆ្លើយត្រូវ 46% · ជំនាញដែលត្រូវការ៖ បណ្ដុំសមត្ថភាពទំនាក់ទំនង</p>",
      },

      m01q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរសរសេរចម្លើយ',
        max: 1,
        parts: [{ k: 'ans', label: 'ចម្លើយ' }],
        summary: (r) => r.ans || '—',
        score: (r) => {
          // the two numbers, even if the student typed "11-13" in one box
          const nums = PISA.latin(r.ans || '').match(/\d+(?:\.\d+)?/g) || [];
          if (!String(r.ans || '').trim()) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          // a written answer with no age in it is for the teacher to read
          if (!nums.length) return { pts: null, note: 'រង់ចាំគ្រូពិនិត្យ' };
          const vf = parseFloat(nums[0]);
          const vt = nums.length > 1 ? parseFloat(nums[nums.length - 1]) : NaN;

          if (vf === 11 && (vt === 13 || vt === 12)) {
            return { pts: 1, note: 'ចន្លោះអាយុត្រឹមត្រូវ (' + vf + ' ដល់ ' + vt + ' ឆ្នាំ)' };
          }
          if (vf === 12 && vt === 13) return { pts: 0, note: 'ចម្លើយត្រឹមត្រូវមួយផ្នែក មិនទាន់ពេញលេញ' };
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ' };
        },
        key: "<p><b>ពិន្ទុពេញ៖</b> ចន្លោះអាយុ <b>11 ដល់ 13 ឆ្នាំ</b> — ឧ. «11 ដល់ 13» · «11-13» · «ចាប់ពីអាយុ 11 ដល់ 13 ឆ្នាំ ក្មេងស្រីមានកម្ពស់ខ្ពស់ជាងក្មេងប្រុសជាមធ្យម»។</p><p><b>ក៏ពិន្ទុពេញដែរ៖</b> «អាយុ 11 និង 12 ឆ្នាំ» ឬ «11 ដល់ 12 ឆ្នាំ» (ត្រឹមត្រូវក្នុងភាសាប្រចាំថ្ងៃ ព្រោះមានន័យថាចន្លោះពី 11 ដល់ 13 ឆ្នាំ)។</p><p><b>ពិន្ទុមិនពេញ៖</b> 12 ដល់ 13 · 12 · 13 · 11 · 11.2 ដល់ 12.8។</p><p><b>គ្មានពិន្ទុ៖</b> ឆ្នាំ 1998 · ក្មេងស្រីខ្ពស់ជាងនៅអាយុលើស 13 ឆ្នាំ · ក្មេងស្រីខ្ពស់ជាងចាប់ពីអាយុ 10 ដល់ 11 · ចម្លើយផ្សេងទៀត ឬរំលង។</p><p style=\"color:#64748b;font-size:.85em;margin-top:8px\">កម្រិតសមត្ថភាព PISA៖ 529 (ត្រឹមត្រូវមួយផ្នែក៖ 415) · សិស្ស OECD ឆ្លើយត្រូវ 69% · ជំនាញដែលត្រូវការ៖ បណ្ដុំសមត្ថភាពបង្កើតឡើងវិញ</p>",
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាន និងក្រាបស្តីពី «ការលូតកម្ពស់» នៅខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១)</b> របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ) — កូដដើមអន្តរជាតិ OECD PISA: <b>M150 (Growing Up)</b>។<br><br>' +
              'អ្នកអាចប្រើប្រាស់<b>ម៉ាស៊ីនគិតលេខ</b>នៅលើរបារឧបករណ៍ខាងលើបាន ពេលកំពុងដោះស្រាយសំណួរ។'
            })
          )
        ),
        right: stimulus,
      },

      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m01q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាន «ការលូតកម្ពស់» នៅផ្ទាំងខាងស្ដាំ។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('ចាប់តាំងពីឆ្នាំ 1980 កម្ពស់ជាមធ្យមរបស់ក្មេងស្រីអាយុ <b>20 ឆ្នាំ</b> កើនបាន <b>2.3 cm</b> គឺបានដល់កម្ពស់ <b>170.6 cm</b>។'),
          W.p('<b>តើកម្ពស់ជាមធ្យមរបស់ក្មេងស្រីអាយុ 20 ឆ្នាំ ស្មើប៉ុន្មាន នៅឆ្នាំ 1980?</b>', 'q-lead'),
          h('div', { class: 'answer-line-wrap', style: 'margin: 16px 0; display: flex; align-items: center; gap: 10px; font-size: 1.05rem;' },
            h('span', { style: 'font-weight: 600;' }, 'កម្ពស់ជាមធ្យមក្នុងឆ្នាំ 1980 ស្មើនឹង ៖'),
            W.input(ctx, 'm01q1', 'height', '', { width: '130px', cls: 'resp-input' }),
            h('span', { style: 'font-weight: 600;' }, 'cm')
          )
        ),
        right: stimulus,
      },

      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m01q2'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាប «ការលូតកម្ពស់» នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>ចូរពន្យល់ក្រាបដែលបានបង្ហាញ ជាមធ្យមអត្រាលូតលាស់របស់ក្មេងស្រីថយចុះបន្ទាប់ពីអាយុ 12 ឆ្នាំ។</b>', 'q-lead'),
          W.textarea(ctx, 'm01q2', 'explain', 'សូមសរសេរការពន្យល់របស់អ្នកនៅទីនេះ...', 6, true)
        ),
        right: stimulus,
      },

      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m01q3'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាប «ការលូតកម្ពស់» នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>យោងតាមក្រាបខាងលើ តើអំឡុងពេលណាដែលកម្ពស់ជាមធ្យមរបស់ក្មេងស្រី ខ្ពស់ជាងក្មេងប្រុស ដែលមានអាយុស្មើគ្នា?</b>', 'q-lead'),
          W.textarea(ctx, 'm01q3', 'ans', 'សូមសរសេរចម្លើយរបស់អ្នកនៅទីនេះ...', 3, true)
        ),
        right: stimulus,
      },
    ],
  });
})();
