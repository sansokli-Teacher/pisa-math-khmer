/* Unit 6 — ការរុករកផ្លូវ (Navigation)
 * Source: teacher guide chapter 8, screens 1–6 (oecd_ex6_*.tikz) and keys.
 * The map is a 5 × 5 grid of blocks; roads run on whole-number lines 0..5.
 * The book's three route screens (2–4) are one screen with three tabs.
 */
(function () {
  'use strict';
  const { h, s, W } = PISA;

  const COLORS = { ann: '#3C8C32', bob: '#E1821E', corey: '#873CB4' };
  const NAMES = { ann: 'អាន់', bob: 'បប់', corey: 'ខូរី' };
  let mapSeq = 0;

  // ------------------------------------------------------------ routes ---
  // Each friend only moves right or up. The rules below reproduce the three
  // routes drawn in the book for A(0, 1) -> B(5, 4), and extend to any start.
  function lineY(A, B, x) { return A.y + ((B.y - A.y) * (x - A.x)) / (B.x - A.x); }
  function route(kind, A, B) {
    const pts = [{ x: A.x, y: A.y }];
    let x = A.x;
    let y = A.y;
    const eps = 1e-9;
    while (x < B.x || y < B.y) {
      let up;
      if (x === B.x) up = true;
      else if (y === B.y) up = false;
      else if (kind === 'ann') up = y + 1 <= lineY(A, B, x) + eps; // stay on or below the line
      else if (kind === 'corey') up = !(y >= lineY(A, B, x + 1) - eps); // stay on or above it
      else up = y < lineY(A, B, x) - eps; // bob: cross it as often as possible
      if (up) y += 1; else x += 1;
      pts.push({ x, y });
    }
    // merge straight runs into single legs, as the book draws them
    const legs = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const a = legs[legs.length - 1];
      const nxt = pts[i + 1];
      const b = pts[i];
      if (nxt && ((a.x === b.x && b.x === nxt.x) || (a.y === b.y && b.y === nxt.y))) continue;
      legs.push(b);
    }
    return legs;
  }
  const lengthOf = (pts) => pts.slice(1).reduce((sum, p, i) => sum + Math.abs(p.x - pts[i].x) + Math.abs(p.y - pts[i].y), 0);
  PISA.navRoute = route; // exposed for the self-test

  // --------------------------------------------------------------- map ---
  // opts: { u, A, B, aLabel, bLabel, line, routes: [kind], offsets, diags,
  //         unitMarks: 'top' | 'bottom', candidates, dragA(onMove) }
  function cityMap(opts) {
    const u = opts.u || 64;
    const pad = 26;
    const size = 5.6 * u + pad * 2;
    const X = (x) => pad + (x + 0.3) * u;
    const Y = (y) => pad + (5.3 - y) * u;
    const id = 'm' + (++mapSeq);
    const svg = s('svg', { viewBox: `0 0 ${size} ${size}`, class: 'citymap', role: 'img', 'aria-label': 'ផែនទីទីក្រុងជាក្រឡាចត្រង្គ' });
    const defs = s('defs');
    Object.entries(COLORS).forEach(([k, c]) => {
      defs.append(s('marker', { id: id + k, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 4.5, markerHeight: 4.5, orient: 'auto-start-reverse' },
        s('path', { d: 'M0 0 L10 5 L0 10 z', fill: c })));
    });
    defs.append(s('marker', { id: id + 'umk', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' },
      s('path', { d: 'M0 1 L10 5 L0 9 z', fill: '#222' })));
    svg.append(defs);
    svg.append(s('rect', { x: X(-0.3), y: Y(5.3), width: 5.6 * u, height: 5.6 * u, class: 'road' }));
    for (let bx = 0; bx < 5; bx++) {
      for (let by = 0; by < 5; by++) {
        svg.append(s('rect', { x: X(bx + 0.13), y: Y(by + 0.87), width: 0.74 * u, height: 0.74 * u, class: 'block' }));
      }
    }
    for (let by = 0; by < 5; by++) {
      svg.append(s('rect', { x: X(-0.3), y: Y(by + 0.87), width: 0.17 * u, height: 0.74 * u, class: 'block' }));
      svg.append(s('rect', { x: X(5.13), y: Y(by + 0.87), width: 0.17 * u, height: 0.74 * u, class: 'block' }));
    }
    (opts.diags || []).forEach((d) => {
      svg.append(s('line', { x1: X(d.x1), y1: Y(d.y1), x2: X(d.x2), y2: Y(d.y2), class: 'diag-road', 'stroke-width': 0.26 * u }));
      svg.append(s('line', { x1: X(d.x1), y1: Y(d.y1), x2: X(d.x2), y2: Y(d.y2), class: 'diag-mid' }));
      const mx = X((d.x1 + d.x2) / 2);
      const my = Y((d.y1 + d.y2) / 2);
      const rising = (d.y2 - d.y1) * (d.x2 - d.x1) > 0;
      const ang = rising ? -45 : 45;
      svg.append(s('text', { x: mx, y: my - 0.17 * u, 'text-anchor': 'middle', class: 'diag-lbl', transform: `rotate(${ang} ${mx} ${my})`, text: d.label }));
    });
    const gRoutes = s('g');
    const gTop = s('g');
    svg.append(gRoutes, gTop);

    function markUnits() {
      const mk = (x1, y1, x2, y2, tx, ty, anchor, text) => {
        gTop.append(s('line', { x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2), class: 'umark', 'marker-start': `url(#${id}umk)`, 'marker-end': `url(#${id}umk)` }));
        gTop.append(s('text', { x: tx, y: ty, 'text-anchor': anchor, class: 'ulbl', text }));
      };
      if (opts.unitMarks === 'top') {
        mk(1, 4, 2, 4, X(1.5), Y(4) - 6, 'middle', '១ ឯកតា');
        mk(1, 3, 1, 4, X(1) - 5, Y(3.5) + 4, 'end', '១ ឯកតា');
      } else if (opts.unitMarks === 'bottom') {
        mk(1, -0.08, 2, -0.08, X(1.5), Y(-0.08) + 16, 'middle', '១ ឯកតា');
        mk(0.92, 0, 0.92, 1, X(0.92) - 5, Y(0.5) + 4, 'end', '១ ឯកតា');
      }
    }

    function draw() {
      gRoutes.innerHTML = '';
      gTop.innerHTML = '';
      const A = opts.getA ? opts.getA() : opts.A;
      const B = opts.B;
      if (opts.line) gRoutes.append(s('line', { x1: X(A.x), y1: Y(A.y), x2: X(B.x), y2: Y(B.y), class: 'abline' }));
      (opts.routes || []).forEach((kind, i) => {
        const off = opts.routes.length > 1 ? (i - 1) * 5 : 0;
        const legs = route(kind, A, B);
        for (let j = 1; j < legs.length; j++) {
          gRoutes.append(s('line', {
            x1: X(legs[j - 1].x) + off, y1: Y(legs[j - 1].y) - off, x2: X(legs[j].x) + off, y2: Y(legs[j].y) - off,
            stroke: COLORS[kind], class: 'leg', 'marker-end': `url(#${id}${kind})`,
          }));
        }
      });
      markUnits();
      (opts.candidates || []).forEach((c) => {
        const cand = s('g', { class: 'cand', tabindex: '0', role: 'button', 'aria-label': 'ផ្លាស់ A ទៅទីតាំង ' + c.n });
        cand.append(s('circle', { cx: X(c.x), cy: Y(c.y), r: 7 }), s('text', { x: X(c.x) - 11, y: Y(c.y) - 7, 'text-anchor': 'end', text: c.n }));
        if (opts.onPick) {
          cand.addEventListener('click', () => opts.onPick(c));
          cand.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opts.onPick(c); } });
        }
        gTop.append(cand);
      });
      gTop.append(s('circle', { cx: X(B.x), cy: Y(B.y), r: 6.5, class: 'pt' }));
      gTop.append(s('text', { x: X(B.x) + 12, y: Y(B.y) + 6, class: 'ptl', text: opts.bLabel || 'B' }));
      const aDot = s('circle', { cx: X(A.x), cy: Y(A.y), r: opts.dragA ? 9 : 6.5, class: 'pt' + (opts.dragA ? ' drag' : '') });
      const aTxt = s('text', { x: X(A.x) - 12, y: Y(A.y) + 6, 'text-anchor': 'end', class: 'ptl', text: opts.aLabel || 'A' });
      gTop.append(aDot, aTxt);
      if (opts.dragA) enableDrag(aDot, aTxt);
    }

    function enableDrag(dot, txt) {
      dot.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        dot.setPointerCapture(e.pointerId);
        const toSvg = (ev) => {
          const p = svg.createSVGPoint();
          p.x = ev.clientX;
          p.y = ev.clientY;
          return p.matrixTransform(svg.getScreenCTM().inverse());
        };
        const move = (ev) => {
          const p = toSvg(ev);
          dot.setAttribute('cx', p.x);
          dot.setAttribute('cy', p.y);
          txt.setAttribute('x', p.x - 12);
          txt.setAttribute('y', p.y + 6);
        };
        const up = (ev) => {
          dot.removeEventListener('pointermove', move);
          dot.removeEventListener('pointerup', up);
          const p = toSvg(ev);
          const gx = (p.x - pad) / u - 0.3;
          const gy = 5.3 - (p.y - pad) / u;
          let best = null;
          let bd = 0.6;
          (opts.snap || []).forEach((c) => {
            const d = Math.hypot(c.x - gx, c.y - gy);
            if (d < bd) { bd = d; best = c; }
          });
          if (best) opts.onPick(best);
          else draw();
        };
        dot.addEventListener('pointermove', move);
        dot.addEventListener('pointerup', up);
      });
    }

    draw();
    svg.redraw = draw;
    return svg;
  }

  // ------------------------------------------------------------ screens ---
  const A0 = { x: 0, y: 1 };
  const B0 = { x: 5, y: 4 };
  const INSTR_TABS = 'សូមអានសេចក្ដីណែនាំ រួចចុចលើផ្ទាំងនីមួយៗ ដើម្បីមើលផ្លូវផ្សេងៗ។ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។';
  const STRATEGIES = '<p>អាន់ បប់ និងខូរី មានគំនិតខុសៗគ្នា អំពីរបៀបកំណត់ផ្លូវខ្លីជាងគេពី A ទៅ B។</p><ul class="strat">' +
    '<li><b>អាន់</b> ដើរទៅស្ដាំ ឬឡើងលើជានិច្ច ដោយនៅ<b>ក្រោម</b>បន្ទាត់ត្រង់ក្រហម តែជិតបំផុត (ផ្លូវពណ៌បៃតង)។</li>' +
    '<li><b>បប់</b> ដើរទៅស្ដាំ ឬឡើងលើជានិច្ច ដោយ<b>កាត់</b>បន្ទាត់ក្រហមឱ្យបានច្រើនដងបំផុត (ផ្លូវពណ៌ទឹកក្រូច)។</li>' +
    '<li><b>ខូរី</b> ដើរទៅស្ដាំ ឬឡើងលើជានិច្ច ដោយនៅ<b>លើ</b>បន្ទាត់ក្រហម តែជិតបំផុត (ផ្លូវពណ៌ស្វាយ)។</li></ul>';

  const CANDS = [{ n: '1', x: 1, y: 1 }, { n: '2', x: 3, y: 1 }, { n: '3', x: 3, y: 2 }, { n: '4', x: 4, y: 2 }];

  function q1Explorer(ctx) {
    const st = ctx.ui('u6-drag', () => ({ a: { x: 0, y: 1 }, seen: {} }));
    const wrap = h('div', { class: 'stack' });
    const tableHolder = h('div');
    const pick = (c) => {
      st.a = { x: c.x, y: c.y };
      if (c.n) st.seen[c.n] = true;
      ctx.setUi('u6-drag', st);
      map.redraw();
      drawTable();
    };
    const map = cityMap({
      u: 60, B: B0, line: true, routes: ['ann', 'bob', 'corey'], unitMarks: 'top',
      getA: () => st.a, candidates: CANDS, snap: CANDS.concat([{ x: 0, y: 1 }]), dragA: true, onPick: pick,
    });
    function drawTable() {
      const t = h('table', { class: 'dist' });
      t.append(h('thead', {},
        h('tr', {}, h('th', { rowspan: 2 }, 'ទីតាំងរបស់ A'), h('th', { colspan: 3 }, 'ចម្ងាយពី A ទៅ B (ជាឯកតា)')),
        h('tr', {}, h('th', {}, 'ផ្លូវអាន់'), h('th', {}, 'ផ្លូវបប់'), h('th', {}, 'ផ្លូវខូរី'))));
      const tb = h('tbody');
      CANDS.forEach((c) => {
        const tr = h('tr', {}, h('td', {}, c.n));
        ['ann', 'bob', 'corey'].forEach((k) => tr.append(h('td', {}, st.seen[c.n] ? String(lengthOf(route(k, c, B0))) : '')));
        tb.append(tr);
      });
      t.append(tb);
      tableHolder.innerHTML = '';
      tableHolder.append(t);
    }
    drawTable();
    const legend = h('div', { class: 'legend' }, ...['ann', 'bob', 'corey'].map((k) => h('span', {}, h('i', { style: { background: COLORS[k] } }), 'ផ្លូវ' + NAMES[k])));
    wrap.append(h('div', { class: 'map-holder sm' }, map), legend, tableHolder);
    return wrap;
  }

  const DIAGS = [
    { x1: 1, y1: 2, x2: 2, y2: 1, label: 'ផ្លូវទ្រេតទី ១' },
    { x1: 3, y1: 0, x2: 4, y2: 1, label: 'ផ្លូវទ្រេតទី ២' },
    { x1: 0, y1: 2, x2: 1, y2: 3, label: 'ផ្លូវទ្រេតទី ៣' },
  ];
  const TF = [{ v: 'T', html: 'ពិត' }, { v: 'F', html: 'មិនពិត' }];
  const TF_TEXT = { T: 'ពិត', F: 'មិនពិត' };

  PISA.registerUnit({
    id: 'u6',
    no: 6,
    title: 'ការរុករកផ្លូវ',
    en: 'Navigation',
    blurb: 'អូសចំណុច A លើផែនទីក្រឡាចត្រង្គ ប្រៀបធៀបយុទ្ធសាស្ត្រ រួចពន្យល់ថាហេតុអ្វីផ្លូវវែងស្មើគ្នា។',
    questions: {
      u6q1: {
        label: 'សំណួរ ១', format: 'សំណួរសរសេរចម្លើយវែង', max: 1,
        parts: [{ k: 'why' }],
        summary: (r) => r.why || '—',
        score: () => ({ pts: null }),
        key: 'ផ្លូវទាំងបីស្មើគ្នា ព្រោះផ្លូវណាដែលដើរតែទៅស្ដាំ ឬឡើងលើ ត្រូវប្រើចំនួនជំហានទៅស្ដាំដូចគ្នា និងចំនួនជំហានឡើងលើដូចគ្នា ទោះរៀបលំដាប់បែបណាក៏ដោយ។ ដូច្នេះប្រវែងសរុប គឺជាផលបូកនៃចម្ងាយផ្ដេក និងចម្ងាយឈរ ដែលមិនអាស្រ័យលើផ្លូវឡើយ។<br><b>ការផ្ដល់ពិន្ទុ៖</b> ពិន្ទុពេញ បើពន្យល់បានថាចំនួនជំហានផ្ដេក និងឈរ ថេរជានិច្ច។',
      },
      u6q2: {
        label: 'សំណួរ ២', format: 'សំណួរចម្លើយឆ្លាស់ (ពិត/មិនពិត និងហេតុផល)', max: 1,
        parts: ['t1', 'w1', 't2', 'w2', 't3', 'w3'].map((k) => ({ k })),
        summary: (r) => [1, 2, 3].map((i) => PISA.km(i) + '. ' + (TF_TEXT[r['t' + i]] || '—') + ' — ' + (r['w' + i] || '—')).join(' | '),
        score: (r) => (r.t1 === 'F' && r.t2 === 'F' && r.t3 === 'T'
          ? { pts: null, note: 'ពិត/មិនពិត ត្រឹមត្រូវទាំងបី — គ្រូត្រូវអានហេតុផល' }
          : { pts: 0, note: 'ពិត/មិនពិត មិនត្រឹមត្រូវទាំងបី' }),
        key: '<b>មិនពិត / មិនពិត / ពិត</b>។ ផ្លូវខ្លីជាងគេដោយគ្មានផ្លូវទ្រេត គឺ ៧ ឯកតា (៥ ទៅស្ដាំ និង ២ ឡើងលើ) ហើយផ្លូវទ្រេតមួយជំនួសជំហានពីរឯកតាដោយ ១.៤១ ឯកតា។<br>' +
          '<b>ផ្លូវទ្រេតទី ១៖</b> ទ្រេតបញ្ច្រាស គឺចុះពីលើឆ្វេងមកក្រោមស្ដាំ ដូច្នេះត្រូវឡើងលើសិន រួចចុះក្រោមវិញ៖ ២ + ១.៤១ + ៥ ស្មើប្រមាណ ៨.៤១ ឯកតា។<br>' +
          '<b>ផ្លូវទ្រេតទី ២៖</b> ស្ថិតក្រោមជួរដេករបស់ C ដូច្នេះត្រូវចុះក្រោមមួយឯកតាសិន ទើបឡើងវិញ៖ ៤ + ១.៤១ + ៣ ស្មើប្រមាណ ៨.៤១ ឯកតា។<br>' +
          '<b>ផ្លូវទ្រេតទី ៣៖</b> ស្ថិតនៅលើផ្លូវខ្លីជាងគេស្រាប់៖ ១ + ១.៤១ + ៤ ស្មើប្រមាណ ៦.៤១ ឯកតា គឺខ្លីជាង ៧។',
      },
    },
    screens: [
      {
        tag: 'សេចក្ដីណែនាំ', split: 41,
        left: () => W.instr('សូមអានសេចក្ដីណែនាំ រួចចុចសញ្ញាព្រួញ «បន្ទាប់»។'),
        right: () => W.stack(
          W.p('ចម្ងាយខ្លីជាងគេរវាងចំណុចពីរ គឺបន្ទាត់ត្រង់។ ប៉ុន្តែក្នុងទីក្រុង យើងជាធម្មតាមិនអាចធ្វើដំណើរតាមបន្ទាត់ត្រង់បានទេ។ សូមមើលផែនទីខាងក្រោម៖ បន្ទាត់ពណ៌ប្រផេះជាផ្លូវ រីឯប្លុកការេពណ៌ខៀវជាអគារ។'),
          W.p('ក្នុងផ្នែកនេះ អ្នកនឹងស្វែងយល់ពីយុទ្ធសាស្ត្រផ្សេងៗ ក្នុងការគ្រោងផ្លូវពីចំណុចមួយទៅចំណុចមួយទៀតក្នុងទីក្រុងនេះ។'),
          h('div', { class: 'map-holder' }, cityMap({ u: 60, A: A0, B: B0 }))),
      },
      {
        tag: 'សេចក្ដីណែនាំ (បន្ត)', split: 41,
        left: () => W.instr(INSTR_TABS),
        right: (ctx) => W.stack(
          h('div', { html: STRATEGIES }),
          W.tabs(ctx, 'u6-routes', ['ann', 'bob', 'corey'].map((k) => ({
            label: 'ផ្លូវរបស់' + NAMES[k],
            color: COLORS[k],
            light: { ann: '#D3E6CF', bob: '#F8E0C7', corey: '#E3D1EE' }[k],
            render: () => h('div', { class: 'map-holder sm' }, cityMap({ u: 56, A: A0, B: B0, line: true, routes: [k] })),
          })))),
      },
      {
        tag: 'សំណួរ ១ / ២', split: 41, items: ['u6q1'],
        left: (ctx) => W.stack(
          W.p('សូមប្រើកូនកណ្ដុរ អូសចំណុច A ទៅកាន់ចំណុចប្រសព្វផ្លូវផ្សេងៗ ដែលមានសញ្ញា។ សម្រាប់ទីតាំងនីមួយៗរបស់ A ផ្លូវរបស់យុទ្ធសាស្ត្រនីមួយៗនឹងបង្ហាញឡើង ហើយចម្ងាយត្រូវបានកត់ត្រាក្នុងតារាង។'),
          W.p('អ្នកនឹងសម្គាល់ឃើញថា ទោះជាចាប់ផ្ដើមពីទីតាំងណាក៏ដោយ ផ្លូវរបស់អាន់ បប់ និងខូរី សុទ្ធតែមានប្រវែងស្មើគ្នា។'),
          W.p('<b>សូមពន្យល់ថា ហេតុអ្វីយុទ្ធសាស្ត្រទាំងបីបង្កើតបានផ្លូវប្រវែងស្មើគ្នា។</b>', 'q'),
          W.textarea(ctx, 'u6q1', 'why', 'សូមផ្ដល់ការពន្យល់', 6),
          h('p', { class: 'hint' }, 'អាចចុចលើចំណុចលេខ ១ ដល់ ៤ ជំនួសការអូសក៏បាន។')),
        right: q1Explorer,
      },
      {
        tag: 'សំណួរ ២ / ២', split: 43, items: ['u6q2'],
        left: (ctx) => W.stack(
          W.p('មានផ្លូវទ្រេតបីត្រូវបានបន្ថែមទៅលើផែនទី។'),
          W.p('ពីការសិក្សាខាងលើ យើងដឹងថា បើគ្មានផ្លូវទ្រេត ផ្លូវខ្លីជាងគេពីចំណុច C ទៅ B មានប្រវែង ៧ ឯកតា។'),
          W.instr('សូមចុច «ពិត» ឬ «មិនពិត» ហើយផ្ដល់ហេតុផល។'),
          ...[1, 2, 3].map((i) => h('div', { class: 'tf-reason' },
            W.p(PISA.km(i) + '. មានផ្លូវពី C ទៅ B ដែលឆ្លងកាត់<b>ផ្លូវទ្រេតទី ' + PISA.km(i) + '</b> ហើយខ្លីជាង ៧ ឯកតា។', 'q'),
            W.radios(ctx, 'u6q2', 't' + i, TF, { inline: true }),
            W.textarea(ctx, 'u6q2', 'w' + i, 'សូមផ្ដល់ហេតុផល', 2)))),
        right: () => W.stack(
          W.p('មានផ្លូវទ្រេតបីត្រូវបានបន្ថែមទៅលើផែនទី។'),
          h('div', { class: 'map-holder' }, cityMap({ u: 64, A: { x: 0, y: 1 }, B: { x: 5, y: 3 }, aLabel: 'C', line: true, diags: DIAGS, unitMarks: 'bottom' }))),
      },
    ],
  });
})();
