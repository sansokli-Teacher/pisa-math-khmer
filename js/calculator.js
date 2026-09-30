/* On-screen calculator. PISA 2022 mathematics gave students one on the
 * screen; this is a small four-function version with brackets, square,
 * square root and percent. The expression is parsed by hand (no eval).
 */
(function () {
  'use strict';
  const { h } = PISA;
  let panel = null;
  let expr = '';
  let shown = '0';
  let justEvaluated = false;
  let pos = null;

  // ------------------------------------------------------------- parser ---
  function tokenize(src) {
    const out = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/[0-9.]/.test(c)) {
        let j = i;
        while (j < src.length && /[0-9.]/.test(src[j])) j++;
        const num = src.slice(i, j);
        if ((num.match(/\./g) || []).length > 1) throw new Error('number');
        out.push({ t: 'n', v: parseFloat(num === '.' ? '0' : num) });
        i = j;
      } else if ('+−×÷()√²%'.includes(c)) {
        out.push({ t: c });
        i++;
      } else throw new Error('char');
    }
    return out;
  }
  function evaluate(src) {
    const tk = tokenize(src);
    let p = 0;
    const peek = () => tk[p] && tk[p].t;
    function expr() {
      let v = term();
      while (peek() === '+' || peek() === '−') {
        const op = tk[p++].t;
        const r = term();
        v = op === '+' ? v + r : v - r;
      }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const k = peek();
        if (k === '×' || k === '÷') {
          p++;
          const r = unary();
          v = k === '×' ? v * r : v / r;
        } else if (k === '(' || k === '√' || k === 'n') {
          v *= unary(); // implicit multiplication: 2(3), 2√9
        } else return v;
      }
    }
    function unary() {
      const k = peek();
      if (k === '−') { p++; return -unary(); }
      if (k === '+') { p++; return unary(); }
      if (k === '√') { p++; return Math.sqrt(unary()); }
      return postfix();
    }
    function postfix() {
      let v = primary();
      while (peek() === '²' || peek() === '%') {
        v = tk[p++].t === '²' ? v * v : v / 100;
      }
      return v;
    }
    function primary() {
      const k = peek();
      if (k === 'n') return tk[p++].v;
      if (k === '(') {
        p++;
        const v = expr();
        if (peek() === ')') p++;
        else if (p < tk.length) throw new Error('paren');
        return v;
      }
      throw new Error('syntax');
    }
    const v = expr();
    if (p !== tk.length) throw new Error('trailing');
    return v;
  }
  function fmt(v) {
    if (!isFinite(v)) return 'Error';
    if (Math.abs(v) >= 1e12 || (v !== 0 && Math.abs(v) < 1e-9)) return v.toExponential(6);
    return String(parseFloat(v.toPrecision(12)));
  }

  // ----------------------------------------------------------------- ui ---
  const KEYS = [
    ['C', '⌫', '(', ')', '÷'],
    ['7', '8', '9', '×', '√'],
    ['4', '5', '6', '−', 'x²'],
    ['1', '2', '3', '+', '%'],
    ['±', '0', '.', '='],
  ];
  function press(k) {
    const isOp = '+−×÷²%'.includes(k) || k === 'x²';
    if (k === 'C') { expr = ''; shown = '0'; justEvaluated = false; }
    else if (k === '⌫') { if (justEvaluated) { expr = ''; justEvaluated = false; } else expr = expr.slice(0, -1); }
    else if (k === '=') {
      if (!expr) return draw();
      try {
        shown = fmt(evaluate(expr));
        justEvaluated = shown !== 'Error';
        if (justEvaluated) expr = shown.replace('-', '−');
      } catch (e) { shown = 'Error'; justEvaluated = false; }
    } else if (k === '±') {
      expr = expr ? '−(' + expr + ')' : '−';
      justEvaluated = false;
    } else {
      const sym = k === 'x²' ? '²' : k;
      if (justEvaluated && !isOp) expr = '';
      expr += sym;
      justEvaluated = false;
    }
    draw();
  }
  function draw() {
    if (!panel) return;
    panel.querySelector('.calc-expr').textContent = expr || ' ';
    panel.querySelector('.calc-out').textContent = shown;
  }
  function onKey(e) {
    const map = { '*': '×', x: '×', X: '×', '/': '÷', '-': '−', Enter: '=', '=': '=', Backspace: '⌫', Escape: 'C', Delete: 'C', '^': 'x²' };
    let k = map[e.key] || e.key;
    if (/^[0-9.+()%]$/.test(k) || ['×', '÷', '−', '=', '⌫', 'C', 'x²'].includes(k)) {
      e.preventDefault();
      e.stopPropagation();
      press(k);
    }
  }
  function open() {
    if (panel) return;
    panel = h('div', { class: 'calc', role: 'dialog', 'aria-label': 'ម៉ាស៊ីនគិតលេខ', tabindex: '-1' });
    const head = h('div', { class: 'calc-head' }, h('span', {}, 'ម៉ាស៊ីនគិតលេខ'),
      h('button', { type: 'button', class: 'calc-x', 'aria-label': 'បិទ', onclick: close }, '×'));
    const screen = h('div', { class: 'calc-screen' }, h('div', { class: 'calc-expr' }), h('div', { class: 'calc-out' }));
    const grid = h('div', { class: 'calc-keys' });
    KEYS.forEach((row) => row.forEach((k) => {
      grid.append(h('button', {
        type: 'button',
        class: 'ck' + (k === '=' ? ' eq' : '') + (/^[0-9.]$/.test(k) ? ' dig' : '') + (k === 'C' ? ' clr' : ''),
        onclick: () => { press(k); panel.focus(); },
      }, k));
    }));
    panel.append(head, screen, grid);
    panel.addEventListener('keydown', onKey);
    document.body.append(panel);
    if (pos) { panel.style.left = pos.x + 'px'; panel.style.top = pos.y + 'px'; panel.style.right = 'auto'; }
    // drag by the title bar
    head.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      const r = panel.getBoundingClientRect();
      const dx = e.clientX - r.left;
      const dy = e.clientY - r.top;
      const move = (ev) => {
        const x = Math.min(Math.max(0, ev.clientX - dx), window.innerWidth - r.width);
        const y = Math.min(Math.max(0, ev.clientY - dy), window.innerHeight - 40);
        panel.style.left = x + 'px';
        panel.style.top = y + 'px';
        panel.style.right = 'auto';
        pos = { x, y };
      };
      const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
    draw();
    panel.focus();
  }
  function close() {
    if (panel) { panel.remove(); panel = null; }
  }
  PISA.calc = { open, close, toggle: () => (panel ? close() : open()), evaluate };
})();
