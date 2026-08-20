import React from 'react';
import { techIcons } from '../../data/techIcons';

/**
 * Azure, Power BI, AWS, C#, C++ e SQL nao saem do Simple Icons: a Microsoft e a
 * Amazon pediram a remocao dos proprios icones de la, e SQL nao e um produto.
 * Esses seguem como SVG proprio, com os paths oficiais do devicon (MIT) e os
 * gradientes achatados em cor solida — `id` de gradiente duplicaria no DOM,
 * porque a faixa renderiza cada badge duas vezes pro loop.
 */
const CUSTOM_ICONS: Record<
  string,
  { color: string; viewBox?: string; glyph: React.ReactNode }
> = {
  Azure: {
    color: '#0078D4',
    viewBox: '0 0 128 128',
    glyph: (
      <>
        <path
          d="M46.09.002h40.685L44.541 125.137a6.485 6.485 0 01-6.146 4.413H6.733a6.482 6.482 0 01-5.262-2.699 6.474 6.474 0 01-.876-5.848L39.944 4.414A6.488 6.488 0 0146.09 0z"
          fill="#0669BC"
          transform="translate(.587 4.468) scale(.91904)"
        />
        <path
          d="M97.28 81.607H37.987a2.743 2.743 0 00-1.874 4.751l38.1 35.562a5.991 5.991 0 004.087 1.61h33.574z"
          fill="#0078D4"
        />
        <path
          d="M98.055 4.408A6.476 6.476 0 0091.917.002H46.575a6.478 6.478 0 016.137 4.406l39.35 116.594a6.476 6.476 0 01-6.137 8.55h45.344a6.48 6.48 0 006.136-8.55z"
          fill="#2FADE0"
          transform="translate(.587 4.468) scale(.91904)"
        />
      </>
    ),
  },
  'Power BI': {
    color: '#F2C811',
    glyph: (
      <>
        {/* tres barras ascendentes, nos tres tons de ouro da marca */}
        <rect x="3" y="13" width="4.5" height="8" rx="1.5" fill="#F9E589" />
        <rect x="9.5" y="8" width="4.5" height="13" rx="1.5" fill="#F6D751" />
        <rect x="16" y="3" width="4.5" height="18" rx="1.5" fill="#E6AD10" />
      </>
    ),
  },
  AWS: {
    color: '#FF9900',
    // recorte no smile: o wordmark "aws" fica ilegivel a 20px
    viewBox: '0 70 128 36',
    glyph: (
      <>
        <path
          d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726z"
          fill="#FF9900"
        />
        <path
          d="M1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"
          fill="#FF9900"
        />
      </>
    ),
  },
  'C#': {
    color: '#9B4F96',
    viewBox: '0 0 128 128',
    glyph: (
      <>
        <path
          d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"
          fill="#9B4F96"
        />
        <path
          d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
          fill="#68217A"
        />
        <path
          d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"
          fill="#fff"
        />
      </>
    ),
  },
  'C++': {
    color: '#659AD2',
    viewBox: '0 0 128 128',
    glyph: (
      <>
        <path
          d="M118.766 95.82c.89-1.543 1.441-3.28 1.441-4.843V36.78c0-1.558-.55-3.297-1.441-4.84l-55.32 31.94Zm0 0"
          fill="#00599C"
        />
        <path
          d="m68.36 126.586 46.933-27.094c1.352-.781 2.582-2.129 3.473-3.672l-55.32-31.94L8.12 95.82c.89 1.543 2.121 2.89 3.473 3.672l46.933 27.094c2.703 1.562 7.13 1.562 9.832 0Zm0 0"
          fill="#004482"
        />
        <path
          d="M118.766 31.941c-.891-1.546-2.121-2.894-3.473-3.671L68.359 1.172c-2.703-1.563-7.129-1.563-9.832 0L11.594 28.27C8.89 29.828 6.68 33.66 6.68 36.78v54.196c0 1.562.55 3.3 1.441 4.843L63.445 63.88Zm0 0"
          fill="#659AD2"
        />
        <path
          d="M63.445 26.035c-20.867 0-37.843 16.977-37.843 37.844s16.976 37.844 37.843 37.844c13.465 0 26.024-7.247 32.77-18.91L79.84 73.335c-3.38 5.84-9.66 9.465-16.395 9.465-10.433 0-18.922-8.488-18.922-18.922 0-10.434 8.49-18.922 18.922-18.922 6.73 0 13.017 3.629 16.39 9.465l16.38-9.477c-6.75-11.664-19.305-18.91-32.77-18.91zM92.88 57.57v4.207h-4.207v4.203h4.207v4.207h4.203V65.98h4.203v-4.203h-4.203V57.57H92.88zm15.766 0v4.207h-4.204v4.203h4.204v4.207h4.207V65.98h4.203v-4.203h-4.203V57.57h-4.207z"
          fill="#fff"
        />
      </>
    ),
  },
  SQL: {
    color: '#0078D4',
    // cilindro do Azure SQL Database: e o unico glifo de banco que ja diz "SQL"
    viewBox: '0 0 128 128',
    glyph: (
      <>
        <path
          d="M64 36.55c-25.172 0-45.582-7.109-45.582-16.495v87.89c0 9.032 20.055 16.356 44.941 16.5H64c25.172 0 45.582-7.113 45.582-16.5v-87.89c0 9.172-20.41 16.496-45.582 16.496Zm0 0"
          fill="#0078D4"
        />
        <path
          d="M109.582 20.055c0 9.172-20.41 16.496-45.582 16.496s-45.582-7.11-45.582-16.496c0-9.387 20.41-16.5 45.582-16.5s45.582 7.113 45.582 16.5"
          fill="#E8E8E8"
        />
        <path
          d="M98.988 18.703c0 5.832-15.718 10.524-34.988 10.524s-34.988-4.692-34.988-10.524C29.012 12.871 44.73 8.25 64 8.25s34.988 4.691 34.988 10.453"
          fill="#50E6FF"
        />
        <path
          d="M64 21.332a82.193 82.193 0 0 0-27.664 4.055A81.213 81.213 0 0 0 64 29.227a79.334 79.334 0 0 0 27.664-4.125A84.332 84.332 0 0 0 64 21.332Zm0 0"
          fill="#198AB3"
        />
        <path
          d="M91.734 81.066V56.891h-6.402v29.367h17.496v-5.192ZM40.961 69.191a13.064 13.064 0 0 1-3.629-2.203 3.13 3.13 0 0 1-.852-2.277 2.418 2.418 0 0 1 1.067-2.133 4.847 4.847 0 0 1 2.988-.855 11.533 11.533 0 0 1 7.11 2.062v-6.113a18.236 18.236 0 0 0-7.11-1.137 11.67 11.67 0 0 0-7.754 2.414 7.68 7.68 0 0 0-2.984 6.332c0 3.625 2.273 6.469 7.11 8.602 1.57.668 3.05 1.527 4.41 2.562a2.982 2.982 0 0 1 1.066 2.274c0 .879-.426 1.699-1.137 2.207a5.786 5.786 0 0 1-3.203.781 11.801 11.801 0 0 1-7.75-2.988v6.613a15.411 15.411 0 0 0 7.61 1.707c2.98.176 5.933-.648 8.39-2.348a7.681 7.681 0 0 0 2.348-6.468 7.458 7.458 0 0 0-1.778-4.977 17.225 17.225 0 0 0-5.902-4.055Zm37.262 11.305a16.634 16.634 0 0 0 2.347-8.957A16.509 16.509 0 0 0 78.223 64a12.87 12.87 0 0 0-4.977-5.332 14.228 14.228 0 0 0-7.113-1.852 15.015 15.015 0 0 0-7.68 1.922A13.217 13.217 0 0 0 53.262 64a17.48 17.48 0 0 0-1.848 8.105 16.06 16.06 0 0 0 1.707 7.114 12.526 12.526 0 0 0 4.906 5.261 14.679 14.679 0 0 0 7.11 2.133l6.117 7.11h8.605l-8.75-7.82a12.736 12.736 0 0 0 7.114-5.407Zm-7.114-1.777a6.673 6.673 0 0 1-5.402 2.488 6.538 6.538 0 0 1-5.406-2.559 10.842 10.842 0 0 1-2.063-7.109 10.903 10.903 0 0 1 2.063-7.113 7.104 7.104 0 0 1 5.547-2.63 6.181 6.181 0 0 1 5.336 2.63 11.533 11.533 0 0 1 1.918 7.113 10.353 10.353 0 0 1-1.993 7.18Zm0 0"
          fill="#F2F2F2"
        />
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
  'C#',
  'C++',
  'Azure',
  'SQL',
  'GitHub',
  'Power BI',
  'Docker',
  'AWS',
  'React',
  'NestJS',
  'Linux',
  'Next.js',
  'Git',
  'MongoDB',
];

interface Badge {
  name: string;
  color: string;
  viewBox: string;
  glyph: React.ReactNode;
}

const iconsByName = new Map(techIcons.map((icon) => [icon.name, icon]));

const BADGES: Badge[] = ORDER.map((name) => {
  const custom = CUSTOM_ICONS[name];
  if (custom) {
    return {
      name,
      color: custom.color,
      viewBox: custom.viewBox ?? '0 0 24 24',
      glyph: custom.glyph,
    };
  }

  const icon = iconsByName.get(name);
  if (!icon) {
    // Lista estatica: se um nome nao casa, e erro de digitacao e aparece na hora.
    throw new Error(`TechCarousel: sem icone para "${name}"`);
  }

  return {
    name,
    color: icon.color,
    viewBox: '0 0 24 24',
    glyph: <path d={icon.path} fill="currentColor" />,
  };
});

const TechBadge: React.FC<{ badge: Badge; duplicate?: boolean }> = ({ badge, duplicate }) => (
  <div className="tech-badge" aria-hidden={duplicate || undefined}>
    <div className="tech-badge-icon" style={{ color: badge.color }}>
      <svg viewBox={badge.viewBox} width="20" height="20" aria-hidden="true">
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
