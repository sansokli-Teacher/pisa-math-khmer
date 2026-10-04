/* Unit 18 (MoEYS 2025 / PISA M462) — តូបការ៉េម (Ice Cream Shop)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៤៤–៤៧ (ប្រធានបទទី ១៨)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'តូបការ៉េម';
  const EN_TITLE = 'Ice Cream Shop';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ប្លង់បាតតូបការ៉េម ម៉ារី'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'នេះគឺជាប្លង់នៃជាន់សម្រាប់តូបការ៉េម ម៉ារី។ នាងកំពុងជួសជុលតូប។ ' +
      'តំបន់ផ្តល់សេវាកម្មត្រូវបានព័ទ្ធជុំវិញដោយបញ្ជរបម្រើ។ ' +
      'ក្រឡាចត្រង្គនីមួយៗមានទំហំ <b>0.5 m × 0.5 m</b>។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t18_ice_cream_shop.svg',
        alt: 'ប្លង់បាតតូបការ៉េម ម៉ារី',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm18',
    no: 18,
    label: 'ប្រធានបទ ១៨',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 9,
    blurb: 'ការគណនាប្រវែងគែមទ្រេតតាមពីតាករ ផ្ទៃក្រឡា និងការរៀបចំតុអង្គុយ (PISA M462)។',
    questions: {
      m18q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលប្រវែងគែមបញ្ជរ',
        max: 1,
        parts: [{ k: 'length', label: 'ប្រវែងសរុបនៃគែមបញ្ជរ (m)' }],
        summary: (r) => (r.length ? r.length + ' m' : '—'),
        score: (r) => {
          const raw = (r.length || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const p = PISA.parseAnswer(raw);
          const v = p ? p.value : parseFloat(PISA.latin(raw).replace(/[^0-9.]/g, ''));

          if (v && v >= 4.45 && v <= 4.55) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (4.5 m)' };
          }
          if (v && (v === 9 || v === 9.1 || v === 2.5)) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (បានគណនាផ្នែកត្រឹមត្រូវ ប៉ុន្តែខុសមាត្រដ្ឋាន ឬមិនបានបូកគ្រប់ជ្រុង)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ប្រវែងគែមសរុបគឺ 4.5 m)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 4.5 m</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• គែមបញ្ជរមាន ៣ ផ្នែក ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;១. ផ្នែកត្រង់ឈរ ៖ 2 ក្រឡា = 2 × 0.5 m = <b>1.0 m</b><br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;២. ផ្នែកត្រង់ដេក ៖ 2 ក្រឡា = 2 × 0.5 m = <b>1.0 m</b><br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;៣. ផ្នែកទ្រេត (អុីប៉ូតេនុស) ៖ មានជ្រុងកែង 3 ក្រឡា (1.5 m) និង 4 ក្រឡា (2.0 m) ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\sqrt{1.5^2 + 2.0^2} = \sqrt{2.25 + 4.0} = \sqrt{6.25} = \mathbf{2.5\text{ m}}$<br>' +
          '• ប្រវែងសរុប = 1.0 m + 2.5 m + 1.0 m = <b>4.5 m</b>។',
      },

      m18q2: {
        label: 'សំណួរ ២',
        format: 'សំណួរបញ្ចូលផ្ទៃក្រឡា',
        max: 1,
        parts: [{ k: 'area', label: 'ផ្ទៃក្រឡាបាតតំបន់អង្គុយ (m²)' }],
        summary: (r) => (r.area ? r.area + ' m²' : '—'),
        score: (r) => {
          const raw = (r.area || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const p = PISA.parseAnswer(raw);
          const v = p ? p.value : parseFloat(PISA.latin(raw).replace(/[^0-9.]/g, ''));

          if (v && v >= 31.4 && v <= 31.6) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (31.5 m²)' };
          }
          if (v === 126) {
            return { pts: 0.5, note: 'ពិន្ទុមិនពេញ (126 ក្រឡាការ៉េ ប៉ុន្តែមិនបានគុណនឹង 0.25 m² ក្នុងមួយក្រឡា)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ផ្ទៃក្រឡាត្រឹមត្រូវគឺ 31.5 m²)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 31.5 m²</b><br><br>' +
          '<b>របៀបគណនា ៖</b><br>' +
          '• ផ្ទៃក្រឡាសរុបនៃតូបទាំងមូល (15 ក្រឡា × 10 ក្រឡា) ៖ 7.5 m × 5.0 m = 37.5 m²<br>' +
          '• ផ្ទៃក្រឡាតំបន់បម្រើសេវាកម្ម និងបញ្ជរ ៖<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;ចតុកោណកែង (2 m × 1.5 m = 3 m²) + ត្រីកោណកែង (1/2 × 2 m × 1.5 m = 1.5 m²) + ផ្នែកបន្ថែម = 6.0 m²<br>' +
          '• ផ្ទៃក្រឡាបាតដែលត្រូវក្រាលឥដ្ឋថ្មី ៖ 37.5 m² - 6.0 m² = <b>31.5 m²</b> (ឬ 126 ក្រឡា × 0.25 m² = 31.5 m²)។',
      },

      m18q3: {
        label: 'សំណួរ ៣',
        format: 'សំណួរបញ្ចូលចំនួនឈុតតុ',
        max: 1,
        parts: [{ k: 'sets', label: 'ចំនួនឈុតតុអតិបរមា' }],
        summary: (r) => (r.sets ? r.sets + ' ឈុត' : '—'),
        score: (r) => {
          const raw = (r.sets || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const num = parseInt(PISA.latin(raw).replace(/[^0-9]/g, ''), 10);
          if (num === 4) return { pts: 1, note: 'ត្រឹមត្រូវ (៤ ឈុតតុ)' };
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចំនួនឈុតតុអតិបរមាគឺ ៤ ឈុត)' };
        },
        key: '<b>ចម្លើយត្រឹមត្រូវ ៖ 4 ឈុតតុ</b><br><br>' +
          '<b>ការពន្យល់ ៖</b> ឈុតនីមួយៗត្រូវការរង្វង់អង្កត់ផ្ចិត 1.5 m បូកនឹងគម្លាតសុវត្ថិភាព 0.5 m ពីជញ្ជាំង និងពីឈុតផ្សេងទៀត។ នៅក្នុងផ្ទៃទំនេរ 31.5 m² ដែលមានទម្រង់ជាក់ស្តែង យើងអាចរៀបចំបានអតិបរមាត្រឹមតែ <b>4 ឈុតតុ</b> ប៉ុណ្ណោះ។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលប្លង់តូបការ៉េម នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៨)</b> — កូដ OECD PISA: <b>M462 (Ice Cream Shop)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ៣',
        split: 44,
        items: ['m18q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 4.5',
            value: ctx.val('m18q1', 'length') || '',
            'aria-label': 'ប្រវែងគែម'
          });
          inp.addEventListener('input', () => ctx.setVal('m18q1', 'length', inp.value));

          return W.stack(
            W.instr('ម៉ារី ចង់ដាក់គែមថ្មីនៅតាមគែមខាងក្រៅនៃបញ្ជរ (គែមពណ៌ក្រហមដិត)។'),
            W.p('<b>តើប្រវែងសរុបនៃគែមដែលនាងត្រូវការ ស្មើនឹងប៉ុន្មានម៉ែត្រ (m)?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              inp,
              h('span', { style: 'font-weight: bold; color: #475569;' }, 'ម៉ែត្រ (m)')
            )
          );
        },
        right: stimulus,
      },
      {
        tag: 'សំណួរ ២ / ៣',
        split: 44,
        items: ['m18q2'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 31.5',
            value: ctx.val('m18q2', 'area') || '',
            'aria-label': 'ផ្ទៃក្រឡា'
          });
          inp.addEventListener('input', () => ctx.setVal('m18q2', 'area', inp.value));

          return W.stack(
            W.instr('ម៉ារី នឹងដាក់កម្រាលឥដ្ឋថ្មីនៅក្នុងតូបផងដែរ ដោយមិនរាប់បញ្ចូលតំបន់បម្រើសេវាកម្ម និងបញ្ជរឡើយ។'),
            W.p('<b>តើផ្ទៃក្រឡាបាតសរុបរបស់តូបដែលត្រូវក្រាលឥដ្ឋថ្មី ស្មើប៉ុន្មាន m²?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              inp,
              h('span', { style: 'font-weight: bold; color: #475569;' }, 'm²')
            )
          );
        },
        right: stimulus,
      },
      {
        tag: 'សំណួរ ៣ / ៣',
        split: 44,
        items: ['m18q3'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 140px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 4',
            value: ctx.val('m18q3', 'sets') || '',
            'aria-label': 'ចំនួនឈុតតុ'
          });
          inp.addEventListener('input', () => ctx.setVal('m18q3', 'sets', inp.value));

          return W.stack(
            W.instr('ម៉ារី ចង់ដាក់ឈុតតុមួយ និងកៅអីបួនក្នុងតូប។ ឈុតនីមួយៗត្រូវដាក់នៅចម្ងាយយ៉ាងតិច 0.5 m ពីជញ្ជាំង និង 0.5 m ពីឈុតផ្សេងទៀត។'),
            W.p('<b>តើ ម៉ារី អាចដាក់ឈុតតុអតិបរមាចំនួនប៉ុន្មាន ចូលក្នុងតំបន់អង្គុយ?</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              inp,
              h('span', { style: 'font-weight: bold; color: #475569;' }, 'ឈុតតុ')
            )
          );
        },
        right: stimulus,
      },
    ],
  });
})();
