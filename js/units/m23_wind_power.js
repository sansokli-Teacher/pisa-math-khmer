/* Unit 23 — កម្លាំងខ្យល់ (Wind Power) */
(function () {
  'use strict';
  const { h, W } = PISA;

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin: 0 0 6px;' }, 'កម្លាំងខ្យល់ និងទួរប៊ីន E-82'),
    h('p', { style: 'margin-bottom: 8px; font-size: 0.95rem; line-height: 1.55;' },
      'សាលាក្រុងមួយកំពុងពិចារណាលើគម្រោងសាងសង់កសិដ្ឋានទួរប៊ីនខ្យល់ ដើម្បីផលិតអគ្គិសនីស្អាត។ ទួរប៊ីនខ្យល់ម៉ូដែល E-82 មានលក្ខណៈបច្ចេកទេស និងប្លង់ទីតាំងដូចខាងក្រោម ៖'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t23_wind_power.svg',
        alt: 'ទួរប៊ីនខ្យល់ម៉ូដែល E-82 និងប្លង់ទីតាំង',
        style: 'max-width: 100%; width: 540px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    ),
    h('p', { class: 'cba-callout', style: 'background:#eff6ff; border-left:4px solid #0284c7; padding:8px 12px; font-size:0.9rem; margin-top:8px;' },
      'បទប្បញ្ញត្តិសំណង់ ៖ ចម្ងាយអប្បបរមារវាងទួរប៊ីនខ្យល់ពីរដែលនៅជិតគ្នា ត្រូវតែយ៉ាងតិចស្មើនឹង ៥ ដងនៃប្រវែងស្លាបទួរប៊ីន (៥ × ៤០ m = ២០០ m)។'
    )
  );

  PISA.registerUnit({
    id: 'm23',
    no: 23,
    label: 'ប្រធានបទ ២៣',
    title: 'កម្លាំងខ្យល់',
    en: 'Wind Power',
    collection: 'moeys',
    grade: 8,
    blurb: 'វិភាគលក្ខណៈបច្ចេកទេសទួរប៊ីនខ្យល់ E-82 សមាមាត្រចម្ងាយអប្បបរមា និងល្បឿនចុងស្លាប។',
    questions: {
      m23q1: {
        label: 'សំណួរ ១',
        format: 'តារាងជម្រើស បាទ/ចាស ឬ ទេ',
        max: 1,
        parts: [{ k: 't', label: 'ការសម្រេច' }],
        summary: (r) => {
          const v = r.t || {};
          return ['r1', 'r2', 'r3', 'r4'].map(k => v[k] || '-').join(', ');
        },
        score: (r) => {
          const v = r.t || {};
          const ok = (v.r1 === 'yes' && v.r2 === 'no' && v.r3 === 'yes' && v.r4 === 'no');
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖</b><br>• ប៉មមានកម្ពស់ 138 m ៖ <b>បាទ/ចាស</b><br>• ប្រវែងស្លាបទួរប៊ីនគឺ 82 m ៖ <b>ទេ</b> (82 m ជាអង្កត់ផ្ចិត ស្លាបគឺ 40 m)<br>• ល្បឿនបង្វិលអតិបរមា 20 ជុំ/នាទី ៖ <b>បាទ/ចាស</b><br>• ចម្ងាយអប្បបរមារវាងទួរប៊ីនគឺ 150 m ៖ <b>ទេ</b> (ចម្ងាយអប្បបរមាគឺ 5 × 40 = 200 m)'
      },
      m23q2: {
        label: 'សំណួរ ២',
        format: 'ពហុជ្រើសរើស (A-D)',
        max: 1,
        parts: [{ k: 'choice', label: 'ជម្រើស' }],
        summary: (r) => (r.choice ? 'ជម្រើស ' + r.choice : '—'),
        score: (r) => {
          if (!r.choice) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          if (r.choice === 'B') return { pts: 1, note: 'ត្រឹមត្រូវ (៨ ឆ្នាំ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយត្រឹមត្រូវគឺ ៨ ឆ្នាំ)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ ខ (៨ ឆ្នាំ)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ថ្លៃដើមសាងសង់ទួរប៊ីន = 3 200 000 zeds។<br>' +
          '• ប្រាក់ចំណូលប្រចាំឆ្នាំ = 400 000 zeds/ឆ្នាំ។<br>' +
          '• រយៈពេលសងរួចថ្លៃដើម = 3 200 000 ÷ 400 000 = <b>8 ឆ្នាំ</b>។'
      },
      m23q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរសរសេរពន្យល់',
        max: 1,
        parts: [{ k: 'expl', label: 'ការពន្យល់' }],
        summary: (r) => (r.expl ? r.expl.slice(0, 30) : '—'),
        score: (r) => {
          const raw = (r.expl || '').toLowerCase();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const ok = /125|177|200|មិន|no|not|ខុស/.test(raw);
          return { pts: ok ? 1 : 0, note: ok ? 'ត្រឹមត្រូវ' : 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ មិនអាចសាងសង់តាមប្លង់នេះបានទេ (មិនស្របតាមបទប្បញ្ញត្តិ)</b><br><br>' +
          '<b>ការពន្យល់ ៖</b><br>' +
          '• ប្លង់ស្នើឡើងមានទួរប៊ីន ២៥ លើផ្ទៃដី 500m × 500m (ក្រឡាចត្រង្គ 5 × 5 ចន្លោះទួរប៊ីនជាប់គ្នាគឺ 500 ÷ 4 = 125 m)។<br>' +
          '• ដោយសារ 125 m តូចជាងចម្ងាយអប្បបរមាដែលតម្រូវ 200 m (5 × 40 m = 200 m) ដូច្នេះប្លង់នេះមិនស្របតាមបទប្បញ្ញត្តិឡើយ។'
      },
      m23q4: {
        label: 'សំណួរ ៤',
        format: 'សំណួរបញ្ចូលលេខ',
        max: 2,
        parts: [{ k: 'speed', label: 'ល្បឿនចុងស្លាប (km/h)' }],
        summary: (r) => (r.speed ? r.speed + ' km/h' : '—'),
        score: (r) => {
          const raw = (r.speed || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const match = raw.match(/(\d+(?:\.\d+)?)/);
          if (match) {
            const val = parseFloat(match[1]);
            if (val >= 295 && val <= 305) return { pts: 2, note: 'ត្រឹមត្រូវពេញលេញ (ប្រហែល 300 km/h)' };
            if (val >= 250 && val <= 350) return { pts: 1, note: 'ត្រឹមត្រូវមួយផ្នែក' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ (ពិន្ទុពេញ ២) ៖ ប្រហែល 300 km/h (ឬ 301.6 km/h)</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• កាំរង្វិល r = 40 m → បរិមាត្រ ១ ជុំ = 2 × π × 40 m ≈ 251.3 m។<br>' +
          '• ក្នុង ១ នាទី វិល 20 ជុំ → ចម្ងាយ = 20 × 251.3 m ≈ 5026 m/នាទី។<br>' +
          '• បម្លែងជា km/h ៖ (5026 × 60) ÷ 1000 ≈ <b>301.6 km/h (ប្រហែល 300 km/h)</b>។'
      }
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលលក្ខណៈបច្ចេកទេសទួរប៊ីនខ្យល់ E-82 នៅផ្ទាំងខាងស្តាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» ដើម្បីឆ្លើយសំណួរ។')
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ១ / ៤',
        split: 44,
        items: ['m23q1'],
        left: (ctx) => W.stack(
          W.instr('ផ្អែកលើព័ត៌មានដែលបានផ្តល់ ចូរសម្រេចថាតើអំណះអំណាងខាងក្រោមត្រឹមត្រូវឬទេ ៖'),
          W.choiceTable(ctx, 'm23q1', {
            head: ['អំណះអំណាង', 'បាទ/ចាស', 'ទេ'],
            cols: ['yes', 'no'],
            rows: [
              { id: 'r1', text: '១. ប៉មទួរប៊ីនខ្យល់មានកម្ពស់ 138 m' },
              { id: 'r2', text: '២. ប្រវែងស្លាបទួរប៊ីននីមួយៗគឺ 82 m' },
              { id: 'r3', text: '៣. ល្បឿនបង្វិលអតិបរមារបស់ស្លាបគឺ 20 ជុំ/នាទី' },
              { id: 'r4', text: '៤. ចម្ងាយអប្បបរមារវាងទួរប៊ីនពីរគឺ 150 m' }
            ]
          })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ២ / ៤',
        split: 44,
        items: ['m23q2'],
        left: (ctx) => W.stack(
          W.instr('តើត្រូវចំណាយពេលប៉ុន្មានឆ្នាំ ដើម្បីឱ្យប្រាក់ចំណូលពីការផលិតអគ្គិសនី ទូទាត់រួចថ្លៃដើមសាងសង់ទួរប៊ីនខ្យល់ ៣ ២០០ ០០០ zeds?'),
          W.radios(ctx, 'm23q2', 'choice', [
            { v: 'A', html: 'ក. ៤ ឆ្នាំ' },
            { v: 'B', html: 'ខ. ៨ ឆ្នាំ' },
            { v: 'C', html: 'គ. ១២ ឆ្នាំ' },
            { v: 'D', html: 'ឃ. ១៦ ឆ្នាំ' }
          ])
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៣ / ៤',
        split: 44,
        items: ['m23q3'],
        left: (ctx) => W.stack(
          W.instr('ក្រុមការងារបានស្នើប្លង់ដំឡើងទួរប៊ីន ២៥ លើផ្ទៃដី 500m × 500m (ក្រឡាចត្រង្គ ៥ ជួរ ៥ ជួរឈរ)។'),
          W.p('<b>តើប្លង់នេះស្របតាមបទប្បញ្ញត្តិសុវត្ថិភាពចម្ងាយអប្បបរមាដែរឬទេ? ចូរពន្យល់ ៖</b>', 'q-lead'),
          W.textarea(ctx, 'm23q3', 'expl', { rows: 4, placeholder: 'សរសេរការពន្យល់ និងការគណនា...' })
        ),
        right: stimulus
      },
      {
        tag: 'សំណួរ ៤ / ៤',
        split: 44,
        items: ['m23q4'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.25rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 300',
            value: ctx.val('m23q4', 'speed') || '',
            'aria-label': 'ល្បឿនចុងស្លាប'
          });
          inp.addEventListener('input', () => ctx.setVal('m23q4', 'speed', inp.value));

          return W.stack(
            W.instr('តើល្បឿនអតិបរមានៅចុងស្លាបទួរប៊ីនស្មើនឹងប៉ុន្មាន គិតជា km/h នៅពេលវាវិល ២០ ជុំ/នាទី?'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 14px 0;' },
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'ល្បឿនចុងស្លាប ៖'),
              inp,
              h('span', { style: 'font-weight: bold; font-size: 1rem; color: #475569;' }, 'km/h')
            )
          );
        },
        right: stimulus
      }
    ]
  });
})();
