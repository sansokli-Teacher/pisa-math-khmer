/* Comfort layer — easier on a phone and on a computer.
 *
 * What it adds around the test screens (js/core.js calls it at a few places):
 *   - a bottom bar on phones: Back, Next and «jump» between the text and the question
 *   - settings: text size, soft light (easier on the eyes), shortcuts, time used
 *   - the overview: every question of the session and whether it is answered
 *   - keyboard shortcuts on a computer (→ next, ← back, C calculator, H help, S settings, O overview, Esc)
 *   - pictures open large and can be pinched
 *   - a quiet «saved» note, an offline note, and a warning when the browser cannot save
 *   - the name for the certificate asked on the results page, and sharing: a picture of the result,
 *     a link and a QR code for any topic or choice of topics
 *   - the «install as an app» offer on the home page
 *
 * Nothing here is needed to answer a question: if this file is missing the test works as before.
 */
(function () {
  'use strict';
  const { h } = PISA;
  const km = (n) => PISA.km(n);

  // ------------------------------------------------------------ settings ---
  const PREFS = 'pisa-cba-khmer:prefs';
  const prefs = { size: 0, soft: false };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem(PREFS)) || {}); } catch (e) { /* defaults */ }
  const keepPrefs = () => { try { localStorage.setItem(PREFS, JSON.stringify(prefs)); } catch (e) { /* ignore */ } };
  function applyPrefs() {
    document.documentElement.dataset.size = String(prefs.size);
    document.documentElement.dataset.soft = prefs.soft ? '1' : '0';
  }
  applyPrefs();

  const phone = () => !!(window.matchMedia && window.matchMedia('(max-width: 860px)').matches);
  const touch = () => !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  // -------------------------------------------------------------- toasts ---
  let toastEl = null, toastTimer = 0;
  function toast(text, cls, ms) {
    if (!toastEl) { toastEl = h('div', { class: 'cm-toast', role: 'status', 'aria-live': 'polite' }); document.body.append(toastEl); }
    toastEl.textContent = text;
    toastEl.className = 'cm-toast on' + (cls ? ' ' + cls : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.classList.remove('on'); }, ms || 1700);
  }
  let savedTimer = 0, warned = false;
  function saved(ok) {
    if (ok === false) {
      if (!warned) {
        warned = true;
        toast('⚠ កម្មវិធីរុករកនេះមិនអាចរក្សាទុកបានទេ ដូច្នេះបើបិទទំព័រ ចម្លើយនឹងបាត់។ សូមកុំបិទទំព័រ ហើយទាញយកលទ្ធផលពេលចប់។', 'warn', 7000);
      }
      return;
    }
    clearTimeout(savedTimer);
    savedTimer = setTimeout(() => toast('✓ បានរក្សាទុក', 'small', 1100), 900);
  }
  window.addEventListener('offline', () => toast('គ្មានអ៊ីនធឺណិត — អ្នកអាចធ្វើបន្តបាន ចម្លើយរក្សាទុកក្នុងឧបករណ៍នេះ', '', 3500));
  window.addEventListener('online', () => toast('មានអ៊ីនធឺណិតវិញហើយ', 'small', 1800));

  // ------------------------------------------------------------- dialogs ---
  // a dialog of our own: closes with Esc or a tap outside it
  function sheet(title, build, wide) {
    const back = h('div', { class: 'dlg-back', 'data-esc': '1' });
    const box = h('div', { class: 'dlg cm-dlg' + (wide ? ' dlg-wide' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    const close = () => back.remove();
    box.append(h('h3', {}, title));
    build(box, close);
    box.append(h('div', { class: 'dlg-btns' }, h('button', { type: 'button', class: 'btn btn-primary', onclick: close }, 'បិទ')));
    back.append(box);
    back.addEventListener('click', (e) => { if (e.target === back) close(); });
    document.body.append(back);
    const first = box.querySelector('button, input');
    if (first) first.focus();
    return close;
  }
  const btn = (label, onclick, cls) => h('button', { type: 'button', class: 'btn' + (cls ? ' ' + cls : ''), onclick }, label);

  // fetch every file of the public build once, so the service worker keeps it for use without the internet
  function saveOffline(b) {
    const list = PISA.offline || [];
    let i = 0, done = 0, fail = 0;
    b.disabled = true;
    const next = () => {
      const u = list[i++];
      if (!u) return Promise.resolve();
      return fetch(u).then((r) => { if (!r.ok) fail++; }, () => { fail++; })
        .then(() => { done++; b.textContent = 'កំពុងរក្សាទុក… ' + km(Math.round((done / list.length) * 100)) + '%'; return next(); });
    };
    Promise.all([next(), next(), next(), next()]).then(() => {
      b.textContent = fail ? 'រក្សាទុកបាន ប៉ុន្តែមាន ' + km(fail) + ' ឯកសារមិនបាន — ព្យាយាមម្ដងទៀត' : '✓ រក្សាទុករួចរាល់';
      b.disabled = false;
      toast(fail ? 'មិនទាន់ពេញលេញ — សូមព្យាយាមម្ដងទៀតពេលមានអ៊ីនធឺណិត' : 'ប្រើបានពេលគ្មានអ៊ីនធឺណិតហើយ', fail ? 'warn' : 'small', 3500);
    });
  }

  function settings() {
    sheet('ការកំណត់ និងជំនួយ', (box, close) => {
      const sizes = [['អក្សរធម្មតា', 0], ['ធំ', 1], ['ធំបំផុត', 2]];
      const seg = h('div', { class: 'cm-seg', role: 'group', 'aria-label': 'ទំហំអក្សរ' });
      const draw = () => {
        seg.innerHTML = '';
        sizes.forEach(([label, v]) => seg.append(h('button', {
          type: 'button', 'aria-pressed': prefs.size === v ? 'true' : 'false',
          style: { fontSize: [16, 19, 22][v] + 'px' },
          onclick: () => { prefs.size = v; keepPrefs(); applyPrefs(); draw(); },
        }, label)));
      };
      draw();
      const soft = h('input', { type: 'checkbox' });
      soft.checked = prefs.soft;
      soft.addEventListener('change', () => { prefs.soft = soft.checked; keepPrefs(); applyPrefs(); });
      box.append(h('h4', {}, 'ទំហំអក្សរក្នុងសំណួរ'), seg,
        h('h4', {}, 'ពន្លឺ'), h('label', { class: 'cm-check' }, soft, h('span', {}, 'ពន្លឺទន់ (ក្រដាសក្រែម សម្រាលភ្នែក ពេលអានយូរ)')));
      const S = PISA.session && PISA.session();
      if (S && !S.finishedAt && document.querySelector('.cba-window')) {
        const q = h('div', { class: 'cm-quick' },
          btn('មើលសំណួរទាំងអស់', () => { close(); overview(); }),
          btn('មើលរយៈពេលដែលបានប្រើ', () => { close(); PISA.clock(); }),
          btn('ជំនួយ', () => { close(); PISA.help(); }));
        box.append(h('h4', {}, 'ក្នុងតេស្តនេះ'), q);
      }
      if (PISA.offline && PISA.offline.length && 'serviceWorker' in navigator) {
        const b = btn('រក្សាទុកទាំងអស់ក្នុងឧបករណ៍នេះ (ប្រើពេលគ្មានអ៊ីនធឺណិត)', () => saveOffline(b));
        box.append(h('h4', {}, 'ប្រើពេលគ្មានអ៊ីនធឺណិត'), h('div', { class: 'cm-quick' }, b),
          h('p', { class: 'cm-note' }, 'ប្រធានបទដែលអ្នកបានបើករួច ប្រើបានពេលគ្មានអ៊ីនធឺណិតរួចហើយ។ ចុចប៊ូតុងនេះ ដើម្បីរក្សាទុកប្រធានបទ និងរូបភាពទាំងអស់ (ប្រហែល ' + km(Math.round(9)) + ' MB) ម្ដងជាសម្រាប់ជានិច្ច។'));
      }
      if (!touch()) {
        const rows = [['→', 'ឬ', 'N', 'បន្ទាប់ (ក្នុងប្រអប់វាយអក្សរ ប្រើ Alt + → ឬ Ctrl + Enter)'], ['←', 'ឬ', 'B', 'ថយក្រោយ (របៀបហាត់រៀន · Alt + ←)'], ['C', '', '', 'ម៉ាស៊ីនគិតលេខ'],
          ['O', '', '', 'មើលសំណួរទាំងអស់'], ['S', '', '', 'ការកំណត់នេះ'], ['H', 'ឬ', '?', 'ជំនួយ'], ['Esc', '', '', 'បិទប្រអប់']];
        box.append(h('h4', {}, 'គ្រាប់ចុចរហ័ស (ពេលមិនកំពុងវាយអក្សរ)'),
          h('table', { class: 'cm-keys' }, h('tbody', {}, ...rows.map(([a, or, b, t]) => h('tr', {},
            h('td', {}, h('kbd', {}, a), or ? ' ' + or + ' ' : '', b ? h('kbd', {}, b) : null), h('td', {}, t))))));
      }
      box.append(h('p', { class: 'cm-note' }, 'ចម្លើយរបស់អ្នករក្សាទុកដោយស្វ័យប្រវត្តិក្នុងឧបករណ៍នេះ។ បើបិទទំព័រដោយចៃដន្យ សូមបើកវិញ ហើយចុច «បន្តវគ្គនេះ»។ កម្មវិធីនេះប្រើបានពេលគ្មានអ៊ីនធឺណិត។'));
    });
  }

  // ------------------------------------------------------------ overview ---
  function overview() {
    const S = PISA.session && PISA.session();
    if (!S) return;
    const practice = S.mode === 'practice';
    sheet('សំណួរទាំងអស់', (box, close) => {
      let done = 0, total = 0;
      S.unitIds.forEach((id, u) => {
        const unit = PISA.unit(id);
        if (!unit) return;
        const grid = h('div', { class: 'cm-ov-grid' });
        unit.screens.forEach((scr, s) => {
          const here = S.pos.u === u && S.pos.s === s;
          const past = u < S.pos.u || (u === S.pos.u && s < S.pos.s);
          const d = PISA.screenDone(u, s);
          if (d != null) { total += 1; if (d) done += 1; }
          let cls = 'cm-chip';
          if (here) cls += ' now';
          else if (d === true) cls += ' done';
          else if (d === false && (past || practice)) cls += ' blank';
          else if (!past && !practice) cls += ' later';
          const label = km(s + 1);
          const tip = scr.tag || '';
          if (practice) grid.append(h('button', { type: 'button', class: cls, title: tip, 'aria-label': 'សំណួរទី ' + label + (here ? ' (កំពុងធ្វើ)' : ''),
            onclick: () => { close(); PISA.goTo(u, s); } }, label));
          else grid.append(h('span', { class: cls, title: tip }, label));
        });
        if (S.unitIds.length > 1) {
          // many topics: only the current one is open
          const dn = unit.screens.filter((_, s) => PISA.screenDone(u, s) === true).length;
          const d = h('details', { class: 'cm-ov-d', open: u === S.pos.u },
            h('summary', { class: 'cm-ov-unit' }, (unit.label || km(u + 1)) + ' · ' + unit.title + ' ', h('small', {}, km(dn) + '/' + km(unit.screens.length))), grid);
          box.append(d);
        } else box.append(grid);
      });
      box.append(h('p', { class: 'cm-note' }, 'បានឆ្លើយ ' + km(done) + ' / ' + km(total) + ' អេក្រង់' +
        (practice ? ' · ចុចលេខណាមួយ ដើម្បីទៅអេក្រង់នោះ។' : ' · ក្នុងរបៀបតេស្ត មិនអាចត្រឡប់ទៅអេក្រង់ដែលបានឆ្លងហើយបានទេ។')));
      box.append(h('div', { class: 'cm-legend' },
        h('span', {}, h('i', { style: { background: '#2c76b0', borderColor: '#1f5f94' } }), 'កំពុងធ្វើ'),
        h('span', {}, h('i', { style: { background: '#e9f5e3', borderColor: '#5b9a45' } }), 'បានឆ្លើយ'),
        h('span', {}, h('i', { style: { background: '#fff7e6', borderColor: '#d9a040' } }), 'មិនទាន់ឆ្លើយ'),
        !practice ? h('span', {}, h('i', { style: { background: '#f3f6f9', borderColor: '#aab4bd', borderStyle: 'dashed' } }), 'នៅមិនទាន់ដល់') : null));
    }, true);
  }

  // ---------------------------------------------------- pictures: zoom ---
  function zoomOpen(node, title) {
    const back = h('div', { class: 'cm-zoom-back', 'data-esc': '1', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'រូបធំ' });
    const close = () => back.remove();
    const body = h('div', { class: 'cm-zoom-body' });
    const copy = node.cloneNode(true);
    copy.removeAttribute('width'); copy.removeAttribute('height');
    copy.classList.remove('cm-zoomable');
    body.append(copy);
    back.append(h('div', { class: 'cm-zoom-bar' }, h('span', {}, title || 'ប្រើម្រាមដៃពីរ ដើម្បីពង្រីក ឬរំកិល'), h('button', { type: 'button', onclick: close }, 'បិទ ✕')), body);
    document.body.append(back);
    back.querySelector('button').focus();
  }
  function makeZoomable(win) {
    const picks = win.querySelectorAll('.panel-right img:not(.cm-zoomable), .panel-right svg.chart, .panel-content .bfig img, .panel-content img.fig, .panel-content img.pic, .panel-content svg.cm-big');
    picks.forEach((el) => {
      if (el.closest('button, a, [data-drop], .citymap')) return;
      el.classList.add('cm-zoomable');
      el.addEventListener('click', () => zoomOpen(el));
    });
    // a visible way in for touch screens: one «view large» button above the first picture of the text
    const first = win.querySelector('.panel-right .cm-zoomable');
    if (first && touch()) {
      const b = h('button', { type: 'button', class: 'cm-zoom-badge', onclick: () => zoomOpen(first) }, '🔍 ពង្រីករូប');
      first.parentNode.insertBefore(b, first);
    }
  }

  // --------------------------------------------------- the bottom bar ---
  function dock(win, info) {
    const bar = h('div', { class: 'cm-dock', role: 'toolbar', 'aria-label': 'ប៊ូតុងរុករក' });
    const right = win.querySelector('.panel-right');
    const left = win.querySelector('.panel-left');
    let jump = null;
    if (right && left) {
      jump = h('button', { type: 'button', class: 'cm-jump', 'aria-label': 'ប្ដូររវាងអត្ថបទ និងសំណួរ' }, 'អត្ថបទ ↓');
      jump.addEventListener('click', () => {
        const toText = jump.dataset.to !== 'q';
        (toText ? right : left).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      bar.append(jump);
      // which panel the student is on decides what the button offers
      const seen = new Map();
      const upd = () => {
        const onText = (seen.get(right) || 0) > (seen.get(left) || 0);
        jump.dataset.to = onText ? 'q' : 't';
        jump.textContent = onText ? 'សំណួរ ↑' : 'អត្ថបទ ↓';
      };
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => { es.forEach((e) => seen.set(e.target, e.intersectionRatio)); upd(); }, { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] });
        io.observe(right); io.observe(left);
      }
    }
    if (info.practice) bar.append(h('button', { type: 'button', class: 'cm-prev', onclick: () => PISA.prev() }, '◀ ថយ'));
    const S = PISA.session();
    const last = S.pos.s === info.unit.screens.length - 1 && S.pos.u === S.unitIds.length - 1;
    bar.append(h('button', { type: 'button', class: 'cm-next', onclick: () => PISA.next() }, last ? 'បញ្ចប់ ✓' : 'បន្ទាប់ ▶'));
    win.append(bar);
    win.classList.add('has-dock');
    const setH = () => win.style.setProperty('--dock-h', bar.offsetHeight + 'px');
    setH();
    document.documentElement.style.setProperty('--dock-h', bar.offsetHeight + 'px');
    return bar;
  }

  // ---------------------------------------------- typing on a phone ---
  // the keyboard hides what is being typed: bring the box into the middle when it gets focus
  function keepInView(win) {
    if (!touch()) return;
    win.querySelectorAll('input.resp-input, textarea.resp-text').forEach((el) => {
      el.addEventListener('focus', () => setTimeout(() => { try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* old browser */ } }, 350));
    });
  }

  function afterScreen(win, info) {
    if (!win) return;
    dock(win, info);
    makeZoomable(win);
    keepInView(win);
    // desktop: focus the first answer box so typing can start at once (not on a phone: it would open the keyboard)
    if (!touch() && !phone()) {
      const f = win.querySelector('.panel-left input.resp-input, .panel-left textarea.resp-text, .panel-full input.resp-input, .panel-full textarea.resp-text');
      if (f && !document.querySelector('.dlg-back')) f.focus({ preventScroll: true });
    }
  }

  // ------------------------------------------------ keyboard shortcuts ---
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey) return;
    if ((e.ctrlKey || e.altKey) && !(e.altKey && /^Arrow(Left|Right)$/.test(e.key)) && !(e.ctrlKey && e.key === 'Enter')) return;
    // Esc closes our own overlays
    if (e.key === 'Escape') {
      const o = [...document.querySelectorAll('[data-esc]')].pop();
      if (o) { o.remove(); e.preventDefault(); }
      return;
    }
    const app = document.getElementById('app');
    if (!app || !app.classList.contains('app-test') || !document.querySelector('.cba-window')) return;
    if (document.querySelector('.dlg-back, .cm-zoom-back')) return;
    // these two work even inside an answer box (Alt + arrow, or Ctrl + Enter)
    if ((e.altKey && e.key === 'ArrowRight') || (e.ctrlKey && e.key === 'Enter')) { e.preventDefault(); PISA.next(); return; }
    if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); PISA.prev(); return; }
    const t = e.target;
    const tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A' || (t && t.isContentEditable)) return;
    if (t && t.closest && t.closest('.calc')) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === 'ArrowRight' || k === 'n' || k === 'Enter') { e.preventDefault(); PISA.next(); }
    else if (k === 'ArrowLeft' || k === 'b') { e.preventDefault(); PISA.prev(); }
    else if (k === 'c') { e.preventDefault(); PISA.calc && PISA.calc.toggle(); }
    else if (k === 'o') { e.preventDefault(); overview(); }
    else if (k === 's') { e.preventDefault(); settings(); }
    else if (k === 'h' || k === '?') { e.preventDefault(); PISA.help(); }
  });

  // ----------------------------------------------------------- sharing ---
  function baseUrl() {
    return /^https?:/.test(location.protocol) ? location.origin + location.pathname : 'https://cba.khmermath.org/';
  }
  const linkFor = (ids, mode) => baseUrl() + '#' + (mode === 'test' ? 'test' : 'unit') + '=' + ids.join(',');
  function qrSvg(text) {
    if (typeof qrcode !== 'function') return null;
    try {
      const q = qrcode(0, 'M');
      q.addData(text);
      q.make();
      return q.createSvgTag({ cellSize: 4, margin: 2, scalable: true, alt: 'QR code' });
    } catch (e) { return null; }       // too long for a QR code
  }
  function copyText(text, input) {
    const done = () => toast('បានចម្លងតំណ', 'small', 1400);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => { input.select(); document.execCommand('copy'); done(); });
    else { input.select(); try { document.execCommand('copy'); done(); } catch (e) { /* the box is selected: the student can copy */ } }
  }
  // a link and a QR code for these topics (practice, or a whole test)
  function share(ids, opts) {
    opts = opts || {};
    ids = ids.filter((id) => PISA.known(id));
    if (!ids.length) return;
    sheet(opts.title || 'ចែករំលែកប្រធានបទនេះ', (box) => {
      let mode = opts.mode === 'test' ? 'test' : 'practice';
      const url = h('input', { type: 'text', readonly: true, 'aria-label': 'តំណ' });
      const qr = h('div', { class: 'cm-qr' });
      const seg = h('div', { class: 'cm-seg', role: 'group' });
      const draw = () => {
        const link = linkFor(ids, mode);
        url.value = link;
        const svg = qrSvg(link);
        qr.innerHTML = svg || '';
        qr.style.display = svg ? '' : 'none';
        seg.innerHTML = '';
        [['ហាត់រៀន', 'practice'], ['តេស្ត', 'test']].forEach(([label, m]) => seg.append(h('button', { type: 'button', 'aria-pressed': mode === m ? 'true' : 'false', onclick: () => { mode = m; draw(); } }, label)));
      };
      box.append(h('p', {}, ids.length === 1 ? PISA.info(ids[0]).title : km(ids.length) + ' ប្រធានបទ'),
        h('p', { class: 'cm-note' }, 'សិស្សបើកតំណ ឬស្កេន QR នឹងចូលទៅប្រធានបទនេះភ្លាម មិនបាច់ជ្រើសរើស។'),
        seg, h('div', { class: 'cm-url' }, url, btn('ចម្លង', () => copyText(url.value, url))), qr);
      const acts = h('div', { class: 'cm-quick' });
      if (navigator.share) acts.append(btn('ចែករំលែក…', () => navigator.share({ title: 'ហាត់គណិតវិទ្យាតាមបែប PISA', text: 'ហាត់ជាមួយខ្ញុំ៖', url: url.value }).catch(() => {})));
      acts.append(btn('ទាញយក QR (រូបភាព)', () => downloadQr(url.value)));
      box.append(acts);
      if (ids.length > 40) box.append(h('p', { class: 'cm-note' }, 'ជ្រើសច្រើនពេក QR អាចអានពិបាក។ ព្យាយាមចែករំលែកតិចជាង ៤០ ប្រធានបទ។'));
      PISA.ensureQr().then(draw, draw);        // the QR coder is fetched the first time it is needed (public build)
    });
  }
  function svgToPng(svgText, size, cb) {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const g = c.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, size, size);
      g.imageSmoothingEnabled = false;
      g.drawImage(img, 0, 0, size, size);
      c.toBlob(cb, 'image/png');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
  }
  function saveBlob(blob, name) {
    const a = h('a', { href: URL.createObjectURL(blob), download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function downloadQr(link) {
    const svg = qrSvg(link);
    if (!svg) return;
    svgToPng(svg.replace('scalable', '').replace(/viewBox="0 0 (\d+) (\d+)"/, (m, w, hh) => 'width="' + w + '" height="' + hh + '" viewBox="0 0 ' + w + ' ' + hh + '"'), 720, (b) => b && saveBlob(b, 'qr-pisa-cba.png'));
  }

  // ---------------------------------------- results: name and sharing ---
  function resultCard(info, cb) {
    const S = info.state;
    const W = 1080, H = 1350;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    const family = '"Noto Sans Khmer Local", "Noto Sans Khmer", "Khmer OS Siemreap", system-ui, sans-serif';
    const draw = () => {
      const grad = g.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#12527f'); grad.addColorStop(1, '#0d2b45');
      g.fillStyle = grad; g.fillRect(0, 0, W, H);
      g.fillStyle = '#fff'; g.beginPath();
      if (g.roundRect) g.roundRect(60, 80, W - 120, H - 190, 36); else g.rect(60, 80, W - 120, H - 190);
      g.fill();
      g.textAlign = 'center';
      const T = (txt, x, y, size, color, weight, max) => { g.font = (weight || 600) + ' ' + size + 'px ' + family; g.fillStyle = color; g.fillText(txt, x, y, max || W - 200); };
      T('គណិតវិទ្យាតាមបែប PISA', W / 2, 190, 56, '#12527f', 700);
      T('ការហាត់លើកុំព្យូទ័រ · KhmerMath', W / 2, 252, 34, '#5d6b76', 500);
      T(S.student.name || 'សិស្សានុសិស្ស', W / 2, 400, 76, '#1d232a', 700, W - 220);
      if (S.student.klass) T('ថ្នាក់ ' + S.student.klass, W / 2, 468, 42, '#5d6b76', 500);
      const pct = info.max ? Math.round((info.total / info.max) * 100) : 0;
      T(km(pct) + '%', W / 2, 700, 230, pct >= 60 ? '#2f7d32' : '#c9862b', 800);
      T('ពិន្ទុ ' + km(info.total) + ' / ' + km(info.max), W / 2, 790, 60, '#1d232a', 700);
      const names = info.units.slice(0, 3).map((u) => u.title);
      let y = 900;
      names.forEach((n) => { T('• ' + n, W / 2, y, 36, '#3b4753', 500, W - 240); y += 56; });
      if (info.units.length > 3) T('និង ' + km(info.units.length - 3) + ' ប្រធានបទផ្សេងទៀត', W / 2, y, 32, '#5d6b76', 500);
      const d = new Date();
      T(km(d.getDate()) + '/' + km(d.getMonth() + 1) + '/' + km(d.getFullYear()) + ' · ' + (S.mode === 'test' ? 'របៀបតេស្ត' : 'របៀបហាត់រៀន'), W / 2, H - 200, 34, '#5d6b76', 500);
      T('ការហាត់សាកល្បង — មិនមែនលទ្ធផល PISA ផ្លូវការ', W / 2, H - 142, 28, '#8a959d', 500);
      T('cba.khmermath.org', W / 2, H - 42, 42, '#ffffff', 700);
      c.toBlob(cb, 'image/png');
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('700 40px "Noto Sans Khmer Local"'), document.fonts.load('500 40px "Noto Sans Khmer Local"')]).then(draw, draw);
    } else draw();
  }

  // ----------------------------------------- the certificate as a picture ---
  // The same design as the one on the page, drawn on a canvas (2400 x 1696, the frame's own size) so it can be saved or shared
  // (Telegram, Messenger ...). 1 u = 1 % of the width = 24 px, as in the page.
  function loadImage(src) {
    return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
  }
  function certificateImage(info, cb) {
    const S = info.state;
    const W = 2400, H = 1696, u = W / 100;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    const KH = '"Khmer OS Battambang", "Noto Sans Khmer Local", "Khmer Sangam MN", serif';
    const M1 = '"Khmer M1", "Khmer OS Muol Light", "Noto Sans Khmer Local", serif';
    const EN = '"Times New Roman", Tinos, "Liberation Serif", Times, serif';
    const when = new Date(S.finishedAt || Date.now());
    const pct = info.max ? Math.round((info.total / info.max) * 100) : 0;
    const name = (S.student.name || '').trim() || 'សិស្សានុសិស្ស';
    const nameSize = name.length > 34 ? 3.1 : name.length > 24 ? 3.9 : 5;
    const who = [S.student.klass ? 'ថ្នាក់ ' + S.student.klass : '', S.student.school, S.student.teacher ? 'គ្រូបង្រៀន៖ ' + S.student.teacher : ''].filter(Boolean).join(' · ');
    const titles = 'ប្រធានបទ៖ ' + info.units.slice(0, 4).map((x) => x.title).join(' ✦ ') + (info.units.length > 4 ? ' ✦ …' : '');
    const font = (fs, fam, weight, style) => (style || 'normal') + ' ' + (weight || 400) + ' ' + fs * u + 'px ' + fam;
    const fit = (text, maxW) => {           // one line, cut with … if it is too wide
      if (g.measureText(text).width <= maxW) return text;
      let t = text;
      while (t.length > 1 && g.measureText(t + '…').width > maxW) t = t.slice(0, -1);
      return t + '…';
    };
    // runs: [[text, bold?]] wrapped at spaces into lines, centred
    const wrapRuns = (runs, fs, fam, color, boldColor, x, top, lh, maxW) => {
      const words = [];
      runs.forEach(([t, b]) => t.split(/(\s+)/).filter((w) => w !== '').forEach((w) => words.push([w, b])));
      const lines = [[]];
      let wid = 0;
      const measure = (w, b) => { g.font = font(fs, fam, b ? 700 : 400); return g.measureText(w).width; };
      words.forEach(([w, b]) => {
        const ww = measure(w, b);
        if (wid + ww > maxW && lines[lines.length - 1].length && !/^\s+$/.test(w)) { lines.push([]); wid = 0; }
        if (!(lines[lines.length - 1].length === 0 && /^\s+$/.test(w))) { lines[lines.length - 1].push([w, b, ww]); wid += ww; }
      });
      lines.forEach((ln, i) => {
        const total = ln.reduce((a, r) => a + r[2], 0);
        let cx = x - total / 2;
        ln.forEach(([w, b, ww]) => { g.font = font(fs, fam, b ? 700 : 400); g.fillStyle = b ? boldColor : color; g.textAlign = 'left'; g.fillText(w, cx, top + lh * i + lh / 2); cx += ww; });
      });
    };
    const one = (text, x, top, fs, lh, fam, color, weight, style, maxW) => {
      g.font = font(fs, fam, weight, style); g.fillStyle = color; g.textAlign = 'center';
      g.fillText(maxW ? fit(text, maxW) : text, x, top + lh / 2);
    };
    const draw = (frame, logo) => {
      g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
      if (frame) g.drawImage(frame, 0, 0, W, H);
      g.textBaseline = 'middle';
      g.save();
      g.translate(50 * u, 8.4 * u); g.scale(0.9, 0.9); g.translate(-50 * u, -8.4 * u);
      const X = 50 * u;
      const day = km(when.getDate()), yr = km(when.getFullYear());
      // the title, then the lines that introduce the name
      one('វិញ្ញាបនបត្រការហាត់គណិតវិទ្យា', X, 9.4 * u, 3.25, 4.88 * u, M1, '#a4201a');
      one('Certificate of Mathematics Practice', X, 14.6 * u, 2.9, 3.48 * u, EN, '#3b2a1a');
      one('វិញ្ញាបនបត្រនេះប្រគល់ជូនដល់', X, 19.2 * u, 2.4, 3.84 * u, KH, '#3b2a1a');
      one('This certificate is presented to', X, 23 * u, 2.3, 2.9 * u, EN, '#3b2a1a', 400, 'italic');
      one(name, X, 26.6 * u, nameSize, nameSize * 1.7 * u, M1, '#8a5412', 400, 'normal', 80 * u);
      const gr = g.createLinearGradient(28 * u, 0, 72 * u, 0);
      gr.addColorStop(0, 'rgba(183,137,58,0)'); gr.addColorStop(0.14, '#b7893a'); gr.addColorStop(0.86, '#b7893a'); gr.addColorStop(1, 'rgba(183,137,58,0)');
      g.fillStyle = gr; g.fillRect(28 * u, 35.4 * u, 44 * u, 0.18 * u);
      g.save(); g.translate(X, 35.49 * u); g.rotate(Math.PI / 4); g.fillStyle = '#fff'; g.fillRect(-0.9 * u, -0.9 * u, 1.8 * u, 1.8 * u); g.fillStyle = '#b7893a'; g.fillRect(-0.55 * u, -0.55 * u, 1.1 * u, 1.1 * u); g.restore();
      one(who, X, 36.4 * u, 1.95, 3.02 * u, KH, '#5a4632', 400, 'normal', 40 * u);
      wrapRuns([['ដោយបានបំពេញការហាត់គណិតវិទ្យាតាមបែប PISA លើកុំព្យូទ័រ នៅថ្ងៃទី ' + day + ' ខែ ' + MONTHS[when.getMonth()] + ' ឆ្នាំ ' + yr + ' ទទួលបានពិន្ទុ ', false],
        [km(info.total) + ' / ' + km(info.max), true], [' (', false], [km(pct) + '%', true], [')។', false]],
        2.05, KH, '#2a1f14', '#a4201a', X, 40.4 * u, 3.59 * u, 74 * u);
      one(titles, X, 47.8 * u, 1.8, 2.97 * u, KH, '#5a4632', 400, 'normal', 74 * u);
      wrapRuns([['for the computer-based mathematics practice — score ', false], [info.total + ' / ' + info.max + ' (' + pct + '%)', true]],
        1.9, EN, '#4a3a2a', '#4a3a2a', X, 51 * u, 2.47 * u, 76 * u);
      // the seal
      const sx = X, sy = 59.6 * u, sr = 5 * u;
      const gd = g.createRadialGradient(sx - sr * 0.3, sy - sr * 0.35, sr * 0.1, sx, sy, sr * 1.1);
      gd.addColorStop(0, '#f6dc8b'); gd.addColorStop(0.6, '#d9a441'); gd.addColorStop(1, '#a8721f');
      g.fillStyle = gd;
      for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; g.beginPath(); g.arc(sx + Math.cos(a) * sr * 0.808, sy + Math.sin(a) * sr * 0.808, sr * 0.135, 0, 7); g.fill(); }
      g.beginPath(); g.arc(sx, sy, sr * 0.808, 0, 7); g.fill();
      g.beginPath(); g.arc(sx, sy, sr * 0.654, 0, 7); g.fillStyle = '#fff8e1'; g.fill(); g.lineWidth = 0.03 * sr; g.strokeStyle = '#a8721f'; g.stroke();
      g.beginPath(); g.arc(sx, sy, sr * 0.577, 0, 7); g.lineWidth = 0.015 * sr; g.strokeStyle = '#d9a441'; g.stroke();
      g.textAlign = 'center';
      g.font = font(0.0 + sr / u * 0.19, EN, 700); g.fillStyle = '#a8721f'; g.fillText('★ ★ ★', sx, sy - sr * 0.3);
      g.font = font(sr / u * 0.46, KH, 700); g.fillStyle = '#b3261e'; g.fillText(km(pct) + '%', sx, sy + sr * 0.16);
      g.font = font(sr / u * 0.165, EN, 700); g.fillStyle = '#7a5316'; g.fillText('PISA CBA', sx, sy + sr * 0.5);
      // the signature (left) and the date (right)
      g.fillStyle = '#8b7a62';
      g.fillRect(15 * u, 59.4 * u, 26 * u, 0.15 * u); g.fillRect(59 * u, 59.4 * u, 26 * u, 0.15 * u);
      one('លោកគ្រូ សាន សុខលី', 28 * u, 60 * u, 2.1, 3.05 * u, KH, '#2a1f14', 700);
      one('KhmerMath · cba.khmermath.org', 28 * u, 63.1 * u, 1.65, 2.15 * u, EN, '#4a3a2a');
      one('ថ្ងៃទី ' + day + ' ខែ ' + MONTHS[when.getMonth()] + ' ឆ្នាំ ' + yr, 72 * u, 60 * u, 2.1, 3.05 * u, KH, '#2a1f14', 700, 'normal', 26 * u);
      one(MONTHS_EN[when.getMonth()] + ' ' + when.getDate() + ', ' + when.getFullYear(), 72 * u, 63.1 * u, 1.65, 2.15 * u, EN, '#4a3a2a');
      // the notice: Khmer, then English
      g.font = font(1.35, KH); const kh = 'ការហាត់សាកល្បង មិនមែនជាលទ្ធផល PISA ផ្លូវការទេ · '; const khw = g.measureText(kh).width;
      g.font = font(1.35, EN); const en = 'Practice record — not an official PISA result'; const enw = g.measureText(en).width;
      const nx = X - (khw + enw) / 2;
      g.fillStyle = '#7a6a58'; g.textAlign = 'left';
      g.font = font(1.35, KH); g.fillText(kh, nx, 65.9 * u + 1.0 * u);
      g.font = font(1.35, EN); g.fillText(en, nx + khw, 65.9 * u + 1.0 * u);
      // top left: the KhmerMath logo; top right: the PISA CBA badge
      g.textAlign = 'center';
      if (logo) g.drawImage(logo, 16.5 * u - 4.5 * u, 8.8 * u, 9 * u, 9 * u);
      one('KhmerMath', 16.5 * u, 18.2 * u, 2.1, 3.05 * u, M1, '#1a7f6b');
      one('គណិតវិទ្យាខ្មែរ', 16.5 * u, 21.2 * u, 1.75, 2.6 * u, KH, '#a4201a');
      const bx = 83.5 * u, br = 4.5 * u, by = 8.8 * u + br;
      g.beginPath(); g.arc(bx, by, br, 0, 7); g.fillStyle = '#fff'; g.fill();
      g.lineWidth = 0.45 * u; g.strokeStyle = '#1a7f6b'; g.beginPath(); g.arc(bx, by, br - 0.22 * u, 0, 7); g.stroke();
      g.lineWidth = 0.22 * u; g.strokeStyle = '#d9a441'; g.beginPath(); g.arc(bx, by, br - 0.65 * u, 0, 7); g.stroke();
      g.textAlign = 'center';
      g.font = font(2.6, EN, 700); g.fillStyle = '#1a7f6b'; g.fillText('PISA', bx, by - 0.9 * u);
      g.font = font(1.9, EN, 700, 'italic'); g.fillStyle = '#a4201a'; g.fillText('CBA', bx, by + 1.6 * u);
      one('ហាត់ប្រឡងលើកុំព្យូទ័រ', 83.5 * u, 18.4 * u, 1.75, 2.6 * u, KH, '#a4201a');
      one('Computer-based practice', 83.5 * u, 21.2 * u, 1.6, 2.1 * u, EN, '#4a3a2a');
      g.restore();
      c.toBlob(cb, 'image/png');
    };
    const fonts = document.fonts && document.fonts.load
      ? Promise.all(['400 40px "Khmer M1"', '400 40px "Khmer OS Battambang"', '700 40px "Khmer OS Battambang"', '400 40px Tinos', '700 40px Tinos', 'italic 400 40px Tinos'].map((f) => document.fonts.load(f, 'ក A')).concat([document.fonts.ready]))
      : Promise.resolve();
    Promise.all([fonts.catch(() => {}), loadImage('assets/img/frame-certificate.png').catch(() => null), loadImage('assets/img/logo.svg').catch(() => null)])
      .then(([, frame, logo]) => draw(frame, logo));
  }
  // save or share it: the phone's share sheet (Telegram, Messenger ...) when it can send a file, otherwise a download
  function certificateShare(info, mode) {
    toast('កំពុងបង្កើតរូបវិញ្ញាបនបត្រ…', '', 4000);
    certificateImage(info, (blob) => {
      if (!blob) { toast('មិនអាចបង្កើតរូបបានទេ', 'warn', 3000); return; }
      const stem = 'certificate-' + (info.state.student.name ? info.state.student.name.replace(/[^\p{L}\p{N}]+/gu, '-') : 'pisa-cba');
      const file = new File([blob], stem + '.png', { type: 'image/png' });
      if (mode !== 'save' && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: 'វិញ្ញាបនបត្រការហាត់គណិតវិទ្យា' }).catch((e) => { if (e && e.name !== 'AbortError') saveBlob(blob, stem + '.png'); });
      } else {
        saveBlob(blob, stem + '.png');
        toast('បានទាញយករូបវិញ្ញាបនបត្រ — បញ្ជូនទៅ Telegram ពីថតទាញយក', 'small', 4000);
      }
    });
  }


  // ----------------------------------------------------- the results top ---
  // A score ring, a few words for the score, the numbers that matter and the next step (the old plain header is the fallback).
  function resultsHero(info) {
    const S = info.state;
    const pct = info.max ? Math.round((info.total / info.max) * 100) : 0;
    const nq = info.units.reduce((n, u) => n + PISA.questionIds(u).length, 0);
    const tier = pct >= 85 ? ['អស្ចារ្យណាស់!', 'ល្អប្រសើរមែនទែន សូមបន្តរក្សាកម្រិតនេះ។', '#2f9e6f']
      : pct >= 70 ? ['ល្អណាស់!', 'អ្នកធ្វើបានល្អ សូមពិនិត្យកំហុសបន្តិច ដើម្បីឱ្យល្អឥតខ្ចោះ។', '#2e7a70']
        : pct >= 50 ? ['ល្អហើយ!', 'អ្នកកំពុងឆ្ពោះទៅមុខ។ មើលចម្លើយខាងក្រោម ហើយហាត់ម្ដងទៀត។', '#c9862b']
          : ['កុំបោះបង់!', 'ការហាត់បន្តិចម្ដងៗនាំឱ្យពូកែ។ មើលចម្លើយគំរូ ហើយព្យាយាមម្ដងទៀត។', '#b4546a'];
    const R = 52, C = 2 * Math.PI * R;
    const ring = '<svg viewBox="0 0 132 132" aria-hidden="true" focusable="false"><circle cx="66" cy="66" r="' + R + '" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="12"/>' +
      '<circle class="rh-arc" cx="66" cy="66" r="' + R + '" fill="none" stroke="' + tier[2] + '" stroke-width="12" stroke-linecap="round" transform="rotate(-90 66 66)" ' +
      'stroke-dasharray="' + (C * pct / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg>';
    const tile = (num, lbl, cls) => h('div', { class: 'rh-tile' + (cls ? ' ' + cls : '') }, h('b', {}, num), h('span', {}, lbl));
    const who = [S.student.name, S.student.klass, S.student.school].filter(Boolean).join(' · ');
    const go = (id) => () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    const box = h('section', { class: 'rh' }, h('div', { class: 'rh-in' },
      h('div', { class: 'rh-ring' }, h('span', { html: ring }), h('div', { class: 'rh-pct' }, h('b', {}, km(pct) + '%'), h('i', {}, km(info.total) + ' / ' + km(info.max)))),
      h('div', { class: 'rh-t' },
        h('span', { class: 'rh-kicker' }, (S.mode === 'test' ? 'របៀបតេស្ត' : 'របៀបហាត់រៀន') + (who ? ' · ' + who : '')),
        h('h1', {}, tier[0]),
        h('p', {}, tier[1]),
        h('div', { class: 'rh-tiles' },
          tile(km(info.total) + ' / ' + km(info.max), 'ពិន្ទុ'), tile(km(nq), 'សំណួរ'), tile(info.duration, 'រយៈពេល'),
          info.pending ? tile(km(info.pending), 'រង់ចាំគ្រូដាក់ពិន្ទុ', 'warn') : null),
        h('div', { class: 'rh-cta' },
          h('button', { type: 'button', class: 'rh-main', onclick: go('res-review') }, 'មើលចម្លើយ និងកំហុស ↓'),
          h('button', { type: 'button', class: 'rh-alt', onclick: info.again }, 'ហាត់ម្ដងទៀត'),
          PISA.noCert() ? null : h('button', { type: 'button', class: 'rh-link', onclick: go('res-cert') }, 'វិញ្ញាបនបត្រ'),
          h('button', { type: 'button', class: 'rh-link', onclick: info.home }, 'ទំព័រដើម')))));
    // a little life: the ring draws itself, the number counts up, and a top score gets confetti (not for «reduce motion»)
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!calm) {
      const arc = box.querySelector('.rh-arc');
      if (arc) arc.style.setProperty('--len', (C * pct / 100).toFixed(1));
      const num = box.querySelector('.rh-pct b');
      const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1000); num.textContent = km(Math.round(pct * (1 - Math.pow(1 - k, 3)))) + '%'; if (k < 1) requestAnimationFrame(step); };
      num.textContent = km(0) + '%';
      requestAnimationFrame(step);
      if (pct >= 85) {
        const conf = h('div', { class: 'rh-confetti', 'aria-hidden': 'true' });
        const colors = ['#f2b441', '#8fe3d0', '#ffffff', '#e8765f', '#7fb4ee'];
        for (let i = 0; i < 28; i++) {
          const p = h('i', {});
          p.style.cssText = 'left:' + (Math.random() * 100).toFixed(1) + '%;background:' + colors[i % colors.length] + ';animation-delay:' + (Math.random() * 0.9).toFixed(2) + 's;animation-duration:' + (2.2 + Math.random() * 1.6).toFixed(2) + 's;transform:rotate(' + Math.round(Math.random() * 360) + 'deg)';
          conf.append(p);
        }
        box.append(conf);
        setTimeout(() => conf.remove(), 5000);
      }
    }
    return box;
  }

  function results(page, info) {
    const S = info.state;
    // the name, asked here: a student who left it empty gets it on the certificate
    if (!S.student.name && !PISA.noCert()) {
      const input = h('input', { type: 'text', autocomplete: 'name', placeholder: 'ឧ. សុខ ដារ៉ា', 'aria-label': 'ឈ្មោះសិស្ស' });
      const go = () => {
        const v = input.value.trim();
        if (!v) return;
        S.student.name = v;
        try { localStorage.setItem('pisa-cba-khmer:who', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('pisa-cba-khmer:who')) || {}, { name: v }))); } catch (e) { /* ignore */ }
        info.save();
        info.redraw();
      };
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      page.append(h('div', { class: 'cm-name' }, h('label', {}, 'សរសេរឈ្មោះរបស់អ្នក សម្រាប់វិញ្ញាបនបត្រ (មិនសរសេរក៏បាន)'),
        h('div', { class: 'cm-url' }, input, btn('រក្សាទុកឈ្មោះ', go, 'btn-primary'))));
    }
    const bar = h('div', { class: 'cm-sharebar' }, h('div', { class: 'cm-quick' },
      btn('ចែករំលែកតំណ + QR ដើម្បីឱ្យមិត្តហាត់ដូចគ្នា', () => share(S.unitIds, { mode: S.mode, title: 'ចែករំលែកប្រធានបទទាំងនេះ' }))));
    page.append(bar);
  }

  // ------------------------------------------------------------ install ---
  let installEvt = null;
  const standalone = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  const boxes = new Set();
  function fillInstall(box) {
    box.innerHTML = '';
    if (standalone() || !/^https?:/.test(location.protocol)) { box.hidden = true; return; }
    if (installEvt) {
      box.hidden = false;
      box.append(h('div', {}, h('b', {}, 'ដំឡើងជាកម្មវិធី។ '), 'បន្ថែមទៅអេក្រង់ដើមរបស់ទូរស័ព្ទ ឬកុំព្យូទ័រ ដើម្បីបើកលឿន និងប្រើបានពេលគ្មានអ៊ីនធឺណិត។'),
        h('button', { type: 'button', class: 'hm-btn hm-btn-main', onclick: () => {
          installEvt.prompt();
          installEvt.userChoice.then(() => { installEvt = null; boxes.forEach(fillInstall); });
        } }, 'ដំឡើងកម្មវិធី'));
    } else if (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      box.hidden = false;
      box.append(h('div', {}, h('b', {}, 'ដំឡើងជាកម្មវិធី។ '), 'ចុចប៊ូតុង «ចែករំលែក» ', h('span', { 'aria-hidden': 'true' }, '⎋'), ' ក្នុង Safari ហើយជ្រើស «បន្ថែមទៅអេក្រង់ដើម» (Add to Home Screen)។'));
    } else box.hidden = true;
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; boxes.forEach(fillInstall); });
  window.addEventListener('appinstalled', () => { installEvt = null; boxes.forEach(fillInstall); });
  function installBox() {
    const box = h('div', { class: 'hm-install', hidden: true });
    boxes.add(box);
    fillInstall(box);
    return box;
  }


  // ------------------------------------------------------- certificate ---
  // Khmer M1 for the title and the name, Khmer OS Battambang for the Khmer text, Times New Roman for the English
  // (fonts in css/comfort.css), inside the project's gold ornamental frame (assets/img/frame-certificate.png).
  // The page is laid out in «em» where 1 em = 1 % of the certificate's width, so it scales as a whole; print is A4 landscape.
  const MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
  const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // the gold seal at the foot of the certificate: a scalloped rosette with the percentage
  function sealSvg(label) {
    let dots = '';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      dots += '<circle cx="' + (Math.cos(a) * 42).toFixed(2) + '" cy="' + (Math.sin(a) * 42).toFixed(2) + '" r="7"/>';
    }
    return '<svg viewBox="-52 -52 104 104" aria-hidden="true" focusable="false"><defs><radialGradient id="c2s" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#f6dc8b"/><stop offset="0.6" stop-color="#d9a441"/><stop offset="1" stop-color="#a8721f"/></radialGradient></defs>' +
      '<g fill="url(#c2s)">' + dots + '<circle r="42"/></g><circle r="34" fill="#fff8e1" stroke="#a8721f" stroke-width="1.6"/><circle r="30" fill="none" stroke="#d9a441" stroke-width="0.8"/>' +
      '<text y="-8" text-anchor="middle" font-size="10" font-weight="700" fill="#a8721f" font-family="Times New Roman, Tinos, serif">★ ★ ★</text>' +
      '<text y="14" text-anchor="middle" font-size="24" font-weight="700" fill="#b3261e" font-family="Khmer OS Battambang, Noto Sans Khmer Local, serif">' + label + '</text>' +
      '<text y="27" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="1" fill="#7a5316" font-family="Times New Roman, Tinos, serif">PISA CBA</text></svg>';
  }

  function certificate(info) {
    const S = info.state;
    const when = new Date(S.finishedAt || Date.now());
    const day = km(when.getDate()), mon = MONTHS[when.getMonth()], yr = km(when.getFullYear());
    const pct = info.max ? Math.round((info.total / info.max) * 100) : 0;
    const name = (S.student.name || '').trim();
    const titles = info.units.slice(0, 4).map((u) => u.title).join(' ✦ ') + (info.units.length > 4 ? ' ✦ …' : '');
    const nameSize = name.length > 34 ? 3.1 : name.length > 24 ? 3.9 : 5;
    const who = [S.student.klass ? 'ថ្នាក់ ' + S.student.klass : '', S.student.school, S.student.teacher ? 'គ្រូបង្រៀន៖ ' + S.student.teacher : ''].filter(Boolean).join(' · ');
    const wrap = h('div', { class: 'pisa-cert-wrap' });
    const root = h('div', { class: 'cert2', id: 'pisa-certificate', role: 'img', 'aria-label': 'វិញ្ញាបនបត្រការហាត់គណិតវិទ្យា' });
    root.innerHTML = '<div class="c2-stage">' +
      '<div class="c2-side c2-left"><img src="assets/img/logo.svg" alt="" width="64" height="64"><b class="m1">KhmerMath</b><span class="kh">គណិតវិទ្យាខ្មែរ</span></div>' +
      '<div class="c2-side c2-right"><div class="c2-badge"><b>PISA</b><i>CBA</i></div><span class="kh">ហាត់ប្រឡងលើកុំព្យូទ័រ</span><span class="en">Computer-based practice</span></div>' +
      '<div class="c2-title m1" role="heading" aria-level="1">វិញ្ញាបនបត្រការហាត់គណិតវិទ្យា</div>' +
      '<div class="c2-sub en">Certificate of Mathematics Practice</div>' +
      '<div class="c2-pres kh">វិញ្ញាបនបត្រនេះប្រគល់ជូនដល់</div>' +
      '<div class="c2-pres2 en"><i>This certificate is presented to</i></div>' +
      '<div class="c2-name m1" style="font-size:' + nameSize + 'em"></div><div class="c2-rule"><i></i></div>' +
      '<div class="c2-who kh"></div>' +
      '<p class="c2-body kh">ដោយបានបំពេញការហាត់គណិតវិទ្យាតាមបែប PISA លើកុំព្យូទ័រ នៅថ្ងៃទី ' + day + ' ខែ ' + mon + ' ឆ្នាំ ' + yr +
      ' ទទួលបានពិន្ទុ <b>' + km(info.total) + ' / ' + km(info.max) + '</b> (<b>' + km(pct) + '%</b>)។</p>' +
      '<div class="c2-topics kh"></div>' +
      '<p class="c2-body2 en">for the computer-based mathematics practice — score <b>' + info.total + ' / ' + info.max + ' (' + pct + '%)</b></p>' +
      '<div class="c2-seal">' + sealSvg(km(pct) + '%') + '</div>' +
      '<div class="c2-sign"><div class="c2-line"></div><b class="kh">លោកគ្រូ សាន សុខលី</b><span class="en">KhmerMath · cba.khmermath.org</span></div>' +
      '<div class="c2-date"><div class="c2-line"></div><b class="kh">ថ្ងៃទី ' + day + ' ខែ ' + mon + ' ឆ្នាំ ' + yr + '</b><span class="en">' + MONTHS_EN[when.getMonth()] + ' ' + when.getDate() + ', ' + when.getFullYear() + '</span></div>' +
      '<div class="c2-foot kh">ការហាត់សាកល្បង មិនមែនជាលទ្ធផល PISA ផ្លូវការទេ · <span class="en">Practice record — not an official PISA result</span></div>' +
      '</div>';
    // names and titles go in as text, never as markup
    root.querySelector('.c2-name').textContent = name || 'សិស្សានុសិស្ស';
    root.querySelector('.c2-who').textContent = who;
    root.querySelector('.c2-topics').textContent = 'ប្រធានបទ៖ ' + titles;
    // small screens: the text is tiny at that size, so a tap opens the certificate large (scroll or pinch)
    const open = () => zoomOpen(wrap, 'ប្រើម្រាមដៃពីរ ដើម្បីពង្រីក ឬរំកិល');
    wrap.append(h('button', { type: 'button', class: 'cm-zoom-badge c2-zoom', onclick: open }, '🔍 ពង្រីកវិញ្ញាបនបត្រ'), root);
    wrap.append(h('div', { class: 'c2-acts' }, btn('ចែករំលែកវិញ្ញាបនបត្រ (Telegram…)', () => certificateShare(info), 'btn-primary'), btn('ទាញយករូប PNG', () => certificateShare(info, 'save')), btn('🖨️ បោះពុម្ព (A4)', () => PISA.printCertificate && PISA.printCertificate())));
    root.classList.add('cm-zoomable');
    root.addEventListener('click', () => { if (phone()) open(); });
    // 1 em = 1 % of the width: css/comfort.css does it with container units (1cqw); an old browser without them gets it from here
    if (!(window.CSS && CSS.supports && CSS.supports('width', '1cqw'))) {
      const fit = () => { const w = root.getBoundingClientRect().width; if (w) { root.style.fontSize = (w / 100) + 'px'; root.style.setProperty('--u', (w / 100) + 'px'); } };
      if (window.ResizeObserver) new ResizeObserver(fit).observe(root); else window.addEventListener('resize', fit);
      requestAnimationFrame(fit);
    }
    return wrap;
  }

  PISA.comfort = { afterScreen, saved, settings, overview, share, results, installBox, toast, prefs, resultCard, certificate, certificateImage, resultsHero };
})();
