import React from 'react';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="quote-section">
      <div className="section-label reveal in">Como eu trabalho</div>
      <blockquote className="quote-text reveal in" style={{ transitionDelay: '.08s' }}>
        Código <b>chato</b> é código que dorme à noite.
      </blockquote>
      <p className="quote-sig reveal in" style={{ transitionDelay: '.16s' }}>
        Prefiro o simples e testado ao complexo que quebra
      </p>
    </section>
  );
};
