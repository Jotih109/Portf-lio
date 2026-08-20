const si = require('simple-icons');
const fs = require('fs');

// label exibido -> slug do Simple Icons
const MAP = [
  ['JavaScript',  'javascript'],
  ['TypeScript',  'typescript'],
  ['Node.js',     'nodedotjs'],
  ['Python',      'python'],
  ['GitHub',      'github'],
  ['Docker',      'docker'],
  ['React',       'react'],
  ['NestJS',      'nestjs'],
  ['Linux',       'linux'],
  ['Next.js',     'nextdotjs'],
  ['Git',         'git'],
  ['MongoDB',     'mongodb'],
];

// Luminancia relativa (WCAG) para nao deixar glifo escuro sobre fundo escuro
const lum = (hex) => {
  const c = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const out = [];
for (const [name, slug] of MAP) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon) throw new Error('slug ausente: ' + slug);
  const dark = lum(icon.hex) < 0.06;
  out.push({ name, slug, color: dark ? 'FFFFFF' : icon.hex, brand: icon.hex, dark, path: icon.path });
}

const body = out.map((i) =>
  `  {\n    name: '${i.name.replace(/'/g, "\'")}',\n` +
  `    color: '#${i.color}',\n` +
  (i.dark ? `    // marca oficial e #${i.brand} (escuro demais para o fundo)\n` : '') +
  `    path:\n      '${i.path}',\n  },`
).join('\n');

fs.writeFileSync('src/data/techIcons.ts',
`/**
 * Glifos oficiais do Simple Icons (paths exatos, nao aproximacoes).
 * GERADO — nao editar a mao. Para atualizar:
 *   node scripts/gen-tech-icons.cjs
 *
 * Azure, Power BI, AWS, C# e SQL nao estao aqui: o Simple Icons removeu os icones
 * da Microsoft e da Amazon a pedido dos detentores da marca, e SQL nao e
 * um produto — todos seguem como SVG proprio dentro do TechCarousel.
 */
export interface TechIcon {
  name: string;
  /** Cor da marca, ja ajustada quando o oficial e escuro demais. */
  color: string;
  /** Path unico em viewBox 0 0 24 24. */
  path: string;
}

export const techIcons: TechIcon[] = [
${body}
];
`);
console.log('gerados %d icones', out.length);
out.filter(i => i.dark).forEach(i => console.log('  claro por contraste: %s (#%s -> #FFFFFF)', i.name, i.brand));
