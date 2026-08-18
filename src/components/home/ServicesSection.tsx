import React from 'react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="split-hub" id="services">
      <svg
        className="split-hub-bg"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 350 C200 400 400 200 700 250 C900 290 1000 450 1300 350 C1500 280 1600 100 1800 50"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <path
          d="M0 150 C250 200 450 50 720 100 C900 135 980 300 1250 200 C1430 130 1530 -30 1730 -60"
          stroke="rgba(255,176,32,0.07)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="section-label reveal in">Especialidades</div>
      <h2 className="section-title reveal in" style={{ transitionDelay: '.08s' }}>
        O QUE EU<br />
        <em>entrego</em>
      </h2>

      <div className="split-hub-inner">
        <div className="split-card reveal in">
          <span className="hub-t1">BACK-END</span>
          <span className="hub-t2">e arquitetura sólida</span>
          <p className="hub-desc">
            Construção de APIs escaláveis, modelagem de banco de alto desempenho e mensageria para sistemas que exigem disponibilidade.
          </p>
          <ul className="hub-list">
            <li>APIs REST e GraphQL padronizadas e rápidas</li>
            <li>Modelagem e otimização de PostgreSQL</li>
            <li>Filas, jobs em background e processamento assíncrono</li>
            <li>Autenticação, segurança e auditoria</li>
          </ul>
        </div>

        <div className="split-card reveal in" style={{ transitionDelay: '.1s' }}>
          <span className="hub-t1">PRODUTO</span>
          <span className="hub-t2">do design ao deploy</span>
          <p className="hub-desc">
            Entrega completa de soluções web integradas, conectando interfaces reativas à infraestrutura em nuvem.
          </p>
          <ul className="hub-list">
            <li>Aplicações React com foco em UX e velocidade</li>
            <li>Infraestrutura automatizada com Docker e AWS</li>
            <li>Pipelines de CI/CD rápidos e confiáveis</li>
            <li>Monitoramento e observabilidade em produção</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
