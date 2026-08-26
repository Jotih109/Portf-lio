# 🌱 Grow Business — Galeria de Capturas para Portfólio

Este diretório contém uma coleção completa e profissional de capturas de tela em **alta definição (Retina / 2x DPR)** da plataforma **Grow Business**, estruturada especificamente para ser utilizada na composição de portfólios (GitHub, LinkedIn, Behance, Notion ou site pessoal).

---

## 🎯 Sobre o Projeto (Pitch para Portfólio)

> **Grow Business** é uma plataforma web desenvolvida para combater a exclusão no mercado de trabalho, conectando pessoas em busca de oportunidades operacionais e de entrada a micro e pequenas empresas locais, eliminando barreiras como a exigência desnecessária de escolaridade formal e processos seletivos excessivamente burocráticos.

### 🛠️ Stack & Destaques de Engenharia
- **Backend:** Node.js, Express 4.21, Arquitetura em Camadas (Controller / Model / Services)
- **Frontend:** HTML5 Semântico, CSS3 Responsivo com Variáveis e Design System próprio, JavaScript Vanilla Moderno (ES6+)
- **Persistência & Dados:** Banco de dados relacional **PostgreSQL** com consultas 100% parametrizadas (anti SQL Injection) + **Modo Demonstração em memória** com repositório desacoplado para navegação instantânea sem necessidade de banco configurado
- **Segurança & Boas Práticas:** Hashing de senhas com algoritmo criptográfico moderno **Scrypt** com salt individual, proteção contra injeção de SQL, sanitização de inputs (XSS prevention), headers de segurança HTTP (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) e upload de imagens protegido com validação de MIME type e limite de tamanho (Multer).

---

## 📂 Estrutura das Imagens

A pasta está dividida em 6 diretórios categorizados:

```
portfolio_screenshots/
├── 00_destaques_portfolio/       # 🌟 As 5 melhores fotos (Top Picks) para cards de portfólio
├── 01_institucional/             # 🌐 Landing page institucional, Sobre Nós e Serviços
├── 02_autenticacao_e_cadastro/   # 🔐 Fluxos de login, recuperação de senha e cadastros
├── 03_experiencia_candidato/     # 👤 Feed de vagas, busca/filtros, candidaturas e mural
├── 04_experiencia_empresa/       # 🏢 Painel corporativo B2B, publicação de vagas e triagem
├── 05_responsividade_mobile/     # 📱 Experiência mobile adaptada em smartphones modernos
└── visualizador_portfolio.html   # 💻 Visualizador interativo das imagens no navegador
```

---

## 🖼️ Catálogo Detalhado das Fotos

### 🌟 00. Destaques para Portfólio (`00_destaques_portfolio/`)
| Arquivo | Descrição | O que valoriza no Portfólio |
| :--- | :--- | :--- |
| `destaque_01_hero_home.png` | Banner principal da Landing Page | Identidade visual, proposta de valor e impacto estético inicial |
| `destaque_02_feed_vagas.png` | Feed de vagas do candidato com tags de salário e localização | UI limpa, usabilidade, microdados visuais e componentes reutilizáveis |
| `destaque_03_modal_vaga.png` | Modal aberto de detalhes da oportunidade | Componentização modal, acessibilidade, hierarquia tipográfica |
| `destaque_04_painel_empresa.png` | Dashboard de vagas ativas da empresa parceira | Funcionalidade B2B, gestão de oportunidades e indicadores |
| `destaque_05_gestao_candidatos.png` | Painel de triagem de inscritos com botão de contratação | Fluxo de negócios ponta a ponta e gestão de recrutamento |

---

### 🌐 01. Institucional & Apresentação (`01_institucional/`)
| Arquivo | Descrição |
| :--- | :--- |
| `01_home_hero_desktop.png` | Hero Banner com slogan institucional e atalhos de navegação rápida |
| `02_home_proposito_inclusao.png` | Seção que explica o propósito social do Grow e inclusão no mercado |
| `03_home_servicos_funcionalidades.png` | Visão das vantagens e serviços oferecidos para empresas e candidatos |
| `04_home_completa_fullpage.png` | Captura inteira da Landing Page (Full Page) de ponta a ponta |
| `05_sobre_nos_about.png` | Página institucional "Sobre Nós" apresentando a missão da iniciativa |
| `06_servicos_detalhados.png` | Página de serviços detalhados e modelo de conexão de talentos |

---

### 🔐 02. Autenticação & Onboarding (`02_autenticacao_e_cadastro/`)
| Arquivo | Descrição |
| :--- | :--- |
| `01_tela_login.png` | Card de login estilizado com suporte a candidato, empresa e Modo Demonstração |
| `02_recuperacao_senha.png` | Interface de recuperação e redefinição de senha com disparo de e-mail |
| `03_cadastro_candidato.png` | Formulário completo de cadastro de Pessoa Física com dados de contato |
| `04_cadastro_empresa.png` | Formulário de cadastro de Pessoa Jurídica com CNPJ e dados empresariais |
| `05_termos_de_uso.png` | Página de termos de serviço, privacidade e consentimento |

---

### 👤 03. Experiência do Candidato (`03_experiencia_candidato/`)
| Arquivo | Descrição |
| :--- | :--- |
| `01_feed_vagas_candidato.png` | Feed de vagas abertas com badges de remuneração, jornada e cidade |
| `02_busca_e_filtros_vagas.png` | Busca em tempo real com filtros por cidade, empresa e ordenação de salário |
| `03_modal_detalhes_vaga.png` | Modal detalhado com descrição completa, requisitos e benefícios da vaga |
| `04_vaga_favoritada_interacao.png` | Interação visual ao favoritar uma vaga para consulta posterior |
| `05_minhas_candidaturas.png` | Painel do candidato acompanhando todas as suas inscrições ativas |
| `06_vagas_salvas_favoritos.png` | Aba dedicada com as oportunidades marcadas como favoritas |
| `07_mural_comunitario_posts.png` | Mural comunitário onde candidatos publicam disponibilidade e cursos |
| `08_perfil_candidato_edicao.png` | Painel de edição de perfil, foto e informações do candidato |

---

### 🏢 04. Experiência da Empresa (`04_experiencia_empresa/`)
| Arquivo | Descrição |
| :--- | :--- |
| `01_painel_empresa_minhas_vagas.png` | Dashboard de vagas cadastradas pela empresa e métricas de candidatos |
| `02_formulario_publicar_vaga.png` | Formulário expansível de publicação e parametrização de nova vaga |
| `03_gestao_candidatos_triagem.png` | Painel de gestão de candidatos com contato direto e botão de contratação |
| `04_perfil_empresa_edicao.png` | Edição dos dados cadastrais e apresentação institucional da empresa |

---

### 📱 05. Responsividade Mobile (`05_responsividade_mobile/`)
| Arquivo | Descrição |
| :--- | :--- |
| `01_mobile_home_hero.png` | Landing page adaptada para viewport mobile (iPhone / Android) |
| `02_mobile_login.png` | Tela de autenticação com layout responsivo |
| `03_mobile_feed_vagas.png` | Feed de oportunidades otimizado para navegação mobile com toque |
| `04_mobile_modal_vaga.png` | Modal de detalhes da vaga ocupando de forma fluida a tela do celular |
| `05_mobile_painel_empresa.png` | Painel de controle da empresa em formato mobile |

---

## 📝 Textos Prontos para Uso

### 💼 Para o LinkedIn (Post ou Destaque de Projeto)

```markdown
🚀 Apresentando o GROW Business — Plataforma de Empregabilidade e Inclusão Social 🌱

Recentemente desenvolvi o Grow Business, uma aplicação web full stack criada com o objetivo de conectar pessoas que buscam trabalho a micro e pequenas empresas, reduzindo barreiras de entrada e valorizando a inclusão no mercado de trabalho.

✨ Principais Recursos:
• Experiência dual: fluxos dedicados para Candidatos e Empresas parceiras.
• Feed de vagas com busca dinâmica e filtros por cidade, empresa e faixa salarial.
• Gestão de candidaturas, vagas favoritas e mural comunitário para networking.
• Painel corporativo para publicação de vagas, triagem de inscritos e contratação.
• Modo de demonstração em memória para navegação completa instantânea sem pré-requisitos.
• Segurança sólida com hash Scrypt de senhas, queries SQL 100% parametrizadas e sanitização contra XSS.

🛠️ Tecnologias: Node.js, Express, JavaScript (ES6+), CSS3 Moderno, PostgreSQL, Multer e Nodemailer.

Confira as telas do projeto e o código completo no meu GitHub! 💻
```

### 📄 Para o Currículo / Portfólio (Bullet Points)

```text
• Grow Business — Plataforma Web de Empregabilidade e Inclusão (Node.js, Express, PostgreSQL, Vanilla JS)
  - Desenvolveu aplicação web full stack com autenticação segura, gestão de vagas, candidaturas e painel corporativo.
  - Implementou sistema de persistência resiliente com arquitetura desacoplada (PostgreSQL + Fallback Demo Store em memória).
  - Aplicou padrões modernos de segurança: hash Scrypt com salt para senhas, consultas parametrizadas contra SQL Injection e upload seguro de arquivos via Multer.
  - Criou interface responsiva, fluida e acessível focada na melhor experiência de uso tanto em desktop quanto em dispositivos móveis.
```
