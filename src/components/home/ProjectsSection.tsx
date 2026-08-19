import React, { useState } from 'react';
import { ProjectCategory } from '../../types';
import { projectsData } from '../../data/portfolioData';

interface ProjectsSectionProps {
  onNavigateContact: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigateContact }) => {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filteredProjects = projectsData.filter(
    (proj) => filter === 'all' || proj.category === filter
  );

  return (
    <section className="projects-section" id="projects">
      <div className="projects-head">
        <div>
          <div className="section-label reveal in">Destaques</div>
          <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
            PROJETOS<br />
            EM <em>produção</em>
          </h2>
        </div>
        <div
          className="projects-filters reveal in"
          style={{ animationDelay: '.16s' }}
          role="group"
          aria-label="Filtrar projetos"
        >
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            type="button"
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${filter === 'backend' ? 'active' : ''}`}
            type="button"
            onClick={() => setFilter('backend')}
          >
            Back-end
          </button>
          <button
            className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
            type="button"
            onClick={() => setFilter('frontend')}
          >
            Front-end
          </button>
          <button
            className={`filter-btn ${filter === 'infra' ? 'active' : ''}`}
            type="button"
            onClick={() => setFilter('infra')}
          >
            Infra
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.layout || ''}`}
            data-cat={project.category}
          >
            {/* Visual SVG diagram representation */}
            <div className="pc-visual" aria-hidden="true">
              {project.id === 'gateway-integracoes' && (
                <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="pv1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E1400" />
                      <stop offset="100%" stopColor="#0A0A0B" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="400" fill="url(#pv1)" />
                  <g stroke="rgba(255,176,32,.35)" fill="none" strokeWidth="1.2">
                    <circle cx="300" cy="200" r="60" />
                    <circle cx="150" cy="120" r="26" />
                    <circle cx="470" cy="130" r="26" />
                    <circle cx="140" cy="300" r="26" />
                    <circle cx="460" cy="300" r="26" />
                    <path d="M176 132 L245 178 M444 142 L356 180 M166 288 L248 226 M434 288 L356 228" />
                  </g>
                </svg>
              )}

              {project.id === 'painel-metricas' && (
                <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="pv2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#141419" />
                      <stop offset="100%" stopColor="#0A0A0B" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="400" fill="url(#pv2)" />
                  <g fill="rgba(255,176,32,.28)">
                    <rect x="80" y="290" width="46" height="70" rx="3" />
                    <rect x="150" y="240" width="46" height="120" rx="3" />
                    <rect x="220" y="180" width="46" height="180" rx="3" />
                    <rect x="290" y="220" width="46" height="140" rx="3" />
                    <rect x="360" y="130" width="46" height="230" rx="3" />
                    <rect x="430" y="90" width="46" height="270" rx="3" />
                  </g>
                  <path
                    d="M100 300 L173 250 L243 195 L313 230 L383 145 L453 105"
                    stroke="rgba(255,176,32,.7)"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              )}

              {project.id === 'pipeline-deploy' && (
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="400" fill="#0F0F12" />
                  <g stroke="rgba(255,176,32,.3)" fill="none" strokeWidth="1.4">
                    <rect x="90" y="80" width="220" height="50" rx="6" />
                    <rect x="90" y="170" width="220" height="50" rx="6" />
                    <rect x="90" y="260" width="220" height="50" rx="6" />
                    <path d="M200 130 L200 170 M200 220 L200 260" />
                  </g>
                </svg>
              )}

              {project.id === 'pipeline-dados' && (
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="400" fill="#12100A" />
                  <g stroke="rgba(255,176,32,.28)" fill="none" strokeWidth="1.3">
                    <ellipse cx="200" cy="120" rx="95" ry="32" />
                    <path d="M105 120 L105 260 A95 32 0 0 0 295 260 L295 120" />
                    <path d="M105 190 A95 32 0 0 0 295 190" />
                  </g>
                </svg>
              )}
            </div>

            <span className="pc-index">{project.index}</span>

            <div className="pc-body">
              <div className="pc-type">{project.type}</div>
              <h3 className="pc-title">{project.title}</h3>
              <p className="pc-desc">{project.description}</p>
              <span className="pc-metric">{project.metric}</span>
              <div className="pc-stack">
                {project.stack.map((st, sIdx) => (
                  <span key={`stack-${sIdx}`}>{st}</span>
                ))}
              </div>
              <div className="pc-links">
                {project.links?.map((link, lIdx) => (
                  link.external ? (
                    <a
                      key={`link-${lIdx}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={`link-${lIdx}`}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateContact();
                      }}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
