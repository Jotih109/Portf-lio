import React from 'react';
import { personalInfo } from '../../data/portfolioData';

interface ContactSectionProps {
  onCopyEmail: (email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyEmail }) => {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-bg" aria-hidden="true" />
      <p className="cta-sub reveal in">Vamos conversar</p>
      <h2 className="cta-headline reveal in" style={{ animationDelay: '.08s' }}>
        SE <em>INTERESSOU?</em><br />
        ENTRE EM CONTATO
      </h2>
      <div className="cta-actions reveal in" style={{ animationDelay: '.16s' }}>
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
  );
};
