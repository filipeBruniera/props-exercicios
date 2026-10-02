/* Mola — mascote da M&C Desentupidora
   É a máquina desentupidora rotativa da logo, com vida: a face do tambor vira o rosto
   (anel laranja em volta), o cabo-mola faz os braços e as luvas são laranja. Motor azul
   com tampa laranja em cima, alça do carrinho atrás, pé laranja e roda que gira.
   Rig em SVG, animado com GSAP quando disponível (sem GSAP, desenha parado). */
(function (root) {
  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  var C = {
    blue: '#004BA9', deep: '#002B63', orange: '#F2680C', orangeShade: '#C4530A',
    metal: '#F4F6F8', metal2: '#D3DAE2', metal3: '#9AA8B8', white: '#ffffff'
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

  function tube(d, w, parent, cls) {
    var g = el('g', cls ? { class: cls } : {}, parent);
    el('path', { d: d, fill: 'none', stroke: C.deep, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    el('path', { d: d, fill: 'none', stroke: C.blue, 'stroke-width': w - 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }

  function wheel(x, y, r, parent) {
    var g = el('g', { class: 'ml-wheel', transform: 'translate(' + x + ',' + y + ')' }, parent);
    var spin = el('g', {}, g);
    el('circle', { r: r, fill: C.deep }, spin);
    el('circle', { r: r - 4, fill: 'none', stroke: C.blue, 'stroke-width': 2, 'stroke-dasharray': '3 4' }, spin);
    el('circle', { r: r * .62, fill: C.orange, stroke: C.deep, 'stroke-width': 3 }, spin);
    el('rect', { x: -2, y: -r * .58, width: 4, height: r * 1.16, rx: 2, fill: C.orangeShade }, spin); // raio: mostra o giro
    el('circle', { r: r * .26, fill: C.deep }, spin);
    el('circle', { cx: -2, cy: -2, r: 2.6, fill: C.metal }, spin);
    return spin;
  }

  var FACE = { cx: 120, cy: 186, r: 100 };

  function create(container, opts) {
    opts = opts || {};
    var id = 'ml' + (++uid);
    var svg = el('svg', { viewBox: '-70 -64 380 400', class: 'mola', role: 'img', 'aria-label': opts.label || 'Mola, o mascote da M&C Desentupidora' });
    var defs = el('defs', {}, svg);
    var gm = el('linearGradient', { id: id + 'm', x1: '.1', y1: '0', x2: '.9', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ffffff' }, gm);
    el('stop', { offset: '1', 'stop-color': C.metal2 }, gm);
    var go = el('linearGradient', { id: id + 'o', x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ff8a3d' }, go);
    el('stop', { offset: '1', 'stop-color': C.orange }, go);

    var rig = el('g', { class: 'ml-rig' }, svg);
    var shadow = el('ellipse', { cx: 126, cy: 322, rx: 96, ry: 10, fill: '#000', opacity: .22, class: 'ml-shadow' }, rig);
    var bodyG = el('g', { class: 'ml-body' }, rig);

    // Atrás: alça do carrinho, roda traseira e motor com tampa laranja
    tube('M184,300 L222,40 Q228,14 252,20 Q274,26 268,52 L232,300', 14, bodyG);
    var wheelBack = wheel(232, 300, 22, bodyG);
    var motor = el('g', { class: 'ml-motor' }, bodyG);
    el('rect', { x: 140, y: 44, width: 86, height: 70, rx: 16, fill: C.blue, stroke: C.deep, 'stroke-width': 5 }, motor);
    [62, 76, 90].forEach(function (y) { el('path', { d: 'M184,' + y + ' H214', stroke: C.metal2, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: .85 }, motor); });
    var cap = el('rect', { x: 176, y: 24, width: 28, height: 24, rx: 7, fill: 'url(#' + id + 'o)', stroke: C.deep, 'stroke-width': 4 }, motor);

    // Base: tubo até o pé laranja
    tube('M40,306 L130,296 L232,300', 13, bodyG);
    el('rect', { x: 22, y: 296, width: 30, height: 20, rx: 8, fill: C.orange, stroke: C.deep, 'stroke-width': 4 }, bodyG);

    // Braços (cabo-mola) atrás do tambor
    function arm(side) {
      var sx = side < 0 ? 34 : 206, g = el('g', { class: 'ml-arm', transform: 'translate(' + sx + ',198)' }, bodyG);
      var inner = el('g', {}, g);
      var d = 'M0,0 Q' + (side * 14) + ',34 ' + (side * 8) + ',64';
      el('path', { d: d, fill: 'none', stroke: C.deep, 'stroke-width': 15, 'stroke-linecap': 'round' }, inner);
      el('path', { d: d, fill: 'none', stroke: C.metal, 'stroke-width': 9, 'stroke-dasharray': '3 4' }, inner);
      el('rect', { x: side * 8 - 10, y: 58, width: 20, height: 10, rx: 3, fill: C.metal2, stroke: C.deep, 'stroke-width': 3 }, inner);
      el('circle', { cx: side * 8, cy: 80, r: 15, fill: 'url(#' + id + 'o)', stroke: C.deep, 'stroke-width': 3.5 }, inner);
      el('path', { d: 'M' + (side * 8 - 8) + ',74 h16', stroke: C.orangeShade, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, inner);
      return { g: g, inner: inner, sx: sx };
    }
    var armL = arm(-1), armR = arm(1);

    // Desentupidor (pose "pronto"), preso à mão direita
    var prop = el('g', { class: 'ml-prop', opacity: 0, transform: 'translate(8,80)' }, armR.inner);
    el('rect', { x: -4, y: -12, width: 8, height: 92, rx: 4, fill: '#c98a3d' }, prop);
    el('path', { d: 'M-24,80 q24,38 48,0 z', fill: '#c0392b' }, prop);
    el('rect', { x: -26, y: 76, width: 52, height: 7, rx: 3.5, fill: '#962d22' }, prop);

    // Tambor: corpo (profundidade) e face
    el('ellipse', { cx: FACE.cx + 26, cy: FACE.cy - 2, rx: FACE.r - 6, ry: FACE.r - 2, fill: C.metal2, stroke: C.deep, 'stroke-width': 6 }, bodyG);
    el('circle', { cx: FACE.cx, cy: FACE.cy, r: FACE.r, fill: 'url(#' + id + 'm)', stroke: C.deep, 'stroke-width': 6 }, bodyG);
    var ring = el('g', { class: 'ml-ring', transform: 'translate(' + FACE.cx + ',' + FACE.cy + ')' }, bodyG);
    el('circle', { r: 86, fill: C.white, stroke: C.orange, 'stroke-width': 11 }, ring);
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4;
      el('circle', { cx: (86 * Math.cos(a)).toFixed(2), cy: (86 * Math.sin(a)).toFixed(2), r: 3.2, fill: C.deep }, ring);
    }
    el('circle', { cx: FACE.cx, cy: FACE.cy, r: 72, fill: 'none', stroke: C.metal2, 'stroke-width': 2.5 }, bodyG);
    el('path', { d: 'M52,140 Q60,112 86,96', fill: 'none', stroke: C.white, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: .9 }, bodyG);

    // Roda dianteira (na frente)
    var wheelFront = wheel(214, 298, 30, bodyG);

    // Rosto
    var face = el('g', { class: 'ml-face' }, bodyG);
    var blushL = el('ellipse', { cx: 70, cy: 204, rx: 13, ry: 7, fill: '#ff7a6b', opacity: .45 }, face);
    var blushR = el('ellipse', { cx: 170, cy: 204, rx: 13, ry: 7, fill: '#ff7a6b', opacity: .45 }, face);
    function eye(cx) {
      var g = el('g', { class: 'ml-eye', transform: 'translate(' + cx + ',176)' }, face);
      var open = el('g', {}, g);
      var lid = el('g', {}, open); // só o piscar mexe aqui; o tamanho da expressão fica em "open"
      el('ellipse', { cx: 0, cy: 0, rx: 15, ry: 18, fill: '#fff', stroke: C.deep, 'stroke-width': 2.5 }, lid);
      var pupil = el('g', {}, lid);
      el('circle', { cx: 0, cy: 3, r: 9, fill: C.deep }, pupil);
      el('circle', { cx: 3.5, cy: -1, r: 3.2, fill: '#fff' }, pupil);
      var closed = el('path', { d: 'M-13,2 Q0,-10 13,2', fill: 'none', stroke: C.deep, 'stroke-width': 4.5, 'stroke-linecap': 'round', opacity: 0 }, g);
      return { g: g, open: open, lid: lid, pupil: pupil, closed: closed };
    }
    var eL = eye(94), eR = eye(146);
    var brL = el('path', { d: 'M80,148 Q94,140 108,148', fill: 'none', stroke: C.deep, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
    var brR = el('path', { d: 'M132,148 Q146,140 160,148', fill: 'none', stroke: C.deep, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
    var mouth = el('path', { d: '', fill: C.deep, stroke: C.deep, 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, face);
    var mClip = el('clipPath', { id: id + 'c' }, defs);
    var mClipPath = el('path', { d: '' }, mClip);
    var tongue = el('ellipse', { cx: 120, cy: 228, rx: 9, ry: 6, fill: '#ff7a6b', opacity: 0, 'clip-path': 'url(#' + id + 'c)' }, face);

    // Faísca laranja (o brilho de "resolvido")
    var spark = el('g', { class: 'ml-spark', transform: 'translate(-8,40)' }, rig);
    el('path', { d: 'M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z', fill: C.orange }, spark);

    container.appendChild(svg);

    var state = { expr: 'feliz', pose: 'parado' };
    var G = root.gsap;
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function applyExpr(name) {
      var e = EXPR[name] || EXPR.feliz;
      state.expr = name;
      var md = mouthPath(e);
      mouth.setAttribute('d', md);
      mClipPath.setAttribute('d', md);
      tongue.setAttribute('opacity', e.open > 6 ? .9 : 0);
      tongue.setAttribute('cy', 214 + (e.smile + e.open * 2) / 2 - 2); // fundo real da curva da boca; o clip mantém dentro
      brL.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browL + ' 94 146)');
      brR.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browR + ' 146 146)');
      [blushL, blushR].forEach(function (b) { b.setAttribute('opacity', e.blush); });
      [eL, eR].forEach(function (E) {
        E.open.setAttribute('opacity', e.closed ? 0 : 1);
        E.closed.setAttribute('opacity', e.closed ? 1 : 0);
        E.open.setAttribute('transform', 'scale(' + e.eyeS + ')');
      });
    }

    function drawArm(a) { a.g.setAttribute('transform', 'translate(' + a.sx + ',198) rotate(' + a.p.r + ')'); }
    function setRot(a, deg, instant) {
      if (!a.p) a.p = { r: deg };
      if (G && !instant && !reduce) {
        G.to(a.p, { r: deg, duration: .45, ease: 'back.out(1.6)', overwrite: true, onUpdate: function () { drawArm(a); } });
      } else {
        if (G) G.killTweensOf(a.p);
        a.p.r = deg; drawArm(a);
      }
    }

    function applyPose(name, instant) {
      var p = POSES[name] || POSES.parado;
      state.pose = name;
      setRot(armL, p.armL, instant);
      setRot(armR, p.armR, instant);
      if (G && !instant && !reduce) G.to(prop, { opacity: p.prop, duration: .2 });
      else prop.setAttribute('opacity', p.prop);
    }

    applyExpr(opts.expr || 'feliz');
    applyPose(opts.pose || 'parado', true);

    function spinWheels(turns, dur) {
      if (!G || reduce) return;
      G.to([wheelFront, wheelBack], { rotation: '+=' + (turns * 360), svgOrigin: '0 0', duration: dur, ease: 'power2.inOut' });
    }

    var party = null; // { timer, e, p } enquanto comemora
    function stopParty() { if (party) { clearTimeout(party.timer); party = null; } }

    var api = {
      svg: svg,
      setExpr: function (n) { stopParty(); applyExpr(n); return api; },
      setPose: function (n) { stopParty(); applyPose(n); return api; },
      set: function (expr, pose) { stopParty(); applyExpr(expr); applyPose(pose); return api; },
      lookAt: function (dx, dy) {
        var x = Math.max(-1, Math.min(1, dx)) * 5, y = Math.max(-1, Math.min(1, dy)) * 4;
        [eL, eR].forEach(function (E) { E.pupil.setAttribute('transform', 'translate(' + x + ',' + y + ')'); });
      },
      blink: function () {
        if (!G || reduce || EXPR[state.expr].closed) return;
        G.fromTo([eL.lid, eR.lid], { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: .1, duration: .07, yoyo: true, repeat: 1, ease: 'power1.in', overwrite: true });
      },
      roll: function () { spinWheels(1, .9); }, // roda gira (usado quando a Mola "anda")
      jump: function () {
        if (!G || reduce) return;
        G.timeline()
          .to(bodyG, { scaleY: .92, scaleX: 1.05, transformOrigin: '50% 100%', duration: .12, ease: 'power2.in' })
          .to(bodyG, { y: -40, scaleY: 1.05, scaleX: .97, duration: .28, ease: 'power2.out' })
          .to(shadow, { scale: .7, opacity: .12, transformOrigin: '50% 50%', duration: .28 }, '<')
          .to(bodyG, { y: 0, scaleY: 1, scaleX: 1, duration: .32, ease: 'bounce.out' })
          .to(shadow, { scale: 1, opacity: .22, duration: .32 }, '<');
      },
      celebrate: function () {
        // Guarda o estado de antes só na primeira chamada; cliques seguidos só estendem a festa
        var prev = party ? { e: party.e, p: party.p } : { e: state.expr, p: state.pose };
        if (party) clearTimeout(party.timer);
        applyExpr('comemorando'); applyPose('comemorando'); api.jump();
        if (G && !reduce) {
          G.to(ring, { rotation: '+=180', svgOrigin: '0 0', duration: .8, ease: 'power3.out' });
          G.fromTo(cap, { y: 0 }, { y: -10, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out' });
          G.fromTo(spark, { scale: 1, rotate: 0, transformOrigin: '50% 50%' }, { scale: 1.9, rotate: 90, duration: .35, yoyo: true, repeat: 1, ease: 'back.out(2)' });
        }
        party = { e: prev.e, p: prev.p, timer: setTimeout(function () { party = null; applyExpr(prev.e); applyPose(prev.p); }, 1500) };
      }
    };

    if (G && !reduce && opts.idle !== false) {
      // Ociosa: o anel do tambor gira devagar (a máquina "ligada"), corpo respira, faísca flutua
      G.to(ring, { rotation: 360, svgOrigin: '0 0', duration: 14, repeat: -1, ease: 'none' });
      G.to(spark, { y: -10, rotate: 20, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' });
      G.to(bodyG, { y: -3, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
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

  root.Mola = { create: create, EXPR: EXPR, POSES: POSES };
})(window);
