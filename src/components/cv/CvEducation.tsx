import React from 'react';
import { educationData } from '../../data/portfolioData';

export const CvEducation: React.FC = () => {
  return (
    <section className="cv-section alt" id="education">
      <div className="section-label reveal in">Formação acadêmica</div>
      <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
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
              <p className="cv-entry-note">{edu.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
