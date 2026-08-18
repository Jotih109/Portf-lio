import React from 'react';
import { personalInfo } from '../../data/portfolioData';

export const Marquee: React.FC = () => {
  return (
    <div className="marquee-section">
      <div className="marquee-track" aria-hidden="true">
        {personalInfo.marqueeTechs.map((tech: string, idx: number) => (
          <span key={`m1-${idx}`} className="marquee-item">
            {tech}
          </span>
        ))}
        {/* Duplicate items for continuous loop */}
        {personalInfo.marqueeTechs.map((tech: string, idx: number) => (
          <span key={`m2-${idx}`} className="marquee-item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
