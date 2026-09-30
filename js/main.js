/* Home page and start-up.
 *
 * Teacher preview: open index.html#preview=u4:2 to jump straight to unit 4,
 * screen 3 (screens count from 0) in practice mode. Preview sessions are not
 * saved, so they never overwrite a student's session on the same computer.
 */
(function () {
  'use strict';
  const { h } = PISA;

  const COLLECTIONS = [
    { id: 'gold', title: 'ឯកតាគំរូ', sub: 'ឯកតាដើមរបស់គម្រោង ដែលអ្នកនិពន្ធបានអនុម័ត សម្រាប់ថ្នាក់ទី ៧ ៨ និង ៩' },
    { id: 'practice', title: 'តេស្តអនុវត្ត ក–ឍ', sub: 'ប្រធានបទដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ — សេចក្ដីព្រាង រង់ចាំការពិនិត្យពីគ្រូ' },
    { id: 'oecd', title: 'ឧទាហរណ៍គំរូរបស់ OECD', sub: 'ឧទាហរណ៍ទាំងប្រាំពីរពីក្របខណ្ឌគណិតវិទ្យា PISA ២០២២ បកប្រែជាភាសាខ្មែរ' },
  ];

  function home() {
    const app = document.getElementById('app');
    app.className = 'app-home';
    app.innerHTML = '';
    document.title = 'គណិតវិទ្យាតាមបែប PISA — ការវាយតម្លៃលើកុំព្យូទ័រ';

    const page = h('div', { class: 'home' });
    page.append(h('header', { class: 'home-hero' },
      h('h1', {}, 'គណិតវិទ្យាតាមបែប PISA'),
      h('p', {}, 'ហាត់ធ្វើតេស្តគណិតវិទ្យាលើកុំព្យូទ័រ (CBA) ជាភាសាខ្មែរ តាមរបៀបអេក្រង់ PISA')));

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
    const name = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. សុខ ដារ៉ា' });
    const klass = h('input', { type: 'text', autocomplete: 'off', placeholder: 'ឧ. ៩ក' });
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

    // --- units, grouped by where they come from
    const chosen = new Set(PISA.units.filter((u) => (u.collection || 'oecd') === 'gold').map((u) => u.id));
    if (!chosen.size) PISA.units.forEach((u) => chosen.add(u.id));
    const unitsCard = h('section', { class: 'card' }, h('h2', {}, '៣. ប្រធានបទ'));
    COLLECTIONS.forEach((col) => {
      const list = PISA.units.filter((u) => (u.collection || 'oecd') === col.id);
      if (!list.length) return;
      const grid = h('div', { class: 'units' });
      list.forEach((u) => {
        const inp = h('input', { type: 'checkbox' });
        inp.checked = chosen.has(u.id);
        const qs = Object.values(u.questions);
        const pts = qs.reduce((s, q) => s + (q.max || 1), 0);
        const card = h('label', { class: 'ucard' + (inp.checked ? ' on' : '') }, inp, h('div', {},
          h('h3', {}, (u.label || PISA.km(u.no)) + ' · ' + u.title),
          u.collection ? (u.grade ? h('div', { class: 'en' }, 'ថ្នាក់ទី ' + PISA.km(u.grade)) : null) : h('div', { class: 'en' }, u.en),
          u.blurb ? h('p', {}, u.blurb) : null,
          h('div', { class: 'meta' }, PISA.km(qs.length) + ' សំណួរ · ' + PISA.km(pts) + ' ពិន្ទុ')));
        inp.addEventListener('change', () => {
          if (inp.checked) chosen.add(u.id); else chosen.delete(u.id);
          card.classList.toggle('on', inp.checked);
        });
        grid.append(card);
      });
      const setAll = (on) => grid.querySelectorAll('input').forEach((i) => { i.checked = on; i.dispatchEvent(new Event('change')); });
      unitsCard.append(h('div', { class: 'col-head' },
        h('div', {}, h('h3', {}, col.title), h('p', { class: 'col-sub' }, col.sub)),
        h('span', { class: 'links' },
          h('button', { type: 'button', class: 'link', onclick: () => setAll(true) }, 'ជ្រើសទាំងអស់'),
          h('button', { type: 'button', class: 'link', onclick: () => setAll(false) }, 'មិនជ្រើស'))), grid);
    });
    page.append(unitsCard);

    const err = h('span', { class: 'err', role: 'alert' });
    page.append(h('div', { class: 'start-row' }, err,
      h('button', {
        type: 'button', class: 'btn btn-primary btn-lg',
        onclick: () => {
          const ids = PISA.units.map((u) => u.id).filter((id) => chosen.has(id));
          if (!ids.length) { err.textContent = 'សូមជ្រើសរើសប្រធានបទយ៉ាងហោចណាស់មួយ។'; return; }
          PISA.start({ name: name.value.trim(), klass: klass.value.trim(), mode, unitIds: ids });
        },
      }, 'ចាប់ផ្ដើម')));

    const has = (c) => PISA.units.some((u) => (u.collection || 'oecd') === c);
    if (has('gold') || has('practice')) {
      page.append(h('p', { class: 'notice', html:
        '<b>ឯកតាគំរូ និងតេស្តអនុវត្ត៖</b> សំណួរដើមរបស់គម្រោង ពីសៀវភៅណែនាំគ្រូ «ក្របខណ្ឌគណិតវិទ្យារបស់ PISA ២០២២» (សាន សុខលី)។ ' +
        'សំណួរទាំងនេះរៀបចំតាមបែប PISA តែមិនមែនជាសំណួរផ្លូវការរបស់ OECD ឬ PISA ទេ ហើយកម្រិតលំបាកជាការប៉ាន់ស្មានរបស់អ្នករៀបរៀង មិនមែនការក្រិតតាមខ្នាតផ្លូវការឡើយ។' }));
    }
    if (has('oecd')) {
      page.append(h('p', { class: 'notice', html:
        '<b>ឧទាហរណ៍គំរូរបស់ OECD៖</b> ឧទាហរណ៍គំរូ (Illustrative examples) នៃក្របខណ្ឌគណិតវិទ្យា PISA ២០២២ របស់ OECD (pisa2022-maths.oecd.org)។ ' +
        'អត្ថបទសំណួរ ទិន្នន័យ និងជម្រើសចម្លើយ ជាសម្ភារៈរបស់ OECD ដែលបកប្រែជាភាសាខ្មែរ សម្រាប់គោលបំណងអប់រំមិនរកប្រាក់ចំណេញ។ ' +
        'អេក្រង់ទាំងអស់គូរឡើងវិញដោយក្រុមការងារ ពុំមែនជារូបថតអេក្រង់ទេ ហើយចម្លើយគំរូ និងការដាក់ពិន្ទុ ជាការចងក្រងរបស់គម្រោង (សៀវភៅណែនាំគ្រូ ជំពូកទី ៨)។ ' +
        'កម្មវិធីនេះមិនមែនជាផលិតផលរបស់ OECD ឬ PISA ទេ។' }));
    }
    app.append(page);
    name.focus();
  }
  PISA.home = home;

  function boot() {
    if (window.matchMedia && window.matchMedia('print').matches) return;
    window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
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
