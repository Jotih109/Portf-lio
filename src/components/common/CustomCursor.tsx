import React, { useEffect, useRef, useState } from 'react';

/** Cards que recebem o spotlight de iluminacao (--mouse-x / --mouse-y). */
const SPOTLIGHT_SELECTOR =
  '.project-card, .cert-card, .cv-entry';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], .project-card, .cert-card, .tech-badge, .filter-btn, .menu-link, .cta-btn, #burger';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Só exige mouse de verdade. prefers-reduced-motion NAO desliga o
    // cursor: ele acompanha o ponteiro 1:1, nao e movimento decorativo
    // (e o Windows liga esse flag so por "Exibir animacoes" estar off).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Só agora e seguro o CSS esconder o cursor nativo.
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let animationFrameId: number;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        setIsActive(true);
        // Evita o anel voando desde o canto no primeiro movimento.
        followerX = mouseX;
        followerY = mouseY;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      setIsHover(Boolean(target.closest(INTERACTIVE_SELECTOR)));

      // Spotlight: posicao relativa ao card sob o ponteiro.
      const card = target.closest(SPOTLIGHT_SELECTOR) as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${mouseX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${mouseY - rect.top}px`);
      }
    };

    const spawnRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.setProperty('--cx', `${x}px`);
      ripple.style.setProperty('--cy', `${y}px`);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      document.body.appendChild(ripple);
      // Rede de seguranca caso o animationend nao dispare (aba em background).
      window.setTimeout(() => ripple.remove(), 900);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      spawnRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      isVisible = false;
      setIsActive(false);
      setIsHover(false);
      setIsClicking(false);
    };

    const render = () => {
      // Lerp: o anel persegue o ponteiro com inercia.
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      // Escreve apenas a POSICAO. O transform completo (incluindo o
      // translate(-50%,-50%) que centraliza) fica no CSS.
      if (dotRef.current) {
        dotRef.current.style.setProperty('--cx', `${mouseX}px`);
        dotRef.current.style.setProperty('--cy', `${mouseY}px`);
      }

      if (followerRef.current) {
        followerRef.current.style.setProperty('--fx', `${followerX}px`);
        followerRef.current.style.setProperty('--fy', `${followerY}px`);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  const state = `${isActive ? 'active' : ''} ${isHover ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${state}`} aria-hidden="true" />
      <div ref={followerRef} className={`cursor-follower ${state}`} aria-hidden="true" />
    </>
  );
};
