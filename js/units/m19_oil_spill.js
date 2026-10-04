/* Unit 19 (MoEYS 2025 / PISA M704) — កំពប់ប្រេង (Oil Spill)
 * Source: «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥»
 * នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ នៃក្រសួងអប់រំ យុវជន និងកីឡា, ទំព័រ ៤៨–៤៩ (ប្រធានបទទី ១៩)។
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'កំពប់ប្រេង';
  const EN_TITLE = 'Oil Spill';

  const stimulus = () => h('div', { class: 'stack stim-card', style: 'background: #ffffff; padding: 6px;' },
    h('h3', { style: 'font-size: 1.15rem; color: #1e3a8a; margin-top: 0; margin-bottom: 6px;' }, 'ការកំពប់ប្រេងនៅលើផ្ទៃសមុទ្រ'),
    h('p', { style: 'margin-bottom: 10px; font-size: 0.95rem; line-height: 1.55;' },
      'កប៉ាល់ដឹកប្រេងនៅសមុទ្រមួយ បានបុកថ្មប៉ប្រះទឹកធ្វើឱ្យធ្លាយធុងស្តុកប្រេង។ ' +
      'កប៉ាល់ដឹកប្រេងមានចម្ងាយប្រហែល <b>65 km</b> ពីឆ្នេរសមុទ្រ។ ' +
      'ប៉ុន្មានថ្ងៃក្រោយមក ប្រេងបានរីករាលដាលដូចបានបង្ហាញនៅលើផែនទីខាងក្រោម។'
    ),
    h('div', { class: 'fig-wrap', style: 'text-align: center; margin: 8px 0;' },
      h('img', {
        src: 'assets/moeys/t19_oil_spill.svg',
        alt: 'ផែនទីនៃការកំពប់ប្រេងលើផ្ទៃសមុទ្រ',
        style: 'max-width: 100%; width: 520px; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);'
      })
    )
  );

  PISA.registerUnit({
    id: 'm19',
    no: 19,
    label: 'ប្រធានបទ ១៩',
    title: TITLE,
    en: EN_TITLE,
    collection: 'moeys',
    grade: 8,
    blurb: 'ការប៉ាន់ប្រមាណផ្ទៃក្រឡារូបមិនទៀងទាត់លើក្រឡាចត្រង្គមាត្រដ្ឋាន (PISA M704)។',
    questions: {
      m19q1: {
        label: 'សំណួរ ១',
        format: 'សំណួរបញ្ចូលចំនួនប៉ាន់ស្មានផ្ទៃក្រឡា',
        max: 1,
        parts: [{ k: 'area', label: 'ផ្ទៃប្រេងកំពប់ប៉ាន់ស្មាន (km²)' }],
        summary: (r) => (r.area ? r.area + ' km²' : '—'),
        score: (r) => {
          const raw = (r.area || '').trim();
          if (!raw) return { pts: 0, note: 'មិនបានឆ្លើយ' };
          const p = PISA.parseAnswer(raw);
          const v = p ? p.value : parseFloat(PISA.latin(raw).replace(/[^0-9.]/g, ''));

          // Acceptable range by PISA standard: 2200 to 3300 km²
          if (v && v >= 2200 && v <= 3300) {
            return { pts: 1, note: 'ត្រឹមត្រូវពេញលេញ (ស្ថិតក្នុងចន្លោះ 2200 ដល់ 3300 km²)' };
          }
          return { pts: 0, note: 'មិនត្រឹមត្រូវ (ចម្លើយទទួលយកបានគឺស្ថិតក្នុងចន្លោះពី 2200 ដល់ 3300 km²)' };
        },
        key: '<b>ចម្លើយទទួលយកបាន ៖ ចន្លោះពី 2 200 ដល់ 3 300 km²</b><br><br>' +
          '<b>របៀបប៉ាន់ស្មានតាមក្រឡាចត្រង្គ ៖</b><br>' +
          '• មាត្រដ្ឋាន ៖ ក្រឡាការ៉េនីមួយៗមានទំហំ 10 km × 10 km = <b>100 km²</b><br>' +
          '• រាប់ចំនួនក្រឡាពេញ និងក្រឡាដែលគ្របដណ្តប់លើសពាក់កណ្តាល ៖ មានប្រហែល <b>22 ទៅ 33 ក្រឡា</b><br>' +
          '• ផ្ទៃក្រឡាសរុបប៉ាន់ស្មាន = (22 ដល់ 33) × 100 km² = <b>2 200 ដល់ 3 300 km²</b> (ជាមធ្យមប្រហែល 2 700 km²)។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ',
        split: 44,
        left: () => W.stack(
          W.instr('សូមពិនិត្យមើលផែនទីកំពប់ប្រេង នៅផ្ទាំងខាងស្ដាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់» (NEXT) នៅលើរបារខាងលើ ដើម្បីចាប់ផ្ដើមធ្វើសំណួរ។'),
          h('div', { class: 'note-box', style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 12px;' },
            h('h4', { style: 'margin: 0 0 6px; color: #1e40af; font-size: 0.95rem;' }, 'ព័ត៌មានអំពីប្រធានបទនេះ'),
            h('p', { style: 'margin: 0; font-size: 0.9rem; line-height: 1.6;', html:
              'ប្រធានបទនេះដកស្រង់ពី <b>កម្រងសំណួរគំរូនីតិវិធី PISA ២០២៥ (ប្រធានបទទី ១៩)</b> — កូដ OECD PISA: <b>M704 (Oil Spill)</b>។'
            })
          )
        ),
        right: stimulus,
      },
      {
        tag: 'សំណួរ ១ / ១',
        split: 44,
        items: ['m19q1'],
        left: (ctx) => {
          const inp = h('input', {
            type: 'text',
            class: 'resp-input',
            style: 'font-size: 1.15rem; font-weight: bold; width: 160px; padding: 6px 12px; border: 1.5px solid #cbd5e1; border-radius: 6px;',
            placeholder: 'ឧ. 2700',
            value: ctx.val('m19q1', 'area') || '',
            'aria-label': 'ផ្ទៃប្រេងកំពប់'
          });
          inp.addEventListener('input', () => ctx.setVal('m19q1', 'area', inp.value));

          return W.stack(
            W.instr('ដោយប្រើមាត្រដ្ឋានក្នុងផែនទីនៅផ្ទាំងខាងស្តាំ (១ ក្រឡា = 100 km²) ៖'),
            W.p('<b>ចូរប៉ាន់ប្រមាណផ្ទៃប្រេងដែលកំពប់ គិតជាគីឡូម៉ែត្រការ៉េ (km²) ៖</b>', 'q-lead'),
            h('div', { style: 'display: flex; align-items: center; gap: 10px; margin: 12px 0;' },
              inp,
              h('span', { style: 'font-weight: bold; color: #475569;' }, 'km²')
            ),
            W.p('<i>(កំណត់សម្គាល់ ៖ រាប់ចំនួនក្រឡាដែលប្រេងគ្របដណ្តប់ រួចគុណនឹង 100 km²)</i>', 'hint')
          );
        },
        right: stimulus,
      },
    ],
  });
})();
