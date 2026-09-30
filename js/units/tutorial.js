/* Tutorial — how to answer on the screen.
 *
 * Before a computer-based test, students need to know the screen: the two
 * panels, the buttons in the top bar, and each way of answering. This unit
 * walks through them one screen at a time on an easy shared task (fruit
 * prices at a market), and says straight away when an action is right. It
 * is the project's own material, not an OECD or PISA tutorial.
 *
 * It opens from the home page or with index.html#tutorial, in practice mode,
 * and is never saved. It is not listed with the units, and its end page (see
 * `results` below) replaces the teacher's results table.
 */
(function () {
  'use strict';
  const { h, W } = PISA;

  const TITLE = 'មេរៀនណែនាំ៖ របៀបឆ្លើយលើអេក្រង់';
  const FRUIT = [
    { v: 'mango', km: 'ស្វាយ', price: 4000 },
    { v: 'mangosteen', km: 'មង្ឃុត', price: 6000 },
    { v: 'banana', km: 'ចេក', price: 2500 },
    { v: 'papaya', km: 'ល្ហុង', price: 3000 },
  ];
  const MARKET_B = { mango: 3500, mangosteen: 6500, banana: 2000, papaya: 3500 };
  const NAME = Object.fromEntries(FRUIT.map((f) => [f.v, f.km]));
  const CHEAP_TO_DEAR = FRUIT.slice().sort((a, b) => a.price - b.price).map((f) => f.v);
  const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const num = (r, k) => { const p = PISA.parseAnswer(r[k] || ''); return p ? p.value : null; };
  // 3/4 written any way the maths buttons or the keyboard allow: 3/4, (3)/(4), ៣/៤
  const isThreeQuarters = (t) => /(^|[^0-9.])3\/4(?![0-9.])/.test(PISA.latin(t || '').replace(/[\s()]/g, ''));

  function priceTable(prices) {
    return h('div', { class: 'dtable-wrap' }, h('table', { class: 'dtable' },
      h('thead', {}, h('tr', {}, h('th', {}, 'ផ្លែឈើ'), h('th', {}, 'តម្លៃក្នុងមួយគីឡូក្រាម (រៀល)'))),
      h('tbody', {}, ...FRUIT.map((f) => h('tr', {}, h('td', {}, f.km), h('td', { class: 'm' }, money(prices[f.v])))))));
  }
  const stimulus = () => W.stack(
    h('div', { class: 'stim-title' }, 'តម្លៃផ្លែឈើនៅផ្សារ'),
    W.p('តារាងខាងក្រោមបង្ហាញតម្លៃផ្លែឈើមួយគីឡូក្រាម នៅផ្សារមួយ។'),
    priceTable(Object.fromEntries(FRUIT.map((f) => [f.v, f.price]))));

  // «How to do it» box under the instruction, with the top bar's own icons
  const tip = (html) => h('div', { class: 'tut-tip', html: '<b>របៀបធ្វើ៖</b> ' + html });
  const icon = (name, green) => '<span class="tut-ic' + (green ? ' green' : '') + '">' + PISA.ICON[name] + '</span>';

  // The answer controls plus a line that says at once whether they are right.
  function checked(ctx, qid, ...kids) {
    const q = QUESTIONS[qid];
    const fb = h('p', { class: 'tut-fb', 'aria-live': 'polite' });
    const update = () => {
      const r = ctx.resp(qid);
      const ok = q.score(r).pts === q.max;
      const done = q.answered(r);
      fb.className = 'tut-fb' + (ok ? ' ok' : done ? ' try' : '');
      fb.textContent = ok ? '✓ ត្រឹមត្រូវ! ចុច «បន្ទាប់» ដើម្បីបន្ត។' : done ? 'មិនទាន់ត្រឹមត្រូវទេ — សាកល្បងម្ដងទៀត។' : '';
    };
    const box = W.stack(...kids, fb);
    ['input', 'change', 'click', 'keyup'].forEach((ev) => box.addEventListener(ev, () => setTimeout(update, 0)));
    box._update = update;
    update();
    return box;
  }

  // ------------------------------------------------------------ answers ---
  const QUESTIONS = {
    tutq1: {
      label: 'ជំហាន ១', format: 'ជ្រើសចម្លើយមួយ', max: 1, parts: [{ k: 'opt' }],
      answered: (r) => !!r.opt,
      summary: (r) => NAME[r.opt] || '—',
      score: (r) => ({ pts: r.opt === 'mangosteen' ? 1 : 0 }),
      key: 'មង្ឃុត (<span class="m">6 000</span> រៀល ក្នុងមួយគីឡូក្រាម)។',
    },
    tutq2: {
      label: 'ជំហាន ២', format: 'ពិត ឬ មិនពិត', max: 1, parts: [{ k: '0' }, { k: '1' }],
      answered: (r) => !!(r[0] && r[1]),
      summary: (r) => ['0', '1'].map((k) => ({ T: 'ពិត', F: 'មិនពិត' }[r[k]] || '—')).join(' / '),
      score: (r) => ({ pts: r[0] === 'T' && r[1] === 'F' ? 1 : 0 }),
      key: 'ពិត / មិនពិត។ ចេក <span class="m">2</span> គីឡូក្រាម ថ្លៃ <span class="m">5 000</span> រៀល មិនមែន <span class="m">6 000</span> រៀលទេ។',
    },
    tutq3: {
      label: 'ជំហាន ៣', format: 'វាយលេខ', max: 1, parts: [{ k: 'a' }],
      answered: (r) => !!r.a,
      summary: (r) => (r.a || '—') + ' រៀល',
      score: (r) => ({ pts: num(r, 'a') === 12000 ? 1 : 0 }),
      key: '<span class="m">3 × 4 000 = 12 000</span> រៀល។',
    },
    tutq4: {
      label: 'ជំហាន ៤', format: 'ម៉ាស៊ីនគិតលេខ', max: 1, parts: [{ k: 'a' }],
      answered: (r) => !!r.a,
      summary: (r) => (r.a || '—') + ' រៀល',
      score: (r) => ({ pts: num(r, 'a') === 9000 ? 1 : 0 }),
      key: '<span class="m">1.5 × 6 000 = 9 000</span> រៀល។',
    },
    tutq5: {
      label: 'ជំហាន ៥', format: 'អូសទម្លាក់', max: 1, parts: [{ k: 's1' }, { k: 's2' }, { k: 's3' }, { k: 's4' }],
      answered: (r) => ['s1', 's2', 's3', 's4'].every((k) => r[k]),
      summary: (r) => ['s1', 's2', 's3', 's4'].map((k) => NAME[r[k]] || '_').join(', '),
      score: (r) => ({ pts: CHEAP_TO_DEAR.every((v, i) => r['s' + (i + 1)] === v) ? 1 : 0 }),
      key: 'ចេក, ល្ហុង, ស្វាយ, មង្ឃុត (ពី <span class="m">2 500</span> ដល់ <span class="m">6 000</span> រៀល)។',
    },
    tutq6: {
      label: 'ជំហាន ៦', format: 'ផ្ទាំង', max: 1, parts: [{ k: 'opt' }],
      answered: (r) => !!r.opt,
      summary: (r) => ({ A: 'ផ្សារ ក', B: 'ផ្សារ ខ' }[r.opt] || '—'),
      score: (r) => ({ pts: r.opt === 'A' ? 1 : 0 }),
      key: 'ផ្សារ ក៖ មង្ឃុតថ្លៃ <span class="m">6 000</span> រៀល នៅផ្សារ ក និង <span class="m">6 500</span> រៀល នៅផ្សារ ខ។',
    },
    tutq7: {
      label: 'ជំហាន ៧', format: 'សរសេរគណិតវិទ្យា', max: 1, parts: [{ k: 'why' }],
      answered: (r) => !!(r.why && r.why.trim()),
      summary: (r) => r.why || '—',
      score: (r) => ({ pts: isThreeQuarters(r.why) ? 1 : 0 }),
      key: '<span class="m">3/4</span> គីឡូក្រាម (ស្វាយ <span class="m">3</span> គីឡូក្រាម ចែកឱ្យ <span class="m">4</span> នាក់)។',
    },
  };

  // ------------------------------------------------------------ screens ---
  // the parts of the screen, drawn beside the first screen's instructions
  function screenMap() {
    const row = (ic, text) => h('li', {}, h('span', { class: 'tut-key', html: ic }), h('span', { html: text }));
    return W.stack(
      h('div', { class: 'stim-title' }, 'ផ្នែកនៃអេក្រង់'),
      h('div', { class: 'tut-map', 'aria-hidden': 'true' },
        h('div', { class: 'tut-map-top' }, h('span', { class: 'tut-sq on' }), h('span', { class: 'tut-sq' }), h('span', { class: 'tut-sq' }), h('i'), h('b', {}, '?')),
        h('div', { class: 'tut-map-body' },
          h('div', { class: 'tut-map-l' }, h('b', {}, '១'), h('span', {}, 'សំណួរ')),
          h('div', { class: 'tut-map-r' }, h('b', {}, '២'), h('span', {}, 'ព័ត៌មាន')))),
      h('ol', { class: 'tut-parts' },
        h('li', { html: '<b>ផ្នែកខាងឆ្វេង</b>៖ សំណួរ និងកន្លែងសម្រាប់ឆ្លើយ។' }),
        h('li', { html: '<b>ផ្នែកខាងស្ដាំ</b>៖ ព័ត៌មានដែលត្រូវប្រើ ដូចជាអត្ថបទ តារាង ឬរូបភាព។ នៅលើទូរស័ព្ទ ផ្នែកនេះនៅខាងក្រោមសំណួរ។' })),
      h('ul', { class: 'tut-bar' },
        row('<span class="tut-sq on"></span><span class="tut-sq"></span>', 'ការ៉េពណ៌បៃតង៖ អេក្រង់នៃប្រធានបទនេះ។ ការ៉េពណ៌ស គឺអេក្រង់ដែលអ្នកកំពុងមើល។'),
        row(icon('clock', true), 'នាឡិកា៖ មើលរយៈពេលដែលអ្នកបានប្រើ។'),
        row(icon('calc', true), 'ម៉ាស៊ីនគិតលេខ៖ បើក ឬបិទម៉ាស៊ីនគិតលេខនៅលើអេក្រង់។'),
        row(icon('help', true), 'ជំនួយ៖ ពន្យល់ពីប៊ូតុងទាំងនេះម្ដងទៀត។'),
        row(icon('next', true), 'ព្រួញ «បន្ទាប់»៖ ទៅអេក្រង់បន្ទាប់។ ក្នុងរបៀបតេស្ត អ្នកមិនអាចត្រឡប់ក្រោយបានទេ។')));
  }

  // step 5: fruit names dragged into four boxes, cheapest first
  function sortFruit(ctx) {
    const qid = 'tutq5';
    const wrap = h('div', { class: 'stack' });
    let host = null;
    function place(k, v) {
      ['s1', 's2', 's3', 's4'].forEach((o) => { if (o !== k && ctx.val(qid, o) === v) ctx.setVal(qid, o, null); });
      ctx.setVal(qid, k, v);
      draw();
    }
    function draw() {
      wrap.innerHTML = '';
      const pool = h('div', { class: 'tut-pool' });
      FRUIT.forEach((f) => {
        const used = ['s1', 's2', 's3', 's4'].some((k) => ctx.val(qid, k) === f.v);
        const c = h('span', { class: 'tut-fruit' + (used ? ' used' : '') }, f.km);
        W.dragSource(c, f.v);
        pool.append(c);
      });
      const slots = h('ol', { class: 'tut-slots' });
      ['s1', 's2', 's3', 's4'].forEach((k, i) => {
        const v = ctx.val(qid, k);
        const box = h('span', { class: 'tut-slot' + (v ? ' filled' : ''), 'aria-label': 'ប្រអប់ទី ' + PISA.km(i + 1) }, v ? NAME[v] : '');
        W.dropTarget(box, (p) => place(k, p), v ? () => { ctx.setVal(qid, k, null); draw(); } : null);
        slots.append(h('li', {}, h('span', { class: 'tut-slot-n' }, i === 0 ? '១ ថោកជាងគេ' : i === 3 ? '៤ ថ្លៃជាងគេ' : PISA.km(i + 1)), box));
      });
      wrap.append(pool, slots);
      if (host && host._update) host._update();
    }
    draw();
    host = checked(ctx, qid, wrap);
    return host;
  }

  const SCREENS = [
    {
      tag: 'ការណែនាំ', split: 46,
      left: () => W.stack(
        W.instr('សូមអានសេចក្ដីណែនាំ រួចចុច «បន្ទាប់»។'),
        W.p('មេរៀនណែនាំនេះ បង្ហាញពីរបៀបឆ្លើយសំណួរលើអេក្រង់ ដូចតេស្តលើកុំព្យូទ័រ។ វាមិនមែនជាតេស្តទេ ហើយមិនមានការដាក់ពិន្ទុទេ។'),
        W.p('អ្នកនឹងហាត់ឆ្លើយតាមរបៀបនីមួយៗ ម្ដងមួយអេក្រង់។ ពេលអ្នកឆ្លើយត្រូវ អ្នកនឹងឃើញសញ្ញា ✓។')),
      right: screenMap,
    },
    {
      tag: 'ជំហាន ១ / ៧', split: 46, items: ['tutq1'],
      left: (ctx) => W.stack(
        W.instr('សូមមើលតារាង «តម្លៃផ្លែឈើនៅផ្សារ» នៅខាងស្ដាំ។ សូមចុចលើជម្រើសមួយ ដើម្បីឆ្លើយសំណួរ។'),
        tip('ចុចលើរង្វង់ ឬលើពាក្យនៃជម្រើស។ បើចង់ប្ដូរចម្លើយ ចុចលើជម្រើសផ្សេងទៀត។'),
        checked(ctx, 'tutq1',
          W.p('តើផ្លែឈើមួយណាថ្លៃជាងគេ ក្នុងមួយគីឡូក្រាម?', 'q'),
          W.radios(ctx, 'tutq1', 'opt', FRUIT.map((f) => ({ v: f.v, html: f.km }))))),
      right: stimulus,
    },
    {
      tag: 'ជំហាន ២ / ៧', split: 46, items: ['tutq2'],
      left: (ctx) => W.stack(
        W.instr('សូមមើលតារាងនៅខាងស្ដាំ។ សូមចុច «ពិត» ឬ «មិនពិត» សម្រាប់អំណះអំណាងនីមួយៗ។'),
        tip('អំណះអំណាងនីមួយៗត្រូវការចម្លើយមួយ។ ចុចរង្វង់ក្រោមពាក្យ «ពិត» ឬ «មិនពិត» នៅជួរដេកដដែល។'),
        checked(ctx, 'tutq2', W.choiceTable(ctx, 'tutq2', {
          cols: [{ v: 'T', html: 'ពិត', label: 'ពិត' }, { v: 'F', html: 'មិនពិត', label: 'មិនពិត' }],
          rows: ['ស្វាយថោកជាងមង្ឃុត។', 'ចេក <span class="m">2</span> គីឡូក្រាម ថ្លៃ <span class="m">6 000</span> រៀល។'],
        }))),
      right: stimulus,
    },
    {
      tag: 'ជំហាន ៣ / ៧', split: 46, items: ['tutq3'],
      left: (ctx) => W.stack(
        W.instr('សូមមើលតារាងនៅខាងស្ដាំ។ សូមវាយចម្លើយរបស់អ្នកក្នុងប្រអប់។'),
        tip('ចុចក្នុងប្រអប់ រួចវាយលេខ។ អ្នកអាចប្រើលេខខ្មែរ (១២៣) ឬលេខឡាតាំង (123) ក៏បាន។'),
        checked(ctx, 'tutq3',
          W.p('តើត្រូវចំណាយប្រាក់ប៉ុន្មានរៀល ដើម្បីទិញស្វាយ <span class="m">3</span> គីឡូក្រាម?', 'q'),
          h('div', { class: 'ansline' }, h('span', { class: 'pre' }, 'ចម្លើយ៖'), W.input(ctx, 'tutq3', 'a', '', { cls: 'ans', label: 'ចម្លើយ' }), h('span', { class: 'post' }, 'រៀល')))),
      right: stimulus,
    },
    {
      tag: 'ជំហាន ៤ / ៧', split: 46, items: ['tutq4'],
      left: (ctx) => W.stack(
        W.instr('សូមប្រើម៉ាស៊ីនគិតលេខ ដើម្បីគណនា។ សូមវាយចម្លើយរបស់អ្នកក្នុងប្រអប់។'),
        h('div', { class: 'tut-tip', html: '<b>របៀបធ្វើ៖</b> ចុចប៊ូតុងម៉ាស៊ីនគិតលេខ ' + icon('calc', true) +
          ' នៅរបារខាងលើ ដើម្បីបើកវា។ គណនា រួចវាយចម្លើយក្នុងប្រអប់។ ចុចប៊ូតុងដដែលម្ដងទៀត ដើម្បីបិទម៉ាស៊ីនគិតលេខ។' }),
        checked(ctx, 'tutq4',
          W.p('តើមង្ឃុត <span class="m">1.5</span> គីឡូក្រាម ថ្លៃប៉ុន្មានរៀល?', 'q'),
          h('div', { class: 'ansline' }, h('span', { class: 'pre' }, 'ចម្លើយ៖'), W.input(ctx, 'tutq4', 'a', '', { cls: 'ans', label: 'ចម្លើយ' }), h('span', { class: 'post' }, 'រៀល')))),
      right: stimulus,
    },
    {
      tag: 'ជំហាន ៥ / ៧', split: 50, items: ['tutq5'],
      left: (ctx) => W.stack(
        W.instr('សូមអូសផ្លែឈើនីមួយៗ ទៅដាក់ក្នុងប្រអប់ តាមលំដាប់តម្លៃ ពីថោកជាងគេ ទៅថ្លៃជាងគេ។'),
        tip('ចុចសង្កត់លើឈ្មោះផ្លែឈើ អូសទៅប្រអប់ រួចលែង។ ឬចុចលើផ្លែឈើម្ដង រួចចុចលើប្រអប់។ ចុចលើប្រអប់ដែលមានផ្លែឈើរួច ដើម្បីដកវាចេញ។'),
        sortFruit(ctx)),
      right: stimulus,
    },
    {
      tag: 'ជំហាន ៦ / ៧', split: 46, items: ['tutq6'],
      left: (ctx) => W.stack(
        W.instr('សូមចុចលើផ្ទាំង «ផ្សារ ក» និង «ផ្សារ ខ» នៅខាងស្ដាំ ដើម្បីមើលតារាងនីមួយៗ។ រួចចុចលើជម្រើសមួយ។'),
        tip('ផ្ទាំងនីមួយៗបង្ហាញព័ត៌មានផ្សេងគ្នា។ ចុចលើឈ្មោះផ្ទាំង ដើម្បីប្ដូរ។'),
        checked(ctx, 'tutq6',
          W.p('តើផ្សារមួយណាលក់មង្ឃុតថោកជាង?', 'q'),
          W.radios(ctx, 'tutq6', 'opt', [{ v: 'A', html: 'ផ្សារ ក' }, { v: 'B', html: 'ផ្សារ ខ' }]))),
      right: (ctx) => W.stack(
        h('div', { class: 'stim-title' }, 'តម្លៃផ្លែឈើនៅផ្សារពីរ'),
        W.tabs(ctx, 'tut-market', [
          { label: 'ផ្សារ ក', color: '#3e8ec4', light: '#d6e8f5', render: () => priceTable(Object.fromEntries(FRUIT.map((f) => [f.v, f.price]))) },
          { label: 'ផ្សារ ខ', color: '#6c8446', light: '#e1ead3', render: () => priceTable(MARKET_B) },
        ])),
    },
    {
      tag: 'ជំហាន ៧ / ៧', split: 50, items: ['tutq7'],
      left: (ctx) => W.stack(
        W.instr('សូមវាយចម្លើយរបស់អ្នកក្នុងប្រអប់។'),
        tip('ប៊ូតុងខាងលើប្រអប់ ជួយសរសេរគណិតវិទ្យា៖ ប្រភាគ ស្វ័យគុណ ឫសការេ π និងសញ្ញាផ្សេងៗ។ ' +
          'ឧទាហរណ៍ ចុចប៊ូតុងប្រភាគ រួចវាយ <span class="m">3</span> ក្នុងវង់ក្រចកទីមួយ និង <span class="m">4</span> ក្នុងវង់ក្រចកទីពីរ។ ' +
          'អ្នកក៏អាចវាយ <span class="m">3/4</span> ពីក្ដារចុចដោយផ្ទាល់បានដែរ។ នៅក្រោមប្រអប់ អ្នកនឹងឃើញចម្លើយជាទម្រង់គណិតវិទ្យា។'),
        checked(ctx, 'tutq7',
          W.p('ស្វាយ <span class="m">3</span> គីឡូក្រាម ត្រូវចែកស្មើគ្នាឱ្យមនុស្ស <span class="m">4</span> នាក់។ តើម្នាក់ៗទទួលបានស្វាយប៉ុន្មានគីឡូក្រាម? សូមសរសេរចម្លើយជាប្រភាគ។', 'q'),
          W.textarea(ctx, 'tutq7', 'why', 'សូមវាយចម្លើយនៅទីនេះ', 3))),
      right: stimulus,
    },
    {
      tag: 'ចប់', full: true,
      left: () => W.stack(
        W.instr('អ្នកបានហាត់ឆ្លើយតាមរបៀបនីមួយៗរួចហើយ!'),
        W.p('ពេលធ្វើតេស្តក្នុង <b>របៀបតេស្ត</b>៖'),
        h('ul', { class: 'tut-list' },
          h('li', {}, 'អានសំណួរ និងព័ត៌មាននៅខាងស្ដាំឱ្យបានច្បាស់ មុននឹងឆ្លើយ។'),
          h('li', {}, 'ចុច «បន្ទាប់» តែពេលអ្នកឆ្លើយរួច។ អ្នកមិនអាចត្រឡប់មកកែចម្លើយវិញបានទេ។'),
          h('li', {}, 'បើអ្នកមិនទាន់ឆ្លើយផ្នែកណាមួយ កម្មវិធីនឹងសួរអ្នកសិន។'),
          h('li', { html: 'ចុច ' + icon('help', true) + ' ពេលណាក៏បាន ដើម្បីមើលជំនួយ។' })),
        W.p('ចុច «បញ្ចប់» ដើម្បីមើលថា អ្នកបានធ្វើជំហាននីមួយៗត្រឹមត្រូវឬទេ។')),
    },
  ];

  // ------------------------------------------------------------ the end ---
  // Replaces the results table: one line per step, and the way on.
  function results(api) {
    const qids = Object.keys(QUESTIONS);
    const right = qids.filter((qid) => api.score(qid) === 1).length;
    const page = h('div', { class: 'results tut-done' });
    page.append(h('header', { class: 'res-head' },
      h('h1', {}, right === qids.length ? '✓ អ្នកបានបញ្ចប់មេរៀនណែនាំ' : 'អ្នកបានបញ្ចប់មេរៀនណែនាំ'),
      h('p', { class: 'res-sub' }, 'ត្រឹមត្រូវ ' + PISA.km(right) + ' / ' + PISA.km(qids.length) + ' ជំហាន')));
    page.append(h('ul', { class: 'tut-steps' }, ...qids.map((qid) => {
      const q = QUESTIONS[qid];
      const ok = api.score(qid) === 1;
      return h('li', { class: ok ? 'ok' : 'no' },
        h('span', { class: 'tut-mark', 'aria-hidden': 'true' }, ok ? '✓' : '○'),
        h('span', {}, h('b', {}, q.label + ' · ' + q.format), ok ? null : h('span', { class: 'tut-key-ans', html: ' — ចម្លើយ៖ ' + q.key })));
    })));
    page.append(h('p', {}, right === qids.length
      ? 'ឥឡូវអ្នករួចរាល់ហើយ សម្រាប់តេស្តលើកុំព្យូទ័រ។'
      : 'អ្នកអាចធ្វើមេរៀនណែនាំម្ដងទៀត ដើម្បីហាត់ជំហានដែលមិនទាន់ត្រឹមត្រូវ។'));
    page.append(h('div', { class: 'res-actions' },
      h('button', { type: 'button', class: 'btn btn-primary', onclick: api.home }, 'ទៅទំព័រដើម ដើម្បីចាប់ផ្ដើមតេស្ត'),
      h('button', { type: 'button', class: 'btn', onclick: api.again }, '↻ ធ្វើមេរៀនណែនាំម្ដងទៀត')));
    return page;
  }

  PISA.registerUnit({
    id: 'tut',
    no: 0,
    collection: 'tutorial',
    label: 'មេរៀនណែនាំ',
    title: TITLE,
    en: 'Tutorial',
    footer: 'មេរៀនណែនាំរបស់គម្រោង — មិនមែនជាមេរៀនណែនាំផ្លូវការរបស់ OECD ឬ PISA ទេ',
    questions: QUESTIONS,
    screens: SCREENS,
    results,
  });
})();
