import {
  Project,
  Experience,
  SkillBar,
  Education,
  FaqItem,
} from '../types';

export const personalInfo = {
  name: 'João Lamim',
  initials: 'JL',
  role: 'Engenheiro de Software · Full-Stack',
  titlePrefix: 'CONSTRUO',
  titleEm: 'software',
  titleSuffix: 'QUE\nAGUENTA ESCALA.',
  location: 'Brasil · Ribeirão Preto (GMT-3)',
  email: 'jotih109@gmail.com',
  telefone: '19 99185-1365',
  available: true,
  statusText: 'Disponível para novos projetos',
  statusCvText: 'Disponível para novos desafios',
  bio: 'Sou João Lamim. Desenvolvo APIs resilientes, arquiteturas escaláveis e produtos web robustos que operam com alta performance e tolerância a falhas.',
  executiveSummary: 'Engenheiro de software com 0.3 anos de experiência focado em arquitetura back-end, modelagem de dados e APIs de alto throughput. Especialista em construir microsserviços tolerantes a falhas em Node.js, TypeScript e Python, com experiência sólida em nuvem (AWS), mensageria e observabilidade.',
  yearsExperience: '6+',
  primaryStacks: 'Node · Python · TS',
  links: {
    github: 'https://github.com/Jotih109',
    linkedin: 'https://www.linkedin.com/in/joão-vitor-lamim-dos-santos-52599a304/',
  },
  marqueeTechs: [
    'TypeScript',
    'Node.js',
    'React',
    'SQL',
    'Docker',
    'AWS',
    'Python',
    'C#',
    'C++',
    'FastAPI',
    'NestJS',
    'Next.js',
    'CI/CD',
  ],
};

export const projectsData: Project[] = [
  {
    id: 'gateway-integracoes',
    index: '01',
    category: 'backend',
    layout: 'wide',
    featured: true,
    type: 'Back-end · Arquitetura',
    title: 'Gateway de Integrações Resiliente',
    description: 'Camada de APIs que unifica múltiplos provedores externos com retry inteligente, rate limit adaptativo, filas assíncronas e observabilidade completa.',
    metric: 'p95: 180ms · 99,99% uptime',
    stack: ['Node.js', 'TypeScript', 'Docker', 'SQL'],
    links: [
      { label: 'Discutir arquitetura', href: '#contact' },
      { label: 'GitHub', href: 'https://github.com/', external: true },
    ],
  },
  {
    id: 'painel-metricas',
    index: '02',
    category: 'frontend',
    layout: 'tall',
    type: 'Dashboard · Front-end',
    title: 'Painel de Métricas em Tempo Real',
    description: 'Interface analítica de alta performance com streaming de dados via WebSocket e renderização instantânea de grandes volumes.',
    metric: 'Lighthouse 98 · LCP 1,1s',
    stack: ['React', 'TypeScript', 'WebSocket', 'Vite'],
    links: [
      { label: 'Ver detalhes', href: '#contact' },
      { label: 'GitHub', href: 'https://github.com/', external: true },
    ],
  },
  {
    id: 'pipeline-deploy',
    index: '03',
    category: 'infra',
    layout: 'standard',
    type: 'Infra · DevOps',
    title: 'Pipeline de Deploy Automatizado',
    description: 'Automação de ponta a ponta: build em containers, validação de testes automatizados e deploy sem downtime com rollback.',
    metric: 'Deploy: 40min ➔ 6min',
    stack: ['GitHub Actions', 'Docker', 'AWS'],
    links: [
      { label: 'Detalhes', href: '#contact' },
    ],
  },
  {
    id: 'pipeline-dados',
    index: '04',
    category: 'backend',
    layout: 'standard',
    type: 'Dados · Pipeline',
    title: 'Pipeline de Ingestão de Dados',
    description: 'Processamento e transformação resiliente de grandes cargas de dados diárias com reprocessamento idempotente.',
    metric: '2M+ registros / dia',
    stack: ['Python', 'SQL'],
    links: [
      { label: 'Detalhes', href: '#contact' },
    ],
  },
];

export const experiencesData: Experience[] = [
  {
    id: 'exp-senior',
    period: '06/2026 — Atual',
    current: true,
    role: 'Analista de Sistemas Jr.',
    company: 'Doqt',
    focus: 'Desenvolvimento, automação e otimização de sistemas',
    location: 'Presencial',
    stack: ['Python', 'TypeScript', 'SQL', 'Azure', 'React', 'Docker', 'Git', 'C#', 'C++'],
    bullets: [
      'Lidero a arquitetura de integrações e APIs críticas, unificando provedores externos com fila assíncrona e tolerância a falhas.',
      'Otimização de performance: latência p95 reduzida de 1,2s para 180ms através de índices, cache e query tuning.',
      'Implementação de observabilidade com métricas e traces distribuídos, reduzindo MTTR de incidentes em 60%.',
    ],
  },
  {
    id: 'exp-junior',
    period: '01/2026 — 05/2026',
    current: false,
    role: 'E-Commerce Seller',
    company: 'Eletroserv',
    focus: 'Vendas, embalagem e envio de produtos',
    location: 'Presencial',
    stack: ['Vendas', 'Organização'],
    bullets: [
      'Vendas, embalagem e envio de produtos',
      'Organização',
    ],
  },
  {
    id: 'exp-pleno',
    period: '09/2025 — 12/2025',
    current: false,
    role: 'Serviços Gerais',
    company: 'Suzuki MaiSabor',
    focus: 'Serviços Gerais',
    location: 'Presencial',
    stack: ['Trabalho em equipe', 'Organização', 'Limpeza'],
    bullets: [
      'Trabalho em equipe',
      'Organização',
      'Limpeza'
    ],
  },
];

export const skillBarsData: SkillBar[] = [
  { name: 'C# / JavaScript / Python', level: 54, label: 'Intermediário+' },
  { name: 'Node.js / Express / SQL', level: 50, label: 'Intermediário+' },
  { name: 'Azure / MongoDB / C++', level: 45, label: 'Intermediário' },
  { name: 'Docker / AWS / React / Next.js', level: 42, label: 'Intermediário+' },
  { name: 'Git', level: 40, label: 'Intermediário' },
];

export const ecosystemTags = [
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

export const languages = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Avançado (leitura, escrita e conversação técnica)' },
];

export const educationData: Education[] = [
  {
    period: '2025 — ATUAL',
    degree: 'Engenharia de Software',
    institution: 'UNAERP · Cursando',
  },
  {
    period: '2022 — 2024',
    degree: 'Analise e Desenvolvimento de Sistemas',
    institution: 'SENAI · Concluído',
  },
  {
    period: '2021 — 2023',
    degree: 'Curso de Programação para Internet',
    institution: 'OneBitCode · Concluído',
  },
];

export const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Você trabalha remoto?',
    answer: 'Sim, 100% remoto no fuso do Brasil (GMT-3), com facilidade de alinhamento com equipes internacionais.',
  },
  {
    id: 'faq-2',
    question: 'Aceita projetos pontuais ou só posições fixas?',
    answer: 'Ambos. Atuo em projetos fechados de consultoria/arquitetura e também em contratações de longo prazo.',
  },
  {
    id: 'faq-3',
    question: 'Qual o seu prazo típico de resposta?',
    answer: 'Respondo e-mails em até 24 horas úteis com direcionamento técnico e próximos passos claros.',
  },
];
