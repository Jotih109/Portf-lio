import React, { useState } from 'react';

interface TechItem {
  name: string;
  category: string;
  accentColor?: string;
  icon: React.ReactNode;
}

const TECH_LIST: TechItem[] = [
  {
    name: 'JavaScript',
    category: 'Linguagem',
    accentColor: '#F7DF1E',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M7 16.5c.5.8 1.2 1.3 2.2 1.3 1.1 0 1.9-.6 1.9-1.5 0-1-.7-1.4-2-2-1.6-.7-2.6-1.5-2.6-3.1 0-1.7 1.4-3 3.3-3 1.4 0 2.3.5 2.9 1.6l-1.4.9c-.3-.6-.8-.9-1.5-.9-.8 0-1.4.5-1.4 1.2 0 .8.5 1.2 1.7 1.7 1.8.8 2.9 1.6 2.9 3.3 0 2-1.5 3.3-3.8 3.3-2 0-3.2-1-3.7-2.1l1.4-.8zm8-7.7h1.9v7.1c0 1.2-.6 1.8-1.7 1.8-.6 0-1.1-.2-1.5-.5l.5-1.4c.2.2.4.3.7.3.4 0 .6-.2.6-.7V8.8z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Linguagem',
    accentColor: '#3178C6',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M11.5 9.2H7V7.5h10.8v1.7h-4.5v10.3h-1.8V9.2zm4.1 6.5c.5.8 1.3 1.3 2.3 1.3 1.2 0 1.9-.6 1.9-1.5 0-1-.7-1.4-2-2-1.7-.7-2.7-1.5-2.7-3.1 0-1.7 1.4-3 3.4-3 1.4 0 2.4.5 3 1.6l-1.4.9c-.3-.6-.8-.9-1.6-.9-.8 0-1.4.5-1.4 1.2 0 .8.5 1.2 1.7 1.7 1.8.8 3 1.6 3 3.3 0 2-1.5 3.3-3.9 3.3-2 0-3.3-1-3.8-2.1l1.5-.7z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    accentColor: '#5FA04E',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" fill="#5FA04E" />
        <path d="M12 4.2L5.2 8.1v7.8L12 19.8l6.8-3.9V8.1L12 4.2z" fill="#18181B" />
        <path
          d="M11.5 8.5c0-.6.5-1 1-1h1.8c1.5 0 2.7.9 2.7 2.4 0 1.1-.6 1.9-1.5 2.2l1.8 2.9h-1.8l-1.5-2.6h-1v2.6h-1.5V8.5zm1.5 3.4h1.1c.7 0 1.2-.4 1.2-1s-.5-1-1.2-1H13v2z"
          fill="#5FA04E"
        />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Linguagem',
    accentColor: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v2.8h5.9v.8H6.5S4 6.7 4 9.9c0 3.2 2.2 3.1 2.2 3.1h1.3V11.2c0-2 1.7-2 1.7-2h5.7s1.7 0 1.7-1.7V4.7S16.9 2 11.9 2zm-1.6 1.7c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-2.8H9.1v-.8h8.4s2.5.2 2.5-3c0-3.2-2.2-3.1-2.2-3.1h-1.3v1.8c0 2-1.7 2-1.7 2H9.1s-1.7 0-1.7 1.7v2.8s-.3 2.7 4.7 2.7zm1.6-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: 'C',
    category: 'Linguagem',
    accentColor: '#659AD2',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z" fill="#00599C" opacity=".25" />
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z" stroke="#659AD2" strokeWidth="1.5" />
        <path
          d="M15.5 8.8c-.9-.6-2-.9-3.2-.9-3 0-5.2 2.1-5.2 5.1s2.2 5.1 5.2 5.1c1.2 0 2.3-.3 3.2-.9l.7 1.6c-1.1.7-2.5 1-3.9 1-4.2 0-7.2-2.9-7.2-6.8s3-6.8 7.2-6.8c1.4 0 2.8.4 3.9 1l-.7 1.6z"
          fill="#A8B9CC"
        />
      </svg>
    ),
  },
  {
    name: 'Azure',
    category: 'Cloud',
    accentColor: '#0078D4',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M13.2 3L6.8 15.6l5.2 5.4h6.5L13.2 3z" fill="#0078D4" />
        <path d="M6.8 15.6L2.5 18.2l3.8 2.8h5.7L6.8 15.6z" fill="#005BA1" />
        <path d="M13.2 3l-4 7.8 4.6 4.7 4.7-12.5h-5.3z" fill="#50E6FF" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    category: 'Database',
    accentColor: '#4169E1',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 3c-4.4 0-8 1.8-8 4v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7c0-2.2-3.6-4-8-4z" fill="#336791" opacity=".25" />
        <path
          d="M20 7c0 2.2-3.6 4-8 4S4 9.2 4 7m16 5c0 2.2-3.6 4-8 4s-8-1.8-8-4m16 5c0 2.2-3.6 4-8 4s-8-1.8-8-4"
          stroke="#4169E1"
          strokeWidth="1.6"
        />
        <ellipse cx="12" cy="7" rx="8" ry="4" stroke="#4169E1" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'DevOps',
    accentColor: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Power BI',
    category: 'Analytics',
    accentColor: '#F2C811',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="3" y="13" width="4.5" height="8" rx="1.5" fill="#F2C811" opacity=".7" />
        <rect x="9.5" y="8" width="4.5" height="13" rx="1.5" fill="#F2C811" opacity=".85" />
        <rect x="16" y="3" width="4.5" height="18" rx="1.5" fill="#F2C811" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containers',
    accentColor: '#2496ED',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M2.5 13.5c.8-3.5 3.8-5.5 8-5.5 4.5 0 8 3 8 7 0 4.5-4 7-9.5 7-5 0-7.8-2.5-8.5-5.5"
          stroke="#2496ED"
          strokeWidth="1.5"
        />
        <rect x="5.5" y="5.5" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <rect x="8.3" y="5.5" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <rect x="11.1" y="5.5" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <rect x="8.3" y="3" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <rect x="11.1" y="3" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <rect x="13.9" y="5.5" width="2.2" height="2" rx=".3" fill="#2496ED" />
        <circle cx="16.5" cy="14" r="1" fill="#2496ED" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    category: 'Cloud',
    accentColor: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M7 11.5c-.8.5-1.5 1.2-1.5 2.1 0 1.2.9 2 2.3 2 1.4 0 2.2-.9 2.2-2v-4.5h-1.5v4.3c0 .5-.3.8-.8.8s-.8-.3-.8-.8c0-.6.4-1 1-1.3l.9-.4V10c-.8.1-1.3.7-1.8 1.5zm6.5-2.4L12 15.5h1.5l.4-1.6h2l.4 1.6h1.6l-1.5-6.4h-1.9zm.6 3.6l.6-2.6.6 2.6h-1.2zm-9.3 6.1c5.2 2.8 11.2 1.6 15.4-.8l.4.8c-4.6 2.7-11.2 3.9-16.7.7l.9-.7z"
          fill="#FF9900"
        />
        <path d="M19.8 18.5l1.6.4-1 1.2-.6-1.6z" fill="#FF9900" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    category: 'Cache',
    accentColor: '#DC382D',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" fill="#DC382D" />
        <path d="M3 11l9 4.5 9-4.5v3l-9 4.5-9-4.5v-3z" fill="#A8251D" />
        <path d="M3 16.5l9 4.5 9-4.5v2.5l-9 4.5-9-4.5v-2.5z" fill="#7C1710" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'Front-end',
    accentColor: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'NestJS',
    category: 'Framework',
    accentColor: '#E0234E',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12.4 2.2c-.3 0-.6.2-.8.5L3.8 13.6c-.3.4-.2 1 .2 1.3l2.8 2.1c.3.2.7.2 1-.1l5-5.2c.2-.2.5-.2.7 0l2.7 2.8c.3.3.3.8 0 1.1l-6 6.3c-.4.4-.3 1.1.2 1.4l2.1 1.2c.3.2.7.1.9-.2l8.8-13.2c.3-.5.2-1.1-.3-1.4l-4.5-3.3c-.2-.1-.5-.2-.7-.2h-2.8z"
          fill="#E0234E"
        />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    category: 'API',
    accentColor: '#E10098',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 2.5l8.2 4.8v9.4L12 21.5l-8.2-4.8V7.3L12 2.5z" stroke="#E10098" strokeWidth="1.3" />
        <path d="M12 2.5l8.2 14.2H3.8L12 2.5z" stroke="#E10098" strokeWidth="1.3" />
        <circle cx="12" cy="2.5" r="1.8" fill="#E10098" />
        <circle cx="20.2" cy="7.3" r="1.8" fill="#E10098" />
        <circle cx="20.2" cy="16.7" r="1.8" fill="#E10098" />
        <circle cx="12" cy="21.5" r="1.8" fill="#E10098" />
        <circle cx="3.8" cy="16.7" r="1.8" fill="#E10098" />
        <circle cx="3.8" cy="7.3" r="1.8" fill="#E10098" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    category: 'OS / Infra',
    accentColor: '#FCC624',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 2.5c-2.4 0-4 2-4 5 0 1.5.4 3.2 1 4.5-1.5 1-2.5 2.8-2.5 5 0 2.5 1.5 4.5 4.5 4.5s5-.8 6.5-2.2c1.2-1.2 1-3.3-.5-4.8.8-1.5 1-3.2 1-5 0-3-1.6-7-6-7z"
          fill="#FCC624"
          opacity=".85"
        />
        <circle cx="10" cy="6" r="1" fill="#000" />
        <circle cx="14" cy="6" r="1" fill="#000" />
        <path d="M10.5 8.5c.8.8 2.2.8 3 0" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TailwindCSS',
    category: 'Estilização',
    accentColor: '#06B6D4',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12.5 7.5c-2.8 0-4.5 1.4-5.2 4.2 1-1.4 2.3-1.9 3.8-1.5.9.3 1.5 1 2.2 1.7 1.1 1.2 2.5 2.6 5.2 2.6 2.8 0 4.5-1.4 5.2-4.2-1 1.4-2.3 1.9-3.8 1.5-.9-.3-1.5-1-2.2-1.7-1.1-1.2-2.5-2.6-5.2-2.6zm-7 6c-2.8 0-4.5 1.4-5.2 4.2 1-1.4 2.3-1.9 3.8-1.5.9.3 1.5 1 2.2 1.7 1.1 1.2 2.5 2.6 5.2 2.6 2.8 0 4.5-1.4 5.2-4.2-1 1.4-2.3 1.9-3.8 1.5-.9-.3-1.5-1-2.2-1.7-1.1-1.2-2.5-2.6-5.2-2.6z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Framework',
    accentColor: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000000" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <path d="M15.5 8.5v7m-7-7v7l8.2-8.3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'Versionamento',
    accentColor: '#F05032',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M21.5 10.7L13.3 2.5a1.8 1.8 0 0 0-2.6 0L2.5 10.7a1.8 1.8 0 0 0 0 2.6l8.2 8.2a1.8 1.8 0 0 0 2.6 0l8.2-8.2a1.8 1.8 0 0 0 0-2.6z"
          fill="#F05032"
          opacity=".25"
        />
        <path
          d="M21.5 10.7L13.3 2.5a1.8 1.8 0 0 0-2.6 0L2.5 10.7a1.8 1.8 0 0 0 0 2.6l8.2 8.2a1.8 1.8 0 0 0 2.6 0l8.2-8.2a1.8 1.8 0 0 0 0-2.6z"
          stroke="#F05032"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="1.8" fill="#F05032" />
        <circle cx="7.8" cy="12" r="1.8" fill="#F05032" />
        <circle cx="15" cy="9" r="1.8" fill="#F05032" />
        <path d="M7.8 12h4.2m0 0l3-3" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Database',
    accentColor: '#47A248',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 2C11.5 4 7 8.5 7 13.5c0 3.3 2.2 6.5 5 7.5 2.8-1 5-4.2 5-7.5C17 8.5 12.5 4 12 2z"
          fill="#47A248"
          opacity=".2"
        />
        <path
          d="M12 2C11.5 4 7 8.5 7 13.5c0 3.3 2.2 6.5 5 7.5 2.8-1 5-4.2 5-7.5C17 8.5 12.5 4 12 2z"
          stroke="#47A248"
          strokeWidth="1.4"
        />
        <path d="M12 2v19" stroke="#47A248" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export const TechCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="tech-carousel-section"
      aria-label="Tecnologias e ferramentas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="tech-carousel-mask">
        <div
          className={`tech-carousel-track ${isPaused ? 'paused' : ''}`}
          style={{ animationPlayState: isPaused ? 'paused' : undefined }}
        >
          {/* First loop */}
          {TECH_LIST.map((tech, idx) => (
            <div
              key={`tech-1-${idx}`}
              className="tech-badge"
              style={{ '--badge-accent': tech.accentColor || '#FFB020' } as React.CSSProperties}
            >
              <div className="tech-badge-icon">{tech.icon}</div>
              <span className="tech-badge-name">{tech.name}</span>
              <span className="tech-badge-category">{tech.category}</span>
            </div>
          ))}

          {/* Duplicate loop for seamless infinite marquee */}
          {TECH_LIST.map((tech, idx) => (
            <div
              key={`tech-2-${idx}`}
              className="tech-badge"
              style={{ '--badge-accent': tech.accentColor || '#FFB020' } as React.CSSProperties}
              aria-hidden="true"
            >
              <div className="tech-badge-icon">{tech.icon}</div>
              <span className="tech-badge-name">{tech.name}</span>
              <span className="tech-badge-category">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
