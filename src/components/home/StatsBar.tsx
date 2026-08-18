import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '../../types';

interface StatsBarProps {
  stats: StatItem[];
  label?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, label = 'Números da carreira' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate each number smoothly
            stats.forEach((item, index) => {
              const target = item.value;
              const duration = 1500; // ms
              const startTime = performance.now();

              const step = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = Math.floor(easeProgress * target);

                setCounts((prev) => {
                  const copy = [...prev];
                  copy[index] = currentVal;
                  return copy;
                });

                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  setCounts((prev) => {
                    const copy = [...prev];
                    copy[index] = target;
                    return copy;
                  });
                }
              };

              requestAnimationFrame(step);
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className={`stats-bar stagger ${hasAnimated ? 'in' : ''}`}
      aria-label={label}
    >
      {stats.map((stat, idx) => (
        <div key={`stat-${idx}`} className="stat-cell">
          <div className="stat-val">
            {hasAnimated ? counts[idx] : 0}
            {stat.suffix ? <sup>{stat.suffix}</sup> : null}
          </div>
          <div className="stat-lbl">{stat.label}</div>
          <div className="stat-sub">{stat.sub}</div>
        </div>
      ))}
    </section>
  );
};
