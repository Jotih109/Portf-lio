/**
 * ============================================================
 * JAVASCRIPT VANILLA — PORTFÓLIO JOÃO LAMIM
 * Todas as funcionalidades e interações em JavaScript puro:
 * - Smooth scroll com Lenis (ou nativo)
 * - Scroll Reveal via IntersectionObserver
 * - Barra de progresso de leitura
 * - Botão Voltar ao Topo
 * - Menu lateral / Overlay responsivo
 * - Filtro de projetos em tempo real
 * - FAQ Accordion interativo
 * - Preloader com barra de carregamento
 * - Copiar e-mail com confetes e toast
 * - Cursor customizado interativo (spotlight, ripple, hover)
 * - Mascote Interativo estilo Kinect (rastreamento do olhar, rotação 3D, piscada, sono e diálogos)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------
  // 1. PRELOADER
  // ------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.querySelector('.preloader-progress');

  if (preloader && preloaderProgress) {
    setTimeout(() => {
      preloaderProgress.style.width = '100%';
    }, 100);

    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1000);

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1800);
  }

  // ------------------------------------------------------------
  // 2. SMOOTH SCROLL (LENIS / NATIVO)
  // ------------------------------------------------------------
  let lenis = null;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window.scrollToTarget = function (targetId) {
    const el = targetId ? document.getElementById(targetId) : null;
    if (lenis) {
      if (el) {
        lenis.scrollTo(el);
      } else {
        lenis.scrollTo(0);
      }
    } else {
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // ------------------------------------------------------------
  // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ------------------------------------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-l, .reveal-r, .stagger, .cv-entry, .cert-card, .project-card, .skill-bars'
  );
  revealElements.forEach((el) => observer.observe(el));

  // ------------------------------------------------------------
  // 4. SCROLL PROGRESS & BACK TO TOP & HEADER ACTIVE STATE
  // ------------------------------------------------------------
  const progressBar = document.getElementById('progress');
  const toTopBtn = document.getElementById('toTop');
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-inline a');
  const sections = ['experience', 'education', 'skills', 'projects', 'faq', 'contact'];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Barra de progresso no topo
    if (progressBar) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    }

    // Botão voltar ao topo
    if (toTopBtn) {
      if (scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    }

    // Header scrolled
    if (siteHeader) {
      if (scrollY > 8) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Nav active section
    const scrollPosition = scrollY + 200;
    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => window.scrollToTarget());
  }

  // ------------------------------------------------------------
  // 5. NAVEGAÇÃO SUAVE NOS LINKS
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId) {
          e.preventDefault();
          window.scrollToTarget(targetId);
        } else {
          e.preventDefault();
          window.scrollToTarget();
        }
      }
    });
  });

  // ------------------------------------------------------------
  // 6. MENU BURGER & OVERLAY MOBILE
  // ------------------------------------------------------------
  const burgerBtn = document.getElementById('burger');
  const overlayMenu = document.getElementById('overlay-menu');

  if (burgerBtn && overlayMenu) {
    const toggleMenu = () => {
      const isOpen = overlayMenu.classList.contains('open');
      if (isOpen) {
        overlayMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        overlayMenu.classList.add('open');
        burgerBtn.classList.add('open');
        burgerBtn.setAttribute('aria-expanded', 'true');
      }
    };

    burgerBtn.addEventListener('click', toggleMenu);

    overlayMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        overlayMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------
  // 7. DADOS & GALERIA INTERATIVA DE PROJETOS (LIGHTBOX)
  // ------------------------------------------------------------
  const projectGalleryData = {
    ac_telemetria: {
      title: "ApexView — Telemetria & Engenheiro de Pista IA",
      badge: "Desktop · Telemetria & IA",
      images: [
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/01_Dashboard_Geral_AoVivo.png",
          title: "Dashboard Principal em Tempo Real (MoTeC i2 Style)",
          desc: "Pilha sincronizada de 4 gráficos contínuos: Delta de tempo (Δt), Velocidade (km/h), Pedais (%) com destaque de ABS/TC e Ângulo do Volante (°), além de mostrador digital e minimapa GPS."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/02_Analise_Curva_a_Curva.png",
          title: "Análise Curva a Curva (Turn-by-Turn Telemetry Engine)",
          desc: "Mapeamento do circuito por zonas de frenagem, contorno e saída com telemetria detalhada de ponto de frenagem (m), velocidade mínima no ápice e perdas de tempo."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/03_Engenheiro_de_Pista_IA.png",
          title: "Engenheiro de Pista Inteligente (Diagnóstico IA & Voz)",
          desc: "Diagnósticos em linguagem natural com fila preemptiva de severidade e síntese de voz (TTS) analisando trail braking, aquecimento e marcha ideal."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/04_Comparativo_Voltas_Ghost.png",
          title: "Comparativo Multi-Voltas & Ghost Lap",
          desc: "Sobreposição de curvas da volta atual vs Personal Best com cursor temporal interativo e divisórias de setores S1/S2/S3."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/05_Dinamica_Veicular_Pneus_Eletronica.png",
          title: "Dinâmica Veicular, Pneus e Gestão Eletrônica",
          desc: "Matriz térmica de pneus 2x2 com gradiente de banda de rodagem (Interna / Meio / Externa), monitor de freios e círculo de atrito de Força G."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/06_Mapa_2D_Trajetoria_GPS.png",
          title: "Mapa 2D de Trajetória GPS e Telemetria Espacial",
          desc: "Reconstrução do traçado da pista a partir de GPS codificado por cores: verde (aceleração), vermelho (frenagem) e âmbar (transição/trail braking)."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/07_Bancada_Engenheiro_Voz.png",
          title: "Bancada de Testes do Engenheiro de Voz",
          desc: "Ambiente de simulação de cenários sintéticos para teste de regras, fila de áudio e integração com Microsoft SAPI / OneCore."
        },
        {
          src: "./imgs/Imgs%20projetos/ac_telemetria/prints/08_Exportacao_Automatica_BestLap.png",
          title: "Exportação Automática de Relatórios em Alta Definição",
          desc: "Geração instantânea de relatórios visuais HD ao registrar a melhor volta na pista."
        }
      ]
    },
    chat: {
      title: "Chat DOQT — Mensageria Hospitalar & Clínica",
      badge: "Full-Stack · Saúde & Realtime",
      images: [
        {
          src: "./imgs/Imgs%20projetos/chat/02_chat_grupo_cardiologia.png",
          title: "Chat em Grupo Clínico & Protocolos Fixados",
          desc: "Header com membros da equipe, barra de protocolos de emergência com contagem de validade e anexos médicos em tempo real."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/01_tela_login.png",
          title: "Autenticação Segura com Validação de CPF",
          desc: "Design clínico profissional com máscara e validação síncrona de CPF, visualização de senha e controle estrito de sessão."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/03_conversa_direta_1a1.png",
          title: "Conversa Direta 1 a 1 & Recibos Auditáveis",
          desc: "Status de presença online em tempo real e recibos com duplo tique azul de entrega e leitura por membro."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/04_gravacao_audio_tempo_real.png",
          title: "Gravador de Áudio com Waveform em Tempo Real",
          desc: "Microfone integrado no navegador com visualizador de ondas sonoras, timer e envio direto para storage seguro."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/05_modal_dados_mensagem_recibos.png",
          title: "Auditoria e Detalhes da Mensagem",
          desc: "Transparência de entrega com registro de data/hora exata de visualização e recebimento no fuso de Brasília."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/06_modal_fixar_mensagem_validade.png",
          title: "Fixação de Protocolos com Expiração Automática",
          desc: "Regra de negócio médica com seletor de expiração de 10, 20 ou 30 dias para liberação automática da barra de destaque."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/07_modal_criar_novo_grupo.png",
          title: "Criação de Canais e Grupos de Especialidade",
          desc: "Seleção múltipla de colaboradores, filtro instantâneo de equipes e geração de avatar dinâmico."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/08_modal_gestao_membros_grupo.png",
          title: "Gestão de Membros & Permissões",
          desc: "Listagem de participantes com badges de função (Admin/Membro) e controle de promoção de moderadores."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/09_mural_avisos_comunicados.png",
          title: "Mural de Avisos & Comunicados Oficiais",
          desc: "Canal oficial da diretoria hospitalar com tags de prioridade (Urgente/Escala) e confirmação obrigatória de leitura."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/10_painel_admin_visao_geral.png",
          title: "Painel de Gestão e Governança Administrativa",
          desc: "Cards de KPIs de colaboradores ativos e equipes, busca em tempo real e redefinição de credenciais de acesso."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/11_modal_cadastrar_funcionario.png",
          title: "Cadastro de Novos Colaboradores",
          desc: "Formulário modal com controle de cargo, especialidade médica e papéis de acesso (Usuário / Admin)."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/12_mobile_lista_conversas.png",
          title: "Versão Mobile — Lista de Conversas",
          desc: "Interface mobile otimizada com bottom bar nativa, contador de não lidas e previews compactos."
        },
        {
          src: "./imgs/Imgs%20projetos/chat/13_mobile_chat_ativo.png",
          title: "Versão Mobile — Chat Ativo",
          desc: "Layout 100% responsivo para telas compactas (390px), balões adaptáveis e input otimizado para teclado virtual."
        }
      ]
    },
    go: {
      title: "Go Master — Plataforma & IA de Baduk (Weiqi)",
      badge: "Front-end · IA & Canvas 2D",
      images: [
        {
          src: "./imgs/Imgs%20projetos/go/01_partida_19x19_kaya.png",
          title: "Tabuleiro Oficial 19x19 (Kaya Tradicional)",
          desc: "Visão principal com acabamento em madeira Kaya, relógios Byo-yomi, placar de prisioneiros e atalhos rápidos de navegação."
        },
        {
          src: "./imgs/Imgs%20projetos/go/02_modal_nova_partida.png",
          title: "Configurações de Partida & Níveis de IA",
          desc: "Modos PvE (vs IA), PvP e EvE com 5 níveis de IA até KAMI 9-Dan, tamanhos 9x9, 13x13 e 19x19, handicap e relógios."
        },
        {
          src: "./imgs/Imgs%20projetos/go/03_modal_biblioteca_sgf.png",
          title: "Biblioteca de Partidas Gravadas SGF",
          desc: "Seleção de partidas históricas com metadados de jogadores, data, resultado e comentários didáticos."
        },
        {
          src: "./imgs/Imgs%20projetos/go/04_partida_em_andamento_9x9.png",
          title: "Partida Ativa em Tabuleiro 9x9",
          desc: "Jogo tático rápido demonstrando pedras pretas e brancas, capturas e marcação do último lance jogado."
        },
        {
          src: "./imgs/Imgs%20projetos/go/05_mapa_influencia_territorio.png",
          title: "Heatmap de Influência Territorial ao Vivo",
          desc: "Visualização em tempo real das zonas de influência e território controlado por cada jogador no tabuleiro."
        },
        {
          src: "./imgs/Imgs%20projetos/go/06_analise_pos_jogo_completa.png",
          title: "Sensei IA: Análise Pós-Jogo Completa",
          desc: "Gráfico interativo de probabilidade de vitória (Win Rate Timeline), precisão dos jogadores e breakdown de lances."
        },
        {
          src: "./imgs/Imgs%20projetos/go/07_analise_detalhe_lance_aprendiz.png",
          title: "Modo Aprendiz com Explicabilidade Didática",
          desc: "IA explicando em português o custo de cada erro ('custou ~4 pontos'), motivos táticos e setas com lances ideais."
        },
        {
          src: "./imgs/Imgs%20projetos/go/08_tsumego_selecao_problemas.png",
          title: "Seleção de Puzzles de Tsumego",
          desc: "Problemas clássicos de vida e morte categorizados por nível (Iniciante, Intermediário e Avançado)."
        },
        {
          src: "./imgs/Imgs%20projetos/go/09_tsumego_resolvendo_puzzle.png",
          title: "Treinador Interativo de Tsumego",
          desc: "Tabuleiro com foco de canto, instruções táticas e feedback interativo imediato de acerto ou erro."
        },
        {
          src: "./imgs/Imgs%20projetos/go/10_dicionario_joseki_aberturas.png",
          title: "Dicionário de Joseki (Aberturas nos Cantos)",
          desc: "Explorador interativo de sequências canônicas de abertura nos cantos com variações e comentários conceituais."
        },
        {
          src: "./imgs/Imgs%20projetos/go/11_glossario_conceitos_didatico.png",
          title: "Glossário Didático com 14 Conceitos Chave",
          desc: "Guia ilustrado dos princípios do Go (Liberdades, Atari, Olhos, Ko, Sente/Gote, Tenuki, etc.)."
        },
        {
          src: "./imgs/Imgs%20projetos/go/12_modal_regras_e_guia.png",
          title: "Guia Completo de Regras e Filosofia",
          desc: "Tutorial completo e acessível ensinando as regras oficiais e a filosofia do jogo milenar para novos jogadores."
        },
        {
          src: "./imgs/Imgs%20projetos/go/13_modal_contagem_pontos_final.png",
          title: "Contagem Automatizada de Território & Komi",
          desc: "Relatório de fim de jogo com cálculo de território cercado, capturas e compensação de pontos de Komi."
        },
        {
          src: "./imgs/Imgs%20projetos/go/14_modal_colar_sgf.png",
          title: "Importador Universal de SGF",
          desc: "Suporte ao padrão Smart Game Format (SGF) para importar partidas de plataformas como OGS, Fox e KGS."
        },
        {
          src: "./imgs/Imgs%20projetos/go/15_tema_estudio_noturno_dark.png",
          title: "Tema Estúdio Noturno (Dark Mode)",
          desc: "Tema escuro elegante com pedras de ardósia e concha para máximo conforto visual."
        },
        {
          src: "./imgs/Imgs%20projetos/go/16_tema_cyber_baduk_neon.png",
          title: "Tema Cyber Baduk (Neon Sci-Fi)",
          desc: "Estética futurista de alta tecnologia com iluminação neon ciano e magenta."
        },
        {
          src: "./imgs/Imgs%20projetos/go/17_tema_papel_washi.png",
          title: "Tema Tradicional Papel Washi",
          desc: "Estética minimalista japonesa inspirada no papel artesanal orgânico Washi."
        }
      ]
    },
    grow: {
      title: "Grow Business — Empregabilidade & Conexão",
      badge: "Full-Stack · Social",
      images: [
        {
          src: "./imgs/Imgs%20projetos/grow/00_destaques_portfolio/destaque_01_hero_home.png",
          title: "Banner Principal & Proposta de Valor Social",
          desc: "Landing Page institucional destacando a missão de combate à exclusão e conexão rápida com vagas operacionais."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/00_destaques_portfolio/destaque_02_feed_vagas.png",
          title: "Feed de Vagas com Filtros Dinâmicos",
          desc: "Feed com busca em tempo real, filtros por cidade, faixa salarial e badges visuais de benefícios e tipo de jornada."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/00_destaques_portfolio/destaque_03_modal_vaga.png",
          title: "Modal Detalhado de Oportunidade",
          desc: "Apresentação completa de requisitos simplificados, benefícios e botão de candidatura ágil."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/00_destaques_portfolio/destaque_04_painel_empresa.png",
          title: "Painel Corporativo B2B da Empresa",
          desc: "Dashboard com indicadores de vagas ativas da empresa parceira e contadores de candidatos inscritos."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/00_destaques_portfolio/destaque_05_gestao_candidatos.png",
          title: "Painel de Triagem & Contratação de Candidatos",
          desc: "Fluxo de negócios ponta a ponta com visualização dos perfis de candidatos inscritos e botão de contratação direta."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/01_institucional/01_home_hero_desktop.png",
          title: "Apresentação Institucional Completa",
          desc: "Visão expandida da proposta de valor, serviços e impacto social da iniciativa."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/02_autenticacao_e_cadastro/01_tela_login.png",
          title: "Autenticação Segura & Modo Demo",
          desc: "Login segmentado para Candidatos e Empresas com suporte a Modo Demonstração desacoplado."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/03_experiencia_candidato/01_feed_vagas_candidato.png",
          title: "Experiência e Gestão do Candidato",
          desc: "Painel para acompanhamento de candidaturas ativas, vagas favoritadas e mural comunitário."
        },
        {
          src: "./imgs/Imgs%20projetos/grow/05_responsividade_mobile/01_mobile_home_hero.png",
          title: "Versão Mobile Responsiva",
          desc: "Experiência adaptada e fluida para smartphones em todas as etapas da plataforma."
        }
      ]
    },
    eletroserv: {
      title: "Eletroserv — E-Commerce & Painel Administrativo",
      badge: "Full-Stack · E-Commerce & B2B",
      images: [
        {
          src: "./imgs/Imgs%20projetos/eletroserv/01_home_hero_desktop.png",
          title: "Hero Banner Principal & Ofertas em Destaque",
          desc: "Interface moderna de e-commerce com destaques promocionais, categorias rápidas e benefícios de entrega."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/01b_hero_slide_saldão.png",
          title: "Slide Promocional: Saldão & Seminovos",
          desc: "Destaque exclusivo para produtos revisados e ofertas especiais com precificação diferenciada."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/04_catalog_products_grid.png",
          title: "Catálogo Geral de Produtos",
          desc: "Grid responsivo de produtos com precificação dinâmica, parcelamento e tags de disponibilidade."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/05_catalog_filtered_usados.png",
          title: "Filtro Especial de Usados e Saldão",
          desc: "Segmentação de produtos seminovos com indicação de estado e economia calculada."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/06_search_autocomplete_interactive.png",
          title: "Busca Inteligente com Autocomplete",
          desc: "Campo de pesquisa com resultados instantâneos, miniaturas e valores em tempo real."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/07_product_quickview_modal.png",
          title: "Modal de Visualização Rápida (Quickview)",
          desc: "Inspeção de fotos em alta resolução, especificações técnicas e seleção de variações sem trocar de página."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/08_cart_drawer_active.png",
          title: "Carrinho Lateral Drawer Interativo",
          desc: "Drawer lateral fluído com cálculo de frete, resumo de itens e botão direto para checkout."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/09_customer_auth_modal.png",
          title: "Modal de Autenticação do Cliente",
          desc: "Login e cadastro ágil com validações síncronas para finalização de pedidos."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/10_testimonials_and_location.png",
          title: "Depoimentos & Localização da Loja",
          desc: "Seção de prova social com avaliações de clientes e mapa interativo de localização física."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/11_admin_dashboard_kpis.png",
          title: "Dashboard Administrativo com KPIs",
          desc: "Painel gerencial de vendas, faturamento diário, pedidos recentes e métricas de desempenho."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/12_admin_product_modal.png",
          title: "Cadastro & Gestão de Produtos",
          desc: "Modal administrativo para inserção de novos produtos, controle de estoque e preços."
        },
        {
          src: "./imgs/Imgs%20projetos/eletroserv/15_mobile_home_hero.png",
          title: "Versão Mobile — Home & Navegação",
          desc: "Layout 100% responsivo para compras ágeis pelo celular com menu retrátil e botões de toque."
        }
      ]
    },
    "21": {
      title: "OVERVOLTAGE 21 — Card Game Tático Cyberpunk",
      badge: "Front-end · Game Dev & UI",
      images: [
        {
          src: "./imgs/Imgs%20projetos/21/01_tela_inicial_cyberpunk.png",
          title: "Tela Inicial / Hero Screen Cyberpunk",
          desc: "HUD com cantos angulares, animação do núcleo neural, status CORE ONLINE (SYSTEM-77) e painel de regras."
        },
        {
          src: "./imgs/Imgs%20projetos/21/02_partida_em_andamento.png",
          title: "Mesa de Combate Neural & Sobrecarga",
          desc: "Distribuição de cartas numéricas (1 a 11), cartas secretas ocultas, medidores de voltagem em LEDs e timer de 15s."
        },
        {
          src: "./imgs/Imgs%20projetos/21/03_trunfo_espy_vision_ativo.png",
          title: "Módulo de Trunfos: Espy Vision Ativo",
          desc: "Uso da habilidade para espionar a carta secreta do rival com badge neon REVELADA e recálculo de probabilidades."
        },
        {
          src: "./imgs/Imgs%20projetos/21/04_combate_boss_alta_voltagem.png",
          title: "Batalha contra Boss: Cypher // Overclock",
          desc: "Confronto de alta tensão com apostas acumuladas de voltagem (+3V), Surge Shield e medidores críticos."
        },
        {
          src: "./imgs/Imgs%20projetos/21/05_meta_modificada_trunfos.png",
          title: "Alteração Dinâmica da Meta (Shift Target: 27)",
          desc: "Demonstração do trunfo que altera a pontuação alvo para 27 com IA adaptando sua estratégia."
        },
        {
          src: "./imgs/Imgs%20projetos/21/06_vitoria_rodada_overlay.png",
          title: "Overlay de Vitória na Rodada com Shaders CRT",
          desc: "Modal com cálculo de dano elétrico transferido ao oponente, nós revelados e partículas CRT."
        },
        {
          src: "./imgs/Imgs%20projetos/21/07_executor_ia_deletado.png",
          title: "Executor IA Deletado (10 Volts de Dano)",
          desc: "Eliminação do adversário neural ao atingir o limite crítico de 10V e transição para o próximo oponente."
        },
        {
          src: "./imgs/Imgs%20projetos/21/08_tela_vitoria_protocol_clear.png",
          title: "Tela Final de Vitória — Protocol Clear",
          desc: "Fim de jogo com vitória total sobre os 5 executores neurais do SYSTEM-77."
        },
        {
          src: "./imgs/Imgs%20projetos/21/09_tela_game_over_sobrecarga.png",
          title: "Tela de Game Over (Sobrecarga Letal)",
          desc: "Desconexão neural do sistema após o jogador sofrer 10 Volts de dano acumulado."
        },
        {
          src: "./imgs/Imgs%20projetos/21/10_mobile_tela_inicial.png",
          title: "Design Responsivo Mobile (Início)",
          desc: "Adaptação mobile vertical em alta fidelidade com efeitos de scanline preservados."
        },
        {
          src: "./imgs/Imgs%20projetos/21/11_mobile_gameplay_arena.png",
          title: "Arena de Gameplay no Mobile",
          desc: "Dashboard reorganizado para smartphones mantendo mesa, cartas e ações táteis acessíveis."
        }
      ]
    },
    quizdog: {
      title: "QuizDOG — Jogo Interativo das Raças Caninas",
      badge: "Front-end · Gamificação",
      images: [
        {
          src: "./imgs/Imgs%20projetos/quizdog/00_capa_showcase_mockup.png",
          title: "Mockup de Capa / Hero Showcase 3D",
          desc: "Banner em perspectiva demonstrando o design da aplicação em versões Desktop e Mobile."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/01_tela_inicial_light.png",
          title: "Tela Inicial no Tema Claro",
          desc: "Grid de 4 alternativas com badges numéricos de atalhos rápidos [1-4] e placar de pontuação integrado."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/02_resposta_correta_confete.png",
          title: "Feedback de Acerto & Confetes em Canvas 2D",
          desc: "Efeito procedural de confetes em Canvas nativo, feedback esmeralda e incremento de sequência de acertos."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/03_sistema_de_dicas.png",
          title: "Sistema de Dicas Interativo (50/50)",
          desc: "Eliminação visual de 2 alternativas incorretas com opacidade reduzida e aviso explicativo."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/04_resposta_incorreta_feedback.png",
          title: "Feedback de Erro & Revelação da Raça",
          desc: "Indicação da opção incorreta com revelação imediata da raça canina certa em PT-BR."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/05_modo_digitacao.png",
          title: "Modo Digitação Livre",
          desc: "Campo de texto interativo com normalização automática de acentos, suporte a atalho Enter e dicas."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/06_tema_escuro_dark_mode.png",
          title: "Tema Escuro Gamer com Glassmorphism",
          desc: "Paleta escura de alto contraste com efeito vidro fosco e iluminação neon âmbar."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/07_streak_em_chamas_arcade.png",
          title: "Modo Arcade / Streak em Chamas 🔥",
          desc: "Animação de fogo pulsante ativada no contador quando o usuário alcança 3 ou mais acertos seguidos."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/08_versao_mobile_light.png",
          title: "Versão Mobile (Tema Claro)",
          desc: "Layout 100% responsivo com arquitetura Zero-Scroll otimizado para celulares."
        },
        {
          src: "./imgs/Imgs%20projetos/quizdog/09_versao_mobile_dark.png",
          title: "Versão Mobile (Tema Escuro)",
          desc: "Experiência noturna confortável em telas de toque sem necessidade de rolagem."
        }
      ]
    }
  };

  // Elementos do Modal
  const modal = document.getElementById('projectGalleryModal');
  const pmBackdrop = document.getElementById('pmBackdrop');
  const pmCloseBtn = document.getElementById('pmCloseBtn');
  const pmPrevBtn = document.getElementById('pmPrevBtn');
  const pmNextBtn = document.getElementById('pmNextBtn');
  const pmBadge = document.getElementById('pmBadge');
  const pmTitle = document.getElementById('pmTitle');
  const pmMainImage = document.getElementById('pmMainImage');
  const pmSpinner = document.getElementById('pmSpinner');
  const pmCounter = document.getElementById('pmCounter');
  const pmCaptionTitle = document.getElementById('pmCaptionTitle');
  const pmCaptionDesc = document.getElementById('pmCaptionDesc');
  const pmThumbnails = document.getElementById('pmThumbnails');

  let currentProjectKey = null;
  let currentImageIndex = 0;

  function openGallery(projKey, startIndex = 0) {
    const data = projectGalleryData[projKey];
    if (!data || !modal) return;

    currentProjectKey = projKey;
    currentImageIndex = startIndex;

    if (pmBadge) pmBadge.textContent = data.badge || 'PROJETO';
    if (pmTitle) pmTitle.textContent = data.title || 'Galeria do Projeto';

    // Renderizar miniaturas
    if (pmThumbnails) {
      pmThumbnails.innerHTML = '';
      data.images.forEach((imgObj, idx) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = `pm-thumb ${idx === startIndex ? 'active' : ''}`;
        thumb.setAttribute('aria-label', `Ver imagem ${idx + 1}: ${imgObj.title}`);
        thumb.innerHTML = `<img src="${imgObj.src}" alt="${imgObj.title}" loading="lazy" />`;
        thumb.addEventListener('click', () => {
          showImage(idx);
        });
        pmThumbnails.appendChild(thumb);
      });
    }

    showImage(startIndex);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const data = projectGalleryData[currentProjectKey];
    if (!data || !data.images[index]) return;

    currentImageIndex = index;
    const imgObj = data.images[index];

    if (pmMainImage) {
      pmMainImage.classList.add('fade-anim');
      if (pmSpinner) pmSpinner.style.display = 'block';

      const tempImg = new Image();
      tempImg.onload = () => {
        pmMainImage.src = imgObj.src;
        pmMainImage.alt = imgObj.title;
        pmMainImage.classList.remove('fade-anim');
        if (pmSpinner) pmSpinner.style.display = 'none';
      };
      tempImg.onerror = () => {
        pmMainImage.src = imgObj.src;
        pmMainImage.classList.remove('fade-anim');
        if (pmSpinner) pmSpinner.style.display = 'none';
      };
      tempImg.src = imgObj.src;
    }

    if (pmCounter) pmCounter.textContent = `${index + 1} / ${data.images.length}`;
    if (pmCaptionTitle) pmCaptionTitle.textContent = imgObj.title;
    if (pmCaptionDesc) pmCaptionDesc.textContent = imgObj.desc;

    // Atualizar classe active das miniaturas e rolar para visibilidade
    if (pmThumbnails) {
      const thumbs = pmThumbnails.querySelectorAll('.pm-thumb');
      thumbs.forEach((t, i) => {
        if (i === index) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          t.classList.remove('active');
        }
      });
    }
  }

  function nextImage() {
    const data = projectGalleryData[currentProjectKey];
    if (!data) return;
    const nextIdx = (currentImageIndex + 1) % data.images.length;
    showImage(nextIdx);
  }

  function prevImage() {
    const data = projectGalleryData[currentProjectKey];
    if (!data) return;
    const prevIdx = (currentImageIndex - 1 + data.images.length) % data.images.length;
    showImage(prevIdx);
  }

  // Listeners dos botões de galeria
  document.querySelectorAll('[data-open-gallery]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projKey = btn.getAttribute('data-open-gallery');
      if (projKey) openGallery(projKey, 0);
    });
  });

  // Clicar em qualquer card de projeto abre a galeria (se não clicou em links diretos)
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.btn-open-gallery')) return;
      const projKey = card.getAttribute('data-proj');
      if (projKey && projectGalleryData[projKey]) {
        openGallery(projKey, 0);
      }
    });
  });

  if (pmCloseBtn) pmCloseBtn.addEventListener('click', closeGallery);
  if (pmBackdrop) pmBackdrop.addEventListener('click', closeGallery);
  if (pmPrevBtn) pmPrevBtn.addEventListener('click', prevImage);
  if (pmNextBtn) pmNextBtn.addEventListener('click', nextImage);

  // Atalhos de teclado para a galeria
  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Filtros de Projetos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------
  // 8. COPIAR E-MAIL COM CONFETES E TOAST
  // ------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  window.handleCopyEmail = function (email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => {
            copyToast.classList.remove('show');
          }, 2800);
        }

        // Explosão de confetes
        if (typeof confetti === 'function') {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#FFB020', '#FF7A18', '#FFFFFF'],
            });
          } catch (err) {}
        }
      });
    }
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      window.handleCopyEmail('jotih109@gmail.com');
    });
  }

  // ------------------------------------------------------------
  // 9. CURSOR CUSTOMIZADO COM SPOTLIGHT
  // ------------------------------------------------------------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('has-custom-cursor');

    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], .project-card, .cert-card, .tech-badge, .filter-btn, .menu-link, .cta-btn, #burger, .btn-open-gallery, .pm-nav-btn, .pm-close-btn, .pm-thumb';
    const spotlightSelector = '.project-card, .cert-card, .cv-entry';

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        followerX = mouseX;
        followerY = mouseY;
        if (dot) dot.classList.add('active');
        if (follower) follower.classList.add('active');
      }

      const target = e.target;
      if (target && follower) {
        if (target.closest(interactiveSelector)) {
          follower.classList.add('hover');
          if (dot) dot.classList.add('hover');
        } else {
          follower.classList.remove('hover');
          if (dot) dot.classList.remove('hover');
        }

        // Spotlight
        const card = target.closest(spotlightSelector);
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${mouseX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${mouseY - rect.top}px`);
        }
      }
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      if (follower) follower.classList.add('clicking');
      if (dot) dot.classList.add('clicking');

      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.setProperty('--cx', `${e.clientX}px`);
      ripple.style.setProperty('--cy', `${e.clientY}px`);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });

    window.addEventListener('mouseup', () => {
      if (follower) follower.classList.remove('clicking');
      if (dot) dot.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      if (dot) dot.classList.remove('active', 'hover', 'clicking');
      if (follower) follower.classList.remove('active', 'hover', 'clicking');
    });

    function renderCursor() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      if (dot) {
        dot.style.setProperty('--cx', `${mouseX}px`);
        dot.style.setProperty('--cy', `${mouseY}px`);
      }
      if (follower) {
        follower.style.setProperty('--fx', `${followerX}px`);
        follower.style.setProperty('--fy', `${followerY}px`);
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);
  }

  // ------------------------------------------------------------
  // 10. MASCOTE INTERATIVO (KINECT CURSOR BOT)
  // ------------------------------------------------------------
  const petWrapper = document.querySelector('.interactive-pet-wrapper');
  const petCard = document.querySelector('.interactive-pet-card');
  const petDialog = document.querySelector('.pet-dialog-bubble');
  const petDialogText = document.querySelector('.pet-dialog-text');
  const petSleep = document.querySelector('.pet-sleep-indicator');
  const petToggleBtn = document.querySelector('.pet-toggle-btn');
  const eyeLeft = document.getElementById('petEyeLeft');
  const eyeRight = document.getElementById('petEyeRight');
  const petAntennaLight = document.getElementById('petAntennaLight');
  const petEyesSleeping = document.getElementById('petEyesSleeping');
  const petEyesBlinking = document.getElementById('petEyesBlinking');
  const petEyesTracking = document.getElementById('petEyesTracking');
  const petMouth = document.getElementById('petMouth');
  const petBlush = document.getElementById('petBlush');

  let isSleeping = false;
  let isBlinking = false;
  let isMinimized = false;
  let idleTimer = null;
  let dialogTimer = null;

  const petPhrases = [
    'Bip bop! Olá! 👋',
    'Seguindo você com precisão! 👀',
    'Estilo Kinect ativado! 🎮',
    'Você tem um ótimo gosto! ✨',
    'Gostou dos projetos? 🚀',
    '*ronronar de robô* 🤖💛',
  ];

  function resetIdleTimer() {
    if (isSleeping) {
      isSleeping = false;
      if (petSleep) petSleep.style.display = 'none';
      if (petEyesSleeping) petEyesSleeping.style.display = 'none';
      if (petEyesTracking) petEyesTracking.style.display = 'block';
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#FFB020');
    }

    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      isSleeping = true;
      if (petSleep) petSleep.style.display = 'flex';
      if (petEyesSleeping) petEyesSleeping.style.display = 'block';
      if (petEyesTracking) petEyesTracking.style.display = 'none';
      if (petEyesBlinking) petEyesBlinking.style.display = 'none';
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#555566');
      if (petCard) petCard.style.transform = 'perspective(600px) rotateX(10deg) rotateY(0deg)';
    }, 7000);
  }

  // Piscar de olhos natural
  setInterval(() => {
    if (!isSleeping && petEyesTracking && petEyesBlinking) {
      petEyesTracking.style.display = 'none';
      petEyesBlinking.style.display = 'block';
      setTimeout(() => {
        if (!isSleeping) {
          petEyesBlinking.style.display = 'none';
          petEyesTracking.style.display = 'block';
        }
      }, 160);
    }
  }, 4000);

  // Rastreamento do mouse
  window.addEventListener('mousemove', (e) => {
    resetIdleTimer();

    if (!petCard || isMinimized || isSleeping) return;

    const rect = petCard.getBoundingClientRect();
    const petCenterX = rect.left + rect.width / 2;
    const petCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - petCenterX;
    const deltaY = e.clientY - petCenterY;
    const distance = Math.hypot(deltaX, deltaY);

    // Curiosidade: mouse muito próximo (< 130px)
    const isCurious = distance < 130;
    if (isCurious) {
      petCard.classList.add('curious');
      if (petBlush) petBlush.style.display = 'block';
      if (petMouth) petMouth.setAttribute('d', 'M 47 64 Q 50 67 53 64');
    } else {
      petCard.classList.remove('curious');
      if (petBlush) petBlush.style.display = 'none';
      if (petMouth) petMouth.setAttribute('d', 'M 45 64 L 55 64');
    }

    // Ângulo e deslocamento das pupilas
    const angle = Math.atan2(deltaY, deltaX);
    const maxRadius = 6.5;
    const clampedDistance = Math.min(maxRadius, distance / 22);

    const pupilX = Math.cos(angle) * clampedDistance;
    const pupilY = Math.sin(angle) * clampedDistance;

    if (eyeLeft) eyeLeft.setAttribute('transform', `translate(${40 + pupilX}, ${49 + pupilY})`);
    if (eyeRight) eyeRight.setAttribute('transform', `translate(${60 + pupilX}, ${49 + pupilY})`);

    // Inclinação 3D da cabeça (Parallax)
    const maxAngle = 22;
    const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 1.5)));
    const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 1.5)));

    petCard.style.transform = `perspective(600px) rotateX(${-normY * maxAngle}deg) rotateY(${normX * maxAngle}deg)`;
  }, { passive: true });

  // Clique no mascote
  if (petCard) {
    petCard.addEventListener('click', (e) => {
      e.stopPropagation();
      resetIdleTimer();

      petCard.classList.add('happy-bounce');
      if (petAntennaLight) petAntennaLight.setAttribute('fill', '#00FFCC');

      // Frase aleatória
      const phrase = petPhrases[Math.floor(Math.random() * petPhrases.length)];
      if (petDialog && petDialogText) {
        petDialogText.textContent = phrase;
        petDialog.style.display = 'block';

        if (dialogTimer) clearTimeout(dialogTimer);
        dialogTimer = setTimeout(() => {
          petDialog.style.display = 'none';
        }, 2600);
      }

      // Confetes
      if (typeof confetti === 'function') {
        try {
          const rect = petCard.getBoundingClientRect();
          confetti({
            particleCount: 28,
            spread: 55,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ['#FFB020', '#FF7A18', '#00FFCC', '#FFFFFF'],
          });
        } catch (err) {}
      }

      setTimeout(() => {
        petCard.classList.remove('happy-bounce');
        if (petAntennaLight && !isSleeping) petAntennaLight.setAttribute('fill', '#FFB020');
      }, 1000);
    });
  }

  // Botão de minimizar/expandir mascote
  if (petToggleBtn && petWrapper) {
    petToggleBtn.addEventListener('click', () => {
      isMinimized = !isMinimized;
      if (isMinimized) {
        petWrapper.classList.add('minimized');
        petToggleBtn.textContent = '🤖';
        petToggleBtn.setAttribute('title', 'Expandir mascote');
      } else {
        petWrapper.classList.remove('minimized');
        petToggleBtn.textContent = '−';
        petToggleBtn.setAttribute('title', 'Minimizar mascote');
      }
    });
  }

  // Inicializa o timer de inatividade
  resetIdleTimer();
});
