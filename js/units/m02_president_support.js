/* Unit 02 (MoEYS 2025 / PISA M702) — ការគាំទ្រប្រធានាធិបតី (Support for the President)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៦–៧ (ប្រធានបទទី ២)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'ការគាំទ្រប្រធានាធិបតី';
  const EN_TITLE = 'Support for the President';

  // Stimulus displayed on the right panel
  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការស្ទង់មតិស្តីពីការគាំទ្រប្រធានាធិបតី'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.93rem; line-height: 1.55;' },
      'នៅក្នុងប្រទេសហ្ស៊ិតឡង់ (Zedland) ការស្ទង់មតិត្រូវបានធ្វើឡើង ដើម្បីស្វែងរកកម្រិតនៃការគាំទ្រប្រធានាធិបតីនៅក្នុងការបោះឆ្នោតនាពេលខាងមុខ។ ' +
      'អ្នកបោះពុម្ពកាសែតបួននាក់ បានធ្វើការស្ទង់មទទូទាំងប្រទេសដាច់ដោយឡែកពីគ្នា។ លទ្ធផលនៃការស្ទង់មតិរបស់កាសែតទាំងបួន មានដូចខាងក្រោម៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t02_newspapers.svg',
        alt: 'ព័ត៌មានលម្អិតអំពីការស្ទង់មតិរបស់កាសែតទាំងបួន',
        style: 'max-width: 100%; width: 560px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; font-size: 0.88rem; color: #334155; line-height: 1.55;' },
      h('b', { style: 'color: #0f172a;' }, 'សេចក្តីសង្ខេបអំពីកាសែតទាំងបួន ៖'),
      h('ul', { style: 'margin: 4px 0 0; padding-left: 20px;' },
        h('li', {}, '<b>កាសែតទី ១៖</b> 36.5% (ស្ទង់មតិថ្ងៃទី 6 ខែមករា · សំណាកចៃដន្យ 500 នាក់)'),
        h('li', {}, '<b>កាសែតទី ២៖</b> 41.0% (ស្ទង់មតិថ្ងៃទី 20 ខែមករា · សំណាកចៃដន្យ 500 នាក់)'),
        h('li', {}, '<b>កាសែតទី ៣៖</b> 39.0% (ស្ទង់មតិថ្ងៃទី 20 ខែមករា · សំណាកចៃដន្យ 1000 នាក់)'),
        h('li', {}, '<b>កាសែតទី ៤៖</b> 44.5% (ស្ទង់មតិថ្ងៃទី 20 ខែមករា · អ្នកអាន 1000 នាក់ទូរស័ព្ទមកបោះឆ្នោត)')
      )
    )
  );

  PISA.registerUnit({
    id: 'm02',
    no: 2,
    label: 'ប្រធានបទ ២',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 8,
    blurb: 'ការវិភាគទិន្នន័យនៃការស្ទង់មតិគាំទ្រប្រធានាធិបតី ភាពលំអៀងនៃសំណាក និងកាលបរិច្ឆេទ (PISA M702)។',
    questions: {
      m02q1: {
        label: 'សំណួរ ១',
        format: 'សំណើរើសជម្រើស និងពន្យល់ហេតុផល',
        max: 1,
        parts: [
          { k: 'newspaper', label: 'កាសែតដែលល្អបំផុត' },
          { k: 'reasons', label: 'ហេតុផលគាំទ្រ' }
        ],
        summary: (r) => {
          const names = { np1: 'កាសែតទី ១', np2: 'កាសែតទី ២', np3: 'កាសែតទី ៣', np4: 'កាសែតទី ៤' };
          return (names[r.newspaper] || r.newspaper || '—') + (r.reasons ? ' · ' + r.reasons : '');
        },
        score: (r) => {
          const choice = (r.newspaper || '').trim();
          const reasons = (r.reasons || '').trim();

          if (!choice && !reasons) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          // Must select Newspaper 3 (np3 or mentions Newspaper 3)
          const isNP3 = choice === 'np3' || /កាសែតទី\s*3|កាសែតទី\s*៣|newspaper\s*3/i.test(choice + ' ' + reasons);
          if (!isNP3) {
            return { pts: 0, note: 'មិនត្រឹមត្រូវ (កាសែតដែលផ្តល់ការព្យាករណ៍ល្អបំផុត គឺកាសែតទី ៣)' };
          }

          const lower = (reasons).toLowerCase();
          const lat = PISA.latin(lower);

          // Reason 1: Recency / Date closer to election day (Jan 20 vs Jan 6)
          const hasDateReason = /ជិត|កៀក|ថ្មី|20|២០|កាលបរិច្ឆេទ|ពេល|ថ្ងៃបោះឆ្នោត|មិនសូវមានពេលផ្លាស់ប្តូរ/.test(lower) ||
            /recent|close|date|january\s*20|time|latest|near/.test(lat);

          // Reason 2: Sample size / Random representative selection (1000 people random vs 500 or voluntary phone-in)
          const hasSampleReason = /1000|១០០០|ធំ|ច្រើន|ចៃដន្យ|តំណាង|ទូរស័ព្ទ|ស្ម័គ្រចិត្ត|មិនលំអៀង|សិទ្ធិបោះឆ្នោត|សំណាក/.test(lower) ||
            /1000|sample|random|large|size|bias|phone|represent/.test(lat);

          if (hasDateReason || hasSampleReason) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (ជ្រើសរើសកាសែតទី ៣ ព្រមទាំងផ្តល់ហេតុផលសមស្រប)' };
          }

          // If chose Newspaper 3 without sufficient reasons
          return { pts: 1, note: 'ត្រឹមត្រូវ (ជ្រើសរើសកាសែតទី ៣)' };
        },
        key: '<b>កាសែតទី ៣</b>។<br><br>' +
          '<b>ហេតុផលគាំទ្រ (ផ្តល់យ៉ាងតិចពីរ) ៖</b><br>' +
          '• <b>កាលបរិច្ឆេទជិតថ្ងៃបោះឆ្នោត ៖</b> ការស្ទង់មតិធ្វើឡើងនៅថ្ងៃទី 20 ខែមករា (ត្រឹមតែ 5 ថ្ងៃមុនថ្ងៃបោះឆ្នោតទី 25 មករា) ធ្វើឱ្យអ្នកបោះឆ្នោតមិនសូវមានពេលផ្លាស់ប្តូរចិត្ត ធៀបនឹងកាសែតទី 1 ដែលធ្វើតាំងពីថ្ងៃទី 6 មករា (19 ថ្ងៃមុន)។<br>' +
          '• <b>ទំហំសំណាកធំជាងគេ ៖</b> កាសែតទី 3 ស្ទង់មតិលើមនុស្សចំនួន <b>1000 នាក់</b> ដែលច្រើនជាងកាសែតទី 1 និងទី 2 (មានត្រឹមតែ 500 នាក់) នាំឱ្យលទ្ធផលមានកម្រិតលម្អៀងតូច និងគួរឱ្យជឿទុកចិត្តជាង។<br>' +
          '• <b>វិធីសាស្ត្រជ្រើសរើសដោយចៃដន្យពិតប្រាកដ ៖</b> កាសែតទី 3 ជ្រើសរើសសំណាកដោយចៃដន្យក្នុងចំណោមអ្នកមានសិទ្ធិបោះឆ្នោត។ ចំណែកកាសែតទី 4 ទោះបីមាន 1000 នាក់មែន តែជាការស្ម័គ្រចិត្តទូរស័ព្ទមករបស់អ្នកអាន (Voluntary Response Bias) មិនតំណាងឱ្យប្រជាជនទូទាំងប្រទេសឡើយ។<br><br>' +
          '<b>ការផ្តល់ពិន្ទុ ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ) ៖</b> ជ្រើសរើសកាសែតទី 3 និងផ្តល់ហេតុផលត្រឹមត្រូវ (កាលបរិច្ឆេទជិតដល់ថ្ងៃបោះឆ្នោត, សំណាកគំរូធំ 1000 នាក់, ការជ្រើសរើសដោយចៃដន្យ)។<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ) ៖</b> ជ្រើសរើសកាសែតផ្សេង (កាសែតទី 1, 2, 4) ឬរំលង។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាននៃការស្ទង់មតិស្តីពី «ការគាំទ្រប្រធានាធិបតី» នៅខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ២)</b> របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ) — កូដដើមអន្តរជាតិ OECD PISA: <b>M702 (Support for the President)</b>។<br><br>' +
              'អ្នកអាចប្រើប្រាស់<b>ម៉ាស៊ីនគិតលេខ</b>នៅលើរបារឧបករណ៍ខាងលើបាន ពេលកំពុងដោះស្រាយសំណួរ។'
            })
          )
        ),
        right: stimulus,
      },

      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m02q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានលម្អិតនៃកាសែតទាំងបួន នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('<b>តើលទ្ធផលរបស់កាសែតមួយណាដែលទំនងជាល្អបំផុត សម្រាប់ទស្សន៍ទាយពីកម្រិតនៃការគាំទ្រប្រធានាធិបតី ប្រសិនបើការបោះឆ្នោតត្រូវធ្វើនៅថ្ងៃទី 25 ខែមករា?</b>', 'q-lead'),
          W.radios(ctx, 'm02q1', 'newspaper', [
            { v: 'np1', html: '<b>កាសែតទី ១</b> (36.5% · ថ្ងៃទី 6 មករា · សំណាកចៃដន្យ 500 នាក់)' },
            { v: 'np2', html: '<b>កាសែតទី ២</b> (41.0% · ថ្ងៃទី 20 មករា · សំណាកចៃដន្យ 500 នាក់)' },
            { v: 'np3', html: '<b>កាសែតទី ៣</b> (39.0% · ថ្ងៃទី 20 មករា · សំណាកចៃដន្យ 1000 នាក់)' },
            { v: 'np4', html: '<b>កាសែតទី ៤</b> (44.5% · ថ្ងៃទី 20 មករា · អ្នកអាន 1000 នាក់ទូរស័ព្ទមក)' },
          ]),
          h('div', { style: 'margin-top: 18px;' },
            W.p('<b>ចូរផ្តល់ហេតុផលចំនួនពីរ ដើម្បីគាំទ្រចម្លើយរបស់អ្នក ៖</b>', 'q-lead'),
            W.p('<i>(សូមពន្យល់ដោយផ្អែកលើកាលបរិច្ឆេទស្ទង់មតិ ទំហំសំណាក និងវិធីសាស្ត្រជ្រើសរើសសំណាក)</i>', 'hint'),
            W.textarea(ctx, 'm02q1', 'reasons', 'សូមសរសេរហេតុផលទាំងពីររបស់អ្នកនៅទីនេះ...', 6)
          )
        ),
        right: stimulus,
      },
    ],
  });
})();
