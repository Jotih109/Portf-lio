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
  initMagnetic();
  initCardSpotlights();
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

// ── CURSOR INTERATIVO (DOT + FOLLOWER + RIPPLE) ────────────────
function initCursor() {
  if (!FINE_POINTER || REDUCED) return;

  let dot = document.querySelector('.cursor-dot');
  if (!dot) {
    dot = document.querySelector('.cursor') || document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
  }

  let follower = document.querySelector('.cursor-follower');
  if (!follower) {
    follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
  }

  let mx = -100, my = -100;
  let fx = -100, fy = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    
    // Dot posicionado instantaneamente sem atraso
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

    if (!isMoving) {
      isMoving = true;
      fx = mx;
      fy = my;
      dot.classList.add('active');
      follower.classList.add('active');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isMoving = false;
    dot.classList.remove('active');
    follower.classList.remove('active');
  });

  // Loop suave com interpolação (lerp) para o anel seguidor
  const loop = () => {
    if (isMoving) {
      fx += (mx - fx) * 0.16;
      fy += (my - fy) * 0.16;
      follower.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  // Efeito de clique (Ripple Pulse)
  window.addEventListener('mousedown', (e) => {
    follower.classList.add('clicked');
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  });

  window.addEventListener('mouseup', () => {
    follower.classList.remove('clicked');
  });

  // Hover states sobre elementos clicáveis
  const hoverSelector = 'a, button, summary, input, select, textarea, .filter-btn, .pc-links a, .btn-primary, .btn-ghost, .cta-btn, .menu-link, .stat-cell, .proj-item, .cert-card, .tool-card';
  
  document.querySelectorAll(hoverSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

// ── BOTÕES MAGNÉTICOS ─────────────────────────────────────────
function initMagnetic() {
  if (!FINE_POINTER || REDUCED) return;

  const elements = document.querySelectorAll('.btn-primary, .btn-ghost, .cta-btn, #burger, #toTop, .filter-btn, [data-magnetic]');

  elements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (HAS_GSAP) {
        gsap.to(el, { x: x * 0.32, y: y * 0.32, duration: 0.3, ease: 'power2.out' });
      } else {
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      if (HAS_GSAP) {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
      } else {
        el.style.transform = '';
      }
    });
  });
}

// ── SPOTLIGHT DE ILUMINAÇÃO NOS CARDS ─────────────────────────
function initCardSpotlights() {
  if (!FINE_POINTER) return;

  const cards = document.querySelectorAll('.project-card, .split-card, .tool-card, .stat-cell, .cert-card, .cv-entry, .proj-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
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
