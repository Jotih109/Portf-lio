# 📊 Doqt Analytics — Galeria de Telas & Apresentação para Portfólio

Este diretório contém capturas de tela em alta definição (**Retina / 4K @ 2x Scale Factor**) de todos os módulos, visões e recursos interativos do **Doqt Analytics** — um ecossistema completo de inteligência de dados clínicos e gestão executiva de clínicas e consultórios médicos.

---

## 🛠️ Stack Tecnológica de Destaque

- **Frontend Core**: React 19, TypeScript, Vite.
- **Estilização & Design System**: TailwindCSS, CSS Variables, Glassmorphism, Dark/Light Mode nativo com persistência.
- **Visualização de Dados**: Recharts (Heatmaps temporais, Radar charts multivariáveis, Funis de conversão, Gráficos de barra empilhada e Linhas de tendência).
- **Processamento de Dados de Alta Performance**: Motor de agregação em memória capaz de processar mais de 15.000 registros clínicos em milissegundos com filtros combinados (unidades, períodos, categorias, convênios).
- **UI/UX Icons**: Lucide React.
- **Automação de Capturas**: Puppeteer Core integrado com Google Chrome.

---

## 📸 Catálogo Completo de Imagens

| # | Arquivo | Módulo / Visão | Principais Recursos Demonstrados |
|---|---|---|---|
| **01** | `01_login_page.png` | **Página de Autenticação & Welcome** | Design moderno, login seguro com JWT e opção de acesso de demonstração em 1 clique (*Modo Convidado*). |
| **02** | `02_dashboard_overview_light.png` | **Visão Geral Executiva (Light Mode)** | Score geral de saúde da clínica, KPIs de ocupação, no-show, tempo de espera, motor de IA com insights preditivos e radar multivariável. |
| **03** | `03_dashboard_overview_dark.png` | **Visão Geral Executiva (Dark Mode)** | Tema escuro elegante com contraste otimizado, glassmorphism e paleta de cores teal/ciano. |
| **04** | `04_metas_acompanhamento.png` | **Acompanhamento de Metas & Ritmo** | Projeções matemáticas de faturamento e consultas, ritmo necessário vs. realizado e barra de progresso dinâmica. |
| **05** | `05_metas_fechamento_mensal.png` | **Fechamento Mensal Consolidado** | Consolidação financeira e operacional por unidade (Campos Elísios, Centro, Irajá) e divisão de mix Particular vs. Convênios. |
| **06** | `06_metas_os_zeradas.png` | **Auditoria de O.S. Zeradas** | Identificação e prevenção de perdas de faturamento por ordens de serviço sem valor ou pendências cadastrais. |
| **07** | `07_desempenho_por_filial.png` | **Desempenho por Unidade / Filial** | Comparação direta entre filiais com faturamento, taxa de ocupação física e índice de cancelamentos. |
| **08** | `08_desempenho_por_profissional.png` | **Scorecards Médicos Individuais** | Score de produtividade individual (0-100), tempo médio de espera, taxa de retorno e tabela paginada com buscas instantâneas. |
| **09** | `09_desempenho_por_especialidade.png` | **Desempenho por Especialidade** | Análise de rentabilidade e volume por especialidade médica (Psiquiatria, Oftalmologia, Ortopedia, etc.). |
| **10** | `10_desempenho_por_convenio.png` | **Desempenho por Convênio & Planos** | Participação de mercado de cada operadora (Unimed, Bradesco, Amil, SulAmérica) e prazos médios de recebimento. |
| **11** | `11_desempenho_por_recepcionista.png` | **Produtividade da Recepção** | Métricas de agilidade de atendimento, volume de agendamentos realizados e taxa de conversão por colaborador. |
| **12** | `12_tendencias_fluxo_pacientes.png` | **Fluxo de Pacientes & Funil** | Funil de conversão completo (Horários Abertos ➔ Agendados ➔ Atendidos) e Top 10 procedimentos mais frequentes. |
| **13** | `13_tendencias_analise_temporal.png` | **Mapa de Calor de Horários (Heatmap)** | Matriz visual de densidade de fluxo por dia da semana (Segunda a Sábado) e faixas horárias (07h às 22h). |
| **14** | `14_tendencias_comparativo.png` | **Comparativo Avançado entre Períodos** | Ferramenta analítica para confrontar métricas de diferentes filiais, meses e sazonalidades. |
| **15** | `15_medicina_inativacoes_ina_ativ.png` | **Inteligência de Inativações (INA_ATIV)** | Painel de controle e detecção de ociosidade, agendas bloqueadas e motivos de inativação de horários médicos. |
| **16** | `16_gestao_importacao_dados.png` | **Central de Importação e ETL** | Upload inteligente de planilhas CSV/XLSX, validação de schema em tempo real e sincronização com a base local. |
| **17** | `17_filtros_e_interatividade.png` | **Filtros Globais & Interatividade** | Menu suspenso de seleção múltipla de filiais, períodos personalizados e atualização reativa de todo o dashboard. |
| **18** | `18_mobile_responsive_dashboard.png` | **Experiência Mobile-First** | Interface totalmente responsiva otimizada para smartphones e tablets com navegação por gestos e cards táteis. |

---

## 💡 Como Usar no Portfólio / GitHub / LinkedIn

### 1. Descrição Rápida do Projeto (Pitch)
> *"Desenvolvi o **Doqt Analytics**, um SaaS de business intelligence e analytics para gestão de clínicas médicas de grande porte. A aplicação processa mais de 15.000 atendimentos mensais em tempo real no client-side com React 19, TypeScript e TailwindCSS, fornecendo heatmaps temporais, scorecards de médicos e recepcionistas, motor de insights automáticos com IA e auditoria de faturamento."*

### 2. Estrutura dos Destaques Técnicos para Apresentar em Entrevistas:
1. **Engine de Filtros Reativos**: Estado global gerenciado com React Context e Reducer otimizado, permitindo cruzamento multidimensional instantâneo sem travamento de UI.
2. **Design System & Acessibilidade**: Suporte a Dark/Light mode com persistência local, tipografia balanceada e componentes acessíveis.
3. **Dashboards Complexos**: Mais de 14 visões com gráficos Recharts customizados (Radar, Bar, Line, Heatmap, Funnel).
4. **Pipeline Automatizado de Capturas**: Script Node.js com Puppeteer que executa todo o fluxo de teste e gera os prints do sistema automaticamente.
