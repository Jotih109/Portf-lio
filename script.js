/* ============================================================
   MAX VERSTAPPEN — INTERAÇÕES
   Carregado com `defer`: o DOM já existe quando este arquivo roda.
   Tudo aqui degrada graciosamente se GSAP/Lenis não carregarem.
   ============================================================ */

const HAS_GSAP = typeof gsap !== 'undefined';
const HAS_ST = HAS_GSAP && typeof ScrollTrigger !== 'undefined';
const HAS_LENIS = typeof Lenis !== 'undefined';
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

// ── PRELOADER ─────────────────────────────────────────────────
document.body.style.overflow = 'hidden';

// Rede de segurança: se algo travar (CDN fora do ar, erro de script),
// o preloader some sozinho e o site continua utilizável.
const failSafe = setTimeout(revealSite, 4000);

function revealSite() {
  clearTimeout(failSafe);
  const pre = document.querySelector('.preloader');
  if (pre) pre.style.display = 'none';
  document.body.style.overflow = '';
  if (!document.body.dataset.booted) initSite();
}

if (HAS_GSAP && !REDUCED) {
  gsap.timeline()
    .to('.preloader-progress', { width: '100%', duration: 1.2, ease: 'power3.inOut' })
    .to('.preloader', { yPercent: -100, duration: .9, ease: 'power4.inOut', onComplete: revealSite })
    .set('.preloader', { display: 'none' });
} else {
  window.addEventListener('load', revealSite);
  setTimeout(revealSite, 600);
}

function initSite() {
  document.body.dataset.booted = '1';
  initLenis();
  initCursor();
  initMagnetic();
  initReveals();
  initCounters();
  initParallax();
  initHeaderUI();
  initMenu();
  initCountdown();
}

// ── LENIS SMOOTH SCROLL ───────────────────────────────────────
function initLenis() {
  if (!HAS_LENIS || REDUCED) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  if (HAS_ST) lenis.on('scroll', ScrollTrigger.update);

  if (HAS_GSAP) {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  // Âncoras internas passam a usar o scroll suave do Lenis
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      lenis.scrollTo(target, { offset: -80 });
    });
  });
}

// ── CURSOR CUSTOMIZADO ────────────────────────────────────────
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;

  if (!FINE_POINTER || REDUCED) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
  let followerX = mouseX, followerY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }, { passive: true });

  const loop = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  document.querySelectorAll('a, button, summary, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

// ── BOTÕES MAGNÉTICOS ─────────────────────────────────────────
function initMagnetic() {
  if (!HAS_GSAP || !FINE_POINTER || REDUCED) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// ── REVEAL ON SCROLL ──────────────────────────────────────────
function initReveals() {
  const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .stagger');

  if (REDUCED || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

// ── CONTADORES NUMÉRICOS ──────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (REDUCED) { el.textContent = target; return; }

    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

// ── PARALLAX ──────────────────────────────────────────────────
function initParallax() {
  if (!HAS_ST || REDUCED) return;

  gsap.to('.hero-name', {
    yPercent: 30, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('.hero-portrait-svg', {
    yPercent: 15, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.utils.toArray('.ed-photo').forEach(photo => {
    const inner = photo.querySelector('.ph-inner');
    if (!inner) return;
    gsap.fromTo(inner, { yPercent: -12 }, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Linhas de fundo reagindo ao mouse
  const heroBgLines = document.querySelector('.hero-bg-lines');
  if (heroBgLines && FINE_POINTER) {
    document.addEventListener('mousemove', (e) => {
      const xPct = (e.clientX / innerWidth - 0.5) * 2;
      const yPct = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(heroBgLines, { x: xPct * 20, y: yPct * 15, duration: 1, ease: 'power2.out' });
    }, { passive: true });
  }
}

// ── HEADER, BARRA DE PROGRESSO E VOLTAR AO TOPO ───────────────
function initHeaderUI() {
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (y / max) * 100 : 0;

    if (progress) progress.style.width = pct + '%';
    if (header) header.classList.toggle('scrolled', y > 60);
    if (toTop) toTop.classList.toggle('show', y > 400);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }
}

// ── MENU ──────────────────────────────────────────────────────
function initMenu() {
  const burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', toggleMenu);

  // Fecha ao clicar num link ou apertar ESC
  document.querySelectorAll('#overlay-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

function toggleMenu() {
  const overlay = document.getElementById('overlay-menu');
  const burger = document.getElementById('burger');
  const open = !overlay.classList.contains('open');

  overlay.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  overlay.setAttribute('aria-hidden', String(!open));
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);

  if (open) overlay.querySelector('.menu-link')?.focus();
}

function closeMenu() {
  const overlay = document.getElementById('overlay-menu');
  const burger = document.getElementById('burger');
  if (!overlay || !overlay.classList.contains('open')) return;

  overlay.classList.remove('open');
  burger.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;

// ── CONTAGEM REGRESSIVA PARA A PRÓXIMA CORRIDA ────────────────
function initCountdown() {
  const box = document.getElementById('nrCountdown');
  if (!box) return;

  const race = new Date(box.dataset.race).getTime();
  if (Number.isNaN(race)) { box.style.display = 'none'; return; }

  const cells = {
    d: box.querySelector('[data-cd="d"]'),
    h: box.querySelector('[data-cd="h"]'),
    m: box.querySelector('[data-cd="m"]'),
    s: box.querySelector('[data-cd="s"]'),
  };

  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    const diff = race - Date.now();

    if (diff <= 0) {
      box.innerHTML = '<span class="nr-live">Corrida em andamento</span>';
      clearInterval(timer);
      return;
    }

    const s = Math.floor(diff / 1000);
    cells.d.textContent = pad(Math.floor(s / 86400));
    cells.h.textContent = pad(Math.floor(s / 3600) % 24);
    cells.m.textContent = pad(Math.floor(s / 60) % 60);
    cells.s.textContent = pad(s % 60);
  };

  tick();
  const timer = setInterval(tick, 1000);
}
