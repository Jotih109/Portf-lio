import React, { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';

interface NavbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMenuOpen,
  onToggleMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['projects', 'services', 'stack', 'experience', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header id="siteHeader" className={isScrolled ? 'scrolled' : ''}>
      <a
        className="logo"
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <b>{personalInfo.initials}</b>
        <span>Software Engineer</span>
      </a>

      <div className="nav-right">
        <div className="nav-inline">
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, 'projects')}
          >
            Projetos
          </a>
          <a
            href="#services"
            className={activeSection === 'services' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            Especialidades
          </a>
          <a
            href="#stack"
            className={activeSection === 'stack' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, 'stack')}
          >
            Stack
          </a>
          <a
            href="#experience"
            className={activeSection === 'experience' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, 'experience')}
          >
            Experiência
          </a>
        </div>

        <a
          className="cta-btn"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          Contato
        </a>

        <button
          id="burger"
          type="button"
          className={isMenuOpen ? 'open' : ''}
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="overlay-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};
