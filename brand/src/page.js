/* M&C — movimento e interações do brand book.
   Regra: sem JS ou com prefers-reduced-motion, a página fica completa e parada.
   Estados ocultos só são aplicados aqui, via gsap.set. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var G = window.gsap, ST = window.ScrollTrigger;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = G && !reduce;
  var desk = window.matchMedia('(min-width: 961px)').matches;
  if (G && ST) G.registerPlugin(ST);

  /* ---------- Toast ---------- */
  var toast = $('#toast'), tt;
  function say(t) { toast.textContent = t; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 1800); }

  /* ---------- Mascotes ---------- */
  var P = window.Mola;
  var hero = P.create($('#molaHero'), { expr: 'feliz', pose: 'acenando', follow: true });
  var big = P.create($('#mascStage'), { expr: 'feliz', pose: 'parado', follow: true });
  P.create($('#molaCta'), { expr: 'comemorando', pose: 'comemorando' });
  P.create($('#jrMola'), { expr: 'sorriso', pose: 'pronto', idle: false });
  var mini = P.create($('#dMola'), { expr: 'sorriso', pose: 'parado', follow: true, clickable: false });
  mini.svg.style.height = '110px';
  [['.pg-s', 'feliz', 'acenando'], ['.pg-c', 'comemorando', 'comemorando'], ['.pg-d', 'concentrado', 'apontando'], ['.pg-s2', 'surpreso', 'mostrando'], ['.pg-c2', 'feliz', 'comemorando']].forEach(function (c) {
    $$(c[0]).forEach(function (n) { P.create(n, { expr: c[1], pose: c[2], idle: false, clickable: false }); });
  });
  var poses = [['feliz', 'acenando'], ['sorriso', 'apontando'], ['concentrado', 'mostrando'], ['duvida', 'pensando'], ['surpreso', 'parado'], ['comemorando', 'comemorando'], ['sorriso', 'pronto'], ['feliz', 'parado']];
  poses.forEach(function (p) {
    var f = document.createElement('figure');
    f.className = 'card pose'; f.style.margin = '0';
    $('#poses').appendChild(f);
    var box = document.createElement('div'); f.appendChild(box);
    P.create(box, { expr: p[0], pose: p[1], idle: false });
    var s = document.createElement('small'); s.textContent = p[0] + ' · ' + p[1]; f.appendChild(s);
  });
  P.create($('#silBlack'), { idle: false, clickable: false });
  P.create($('#silColor'), { pose: 'acenando', idle: false, clickable: false });
  P.create($('#sz96'), { idle: false, clickable: false });
  P.create($('#sz48'), { pose: 'rosto', idle: false, clickable: false });
  function chips(host, list, cur, fn) {
    list.forEach(function (n) {
      var b = document.createElement('button'); b.className = 'chip' + (n === cur ? ' on' : ''); b.type = 'button'; b.textContent = n;
      b.addEventListener('click', function () { $$('.chip', host).forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); fn(n); });
      host.appendChild(b);
    });
  }
  chips($('#exprChips'), Object.keys(P.EXPR), 'feliz', function (n) { big.setExpr(n); if (n === 'comemorando') big.jump(); });
  chips($('#poseChips'), Object.keys(P.POSES), 'parado', function (n) { big.setPose(n); });

  /* ---------- Cor: copiar e contraste ao vivo ---------- */
  $$('#swatches .sw').forEach(function (b) {
    b.addEventListener('click', function () {
      var hex = b.getAttribute('data-hex');
      if (navigator.clipboard) navigator.clipboard.writeText(hex).catch(function () {});
      say(hex + ' copiado');
    });
  });
  function lum(hex) {
    var c = [1, 3, 5].map(function (i) { var v = parseInt(hex.substr(i, 2), 16) / 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  $$('#pairs .pair').forEach(function (p) {
    var a = lum(p.getAttribute('data-fg')), b = lum(p.getAttribute('data-bg'));
    var r = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    var lvl = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA grande' : 'Reprova';
    $('.rt', p).innerHTML = '<i>' + r.toFixed(1) + ':1</i><i>' + lvl + '</i>';
  });

  /* ---------- Tipografia: teste ---------- */
  var tS = $('#tSize'), tP = $('#tPrev'), tV = $('#tSizeV');
  tS.addEventListener('input', function () { tP.style.fontSize = tS.value + 'px'; tV.textContent = tS.value + ' px'; });

  /* ---------- Componentes ---------- */
  var tel = $('#fTel');
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2); // +55 colado
    d = d.slice(0, 11);
    var mid = d.length === 11 ? 5 : 4, o = ''; // celular (12) 90000-0000 · fixo (12) 3800-0000
    if (d.length > 0) o = '(' + d.slice(0, 2);
    if (d.length > 2) o += ') ' + d.slice(2, 2 + mid);
    if (d.length > 2 + mid) o += '-' + d.slice(2 + mid);
    tel.value = o;
  });
  var cep = $('#fCep'), cepF = $('#cepF'), cepM = $('#cepMsg');
  cep.addEventListener('input', function () {
    var d = cep.value.replace(/\D/g, '').slice(0, 8);
    cep.value = d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
    if (d.length === 8) {
      var n = parseInt(d.slice(0, 5), 10), ok = n >= 11680 && n <= 11689;
      cepF.classList.toggle('err', !ok);
      cepM.textContent = ok ? 'CEP de Ubatuba. Atendemos aí, 24 horas.' : 'Esse CEP não é de Ubatuba. Fale com a gente pelo WhatsApp.';
    } else { cepF.classList.remove('err'); cepM.textContent = 'Atendemos CEPs de Ubatuba (11680 a 11689)'; }
  });
  var tg = $('#tgl'), tgT = $('#tglT');
  tg.addEventListener('click', function () {
    var on = tg.getAttribute('aria-pressed') !== 'true';
    tg.setAttribute('aria-pressed', on); tgT.textContent = on ? 'Urgente: esgoto voltando' : 'Atendimento normal';
  });
  $$('.comp-grid a[href="#componentes"], .mv a[href="#movimento"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });

  /* ---------- Nav: capítulo atual ---------- */
  var chapN = $('#chapN'), chapT = $('#chapT');
  var secs = $$('[data-ch]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = e.target.getAttribute('data-ch').split('|'); chapN.textContent = d[0]; chapT.textContent = d[1];
        $$('.nav ul a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Sem GSAP ou com menos movimento: para aqui ---------- */
  if (!anim || !ST) { $$('.mt-step').forEach(function (s, i) { s.style.position = 'static'; s.style.marginBottom = '18px'; }); $('#mtDots').style.marginTop = '0'; return; }

  // Entrada fail-safe: estado final explícito e transform limpo ao terminar
  function rise(targets, trigger, o) {
    o = o || {};
    return G.fromTo(targets, { y: o.y == null ? 40 : o.y, x: o.x || 0, autoAlpha: 0 }, { y: 0, x: 0, autoAlpha: 1, duration: o.d || .4, stagger: o.s == null ? .05 : o.s, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: trigger, start: o.start || 'top 85%', once: true, onEnter: o.onEnter } });
  }

  // Progresso de leitura
  G.to('.nav .prog', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  // Abertura
  var h = G.timeline({ delay: .1 });
  h.from('.hero .kicker', { y: 16, opacity: 0, duration: .4, ease: 'power3.out' })
    .from('#heroTitle', { y: 40, opacity: 0, duration: .5, ease: 'power3.out' }, '-=.25')
    .from('.hero .lead, .hero .btn-row, .hero-facts', { y: 18, opacity: 0, duration: .4, stagger: .06, ease: 'power3.out' }, '-=.3')
    .from('#heroPhone', { y: 80, rotate: 4, opacity: 0, duration: .6, ease: 'power3.out' }, '-=.6')
    .from('.hero-tag', { scale: 0, rotate: -20, duration: .35, ease: 'back.out(2)' }, '-=.2')
    .from('#molaHero', { x: -80, opacity: 0, duration: .45, ease: 'back.out(1.6)' }, '-=.2')
    .from('.float-card', { y: 20, opacity: 0, stagger: .1, duration: .35, ease: 'power3.out' }, '-=.2')
    .add(function () { hero.jump(); });
  var chat = $$('#chat > *');
  G.set(chat, { opacity: 0, y: 12 });
  G.to(chat, { opacity: 1, y: 0, duration: .3, stagger: .55, delay: 1.1, ease: 'power3.out', onComplete: function () { hero.setExpr('comemorando'); setTimeout(function () { hero.setExpr('feliz'); }, 1200); } });
  G.to('#heroPhone', { y: -50, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 } });
  G.to('#heroTitle', { y: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .5 } });

  // Manifesto: palavras acendem
  var mt = $('#manText');
  (function split(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
          var s = document.createElement('span'); s.className = 'mw'; s.textContent = w; frag.appendChild(s);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) { n.classList.add('mw'); }
    });
  })(mt);
  G.fromTo('#manText .mw', { opacity: .12 }, { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: desk ? { trigger: '#manifesto', start: 'top top', end: '+=150%', scrub: .6, pin: true } : { trigger: '#manText', start: 'top 80%', end: 'bottom 40%', scrub: .6 } });

  // Construção do logo: círculo-guia, máquina, nome em arco, traços e slogan
  var st = $('#symStroke'), lt = G.timeline({ defaults: { ease: 'none' } });
  if (st) {
    var len = st.getTotalLength();
    G.set(st, { strokeDasharray: len, strokeDashoffset: len });
    G.set('#symMachine', { opacity: 0, scale: .6, transformOrigin: '50% 50%' }); G.set(['#symTop', '#symSlogan'], { opacity: 0 }); G.set('#symTicks', { opacity: 0 });
    lt.to(st, { strokeDashoffset: 0, duration: 1 })
      .to('#symMachine', { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.4)' })
      .fromTo('#symTop', { opacity: 0, rotation: -30, svgOrigin: '200 200' }, { opacity: 1, rotation: 0, svgOrigin: '200 200', duration: .6 })
      .to('#symTicks', { opacity: 1, duration: .3 })
      .fromTo('#symSlogan', { opacity: 0, rotation: 30, svgOrigin: '200 200' }, { opacity: 1, rotation: 0, svgOrigin: '200 200', duration: .6 })
      .to(st, { opacity: 0, duration: .3 })
      .from('.anat li', { opacity: .15, x: 20, stagger: .3, duration: .4 }, .2);
    ST.create({ animation: lt, trigger: '#logoStage', start: desk ? 'center center' : 'top 75%', end: desk ? '+=160%' : 'bottom 30%', scrub: .6, pin: desk });
  }
  rise('.ver', '.versions', { s: .06 });

  // A etiqueta em movimento (morph)
  var shape = $('#shape'), lays = $$('.lay', shape), steps = $$('.mt-step'), dots = $$('#mtDots i');
  G.set(lays.slice(1), { opacity: 0 }); G.set(steps.slice(1), { opacity: 0, y: 20 });
  var stagesS = [
    { width: 300, height: 74, backgroundColor: '#f2680c', skewX: 0, borderRadius: 3 },
    { width: 380, height: 70, backgroundColor: '#f2680c', skewX: 0, borderRadius: 4, boxShadow: '6px 6px 0 #0b1f3f' },
    { width: 400, height: 250, backgroundColor: '#004ba9', skewX: 0, borderRadius: 6, boxShadow: '0 30px 60px rgba(0,0,0,.35)' },
    { width: 360, height: 80, backgroundColor: '#1e5db3', skewX: 0, borderRadius: 3 },
    { width: 560, height: 44, backgroundColor: '#f2680c', skewX: 0, borderRadius: 0 }
  ];
  if (!desk) stagesS.forEach(function (s) { s.width = Math.min(s.width, 300); if (s.height > 200) s.height = 210; });
  var m = G.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });
  for (var i = 1; i < stagesS.length; i++) {
    (function (i) {
      m.to(shape, stagesS[i], i)
        .to(lays, { skewX: -stagesS[i].skewX }, i)
        .to(lays[i - 1], { opacity: 0, duration: .4 }, i)
        .to(lays[i], { opacity: 1, duration: .5 }, i + .4)
        .to(steps[i - 1], { opacity: 0, y: -20, duration: .4 }, i)
        .to(steps[i], { opacity: 1, y: 0, duration: .5 }, i + .4)
        .add(function () { dots.forEach(function (d, k) { d.classList.toggle('on', k <= i); }); }, i + .5);
    })(i);
  }
  m.fromTo('#mtWater', { strokeDashoffset: 0 }, { strokeDashoffset: -400, duration: 5, ease: 'none' }, 0);
  ST.create({ animation: m, trigger: '#etiqueta', start: 'top top', end: '+=420%', pin: true, scrub: .8,
    onUpdate: function (self) { var k = Math.round(self.progress * 4); dots.forEach(function (d, j) { d.classList.toggle('on', j <= k); }); } });

  // Cor
  rise('#swatches .sw', '#swatches');

  // Tipografia: letras sobem e se espalham
  G.fromTo('#typeHero span', { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .05, duration: .5, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: '#typeHero', start: 'top 85%', once: true } });
  G.fromTo('#typeHero', { letterSpacing: '-0.03em' }, { letterSpacing: '0.01em', ease: 'none', scrollTrigger: { trigger: '#typeHero', start: 'top 90%', end: 'bottom 20%', scrub: .5 } });

  // Mascote
  rise('#mascStage', '#mascStage', { y: 30, s: 0, start: 'top 80%', onEnter: function () { big.jump(); } });
  rise('.pose', '#poses');

  // Componentes
  rise('.comp-grid .cp', '.comp-grid');

  // Produto: laptop abre, números contam, barras crescem
  G.fromTo('#laptop', { rotateX: 30, scale: .86, y: 40 }, { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '.laptop-wrap', start: 'top 95%', end: 'top 25%', scrub: .6 } });
  function counter(el) {
    var to = parseFloat(el.getAttribute('data-count')), o = { v: 0 };
    el.textContent = '0';
    G.to(o, { v: to, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: function () { el.textContent = Math.round(o.v); } });
  }
  $$('[data-count]').forEach(counter);
  G.fromTo('#bars span', { scaleY: 0 }, { scaleY: 1, stagger: .08, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: '#bars', start: 'top 90%', once: true } });
  $$('#phones figure').forEach(function (f, k) {
    G.fromTo(f, { y: 60 + k * 30 }, { y: -20 - k * 10, ease: 'none', scrollTrigger: { trigger: '#phones', start: 'top bottom', end: 'bottom top', scrub: .6 } });
  });

  // Jornada: cano enche, Mola anda
  G.set('#jrWater', { scaleX: 0 });
  var jt = G.timeline({ defaults: { ease: 'none' } });
  jt.to('#jrWater', { scaleX: 1, duration: 1 })
    .fromTo('#jrMola', { left: '0%' }, { left: 'calc(100% - 110px)', duration: 1 }, 0)
    .from('.jr-step', { opacity: .2, y: 30, stagger: .33, duration: .3 }, 0);
  var jrWheels = $$('#jrMola .ml-wheel > g');
  jt.eventCallback('onUpdate', function () { G.set(jrWheels, { rotation: jt.progress() * 900, svgOrigin: '0 0' }); }); // roda gira enquanto anda
  ST.create({ animation: jt, trigger: '#jornada', start: desk ? 'top top' : 'top 70%', end: desk ? '+=200%' : 'bottom 40%', pin: desk, scrub: .6 });

  // Comunicação: galeria horizontal
  var hs = $('#hs');
  function dist() { return Math.max(0, hs.scrollWidth - window.innerWidth + 40); }
  G.to(hs, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: '#comunicacao', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: .6, invalidateOnRefresh: true } });
  $$('.post', hs).forEach(function (p, k) { G.fromTo(p, { rotate: k % 2 ? 2.5 : -2.5 }, { rotate: k % 2 ? -1.5 : 1.5, ease: 'none', scrollTrigger: { trigger: '#comunicacao', start: 'top top', end: function () { return '+=' + dist(); }, scrub: 1 } }); });

  // Movimento: demos ao vivo
  var dE = $('#dEase');
  function runW() { dE.style.setProperty('--run', (dE.clientWidth - 54) + 'px'); }
  runW(); window.addEventListener('resize', runW);
  setInterval(function () { dE.classList.toggle('go'); }, 1300); // transição CSS com a curva da marca, 400 ms
  var durs = $$('#dDur span');
  setInterval(function () { durs.forEach(function (s) { s.parentNode.classList.toggle('go'); }); }, 1300); // 150 / 250 / 400 ms
  G.to('#dFlow', { strokeDashoffset: -72, duration: 1.2, ease: 'none', repeat: -1 });
  $('#dMola').addEventListener('click', function () { mini.celebrate(); });

  // Comparativo e CTA
  rise('.vs > div', '.vs', { s: .12 });
  rise('.vs .yes li', '.vs', { y: 0, x: 20, s: .08, d: .3, start: 'top 70%' });
  rise('.cta h2', '.cta', { y: 60, s: 0, d: .5, start: 'top 75%' });

  window.addEventListener('load', function () { ST.refresh(); });
})();
