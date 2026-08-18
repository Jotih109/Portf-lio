import React from 'react';
import { personalInfo } from '../../data/portfolioData';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const handleNav = (targetId: string) => {
    onClose();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="overlay-menu"
      className={isOpen ? 'open' : ''}
      aria-label="Menu principal"
      aria-hidden={!isOpen}
    >
      <div>
        <div className="menu-label">Navegação</div>
        <a className="menu-link" href="#hero" onClick={() => handleNav('hero')}>
          Início
        </a>
        <a className="menu-link" href="#projects" onClick={() => handleNav('projects')}>
          Projetos
        </a>
        <a className="menu-link" href="#services" onClick={() => handleNav('services')}>
          O que eu entrego
        </a>
        <a className="menu-link" href="#stack" onClick={() => handleNav('stack')}>
          Stack
        </a>
        <a className="menu-link" href="#experience" onClick={() => handleNav('experience')}>
          Experiência
        </a>
        <a className="menu-link" href="#faq" onClick={() => handleNav('faq')}>
          Perguntas Frequentes
        </a>
        <a className="menu-link accent" href="#contact" onClick={() => handleNav('contact')}>
          Entrar em Contato
        </a>
      </div>

      <div className="menu-divider" />
      <div className="menu-label">Conectar</div>
      <div className="menu-social">
        <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${personalInfo.email}`}>
          E-mail
        </a>
      </div>
    </nav>
  );
};
