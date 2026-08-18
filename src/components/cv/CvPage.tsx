import React from 'react';
import {
  personalInfo,
  cvStats,
  experiencesData,
  skillBarsData,
  ecosystemTags,
  languages,
  educationData,
  certificationsData,
  projectsData,
} from '../../data/portfolioData';
import { StatsBar } from '../home/StatsBar';
import { Marquee } from '../common/Marquee';

interface CvPageProps {
  onCopyEmail: (email: string) => void;
  onNavigatePortfolio: (targetId?: string) => void;
}

export const CvPage: React.FC<CvPageProps> = ({ onCopyEmail, onNavigatePortfolio }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="cv-main">
      {/* CABEÇALHO DO CURRÍCULO */}
      <section className="cv-hero" id="cv">
        <svg
          className="hero-bg-lines"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-100 600 C200 700 400 300 700 350 C900 390 1000 600 1300 500 C1500 430 1600 200 1800 150"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <path
            d="M-50 400 C150 500 300 200 600 250 C850 290 900 500 1200 380 C1400 290 1500 100 1700 50"
            stroke="rgba(255,176,32,0.09)"
            strokeWidth="0.8"
          />
          <path
            d="M0 200 C200 280 350 80 600 100 C820 120 870 320 1150 200 C1330 120 1420 -20 1620 -70"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.8"
          />
        </svg>

        <div className="hero-ghost" aria-hidden="true">
          CV
        </div>

        <div className="cv-head">
          {/* Identificação */}
          <div className="cv-id">
            <div className="cv-avatar reveal in" aria-hidden="true">
              {personalInfo.initials}
            </div>
            <div>
              <h1 className="cv-name reveal in">
                JOÃO <em>LAMIM</em>
              </h1>
              <p className="cv-role reveal in" style={{ transitionDelay: '.08s' }}>
                {personalInfo.role}
              </p>
              <div className="hero-status reveal in" style={{ transitionDelay: '.14s' }}>
                <span className="status-dot" aria-hidden="true" />
                {personalInfo.statusCvText}
              </div>
            </div>
          </div>

          {/* Dados de contato */}
          <ul className="cv-contact stagger in" aria-label="Dados de contato">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{personalInfo.location}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.7 4.7 0 00-1.3-3.2 4.4 4.4 0 00-.1-3.3s-1.4-.4-4.6 1.7a11.3 11.3 0 00-6 0C5.8 2.9 4.4 3.3 4.4 3.3a4.4 4.4 0 00-.1 3.3A4.7 4.7 0 003 9.8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
              </svg>
              <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Resumo profissional */}
        <div className="cv-summary reveal in" style={{ transitionDelay: '.2s' }}>
          <div className="section-label">Resumo executivo</div>
          <p>{personalInfo.executiveSummary}</p>
          <div className="cv-actions">
            <button className="btn-primary" type="button" onClick={handlePrint}>
              Baixar / imprimir currículo
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5h20v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
              </svg>
            </button>
            <a className="btn-ghost" href={`mailto:${personalInfo.email}`}>
              Enviar e-mail
            </a>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          Role para o currículo completo
        </div>
      </section>

      {/* NÚMEROS */}
      <StatsBar stats={cvStats} label="Resumo em números" />

      {/* EXPERIÊNCIA PROFISSIONAL */}
      <section className="cv-section" id="experience">
        <div className="section-label reveal in">Histórico profissional</div>
        <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
          EXPERIÊNCIA
        </h2>

        <div className="cv-list">
          {experiencesData.map((exp) => (
            <article key={exp.id} className="cv-entry reveal in">
              <div className="cv-entry-side">
                <div className="cv-period">{exp.period}</div>
                {exp.current && <div className="cv-badge">Atual</div>}
              </div>
              <div className="cv-entry-main">
                <h3 className="cv-entry-title">{exp.role}</h3>
                <div className="cv-entry-org">
                  {exp.company} · {exp.location}
                </div>
                {exp.bullets && (
                  <ul className="cv-bullets">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={`bullet-${bIdx}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <div className="cv-tags">
                  {exp.stack.map((tech, tIdx) => (
                    <span key={`tech-${tIdx}`}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMPETÊNCIAS TÉCNICAS */}
      <section className="cv-section alt" id="skills">
        <div className="section-label reveal in">Competências</div>
        <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
          HABILIDADES<br />
          <em>técnicas</em>
        </h2>

        <div className="skills-layout">
          {/* Barras de nível */}
          <div className="skill-bars stagger in">
            {skillBarsData.map((skill, sIdx) => (
              <div key={`skill-bar-${sIdx}`} className="skill-row">
                <div className="skill-head">
                  <span>{skill.name}</span>
                  <i>{skill.label}</i>
                </div>
                <div className="skill-track">
                  <span style={{ '--lvl': `${skill.level}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>

          {/* Listas de apoio */}
          <div className="skills-aside">
            <div className="aside-block">
              <h3>Ecossistema &amp; Ferramentas</h3>
              <div className="cv-tags">
                {ecosystemTags.map((eco, eIdx) => (
                  <span key={`eco-${eIdx}`}>{eco}</span>
                ))}
              </div>
            </div>

            <div className="aside-block">
              <h3>Idiomas</h3>
              <ul className="lang-list">
                {languages.map((lang, lIdx) => (
                  <li key={`lang-${lIdx}`}>
                    <span>{lang.name}</span>
                    <i>{lang.level}</i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAÇÃO */}
      <section className="cv-section" id="education">
        <div className="section-label reveal in">Formação acadêmica</div>
        <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
          EDUCAÇÃO &amp; CURSOS
        </h2>

        <div className="cv-list">
          {educationData.map((edu, eduIdx) => (
            <article key={`edu-${eduIdx}`} className="cv-entry reveal in">
              <div className="cv-entry-side">
                <div className="cv-period">{edu.period}</div>
              </div>
              <div className="cv-entry-main">
                <h3 className="cv-entry-title">{edu.degree}</h3>
                <div className="cv-entry-org">{edu.institution}</div>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
                  {edu.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CERTIFICAÇÕES */}
      <section className="cv-section alt" id="certs">
        <div className="section-label reveal in">Qualificações</div>
        <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
          CERTIFICAÇÕES
        </h2>

        <div className="cert-grid stagger in">
          {certificationsData.map((cert, cIdx) => (
            <div key={`cert-${cIdx}`} className="cert-card">
              <div className="cert-year">{cert.year}</div>
              <h3 className="cert-name">{cert.name}</h3>
              <div className="cert-org">{cert.organization}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS SELECIONADOS */}
      <section className="cv-section" id="projects">
        <div className="section-label reveal in">Destaques</div>
        <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
          PROJETOS<br />
          <em>selecionados</em>
        </h2>

        <div className="proj-list stagger in">
          {projectsData.map((proj) => (
            <article key={`cv-proj-${proj.id}`} className="proj-item">
              <div className="proj-main">
                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-desc">{proj.description}</p>
                <div className="cv-tags">
                  {proj.stack.map((st, stIdx) => (
                    <span key={`proj-st-${stIdx}`}>{st}</span>
                  ))}
                </div>
              </div>
              <div className="proj-meta">
                <div className="proj-metric">{proj.metric}</div>
                <a
                  className="proj-link"
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePortfolio('projects');
                  }}
                >
                  Ver no portfólio ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTATO DO CV */}
      <section className="cta-section" id="contact">
        <div className="cta-bg" aria-hidden="true" />
        <p className="cta-sub reveal in">Disponível para oportunidades</p>
        <h2 className="cta-headline reveal in" style={{ transitionDelay: '.08s' }}>
          VAMOS CONVERSAR SOBRE<br />
          O <em>projeto</em> OU A VAGA?
        </h2>
        <div className="cta-actions reveal in" style={{ transitionDelay: '.16s' }}>
          <a className="btn-primary" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button
            className="btn-ghost"
            type="button"
            onClick={() => onCopyEmail(personalInfo.email)}
          >
            Copiar e-mail
          </button>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />
    </main>
  );
};
