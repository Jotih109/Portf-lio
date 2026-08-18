import { Project, Experience, SkillCategory, SkillBar, Education, Certification, Principle, FaqItem, StatItem } from '../types';

export const personalInfo = {
  name: 'João Lamim',
  initials: 'JL',
  role: 'Engenheiro de Software · Back-end & Produto',
  titlePrefix: 'CONSTRUO',
  titleEm: 'software',
  titleSuffix: 'QUE\nAGUENTA ESCALA.',
  email: 'jotih109@gmail.com',
  location: 'Brasil · Remoto (GMT-3)',
  available: true,
  statusText: 'Disponível para novos projetos',
  statusCvText: 'Disponível para novos desafios',
  bio: 'Sou João Lamim. Desenvolvo APIs resilientes, arquiteturas escaláveis e produtos web robustos que operam com alta performance e tolerância a falhas.',
  executiveSummary: 'Engenheiro de software com 6 anos de experiência focado em arquitetura back-end, modelagem de dados e APIs de alto throughput. Especialista em construir microsserviços tolerantes a falhas em Node.js, TypeScript e Python, com experiência sólida em nuvem (AWS), mensageria e observabilidade.',
  yearsExperience: '6+',
  primaryStacks: 'Node · Python · TS',
  links: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
  },
  marqueeTechs: [
    'TypeScript',
    'Node.js',
    'React',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Python',
    'Redis',
    'GraphQL',
    'FastAPI',
    'NestJS',
    'TailwindCSS',
    'Next.js',
    'CI/CD',
  ],
};

export const homeStats: StatItem[] = [
  { value: 6, label: 'Anos de experiência', sub: 'construindo produtos' },
  { value: 30, label: 'Projetos entregues', sub: 'produção e clientes' },
  { value: 12, label: 'APIs em produção', sub: 'REST e GraphQL' },
  { value: 99, suffix: '%', label: 'Uptime médio', sub: 'alta disponibilidade' },
];

export const cvStats: StatItem[] = [
  { value: 6, label: 'Anos de experiência', sub: 'desde 2019' },
  { value: 4, label: 'Empresas', sub: 'estágio a sênior' },
  { value: 12, label: 'Sistemas em produção', sub: 'APIs e serviços' },
  { value: 30, label: 'Projetos entregues', sub: 'web e back-end' },
];

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
    stack: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'PostgreSQL'],
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
    stack: ['Python', 'PostgreSQL', 'Redis'],
    links: [
      { label: 'Detalhes', href: '#contact' },
    ],
  },
];

export const stackCategories: SkillCategory[] = [
  {
    title: 'Linguagens',
    skills: [
      { name: 'TypeScript', frequency: 'Diário' },
      { name: 'JavaScript', frequency: 'Diário' },
      { name: 'Python', frequency: 'Frequente' },
      { name: 'SQL', frequency: 'Diário' },
    ],
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'Node.js', frequency: 'Diário' },
      { name: 'NestJS', frequency: 'Frequente' },
      { name: 'FastAPI', frequency: 'Frequente' },
      { name: 'PostgreSQL / Redis', frequency: 'Diário' },
    ],
  },
  {
    title: 'Front-end',
    skills: [
      { name: 'React', frequency: 'Frequente' },
      { name: 'Next.js', frequency: 'Frequente' },
      { name: 'Vite', frequency: 'Frequente' },
      { name: 'CSS Moderno', frequency: 'Diário' },
    ],
  },
  {
    title: 'Infra & Cloud',
    skills: [
      { name: 'Docker', frequency: 'Diário' },
      { name: 'AWS', frequency: 'Frequente' },
      { name: 'GitHub Actions', frequency: 'Diário' },
      { name: 'Grafana / Logs', frequency: 'Frequente' },
    ],
  },
];

export const experiencesData: Experience[] = [
  {
    id: 'exp-senior',
    period: '2024 — atual',
    current: true,
    role: 'Engenheiro de Software Sênior',
    company: 'Empresa Atual',
    focus: 'Arquitetura de APIs e integrações',
    location: 'Remoto',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    bullets: [
      'Lidero a arquitetura de integrações e APIs críticas, unificando provedores externos com fila assíncrona e tolerância a falhas.',
      'Otimização de performance: latência p95 reduzida de 1,2s para 180ms através de índices, cache Redis e query tuning.',
      'Implementação de observabilidade com métricas e traces distribuídos, reduzindo MTTR de incidentes em 60%.',
    ],
  },
  {
    id: 'exp-pleno',
    period: '2022 — 2024',
    current: false,
    role: 'Desenvolvedor Pleno',
    company: 'Empresa Anterior',
    focus: 'Produtos web e performance',
    location: 'Remoto / Híbrido',
    stack: ['React', 'Node.js', 'GraphQL', 'GitHub Actions', 'Redis'],
    bullets: [
      'Desenvolvimento fullstack de produto SaaS com foco em APIs GraphQL e interfaces React de alta performance.',
      'Automação completa do ciclo de deploy com GitHub Actions e Docker, acelerando builds de 40min para 6min.',
      'Refatoração de front-end elevando pontuação do Google Lighthouse para 98/100.',
    ],
  },
  {
    id: 'exp-junior',
    period: '2020 — 2022',
    current: false,
    role: 'Desenvolvedor Júnior',
    company: 'Primeira Empresa',
    focus: 'APIs e modernização de código',
    location: 'Presencial',
    stack: ['Python', 'SQL', 'Docker'],
    bullets: [
      'Construção de pipelines de ingestão de dados em Python processando mais de 2 milhões de registros diários.',
      'Modernização de sistema legado e criação de suite de testes automatizados para fluxos críticos.',
    ],
  },
  {
    id: 'exp-estagio',
    period: '2019 — 2020',
    current: false,
    role: 'Estagiário de Software',
    company: 'Início da carreira',
    focus: 'Automações e scripts internos',
    location: 'Presencial',
    stack: ['Python', 'Bash', 'Linux'],
    bullets: [
      'Desenvolvimento de scripts de automação em Python e Bash para rotinas internas e suporte ao time.',
    ],
  },
];

export const skillBarsData: SkillBar[] = [
  { name: 'TypeScript / JavaScript', level: 92, label: 'Avançado' },
  { name: 'Node.js / Express / NestJS', level: 90, label: 'Avançado' },
  { name: 'PostgreSQL / SQL / Redis', level: 88, label: 'Avançado' },
  { name: 'Docker / AWS / CI/CD', level: 80, label: 'Intermediário+' },
  { name: 'Python / FastAPI', level: 75, label: 'Intermediário+' },
  { name: 'React / Next.js', level: 72, label: 'Intermediário' },
];

export const ecosystemTags = [
  'NestJS',
  'FastAPI',
  'Redis',
  'GraphQL',
  'Prisma',
  'Vitest',
  'Jest',
  'Terraform',
  'Grafana',
  'Git',
];

export const languages = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Avançado (leitura, escrita e conversação técnica)' },
];

export const educationData: Education[] = [
  {
    period: '2018 — 2022',
    degree: 'Bacharelado em Ciência da Computação',
    institution: 'Ensino Superior · Concluído',
    description: 'Foco em sistemas distribuídos, estruturas de dados e bancos de dados relacionais.',
  },
];

export const certificationsData: Certification[] = [
  {
    year: '2025',
    name: 'AWS Certified Developer — Associate',
    organization: 'Amazon Web Services',
  },
  {
    year: '2024',
    name: 'Arquitetura de Microsserviços & Mensageria',
    organization: 'Especialização Técnica',
  },
  {
    year: '2023',
    name: 'PostgreSQL: Tuning & Performance',
    organization: 'Curso Avançado',
  },
  {
    year: '2022',
    name: 'Docker & Containers em Produção',
    organization: 'Certificação Prática',
  },
];

export const principlesData: Principle[] = [
  {
    id: 'principle-1',
    name: 'Simples primeiro',
    note: 'evitar complexidade precoce',
    icon: 'star',
  },
  {
    id: 'principle-2',
    name: 'Medir com dados',
    note: 'otimizar com números reais',
    icon: 'activity',
  },
  {
    id: 'principle-3',
    name: 'Automação total',
    note: 'repetiu 3x, vira pipeline',
    icon: 'zap',
  },
  {
    id: 'principle-4',
    name: 'Segurança por padrão',
    note: 'em cada camada da API',
    icon: 'shield',
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
