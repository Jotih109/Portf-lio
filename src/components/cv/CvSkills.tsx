import React from 'react';
import { skillBarsData, ecosystemTags, languages } from '../../data/portfolioData';

export const CvSkills: React.FC = () => {
  return (
    <section className="cv-section" id="skills">
      <div className="section-label reveal in">Competências</div>
      <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
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
  );
};
