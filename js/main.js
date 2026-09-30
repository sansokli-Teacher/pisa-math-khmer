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

  function home() {
    const app = document.getElementById('app');
    app.className = 'app-home';
    app.innerHTML = '';
    document.title = 'គណិតវិទ្យាតាមបែប PISA — ការវាយតម្លៃលើកុំព្យូទ័រ';

    const page = h('div', { class: 'home' });
    const name = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. សុខ ដារ៉ា' });
    const klass = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. ៩ក' });
    const gold = PISA.units.filter((u) => colOf(u) === 'gold');
    const goldQs = gold.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    page.append(h('header', { class: 'home-hero' },
      h('h1', {}, 'គណិតវិទ្យាតាមបែប PISA'),
      h('p', {}, 'ហាត់ធ្វើតេស្តគណិតវិទ្យាលើកុំព្យូទ័រ (CBA) ជាភាសាខ្មែរ តាមរបៀបអេក្រង់ PISA'),
      h('div', { class: 'hero-acts' },
        PISA.unit('tut') ? h('button', { type: 'button', class: 'hero-btn', onclick: () => startTutorial() },
          h('b', {}, '① មេរៀនណែនាំ'), h('span', {}, 'រៀនរបៀបឆ្លើយលើអេក្រង់ មុនធ្វើតេស្ត')) : null,
        gold.length ? h('button', {
          type: 'button', class: 'hero-btn hero-go',
          onclick: () => PISA.start({ name: name.value.trim(), klass: klass.value.trim(), mode: 'test', unitIds: gold.map((u) => u.id) }),
        }, h('b', {}, '② ធ្វើតេស្តគំរូភ្លាម ▶'), h('span', {}, 'ឯកតាគំរូ ' + PISA.km(gold.length) + ' · ' + PISA.km(goldQs) + ' សំណួរ · របៀបតេស្ត')) : null)));

    const saved = PISA.saved();
    if (saved && saved.unitIds && saved.unitIds.every((id) => PISA.unit(id))) {
      const who = saved.student && saved.student.name ? saved.student.name : 'មិនមានឈ្មោះ';
      const box = h('section', { class: 'card resume' });
      if (saved.finishedAt) {
        box.append(h('p', {}, 'វគ្គចុងក្រោយរបស់ ' + who + ' បានបញ្ចប់រួចហើយ។'),
          h('div', { class: 'btn-row' },
            h('button', { type: 'button', class: 'btn btn-primary', onclick: () => PISA.resume(saved) }, 'មើលលទ្ធផល'),
            h('button', { type: 'button', class: 'btn btn-quiet', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល')));
      } else {
        const u = PISA.unit(saved.unitIds[saved.pos.u]);
        box.append(h('p', {}, 'មានវគ្គមួយមិនទាន់បញ្ចប់ (' + who + ' — ' + u.title + ' អេក្រង់ទី ' + PISA.km(saved.pos.s + 1) + ')។'),
          h('div', { class: 'btn-row' },
            h('button', { type: 'button', class: 'btn btn-primary', onclick: () => PISA.resume(saved) }, 'បន្តវគ្គនេះ'),
            h('button', { type: 'button', class: 'btn btn-quiet', onclick: () => { PISA.clearSaved(); home(); } }, 'លុបចោល ហើយចាប់ផ្ដើមថ្មី')));
      }
      page.append(box);
    }

    // --- who
    page.append(h('section', { class: 'card' },
      h('h2', {}, '១. អ្នកធ្វើតេស្ត'),
      h('div', { class: 'field-row' },
        h('label', { class: 'field' }, h('span', {}, 'ឈ្មោះសិស្ស'), name),
        h('label', { class: 'field' }, h('span', {}, 'ថ្នាក់'), klass))));

    // --- mode
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
    page.append(h('section', { class: 'card' },
      h('h2', {}, '២. របៀប'),
      h('div', { class: 'modes' },
        modeCard('test', 'របៀបតេស្ត', 'ទៅមុខតែមួយផ្លូវ ដូចតេស្ត PISA ពិត។ ចុចព្រួញ «បន្ទាប់» ហើយ មិនអាចត្រឡប់មកកែចម្លើយវិញបានទេ។'),
        modeCard('practice', 'របៀបហាត់រៀន', 'អាចចុចព្រួញ «ថយក្រោយ» ដើម្បីមើល ឬកែចម្លើយវិញ។ សមស្របសម្រាប់ការបង្រៀននៅក្នុងថ្នាក់។'))));

    // --- units: one tab per collection; the choice is kept across tabs
    const chosen = new Set(gold.map((u) => u.id));
    if (!chosen.size) PISA.units.filter((u) => u.collection !== 'tutorial').forEach((u) => chosen.add(u.id));
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
        h('div', {}, h('h3', {}, col.title), h('p', { class: 'col-sub' }, col.sub)), allOrNone(list)));
      if (col.id === 'textbook') {
        // one group per lesson, as in the textbook
        const lessons = [];
        list.forEach((u) => { const g = lessons.find((l) => l.n === u.lesson); if (g) g.units.push(u); else lessons.push({ n: u.lesson, title: u.lessonTitle, units: [u] }); });
        lessons.forEach((l) => panel.append(h('div', { class: 'lesson-grp' },
          h('div', { class: 'lesson-head' }, h('h4', {}, 'មេរៀនទី ' + PISA.km(l.n) + ' · ' + l.title), allOrNone(l.units)),
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
            const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            select(cols[(i + step + cols.length) % cols.length].id);
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

    page.append(h('section', { class: 'card units-card' }, h('h2', {}, '៣. ប្រធានបទ'), tabBar, panel));
    page.append(h('div', { class: 'start-bar' }, summary, err,
      h('button', { type: 'button', class: 'link', onclick: () => { chosen.clear(); drawPanel(); refresh(); } }, 'សម្អាត'),
      h('button', {
        type: 'button', class: 'btn btn-primary btn-lg',
        onclick: () => {
          const ids = PISA.units.map((u) => u.id).filter((id) => chosen.has(id));
          if (!ids.length) { err.textContent = 'សូមជ្រើសរើសប្រធានបទយ៉ាងហោចណាស់មួយ។'; return; }
          PISA.start({ name: name.value.trim(), klass: klass.value.trim(), mode, unitIds: ids });
        },
      }, 'ចាប់ផ្ដើម')));
    drawPanel();
    refresh();

    // live visitors (js/visits.js, online only), and where to report a mistake or support the site
    page.append(h('div', { class: 'home-help', html:
      '<p class="vc-foot" data-vc-box hidden><span class="vc-eye" aria-hidden="true">◉</span> អ្នកចូលមើល <b data-vc="visitors">—</b> នាក់ · ' +
      'ថ្ងៃនេះ <b data-vc="today">—</b> នាក់ · មកពី <b data-vc="countries">—</b> ប្រទេស <span class="vc-flags" data-vc-flags="8"></span></p>' +
      '<p class="hh-links"><a class="hh-btn" href="https://t.me/pisamathAI" target="_blank" rel="noopener">✎ ឃើញកំហុសក្នុងសំណួរ? ប្រាប់យើងតាម Telegram</a>' +
      '<a class="hh-btn hh-heart" href="https://khmermath.org/about.html#support" target="_blank" rel="noopener">♥ គាំទ្រ KhmerMath</a></p>' }));

    const has = (c) => PISA.units.some((u) => (u.collection || 'oecd') === c);
    if (has('gold') || has('practice')) {
      page.append(h('p', { class: 'notice', html:
        '<b>ឯកតាគំរូ និងតេស្តអនុវត្ត៖</b> សំណួរដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ «ក្របខណ្ឌគណិតវិទ្យារបស់ PISA ២០២២» (សាន សុខលី)។ ' +
        'សំណួរទាំងនេះរៀបចំតាមបែប PISA តែមិនមែនជាសំណួរផ្លូវការរបស់ OECD ឬ PISA ទេ ហើយកម្រិតលំបាកជាការប៉ាន់ស្មានរបស់អ្នករៀបរៀង មិនមែនការក្រិតតាមខ្នាតផ្លូវការឡើយ។' }));
    }
    if (has('oecd')) {
      // Attribution, change notice, licence and translation disclaimer as
      // CC BY-NC-SA 3.0 IGO and the OECD's terms ask for. Do not shorten.
      page.append(h('div', { class: 'notice', html:
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
    app.append(page);
    if (window.kmVisits) window.kmVisits.refresh();
    name.focus({ preventScroll: true });
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
