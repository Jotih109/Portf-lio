# 🏥 Chat DOQT — Sistema de Comunicação Clínica e Mensageria Hospitalar em Tempo Real

> **Galeria de Telas & Demonstração Visual para Portfólio de Engenharia de Software / Fullstack**

---

## 🎯 Sobre o Projeto

O **Chat DOQT** é uma plataforma de comunicação clínica e mensageria segura desenvolvida especificamente para o ambiente de saúde (hospitais, clínicas e redes de atendimento médico).

Projetado para substituir ferramentas de mensagens genéricas (como WhatsApp pessoal), o sistema oferece controle total sobre permissões de colaboradores, conformidade com privacidade e proteção de dados médicos, recibos de leitura auditáveis e fixação temporária de protocolos clínicos de emergência.

---

## 📸 Índice Visual dos Prints

| # | Arquivo | Tela / Funcionalidade | Destaques Técnicos & UX |
|---|---------|----------------------|--------------------------|
| **01** | `01_tela_login.png` | **Tela de Autenticação Segura** | Design clínico profissional, máscara e validação de CPF, visualização de senha e layout responsivo. |
| **02** | `02_chat_grupo_cardiologia.png` | **Chat em Grupo Clínico** | Header com membros, barra de mensagem fixada com contagem de expiração, preview de PDFs de exames, player de áudio com waveform e balões estilo WhatsApp. |
| **03** | `03_conversa_direta_1a1.png` | **Chat Direto 1 a 1** | Indicador de status online em tempo real, recibos de entrega e leitura com duplo tique azul (`✓✓`), e barra de digitação com upload. |
| **04** | `04_gravacao_audio_tempo_real.png` | **Gravador de Áudio com Waveform** | Microfone integrado, visualizador de ondas sonoras em tempo real, timer dinâmico de gravação e cancelamento rápido. |
| **05** | `05_modal_dados_mensagem_recibos.png` | **Modal de Dados da Mensagem** | Auditoria e transparência de entrega: exibe data e hora exata de visualização e recebimento por membro no fuso de Brasília. |
| **06** | `06_modal_fixar_mensagem_validade.png` | **Modal de Fixação de Mensagem** | Regra de negócio médica com seletor de expiração automática (10, 20 ou 30 dias) e limite de mensagens fixadas por canal. |
| **07** | `07_modal_criar_novo_grupo.png` | **Modal de Criação de Grupo** | Multi-seleção com checkboxes customizados, filtro instantâneo de colaboradores e avatar dinâmico com badge de equipe. |
| **08** | `08_modal_gestao_membros_grupo.png` | **Gestão de Membros & Permissões** | Listagem de participantes, badges de função (Admin / Membro), promoção de moderadores e remoção segura. |
| **09** | `09_mural_avisos_comunicados.png` | **Quadro de Avisos & Comunicados** | Canal oficial de diretoria médica, tags de prioridade (Urgente / Escala), contador de colaboradores que leram e botão de confirmação de leitura. |
| **10** | `10_painel_admin_visao_geral.png` | **Painel de Gestão e Acessos** | Cards de KPIs (Colaboradores, Ativos, Admins, Grupos), tabela de usuários com busca em tempo real e redefinição de credenciais. |
| **11** | `11_modal_cadastrar_funcionario.png` | **Cadastro de Novo Funcionário** | Formulário modal com controle de cargo, especialidade médica, papel de acesso (Usuário / Admin) e validações síncronas. |
| **12** | `12_mobile_lista_conversas.png` | **Mobile — Lista de Conversas** | Experiência adaptada para smartphones, bottom bar nativa, contador de não lidas e previews compactos. |
| **13** | `13_mobile_chat_ativo.png` | **Mobile — Chat Ativo** | Layout 100% responsivo para telas compactas (390px), balões adaptáveis, barra fixada compacta e input otimizado para teclado virtual. |

---

## 🛠️ Stack Tecnológica

### Frontend & Interface
- **Framework:** [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) (Fullstack com SSR & Server Functions)
- **Roteamento:** [TanStack Router](https://tanstack.com/router) (File-based Routing type-safe)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com tokens de cores clínicas (`#0d8f8e` Teal)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)

### Backend & Dados
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) gerenciado via [Supabase](https://supabase.com/)
- **Tempo Real:** Supabase Realtime Channels (WebSockets para mensagens instantâneas e status de presença)
- **Segurança:** Row Level Security (RLS) garantindo isolamento estrito entre usuários e equipes
- **Storage:** Supabase Storage para armazenamento seguro de laudos, exames em PDF e áudios de voz

### Infraestrutura & Deploy
- **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/) / Edge Network
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 💡 Destaques de Engenharia & Regras de Negócio

1. **Recibos de Leitura Auditáveis:**
   - Cada mensagem rastreia status `sent`, `delivered` e `read` individualmente por destinatário com data/hora em timestamp ISO gravado no banco.

2. **Mensagens Fixadas Temporárias (Protocolos Médicos):**
   - Mensagens com validade configurável (10, 20 ou 30 dias). Após a data limite, deixam de ocupar a barra de destaque automaticamente sem necessidade de exclusão manual.

3. **Gravação & Reprodução de Áudio Nativa:**
   - Gravação direta pelo navegador com visualização de ondas sonoras, codificação em formato de áudio comprimido e envio instantâneo ao storage.

4. **Painel de Controle e Governança:**
   - Controle estrito de acesso para administradores: ativação/desativação imediata de credenciais de colaboradores que deixarem o hospital.

---

*Gerado com mock de dados clínicos simulados para proteção de privacidade e segurança da informação.*
