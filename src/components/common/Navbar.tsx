import React, { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { scrollToTarget } from '../../utils/scroll';

interface NavbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const NAV_LINKS = [
  { id: 'experience', label: 'Experiência' },
  { id: 'education', label: 'Formação' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Projetos' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isMenuOpen,
  onToggleMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['experience', 'education', 'certs', 'skills', 'projects', 'faq', 'contact'];
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
    scrollToTarget(targetId);
  };

  return (
    <header id="siteHeader" className={isScrolled ? 'scrolled' : ''}>
      <a
        className="logo"
        href="#cv"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget();
        }}
      >
        <b>{personalInfo.initials}</b>
        <span>Software Engineer</span>
      </a>

      <div className="nav-right">
        <div className="nav-inline">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          className="cta-btn"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('contact');
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
