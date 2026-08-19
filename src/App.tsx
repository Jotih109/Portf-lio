import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';

import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { BackToTop } from './components/common/BackToTop';
import { Navbar } from './components/common/Navbar';
import { OverlayMenu } from './components/common/OverlayMenu';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { Marquee } from './components/common/Marquee';

import { CvHero } from './components/cv/CvHero';
import { CvExperience } from './components/cv/CvExperience';
import { CvEducation } from './components/cv/CvEducation';
import { CvCertifications } from './components/cv/CvCertifications';
import { CvSkills } from './components/cv/CvSkills';

import { TechCarousel } from './components/common/TechCarousel';
import { ProjectsSection } from './components/home/ProjectsSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';

import { registerLenis, scrollToTarget } from './utils/scroll';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animId = requestAnimationFrame(raf);
    registerLenis(lenis);

    return () => {
      cancelAnimationFrame(animId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  // Scroll Reveal Animations
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = (email: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setToastMessage('E-mail copiado com sucesso!');
        setShowToast(true);

        // Confetti burst
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#FFB020', '#FF7A18', '#FFFFFF'],
          });
        } catch {
          // Ignore if canvas is not available
        }

        setTimeout(() => {
          setShowToast(false);
        }, 2800);
      });
    }
  };

  const scrollToSection = (sectionId?: string) => scrollToTarget(sectionId);

  return (
    <div className="portfolio-app">
      <a className="skip-link" href="#cv">
        Pular para o conteúdo
      </a>

      {/* Interactive Cursor */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader />

      {/* Scroll Progress & Back to Top */}
      <ScrollProgress />
      <BackToTop />

      {/* Navigation & Fullscreen Overlay Menu */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <OverlayMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Página única: currículo completo + projetos do portfólio */}
      <main className="cv-main">
        <CvHero />
        <TechCarousel />
        <CvExperience />
        <CvEducation />
        <CvCertifications />
        <CvSkills />
        <ProjectsSection onNavigateContact={() => scrollToSection('contact')} />
        <Marquee />
        <FaqSection />
        <ContactSection onCopyEmail={handleCopyEmail} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default App;
