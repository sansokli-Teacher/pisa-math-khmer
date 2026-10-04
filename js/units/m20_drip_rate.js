/* Unit 20 (MoEYS 2025) — អត្រាស្រក់ (Drip Rate)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៤៩–៥១ (ប្រធានបទទី ២០)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'អត្រាស្រក់';
  const EN_TITLE = 'Drip Rate';

  // Stimulus displayed on the right panel
  const stimulus = () => h('div', { class: 'stack drip-stim' },
    h('div', { class: 'stim-card', style: 'background: #ffffff; padding: 4px;' },
      h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 8px;' }, 'ការចាក់បញ្ចូលសារធាតុរាវតាមសរសៃឈាម'),
      h('p', {}, 'ការចាក់បញ្ចូលសារធាតុរាវតាមសរសៃឈាម (ឬ ដំណក់ទឹកតាមសរសៃឈាម) ត្រូវបានប្រើដើម្បីបញ្ជូនសារធាតុរាវ និងថ្នាំដល់អ្នកជំងឺ។'),
      h('div', { class: 'drip-fig-wrap', style: 'text-align: center; margin: 12px 0;' },
        h('img', {
          src: 'assets/moeys/t20_drip_rate.jpg',
          alt: 'ដបសេរ៉ូម និងឧបករណ៍ចាក់បញ្ចូលតាមសរសៃឈាម (IV Drip)',
          style: 'max-width: 270px; width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 2px 5px rgba(0,0,0,0.08);'
        }),
        h('p', { style: 'font-size: 0.82rem; color: #64748b; margin-top: 5px;' }, 'ដបសេរ៉ូម និងបំពង់ដំណក់ទឹកតាមសរសៃឈាម (Intravenous Drip)')
      ),
      h('p', {}, 'គិលានុបដ្ឋាយិកាត្រូវគណនា \\(D\\) ជាអត្រាស្រក់ក្នុងមួយនាទី សម្រាប់ការចាក់បញ្ចូលសារធាតុរាវតាមសរសៃឈាម។'),
      h('div', { class: 'formula-box', style: 'background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 6px; margin: 10px 0;' },
        h('p', { style: 'font-weight: 600; margin-bottom: 4px; color: #0369a1;' }, 'គេប្រើរូបមន្ត៖'),
        h('div', { style: 'font-size: 1.25rem; text-align: center; margin: 8px 0;' }, '\\[D = \\frac{d \\cdot v}{60 \\cdot n}\\]'),
        h('p', { style: 'margin-bottom: 4px; font-weight: 600;' }, 'ដែល៖'),
        h('ul', { style: 'padding-left: 20px; margin: 0;' },
          h('li', {}, '\\(d\\) គឺជាចំនួនដំណក់ដែលស្រក់ក្នុងមួយមីលីលីត្រ (\\(\\text{drops/mL}\\))'),
          h('li', {}, '\\(v\\) គឺជាមាឌសារធាតុរាវគិតជា \\(\\text{mL}\\)'),
          h('li', {}, '\\(n\\) គឺជាចំនួនម៉ោងនៃដំណើរការចាក់បញ្ចូលសារធាតុរាវតាមសរសៃឈាម។')
        )
      )
    )
  );

  PISA.registerUnit({
    id: 'm20',
    no: 20,
    label: 'ប្រធានបទ ២០',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 8,
    blurb: 'ការគណនាអត្រាស្រក់នៃដំណក់ទឹកសេរ៉ូមតាមសរសៃឈាម (IV Drip Rate) ដោយប្រើរូបមន្តពីជគណិត D = (d · v)/(60 · n)។',
    questions: {
      m20q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរសរសេរពន្យល់',
        max: 2,
        parts: [{ k: 'why', label: 'ពណ៌នាអំពីបម្រែបម្រួល D' }],
        summary: (r) => r.why || '—',
        score: (r) => {
          const text = (r.why || '').trim();
          if (!text) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const lower = text.toLowerCase();
          const latin = PISA.latin(lower);

          // Direction indicators (ថយចុះ / តូចជាងមុន)
          const hasDecrease = /ថយ|តូច|ចុះ|កាត់បន្ថយ|decrease|smaller|drop|lower|halv|less|down/.test(lower);
          const hasIncrease = /កើន|ធំ|ឡើង|ច្រើន|increase|bigger|greater|double|up/.test(lower);

          // Magnitude indicators (ពាក់កណ្ដាល / 50% / ២ ដង)
          const hasHalf = /ពាក់កណ្ដាល|កណ្ដាល|កន្លះ|50\s*%|50%|50|៥០\s*%|៥០|1\/2|១\/២|២\s*ដង|2\s*ដង|half|halved|fifty/.test(latin);

          // Full credit (2 pts): describes both direction and magnitude correctly
          if (hasDecrease && hasHalf && !hasIncrease) {
            return { pts: 2, note: 'ពិន្ទុពេញ៖ បានពណ៌នាទាំងទិសដៅ (ថយចុះ) និងទំហំ (ពាក់កណ្ដាល ឬ 50%)' };
          }
          // Partial credit (1 pt): specifies either direction or magnitude correctly, but not both
          if ((hasDecrease && !hasIncrease) || hasHalf) {
            return { pts: 1, note: 'ពិន្ទុមិនពេញ៖ បានបញ្ជាក់ត្រឹមត្រូវតែទិសដៅ ឬទំហំ' };
          }
          // Wrong direction (increases)
          if (hasIncrease) {
            return { pts: 0, note: 'គ្មានពិន្ទុ៖ D សមាមាត្រច្រាសនឹង n ដូច្នេះពេល n កើនឡើង D ត្រូវតែថយចុះ' };
          }
          // General default for manual teacher check
          return { pts: null, note: 'គ្រូត្រូវអាន និងដាក់ពិន្ទុតាមអត្រាកំណែ' };
        },
        key: '<b>ពិន្ទុពេញ (២ ពិន្ទុ)៖</b> ការពន្យល់ពណ៌នាទាំងពីរ ទាំងទិសដៅនៃផលប៉ះពាល់ និងទំហំរបស់វា៖<br>' +
          '• \\(D\\) នឹងថយចុះពាក់កណ្ដាល (ឬតូចជាងមុន 50% / \\(D\\) ថយចុះ ២ ដង)។<br>' +
          '• <i>មូលហេតុ៖</i> តាមរូបមន្ត \\(D = \\frac{d \\cdot v}{60 \\cdot n}\\) អថេរ \\(n\\) ស្ថិតនៅភាគបែង ដូច្នេះ \\(D\\) សមាមាត្រច្រាសនឹង \\(n\\)។ កាលណា \\(n\\) កើនឡើងទ្វេដង (ទៅជា \\(2n\\)) នោះអត្រា \\(D_{new} = \\frac{d \\cdot v}{60 \\cdot (2n)} = \\frac{1}{2} D\\) គឺថយចុះពាក់កណ្ដាល។<br><br>' +
          '<b>ពិន្ទុមិនពេញ (១ ពិន្ទុ)៖</b> ការឆ្លើយតបដែលបញ្ជាក់ត្រឹមត្រូវទាំងទិសដៅ ឬទំហំនៃផលប៉ះពាល់ ប៉ុន្តែមិនបានទាំងពីរ៖<br>' +
          '• \\(D\\) កាន់តែតូចជាងមុន [បញ្ជាក់តែទិសដៅ គ្មានទំហំ]<br>' +
          '• មានការប្រែប្រួល 50% [បញ្ជាក់តែទំហំ គ្មានទិសដៅ]<br>' +
          '• \\(D\\) ធំជាង 50% [ទិសដៅមិនត្រឹមត្រូវ តែទំហំត្រឹមត្រូវ]<br><br>' +
          '<b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> \\(D\\) កើនឡើងទ្វេដង ឬចម្លើយផ្សេងទៀត ឬរំលង។',
      },
      m20q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរចម្លើយខ្លី',
        max: 1,
        parts: [{ k: 'v', label: 'មាឌនៃសារធាតុរាវ v (mL)' }],
        summary: (r) => (r.v ? r.v + ' mL' : '—'),
        score: (r) => {
          const raw = (r.v || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };

          const p = PISA.parseAnswer(raw);
          if (p && PISA.inRange(p.value, 360, 360)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (360 mL)' };
          }
          const lat = PISA.latin(raw);
          if (/\b360\b/.test(lat)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (360 mL)' };
          }
          // Accept correct formula substitution: (60 * 3 * 50) / 25
          const norm = lat.replace(/\s+/g, '').replace(/[×xX*·]/g, '*').replace(/[÷:]/g, '/');
          if (/(60\*3\*50|180\*50|9000)\/25/.test(norm)) {
            return { pts: 1, note: 'ការប្ដូរ និងជំនួសត្រឹមត្រូវ' };
          }
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ' };
        },
        key: '<b>360 mL</b> (ឬ 360)។<br><br>' +
          '<b>វិធីគណនា៖</b><br>' +
          'តាមរូបមន្ត \\(D = \\frac{d \\cdot v}{60 \\cdot n}\\) យើងទាញរកមាឌសារធាតុរាវ \\(v\\)៖<br>' +
          '\\[v = \\frac{60 \\cdot n \\cdot D}{d}\\]<br>' +
          'ជំនួសតម្លៃដែលបានផ្ដល់៖<br>' +
          '• \\(n = 3\\) ម៉ោង<br>' +
          '• \\(D = 50\\) ដំណក់ក្នុងមួយនាទី<br>' +
          '• \\(d = 25\\) ដំណក់ក្នុងមួយមីលីលីត្រ<br>' +
          '\\[v = \\frac{60 \\times 3 \\times 50}{25} = \\frac{9000}{25} = 360\\text{ mL}\\]<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> 360 ឬដំណោះស្រាយប្តូរ និងជំនួសត្រឹមត្រូវ \\(\\frac{60 \\times 3 \\times 50}{25}\\)។<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 42,
        left: () => W.stack(
          W.instr('សូមអានព័ត៌មានអំពី «អត្រាស្រក់» នៅខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; margin-top: 10px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ២០)</b> របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ)។<br><br>' +
              'អ្នកអាចប្រើប្រាស់<b>ម៉ាស៊ីនគិតលេខ</b>នៅលើរបារឧបករណ៍ខាងលើបាន ពេលកំពុងដោះស្រាយសំណួរ។'
            )
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ២',
        split: 42,
        items: ['m20q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាន «អត្រាស្រក់» នៅផ្ទាំងខាងស្ដាំ។'),
          W.p('គិលានុបដ្ឋាយិកាចង់បង្កើនពេលវេលាទ្វេដងនៃការចាក់បញ្ចូលសារធាតុរាវ។'),
          W.p('<b>ចូរពណ៌នាអំពីបម្រែបម្រួល \\(D\\) ប្រសិនបើ \\(n\\) ត្រូវបានកើនឡើងទ្វេដង ប៉ុន្តែ \\(d\\) និង \\(v\\) មិនប្រែប្រួល។</b>', 'q-lead'),
          W.p('<i>(សូមសរសេរពន្យល់ឱ្យបានច្បាស់លាស់ទាំងទិសដៅនៃការប្រែប្រួល និងទំហំនៃការប្រែប្រួល)</i>', 'hint'),
          W.textarea(ctx, 'm20q1', 'why', 'សូមសរសេរពណ៌នាអំពីបម្រែបម្រួលនៃ D នៅទីនេះ...', 5)
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ២',
        split: 42,
        items: ['m20q2'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មាន «អត្រាស្រក់» នៅផ្ទាំងខាងស្ដាំ។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('គិលានុបដ្ឋាយិកាត្រូវការគណនាមាឌនៃសារធាតុរាវ \\(v\\) ពីអត្រាស្រក់ក្នុងមួយនាទី \\(D\\)។'),
          W.p('ការចាក់បញ្ចូលសារធាតុរាវ ដែលមានអត្រាស្រក់ <b>50 ដំណក់ក្នុងមួយនាទី</b> ត្រូវផ្ដល់ឱ្យអ្នកជំងឺរយៈពេល <b>3 ម៉ោង</b>។ សម្រាប់ការចាក់បញ្ចូលសារធាតុរាវ ចំនួនដំណក់ដែលស្រក់គឺ <b>25 ដំណក់ក្នុងមួយមីលីលីត្រ</b>។'),
          W.p('<b>តើមាឌនៃសារធាតុរាវដែលចាក់បញ្ចូល ស្មើនឹងប៉ុន្មាន mL?</b>', 'q-lead'),
          h('div', { class: 'answer-line-wrap', style: 'margin: 14px 0; display: flex; align-items: center; gap: 10px; font-size: 1.05rem;' },
            h('span', { style: 'font-weight: 600;' }, 'មាឌនៃសារធាតុរាវ \\(v =\\)'),
            W.input(ctx, 'm20q2', 'v', '360', { width: '120px', math: true, cls: 'resp-input' }),
            h('span', { style: 'font-weight: 600;' }, 'mL')
          ),
          h('details', { style: 'margin-top: 14px; font-size: 0.88rem; color: #4b5563; background: #f9fafb; padding: 8px 12px; border-radius: 6px; border: 1px dashed #cbd5e1;' },
            h('summary', { style: 'cursor: pointer; font-weight: 500;' }, 'បង្ហាញជំហានគណនា ឬរូបមន្ត (មិនតម្រូវជាកាតព្វកិច្ច)'),
            h('div', { style: 'margin-top: 8px;' },
              W.textarea(ctx, 'm20q2', 'work', 'អ្នកអាចកត់ត្រាជំហានគណនា ឬរូបមន្តនៅទីនេះ...', 3)
            )
          )
        ),
        right: stimulus,
      },
    ],
  });
})();
