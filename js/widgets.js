/* Response widgets shared by the units. Each widget reads and writes the
 * session through the ctx object that core.js hands to a screen's render
 * function, so a reload (or the practice-mode back arrow) restores answers.
 */
(function () {
  'use strict';
  const { h, raw } = PISA;
  const W = PISA.W;
  let uid = 0;
  const nextId = (p) => p + '-' + (++uid);

  // ---------------------------------------------------------------- text ---
  W.instr = (html) => h('p', { class: 'instr', html });
  W.p = (html, cls) => h('p', { class: cls || '', html });
  W.stack = (...kids) => h('div', { class: 'stack' }, ...kids);

  // --------------------------------------------------------- radio list ---
  // options: [{ v, html }]
  W.radios = function (ctx, qid, part, options, opts) {
    opts = opts || {};
    const name = nextId(qid + '-' + part);
    const list = h('div', { class: 'radio-list' + (opts.inline ? ' inline' : '') + (opts.cls ? ' ' + opts.cls : ''), role: 'radiogroup' });
    options.forEach((o) => {
      const inp = h('input', { type: 'radio', name, value: o.v });
      inp.checked = ctx.val(qid, part) === o.v;
      inp.addEventListener('change', () => ctx.setVal(qid, part, o.v));
      list.append(h('label', { class: 'radio-opt' }, inp, h('span', { class: 'opt-body', html: o.html })));
    });
    return list;
  };

  // ------------------------------------------------------ choice table ---
  // One radio row per statement: True/False, or Always/Sometimes/Never.
  // Each row is stored as part "0", "1", ... of the question.
  W.choiceTable = function (ctx, qid, cfg) {
    const t = h('table', { class: 'ctable' + (cfg.cls ? ' ' + cfg.cls : '') });
    const hr = h('tr', {}, h('th', { class: 'st', html: cfg.head || 'អំណះអំណាង' }));
    cfg.cols.forEach((c) => hr.append(h('th', { class: 'cc', html: c.html })));
    t.append(h('thead', {}, hr));
    const tb = h('tbody');
    cfg.rows.forEach((rowHtml, i) => {
      const part = String(i);
      const name = nextId(qid + '-r' + i);
      const tr = h('tr', {}, h('td', { class: 'st' }, typeof rowHtml === 'string' ? raw(rowHtml, 'span') : rowHtml));
      cfg.cols.forEach((c) => {
        const inp = h('input', { type: 'radio', name, value: c.v, 'aria-label': c.label || c.v });
        inp.checked = ctx.val(qid, part) === c.v;
        inp.addEventListener('change', () => ctx.setVal(qid, part, c.v));
        tr.append(h('td', { class: 'cc' }, h('label', { class: 'cell-hit' }, inp)));
      });
      tb.append(tr);
    });
    t.append(tb);
    return t;
  };

  // ------------------------------------------------------- check table ---
  // "Select all that apply". rows: [{ k, html | node }]; checked rows are
  // stored as part k = true.
  W.checkTable = function (ctx, qid, cfg) {
    const t = h('table', { class: 'ctable check' + (cfg.cls ? ' ' + cfg.cls : '') });
    t.append(h('thead', {}, h('tr', {}, h('th', { class: 'st', html: cfg.head || '' }), h('th', { class: 'cc', html: cfg.checkHead || '' }))));
    const tb = h('tbody');
    cfg.rows.forEach((r) => {
      const inp = h('input', { type: 'checkbox', 'aria-label': r.label || r.k });
      inp.checked = !!ctx.val(qid, r.k);
      inp.addEventListener('change', () => ctx.setVal(qid, r.k, inp.checked ? true : null));
      tb.append(h('tr', {}, h('td', { class: 'st' }, r.node || raw(r.html, 'span')), h('td', { class: 'cc' }, h('label', { class: 'cell-hit' }, inp))));
    });
    t.append(tb);
    return t;
  };

  // ------------------------------------------------------- typed input ---
  W.textarea = function (ctx, qid, part, placeholder, rows) {
    const ta = h('textarea', { class: 'resp-text', rows: rows || 4, placeholder: placeholder || 'សូមវាយចម្លើយនៅទីនេះ', 'aria-label': placeholder || 'ចម្លើយ' });
    ta.value = ctx.val(qid, part) || '';
    ta.addEventListener('input', () => ctx.setVal(qid, part, ta.value));
    return ta;
  };
  W.input = function (ctx, qid, part, placeholder, opts) {
    opts = opts || {};
    const inp = h('input', { type: 'text', class: 'resp-input' + (opts.cls ? ' ' + opts.cls : ''), placeholder: placeholder || '', autocomplete: 'off', spellcheck: 'false', 'aria-label': opts.label || placeholder || 'ចម្លើយ' });
    if (opts.maxlength) inp.maxLength = opts.maxlength;
    if (opts.width) inp.style.width = opts.width;
    inp.value = ctx.val(qid, part) || '';
    inp.addEventListener('input', () => {
      if (opts.transform) {
        const t = opts.transform(inp.value);
        if (t !== inp.value) inp.value = t;
      }
      ctx.setVal(qid, part, inp.value);
      if (opts.onInput) opts.onInput(inp);
    });
    return inp;
  };

  // ---------------------------------------------------------------- tabs ---
  // tabs: [{ label, color, light, render(ctx) }]. The open tab is view state.
  W.tabs = function (ctx, key, tabs) {
    const wrap = h('div', { class: 'tabs' });
    const bar = h('div', { class: 'tab-bar', role: 'tablist' });
    const pane = h('div', { class: 'tab-pane', role: 'tabpanel' });
    const btns = tabs.map((t, i) => {
      const b = h('button', { type: 'button', role: 'tab', class: 'tab', onclick: () => { ctx.setUi(key, i); draw(); } }, t.label);
      b.style.setProperty('--tab', t.color);
      b.style.setProperty('--tab-light', t.light);
      bar.append(b);
      return b;
    });
    function draw() {
      const cur = ctx.ui(key, 0);
      btns.forEach((b, i) => {
        b.classList.toggle('on', i === cur);
        b.setAttribute('aria-selected', i === cur ? 'true' : 'false');
      });
      pane.innerHTML = '';
      pane.style.setProperty('--tab', tabs[cur].color);
      pane.append(tabs[cur].render(ctx));
    }
    wrap.append(bar, pane);
    draw();
    return wrap;
  };

  // --------------------------------------------------------- spreadsheet ---
  // cols: [{ head, num }]; rows: [{ cells: [display...], keys: [sortKey...] }].
  // Sorting is ascending, as the OECD screen says ("ពីតូចទៅធំ").
  W.sheet = function (ctx, key, cfg) {
    const wrap = h('div', { class: 'sheet-wrap' });
    function draw() {
      const sortCol = ctx.ui(key, 0);
      const order = cfg.rows.map((r, i) => i);
      order.sort((a, b) => {
        const ka = cfg.rows[a].keys[sortCol];
        const kb = cfg.rows[b].keys[sortCol];
        if (ka == null && kb == null) return a - b;
        if (ka == null) return 1;
        if (kb == null) return -1;
        return typeof ka === 'number' ? ka - kb : String(ka).localeCompare(String(kb));
      });
      const t = h('table', { class: 'sheet' });
      const r1 = h('tr', { class: 'letters' });
      const r2 = h('tr', { class: 'heads' });
      cfg.cols.forEach((c, i) => {
        const on = i === sortCol;
        const btn = h('button', {
          type: 'button', class: 'sort-btn' + (on ? ' on' : ''),
          title: 'តម្រៀបជួរ ' + c.letter + ' ពីតូចទៅធំ', 'aria-label': 'តម្រៀបជួរ ' + c.letter + ' ពីតូចទៅធំ',
          disabled: cfg.noSortCols && cfg.noSortCols.includes(i),
          onclick: () => { ctx.setUi(key, i); draw(); },
          html: on
            ? '<svg viewBox="0 0 12 12"><path d="M2 4h8L6 9.5z" fill="#fff"/></svg>'
            : '<svg viewBox="0 0 12 12"><path d="M3 5h6L6 1.5zM3 7h6L6 10.5z" fill="#A3A3A3"/></svg>',
        });
        r1.append(h('th', {}, h('div', {}, 'ជួរ ' + c.letter), btn));
        r2.append(h('th', { html: c.head || '' }));
      });
      t.append(h('thead', {}, r1, r2));
      const tb = h('tbody');
      order.forEach((ri) => {
        const tr = h('tr');
        cfg.rows[ri].cells.forEach((v, ci) => tr.append(h('td', { class: cfg.cols[ci].num ? 'num' : '' }, v == null ? '' : v)));
        tb.append(tr);
      });
      t.append(tb);
      wrap.innerHTML = '';
      wrap.append(t);
    }
    draw();
    return wrap;
  };

  // --------------------------------------------------------- drag & drop ---
  // Pointer events, so it works with a mouse, a touch screen and a pen. A tap
  // (no movement) selects the source instead; tapping a target then places it.
  // This click-to-place path also helps students on a laptop track pad.
  let selected = null;
  function clearSelected() {
    if (selected && selected.el) selected.el.classList.remove('dnd-selected');
    selected = null;
  }
  function targetAt(x, y) {
    const el = document.elementFromPoint(x, y);
    return el && el.closest('[data-drop]');
  }
  W.dragSource = function (el, payload, makeGhost) {
    el.classList.add('dnd-src');
    // A redraw replaces the source element; keep a tap-selection alive on
    // its replacement so a student can place the same tile several times.
    if (selected && selected.payload === payload && !selected.el.isConnected) {
      selected.el = el;
      el.classList.add('dnd-selected');
    }
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
    function select() {
      const same = selected && selected.el === el;
      clearSelected();
      if (!same) { selected = { el, payload }; el.classList.add('dnd-selected'); }
    }
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const sx = e.clientX;
      const sy = e.clientY;
      let ghost = null;
      let over = null;
      const move = (ev) => {
        if (!ghost) {
          if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
          clearSelected();
          ghost = makeGhost ? makeGhost() : el.cloneNode(true);
          ghost.classList.add('dnd-ghost');
          document.body.append(ghost);
        }
        ghost.style.left = ev.clientX + 'px';
        ghost.style.top = ev.clientY + 'px';
        const t = targetAt(ev.clientX, ev.clientY);
        if (t !== over) {
          if (over) over.classList.remove('dnd-over');
          over = t;
          if (over) over.classList.add('dnd-over');
        }
      };
      const up = (ev) => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        if (over) over.classList.remove('dnd-over');
        if (ghost) {
          ghost.remove();
          const t = targetAt(ev.clientX, ev.clientY);
          if (t && t._onDrop) t._onDrop(payload);
        } else select();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  };
  // onDrop(payload) places; onClear() empties a filled target when it is
  // tapped with nothing selected.
  W.dropTarget = function (el, onDrop, onClear) {
    el.dataset.drop = '1';
    el._onDrop = onDrop;
    el.setAttribute('tabindex', '0');
    const activate = () => {
      if (selected) onDrop(selected.payload);
      else if (onClear) onClear();
    };
    el.addEventListener('click', activate);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      if ((e.key === 'Backspace' || e.key === 'Delete') && onClear) { e.preventDefault(); onClear(); }
    });
  };
  W.clearSelection = clearSelected;
})();
