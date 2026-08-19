import React, { useState } from 'react';
import { faqData } from '../../data/portfolioData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-label reveal in">Perguntas comuns</div>
      <h2 className="section-title reveal in" style={{ animationDelay: '.08s' }}>
        DÚVIDAS<br />
        <em>rápidas</em>
      </h2>

      <div className="faq-list stagger in">
        {faqData.map((faq) => (
          <details key={faq.id} className="faq-item" open={Boolean(openIds[faq.id])}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                toggleFaq(faq.id);
              }}
            >
              {faq.question}
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
