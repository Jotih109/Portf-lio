import React from 'react';
import { certificationsData } from '../../data/portfolioData';

export const CvCertifications: React.FC = () => {
  return (
    <section className="cv-section alt" id="certs">
      <div className="section-label reveal in">Qualificações</div>
      <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
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
  );
};
