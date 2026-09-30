/* Typing mathematics in an answer box.
 *
 * Students type plain text: 3/4, (a+b)/2, x^2, 2^(n+1), √20 or √(x+1), π.
 * A row of buttons above the box inserts these (and ×, ÷, ≤, ≥, ≠, ≈, °, ±)
 * at the cursor, and a preview under the box draws what was typed as
 * mathematics with KaTeX. The answer itself stays plain text, so the CSV and
 * the teacher's reading of it need nothing special; the results page draws
 * it the same way as the preview.
 *
 * A box takes part when it has the attribute data-math: every essay box
 * (W.textarea) and the textbook tasks' answer lines. Boxes that are scored
 * automatically as numbers do not, because π or √ would not score there.
 */
(function () {
  'use strict';
  const { h } = PISA;

  // --------------------------------------------------- plain text → TeX ---
  // Characters that can belong to a piece of mathematics inside Khmer text.
  const RUN = /[0-9០-៩A-Za-z.,+\-−×÷*·/^()[\]=<>≤≥≠≈±π√°%²³ ]+/g;
  // A run is drawn only when drawing changes something: a fraction, a power,
  // a root or π next to a number or a letter. «បាទ/ចាស» stays text.
  const WORTH = (t) => /[/^√π²³]|sqrt/.test(t) && /[0-9០-៩A-Za-zπ]/.test(t);
  const OPS = {
    '×': '\\times ', '*': '\\times ', '·': '\\cdot ', '÷': '\\div ', '−': '-', '≤': '\\le ', '≥': '\\ge ',
    '≠': '\\ne ', '≈': '\\approx ', '±': '\\pm ', '%': '\\%', '<': '<', '>': '>', '=': '=', '+': '+', '-': '-',
  };
  const LONE = { '^': '\\text{\\textasciicircum}', '°': '{}^{\\circ}', '²': '{}^{2}', '³': '{}^{3}' };

  // Recursive descent over one run. An atom is a number, a word, π, a
  // bracketed group or a root, with any powers after it; a/b takes the atom
  // before and the atom after the slash.
  function toTex(src) {
    const s = PISA.latin(src);
    let i = 0;
    const peek = () => s[i];
    const skip = () => { while (s[i] === ' ') i++; };
    const join = (items) => items.map((x) => x.tex).join('');

    function group(close) {
      const items = seq(close);
      if (s[i] === close) i++;
      return items;
    }
    function primary() {
      skip();
      const c = peek();
      if (c === '(' || c === '[') {
        i++;
        const close = c === '(' ? ')' : ']';
        const inner = join(group(close));
        return { tex: '\\left' + c + inner + '\\right' + close, inner, atom: true };
      }
      if (c === '√' || s.startsWith('sqrt', i)) {
        i += c === '√' ? 1 : 4;
        skip();
        const arg = peek() === '(' ? (i++, join(group(')'))) : (primary() || { tex: '' }).tex;
        return { tex: '\\sqrt{' + arg + '}', atom: true };
      }
      if (c === 'π') { i++; return { tex: '\\pi ', atom: true }; }
      let m = /^\d+(?:[.,]\d+)*/.exec(s.slice(i)) || /^\.\d+/.exec(s.slice(i));
      if (m) { i += m[0].length; return { tex: m[0].replace(/,/g, '{,}'), atom: true }; }
      m = /^[A-Za-z]+/.exec(s.slice(i));
      if (m) {
        i += m[0].length;
        return { tex: m[0] === 'pi' ? '\\pi ' : m[0], atom: true };
      }
      return null;
    }
    function atom() {
      const a = primary();
      if (!a) return null;
      for (;;) {
        if (peek() === '^') {
          i++;
          skip();
          let e;
          if (peek() === '(') { i++; e = join(group(')')); } else {
            const neg = peek() === '-' || peek() === '−' ? (i++, '-') : '';
            const p = primary();
            e = neg + (p ? p.tex : '');
          }
          a.tex = '{' + a.tex + '}^{' + e + '}';
          a.inner = null;
        } else if (peek() === '²' || peek() === '³') {
          a.tex = '{' + a.tex + '}^{' + (peek() === '²' ? 2 : 3) + '}';
          a.inner = null;
          i++;
        } else if (peek() === '°') {
          a.tex += '^{\\circ}';
          a.inner = null;
          i++;
        } else return a;
      }
    }
    function seq(close) {
      const items = [];
      while (i < s.length && s[i] !== close) {
        const c = s[i];
        if (c === ' ') { i++; items.push({ tex: ' ' }); continue; }
        if (c === '/') {
          i++;
          let k = items.length - 1;
          while (k >= 0 && items[k].tex === ' ') k--;
          const num = k >= 0 && items[k].atom ? items[k] : null;
          const save = i;
          const den = atom();
          if (num && den) {
            items.splice(k);
            items.push({ tex: '\\frac{' + (num.inner != null ? num.inner : num.tex) + '}{' + (den.inner != null ? den.inner : den.tex) + '}', atom: true });
          } else {
            i = save;
            items.push({ tex: '/' });
          }
          continue;
        }
        const a = atom();
        if (a) { items.push(a); continue; }
        // an operator, or a mark with nothing before it to attach to
        items.push({ tex: OPS[c] != null ? OPS[c] : LONE[c] != null ? LONE[c] : c });
        i++;
      }
      return items;
    }
    return join(seq(null)).trim();
  }
  PISA.mathTex = toTex;

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // the student's own line breaks; never applied to KaTeX's output, whose SVG paths contain newlines
  const plainHtml = (t) => esc(t).replace(/\n/g, '<br>');

  // HTML for a student's answer: Khmer text escaped, pieces of mathematics
  // drawn by KaTeX. Returns null when there is nothing to draw, so callers
  // can keep the plain text.
  PISA.mathHtml = function (text) {
    const t = String(text == null ? '' : text);
    if (!window.katex || !WORTH(t)) return null;
    let out = '';
    let last = 0;
    let drew = false;
    t.replace(RUN, (run, at) => {
      const lead = run.length - run.trimStart().length;
      const body = run.trim().replace(/[.,]$/, '');
      if (!WORTH(body)) return run;
      const start = at + lead;
      out += plainHtml(t.slice(last, start));
      try {
        out += window.katex.renderToString(toTex(body), { throwOnError: false, strict: 'ignore' });
        drew = true;
      } catch (e) {
        out += esc(body);
      }
      last = start + body.length;
      return run;
    });
    out += plainHtml(t.slice(last));
    return drew ? out : null;
  };

  // ------------------------------------------------------------ toolbar ---
  // [label as HTML, Khmer name, text to insert; «|» marks where the cursor goes]
  const KEYS = [
    ['<span class="mk-frac"><i>a</i><i>b</i></span>', 'ប្រភាគ', '(|)/()'],
    ['x<sup>2</sup>', 'ការេ', '^2'],
    ['x<sup>n</sup>', 'ស្វ័យគុណ', '^(|)'],
    ['√', 'ឫសការេ', '√(|)'],
    ['π', 'ភី', 'π'],
    ['×', 'គុណ', '×'],
    ['÷', 'ចែក', '÷'],
    ['±', 'បូក ឬដក', '±'],
    ['≤', 'តូចជាង ឬស្មើ', '≤'],
    ['≥', 'ធំជាង ឬស្មើ', '≥'],
    ['≠', 'មិនស្មើ', '≠'],
    ['≈', 'ប្រហែលស្មើ', '≈'],
    ['°', 'ដឺក្រេ', '°'],
  ];

  function insert(field, tpl) {
    const a = field.selectionStart != null ? field.selectionStart : field.value.length;
    const b = field.selectionEnd != null ? field.selectionEnd : a;
    const sel = field.value.slice(a, b);
    let text = tpl.replace('|', '');
    let caret = tpl.indexOf('|') >= 0 ? tpl.indexOf('|') : text.length;
    // a selection goes inside the first bracket: select 3, press a/b → (3)/(|)
    if (sel && tpl.indexOf('|') >= 0) {
      text = tpl.replace('|', sel);
      const second = text.indexOf('()', tpl.indexOf('|') + sel.length);
      caret = second >= 0 ? second + 1 : text.length;
    }
    field.focus();
    field.setRangeText(text, a, b, 'end');
    field.setSelectionRange(a + caret, a + caret);
    field.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function preview(field) {
    const pv = h('div', { class: 'mpv', 'aria-live': 'polite', hidden: true });
    const draw = () => {
      const html = PISA.mathHtml(field.value);
      pv.hidden = !html;
      if (html) pv.innerHTML = '<span class="mpv-lbl">ទម្រង់គណិតវិទ្យា៖</span> ' + html;
    };
    field.addEventListener('input', draw);
    draw();
    return pv;
  }

  // Called by core.js after each screen is drawn: one button row per screen,
  // above the first box that takes mathematics; the buttons write into the
  // box that last had the cursor.
  PISA.mathBar = function (root) {
    const fields = Array.from(root.querySelectorAll('[data-math]'));
    if (!fields.length) return;
    let target = fields[0];
    root.addEventListener('focusin', (e) => { if (e.target.matches && e.target.matches('[data-math]')) target = e.target; });
    const bar = h('div', { class: 'mathbar', role: 'toolbar', 'aria-label': 'ឧបករណ៍សរសេរគណិតវិទ្យា' });
    KEYS.forEach(([label, name, tpl]) => {
      const b = h('button', { type: 'button', class: 'mk', title: name, 'aria-label': name, html: '<span>' + label + '</span>' });
      // keep the cursor (and a phone's keyboard) in the answer box
      b.addEventListener('pointerdown', (e) => e.preventDefault());
      b.addEventListener('mousedown', (e) => e.preventDefault());
      b.addEventListener('click', () => insert(target, tpl));
      bar.append(b);
    });
    const first = fields[0];
    (first.closest('.dtable-wrap, .ansline') || first).before(bar);
    fields.forEach((f) => {
      const line = f.closest('.ansline');
      if (line) line.append(preview(f)); else f.after(preview(f));
    });
  };
})();
