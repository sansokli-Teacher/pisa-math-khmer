/* Unit M22 — សត្វភេនឃ្វីន (Penguins)
 * Source: MoEYS PISA 2025 Sample Items (2Math-PISA-Sample-Items.pdf, pages 60–64, Topic 22)
 * Original PISA Items: M474 / PM937 (Q1, Q2, Q3, Q4)
 * Grade Level: 8–9
 * Sub-discipline: ចំនួន, ពីជគណិត និង ស្ថិតិ (Quantity, Algebra & Statistics)
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'សត្វភេនឃ្វីន';
  const T_F = [
    { v: 'T', html: 'ពិត', label: 'ពិត' },
    { v: 'F', html: 'មិនពិត', label: 'មិនពិត' },
  ];
  const tfText = { T: 'ពិត', F: 'មិនពិត' };
  const tfSummary = (r, n) => Array.from({ length: n }, (_, i) => tfText[r[i]] || '—').join(' / ');

  const Q1_OPTS = [
    { v: 'A', html: '<b>ក.</b> 29%' },
    { v: 'B', html: '<b>ខ.</b> 32%' },
    { v: 'C', html: '<b>គ.</b> 41%' },
    { v: 'D', html: '<b>ឃ.</b> 71%' },
  ];
  const Q1_NAMES = { A: 'ក. 29%', B: 'ខ. 32%', C: 'គ. 41%', D: 'ឃ. 71%' };

  const Q3_OPTS = [
    { v: 'A', html: '<b>ក.</b> \\(P = 10\\,000 \\times (1.5 \\times 0.2)^7\\)' },
    { v: 'B', html: '<b>ខ.</b> \\(P = 10\\,000 \\times (1.5 \\times 0.8)^7\\)' },
    { v: 'C', html: '<b>គ.</b> \\(P = 10\\,000 \\times (1.2 \\times 0.2)^7\\)' },
    { v: 'D', html: '<b>ឃ.</b> \\(P = 10\\,000 \\times (1.2 \\times 0.8)^7\\)' },
  ];
  const Q3_NAMES = {
    A: 'ក. P = 10 000 × (1.5 × 0.2)⁷',
    B: 'ខ. P = 10 000 × (1.5 × 0.8)⁷',
    C: 'គ. P = 10 000 × (1.2 × 0.2)⁷',
    D: 'ឃ. P = 10 000 × (1.2 × 0.8)⁷',
  };

  const Q4_ROWS = [
    'នៅឆ្នាំ 2000 ចំនួនកូនជាមធ្យមដែលចិញ្ចឹមក្នុងភេនឃ្វីនមួយគូ មានទំហំធំជាង 0.6 ។',
    'ក្នុងឆ្នាំ 2006 ជាមធ្យមតិចជាង 80% នៃគូភេនឃ្វីនចិញ្ចឹមកូន។',
    'នៅឆ្នាំ 2015 សត្វភេនឃ្វីនទាំងបីប្រភេទនេះនឹងត្រូវផុតពូជ។',
    'ចំនួនមធ្យមនៃកូនភេនឃ្វីន ម៉ាជឺឡេនិក (Magellanic) ដែលចិញ្ចឹមក្នុងភេនឃ្វីនមួយគូ បានថយចុះនៅចន្លោះឆ្នាំ 2001 និងឆ្នាំ 2004 ។',
  ];
  const Q4_KEY = ['T', 'T', 'F', 'T'];

  // Stimulus 1: Context & Colony Photo
  function stimulusIntro() {
    return W.stack(
      h('div', { class: 'stimulus-card', style: 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);' },
        h('div', { style: 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px;' },
          h('h3', { style: 'margin: 0; font-size: 1.1rem; color: #1e3a8a; font-weight: 700; display: flex; align-items: center; gap: 8px;' },
            h('span', { style: 'font-size: 1.3rem;' }, '🐧'),
            'បេសកកម្មថតរូបសត្វភេនឃ្វីន'
          ),
          h('span', { style: 'background: #eff6ff; color: #1d4ed8; font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid #bfdbfe;' }, 'ទ្វីបអង់តាក់ទិក')
        ),
        h('div', { style: 'text-align: center; margin-bottom: 12px;' },
          h('img', {
            src: 'assets/moeys/t22_penguins_colony.jpg',
            alt: 'ហ្វូងសត្វភេនឃ្វីន និងកូនៗនៅទ្វីបអង់តាក់ទិក',
            style: 'max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 1px 4px rgba(0,0,0,0.08);'
          })
        ),
        h('p', { style: 'font-size: 0.95rem; line-height: 1.65; color: #334155; margin: 0;' },
          '<b>ធារិទ្ធ</b> ជាអ្នកថតរូបសត្វ បានទៅធ្វើបេសកកម្មរយៈពេលមួយឆ្នាំ ហើយបានថតរូបសត្វភេនឃ្វីន និងកូនជាច្រើន។ គាត់ចាប់អារម្មណ៍ជាពិសេសចំពោះការលូតកម្ពស់ និងការប្រែប្រួលចំនួននៃហ្វូងសត្វភេនឃ្វីនផ្សេងៗគ្នា។'
        )
      )
    );
  }

  // Stimulus 2: Bar Chart for Question 4
  function stimulusChart() {
    return W.stack(
      h('div', { class: 'stimulus-card', style: 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);' },
        h('div', { style: 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px;' },
          h('h3', { style: 'margin: 0; font-size: 1.05rem; color: #1e3a8a; font-weight: 700;' }, '📊 ក្រាបសសរ៖ កូនភេនឃ្វីនចិញ្ចឹមក្នុងមួយគូ'),
          h('span', { style: 'background: #ecfdf5; color: #047857; font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid #a7f3d0;' }, 'ឆ្នាំ ២០០០–២០០៨')
        ),
        h('div', { style: 'text-align: center; margin-bottom: 10px;' },
          h('img', {
            src: 'assets/moeys/t22_penguins_chart.jpg',
            alt: 'ក្រាបសសរបង្ហាញចំនួនកូនភេនឃ្វីនប្រចាំឆ្នាំដែលចិញ្ចឹមក្នុងមួយគូ',
            style: 'max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1;'
          })
        ),
        h('div', { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; font-size: 0.85rem; line-height: 1.6; color: #475569;' },
          h('div', { style: 'font-weight: 700; color: #1e293b; margin-bottom: 4px;' }, 'កំណត់សម្គាល់ប្រភេទភេនឃ្វីន (Legend)៖'),
          h('div', { style: 'display: flex; flex-direction: column; gap: 4px;' },
            h('div', { style: 'display: flex; align-items: center; gap: 8px;' },
              h('span', { style: 'display: inline-block; width: 14px; height: 14px; background: #64748b; border-radius: 2px;' }),
              h('span', { html: '<b>ហ្សេនតូ (Gentoo)៖</b> សសរពណ៌ប្រផេះចាស់ (ខាងឆ្វេង)' })
            ),
            h('div', { style: 'display: flex; align-items: center; gap: 8px;' },
              h('span', { style: 'display: inline-block; width: 14px; height: 14px; background: #cbd5e1; border: 1px solid #94a3b8; border-radius: 2px;' }),
              h('span', { html: '<b>រ៉ុកខបភ័រ / រ៉ុកហូបភើរ (Rockhopper)៖</b> សសរពណ៌ប្រផេះខ្ចី (កណ្ដាល)' })
            ),
            h('div', { style: 'display: flex; align-items: center; gap: 8px;' },
              h('span', { style: 'display: inline-block; width: 14px; height: 14px; background: #0f172a; border-radius: 2px;' }),
              h('span', { html: '<b>ម៉ាជឺឡេនិក (Magellanic)៖</b> សសរពណ៌ខ្មៅ (ខាងស្ដាំ)' })
            )
          )
        )
      )
    );
  }

  PISA.registerUnit({
    id: 'm22',
    no: 22,
    label: 'ប្រធានបទ ២២',
    title: TITLE,
    en: 'Penguins',
    collection: 'moeys',
    badge: 'ប្រធានបទ ២២',
    blurb: 'ការគណនាភាគរយទម្ងន់ពង កំណើននិងមរណភាពនៃហ្វូង និងការវិភាគក្រាបសសរពហុឆ្នាំ។',
    questions: {
      m22q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរពហុជ្រើសរើស',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => Q1_NAMES[r.choice] || '—',
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          return r.choice === 'C'
            ? { pts: 1, note: 'ត្រឹមត្រូវ (គ. 41%)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>គ. 41%</b> (ឬ 42%)។<br><br>' +
          '<b>វិធីគណនា៖</b><br>' +
          '• ទម្ងន់ពងទីមួយ \\(= 78\\text{ g}\\)<br>' +
          '• ទម្ងន់ពងទីពីរ \\(= 110\\text{ g}\\)<br>' +
          '• គម្លាតទម្ងន់ \\(= 110 - 78 = 32\\text{ g}\\)<br>' +
          'ភាគរយដែលពងទីពីរធ្ងន់ជាងពងទីមួយគឺ៖<br>' +
          '\\[\\frac{32}{78} \\times 100\\% \\approx 41.025\\% \\approx 41\\%\\]<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ជ្រើសរើស គ (41%)<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
      m22q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរចម្លើយខ្លី',
        max: 1,
        parts: [{ k: 'count', label: 'ចំនួនសត្វភេនឃ្វីន' }],
        summary: (r) => (r.count ? r.count + ' ក្បាល' : '—'),
        score: (r) => {
          const raw = (r.count || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const p = PISA.parseAnswer(raw);
          if (p && PISA.inRange(p.value, 12000, 12000)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (12 000 ក្បាល)' };
          }
          const lat = PISA.latin(raw).replace(/[\s,]/g, '');
          if (/\b12000\b/.test(lat)) {
            return { pts: 1, note: 'ត្រឹមត្រូវ (12 000 ក្បាល)' };
          }
          return { pts: 0, note: 'ចម្លើយមិនត្រឹមត្រូវ' };
        },
        key: '<b>12 000</b> (ឬ 12 000 ក្បាល)។<br><br>' +
          '<b>វិធីគណនា៖</b><br>' +
          '1. នៅដើមឆ្នាំ មានភេនឃ្វីន 10 000 ក្បាល ស្មើនឹង 5 000 គូ។<br>' +
          '2. គូនីមួយៗចិញ្ចឹមកូនបាន 1 នៅរដូវផ្ការីក នាំឱ្យមានកូនកើតថ្មី \\(5\\,000 \\times 1 = 5\\,000\\) ក្បាល។<br>' +
          '3. ចំនួនភេនឃ្វីនសរុប (ពេញវ័យ និងកូន) មុនចុងឆ្នាំគឺ \\(10\\,000 + 5\\,000 = 15\\,000\\) ក្បាល។<br>' +
          '4. នៅចុងឆ្នាំ 20% នៃភេនឃ្វីនទាំងអស់នឹងស្លាប់ ដូច្នេះនៅសល់ 80%៖<br>' +
          '\\[15\\,000 \\times (1 - 0.20) = 15\\,000 \\times 0.80 = 12\\,000\\text{ ក្បាល}\\]<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> 12 000<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
      m22q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរពហុជ្រើសរើស',
        max: 1,
        parts: [{ k: 'choice', label: 'រូបមន្ត' }],
        summary: (r) => Q3_NAMES[r.choice] || '—',
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          return r.choice === 'B'
            ? { pts: 1, note: 'ត្រឹមត្រូវ (ខ)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ខ. \\(P = 10\\,000 \\times (1.5 \\times 0.8)^7\\)</b><br><br>' +
          '<b>ការពន្យល់លម្អិត៖</b><br>' +
          '• ចំនួនដើមដំបូងគឺ \\(10\\,000\\) ក្បាល។<br>' +
          '• ក្នុងមួយឆ្នាំៗ ចំនួនកូនកើតថ្មីគឺ 50% នៃចំនួនសរុប (ព្រោះ 2 ក្បាលបង្កើតបានកូន 1) នាំឱ្យចំនួនសរុបកើនដល់ \\(100\\% + 50\\% = 150\\% = 1.5\\) ដង។<br>' +
          '• នៅចុងឆ្នាំនីមួយៗ ស្លាប់ 20% ដូច្នេះនៅសល់ \\(100\\% - 20\\% = 80\\% = 0.8\\) ដង។<br>' +
          '• ដូច្នេះក្នុង 1 ឆ្នាំ ចំនួនភេនឃ្វីនត្រូវគុណនឹងកត្តា \\((1.5 \\times 0.8)\\)។<br>' +
          '• បន្ទាប់ពី 7 ឆ្នាំ ចំនួនសរុប \\(P\\) គឺ \\(P = 10\\,000 \\times (1.5 \\times 0.8)^7\\)។<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ជ្រើសរើស ខ<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
      m22q4: {
        label: 'សំណួរ ៤',
        format: 'សំណួរចម្លើយឆ្លាស់ (ពិត / មិនពិត)',
        max: 1,
        parts: [0, 1, 2, 3].map((i) => ({ k: String(i), label: 'អំណះអំណាង ' + (i + 1) })),
        summary: (r) => tfSummary(r, 4),
        score: (r) => {
          const ans = [r[0], r[1], r[2], r[3]];
          if (ans.every((a) => !a)) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = Q4_KEY.every((v, i) => r[i] === v);
          return ok
            ? { pts: 1, note: 'ត្រឹមត្រូវ (ពិត, ពិត, មិនពិត, ពិត)' }
            : { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ពិត, ពិត, មិនពិត, ពិត</b> តាមលំដាប់។<br><br>' +
          '<b>ការពន្យល់លម្អិត៖</b><br>' +
          '1. <i>«នៅឆ្នាំ 2000 ចំនួនកូនជាមធ្យមដែលចិញ្ចឹមក្នុងភេនឃ្វីនមួយគូ មានទំហំធំជាង 0.6»៖</i> <b>ពិត</b> — លើក្រាបឆ្នាំ 2000 សសរហ្សេនតូមានប្រហែល 1.13 និងម៉ាជឺឡេនិកមាន 1.0 ដែលសុទ្ធតែធំជាង 0.6។<br>' +
          '2. <i>«ក្នុងឆ្នាំ 2006 ជាមធ្យមតិចជាង 80% នៃគូភេនឃ្វីនចិញ្ចឹមកូន»៖</i> <b>ពិត</b> — ក្នុងឆ្នាំ 2006 សសរទាំងបីសុទ្ធតែនៅក្រោម 0.8 (ស្មើ 80%) ពោលគឺហ្សេនតូប្រហែល 0.40, រ៉ុកខបភ័រប្រហែល 0.71, ម៉ាជឺឡេនិកប្រហែល 0.51។<br>' +
          '3. <i>«នៅឆ្នាំ 2015 សត្វភេនឃ្វីនទាំងបីប្រភេទនេះនឹងត្រូវផុតពូជ»៖</i> <b>មិនពិត</b> — ក្រាបទិន្នន័យមានត្រឹមឆ្នាំ 2008 ប៉ុណ្ណោះ មិនអាចទាញសេចក្តីសន្និដ្ឋានថាផុតពូជនៅឆ្នាំ 2015 នោះឡើយ។<br>' +
          '4. <i>«ចំនួនមធ្យមនៃកូនភេនឃ្វីន ម៉ាជឺឡេនិក ដែលចិញ្ចឹមក្នុងមួយគូ បានថយចុះនៅចន្លោះឆ្នាំ 2001 និងឆ្នាំ 2004»៖</i> <b>ពិត</b> — សសរពណ៌ខ្មៅ (ម៉ាជឺឡេនិក) ថយចុះជាបន្តបន្ទាប់រាល់ឆ្នាំពី 1.0 (ឆ្នាំ 2001) មក 0.83 (2002), 0.76 (2003) និង 0.50 (2004)។<br><br>' +
          '<b>ការផ្ដល់ពិន្ទុ៖</b><br>' +
          '• <b>ពិន្ទុពេញ (១ ពិន្ទុ)៖</b> ចម្លើយត្រឹមត្រូវទាំងបួន៖ ពិត, ពិត, មិនពិត, ពិត<br>' +
          '• <b>គ្មានពិន្ទុ (០ ពិន្ទុ)៖</b> ចម្លើយផ្សេងទៀត និងរំលង។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 42,
        left: () => W.stack(
          W.instr('សូមអានព័ត៌មានអំពី «សត្វភេនឃ្វីន» នៅខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; margin-top: 10px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ២២)</b> របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ)។<br><br>' +
              'ប្រធានបទនេះមាន <b>៤ សំណួរ</b> ដែលគ្របដណ្តប់លើការគណនាភាគរយ ពីជគណិត និងការបកស្រាយទិន្នន័យក្រាបសសរស្ថិតិ។ អ្នកអាចប្រើប្រាស់<b>ម៉ាស៊ីនគិតលេខ</b>នៅលើរបារឧបករណ៍ខាងលើបាន។'
            })
          )
        ),
        right: stimulusIntro,
      },
      {
        tag: 'សំណួរ ១ / ៤',
        split: 42,
        items: ['m22q1'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានខាងក្រោម។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('ជាធម្មតា សត្វភេនឃ្វីនមួយគូ បង្កើតពងចំនួនពីរក្នុងមួយឆ្នាំៗ។ កូនដែលញាស់ពីពងដែលមានទំហំធំជាងគេក្នុងចំណោមពងទាំងពីរ គឺជាកូនតែមួយគត់ដែលនៅរស់។'),
          W.p('ជាមួយនឹងសត្វភេនឃ្វីន រ៉ុកហូបភើរ (Rockhopper) ពងទីមួយមានទម្ងន់ប្រហែល <b>78 g</b> និងពងទីពីរមានទម្ងន់ប្រហែល <b>110 g</b>។'),
          W.p('<b>តើពងទីពីរ ធ្ងន់ជាងពងទីមួយប្រហែលប៉ុន្មានភាគរយ?</b>', 'q-lead'),
          W.radios(ctx, 'm22q1', 'choice', Q1_OPTS)
        ),
        right: stimulusIntro,
      },
      {
        tag: 'សំណួរ ២ / ៤',
        split: 42,
        items: ['m22q2'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានខាងក្រោម។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('ធារិទ្ធឆ្ងល់ថាតើទំហំនៃអាណាចក្រភេនឃ្វីននឹងផ្លាស់ប្ដូរយ៉ាងដូចម្ដេចក្នុងរយៈពេលប៉ុន្មានឆ្នាំខាងមុខនេះ។ លោកធ្វើការសន្មតដូចខាងក្រោម៖'),
          h('ul', { style: 'margin: 8px 0 12px 20px; font-size: 0.95rem; line-height: 1.6;' },
            h('li', { html: 'នៅដើមឆ្នាំ អាណាចក្រភេនឃ្វីនមាន <b>10 000 ក្បាល (5 000 គូ)</b>។' }),
            h('li', {}, 'គូភេនឃ្វីននីមួយៗចិញ្ចឹមកូនមួយនៅរដូវផ្ការីកជារៀងរាល់ឆ្នាំ។'),
            h('li', { html: 'នៅចុងឆ្នាំ <b>20%</b> នៃសត្វភេនឃ្វីនទាំងអស់ (ភេនឃ្វីនពេញវ័យ និងកូន) នឹងស្លាប់។' })
          ),
          W.p('<b>តើនៅចុងឆ្នាំដំបូង មានសត្វភេនឃ្វីនប៉ុន្មានក្បាល (ពេញវ័យ និងកូន) នៅក្នុងអាណាចក្រ?</b>', 'q-lead'),
          h('div', { class: 'answer-line-wrap', style: 'margin: 14px 0; display: flex; align-items: center; gap: 10px; font-size: 1.05rem;' },
            h('span', { style: 'font-weight: 600;' }, 'ចំនួនសត្វភេនឃ្វីន៖'),
            W.input(ctx, 'm22q2', 'count', '12000', { width: '140px', math: true, cls: 'resp-input' }),
            h('span', { style: 'font-weight: 600;' }, 'ក្បាល')
          )
        ),
        right: stimulusIntro,
      },
      {
        tag: 'សំណួរ ៣ / ៤',
        split: 42,
        items: ['m22q3'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលព័ត៌មានខាងក្រោម។ អ្នកអាចប្រើម៉ាស៊ីនគិតលេខនៅលើរបារខាងលើបាន។'),
          W.p('ធារិទ្ធសន្មតថាអាណាចក្រភេនឃ្វីននឹងបន្តរីកចម្រើនតាមលក្ខណៈដូចខាងក្រោម៖'),
          h('ul', { style: 'margin: 8px 0 12px 20px; font-size: 0.93rem; line-height: 1.6;' },
            h('li', {}, 'នៅដើមឆ្នាំនីមួយៗ អាណាចក្រមានចំនួនសត្វភេនឃ្វីនឈ្មោល និងញីដែលបង្កើតជាគូ។'),
            h('li', {}, 'គូភេនឃ្វីននីមួយៗចិញ្ចឹមកូនមួយនៅរដូវផ្ការីកជារៀងរាល់ឆ្នាំ។'),
            h('li', {}, 'នៅចុងឆ្នាំនីមួយៗ 20% នៃសត្វភេនឃ្វីនទាំងអស់ (ពេញវ័យ និងកូន) នឹងស្លាប់។'),
            h('li', {}, 'សត្វភេនឃ្វីនដែលមានអាយុមួយឆ្នាំក៏នឹងចិញ្ចឹមកូនផងដែរ។')
          ),
          W.p('<b>ផ្អែកលើការសន្មតខាងលើ តើរូបមន្តមួយណាដែលពណ៌នាអំពីចំនួនសរុបនៃសត្វភេនឃ្វីន \\(P\\) បន្ទាប់ពីរយៈពេល 7 ឆ្នាំ?</b>', 'q-lead'),
          W.radios(ctx, 'm22q3', 'choice', Q3_OPTS)
        ),
        right: stimulusIntro,
      },
      {
        tag: 'សំណួរ ៤ / ៤',
        split: 42,
        items: ['m22q4'],
        left: (ctx) => W.stack(
          W.instr('សូមពិនិត្យមើលក្រាបសសរនៅផ្ទាំងខាងស្ដាំ។ ចុចជ្រើសរើស «ពិត» ឬ «មិនពិត» សម្រាប់អំណះអំណាងនីមួយៗ។'),
          W.p('បន្ទាប់ពីគាត់ត្រឡប់មកផ្ទះវិញពីការធ្វើដំណើររបស់គាត់ ធារិទ្ធ បានស្វែងរកព័ត៌មានតាមអ៊ីនធឺណិតដើម្បីមើលថាតើមានកូនភេនឃ្វីនជាមធ្យមប៉ុន្មានក្បាលដែលមេបាចិញ្ចឹម។'),
          W.p('គាត់រកឃើញក្រាបសសរខាងស្ដាំសម្រាប់សត្វភេនឃ្វីនបីប្រភេទគឺ <b>ហ្សេនតូ (Gentoo)</b>, <b>រ៉ុកហូបភើរ (Rockhopper)</b> និង <b>ម៉ាជឺឡេនិក (Magellanic)</b>។'),
          W.p('<b>ផ្អែកលើក្រាបខាងស្ដាំ តើអំណះអំណាងខាងក្រោមអំពីប្រភេទសត្វភេនឃ្វីនទាំងបីនេះពិត ឬមិនពិត?</b>', 'q-lead'),
          W.choiceTable(ctx, 'm22q4', {
            head: 'អំណះអំណាង',
            cols: T_F,
            rows: Q4_ROWS,
          })
        ),
        right: stimulusChart,
      },
    ],
  });
})();
