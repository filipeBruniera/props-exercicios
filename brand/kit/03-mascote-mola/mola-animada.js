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

  // lean: inclinação leve (graus) que dá energia às poses de ação; compact: só o rosto (tamanho pequeno)
  var POSES = {
    parado:      { armL: 10,   armR: -10,  prop: 0, lean: 0 },
    acenando:    { armL: 10,   armR: -128, prop: 0, lean: -3 },
    apontando:   { armL: 12,   armR: -68,  prop: 0, lean: 4 },
    comemorando: { armL: 122,  armR: -122, prop: 0, lean: 0 },
    pensando:    { armL: -118, armR: -8,   prop: 0, lean: -2 },
    mostrando:   { armL: 46,   armR: -46,  prop: 0, lean: 0 },
    pronto:      { armL: 12,   armR: -150, prop: 1, lean: 3 },
    rosto:       { armL: 10,   armR: -10,  prop: 0, lean: 0, compact: 1 }
  };

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  var MOUTH_Y = 218, MOUTH_K = 1.15; // boca 15% maior que a do Pingo
  function mouthPath(m) {
    var w = m.w * MOUTH_K, L = 120 - w / 2, R = 120 + w / 2, cy = MOUTH_Y;
    var top = cy + m.smile * MOUTH_K, bot = cy + (m.smile + m.open * 2) * MOUTH_K;
    return 'M' + L + ',' + (cy - m.tilt) + ' Q120,' + top + ' ' + R + ',' + (cy + m.tilt) +
      ' Q120,' + bot + ' ' + L + ',' + (cy - m.tilt) + ' Z';
  }

  var O = 12; // espessura extra do contorno branco (efeito adesivo)

  function tube(d, w, parent, outline) {
    var g = el('g', {}, parent);
    el('path', { d: d, fill: 'none', stroke: C.deep, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    el('path', { d: d, fill: 'none', stroke: C.blue, 'stroke-width': w - 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    if (outline) el('path', { d: d, fill: 'none', stroke: '#fff', 'stroke-width': w + O, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, outline);
    return g;
  }

  function wheel(x, y, r, parent) {
    var g = el('g', { class: 'ml-wheel', transform: 'translate(' + x + ',' + y + ')' }, parent);
    var spin = el('g', {}, g);
    el('circle', { r: r, fill: C.deep }, spin);
    el('circle', { r: r * .62, fill: C.orange, stroke: C.deep, 'stroke-width': 4 }, spin);
    el('rect', { x: -2.5, y: -r * .58, width: 5, height: r * 1.16, rx: 2.5, fill: C.orangeShade }, spin); // raio: mostra o giro
    el('circle', { r: r * .26, fill: C.deep }, spin);
    el('circle', { cx: -2, cy: -2, r: 2.6, fill: C.metal }, spin);
    return spin;
  }

  var FACE = { cx: 120, cy: 186, r: 100 };
  var HANDLE = 'M186,300 L222,40 Q228,14 252,20 Q274,26 268,52 L232,300';
  var BASE = 'M40,306 L130,298 L206,300';
  var SPRING = 'M188,24 q-12,-5 0,-11 q12,-5 0,-11 q-12,-5 0,-11 q12,-5 0,-11'; // "topete": cabo-mola em espiral

  function create(container, opts) {
    opts = opts || {};
    var id = 'ml' + (++uid);
    var svg = el('svg', { viewBox: '-70 -64 380 400', class: 'mola', role: 'img', 'aria-label': opts.label || 'Mola, a mascote da M&C Desentupidora' });
    var defs = el('defs', {}, svg);
    var gm = el('linearGradient', { id: id + 'm', x1: '.1', y1: '0', x2: '.9', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ffffff' }, gm);
    el('stop', { offset: '1', 'stop-color': '#e8edf2' }, gm);
    var go = el('linearGradient', { id: id + 'o', x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ff8a3d' }, go);
    el('stop', { offset: '1', 'stop-color': C.orange }, go);

    var rig = el('g', { class: 'ml-rig' }, svg);
    var shadow = el('ellipse', { cx: 126, cy: 324, rx: 96, ry: 10, fill: '#000', opacity: .22, class: 'ml-shadow ml-cart' }, rig);
    var leanG = el('g', { class: 'ml-lean' }, rig);
    var bodyG = el('g', { class: 'ml-body' }, leanG);

    // Contorno branco de tudo o que é fixo (fica atrás): destaca a Mola em qualquer fundo
    var outCart = el('g', { class: 'ml-outline ml-cart' }, bodyG);
    var outDrum = el('g', { class: 'ml-outline' }, bodyG);
    el('rect', { x: 140 - O / 2, y: 44 - O / 2, width: 86 + O, height: 70 + O, rx: 22, fill: '#fff' }, outCart);
    el('rect', { x: 176 - O / 2, y: 24 - O / 2, width: 28 + O, height: 24 + O, rx: 12, fill: '#fff' }, outCart);
    el('path', { d: SPRING, fill: 'none', stroke: '#fff', 'stroke-width': 5 + O, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, outCart);
    el('circle', { cx: 188, cy: -22, r: 7 + O / 2, fill: '#fff' }, outCart);
    el('rect', { x: 22 - O / 2, y: 296 - O / 2, width: 30 + O, height: 20 + O, rx: 14, fill: '#fff' }, outCart);
    el('circle', { cx: 206, cy: 300, r: 30 + O / 2 + 2, fill: '#fff' }, outCart);
    el('ellipse', { cx: FACE.cx + 26, cy: FACE.cy - 2, rx: FACE.r - 6 + O / 2 + 3, ry: FACE.r - 2 + O / 2 + 3, fill: '#fff' }, outDrum);
    el('circle', { cx: FACE.cx, cy: FACE.cy, r: FACE.r + O / 2 + 3, fill: '#fff' }, outDrum);

    // Atrás: alça, motor com tampa e topete de mola, base e pé laranja
    var cart = el('g', { class: 'ml-cart' }, bodyG);
    tube(HANDLE, 14, cart, outCart);
    tube(BASE, 13, cart, outCart);
    el('rect', { x: 22, y: 296, width: 30, height: 20, rx: 8, fill: C.orange, stroke: C.deep, 'stroke-width': 5 }, cart);
    var motor = el('g', { class: 'ml-motor' }, cart);
    el('rect', { x: 140, y: 44, width: 86, height: 70, rx: 16, fill: C.blue, stroke: C.deep, 'stroke-width': 6 }, motor);
    [66, 84].forEach(function (y) { el('path', { d: 'M186,' + y + ' H212', stroke: C.metal2, 'stroke-width': 5, 'stroke-linecap': 'round' }, motor); });
    var cap = el('g', {}, motor);
    el('path', { d: SPRING, fill: 'none', stroke: C.deep, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, cap);
    el('circle', { cx: 188, cy: -22, r: 7, fill: C.orange, stroke: C.deep, 'stroke-width': 3.5 }, cap);
    el('rect', { x: 176, y: 24, width: 28, height: 24, rx: 7, fill: 'url(#' + id + 'o)', stroke: C.deep, 'stroke-width': 5 }, cap);

    // Braços (cabo-mola) saindo das laterais do tambor, cada um com seu contorno branco
    function arm(side) {
      var sx = side < 0 ? 24 : 216, g = el('g', { class: 'ml-arm ml-cart', transform: 'translate(' + sx + ',206)' }, bodyG);
      var inner = el('g', {}, g);
      var d = 'M0,0 Q' + (side * 14) + ',34 ' + (side * 8) + ',62';
      el('path', { d: d, fill: 'none', stroke: '#fff', 'stroke-width': 18 + O, 'stroke-linecap': 'round' }, inner);
      el('circle', { cx: side * 8, cy: 82, r: 17 + O / 2, fill: '#fff' }, inner);
      el('path', { d: d, fill: 'none', stroke: C.deep, 'stroke-width': 18, 'stroke-linecap': 'round' }, inner);
      el('path', { d: d, fill: 'none', stroke: C.metal, 'stroke-width': 11, 'stroke-dasharray': '3 4' }, inner);
      el('circle', { cx: side * 8 - side * 13, cy: 74, r: 7, fill: C.orange, stroke: C.deep, 'stroke-width': 3.5 }, inner); // polegar
      el('circle', { cx: side * 8, cy: 82, r: 17, fill: 'url(#' + id + 'o)', stroke: C.deep, 'stroke-width': 4 }, inner);
      el('path', { d: 'M' + (side * 8 - 9) + ',76 h18', stroke: C.orangeShade, 'stroke-width': 3, 'stroke-linecap': 'round' }, inner);
      return { g: g, inner: inner, sx: sx };
    }
    var armL = arm(-1), armR = arm(1);

    // Desentupidor (pose "pronto"), preso à mão direita
    var prop = el('g', { class: 'ml-prop', opacity: 0, transform: 'translate(8,82)' }, armR.inner);
    el('rect', { x: -5, y: -12, width: 10, height: 92, rx: 5, fill: '#c98a3d', stroke: C.deep, 'stroke-width': 3 }, prop);
    el('path', { d: 'M-26,80 q26,40 52,0 z', fill: '#c0392b', stroke: C.deep, 'stroke-width': 3, 'stroke-linejoin': 'round' }, prop);

    // Tambor: corpo (profundidade) e face com o aro laranja (mais fino: o rosto cresce)
    el('ellipse', { cx: FACE.cx + 26, cy: FACE.cy - 2, rx: FACE.r - 6, ry: FACE.r - 2, fill: C.metal2, stroke: C.deep, 'stroke-width': 6 }, bodyG);
    el('circle', { cx: FACE.cx, cy: FACE.cy, r: FACE.r, fill: 'url(#' + id + 'm)', stroke: C.deep, 'stroke-width': 6 }, bodyG);
    var ring = el('g', { class: 'ml-ring', transform: 'translate(' + FACE.cx + ',' + FACE.cy + ')' }, bodyG);
    el('circle', { r: 89, fill: C.white, stroke: C.orange, 'stroke-width': 8 }, ring);
    for (var i = 0; i < 4; i++) {
      var a = Math.PI / 4 + i * Math.PI / 2;
      el('circle', { cx: (89 * Math.cos(a)).toFixed(2), cy: (89 * Math.sin(a)).toFixed(2), r: 3.6, fill: C.deep }, ring);
    }
    el('path', { d: 'M50,138 Q58,110 84,94', fill: 'none', stroke: C.metal2, 'stroke-width': 6, 'stroke-linecap': 'round' }, bodyG);

    // Roda (na frente)
    var wheelG = el('g', { class: 'ml-cart' }, bodyG);
    var wheelFront = wheel(206, 300, 30, wheelG);
    var wheelBack = wheelFront; // uma roda só (simplificação); mantém a API de giro

    // Rosto: olhos 20% maiores com dois brilhos, sobrancelhas e boca mais marcadas
    var face = el('g', { class: 'ml-face' }, bodyG);
    var blushL = el('ellipse', { cx: 66, cy: 210, rx: 14, ry: 8, fill: '#ff7a6b', opacity: .45 }, face);
    var blushR = el('ellipse', { cx: 174, cy: 210, rx: 14, ry: 8, fill: '#ff7a6b', opacity: .45 }, face);
    function eye(cx) {
      var g = el('g', { class: 'ml-eye', transform: 'translate(' + cx + ',174)' }, face);
      var open = el('g', {}, g);
      var lid = el('g', {}, open); // só o piscar mexe aqui; o tamanho da expressão fica em "open"
      el('ellipse', { cx: 0, cy: 0, rx: 18, ry: 22, fill: '#fff', stroke: C.deep, 'stroke-width': 3 }, lid);
      var pupil = el('g', {}, lid);
      el('circle', { cx: 0, cy: 4, r: 11, fill: C.deep }, pupil);
      el('circle', { cx: 4.5, cy: -1, r: 4, fill: '#fff' }, pupil);
      el('circle', { cx: -3.5, cy: 9, r: 2, fill: '#fff' }, pupil);
      var closed = el('path', { d: 'M-15,3 Q0,-11 15,3', fill: 'none', stroke: C.deep, 'stroke-width': 5.5, 'stroke-linecap': 'round', opacity: 0 }, g);
      return { g: g, open: open, lid: lid, pupil: pupil, closed: closed };
    }
    var eL = eye(92), eR = eye(148);
    var brL = el('path', { d: 'M76,142 Q92,133 108,142', fill: 'none', stroke: C.deep, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
    var brR = el('path', { d: 'M132,142 Q148,133 164,142', fill: 'none', stroke: C.deep, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
    var mouth = el('path', { d: '', fill: C.deep, stroke: C.deep, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, face);
    var mClip = el('clipPath', { id: id + 'c' }, defs);
    var mClipPath = el('path', { d: '' }, mClip);
    var tongue = el('ellipse', { cx: 120, cy: 232, rx: 10, ry: 7, fill: '#ff7a6b', opacity: 0, 'clip-path': 'url(#' + id + 'c)' }, face);

    // Faísca laranja (o brilho de "resolvido")
    var spark = el('g', { class: 'ml-spark ml-cart', transform: 'translate(-8,40)' }, rig);
    el('path', { d: 'M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z', fill: C.orange, stroke: '#fff', 'stroke-width': 3, 'paint-order': 'stroke' }, spark);
    var compactEls = [].slice.call(svg.querySelectorAll('.ml-cart'));

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
      tongue.setAttribute('cy', MOUTH_Y + (e.smile + e.open * 2) * MOUTH_K / 2 - 2); // fundo real da curva da boca; o clip mantém dentro
      brL.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browL + ' 92 140)');
      brR.setAttribute('transform', 'translate(0,' + e.browY + ') rotate(' + e.browR + ' 148 140)');
      [blushL, blushR].forEach(function (b) { b.setAttribute('opacity', e.blush); });
      [eL, eR].forEach(function (E) {
        E.open.setAttribute('opacity', e.closed ? 0 : 1);
        E.closed.setAttribute('opacity', e.closed ? 1 : 0);
        E.open.setAttribute('transform', 'scale(' + e.eyeS + ')');
      });
    }

    function drawArm(a) { a.g.setAttribute('transform', 'translate(' + a.sx + ',206) rotate(' + a.p.r + ')'); }
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
      state.pose = POSES[name] ? name : 'parado';
      setRot(armL, p.armL, instant);
      setRot(armR, p.armR, instant);
      leanG.setAttribute('transform', 'rotate(' + (p.lean || 0) + ' 126 320)');
      compactEls.forEach(function (n) { n.style.display = p.compact ? 'none' : ''; });
      svg.setAttribute('viewBox', p.compact ? '2 66 258 246' : '-70 -64 380 400'); // versão rosto: enquadra só o tambor
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
