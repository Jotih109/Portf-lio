import React from 'react';
import { personalInfo } from '../../data/portfolioData';

const FOOTER_LINKS = [
  { id: 'cv', label: 'Início' },
  { id: 'experience', label: 'Experiência' },
  { id: 'education', label: 'Formação' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Projetos' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNav = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer-nav">
        <div>
          <div className="footer-col-title">Navegação</div>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.id}
              className="footer-link"
              href={`#${link.id}`}
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </a>
          ))}
          <a className="footer-link accent" href="#contact" onClick={() => handleNav('contact')}>
            Contato
          </a>
        </div>

        <div>
          <div className="footer-col-title">Conectar</div>
          <a
            className="footer-link"
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer-link"
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div>
          <div className="footer-col-title">Contato direto</div>
          <a className="footer-link" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © <span id="year">{currentYear}</span> João Vitor Lamim dos Santos · Engenheiro de Software.
        </span>
      </div>
    </footer>
  );
};
