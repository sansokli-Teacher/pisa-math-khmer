/* Unit 31 — ការជួលឌីវីឌី (DVD Rental) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ការជួលឌីវីឌី និងហ្គេមកុំព្យូទ័រ'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ធីតា ធ្វើការនៅហាងជួលឌីវីឌី និងហ្គេមកុំព្យូទ័រមួយ។ នៅហាងនេះ តម្លៃសមាជិកប្រចាំឆ្នាំគឺ 10 zeds។ តម្លៃជួលឌីវីឌីសម្រាប់សមាជិកគឺទាបជាងតម្លៃអ្នកមិនមែនជាសមាជិក ដូចដែលបានបង្ហាញខាងក្រោម ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t31_dvd_rental.svg',
        alt: 'តារាងតម្លៃជួលឌីវីឌី និងកាតសមាជិកភាព',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('div', { class: 'cba-callout', style: 'background:#eff6ff; border-left:4px solid #0284c7; padding:8px 12px; font-size:0.9rem; margin-top:8px;' },
      '• ថ្លៃជួលសម្រាប់អ្នកមិនមែនជាសមាជិក ៖ <b>3.20 zeds</b> ក្នុង ១ ឌីវីឌី<br>' +
      '• ថ្លៃជួលសម្រាប់សមាជិក ៖ <b>2.50 zeds</b> ក្នុង ១ ឌីវីឌី'
    )
  );

  PISA.registerUnit({
    id: 'm31',
    no: 31,
    label: 'ប្រធានបទ ៣១',
    title: 'ការជួលឌីវីឌី',
    en: 'DVD Rental',
    collection: 'moeys',
    grade: 7,
    blurb: 'ប្រៀបធៀបថ្លៃចំណាយរវាងសមាជិក និងមិនមែនសមាជិក និងគណនាចំណុចរួចថ្លៃសមាជិកភាព។',
    questions: {
      m31q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'cost', label: 'តម្លៃដែលត្រូវចំណាយ (zeds)' }],
        summary: (r) => (r.cost ? r.cost + ' zeds' : '—'),
        score: (r) => {
          const raw = (r.cost || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const v = parseFloat(raw);
          if (v === 54.4 || v === 54.40) return { pts: 1, note: 'ត្រឹមត្រូវ (54.40 zeds)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 54.40 zeds)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 54.40 zeds</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ថ្លៃជួលឌីវីឌីរបស់វាសនា = 52.50 - 10 (ថ្លៃសមាជិក) = 42.50 zeds។<br>' +
          '• ចំនួនឌីវីឌីដែលបានជួល = 42.50 ÷ 2.50 = <b>17 ឌីវីឌី</b>។<br>' +
          '• ប្រសិនបើមិនមែនជាសមាជិក ថ្លៃចំណាយ = 17 × 3.20 = <b>54.40 zeds</b>។'
      },
      m31q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរបញ្ចូលលេខ និងពន្យល់',
        max: 2,
        parts: [{ k: 'count', label: 'ចំនួនឌីវីឌី' }, { k: 'work', label: 'ការពន្យល់' }],
        summary: (r) => (r.count ? r.count + ' ឌីវីឌី' : '—'),
        score: (r) => {
          const n = parseInt(r.count, 10);
          const hasReason = (r.work || '').trim().length > 6;
          if (n === 15 && hasReason) return { pts: 2, note: 'ត្រឹមត្រូវពេញលេញ (15 ឌីវីឌី ព្រមទាំងការពន្យល់)' };
          if (n === 15) return { pts: 1, note: 'បានពិន្ទុមួយផ្នែក (ឆ្លើយត្រូវ 15 ឌីវីឌី តែមិនបានពន្យល់)' };
          if ([14, 14.2, 14.3].includes(parseFloat(r.count))) return { pts: 1, note: 'បានពិន្ទុមួយផ្នែក (គណនាត្រូវតែមិនទាន់បង្គត់ឡើង)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 15 ឌីវីឌី)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ (ពិន្ទុពេញ ២) ៖ 15 ឌីវីឌី</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ក្នុង ១ ឌីវីឌី សមាជិកសន្សំបាន = 3.20 - 2.50 = 0.70 zeds។<br>' +
          '• ដើម្បីរួចថ្លៃកាតសមាជិកភាព 10 zeds ៖ 10 ÷ 0.70 ≈ 14.28...<br>' +
          '• ដោយចំនួនឌីវីឌីជាចំនួនគត់ ដូចនេះត្រូវជួលយ៉ាងតិច <b>15 ឌីវីឌី</b> ទើបចំណេញជាង។'
      }
    },
    screens: [
      {
        tag: 'សំណួរ ១ / ២',
        split: 44,
        items: ['m31q1'],
        left: (ctx) => W.stack(
          W.instr('វាសនា ជាសមាជិកម្នាក់នៃហាងជួលឌីវីឌីកាលពីឆ្នាំមុន។ ឆ្នាំមុនគាត់បានចំណាយ 52.50 zeds រួមបញ្ចូលទាំងតម្លៃកាតសមាជិករបស់គាត់។'),
          W.instr('តើវាសនានឹងត្រូវចំណាយប៉ុន្មាន zeds ប្រសិនបើគាត់មិនមែនជាសមាជិក ប៉ុន្តែបានជួលចំនួនឌីវីឌីដដែល?'),
          W.input(ctx, 'm31q1', 'cost', { label: 'ចំនួនទឹកប្រាក់ដែលត្រូវចំណាយ (zeds) ៖', width: '160px', type: 'number' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ២',
        split: 44,
        items: ['m31q2'],
        left: (ctx) => W.stack(
          W.instr('តើចំនួនឌីវីឌីអប្បបរមាដែលសមាជិកម្នាក់ត្រូវការជួលមានចំនួនប៉ុន្មាន ដើម្បីរួចថ្លៃសមាជិកភាពប្រចាំឆ្នាំ (10 zeds)? ចូរពន្យល់ ឬបង្ហាញរបៀបគណនារបស់អ្នក។'),
          W.input(ctx, 'm31q2', 'count', { label: 'ចំនួនឌីវីឌីអប្បបរមា ៖', width: '130px', type: 'number' }),
          W.textarea(ctx, 'm31q2', 'work', { label: 'ការពន្យល់ ឬបង្ហាញរបៀបគណនា ៖', rows: 4 })
        ),
        right: stimulus
      }
    ]
  });
})();
