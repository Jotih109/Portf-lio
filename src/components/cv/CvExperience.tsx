import React from 'react';
import { experiencesData } from '../../data/portfolioData';

export const CvExperience: React.FC = () => {
  return (
    <section className="cv-section" id="experience">
      <div className="section-label reveal in">Histórico profissional</div>
      <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
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
  );
};
