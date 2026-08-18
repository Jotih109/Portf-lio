import React from 'react';
import { principlesData } from '../../data/portfolioData';

export const PrinciplesSection: React.FC = () => {
  return (
    <section className="toolbox-section">
      <div className="section-label reveal in">Diretrizes</div>
      <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
        COMO EU<br />
        <em>penso código</em>
      </h2>

      <div className="toolbox-grid stagger in">
        {principlesData.map((principle) => (
          <div key={principle.id} className="tool-card">
            <div className="tool-icon">
              {principle.icon === 'star' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                </svg>
              )}
              {principle.icon === 'activity' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 12h4l3 8 4-16 3 8h6" />
                </svg>
              )}
              {principle.icon === 'zap' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" />
                </svg>
              )}
              {principle.icon === 'shield' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
            </div>
            <div className="tool-name">{principle.name}</div>
            <div className="tool-note">{principle.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
