import React from 'react';
import { experiencesData } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="exp-section" id="experience">
      <div className="section-label reveal in">Trajetória</div>
      <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
        EXPERIÊNCIA
      </h2>

      <div className="table-wrap reveal in" style={{ transitionDelay: '.14s' }}>
        <table className="exp-table">
          <thead>
            <tr>
              <th scope="col">Período</th>
              <th scope="col">Cargo</th>
              <th scope="col">Empresa</th>
              <th scope="col">Foco</th>
              <th scope="col">Stack</th>
            </tr>
          </thead>
          <tbody>
            {experiencesData.map((exp) => (
              <tr key={exp.id}>
                <td>
                  {exp.current ? (
                    <span className="exp-current">{exp.period}</span>
                  ) : (
                    exp.period
                  )}
                </td>
                <td className="exp-role">{exp.role}</td>
                <td>{exp.company}</td>
                <td>{exp.focus}</td>
                <td className="exp-stack">{exp.stack.join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
