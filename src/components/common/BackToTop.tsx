import React, { useEffect, useState } from 'react';
import { scrollToTarget } from '../../utils/scroll';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => scrollToTarget();

  return (
    <button
      id="toTop"
      type="button"
      className={isVisible ? 'show' : ''}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  );
};
