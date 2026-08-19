import React from 'react';
import { techIcons } from '../../data/techIcons';

/**
 * Azure, Power BI e AWS nao existem no Simple Icons: os icones da Microsoft
 * e da Amazon foram removidos do projeto a pedido dos detentores da marca.
 * Só esses tres seguem como SVG proprio.
 */
const CUSTOM_ICONS: Record<string, { color: string; glyph: React.ReactNode }> = {
  Azure: {
    color: '#0078D4',
    glyph: (
      <>
        <path d="M13.2 3L6.8 15.6l5.2 5.4h6.5L13.2 3z" fill="#0078D4" />
        <path d="M6.8 15.6L2.5 18.2l3.8 2.8h5.7L6.8 15.6z" fill="#005BA1" />
        <path d="M13.2 3l-4 7.8 4.6 4.7 4.7-12.5h-5.3z" fill="#50E6FF" />
      </>
    ),
  },
  'Power BI': {
    color: '#F2C811',
    glyph: (
      <>
        <rect x="3" y="13" width="4.5" height="8" rx="1.5" fill="#F2C811" opacity=".7" />
        <rect x="9.5" y="8" width="4.5" height="13" rx="1.5" fill="#F2C811" opacity=".85" />
        <rect x="16" y="3" width="4.5" height="18" rx="1.5" fill="#F2C811" />
      </>
    ),
  },
  AWS: {
    color: '#FF9900',
    glyph: (
      <>
        <path
          d="M7 11.5c-.8.5-1.5 1.2-1.5 2.1 0 1.2.9 2 2.3 2 1.4 0 2.2-.9 2.2-2v-4.5h-1.5v4.3c0 .5-.3.8-.8.8s-.8-.3-.8-.8c0-.6.4-1 1-1.3l.9-.4V10c-.8.1-1.3.7-1.8 1.5zm6.5-2.4L12 15.5h1.5l.4-1.6h2l.4 1.6h1.6l-1.5-6.4h-1.9zm.6 3.6l.6-2.6.6 2.6h-1.2zm-9.3 6.1c5.2 2.8 11.2 1.6 15.4-.8l.4.8c-4.6 2.7-11.2 3.9-16.7.7l.9-.7z"
          fill="#FF9900"
        />
        <path d="M19.8 18.5l1.6.4-1 1.2-.6-1.6z" fill="#FF9900" />
      </>
    ),
  },
};

/** Ordem de exibicao na faixa. */
const ORDER = [
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'C',
  'Azure',
  'PostgreSQL',
  'GitHub',
  'Power BI',
  'Docker',
  'AWS',
  'Redis',
  'React',
  'NestJS',
  'GraphQL',
  'Linux',
  'TailwindCSS',
  'Next.js',
  'Git',
  'MongoDB',
];

interface Badge {
  name: string;
  color: string;
  glyph: React.ReactNode;
}

const iconsByName = new Map(techIcons.map((icon) => [icon.name, icon]));

const BADGES: Badge[] = ORDER.map((name) => {
  const custom = CUSTOM_ICONS[name];
  if (custom) {
    return { name, color: custom.color, glyph: custom.glyph };
  }

  const icon = iconsByName.get(name);
  if (!icon) {
    // Lista estatica: se um nome nao casa, e erro de digitacao e aparece na hora.
    throw new Error(`TechCarousel: sem icone para "${name}"`);
  }

  return {
    name,
    color: icon.color,
    glyph: <path d={icon.path} fill="currentColor" />,
  };
});

const TechBadge: React.FC<{ badge: Badge; duplicate?: boolean }> = ({ badge, duplicate }) => (
  <div className="tech-badge" aria-hidden={duplicate || undefined}>
    <div className="tech-badge-icon" style={{ color: badge.color }}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        {badge.glyph}
      </svg>
    </div>
    <span className="tech-badge-name">{badge.name}</span>
  </div>
);

export const TechCarousel: React.FC = () => {
  return (
    <section className="tech-carousel-section" aria-label="Tecnologias e ferramentas">
      <div className="tech-carousel-mask">
        <div className="tech-carousel-track">
          {BADGES.map((badge) => (
            <TechBadge key={`tech-1-${badge.name}`} badge={badge} />
          ))}

          {/* Segunda copia: e o que fecha o loop sem costura */}
          {BADGES.map((badge) => (
            <TechBadge key={`tech-2-${badge.name}`} badge={badge} duplicate />
          ))}
        </div>
      </div>
    </section>
  );
};
