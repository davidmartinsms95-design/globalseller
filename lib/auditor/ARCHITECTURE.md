# GlobalSeller Auditor (GSA)

## Objetivo

O GlobalSeller Auditor (GSA) é a plataforma oficial de auditoria técnica do projeto GlobalSeller.

Seu objetivo é analisar automaticamente toda a estrutura do projeto, detectar problemas, calcular impacto das alterações e gerar planos de ação para evolução contínua da aplicação.

O GSA NÃO altera código automaticamente.

Ele apenas:

- coleta informações
- identifica problemas
- calcula impacto
- gera recomendações
- cria planos de execução

Toda correção continuará sendo realizada pelo desenvolvedor.

---

# Arquitetura

Pipeline principal

Explorer

↓

Collectors

↓

Project Index

↓

Analyzers

↓

Rules Engine

↓

Planning Engine

↓

Report Engine

---

# Explorer

Responsável por localizar todos os arquivos do projeto.

Não interpreta código.

Não aplica regras.

Não executa análises.

Entrega apenas:

- caminho
- nome
- extensão
- diretório

---

# Collectors

Extraem informações dos arquivos.

Exemplos:

- ImportCollector
- ExportCollector
- ComponentCollector
- HookCollector
- ApiCollector
- RouteCollector
- PrismaCollector
- ServiceCollector
- InterfaceCollector
- TypeCollector

Cada Collector possui apenas uma responsabilidade.

---

# Project Index

Centraliza todas as informações coletadas.

Nenhum Analyzer deverá abrir arquivos diretamente.

Todos utilizarão apenas o índice.

---

# Analyzers

Executam análises sobre o índice.

Exemplos:

- ImportAnalyzer
- DependencyAnalyzer
- DuplicateAnalyzer
- DeadCodeAnalyzer
- ArchitectureAnalyzer
- SprintAnalyzer
- PrismaAnalyzer
- NextAnalyzer
- PerformanceAnalyzer
- SecurityAnalyzer

Nenhum Analyzer altera código.

---

# Rules Engine

Classifica os problemas encontrados.

Categorias previstas:

- Architecture
- SOLID
- Clean Code
- Performance
- Security
- Prisma
- Next.js
- Marketplace
- Intelligence
- Sprint

---

# Planning Engine

Transforma problemas encontrados em um plano de execução.

Cada item deve possuir:

- prioridade
- impacto
- risco
- arquivos afetados
- tempo estimado
- sprint sugerida

---

# Report Engine

Responsável pela geração dos relatórios.

Formatos previstos:

- Terminal
- JSON
- Markdown
- Dashboard Web

---

# Princípios

O GSA deve seguir:

- SOLID
- Clean Architecture
- Single Responsibility
- Alta coesão
- Baixo acoplamento

Nenhum módulo poderá depender diretamente de outro módulo de análise.

Toda comunicação ocorrerá através do Project Index.

---

# Objetivo Final

Permitir que qualquer alteração no projeto possa ser analisada automaticamente antes de sua implementação, reduzindo regressões, identificando riscos e orientando a evolução contínua do GlobalSeller.