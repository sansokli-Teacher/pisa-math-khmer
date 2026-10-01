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
    { id: 'gold', tab: 'ឯកតាគំរូ', title: 'ឯកតាគំរូ', sub: 'ឯកតាដើមរបស់គម្រោង ដែលអ្នកនិពន្ធបានអនុម័ត សម្រាប់ថ្នាក់ទី ៧ ៨ និង ៩' },
    { id: 'practice', tab: 'តេស្ត ក–ឍ', title: 'តេស្តអនុវត្ត ក–ឍ', sub: 'ប្រធានបទដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ — សេចក្ដីព្រាង រង់ចាំការពិនិត្យពីគ្រូ' },
    { id: 'textbook', tab: 'ភារកិច្ចថ្នាក់ទី ៩', title: 'ភារកិច្ច PISA ពីមេរៀនថ្នាក់ទី ៩', sub: 'ពីសៀវភៅ «គណិតវិទ្យាថ្នាក់ទី៩ បែបទំនើប» របស់លោកគ្រូ សាន សុខលី — សៀវភៅកំពុងសរសេរ (សេចក្ដីព្រាង)' },
    { id: 'oecd', tab: 'ឧទាហរណ៍ OECD', title: 'ឧទាហរណ៍គំរូរបស់ OECD', sub: 'ឧទាហរណ៍ទាំងប្រាំពីរពីក្របខណ្ឌគណិតវិទ្យា PISA ២០២២ បកប្រែជាភាសាខ្មែរ' },
  ];
  const TAB_KEY = 'pisa-cba-khmer:tab';
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

  // action: { label, icon, onclick } for the button at the right of the bar
  function siteHeader(action) {
    return h('header', { class: 'km-header' }, h('div', { class: 'km-wrap km-header-in' },
      h('a', { class: 'km-brand', href: SITE, ...ext },
        h('img', { src: 'assets/img/logo.svg', alt: '', width: 38, height: 38 }),
        h('span', { class: 'km-brand-t' }, h('b', {}, 'KhmerMath'), h('small', {}, 'តេស្តលើកុំព្យូទ័រ (CBA)'))),
      h('nav', { class: 'km-nav', 'aria-label': 'KhmerMath' },
        h('a', { href: SITE, ...ext }, 'ទំព័រដើម KhmerMath'),
        h('a', { href: 'https://pisa.khmermath.org/', ...ext }, 'សៀវភៅ PISA ២០២២'),
        h('a', { href: SITE + 'cba.html#lab', ...ext }, 'ប្រើក្នុងបន្ទប់កុំព្យូទ័រ')),
      action ? h('button', { type: 'button', class: 'km-btn km-btn-primary km-btn-sm', onclick: action.onclick, html: ic(action.icon) + '<span>' + action.label + '</span>' }) : null));
  }
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
  function home() {
    const app = document.getElementById('app');
    app.className = 'app-home km';
    app.innerHTML = '';
    document.title = 'តេស្តគណិតវិទ្យាលើកុំព្យូទ័រ (CBA) — KhmerMath';

    const name = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. សុខ ដារ៉ា' });
    const klass = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. ៩ក' });
    const gold = PISA.units.filter((u) => colOf(u) === 'gold');
    const goldQs = gold.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    const all = PISA.units.filter((u) => u.collection !== 'tutorial');
    const allQs = all.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    const quick = () => PISA.start({ name: name.value.trim(), klass: klass.value.trim(), mode: 'test', unitIds: gold.map((u) => u.id) });
    const hasTutorial = !!PISA.unit('tut');

    app.append(siteHeader(hasTutorial ? { label: 'មេរៀនណែនាំ', icon: 'target', onclick: startTutorial } : null));
    const main = h('main', { id: 'main' });

    // --- hero: what this is, and the two quickest ways in
    main.append(h('section', { class: 'km-hero' }, h('div', { class: 'km-wrap km-hero-grid' },
      h('div', { class: 'km-hero-text' },
        h('span', { class: 'km-eyebrow' }, h('span', { class: 'dot' }), 'ជាភាសាខ្មែរ តាមរបៀបអេក្រង់ PISA'),
        h('h1', {}, 'តេស្តគណិតវិទ្យា ', h('span', { class: 'hl' }, 'លើកុំព្យូទ័រ')),
        h('p', { class: 'km-lead' }, 'សិស្សអាចហាត់ធ្វើតេស្តលើអេក្រង់ ដែលរៀបចំតាមរបៀបអេក្រង់ PISA ជាភាសាខ្មែរ មុនពេលជួបតេស្តពិត។ ' +
          'សិស្សដែលធ្លាប់ប្រើអេក្រង់តេស្ត អាចផ្ដោតលើគណិតវិទ្យា ជំនួសឱ្យការរករបៀបចុចប៊ូតុង។'),
        h('div', { class: 'km-actions' },
          gold.length ? h('button', { type: 'button', class: 'km-btn km-btn-primary', onclick: quick, html: ic('monitor') + '<span>ធ្វើតេស្តគំរូភ្លាម</span>' }) : null,
          hasTutorial ? h('button', { type: 'button', class: 'km-btn km-btn-ghost', onclick: startTutorial, html: ic('target') + '<span>មេរៀនណែនាំ</span>' }) : null),
        gold.length ? h('p', { class: 'km-hint' }, 'តេស្តគំរូ៖ ឯកតាគំរូ ' + PISA.km(gold.length) + ' · ' + PISA.km(goldQs) + ' សំណួរ · របៀបតេស្ត — ឬ ',
          h('a', { href: '#start' }, 'ជ្រើសប្រធានបទខ្លួនឯង')) : null,
        h('ul', { class: 'km-meta', html: '<li>' + ic('free') + 'ឥតគិតថ្លៃ</li><li>' + ic('globe') + 'ជាភាសាខ្មែរ</li><li>' + ic('phone') + 'ប្រើលើទូរស័ព្ទ និងកុំព្យូទ័រ</li>' })),
      h('div', { class: 'km-visual' },
        h('div', { class: 'km-browser' },
          h('div', { class: 'km-browser-bar' }, h('i'), h('i'), h('i'), h('span', {}, 'cba.khmermath.org')),
          h('img', { src: 'assets/img/shot-unit.webp', width: 1600, height: 950, loading: 'lazy', alt: 'អេក្រង់តេស្ត៖ សំណួរនៅខាងឆ្វេង ស្ថានភាព និងរូបភាពនៅខាងស្ដាំ' })),
        h('div', { class: 'km-float km-float-b', html: '<span class="fi">' + ic('layers') + '</span><span><b>' + PISA.km(all.length) + ' ប្រធានបទ · ' + PISA.km(allQs) + ' សំណួរ</b><small>តាមរបៀបអេក្រង់ PISA</small></span>' }),
        h('div', { class: 'km-float km-float-a', html: '<span class="fi">' + ic('calc') + '</span><span><b>ម៉ាស៊ីនគិតលេខ</b><small>និងការណែនាំ នៅលើអេក្រង់</small></span>' })))));

    // --- setting up a session: who, how, what
    const setup = h('section', { class: 'km-section km-alt', id: 'start' });
    const wrap = h('div', { class: 'km-wrap' });
    setup.append(wrap);
    wrap.append(h('div', { class: 'km-head' },
      h('span', { class: 'km-eyebrow' }, h('span', { class: 'dot' }), 'ចាប់ផ្ដើម'),
      h('h2', {}, 'រៀបចំតេស្តក្នុងបីជំហាន'),
      h('p', {}, 'បំពេញឈ្មោះ ជ្រើសរបៀប និងប្រធានបទ រួចចុច «ចាប់ផ្ដើម»។')));

    const saved = PISA.saved();
    if (saved && saved.unitIds && saved.unitIds.every((id) => PISA.unit(id))) {
      const who = saved.student && saved.student.name ? saved.student.name : 'មិនមានឈ្មោះ';
      const box = h('div', { class: 'km-resume' });
      if (saved.finishedAt) {
        box.append(h('p', {}, 'វគ្គចុងក្រោយរបស់ ' + who + ' បានបញ្ចប់រួចហើយ។'),
          h('div', { class: 'km-resume-btns' },
            h('button', { type: 'button', class: 'km-btn km-btn-primary km-btn-sm', onclick: () => PISA.resume(saved) }, 'មើលលទ្ធផល'),
            h('button', { type: 'button', class: 'km-btn km-btn-quiet km-btn-sm', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល')));
      } else {
        const u = PISA.unit(saved.unitIds[saved.pos.u]);
        box.append(h('p', {}, 'មានវគ្គមួយមិនទាន់បញ្ចប់ (' + who + ' — ' + u.title + ' អេក្រង់ទី ' + PISA.km(saved.pos.s + 1) + ')។'),
          h('div', { class: 'km-resume-btns' },
            h('button', { type: 'button', class: 'km-btn km-btn-primary km-btn-sm', onclick: () => PISA.resume(saved) }, 'បន្តវគ្គនេះ'),
            h('button', { type: 'button', class: 'km-btn km-btn-quiet km-btn-sm', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល ហើយចាប់ផ្ដើមថ្មី')));
      }
      wrap.append(box);
    }

    const step = (n, title, ...body) => h('div', { class: 'km-step' },
      h('div', { class: 'km-step-h' }, h('span', { class: 'num' }, PISA.km(n)), h('h3', {}, title)), ...body);

    // mode
    let mode = 'test';
    const modeCards = [];
    const modeCard = (v, title, text) => {
      const inp = h('input', { type: 'radio', name: 'mode', value: v });
      inp.checked = v === mode;
      const card = h('label', { class: 'mode' + (v === mode ? ' on' : '') }, inp, h('span', {}, h('b', {}, title), h('br'), h('span', { class: 'sub' }, text)));
      inp.addEventListener('change', () => { mode = v; modeCards.forEach((c) => c.classList.toggle('on', c === card)); });
      modeCards.push(card);
      return card;
    };

    // --- units: one tab per collection; the choice is kept across tabs
    const chosen = new Set(gold.map((u) => u.id));
    if (!chosen.size) all.forEach((u) => chosen.add(u.id));
    const cols = COLLECTIONS.filter((c) => PISA.units.some((u) => colOf(u) === c.id));
    let tab = cols[0].id;
    try { const t = localStorage.getItem(TAB_KEY); if (cols.some((c) => c.id === t)) tab = t; } catch (e) { /* ignore */ }

    const tabBar = h('div', { class: 'ctabs', role: 'tablist', 'aria-label': 'ប្រភេទប្រធានបទ' });
    const panel = h('div', { class: 'ctab-panel', role: 'tabpanel', id: 'ctab-panel' });
    const summary = h('div', { class: 'sb-sum', 'aria-live': 'polite' });
    const err = h('span', { class: 'err', role: 'alert' });

    function unitCard(u, compact) {
      const inp = h('input', { type: 'checkbox' });
      inp.checked = chosen.has(u.id);
      const qs = Object.values(u.questions);
      const card = h('label', { class: 'ucard' + (inp.checked ? ' on' : '') }, inp, h('div', {},
        h('h3', {}, (u.label || PISA.km(u.no)) + ' · ' + u.title),
        compact ? null : u.collection ? (u.grade ? h('div', { class: 'en' }, 'ថ្នាក់ទី ' + PISA.km(u.grade)) : null) : h('div', { class: 'en' }, u.en),
        !compact && u.blurb ? h('p', {}, u.blurb) : null,
        h('div', { class: 'meta' }, PISA.km(qs.length) + ' សំណួរ · ' + PISA.km(pointsOf(u)) + ' ពិន្ទុ')));
      inp.addEventListener('change', () => {
        if (inp.checked) chosen.add(u.id); else chosen.delete(u.id);
        card.classList.toggle('on', inp.checked);
        refresh();
      });
      return card;
    }
    // «ជ្រើសទាំងអស់ / មិនជ្រើស» for a list of units
    function allOrNone(list) {
      const set = (on) => { list.forEach((u) => (on ? chosen.add(u.id) : chosen.delete(u.id))); drawPanel(); refresh(); };
      return h('span', { class: 'links' },
        h('button', { type: 'button', class: 'link', onclick: () => set(true) }, 'ជ្រើសទាំងអស់'),
        h('button', { type: 'button', class: 'link', onclick: () => set(false) }, 'មិនជ្រើស'));
    }
    function drawPanel() {
      const col = cols.find((c) => c.id === tab);
      const list = PISA.units.filter((u) => colOf(u) === col.id);
      panel.innerHTML = '';
      panel.append(h('div', { class: 'col-head' },
        h('div', {}, h('h4', {}, col.title), h('p', { class: 'col-sub' }, col.sub)), allOrNone(list)));
      if (col.id === 'textbook') {
        // one group per lesson, as in the textbook
        const lessons = [];
        list.forEach((u) => { const g = lessons.find((l) => l.n === u.lesson); if (g) g.units.push(u); else lessons.push({ n: u.lesson, title: u.lessonTitle, units: [u] }); });
        lessons.forEach((l) => panel.append(h('div', { class: 'lesson-grp' },
          h('div', { class: 'lesson-head' }, h('h5', {}, 'មេរៀនទី ' + PISA.km(l.n) + ' · ' + l.title), allOrNone(l.units)),
          h('div', { class: 'units compact' }, ...l.units.map((u) => unitCard(u, true))))));
      } else {
        panel.append(h('div', { class: 'units' }, ...list.map((u) => unitCard(u, false))));
      }
    }
    function drawTabs() {
      tabBar.innerHTML = '';
      cols.forEach((c, i) => {
        const list = PISA.units.filter((u) => colOf(u) === c.id);
        const picked = list.filter((u) => chosen.has(u.id)).length;
        const b = h('button', {
          type: 'button', role: 'tab', class: 'ctab' + (c.id === tab ? ' on' : ''), id: 'ctab-' + c.id,
          'aria-selected': c.id === tab ? 'true' : 'false', 'aria-controls': 'ctab-panel', tabindex: c.id === tab ? '0' : '-1',
          onclick: () => select(c.id),
          onkeydown: (e) => {
            const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            select(cols[(i + d + cols.length) % cols.length].id);
            tabBar.querySelector('.ctab.on').focus();
          },
        }, h('span', {}, c.tab), h('span', { class: 'ctab-n' + (picked ? ' picked' : ''), title: 'បានជ្រើស ' + PISA.km(picked) + ' ក្នុងចំណោម ' + PISA.km(list.length) },
          picked ? '✓ ' + PISA.km(picked) + '/' + PISA.km(list.length) : PISA.km(list.length)));
        tabBar.append(b);
      });
      panel.setAttribute('aria-labelledby', 'ctab-' + tab);
    }
    function select(id) {
      tab = id;
      try { localStorage.setItem(TAB_KEY, id); } catch (e) { /* ignore */ }
      drawTabs();
      drawPanel();
    }
    function refresh() {
      const picked = PISA.units.filter((u) => chosen.has(u.id));
      const nq = picked.reduce((n, u) => n + PISA.questionIds(u).length, 0);
      const pts = picked.reduce((n, u) => n + pointsOf(u), 0);
      summary.innerHTML = '';
      summary.append(picked.length
        ? h('span', {}, h('b', {}, 'បានជ្រើស ' + PISA.km(picked.length) + ' ប្រធានបទ'), ' · ' + PISA.km(nq) + ' សំណួរ · ' + PISA.km(pts) + ' ពិន្ទុ')
        : h('span', { class: 'sb-none' }, 'មិនទាន់ជ្រើសប្រធានបទ'));
      if (picked.length) err.textContent = '';
      drawTabs();
    }

    const startBar = h('div', { class: 'start-bar' }, summary, err,
      h('button', { type: 'button', class: 'link', onclick: () => { chosen.clear(); drawPanel(); refresh(); } }, 'សម្អាត'),
      h('button', {
        type: 'button', class: 'km-btn km-btn-primary',
        onclick: () => {
          const ids = PISA.units.map((u) => u.id).filter((id) => chosen.has(id));
          if (!ids.length) { err.textContent = 'សូមជ្រើសរើសប្រធានបទយ៉ាងហោចណាស់មួយ។'; return; }
          PISA.start({ name: name.value.trim(), klass: klass.value.trim(), mode, unitIds: ids });
        },
        html: '<span>ចាប់ផ្ដើម</span>' + ic('arrow'),
      }));
    wrap.append(h('div', { class: 'km-setup' },
      step(1, 'អ្នកធ្វើតេស្ត', h('div', { class: 'field-row' },
        h('label', { class: 'field' }, h('span', {}, 'ឈ្មោះសិស្ស'), name),
        h('label', { class: 'field' }, h('span', {}, 'ថ្នាក់'), klass))),
      step(2, 'របៀប', h('div', { class: 'modes' },
        modeCard('test', 'របៀបតេស្ត', 'ទៅមុខតែមួយផ្លូវ ដូចតេស្ត PISA ពិត។ ចុចព្រួញ «បន្ទាប់» ហើយ មិនអាចត្រឡប់មកកែចម្លើយវិញបានទេ។'),
        modeCard('practice', 'របៀបហាត់រៀន', 'អាចចុចព្រួញ «ថយក្រោយ» ដើម្បីមើល ឬកែចម្លើយវិញ។ សមស្របសម្រាប់ការបង្រៀននៅក្នុងថ្នាក់។'))),
      // the start bar floats only while the topics are on screen
      h('div', { class: 'km-zone' },
        h('div', { class: 'km-step' },
          h('div', { class: 'km-step-h' }, h('span', { class: 'num' }, PISA.km(3)), h('h3', {}, 'ប្រធានបទ')), tabBar, panel),
        startBar)));
    drawPanel();
    refresh();
    main.append(setup);

    // --- for teachers
    const feature = (icon, title, text, link) => h('div', { class: 'km-card' },
      h('span', { class: 'ci', html: ic(icon) }), h('h3', {}, title), h('p', {}, text),
      link ? h('a', { class: 'km-go', href: link[1], ...ext, html: link[0] + ' ' + ic('arrow') }) : null);
    main.append(h('section', { class: 'km-section' }, h('div', { class: 'km-wrap' },
      h('div', { class: 'km-head' },
        h('span', { class: 'km-eyebrow' }, h('span', { class: 'dot' }), 'សម្រាប់គ្រូ'),
        h('h2', {}, 'ពិនិត្យលទ្ធផល និងប្រើក្នុងសាលា')),
      h('div', { class: 'km-cards' },
        feature('check', 'ពិន្ទុ និងចម្លើយគំរូ', 'ពិន្ទុនៅចុងតេស្ត គ្រូពិនិត្យ និងកែពិន្ទុបាន។ ទាញយកលទ្ធផលជាឯកសារ CSV សម្រាប់ Excel។'),
        feature('chart', 'លទ្ធផលតាមដំណើរការ', 'ពិន្ទុតាមដំណើរការគណិតវិទ្យា និងកម្រិតប៉ាន់ស្មាន សម្រាប់ឯកតាគំរូ និងតេស្តអនុវត្ត ក–ឍ។'),
        feature('download', 'ប្រើក្នុងសាលា ដោយគ្មានអ៊ីនធឺណិត', 'តេស្តនេះមិនត្រូវការអ៊ីនធឺណិតទេ បន្ទាប់ពីទាញយករួច។ លទ្ធផលរក្សាទុកតែនៅលើកុំព្យូទ័រនោះប៉ុណ្ណោះ។',
          ['របៀបទាញយក', SITE + 'cba.html#lab'])))));

    app.append(main, siteFooter((box) => {
      const has = (c) => PISA.units.some((u) => (u.collection || 'oecd') === c);
      if (has('gold') || has('practice')) {
        box.append(h('p', { class: 'notice', html:
          '<b>ឯកតាគំរូ និងតេស្តអនុវត្ត៖</b> សំណួរដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ «ក្របខណ្ឌគណិតវិទ្យារបស់ PISA ២០២២» (សាន សុខលី)។ ' +
          'សំណួរទាំងនេះរៀបចំតាមបែប PISA តែមិនមែនជាសំណួរផ្លូវការរបស់ OECD ឬ PISA ទេ ហើយកម្រិតលំបាកជាការប៉ាន់ស្មានរបស់អ្នករៀបរៀង មិនមែនការក្រិតតាមខ្នាតផ្លូវការឡើយ។' }));
      }
      if (has('oecd')) {
        // Attribution, change notice, licence and translation disclaimer as
        // CC BY-NC-SA 3.0 IGO and the OECD's terms ask for. Do not shorten.
        box.append(h('div', { class: 'notice', html:
          '<p><b>ឧទាហរណ៍គំរូរបស់ OECD៖</b> ប្រធានបទទាំងប្រាំពីរនេះ បកប្រែ និងសម្របជាភាសាខ្មែរពី Annex 2.A «Illustrative examples» នៃ ' +
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
    const one = /(unit|test)=([a-z0-9,]+)/.exec(location.hash);
    const pick = one ? one[2].split(',').filter((id) => PISA.unit(id)) : [];
    if (pick.length && one[1] === 'test') {
      PISA.start({ name: '', mode: 'test', unitIds: pick, preview: true });
      PISA.dialog([
        'តេស្តពេញ៖ ភារកិច្ច ' + PISA.km(pick.length) + ' ជាប់គ្នា តាមរបៀបតេស្ត PISA ពិត។',
        'ឆ្លើយសំណួរនីមួយៗ រួចចុច «បន្ទាប់»។ អ្នកមិនអាចថយក្រោយ ដើម្បីកែចម្លើយវិញបានទេ។ ពេលចប់ អ្នកនឹងឃើញលទ្ធផល និងចម្លើយគំរូ។',
      ], [{ label: 'ចាប់ផ្ដើម', primary: true }]);
      return;
    }
    if (pick.length) {
      PISA.start({ name: '', mode: 'practice', unitIds: pick, preview: true });
      return;
    }
    const m = /preview=([a-z0-9]+)(?::(\d+))?/.exec(location.hash);
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
