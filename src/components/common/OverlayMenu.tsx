import React from 'react';
import { scrollToTarget } from '../../utils/scroll';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { id: 'cv', label: 'Início' },
  { id: 'experience', label: 'Experiência' },
  { id: 'education', label: 'Formação' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Projetos' },
  { id: 'faq', label: 'Perguntas Frequentes' },
];

export const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const handleNav = (targetId: string) => {
    onClose();
    scrollToTarget(targetId);
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
        {MENU_LINKS.map((link) => (
          <a
            key={link.id}
            className="menu-link"
            href={`#${link.id}`}
            onClick={() => handleNav(link.id)}
          >
            {link.label}
          </a>
        ))}
        <a className="menu-link accent" href="#contact" onClick={() => handleNav('contact')}>
          Entrar em Contato
        </a>
      </div>
    </nav>
  );
};
