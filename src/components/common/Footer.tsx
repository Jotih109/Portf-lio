import React from 'react';
import { personalInfo } from '../../data/portfolioData';

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
      <div className="footer-big" aria-hidden="true">
        VAMOS<br />CONSTRUIR
      </div>

      <div className="footer-nav">
        <div>
          <div className="footer-col-title">Navegação</div>
          <a className="footer-link" href="#hero" onClick={() => handleNav('hero')}>
            Início
          </a>
          <a className="footer-link" href="#projects" onClick={() => handleNav('projects')}>
            Projetos
          </a>
          <a className="footer-link" href="#services" onClick={() => handleNav('services')}>
            Especialidades
          </a>
          <a className="footer-link" href="#stack" onClick={() => handleNav('stack')}>
            Stack
          </a>
          <a className="footer-link" href="#experience" onClick={() => handleNav('experience')}>
            Experiência
          </a>
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
          <a className="footer-link" href="#faq" onClick={() => handleNav('faq')}>
            Perguntas frequentes
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © <span id="year">{currentYear}</span> {personalInfo.name} · Engenheiro de Software.
        </span>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
};
