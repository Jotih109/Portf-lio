import React from 'react';
import { personalInfo } from '../../data/portfolioData';

export const CvHero: React.FC = () => {
  return (
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
        RBR
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
            <p className="cv-role reveal in" style={{ animationDelay: '.08s' }}>
              {personalInfo.role}
            </p>
          </div>
        </div>

        {/* Dados de contato */}
        <ul className="cv-contact stagger in" aria-label="Dados de contato">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{personalInfo.location}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
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
      <div className="cv-summary reveal in" style={{ animationDelay: '.2s' }}>
        <div className="section-label">Resumo</div>
        <p>{personalInfo.executiveSummary}</p>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        Role para o currículo completo
      </div>
    </section>
  );
};
