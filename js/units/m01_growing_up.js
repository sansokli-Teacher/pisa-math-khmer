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
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; font-size: 0.88rem; color: #334155; line-height: 1.5;' },
      h('b', { style: 'color: #0f172a;' }, 'សម្គាល់លើក្រាប៖'),
      h('ul', { style: 'margin: 4px 0 0; padding-left: 20px;' },
        h('li', {}, 'បន្ទាត់ពណ៌ខៀវដិត (—)៖ កម្ពស់ជាមធ្យមរបស់<b>ក្មេងប្រុស</b> (ឆ្នាំ 1998)'),
        h('li', {}, 'បន្ទាត់ពណ៌ក្រហមផ្កាឈូកដាច់ៗ (- -)៖ កម្ពស់ជាមធ្យមរបស់<b>ក្មេងស្រី</b> (ឆ្នាំ 1998)')
      )
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
          // Accept explicit calculation expression 170.6 - 2.3
          const norm = lat.replace(/\s+/g, '');
          if (/170\.6-2\.3/.test(norm)) {
            return { pts: 1, note: 'ការគណនាត្រឹមត្រូវ (170.6 - 2.3 = 168.3)' };
          }
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ' };
        },
        key: '<b>168.3 cm</b> (ឬ 168.3)។<br><br>' +
          '<b>វិធីគណនា៖</b><br>' +
          'យោងតាមព័ត៌មានដែលបានផ្ដល់៖<br>' +
          '• កម្ពស់ជាមធ្យមរបស់ក្មេងស្រីអាយុ 20 ឆ្នាំ ក្នុងឆ្នាំ 1998 គឺ <b>170.6 cm</b><br>' +
          '• កម្ពស់នេះបានកើនឡើង <b>2.3 cm</b> ចាប់តាំងពីឆ្នាំ 1980<br>' +
          'ដូច្នេះ កម្ពស់ជាមធ្យមក្នុងឆ្នាំ 1980 គឺ៖<br>' +
          '\\[170.6 - 2.3 = 168.3\\text{ cm}\\]<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> 168.3 cm (ឯកតាបានផ្ដល់ឱ្យរួចហើយ)។<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត ឬរំលង។',
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

          const lower = raw.toLowerCase();
          const lat = PISA.latin(lower);

          // Criteria from PISA scoring guide:
          // 1. Refers to the reduction in steepness / slope / flattening of the curve after age 12:
          const hasFlatten = /រាប|ស្មើ|រាបស្មើ|មិនសូវចោត|មិនចោត|កោងរាប|ងាកចេញ|ងាក|ឈប់ឡើង|ឡើងយឺត|កើនតិច|ថយចុះ|លយចុះ|ជម្រាល|អត្រា/.test(raw) ||
            /flat|steep|slope|gradient|plateau|level|slow|decrease|less|bend|curve/.test(lat);

          // 2. Mentions rate of change / gradient / derivative / growth comparison:
          const hasRate = /អត្រា|បម្រែបម្រួល|កម្រិត|ជម្រាល|cm|សង់ទីម៉ែត្រ/.test(raw) ||
            /rate|growth|change|speed/.test(lat);

          if (hasFlatten || hasRate) {
            return { pts: 1, note: 'ការពន្យល់ត្រឹមត្រូវ (សំដៅលើការថយចុះភាពចោត ឬអត្រាបម្រែបម្រួល)' };
          }
          return { pts: 0, note: 'ការពន្យល់មិនទាន់ចំចំណុចសំខាន់ (ភាពចោតនៃក្រាប)' };
        },
        key: '<b>ការពន្យល់ត្រឹមត្រូវ៖</b><br>' +
          'ចម្លើយត្រូវសំដៅលើ <b>«ការផ្លាស់ប្ដូរភាពចោត ឬជម្រាលនៃខ្សែក្រាប»</b> របស់ក្មេងស្រីចាប់ពីអាយុ 12 ឆ្នាំឡើងទៅ៖<br>' +
          '• <b>ការប្រើភាសាក្នុងជីវភាពប្រចាំថ្ងៃ៖</b> ខ្សែក្រាបចាប់ផ្ដើមរាបស្មើ (មិនសូវចោតដូចមុន), ខ្សែក្រាបឈប់ឡើងត្រង់ទៅលើ គឺវាចាប់ផ្ដើមងាកចេញ ឬកម្ពស់កើនឡើងយឺតខ្លាំង។<br>' +
          '• <b>ការប្រើភាសាគណិតវិទ្យា៖</b> ជម្រាល (slope/gradient) នៃបន្ទាត់ប៉ះ ឬអត្រាបម្រែបម្រួលថយចុះបន្ទាប់ពីអាយុ 12 ឆ្នាំ។<br>' +
          '• <b>ការប្រៀបធៀបកំណើនជាក់ស្ដែង៖</b> ពីអាយុ 10 ដល់ 12 ឆ្នាំ កម្ពស់កើនប្រហែល 15 cm (~7.5 cm/ឆ្នាំ) ប៉ុន្តែពីអាយុ 12 ដល់ 20 ឆ្នាំ កម្ពស់កើនបានត្រឹមតែប្រហែល 15.6 cm (~2 cm/ឆ្នាំ) ប៉ុណ្ណោះ។<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ពន្យល់សំដៅលើការកាត់បន្ថយភាពចោតនៃខ្សែក្រាប ឬការប្រៀបធៀបកំណើនជាក់ស្ដែង។<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយមិនសមហេតុផល (ឧ. ឆ្លើយថាក្មេងប្រុសខ្ពស់ជាង) ឬរំលង។',
      },

      m01q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបំពេញចន្លោះ',
        max: 1,
        parts: [
          { k: 'age_from', label: 'ចាប់ពីអាយុ (ឆ្នាំ)' },
          { k: 'age_to', label: 'ដល់អាយុ (ឆ្នាំ)' }
        ],
        summary: (r) => ((r.age_from || '—') + ' ដល់ ' + (r.age_to || '—') + ' ឆ្នាំ'),
        score: (r) => {
          const f = PISA.latin((r.age_from || '').trim()).replace(/[^\d.]/g, '');
          const t = PISA.latin((r.age_to || '').trim()).replace(/[^\d.]/g, '');

          if (!f && !t) {
            // Check if user entered both in one field
            const allText = PISA.latin((r.age_from || '') + ' ' + (r.age_to || '')).trim();
            if (/11.*13/.test(allText) || /11.*12/.test(allText)) {
              return { pts: 1, note: 'ចន្លោះអាយុត្រឹមត្រូវ (11 ដល់ 13 ឆ្នាំ)' };
            }
            return { pts: 0, note: 'មិនបានឆ្លើយ' };
          }

          const vf = parseFloat(f);
          const vt = parseFloat(t);

          // Full credit: 11 to 13 (or 11.2 to 13.0, or 11 to 12 in daily language)
          if ((vf === 11 || (vf >= 10.8 && vf <= 11.5)) && (vt === 13 || (vt >= 12.5 && vt <= 13.5))) {
            return { pts: 1, note: 'ចន្លោះអាយុត្រឹមត្រូវ (11 ដល់ 13 ឆ្នាំ)' };
          }
          if (vf === 11 && vt === 12) {
            return { pts: 1, note: 'ចន្លោះអាយុត្រឹមត្រូវ (11 និង 12 ឆ្នាំ)' };
          }
          // Partial / boundary condition
          if (vf === 12 && vt === 13) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (12 ដល់ 13 ឆ្នាំ)' };
          }
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 11 ដល់ 13 ឆ្នាំ)' };
        },
        key: '<b>ចន្លោះអាយុ 11 ដល់ 13 ឆ្នាំ</b> (ឬ អាយុ 11 និង 12 ឆ្នាំ)។<br><br>' +
          '<b>វិធីពិនិត្យលើក្រាប៖</b><br>' +
          'ពិនិត្យមើលខ្សែក្រាបទាំងពីរ៖<br>' +
          '• ខ្សែពណ៌ក្រហមផ្កាឈូកដាច់ៗ (ក្មេងស្រី) ស្ថិតនៅ<b>ខាងលើ</b>ខ្សែពណ៌ខៀវ (ក្មេងប្រុស) ចាប់ពីចំណុចប្រសព្វទីមួយ (ប្រហែលអាយុ 11 ឆ្នាំ ឬ 11.2 ឆ្នាំ) រហូតដល់ចំណុចប្រសព្វទីពីរ (ប្រហែលអាយុ 13 ឆ្នាំ)។<br>' +
          '• ក្រៅពីចន្លោះអាយុ 11 ដល់ 13 ឆ្នាំនេះ កម្ពស់ជាមធ្យមរបស់ក្មេងប្រុស គឺខ្ពស់ជាង ឬស្មើក្មេងស្រី។<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ចន្លោះអាយុ 11–13 ឆ្នាំ ឬបញ្ជាក់ថាអាយុ 11 និង 12 ឆ្នាំ។<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត (ឧ. អាយុលើសពី 13 ឆ្នាំ ឬ 10 ដល់ 11 ឆ្នាំ) ឬរំលង។',
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
            W.input(ctx, 'm01q1', 'height', '168.3', { width: '130px', math: true, cls: 'resp-input' }),
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
          W.p('<i>(សូមសរសេរពន្យល់ដោយផ្អែកលើការផ្លាស់ប្ដូរនៃភាពចោត ឬជម្រាលនៃខ្សែក្រាប ឬកំណើនកម្ពស់)</i>', 'hint'),
          W.textarea(ctx, 'm01q2', 'explain', 'សូមសរសេរការពន្យល់របស់អ្នកនៅទីនេះ...', 6)
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
          h('div', { style: 'margin: 16px 0; display: flex; align-items: center; gap: 10px; font-size: 1.05rem; flex-wrap: wrap;' },
            h('span', { style: 'font-weight: 600;' }, 'ចាប់ពីអាយុ ៖'),
            W.input(ctx, 'm01q3', 'age_from', '11', { width: '90px', math: true, cls: 'resp-input' }),
            h('span', { style: 'font-weight: 600;' }, 'ឆ្នាំ ដល់អាយុ ៖'),
            W.input(ctx, 'm01q3', 'age_to', '13', { width: '90px', math: true, cls: 'resp-input' }),
            h('span', { style: 'font-weight: 600;' }, 'ឆ្នាំ')
          ),
          W.p('<i>(បញ្ជាក់៖ បញ្ចូលលេខអាយុដែលក្មេងស្រីមានកម្ពស់ជាមធ្យមខ្ពស់ជាងក្មេងប្រុស)</i>', 'hint')
        ),
        right: stimulus,
      },
    ],
  });
})();
