/* ============================================================
   CURRÍCULO — script próprio, sem dependências.
   Reveals, contadores, progresso, seção ativa, imprimir e copiar.
   ============================================================ */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_IO = 'IntersectionObserver' in window;

// ── ENTRADA DOS ELEMENTOS AO ROLAR ────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .skills');

if (REDUCED || !HAS_IO) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => io.observe(el));
}

// ── CONTADORES ────────────────────────────────────────────────
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);

  if (REDUCED) { el.textContent = target; return; }

  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); // easeOutCubic
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');

if (!HAS_IO) {
  counters.forEach(countUp);
} else {
  const ioCount = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target);
      ioCount.unobserve(e.target);
    });
  }, { threshold: .6 });

  counters.forEach(el => ioCount.observe(el));
}

// ── BARRA DE PROGRESSO, TOPBAR E VOLTAR AO TOPO ───────────────
const progress = document.getElementById('progress');
const topbar = document.querySelector('.topbar');
const toTop = document.getElementById('toTop');
let ticking = false;

function onScroll() {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;

  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  topbar.classList.toggle('scrolled', y > 30);
  toTop.classList.toggle('show', y > 600);

  ticking = false;
}

addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();

toTop.addEventListener('click', () => {
  scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
});

// ── SEÇÃO ATIVA NO MENU ───────────────────────────────────────
const navLinks = [...document.querySelectorAll('.topbar-nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if (sections.length && HAS_IO) {
  const ioNav = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const i = sections.indexOf(e.target);
      navLinks.forEach((a, j) => a.classList.toggle('active', i === j));
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach(s => ioNav.observe(s));
}

// ── IMPRIMIR / SALVAR EM PDF ──────────────────────────────────
document.getElementById('printBtn')?.addEventListener('click', () => print());

// ── COPIAR E-MAIL ─────────────────────────────────────────────
const copyBtn = document.getElementById('copyEmail');
const toast = document.getElementById('copyToast');

copyBtn?.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Copiado ✓';
  } catch {
    toast.textContent = email; // navegador sem permissão de clipboard
  }

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

// ── ANO DO RODAPÉ ─────────────────────────────────────────────
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
