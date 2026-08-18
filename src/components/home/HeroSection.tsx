import React from 'react';
import { personalInfo } from '../../data/portfolioData';

interface HeroSectionProps {
  onNavigateProjects: () => void;
  onNavigateContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateProjects,
  onNavigateContact,
}) => {
  return (
    <section className="hero" id="hero">
      <svg
        className="hero-bg-lines"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-100 600 C200 700 400 300 700 350 C900 390 1000 600 1300 500 C1500 430 1600 200 1800 150"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1"
        />
        <path
          d="M-50 400 C150 500 300 200 600 250 C850 290 900 500 1200 380 C1400 290 1500 100 1700 50"
          stroke="rgba(255,176,32,0.10)"
          strokeWidth="0.8"
        />
        <path
          d="M100 750 C300 800 500 450 750 500 C950 540 1050 720 1350 620 C1550 550 1650 330 1850 280"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.6"
        />
        <path
          d="M0 200 C200 280 350 80 600 100 C820 120 870 320 1150 200 C1330 120 1420 -20 1620 -70"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="hero-ghost" aria-hidden="true">
        &lt;/&gt;
      </div>

      <div className="hero-inner">
        <h1 className="hero-title reveal in" style={{ transitionDelay: '.06s' }}>
          {personalInfo.titlePrefix}
          <br />
          <em>{personalInfo.titleEm}</em> QUE
          <br />
          AGUENTA ESCALA.
        </h1>

        <div className="hero-role reveal in" style={{ transitionDelay: '.12s' }}>
          {personalInfo.role}
        </div>

        <p className="hero-desc reveal in" style={{ transitionDelay: '.18s' }}>
          Sou <b>{personalInfo.name}</b>. Desenvolvo <b>APIs resilientes</b>, arquiteturas escaláveis e produtos web robustos
          que operam com alta performance e tolerância a falhas.
        </p>

        <div className="hero-actions reveal in" style={{ transitionDelay: '.24s' }}>
          <a
            className="btn-primary"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigateProjects();
            }}
          >
            Ver projetos
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
          <a
            className="btn-ghost"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigateContact();
            }}
          >
            Entrar em contato
          </a>
        </div>

        <div className="hero-meta reveal in" style={{ transitionDelay: '.3s' }}>
          <div className="hm-item">
            <b>{personalInfo.yearsExperience}</b>
            <span>anos de código</span>
          </div>
          <div className="hm-item">
            <b>{personalInfo.primaryStacks}</b>
            <span>principais stacks</span>
          </div>
          <div className="hm-item">
            <b>Remoto</b>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        Role para explorar
      </div>
    </section>
  );
};
