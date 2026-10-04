/* Unit 16 — ឧបករណ៍ដែលខូច (Faulty Devices) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ការផលិត និងការត្រួតពិនិត្យគុណភាពឧបករណ៍អេឡិចត្រូនិច'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ក្រុមហ៊ុនពីរគឺ Electrix និង Tronics ផលិតឧបករណ៍អេឡិចត្រូនិចដូចគ្នា។ ក្រុមហ៊ុនទាំងពីរបានធ្វើតេស្តត្រួតពិនិត្យគុណភាពលើគំរូឧបករណ៍ដែលបានផលិត។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t16_faulty_devices.svg',
        alt: 'តារាងទិន្នន័យឧបករណ៍ខូច Electrix vs Tronics',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm16',
    no: 16,
    label: 'ប្រធានបទ ១៦',
    title: 'ឧបករណ៍ដែលខូច',
    en: 'Faulty Devices',
    collection: 'moeys',
    grade: 8,
    blurb: 'វិភាគស្ថិតិភាគរយផលិតផលខូច និងការសម្រេចចិត្តផ្អែកលើទិន្នន័យគុណភាព។',
    questions: {
      m16q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលភាគរយ',
        max: 1,
        parts: [{ k: 'pct', label: 'ភាគរយខូច (%)' }],
        summary: (r) => (r.pct ? r.pct + '%' : '—'),
        score: (r) => {
          const raw = (r.pct || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = /5|5%|5\.0|5,0/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ (5%)' : 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 5%)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 5%</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ក្រុមហ៊ុន Electrix រកឃើញឧបករណ៍ខូច 10 ក្នុងចំណោម 200 ឧបករណ៍ដែលបានធ្វើតេស្ត។<br>' +
          '• ភាគរយឧបករណ៍ខូច = (10 ÷ 200) × 100% = <b>5%</b>។'
      },
      m16q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-B)',
        max: 1,
        parts: [{ k: 'company', label: 'ក្រុមហ៊ុនដែលគួរជ្រើសរើស' }],
        summary: (r) => (r.company ? 'ក្រុមហ៊ុន ' + r.company : '—'),
        score: (r) => {
          if (!r.company) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.company === 'B' || r.company === 'Tronics') return { pts: 1, note: 'ត្រឹមត្រូវ (Tronics)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ Tronics)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (Tronics)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• Electrix មានអត្រាខូច = 10 ÷ 200 = 5.0%។<br>' +
          '• Tronics មានអត្រាខូច = 28 ÷ 800 = <b>3.5%</b>។<br>' +
          '• ដោយសារ 3.5% តូចជាង 5.0% ដូច្នេះផលិតផលរបស់ Tronics មានគុណភាពល្អជាង និងមានអត្រាខូចទាបជាង។'
      },
      m16q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរសរសេរពន្យល់',
        max: 1,
        parts: [{ k: 'reason', label: 'ការពន្យល់' }],
        summary: (r) => (r.reason ? r.reason.slice(0, 30) : '—'),
        score: (r) => {
          const raw = (r.reason || '').toLowerCase();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = /ភាគរយ|សំណាក|ចំនួនសរុប|3\.5|3,5|5%|percent|sample|total/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ មិនត្រឹមត្រូវទេ ដោយសារច្រឡំរវាងចំនួនដាច់ខាត និងភាគរយ</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• ទោះបី Tronics មានចំនួនឧបករណ៍ខូចច្រើនជាង (28 ធៀបនឹង 10) ក៏ដោយ ក៏ចំនួនធ្វើតេស្តសរុបរបស់ Tronics ធំជាងឆ្ងាយ (800 ធៀបនឹង 200)។<br>' +
          '• ផ្អែកលើភាគរយ Tronics មានអត្រាខូចតែ 3.5% ខណៈ Electrix មានរហូតដល់ 5%។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលតារាងទិន្នន័យនៃការត្រួតពិនិត្យឧបករណ៍អេឡិចត្រូនិចនៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m16q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 5',
            value: ctx.val('m16q1', 'pct') || '',
            'aria-label': 'ភាគរយខូច'
          });
          inp.addEventListener('input', () => ctx.setVal('m16q1', 'pct', inp.value));

          return W.stack(
            W.instr('សូមពិនិត្យមើលតារាងក្រុមហ៊ុន Electrix នៅផ្ទាំងខាងស្តាំ។'),
            W.p('<b>តើភាគរយនៃឧបករណ៍ដែលខូចរបស់ក្រុមហ៊ុន Electrix ស្មើនឹងប៉ុន្មានភាគរយ (%)?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ភាគរយឧបករណ៍ខូច ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, '%')
            )
          );
        },
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m16q2'],
        left: (ctx) => W.stack(
          W.instr('អតិថិជនម្នាក់ចង់បញ្ជាទិញឧបករណ៍អេឡិចត្រូនិចមួយចំនួនធំពីក្រុមហ៊ុនដែលមានគុណភាពល្អជាង។'),
          W.p('<b>តើគាត់គួរជ្រើសរើសក្រុមហ៊ុនណា ដោយផ្អែកលើការវិភាគភាគរយនៃឧបករណ៍ខូច?</b>', 'q-lead'),
          W.radios(ctx, 'm16q2', 'company', [
            { v: 'A', html: 'ក. ក្រុមហ៊ុន Electrix (ព្រោះចំនួនឧបករណ៍ខូចមានតែ 10)' },
            { v: 'B', html: 'ខ. ក្រុមហ៊ុន Tronics (ព្រោះអត្រាឧបករណ៍ខូចមានតែ 3.5% ទាបជាង 5%)' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m16q3'],
        left: (ctx) => W.stack(
          W.instr('សិស្សម្នាក់និយាយថា ៖ «Electrix ល្អជាង Tronics ព្រោះ Electrix មានឧបករណ៍ខូចតែ ១០ ប៉ុណ្ណោះ ឯ Tronics មានរហូតដល់ ២៨»។'),
          W.p('<b>ចូរពន្យល់ពីមូលហេតុដែលការសន្និដ្ឋាននេះមិនត្រឹមត្រូវ ៖</b>', 'q-lead'),
          W.textarea(ctx, 'm16q3', 'reason', { rows: 4, placeholder: 'សរសេរការពន្យល់ និងការប្រៀបធៀបភាគរយ...' })
        ),
        right: stimulus
      }
    ]
  });
})();
