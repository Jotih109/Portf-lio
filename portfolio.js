/* ============================================================
   PORTFÓLIO — INTERAÇÕES
   Carregado com `defer`. Tudo degrada graciosamente se
   GSAP/Lenis não carregarem (CDN fora do ar, offline).
   ============================================================ */

const HAS_GSAP = typeof gsap !== 'undefined';
const HAS_ST = HAS_GSAP && typeof ScrollTrigger !== 'undefined';
const HAS_LENIS = typeof Lenis !== 'undefined';
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = matchMedia('(pointer: fine)').matches;

let lenis = null;

// ── PRELOADER ─────────────────────────────────────────────────
document.body.style.overflow = 'hidden';
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
    .to('.preloader-progress', { width: '100%', duration: 1, ease: 'power3.inOut' })
    .to('.preloader', { yPercent: -100, duration: .8, ease: 'power4.inOut', onComplete: revealSite })
    .set('.preloader', { display: 'none' });
} else {
  addEventListener('load', revealSite);
  setTimeout(revealSite, 500);
}

// Inicia cursor imediatamente para não travar na abertura da página
initCursor();

function initSite() {
  document.body.dataset.booted = '1';
  initLenis();
  initReveals();
  initCounters();
  initParallax();
  initHeaderUI();
  initMenu();
  initFilters();
  initCopyEmail();
  initYear();
  initPrint();
}

// ── SCROLL SUAVE ──────────────────────────────────────────────
function initLenis() {
  if (HAS_LENIS && !REDUCED) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    if (HAS_ST) lenis.on('scroll', ScrollTrigger.update);

    if (HAS_GSAP) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  // Âncoras internas com offset do header fixo
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        const y = target.getBoundingClientRect().top + scrollY - 80;
        scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
      }
    });
  });
}

// ── CURSOR FOLLOWER ───────────────────────────────────────────
function initCursor() {
  const follower = document.querySelector('.cursor-follower');
  if (!follower) return;

  if (!FINE_POINTER || REDUCED) {
    follower.style.display = 'none';
    return;
  }

  let mx = -100, my = -100;
  let fx = -100, fy = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!isMoving) {
      isMoving = true;
      fx = mx;
      fy = my;
      follower.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isMoving = false;
    follower.style.opacity = '0';
  });

  const loop = () => {
    if (isMoving) {
      fx += (mx - fx) * 0.18;
      fy += (my - fy) * 0.18;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  document.querySelectorAll('a, button, summary, input, .filter-btn, .pc-links a').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
  });
}

// ── REVEALS ───────────────────────────────────────────────────
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

// ── CONTADORES ────────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    // Preserva sufixos como <sup>%</sup> dentro da célula
    const suffix = el.querySelector('sup')?.outerHTML || '';

    if (REDUCED) { el.innerHTML = target + suffix; return; }

    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.innerHTML = val + suffix;
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

  gsap.to('.hero-ghost', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('.footer-big', {
    yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });

  gsap.utils.toArray('.pc-visual').forEach(v => {
    gsap.fromTo(v, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: v.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const lines = document.querySelector('.hero-bg-lines');
  if (lines && FINE_POINTER) {
    addEventListener('mousemove', (e) => {
      const x = (e.clientX / innerWidth - .5) * 2;
      const y = (e.clientY / innerHeight - .5) * 2;
      gsap.to(lines, { x: x * 18, y: y * 14, duration: 1, ease: 'power2.out' });
    }, { passive: true });
  }
}

// ── HEADER, PROGRESSO, SEÇÃO ATIVA ────────────────────────────
function initHeaderUI() {
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  let ticking = false;

  const update = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;

    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (header) header.classList.toggle('scrolled', y > 60);
    if (toTop) toTop.classList.toggle('show', y > 500);

    // Destaca no menu a seção visível
    let activeIdx = -1;
    sections.forEach((sec, i) => {
      if (sec.getBoundingClientRect().top <= innerHeight * 0.35) activeIdx = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === activeIdx));

    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  if (toTop) {
    toTop.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0);
      else scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }
}

// ── MENU ──────────────────────────────────────────────────────
function initMenu() {
  document.getElementById('burger')?.addEventListener('click', toggleMenu);
  addEventListener('keydown', (e) => {
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
  if (!overlay?.classList.contains('open')) return;

  overlay.classList.remove('open');
  burger.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

// ── FILTRO DE PROJETOS ────────────────────────────────────────
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
      });

      if (HAS_ST) ScrollTrigger.refresh();
    });
  });
}

// ── COPIAR E-MAIL ─────────────────────────────────────────────
function initCopyEmail() {
  const btn = document.getElementById('copyEmail');
  const toast = document.getElementById('copyToast');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback para navegadores sem permissão de clipboard
      const tmp = document.createElement('textarea');
      tmp.value = email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      tmp.remove();
    }
    toast?.classList.add('show');
    setTimeout(() => toast?.classList.remove('show'), 2000);
  });
}

// ── ANO NO RODAPÉ ─────────────────────────────────────────────
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── IMPRIMIR / SALVAR EM PDF ──────────────────────────────────
// A folha de estilo @media print entrega o currículo em preto no
// branco; "Salvar como PDF" na caixa de impressão gera o arquivo.
function initPrint() {
  const triggers = document.querySelectorAll('#printBtn, #printLink, #printLink2');

  triggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      // Espera o menu fechar antes de abrir a caixa de impressão
      setTimeout(() => print(), 220);
    });
  });

  // Ctrl/Cmd + P usa a mesma folha de estilo, sem configuração extra
}
