/* Unit 18 — តូបការ៉េម (Ice Cream Shop) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'ប្លង់តូបការ៉េម'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'ប្លង់តូបការ៉េមមួយមានបញ្ជរលក់រាងកាត់បញ្ឆិតប្រវែង ២.៥ ម៉ែត្រ និងតុអង្គុយរាងការ៉េជាច្រើន។ បទប្បញ្ញត្តិសុវត្ថិភាពតម្រូវឱ្យមានគម្លាតយ៉ាងតិច ០.៥ ម៉ែត្ររវាងតុ និងជញ្ជាំង ឬបញ្ជរ។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t18_ice_cream_shop.svg',
        alt: 'ប្លង់តូបការ៉េម',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm18',
    no: 18,
    label: 'ប្រធានបទ ១៨',
    title: 'តូបការ៉េម',
    en: 'Ice Cream Shop',
    collection: 'moeys',
    grade: 8,
    blurb: 'វិភាគប្លង់ក្រឡាចត្រង្គ គម្លាតសុវត្ថិភាព និងការអនុវត្តទ្រឹស្តីបទពីតាគ័រ។',
    questions: {
      m18q1: {
        label: 'សំណួរ ១',
        format: 'តារាងជម្រើស បាទ/ចាស ឬ ទេ',
        max: 1,
        parts: [{ k: 't', label: 'ការសម្រេច' }],
        summary: (r) => {
          const v = r.t || {};
          return ['r1', 'r2', 'r3'].map(k => v[k] || '-').join(', ');
        },
        score: (r) => {
          const v = r.t || {};
          const ok = (v.r1 === 'yes' && v.r2 === 'no' && v.r3 === 'yes');
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖</b><br>• តុ T1 បំពេញតាមលក្ខខណ្ឌគម្លាត ៖ <b>បាទ/ចាស</b><br>• តុ T2 បំពេញតាមលក្ខខណ្ឌគម្លាត ៖ <b>ទេ</b> (នៅជិតជញ្ជាំងពេក)<br>• តុ T3 បំពេញតាមលក្ខខណ្ឌគម្លាត ៖ <b>បាទ/ចាស</b>'
      },
      m18q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរសរសេរពន្យល់',
        max: 1,
        parts: [{ k: 'dist', label: 'ចម្ងាយ' }],
        summary: (r) => (r.dist ? r.dist.slice(0, 30) : '—'),
        score: (r) => {
          const raw = (r.dist || '').toLowerCase();
          const ok = /0\.5|0,5|1|1\.5|1,5|គ្រប់គ្រាន់|បំពេញ|ok|safe/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ បំពេញតាមលក្ខខណ្ឌសុវត្ថិភាព</b><br><br><b>ការពន្យល់ ៖</b><br>• ចម្ងាយរវាងតុ T3 និង T4 គឺយ៉ាងតិច 1.0 m (លើសពី 0.5 m ដែលបានកំណត់)។'
      },
      m18q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 1,
        parts: [{ k: 'hyp', label: 'ប្រវែងអ៊ីប៉ូតេនុស (m)' }],
        summary: (r) => (r.hyp ? r.hyp + ' m' : '—'),
        score: (r) => {
          const raw = (r.hyp || '').trim();
          const ok = /2\.5|2,5/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ (2.5 m)' : 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ 2.5 m)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 2.5 m</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• បញ្ជរលក់បង្កើតបានជាត្រីកោណកែងដែលមានជ្រុងកែង 1.5 m និង 2.0 m។<br>' +
          '• តាមទ្រឹស្តីបទពីតាគ័រ ៖ c = √(1.5² + 2.0²) = √(2.25 + 4.00) = √6.25 = <b>2.5 m</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលប្លង់តូបការ៉េមនៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m18q1'],
        left: (ctx) => W.stack(
          W.instr('ពិនិត្យទីតាំងតុ T1, T2, T3 ក្នុងប្លង់។ តើតុទាំងនោះបំពេញតាមលក្ខខណ្ឌគម្លាតសុវត្ថិភាពយ៉ាងតិច ០.៥ m ដែរឬទេ?'),
          W.choiceTable(ctx, 'm18q1', {
            head: ['ទីតាំងតុ', 'បាទ/ចាស', 'ទេ'],
            cols: ['yes', 'no'],
            rows: [
              { id: 'r1', text: 'តុ T1' },
              { id: 'r2', text: 'តុ T2' },
              { id: 'r3', text: 'តុ T3' }
            ]
          })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m18q2'],
        left: (ctx) => W.stack(
          W.instr('តើចម្ងាយរវាងតុ T3 និងតុ T4 បំពេញតាមលក្ខខណ្ឌសុវត្ថិភាពដែរឬទេ? ចូរពន្យល់ ៖'),
          W.textarea(ctx, 'm18q2', 'dist', { rows: 4, placeholder: 'សរសេរការពន្យល់...' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m18q3'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 2.5',
            value: ctx.val('m18q3', 'hyp') || '',
            'aria-label': 'ប្រវែងកាត់បញ្ឆិត'
          });
          inp.addEventListener('input', () => ctx.setVal('m18q3', 'hyp', inp.value));

          return W.stack(
            W.instr('គណនាប្រវែងកាត់បញ្ឆិតនៃបញ្ជរលក់ (អ៊ីប៉ូតេនុសនៃត្រីកោណកែងដែលមានជ្រុង ១.៥ m និង ២.០ m) ៖'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ប្រវែងបញ្ជរ ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'm')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
