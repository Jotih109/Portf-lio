/**
 * ============================================================
 * JAVASCRIPT VANILLA — PORTFÓLIO JOÃO LAMIM
 * Todas as funcionalidades e interações em JavaScript puro:
 * - Smooth scroll com Lenis (ou nativo)
 * - Scroll Reveal via IntersectionObserver
 * - Barra de progresso de leitura
 * - Botão Voltar ao Topo
 * - Menu lateral / Overlay responsivo
 * - Filtro de projetos em tempo real
 * - FAQ Accordion interativo
 * - Preloader com barra de carregamento
 * - Copiar e-mail com confetes e toast
 * - Cursor customizado interativo (spotlight, ripple, hover)
 * - Mascote Interativo estilo Kinect (rastreamento do olhar, rotação 3D, piscada, sono e diálogos)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------
  // 1. PRELOADER
  // ------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.querySelector('.preloader-progress');

  if (preloader && preloaderProgress) {
    setTimeout(() => {
      preloaderProgress.style.width = '100%';
    }, 100);

    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1000);

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1800);
  }

  // ------------------------------------------------------------
  // 2. SMOOTH SCROLL (LENIS / NATIVO)
  // ------------------------------------------------------------
  let lenis = null;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window.scrollToTarget = function (targetId) {
    const el = targetId ? document.getElementById(targetId) : null;
    if (lenis) {
      if (el) {
        lenis.scrollTo(el);
      } else {
        lenis.scrollTo(0);
      }
    } else {
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // ------------------------------------------------------------
  // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ------------------------------------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-l, .reveal-r, .stagger, .cv-entry, .cert-card, .project-card, .skill-bars'
  );
  revealElements.forEach((el) => observer.observe(el));

  // ------------------------------------------------------------
  // 4. SCROLL PROGRESS & BACK TO TOP & HEADER ACTIVE STATE
  // ------------------------------------------------------------
  const progressBar = document.getElementById('progress');
  const toTopBtn = document.getElementById('toTop');
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-inline a');
  const sections = ['experience', 'education', 'skills', 'projects', 'faq', 'contact'];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Barra de progresso no topo
    if (progressBar) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    }

    // Botão voltar ao topo
    if (toTopBtn) {
      if (scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    }

    // Header scrolled
    if (siteHeader) {
      if (scrollY > 8) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Nav active section
    const scrollPosition = scrollY + 200;
    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => window.scrollToTarget());
  }

  // ------------------------------------------------------------
  // 5. NAVEGAÇÃO SUAVE NOS LINKS
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId) {
          e.preventDefault();
          window.scrollToTarget(targetId);
        } else {
          e.preventDefault();
          window.scrollToTarget();
        }
      }
    });
  });

  // ------------------------------------------------------------
  // 6. MENU BURGER & OVERLAY MOBILE
  // ------------------------------------------------------------
  const burgerBtn = document.getElementById('burger');
  const overlayMenu = document.getElementById('overlay-menu');

  if (burgerBtn && overlayMenu) {
    const toggleMenu = () => {
      const isOpen = overlayMenu.classList.contains('open');
      if (isOpen) {
        overlayMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        overlayMenu.classList.add('open');
        burgerBtn.classList.add('open');
        burgerBtn.setAttribute('aria-expanded', 'true');
      }
    };

    burgerBtn.addEventListener('click', toggleMenu);

    overlayMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        overlayMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------
  // 7. FILTROS DE PROJETOS
  // ------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------
  // 8. COPIAR E-MAIL COM CONFETES E TOAST
  // ------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  window.handleCopyEmail = function (email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => {
            copyToast.classList.remove('show');
          }, 2800);
        }

        // Explosão de confetes
        if (typeof confetti === 'function') {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#FFB020', '#FF7A18', '#FFFFFF'],
            });
          } catch (err) {}
        }
      });
    }
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      window.handleCopyEmail('jotih109@gmail.com');
    });
  }

  // ------------------------------------------------------------
  // 9. CURSOR CUSTOMIZADO COM SPOTLIGHT
  // ------------------------------------------------------------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('has-custom-cursor');

    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], .project-card, .cert-card, .tech-badge, .filter-btn, .menu-link, .cta-btn, #burger';
    const spotlightSelector = '.project-card, .cert-card, .cv-entry';

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        followerX = mouseX;
        followerY = mouseY;
        if (dot) dot.classList.add('active');
        if (follower) follower.classList.add('active');
      }

      const target = e.target;
      if (target && follower) {
        if (target.closest(interactiveSelector)) {
          follower.classList.add('hover');
          if (dot) dot.classList.add('hover');
        } else {
          follower.classList.remove('hover');
          if (dot) dot.classList.remove('hover');
        }

        // Spotlight
        const card = target.closest(spotlightSelector);
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${mouseX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${mouseY - rect.top}px`);
        }
      }
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      if (follower) follower.classList.add('clicking');
      if (dot) dot.classList.add('clicking');

      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.setProperty('--cx', `${e.clientX}px`);
      ripple.style.setProperty('--cy', `${e.clientY}px`);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });

    window.addEventListener('mouseup', () => {
      if (follower) follower.classList.remove('clicking');
      if (dot) dot.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      if (dot) dot.classList.remove('active', 'hover', 'clicking');
      if (follower) follower.classList.remove('active', 'hover', 'clicking');
    });

    function renderCursor() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      if (dot) {
        dot.style.setProperty('--cx', `${mouseX}px`);
        dot.style.setProperty('--cy', `${mouseY}px`);
      }
      if (follower) {
        follower.style.setProperty('--fx', `${followerX}px`);
        follower.style.setProperty('--fy', `${followerY}px`);
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);
  }

  // ------------------------------------------------------------
  // 10. MASCOTE INTERATIVO (KINECT CURSOR BOT)
  // ------------------------------------------------------------
  const petWrapper = document.querySelector('.interactive-pet-wrapper');
  const petCard = document.querySelector('.interactive-pet-card');
  const petDialog = document.querySelector('.pet-dialog-bubble');
  const petDialogText = document.querySelector('.pet-dialog-text');
  const petSleep = document.querySelector('.pet-sleep-indicator');
  const petToggleBtn = document.querySelector('.pet-toggle-btn');
  const eyeLeft = document.getElementById('petEyeLeft');
  const eyeRight = document.getElementById('petEyeRight');
  const petAntennaLight = document.getElementById('petAntennaLight');
  const petEyesSleeping = document.getElementById('petEyesSleeping');
  const petEyesBlinking = document.getElementById('petEyesBlinking');
  const petEyesTracking = document.getElementById('petEyesTracking');
  const petMouth = document.getElementById('petMouth');
  const petBlush = document.getElementById('petBlush');

  let isSleeping = false;
  let isBlinking = false;
  let isMinimized = false;
  let idleTimer = null;
  let dialogTimer = null;

  const petPhrases = [
    'Bip bop! Olá! 👋',
    'Seguindo você com precisão! 👀',
    'Estilo Kinect ativado! 🎮',
    'Você tem um ótimo gosto! ✨',
    'Gostou dos projetos? 🚀',
    '*ronronar de robô* 🤖💛',
  ];

  function resetIdleTimer() {
    if (isSleeping) {
      isSleeping = false;
      if (petSleep) petSleep.style.display = 'none';
      if (petEyesSleeping) petEyesSleeping.style.display = 'none';
      if (petEyesTracking) petEyesTracking.style.display = 'block';
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#FFB020');
    }

    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      isSleeping = true;
      if (petSleep) petSleep.style.display = 'flex';
      if (petEyesSleeping) petEyesSleeping.style.display = 'block';
      if (petEyesTracking) petEyesTracking.style.display = 'none';
      if (petEyesBlinking) petEyesBlinking.style.display = 'none';
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#555566');
      if (petCard) petCard.style.transform = 'perspective(600px) rotateX(10deg) rotateY(0deg)';
    }, 7000);
  }

  // Piscar de olhos natural
  setInterval(() => {
    if (!isSleeping && petEyesTracking && petEyesBlinking) {
      petEyesTracking.style.display = 'none';
      petEyesBlinking.style.display = 'block';
      setTimeout(() => {
        if (!isSleeping) {
          petEyesBlinking.style.display = 'none';
          petEyesTracking.style.display = 'block';
        }
      }, 160);
    }
  }, 4000);

  // Rastreamento do mouse
  window.addEventListener('mousemove', (e) => {
    resetIdleTimer();

    if (!petCard || isMinimized || isSleeping) return;

    const rect = petCard.getBoundingClientRect();
    const petCenterX = rect.left + rect.width / 2;
    const petCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - petCenterX;
    const deltaY = e.clientY - petCenterY;
    const distance = Math.hypot(deltaX, deltaY);

    // Curiosidade: mouse muito próximo (< 130px)
    const isCurious = distance < 130;
    if (isCurious) {
      petCard.classList.add('curious');
      if (petBlush) petBlush.style.display = 'block';
      if (petMouth) petMouth.setAttribute('d', 'M 47 64 Q 50 67 53 64');
    } else {
      petCard.classList.remove('curious');
      if (petBlush) petBlush.style.display = 'none';
      if (petMouth) petMouth.setAttribute('d', 'M 45 64 L 55 64');
    }

    // Ângulo e deslocamento das pupilas
    const angle = Math.atan2(deltaY, deltaX);
    const maxRadius = 6.5;
    const clampedDistance = Math.min(maxRadius, distance / 22);

    const pupilX = Math.cos(angle) * clampedDistance;
    const pupilY = Math.sin(angle) * clampedDistance;

    if (eyeLeft) eyeLeft.setAttribute('transform', `translate(${40 + pupilX}, ${49 + pupilY})`);
    if (eyeRight) eyeRight.setAttribute('transform', `translate(${60 + pupilX}, ${49 + pupilY})`);

    // Inclinação 3D da cabeça (Parallax)
    const maxAngle = 22;
    const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 1.5)));
    const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 1.5)));

    petCard.style.transform = `perspective(600px) rotateX(${-normY * maxAngle}deg) rotateY(${normX * maxAngle}deg)`;
  }, { passive: true });

  // Clique no mascote
  if (petCard) {
    petCard.addEventListener('click', (e) => {
      e.stopPropagation();
      resetIdleTimer();

      petCard.classList.add('happy-bounce');
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#00FFCC');

      // Frase aleatória
      const phrase = petPhrases[Math.floor(Math.random() * petPhrases.length)];
      if (petDialog && petDialogText) {
        petDialogText.textContent = phrase;
        petDialog.style.display = 'block';

        if (dialogTimer) clearTimeout(dialogTimer);
        dialogTimer = setTimeout(() => {
          petDialog.style.display = 'none';
        }, 2600);
      }

      // Confetes
      if (typeof confetti === 'function') {
        try {
          const rect = petCard.getBoundingClientRect();
          confetti({
            particleCount: 28,
            spread: 55,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ['#FFB020', '#FF7A18', '#00FFCC', '#FFFFFF'],
          });
        } catch (err) {}
      }

      setTimeout(() => {
        petCard.classList.remove('happy-bounce');
        if (petAntennaLight && !isSleeping) petAntennaLight.setAttribute('fill', '#FFB020');
      }, 1000);
    });
  }

  // Botão de minimizar/expandir mascote
  if (petToggleBtn && petWrapper) {
    petToggleBtn.addEventListener('click', () => {
      isMinimized = !isMinimized;
      if (isMinimized) {
        petWrapper.classList.add('minimized');
        petToggleBtn.textContent = '🤖';
        petToggleBtn.setAttribute('title', 'Expandir mascote');
      } else {
        petWrapper.classList.remove('minimized');
        petToggleBtn.textContent = '−';
        petToggleBtn.setAttribute('title', 'Minimizar mascote');
      }
    });
  }

  // Inicializa o timer de inatividade
  resetIdleTimer();
});
