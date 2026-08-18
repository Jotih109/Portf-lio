import React from 'react';
import { stackCategories } from '../../data/portfolioData';

export const StackSection: React.FC = () => {
  return (
    <section className="stack-section" id="stack">
      <div className="section-label reveal in">Ferramentas do dia a dia</div>
      <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
        STACK<br />
        <em>principal</em>
      </h2>

      <div className="stack-grid stagger in">
        {stackCategories.map((category, catIdx) => (
          <div key={`cat-${catIdx}`} className="stack-col">
            <h3>{category.title}</h3>
            <ul>
              {category.skills.map((skill, sIdx) => (
                <li key={`skill-${sIdx}`}>
                  {skill.name} <i>{skill.frequency}</i>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
