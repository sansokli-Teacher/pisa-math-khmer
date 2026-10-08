/* Home page and start-up.
 *
 * Teacher preview: open index.html#preview=u4:2 to jump straight to unit 4,
 * screen 3 (screens count from 0) in practice mode. Preview sessions are not
 * saved, so they never overwrite a student's session on the same computer.
 * Direct start: index.html#unit=t0101[,t0102...] opens only those units in practice mode;
 * index.html#test=t0101,t0102,... runs them as one test (forward-only, like the real PISA).
 */
(function () {
  'use strict';
  const { h } = PISA;

  const COLLECTIONS = [
    { id: 'gold', tab: 'ប្រធានបទគំរូ', title: 'ប្រធានបទគំរូ', sub: 'ប្រធានបទដើមរបស់គម្រោង ដែលអ្នកនិពន្ធបានអនុម័ត សម្រាប់ថ្នាក់ទី ៧ ៨ និង ៩' },
    { id: 'textbook', tab: 'លំហាត់តាមកម្រិតថ្នាក់', title: 'លំហាត់តាមកម្រិតថ្នាក់', sub: 'លំហាត់ PISA ពីមេរៀននីមួយៗ ក្នុងសៀវភៅរបស់លោកគ្រូ សាន សុខលី តាមថ្នាក់ទី ៧ ដល់ ១២។ ឥឡូវមានតែថ្នាក់ទី ៩ ប៉ុណ្ណោះ ថ្នាក់ផ្សេងទៀតកំពុងរៀបចំ (សេចក្ដីព្រាង)។' },
    { id: 'practice', tab: 'ប្រធានបទគម្រោង', title: 'ប្រធានបទគម្រោង', sub: 'ប្រធានបទ ក–ឍ ដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ — សេចក្ដីព្រាង រង់ចាំការពិនិត្យពីគ្រូ' },
    { id: 'moeys', tab: 'PISA TEST (MoEYS)', title: 'PISA TEST (MoEYS)', sub: 'ប្រធានបទ ៣៨ ដកស្រង់ពីឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥ (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ)' },
    { id: 'oecd', tab: 'From PISA 2022', title: 'From PISA 2022', sub: 'ឧទាហរណ៍ទាំងប្រាំពីរពីក្របខណ្ឌគណិតវិទ្យា PISA ២០២២ របស់ OECD បកប្រែជាភាសាខ្មែរ' },
  ];
  const colOf = (u) => u.collection || 'oecd';
  const pointsOf = (u) => Object.values(u.questions).reduce((s, q) => s + (q.max || 1), 0);

  // --------------------------------------------------- site chrome ---
  // The home and results pages wear khmermath.org's look (header, footer,
  // Kantumruy Pro, css/site.css); the test screens keep the PISA-style chrome.
  const ICONS = {
    monitor: '<rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 20.5h8M12 16.5v4"/>',
    check: '<path d="m4.5 12.5 4.8 4.8L19.5 7"/>',
    chart: '<path d="M3.5 3.5v17h17"/><path d="M8 16v-4M12 16V8M16 16v-6.5"/>',
    download: '<path d="M12 3.5v11.5M7 10l5 5 5-5M4.5 20.5h15"/>',
    arrow: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    free: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.6-7.6V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.8" cy="7.8" r="1.4"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.5 2.8 3.8 6 3.8 9.5s-1.3 6.7-3.8 9.5c-2.5-2.8-3.8-6-3.8-9.5S9.5 5.3 12 2.5z"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
    layers: '<path d="m12 2.8 9.5 4.7-9.5 4.8-9.5-4.8z"/><path d="m2.5 12.2 9.5 4.8 9.5-4.8"/><path d="m2.5 16.8 9.5 4.7 9.5-4.7"/>',
    calc: '<rect x="4.5" y="2.5" width="15" height="19" rx="2"/><path d="M8 6.5h8M8.3 11h.1M12 11h.1M15.7 11h.1M8.3 14.6h.1M12 14.6h.1M15.7 14.6h.1M8.3 18.2h.1M12 18.2h3.8"/>',
    target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.6"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    message: '<path d="M20.5 12.5a8 8 0 0 1-11.7 7.1L3.5 21l1.4-5a8 8 0 1 1 15.6-3.5z"/><path d="M8.5 11h7M8.5 14.5h4.5"/>',
    heart: '<path d="M12 20.3s-7.6-4.6-9.3-9.4C1.5 7.6 3.6 4.3 7.1 4.3c2 0 3.7 1.1 4.9 2.9 1.2-1.8 2.9-2.9 4.9-2.9 3.5 0 5.6 3.3 4.4 6.6-1.7 4.8-9.3 9.4-9.3 9.4z"/>',
    home: '<path d="m3.5 11 8.5-7.5 8.5 7.5"/><path d="M5.5 9.5v11h13v-11"/>',
  };
  const ic = (n) => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>';
  const SITE = 'https://khmermath.org/';
  const TG = 'https://t.me/pisamathAI';
  const ext = { target: '_blank', rel: 'noopener' };

  // action: { label, onclick } for the button at the right of the bar (the results page)
  function siteHeader(action) { return homeHeader(null, action); }
  PISA.siteHeader = siteHeader;

  // notices(box) adds the licence notices a page must show (the home page's)
  function siteFooter(notices) {
    const col = (title, links) => h('div', { class: 'km-foot-col' }, h('h4', {}, title),
      h('ul', {}, ...links.map(([t, href]) => h('li', {}, h('a', { href, ...ext }, t)))));
    const box = h('div', { class: 'km-notices' });
    if (notices) notices(box);
    return h('footer', { class: 'km-footer' }, h('div', { class: 'km-wrap' },
      h('div', { class: 'km-foot-grid' },
        h('div', { class: 'km-foot-brand' },
          h('a', { class: 'km-brand', href: SITE, ...ext },
            h('img', { src: 'assets/img/logo.svg', alt: '', width: 38, height: 38 }),
            h('span', { class: 'km-brand-t' }, h('b', {}, 'KhmerMath'), h('small', {}, 'គណិតវិទ្យាខ្មែរ'))),
          h('p', {}, 'គេហទំព័ររៀនគណិតវិទ្យាជាភាសាខ្មែរ សម្រាប់សិស្ស និងគ្រូ ថ្នាក់ទី ៧ ដល់ទី ១២។ ឥតគិតថ្លៃ និងមិនរកប្រាក់ចំណេញ។')),
        col('PISA និង CBA', [['អំពី PISA', SITE + 'pisa.html'], ['សៀវភៅ PISA ២០២២', 'https://pisa.khmermath.org/'], ['អំពីតេស្ត CBA', SITE + 'cba.html']]),
        col('សម្រាប់គ្រូ', [['ធនធានសម្រាប់គ្រូ', SITE + 'teachers.html'], ['ប្រើក្នុងបន្ទប់កុំព្យូទ័រ', SITE + 'cba.html#lab']]),
        col('អំពី', [['អំពីគម្រោង', SITE + 'about.html#project'], ['សហគមន៍ Telegram', TG], ['ប្រភព និងអាជ្ញាប័ណ្ណ', SITE + 'about.html#licence']])),
      // live visitors (js/visits.js, online only), and where to report a mistake or support the site
      h('div', { class: 'km-foot-cta', html:
        '<div class="vc-foot" data-vc-box hidden><span class="km-foot-i">' + ic('eye') + '</span>' +
        '<span>អ្នកចូលមើល <b data-vc="visitors">—</b> នាក់ · ថ្ងៃនេះ <b data-vc="today">—</b> នាក់ · មកពី <b data-vc="countries">—</b> ប្រទេស</span>' +
        '<span class="vc-flags" data-vc-flags="10"></span></div>' +
        '<div class="km-foot-btns"><a class="km-btn km-btn-ghost km-btn-sm" href="' + TG + '" target="_blank" rel="noopener">' + ic('message') + ' ឃើញកំហុសក្នុងសំណួរ? ប្រាប់យើង</a>' +
        '<a class="km-btn km-btn-ghost km-btn-sm km-heart" href="' + SITE + 'about.html#support" target="_blank" rel="noopener">' + ic('heart') + ' គាំទ្រ KhmerMath</a></div>' }),
      box.childNodes.length ? box : null,
      h('div', { class: 'km-foot-bottom' },
        h('p', {}, '© ២០២៦ សាន សុខលី · khmermath.org'),
        h('p', {}, 'មិនមែនជាគេហទំព័រផ្លូវការរបស់ OECD ឬក្រសួងអប់រំ យុវជន និងកីឡាទេ'))));
  }
  PISA.siteFooter = siteFooter;

  // ----------------------------------------------------------- home ---
  // A plain page, like the front of an exercise book: the start options as a ruled list, the student's own
  // practice kept on the computer, then the topic list. No cards, no banners.
  const WHO_KEY = 'pisa-cba-khmer:who';
  const MODE_WORDS = { practice: 'ហាត់រៀន', test: 'តេស្ត', mock: 'ប្រឡងកំណត់ម៉ោង' };
  const dateKm = (t) => { const d = new Date(t); return PISA.km(d.getDate()) + '/' + PISA.km(d.getMonth() + 1) + '/' + PISA.km(d.getFullYear()); };
  const pctOf = (got, max) => (max ? Math.round((got / max) * 100) : 0);

  function homeHeader(tutorial, action) {
    return h('header', { class: 'hm-top' }, h('div', { class: 'hm-wrap hm-top-in' },
      h('a', { class: 'hm-brand', href: SITE, ...ext }, h('img', { src: 'assets/img/logo.svg', alt: '', width: 30, height: 30 }),
        h('span', {}, h('b', {}, 'KhmerMath'), ' · តេស្តលើកុំព្យូទ័រ')),
      h('nav', { class: 'hm-nav', 'aria-label': 'KhmerMath' },
        tutorial ? h('button', { type: 'button', class: 'hm-link', onclick: tutorial }, 'មេរៀនណែនាំ') : null,
        h('a', { href: SITE, ...ext }, 'ទំព័រដើម KhmerMath'),
        h('a', { class: 'hm-opt', href: 'https://pisa.khmermath.org/', ...ext }, 'សៀវភៅ PISA ២០២២'),
        h('a', { class: 'hm-opt', href: SITE + 'cba.html#lab', ...ext }, 'សម្រាប់បន្ទប់កុំព្យូទ័រ')),
      action ? h('button', { type: 'button', class: 'hm-btn hm-btn-main', onclick: action.onclick }, action.label) : null));
  }

  function home() {
    const app = document.getElementById('app');
    app.className = 'app-home km hm';
    app.innerHTML = '';
    document.title = 'ហាត់គណិតវិទ្យាតាមបែប PISA — KhmerMath';

    let who = {};
    try { who = JSON.parse(localStorage.getItem(WHO_KEY)) || {}; } catch (e) { who = {}; }
    const name = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. សុខ ដារ៉ា', value: who.name || '' });
    const klass = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. ៩ក', value: who.klass || '' });
    const remember = () => { try { localStorage.setItem(WHO_KEY, JSON.stringify({ name: name.value.trim(), klass: klass.value.trim() })); } catch (e) { /* ignore */ } };
    name.addEventListener('change', remember); klass.addEventListener('change', remember);
    const start = (opts) => { remember(); PISA.start(Object.assign({ name: name.value.trim(), klass: klass.value.trim() }, opts)); };

    const gold = PISA.units.filter((u) => colOf(u) === 'gold');
    const goldQs = gold.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    const all = PISA.units.filter((u) => u.collection !== 'tutorial');
    const allQs = all.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    const hasTutorial = !!PISA.unit('tut');
    const goldIds = gold.map((u) => u.id);

    app.append(homeHeader(hasTutorial ? startTutorial : null));
    const main = h('main', { id: 'main', class: 'hm-main' });
    const wrap = h('div', { class: 'hm-wrap' });
    main.append(wrap);

    // --- what this is
    wrap.append(h('section', { class: 'hm-intro' },
      h('h1', {}, 'ហាត់គណិតវិទ្យាតាមបែប PISA'),
      h('p', { class: 'hm-lead' }, 'សំណួរតាមបែប PISA ជាភាសាខ្មែរ លើអេក្រង់ដែលរៀបចំដូចតេស្តពិត។ ហាត់ម្ដងមួយសំណួរ ហើយពិនិត្យចម្លើយភ្លាមៗ ឬធ្វើជាតេស្តដូចពិត។'),
      h('p', { class: 'hm-facts' }, PISA.km(all.length) + ' ប្រធានបទ · ' + PISA.km(allQs) + ' សំណួរ · ឥតគិតថ្លៃ · ប្រើលើទូរស័ព្ទបាន · ប្រើពេលគ្មានអ៊ីនធឺណិតបាន')));

    // --- who (optional)
    wrap.append(h('div', { class: 'hm-who' },
      h('label', {}, h('span', {}, 'ឈ្មោះ'), name), h('label', {}, h('span', {}, 'ថ្នាក់'), klass),
      h('p', {}, 'មិនបំពេញក៏បាន។ ឈ្មោះនឹងចេញលើលទ្ធផល ហើយនឹងមិនត្រូវបានផ្ញើទៅកន្លែងណាទេ។')));

    // --- an unfinished or finished session on this computer
    const saved = PISA.saved();
    if (saved && saved.unitIds && saved.unitIds.every((id) => PISA.unit(id))) {
      const sw = saved.student && saved.student.name ? saved.student.name : 'មិនមានឈ្មោះ';
      const box = h('div', { class: 'hm-resume' });
      if (saved.finishedAt) {
        box.append(h('p', {}, 'វគ្គចុងក្រោយរបស់ ' + sw + ' បានបញ្ចប់រួចហើយ។'),
          h('button', { type: 'button', class: 'hm-btn', onclick: () => PISA.resume(saved) }, 'មើលលទ្ធផល'),
          h('button', { type: 'button', class: 'hm-link', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល'));
      } else {
        const u = PISA.unit(saved.unitIds[saved.pos.u]);
        box.append(h('p', {}, 'មានវគ្គមួយមិនទាន់បញ្ចប់៖ ' + sw + ' — ' + u.title + ' អេក្រង់ទី ' + PISA.km(saved.pos.s + 1) + '។'),
          h('button', { type: 'button', class: 'hm-btn hm-btn-main', onclick: () => PISA.resume(saved) }, 'បន្តវគ្គនេះ'),
          h('button', { type: 'button', class: 'hm-link', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល ហើយចាប់ផ្ដើមថ្មី'));
      }
      wrap.append(box);
    }

    // --- two columns: start now / my practice
    const startMock = (qCount, mins) => {
      start({ mode: 'test', unitIds: PISA.sampleMockUnits(qCount), mock: { durationSeconds: mins * 60,
        title: 'ប្រឡងកំណត់ម៉ោង (' + PISA.km(qCount) + ' សំណួរ · ' + PISA.km(mins) + ' នាទី)' } });
    };
    const mockPick = h('select', { 'aria-label': 'ប្រឡងកំណត់ម៉ោង' },
      h('option', { value: '10,30' }, '១០ សំណួរ · ៣០ នាទី'), h('option', { value: '15,45' }, '១៥ សំណួរ · ៤៥ នាទី'), h('option', { value: '20,60' }, '២០ សំណួរ · ៦០ នាទី'));
    const row = (title, text, ...actions) => h('li', { class: 'hm-row' }, h('div', { class: 'hm-row-t' }, h('b', {}, title), h('span', {}, text)), h('div', { class: 'hm-row-a' }, ...actions));
    const quick = h('ol', { class: 'hm-rows' });
    if (gold.length) {
      quick.append(row('ហាត់ប្រធានបទគំរូ ថ្នាក់ទី ៧ ៨ ៩', PISA.km(gold.length) + ' ប្រធានបទ · ' + PISA.km(goldQs) + ' សំណួរ · មានចម្លើយភ្លាមៗ',
        h('button', { type: 'button', class: 'hm-btn hm-btn-main', onclick: () => start({ mode: 'practice', unitIds: goldIds }) }, 'ចាប់ផ្ដើមហាត់')));
      quick.append(row('ធ្វើតេស្តគំរូ', 'ប្រធានបទដដែល តែទៅមុខតែមួយផ្លូវ ដូចតេស្ត PISA ពិត',
        h('button', { type: 'button', class: 'hm-btn', onclick: () => start({ mode: 'test', unitIds: goldIds }) }, 'ធ្វើតេស្ត')));
    }
    quick.append(row('ប្រឡងកំណត់ម៉ោង', 'សំណួរចៃដន្យពី PISA TEST (MoEYS) ប្រធានបទ ៣៨ មាននាឡិកាកំណត់ម៉ោង', mockPick,
      h('button', { type: 'button', class: 'hm-btn', onclick: () => { const [q, m] = mockPick.value.split(',').map(Number); startMock(q, m); } }, 'ចាប់ផ្ដើម')));
    if (hasTutorial) quick.append(row('មេរៀនណែនាំ', 'រៀនប្រើអេក្រង់ ប៊ូតុង និងម៉ាស៊ីនគិតលេខ មុនធ្វើតេស្ត (ប្រហែល ៥ នាទី)',
      h('button', { type: 'button', class: 'hm-btn', onclick: startTutorial }, 'មើល')));

    const mine = h('section', { class: 'hm-mine' }, h('h2', {}, 'ការហាត់របស់ខ្ញុំ'));
    const hist = PISA.history();
    if (!hist.length) {
      mine.append(h('p', { class: 'hm-empty' }, 'មិនទាន់មានការហាត់ដែលបានបញ្ចប់ទេ។ ពេលបញ្ចប់ អ្វីដែលបានហាត់នឹងបង្ហាញនៅទីនេះ។ ទិន្នន័យនេះរក្សាទុកតែក្នុងកុំព្យូទ័រ ឬទូរស័ព្ទនេះប៉ុណ្ណោះ។'));
    } else {
      const list = h('ul', { class: 'hm-hist' });
      hist.slice(-5).reverse().forEach((x) => {
        const first = PISA.unit(x.units[0] && x.units[0].id);
        const more = x.units.length > 1 ? ' និង ' + PISA.km(x.units.length - 1) + ' ផ្សេងទៀត' : '';
        list.append(h('li', {}, h('span', { class: 'hm-hd' }, dateKm(x.t)), h('span', { class: 'hm-hm' }, MODE_WORDS[x.mode] || x.mode),
          h('span', { class: 'hm-ht' }, (first ? first.title : '—') + more),
          h('span', { class: 'hm-hs' }, x.max ? PISA.km(x.got) + '/' + PISA.km(x.max) : '—'),
          h('span', { class: 'hm-bar', role: 'img', 'aria-label': PISA.km(pctOf(x.got, x.max)) + '%' }, h('i', { style: { width: pctOf(x.got, x.max) + '%' } }))));
      });
      mine.append(list);
      // topics to do again: the lowest shares over all the sessions
      const sum = new Map();
      hist.forEach((x) => x.units.forEach((u) => { const g = sum.get(u.id) || { got: 0, max: 0 }; g.got += u.got; g.max += u.max; sum.set(u.id, g); }));
      const weak = [...sum.entries()].filter(([id, g]) => g.max > 0 && PISA.unit(id) && pctOf(g.got, g.max) < 60)
        .sort((a, b) => pctOf(a[1].got, a[1].max) - pctOf(b[1].got, b[1].max)).slice(0, 4);
      if (weak.length) {
        mine.append(h('h3', {}, 'ប្រធានបទដែលគួរហាត់ម្ដងទៀត'));
        const wl = h('ul', { class: 'hm-weak' });
        weak.forEach(([id, g]) => wl.append(h('li', {}, h('span', {}, PISA.unit(id).title), h('em', {}, PISA.km(pctOf(g.got, g.max)) + '%'),
          h('button', { type: 'button', class: 'hm-link', onclick: () => start({ mode: 'practice', unitIds: [id] }) }, 'ហាត់'))));
        mine.append(wl);
      }
      mine.append(h('button', { type: 'button', class: 'hm-link hm-clear', onclick: () => PISA.dialog(['លុបប្រវត្តិការហាត់ពីកុំព្យូទ័រនេះ?'],
        [{ label: 'បោះបង់' }, { label: 'លុប', primary: true, action: () => { PISA.clearHistory(); home(); } }]) }, 'លុបប្រវត្តិ'));
    }
    wrap.append(h('div', { class: 'hm-cols' }, h('section', { class: 'hm-start' }, h('h2', {}, 'ចាប់ផ្ដើមភ្លាម'), quick), mine));

    // --- choose the topics: one tab per source; the choice is kept across tabs
    const chosen = new Set();           // nothing is ticked until the student chooses
    const cols = COLLECTIONS.filter((c) => PISA.units.some((u) => colOf(u) === c.id));
    let tab = cols[0].id, find = '';

    const tabBar = h('div', { class: 'hm-tabs', role: 'tablist', 'aria-label': 'ប្រភេទប្រធានបទ' });
    const panel = h('div', { class: 'hm-panel', role: 'tabpanel', id: 'ctab-panel' });
    const summary = h('span', { class: 'hm-sum', 'aria-live': 'polite' });
    const err = h('span', { class: 'hm-err', role: 'alert' });
    const finder = h('input', { type: 'search', placeholder: 'ស្វែងរកប្រធានបទ', 'aria-label': 'ស្វែងរកប្រធានបទ' });
    finder.addEventListener('input', () => { find = finder.value.trim().toLowerCase(); drawPanel(); });

    function unitRow(u) {
      const inp = h('input', { type: 'checkbox' });
      inp.checked = chosen.has(u.id);
      const qs = Object.values(u.questions);
      const li = h('label', { class: 'hm-unit' + (inp.checked ? ' on' : '') }, inp,
        h('span', { class: 'hm-no' }, u.label || PISA.km(u.no)),
        h('span', { class: 'hm-ut' }, h('b', {}, u.title), u.en ? h('small', {}, u.en) : null),
        h('span', { class: 'hm-un' }, (u.grade ? 'ថ្នាក់ ' + PISA.km(u.grade) + ' · ' : '') + PISA.km(qs.length) + ' សំណួរ'));
      inp.addEventListener('change', () => {
        if (inp.checked) chosen.add(u.id); else chosen.delete(u.id);
        li.classList.toggle('on', inp.checked);
        refresh();
      });
      return li;
    }
    function allOrNone(list) {
      const set = (on) => { list.forEach((u) => (on ? chosen.add(u.id) : chosen.delete(u.id))); drawPanel(); refresh(); };
      return h('span', { class: 'hm-allnone' },
        h('button', { type: 'button', class: 'hm-link', onclick: () => set(true) }, 'ជ្រើសទាំងអស់'),
        h('button', { type: 'button', class: 'hm-link', onclick: () => set(false) }, 'មិនជ្រើស'));
    }
    const matches = (u) => !find || (u.title + ' ' + (u.en || '') + ' ' + (u.lessonTitle || '') + ' ' + (u.blurb || '')).toLowerCase().includes(find);
    function drawPanel() {
      const col = cols.find((c) => c.id === tab);
      let list = PISA.units.filter((u) => colOf(u) === col.id);
      if (col.id === 'moeys') list.sort((a, b) => (Number(a.no) || 0) - (Number(b.no) || 0));
      const shown = list.filter(matches);
      panel.innerHTML = '';
      panel.append(h('div', { class: 'hm-col-head' }, h('div', {}, h('h3', {}, col.title), h('p', {}, col.sub)), allOrNone(shown)));
      if (!shown.length) { panel.append(h('p', { class: 'hm-empty' }, 'រកមិនឃើញប្រធានបទនេះក្នុងប្រភេទនេះទេ។')); return; }
      if (col.id === 'textbook') {
        // one block per grade (7 to 12 as they are written), and in it one group per lesson, as in the textbook
        const grades = [...new Set(shown.map((u) => u.grade || 0))].sort((x, y) => x - y);
        grades.forEach((g) => {
          const inGrade = shown.filter((u) => (u.grade || 0) === g), lessons = [];
          inGrade.forEach((u) => { const l = lessons.find((x) => x.n === u.lesson); if (l) l.units.push(u); else lessons.push({ n: u.lesson, title: u.lessonTitle, units: [u] }); });
          panel.append(h('div', { class: 'hm-grade' },
            h('h4', {}, g ? 'ថ្នាក់ទី ' + PISA.km(g) : 'ថ្នាក់ផ្សេងទៀត'), allOrNone(inGrade)));
          lessons.forEach((l) => panel.append(h('div', { class: 'hm-lesson' },
            h('div', { class: 'hm-lesson-h' }, h('h4', {}, 'មេរៀនទី ' + PISA.km(l.n) + ' · ' + l.title), allOrNone(l.units)),
            h('div', { class: 'hm-units' }, ...l.units.map(unitRow)))));
        });
      } else {
        panel.append(h('div', { class: 'hm-units' }, ...shown.map(unitRow)));
      }
    }
    function drawTabs() {
      tabBar.innerHTML = '';
      cols.forEach((c, i) => {
        const list = PISA.units.filter((u) => colOf(u) === c.id);
        const picked = list.filter((u) => chosen.has(u.id)).length;
        tabBar.append(h('button', {
          type: 'button', role: 'tab', class: 'hm-tab' + (c.id === tab ? ' on' : ''), id: 'ctab-' + c.id,
          'aria-selected': c.id === tab ? 'true' : 'false', 'aria-controls': 'ctab-panel', tabindex: c.id === tab ? '0' : '-1',
          onclick: () => select(c.id),
          onkeydown: (e) => {
            const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            select(cols[(i + d + cols.length) % cols.length].id);
            tabBar.querySelector('.hm-tab.on').focus();
          },
        }, c.tab, h('small', {}, picked ? PISA.km(picked) + '/' + PISA.km(list.length) : PISA.km(list.length))));
      });
      panel.setAttribute('aria-labelledby', 'ctab-' + tab);
    }
    function select(id) {
      tab = id;
      drawTabs(); drawPanel();
    }
    function refresh() {
      const picked = PISA.units.filter((u) => chosen.has(u.id));
      const nq = picked.reduce((n, u) => n + PISA.questionIds(u).length, 0);
      summary.textContent = picked.length ? 'បានជ្រើស ' + PISA.km(picked.length) + ' ប្រធានបទ · ' + PISA.km(nq) + ' សំណួរ' : 'មិនទាន់ជ្រើសប្រធានបទ';
      if (picked.length) err.textContent = '';
      drawTabs();
    }
    const go = (mode) => () => {
      const ids = PISA.units.map((u) => u.id).filter((id) => chosen.has(id));
      if (!ids.length) { err.textContent = 'សូមជ្រើសរើសប្រធានបទយ៉ាងហោចណាស់មួយ។'; return; }
      start({ mode, unitIds: ids });
    };
    const bar = h('div', { class: 'hm-bar-start' }, summary, err,
      h('button', { type: 'button', class: 'hm-link', onclick: () => { chosen.clear(); drawPanel(); refresh(); } }, 'សម្អាត'),
      h('button', { type: 'button', class: 'hm-btn', onclick: go('test') }, 'ធ្វើជាតេស្ត'),
      h('button', { type: 'button', class: 'hm-btn hm-btn-main', onclick: go('practice') }, 'ហាត់រៀន'));
    wrap.append(h('section', { class: 'hm-topics', id: 'start' },
      h('div', { class: 'hm-topics-h' }, h('h2', {}, 'ជ្រើសប្រធានបទខ្លួនឯង'), finder),
      h('p', { class: 'hm-modes' }, h('b', {}, 'ហាត់រៀន៖'), ' ពិនិត្យចម្លើយបានភ្លាមៗ ព្យាយាមម្ដងទៀត និងចុចថយក្រោយបាន។ ', h('b', {}, 'ធ្វើជាតេស្ត៖'), ' ទៅមុខតែមួយផ្លូវ ដូចតេស្ត PISA ពិត។'),
      h('div', { class: 'hm-zone' }, tabBar, panel, bar)));
    drawPanel();
    refresh();

    // --- for teachers
    wrap.append(h('section', { class: 'hm-teach' }, h('h2', {}, 'សម្រាប់គ្រូ'),
      h('p', {}, h('b', {}, 'ពិន្ទុ។ '), 'សំណួរបិទត្រូវបានដាក់ពិន្ទុដោយស្វ័យប្រវត្តិ។ សំណួរសរសេរចម្លើយវែង គ្រូអាន ដាក់ពិន្ទុ និងកែពិន្ទុបាននៅទំព័រលទ្ធផល ហើយទាញយកជា CSV សម្រាប់ Excel។'),
      h('p', {}, h('b', {}, 'តាមដំណើរការ។ '), 'ពិន្ទុតាមដំណើរការគណិតវិទ្យា និងកម្រិតប៉ាន់ស្មាន សម្រាប់ប្រធានបទគំរូ និងប្រធានបទគម្រោង។'),
      h('p', {}, h('b', {}, 'ក្នុងសាលា។ '), 'ដំណើរការបានដោយគ្មានអ៊ីនធឺណិត បន្ទាប់ពីបើកម្ដងរួច។ លទ្ធផលរក្សាទុកតែលើកុំព្យូទ័រនោះ។ ',
        h('a', { href: SITE + 'cba.html#lab', ...ext }, 'របៀបប្រើក្នុងបន្ទប់កុំព្យូទ័រ'))));

    app.append(main, siteFooter((box) => {
      const has = (c) => PISA.units.some((u) => (u.collection || 'oecd') === c);
      if (has('moeys')) {
        box.append(h('p', { class: 'notice', html:
          '<b>PISA TEST (MoEYS) ប្រធានបទ ៣៨៖</b> ដកស្រង់ និងរៀបចំឡើងវិញតាមប្រព័ន្ធកុំព្យូទ័រ CBA ពី «ឯកសារជំនួយស្មារតីស្តីពីសំណួរតេស្តគំរូនីតិវិធី PISA ២០២៥» របស់ក្រសួងអប់រំ យុវជន និងកីឡា (នាយកដ្ឋានអធិការកិច្ចគុណភាពអប់រំ) ឆ្នាំ ២០២៥។' }));
      }
      if (has('gold') || has('practice')) {
        box.append(h('p', { class: 'notice', html:
          '<b>ប្រធានបទគំរូ និងប្រធានបទគម្រោង៖</b> សំណួរដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ «ក្របខណ្ឌគណិតវិទ្យារបស់ PISA ២០២២» (សាន សុខលី)។ ' +
          'សំណួរទាំងនេះរៀបចំតាមបែប PISA តែមិនមែនជាសំណួរផ្លូវការរបស់ OECD ឬ PISA ទេ ហើយកម្រិតលំបាកជាការប៉ាន់ស្មានរបស់អ្នករៀបរៀង មិនមែនការក្រិតតាមខ្នាតផ្លូវការឡើយ។' }));
      }
      if (has('oecd')) {
        // Attribution, change notice, licence and translation disclaimer as
        // CC BY-NC-SA 3.0 IGO and the OECD's terms ask for. Do not shorten.
        box.append(h('div', { class: 'notice', html:
          '<p><b>From PISA 2022 (ឧទាហរណ៍របស់ OECD)៖</b> ប្រធានបទទាំងប្រាំពីរនេះ បកប្រែ និងសម្របជាភាសាខ្មែរពី Annex 2.A «Illustrative examples» នៃ ' +
          'OECD (2023), <i>PISA 2022 Assessment and Analytical Framework</i>, PISA, OECD Publishing, Paris, ' +
          '<a href="https://doi.org/10.1787/dfe0bf9c-en" target="_blank" rel="noopener">https://doi.org/10.1787/dfe0bf9c-en</a> ' +
          '© OECD 2023 ដែលចែកចាយក្រោមអាជ្ញាប័ណ្ណ <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/igo/" target="_blank" rel="noopener">CC BY-NC-SA 3.0 IGO</a>។</p>' +
          '<p><b>ការផ្លាស់ប្ដូរ៖</b> បកប្រែជាភាសាខ្មែរ គូរអេក្រង់ឡើងវិញ (ពុំមែនជារូបថតអេក្រង់ទេ) និងបន្ថែមចម្លើយគំរូ និងការដាក់ពិន្ទុរបស់គម្រោង (សៀវភៅណែនាំគ្រូ ជំពូកទី ៨)។ ' +
          'ការសម្របជាភាសាខ្មែរនៃប្រធានបទទាំងប្រាំពីរនេះ ចែកចាយក្រោមអាជ្ញាប័ណ្ណ CC BY-NC-SA 3.0 IGO ដូចគ្នា សម្រាប់ការប្រើប្រាស់មិនរកប្រាក់ចំណេញ។</p>' +
          '<p>ការបកប្រែនេះមិនមែនធ្វើដោយ OECD ទេ ហើយមិនត្រូវចាត់ទុកជាការបកប្រែផ្លូវការរបស់ OECD ឡើយ។ គុណភាពនៃការបកប្រែ ជាទំនួលខុសត្រូវរបស់អ្នកបកប្រែ។ ' +
          'បើមានភាពខុសគ្នារវាងការបកប្រែ និងអត្ថបទដើម មានតែអត្ថបទដើមប៉ុណ្ណោះដែលមានសុពលភាព។ OECD មិនបានពិនិត្យ ឬគាំទ្រកម្មវិធីនេះទេ។</p>' +
          '<p lang="en" class="en-note">This translation was not created by the OECD and should not be considered an official OECD translation. ' +
          'The quality of the translation and its coherence with the original language text of the work are the sole responsibility of the author(s) of the translation. ' +
          'In the event of any discrepancy between the original work and the translation, only the text of the original work should be considered valid. ' +
          'This is an adaptation of an original work by the OECD; it is not endorsed by the OECD.</p>' }));
      }
    }));
    if (window.kmVisits) window.kmVisits.refresh();
  }
  PISA.home = home;

  // The tutorial (js/units/tutorial.js): practice mode, never saved.
  function startTutorial() {
    PISA.start({ name: '', mode: 'practice', unitIds: ['tut'], preview: true });
  }

  function boot() {
    if (window.matchMedia && window.matchMedia('print').matches) return;
    window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
    // #unit=t0101 or #unit=t0101,t0102: open just those units in practice mode, e.g. from a
    // textbook lesson's «សាកធ្វើលំហាត់នេះ» button; #test=… runs them as one forward-only
    // test («តេស្តពេញ»). Like a preview, neither is saved.
    if (/^#tutorial\b/.test(location.hash) && PISA.unit('tut')) { startTutorial(); return; }
    const one = /(unit|test)=([a-z0-9,_-]+)/i.exec(location.hash);
    const pick = one ? one[2].split(',').filter((id) => PISA.unit(id)) : [];
    if (pick.length && one[1] === 'test') {
      PISA.start({ name: '', mode: 'test', unitIds: pick, preview: true });
      PISA.dialog([
        'តេស្តពេញ៖ ' + PISA.km(pick.length) + ' ប្រធានបទ' + ' ជាប់គ្នា តាមរបៀបតេស្ត PISA ពិត។',
        'ឆ្លើយសំណួរនីមួយៗ រួចចុច «បន្ទាប់»។ អ្នកមិនអាចថយក្រោយ ដើម្បីកែចម្លើយវិញបានទេ។ ពេលចប់ អ្នកនឹងឃើញលទ្ធផល និងចម្លើយគំរូ។',
      ], [{ label: 'ចាប់ផ្ដើម', primary: true }]);
      return;
    }
    if (pick.length) {
      PISA.start({ name: '', mode: 'practice', unitIds: pick, preview: true });
      return;
    }
    const m = /preview=([a-z0-9_-]+)(?::(\d+))?/i.exec(location.hash);
    if (m) {
      const ids = PISA.units.map((u) => u.id);
      const ui = Math.max(0, ids.indexOf(m[1]));
      const si = Math.min(Number(m[2] || 0), PISA.unit(ids[ui]).screens.length - 1);
      PISA.start({ name: 'preview', mode: 'practice', unitIds: ids, u: ui, s: si, preview: true });
      return;
    }
    home();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();


  // PWA online/offline status listener
  window.addEventListener('online', () => {
    const el = document.getElementById('pwa-badge');
    if (el) { el.textContent = '📶 ប្រើពេលគ្មានអ៊ីនធឺណិតបាន'; el.className = 'pwa-status-pill'; }
  });
  window.addEventListener('offline', () => {
    const el = document.getElementById('pwa-badge');
    if (el) { el.textContent = '📡 ក្រៅបណ្ដាញ (Offline Mode)'; el.className = 'pwa-status-pill offline'; }
  });
