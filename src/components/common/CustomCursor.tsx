import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // Check if fine pointer is supported (mouse, not touch screen)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isActive) setIsActive(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, summary, [role="button"], .project-card, .cert-card, .tool-card, .stat-cell, .tech-badge')
        );
        setIsHover(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setIsHover(false);
    };

    const render = () => {
      // Lerp for smooth follower animation
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isActive ? 'active' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className={`cursor-follower ${isActive ? 'active' : ''} ${isHover ? 'hover' : ''}`}
        aria-hidden="true"
      />
    </>
  );
};
