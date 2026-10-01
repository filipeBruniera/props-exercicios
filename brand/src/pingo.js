/* Pingo — mascote da M&C Desentupidora
   Corpo = uma gota d'água (a água que volta a correr), capacete amarelo de obra,
   macacão marinho com a etiqueta M&C e luvas amarelas. O elemento vivo é a faísca
   amarela que flutua perto do capacete. Rig em SVG, animado com GSAP quando disponível. */
(function (root) {
  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  var C = {
    water1: '#7cc0ff', water2: '#3b8cff', water3: '#1257c9', waterDeep: '#0b3a8f',
    yellow: '#ffc400', yellowShade: '#d9a300', navy: '#0b2545', ink: '#0d1b2a', white: '#ffffff'
  };

  var EXPR = {
    feliz:       { smile: 13, open: 5,  w: 34, tilt: 0,  browL: -6,  browR: 6,   browY: 0,  eyeS: 1,    closed: 0, blush: .5 },
    sorriso:     { smile: 11, open: 0,  w: 28, tilt: 0,  browL: -4,  browR: 4,   browY: 0,  eyeS: 1,    closed: 0, blush: .35 },
    surpreso:    { smile: 0,  open: 9,  w: 15, tilt: 0,  browL: -2,  browR: 2,   browY: -9, eyeS: 1.14, closed: 0, blush: .2 },
    concentrado: { smile: 2,  open: 0,  w: 20, tilt: 2,  browL: 12,  browR: -12, browY: 3,  eyeS: .8,   closed: 0, blush: .15 },
    comemorando: { smile: 15, open: 11, w: 40, tilt: 0,  browL: -10, browR: 10,  browY: -6, eyeS: 1,    closed: 1, blush: .65 },
    duvida:      { smile: 3,  open: 0,  w: 22, tilt: -5, browL: -12, browR: 8,   browY: -3, eyeS: 1,    closed: 0, blush: .2 }
  };

  var POSES = {
    parado:      { armL: 10,   armR: -10,  prop: 0 },
    acenando:    { armL: 10,   armR: -128, prop: 0 },
    apontando:   { armL: 12,   armR: -68,  prop: 0 },
    comemorando: { armL: 122,  armR: -122, prop: 0 },
    pensando:    { armL: -118, armR: -8,   prop: 0 },
    mostrando:   { armL: 46,   armR: -46,  prop: 0 },
    pronto:      { armL: 12,   armR: -150, prop: 1 }
  };

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function mouthPath(m) {
    var L = 120 - m.w / 2, R = 120 + m.w / 2, cy = 214;
    var top = cy + m.smile, bot = cy + m.smile + m.open * 2;
    return 'M' + L + ',' + (cy - m.tilt) + ' Q120,' + top + ' ' + R + ',' + (cy + m.tilt) +
      ' Q120,' + bot + ' ' + L + ',' + (cy - m.tilt) + ' Z';
  }

  var DROP = 'M120,14 C150,64 222,112 222,192 A102,102 0 0 1 18,192 C18,112 90,64 120,14 Z';

  function create(container, opts) {
    opts = opts || {};
    var id = 'pg' + (++uid);
    var svg = el('svg', { viewBox: '-70 -64 380 400', class: 'pingo', role: 'img', 'aria-label': opts.label || 'Pingo, o mascote da M&C Desentupidora' });
    var defs = el('defs', {}, svg);
    var gb = el('linearGradient', { id: id + 'b', x1: '.15', y1: '0', x2: '.85', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': C.water1 }, gb);
    el('stop', { offset: '.48', 'stop-color': C.water2 }, gb);
    el('stop', { offset: '1', 'stop-color': C.water3 }, gb);
    var gh = el('radialGradient', { id: id + 'h', cx: '.32', cy: '.3', r: '.5' }, defs);
    el('stop', { offset: '0', 'stop-color': '#fff', 'stop-opacity': '.7' }, gh);
    el('stop', { offset: '.55', 'stop-color': '#fff', 'stop-opacity': '.08' }, gh);
    el('stop', { offset: '1', 'stop-color': '#fff', 'stop-opacity': '0' }, gh);
    var gy = el('linearGradient', { id: id + 'y', x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ffd84d' }, gy);
    el('stop', { offset: '1', 'stop-color': C.yellow }, gy);
    var clip = el('clipPath', { id: id + 'c' }, defs);
    el('path', { d: DROP }, clip);

    var rig = el('g', { class: 'pg-rig' }, svg);
    var shadow = el('ellipse', { cx: 120, cy: 318, rx: 74, ry: 10, fill: '#000', opacity: .22, class: 'pg-shadow' }, rig);
    var bodyG = el('g', { class: 'pg-body' }, rig);

    // Pernas e botinas
    [[96, -1], [144, 1]].forEach(function (p) {
      el('rect', { x: p[0] - 7, y: 278, width: 14, height: 22, rx: 6, fill: C.waterDeep }, bodyG);
      el('path', { d: 'M' + (p[0] - 16) + ',306 q0,-14 14,-14 h6 q14,0 16,14 z', fill: '#2b4569', stroke: '#4d6b96', 'stroke-width': 1.5 }, bodyG);
      el('rect', { x: p[0] - 16, y: 304, width: 36, height: 5, rx: 2.5, fill: C.yellow }, bodyG);
    });

    // Braços atrás do corpo (ombros nas laterais)
    function arm(side) {
      var sx = side < 0 ? 34 : 206, g = el('g', { class: 'pg-arm', transform: 'translate(' + sx + ',198)' }, bodyG);
      var inner = el('g', {}, g);
      el('path', { d: 'M0,0 Q' + (side * 14) + ',34 ' + (side * 8) + ',64', fill: 'none', stroke: C.water3, 'stroke-width': 17, 'stroke-linecap': 'round' }, inner);
      el('path', { d: 'M0,0 Q' + (side * 14) + ',34 ' + (side * 8) + ',64', fill: 'none', stroke: C.water2, 'stroke-width': 10, 'stroke-linecap': 'round' }, inner);
      el('rect', { x: side * 8 - 11, y: 60, width: 22, height: 8, rx: 3, fill: C.yellowShade }, inner);
      el('circle', { cx: side * 8, cy: 78, r: 14, fill: 'url(#' + id + 'y)' }, inner);
      el('path', { d: 'M' + (side * 8 - 9) + ',72 h18', stroke: C.yellowShade, 'stroke-width': 2, 'stroke-linecap': 'round' }, inner);
      return { g: g, inner: inner, sx: sx };
    }
    var armL = arm(-1), armR = arm(1);

    // Desentupidor (pose "pronto"), preso à mão direita
    var prop = el('g', { class: 'pg-prop', opacity: 0, transform: 'translate(8,78)' }, armR.inner);
    el('rect', { x: -4, y: -12, width: 8, height: 92, rx: 4, fill: '#c98a3d' }, prop);
    el('path', { d: 'M-24,80 q24,38 48,0 z', fill: '#c0392b' }, prop);
    el('rect', { x: -26, y: 76, width: 52, height: 7, rx: 3.5, fill: '#962d22' }, prop);

    // Corpo-gota
    el('path', { d: DROP, fill: 'url(#' + id + 'b)' }, bodyG);
    var bodyClip = el('g', { 'clip-path': 'url(#' + id + 'c)' }, bodyG);
    // Macacão marinho
    el('path', { d: 'M10,236 Q120,224 230,236 V320 H10 Z', fill: C.navy }, bodyClip);
    el('path', { d: 'M18,240 Q120,229 222,240', fill: 'none', stroke: '#2a4a7a', 'stroke-width': 2, 'stroke-dasharray': '5 5' }, bodyClip);
    // Etiqueta M&C no peito
    var tag = el('g', { transform: 'translate(120,262)' }, bodyClip);
    el('path', { d: 'M-20,-11 H24 L20,11 H-24 Z', fill: C.yellow }, tag);
    el('text', { x: 0, y: 6, 'text-anchor': 'middle', 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif', 'font-weight': 800, 'font-size': 15, fill: C.ink }, tag).textContent = 'M&C';
    // Brilho e reflexo
    el('path', { d: DROP, fill: 'url(#' + id + 'h)' }, bodyG);
    el('path', { d: 'M62,150 Q70,112 98,86', fill: 'none', stroke: '#fff', 'stroke-opacity': .55, 'stroke-width': 7, 'stroke-linecap': 'round' }, bodyG);
    el('circle', { cx: 58, cy: 168, r: 4.5, fill: '#fff', opacity: .6 }, bodyG);
    el('path', { d: DROP, fill: 'none', stroke: '#fff', 'stroke-opacity': .35, 'stroke-width': 2.5 }, bodyG);

    // Rosto
    var face = el('g', { class: 'pg-face' }, bodyG);
    var blushL = el('ellipse', { cx: 70, cy: 204, rx: 13, ry: 7, fill: '#ff7a6b', opacity: .45 }, face);
    var blushR = el('ellipse', { cx: 170, cy: 204, rx: 13, ry: 7, fill: '#ff7a6b', opacity: .45 }, face);
    function eye(cx) {
      var g = el('g', { class: 'pg-eye', transform: 'translate(' + cx + ',176)' }, face);
      var open = el('g', {}, g);
      el('ellipse', { cx: 0, cy: 0, rx: 15, ry: 18, fill: '#fff' }, open);
      var pupil = el('g', {}, open);
      el('circle', { cx: 0, cy: 3, r: 9, fill: C.navy }, pupil);
      el('circle', { cx: 3.5, cy: -1, r: 3.2, fill: '#fff' }, pupil);
      var closed = el('path', { d: 'M-13,2 Q0,-10 13,2', fill: 'none', stroke: C.navy, 'stroke-width': 4.5, 'stroke-linecap': 'round', opacity: 0 }, g);
      return { g: g, open: open, pupil: pupil, closed: closed };
    }
    var eL = eye(94), eR = eye(146);
    var brL = el('path', { d: 'M80,148 Q94,140 108,148', fill: 'none', stroke: C.navy, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
    var brR = el('path', { d: 'M132,148 Q146,140 160,148', fill: 'none', stroke: C.navy, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
    var mouth = el('path', { d: '', fill: C.navy, stroke: C.navy, 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, face);
    var tongue = el('ellipse', { cx: 120, cy: 228, rx: 7, ry: 4, fill: '#ff7a6b', opacity: 0 }, face);

    // Capacete de obra
    var helmet = el('g', { class: 'pg-helmet', transform: 'rotate(-6 120 52)' }, bodyG);
    el('path', { d: 'M64,64 Q64,-8 120,-10 Q176,-8 176,64 Z', fill: 'url(#' + id + 'y)' }, helmet);
    el('path', { d: 'M110,-9 h20 v70 h-20 z', fill: C.yellowShade, opacity: .55 }, helmet);
    el('rect', { x: 46, y: 58, width: 148, height: 14, rx: 7, fill: C.yellow }, helmet);
    el('rect', { x: 46, y: 66, width: 148, height: 6, rx: 3, fill: C.yellowShade }, helmet);
    el('path', { d: 'M80,30 Q86,8 104,2', fill: 'none', stroke: '#fff', 'stroke-opacity': .7, 'stroke-width': 5, 'stroke-linecap': 'round' }, helmet);

    // Faísca viva (o "pingo" amarelo)
    var spark = el('g', { class: 'pg-spark', transform: 'translate(214,6)' }, rig);
    el('path', { d: 'M0,-15 L4,-4 L15,0 L4,4 L0,15 L-4,4 L-15,0 L-4,-4 Z', fill: C.yellow }, spark);

    container.appendChild(svg);

    var state = { expr: 'feliz', pose: 'parado' };
    var G = root.gsap;
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function applyExpr(name, instant) {
      var e = EXPR[name] || EXPR.feliz;
      state.expr = name;
      mouth.setAttribute('d', mouthPath(e));
      tongue.setAttribute('opacity', e.open > 6 ? .9 : 0);
      tongue.setAttribute('cy', 214 + e.smile + e.open * 1.2);
      brL.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browL + ' 94 146)');
      brR.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browR + ' 146 146)');
      [blushL, blushR].forEach(function (b) { b.setAttribute('opacity', e.blush); });
      [eL, eR].forEach(function (E) {
        E.open.setAttribute('opacity', e.closed ? 0 : 1);
        E.closed.setAttribute('opacity', e.closed ? 1 : 0);
        E.open.setAttribute('transform', 'scale(' + e.eyeS + ')');
      });
    }

    function setRot(a, deg, instant) {
      var t = 'translate(' + a.sx + ',198) rotate(' + deg + ')';
      if (G && !instant && !reduce) {
        var o = { r: a.r || 0 };
        G.to(o, { r: deg, duration: .45, ease: 'back.out(1.6)', onUpdate: function () { a.g.setAttribute('transform', 'translate(' + a.sx + ',198) rotate(' + o.r + ')'); } });
      } else a.g.setAttribute('transform', t);
      a.r = deg;
    }

    function applyPose(name, instant) {
      var p = POSES[name] || POSES.parado;
      state.pose = name;
      setRot(armL, p.armL, instant);
      setRot(armR, p.armR, instant);
      if (G && !instant && !reduce) G.to(prop, { opacity: p.prop, duration: .2 });
      else prop.setAttribute('opacity', p.prop);
    }

    applyExpr(opts.expr || 'feliz', true);
    applyPose(opts.pose || 'parado', true);

    var api = {
      svg: svg,
      setExpr: function (n) { applyExpr(n); return api; },
      setPose: function (n) { applyPose(n); return api; },
      set: function (expr, pose) { applyExpr(expr); applyPose(pose); return api; },
      lookAt: function (dx, dy) {
        var x = Math.max(-1, Math.min(1, dx)) * 5, y = Math.max(-1, Math.min(1, dy)) * 4;
        [eL, eR].forEach(function (E) { E.pupil.setAttribute('transform', 'translate(' + x + ',' + y + ')'); });
      },
      blink: function () {
        if (!G || reduce || EXPR[state.expr].closed) return;
        G.fromTo([eL.open, eR.open], { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: .1, duration: .07, yoyo: true, repeat: 1, ease: 'power1.in' });
      },
      jump: function () {
        if (!G || reduce) return;
        G.timeline()
          .to(bodyG, { scaleY: .9, scaleX: 1.06, transformOrigin: '50% 100%', duration: .12, ease: 'power2.in' })
          .to(bodyG, { y: -46, scaleY: 1.06, scaleX: .96, duration: .28, ease: 'power2.out' })
          .to(shadow, { scale: .7, opacity: .12, transformOrigin: '50% 50%', duration: .28 }, '<')
          .to(bodyG, { y: 0, scaleY: 1, scaleX: 1, duration: .32, ease: 'bounce.out' })
          .to(shadow, { scale: 1, opacity: .22, duration: .32 }, '<');
      },
      celebrate: function () {
        var prev = { e: state.expr, p: state.pose };
        applyExpr('comemorando'); applyPose('comemorando'); api.jump();
        if (G && !reduce) G.fromTo(spark, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.9, rotate: 90, duration: .35, yoyo: true, repeat: 1, ease: 'back.out(2)' });
        setTimeout(function () { applyExpr(prev.e); applyPose(prev.p); }, 1500);
      }
    };

    if (G && !reduce && opts.idle !== false) {
      G.to(spark, { y: -10, rotate: 20, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' });
      G.to(bodyG, { y: -4, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      (function loop() { setTimeout(function () { api.blink(); loop(); }, 2400 + Math.random() * 2600); })();
    }
    if (opts.follow) {
      root.addEventListener('pointermove', function (ev) {
        var r = svg.getBoundingClientRect();
        api.lookAt((ev.clientX - (r.left + r.width / 2)) / (root.innerWidth / 2), (ev.clientY - (r.top + r.height / 2)) / (root.innerHeight / 2));
      }, { passive: true });
    }
    if (opts.clickable !== false) svg.addEventListener('click', function () { api.celebrate(); });
    return api;
  }

  root.Pingo = { create: create, EXPR: EXPR, POSES: POSES };
})(window);
