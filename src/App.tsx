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

import { HeroSection } from './components/home/HeroSection';
import { StatsBar } from './components/home/StatsBar';
import { ManifestoSection } from './components/home/ManifestoSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { ServicesSection } from './components/home/ServicesSection';
import { StackSection } from './components/home/StackSection';
import { ExperienceSection } from './components/home/ExperienceSection';
import { PrinciplesSection } from './components/home/PrinciplesSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';

import { homeStats } from './data/portfolioData';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
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

  const scrollToSection = (sectionId?: string) => {
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app">
      <a className="skip-link" href="#hero">
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

      {/* Main Portfolio Sections */}
      <main>
        <HeroSection
          onNavigateProjects={() => scrollToSection('projects')}
          onNavigateContact={() => scrollToSection('contact')}
        />
        <StatsBar stats={homeStats} label="Números da carreira" />
        <ManifestoSection />
        <ProjectsSection onNavigateContact={() => scrollToSection('contact')} />
        <ServicesSection />
        <StackSection />
        <ExperienceSection />
        <PrinciplesSection />
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
