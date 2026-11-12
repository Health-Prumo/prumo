# AGENTS.md — contexto do projeto Prumo

Guia para agentes de IA (Claude Code e Codex) trabalharem no Prumo. Leia este arquivo antes de qualquer tarefa. Os detalhes ficam em [`docs/`](docs/), e este arquivo diz onde está cada coisa e quais regras valem.

> O Codex lê este arquivo direto, e o `CLAUDE.md` apenas o importa. Atualize **só o AGENTS.md**.

## 1. O que é o Prumo

- **Coach de bem-estar com IA** que responde "**Como estou hoje?**". Em menos de um minuto o usuário registra sono, atividade física, água, alimentação, humor/energia e tempo de tela, e recebe um card "Seu dia" com uma nota de energia e **1 ou 2 sugestões** práticas.
- **Contexto:** projeto acadêmico do **FMU Tech Inovação 2026.2**, alinhado ao **ODS 3 (Saúde e Bem-Estar), meta 3.4**. Site do desafio: https://fmu-tech-inovacao-20262.vercel.app/
- **Público-alvo:** adultos sedentários de 18 a 59 anos. O recorte para universitários está **em avaliação** pelo grupo; não trate como decidido.
- **Projeto pessoal dos alunos.** Não tem relação com empresa, empregador ou clientes de nenhum integrante.
- **Não substitui orientação médica.** O app não diagnostica, não prescreve dieta nem treino.

### Decisão central (não quebre)

**O cálculo é separado da explicação:**

1. **O código calcula as notas** com regras fixas e determinísticas: compara com a média dos últimos 7 dias do usuário e com metas oficiais (OMS, Guia Alimentar, Vigitel, PNS). As regras estão em [`docs/03-solucao.md`](docs/03-solucao.md), seção "Regras de pontuação".
2. **O LLM só explica e sugere.** Recebe os números prontos e escreve o card. Nunca inventa números nem calcula a nota.
3. **Ao LLM vão só números e o resumo do histórico**, sem nome, e-mail ou outro identificador (LGPD: dado de saúde é dado sensível).
4. O chatbot que conhece o histórico é uma **função secundária**.

## 2. Equipe e cronograma

| Integrante | GitHub |
|---|---|
| Guilherme Geronymo | `Geronymow` (admin da organização) |
| Gabriel Ramos | `gaferamos` |
| Eduardo Sannini | `Eduardokhayyam` |

Professor mentor e licença: **a definir**.

| Período | Etapa | Status |
|---|---|---|
| 19/10 a 30/10/2026 | Checkpoint 1: Ideação (problema, bases, solução, identidade, pitch) | Concluído |
| 09/11 a 27/11/2026 | Checkpoint 2: protótipo funcional, README com prints e vídeo | Em andamento |
| 07 e 08/12/2026 | Apresentação final à banca | — |

## 3. Repositórios (organização GitHub `Health-Prumo`)

Todos são **públicos**. Nunca coloque segredo, chave, senha ou e-mail pessoal em nenhum deles.

| Repositório | Conteúdo |
|---|---|
| [`prumo`](https://github.com/Health-Prumo/prumo) (este) | Repositório central: proposta, docs, identidade visual, mockups, arquitetura |
| [`.github`](https://github.com/Health-Prumo/.github) | `profile/README.md` = página de apresentação da organização |
| [`tf-blueprint`](https://github.com/Health-Prumo/tf-blueprint) | Módulos Terraform reutilizáveis, versionados por tag (hoje `v0.2.0`: `budgets` e `cost-anomaly`) |
| [`tf-environments`](https://github.com/Health-Prumo/tf-environments) | Ambientes em Terragrunt que consomem o `tf-blueprint` (hoje `global/budgets` e `global/cost-anomaly`) |
| [`prumo-web`](https://github.com/Health-Prumo/prumo-web) | Front-end (React + TypeScript, Vite). **Ainda sem código**: tem só o próprio `AGENTS.md` com a stack e as regras do front |
| [`prumo-api`](https://github.com/Health-Prumo/prumo-api) | API (Python, Lambda, DynamoDB, Bedrock). **Ainda sem código**: tem só o próprio `AGENTS.md` com a stack e as regras da API |

### Estrutura deste repositório

```
README.md                       # vitrine do projeto (pitch, problema, solução, identidade, cronograma)
AGENTS.md                       # este arquivo
CLAUDE.md                       # importa o AGENTS.md (Claude Code)
docs/
  01-problema.md                # problema, ODS 3, público-alvo, recorte
  02-bases-de-dados.md          # Vigitel, PNS 2019, OMS 2020, Guia Alimentar; pendências do CP2
  03-solucao.md                 # funcionalidades, regras de pontuação, tecnologias, LGPD
  04-identidade-visual.md       # logo, paleta, tipografia, contraste WCAG, tom de voz
  05-pitch.md                   # pitch
  06-infraestrutura-aws.md      # arquitetura AWS, custos oficiais, conta, Terraform, checklist
  07-pesquisa-rag.md            # fontes candidatas, limites e proposta de curadoria para o RAG
assets/
  brand/                        # logos e símbolo (SVG), png/ (exportações, paleta, avatar), src/paleta.html
  mockups/                      # desktop-hoje.png, mobile-telas.png; src/ = HTML/CSS dos mockups
  arquitetura/                  # arquitetura-aws.svg e .png
```

## 4. Stack prevista

| Camada | Tecnologia |
|---|---|
| Front-end | React + TypeScript (Vite), web responsivo, Recharts |
| API | Python (local no desenvolvimento; na AWS, API Gateway HTTP API + Lambda Python ARM) |
| Banco | Local no desenvolvimento; na AWS, DynamoDB (tabela única) |
| Login | Amazon Cognito (plano Lite) |
| IA | Amazon Bedrock com **Amazon Nova Micro** (`amazon.nova-micro-v1:0`). No desenvolvimento local, **modo mock** com respostas fixas |
| Dados públicos | `data/referencias.json` gerado a partir das bases, com a fonte de cada número |

**Por que Nova Micro e não Claude no Bedrock:** os modelos da Anthropic no Bedrock são cobrados pelo AWS Marketplace, que os créditos do plano Free não cobrem. O ID do modelo fica numa variável de ambiente da Lambda.

## 5. AWS

### Conta

| | |
|---|---|
| Conta | `health-prumo`, ID `444331926746` |
| Plano | **Free**: US$ 100 de créditos, válido até 11/05/2027. Nunca gera cobrança |
| Região | **`us-east-1` para tudo** |
| Acesso | Usuários **IAM** individuais (grupo `admins`). CLI por `aws login --profile prumo`, **sem access keys** |
| Orçamento | `prumo-global-mensal`: US$ 40/mês, e-mail em US$ 20 e US$ 40 de gasto real e na previsão de passar de US$ 40 |
| Anomalias de custo | Monitor `prumo-global-servicos` e assinatura `prumo-global-anomalias`: resumo diário por e-mail quando uma anomalia passa de US$ 5 |

### Regras que não podem ser quebradas

- **Nunca ative AWS Organizations, IAM Identity Center (SSO) nem Control Tower.** Qualquer um deles converte a conta para o plano pago, sem volta. Isso já aconteceu com a primeira conta do projeto, que teve de ser fechada.
- **Confira a conta antes de qualquer comando que crie ou altere algo:** `aws sts get-caller-identity --profile prumo` tem que retornar `444331926746`. Integrantes podem ter outros perfis da AWS configurados na máquina; nunca use um perfil que não seja o do Prumo.
- **Não crie recursos que cobram por hora** sem combinar com o grupo: NAT Gateway, RDS/Aurora, EC2, IPv4 público parado, WAF, domínio no Route 53. Os interface endpoints da VPC (cerca de US$ 29,20/mês) estão previstos no desenho e devem ser ligados só na janela de teste.
- **Toda mudança de infraestrutura passa pelo Terraform/Terragrunt**, nunca pelo console.
- **Todo recurso leva a tag `ze = porvux`** (chave `ze`, valor `porvux`). No Terraform ela vem do `default_tags` do `root.hcl`. Se algo for criado pelo console ou pela CLI (usuários IAM, por exemplo), aplique a tag na criação. Confira com `aws resourcegroupstaggingapi get-resources --tag-filters Key=ze,Values=porvux`.

### Arquitetura planejada

Diagrama: [`assets/arquitetura/arquitetura-aws.png`](assets/arquitetura/arquitetura-aws.png). Detalhes, preços oficiais e estimativa: [`docs/06-infraestrutura-aws.md`](docs/06-infraestrutura-aws.md).

- **Front-end:** CloudFront + S3 privado (Origin Access Control).
- **Login:** Cognito; o API Gateway valida o JWT.
- **API:** API Gateway HTTP API → Lambda (Python, arm64) em **subnets privadas de 2 AZs**.
- **Rede:** VPC `10.0.0.0/16`, sem NAT Gateway. DynamoDB por gateway endpoint (grátis); Bedrock Runtime e CloudWatch Logs por interface endpoints. As subnets públicas ficam reservadas, sem recursos.
- **Dados:** DynamoDB on-demand, tabela única. `PK = USUARIO#<id>`, `SK = PERFIL | DIA#<aaaa-mm-dd> | CHAT#<timestamp>`, TTL no atributo `expira_em`.
- **Outros:** EventBridge Scheduler (resumo diário), CloudWatch Logs (retenção de 14 dias), IAM com privilégio mínimo, Budgets.
- **Custo do teste** (3 usuários, 1 mês): cerca de US$ 29,36, quase todo dos interface endpoints. Sem eles, cerca de US$ 0,16.

### Terraform e Terragrunt

- **Terraform, não CDK.** Provider `hashicorp/aws ~> 6.0`, Terraform `>= 1.10`, Terragrunt `>= 1.0`.
- **`tf-blueprint`:** um diretório por módulo com `versions.tf`, `variables.tf` (descrição, tipo e `validation`), `locals.tf`, `main.tf`, `outputs.tf` e `README.md`. Todo módulo recebe `basename`, `environment` e `tags`. Nomes no padrão `<basename>-<environment>-<recurso>`. O provider não é declarado nos módulos. O GitHub Actions roda `terraform fmt -check` e `validate`.
- **`tf-environments`:** um `root.hcl` por ambiente (`global/`, depois `dev/`), com:
  - estado no S3 `prumo-terraform-state-444331926746` com `use_lockfile = true`;
  - provider gerado com `allowed_account_ids = ["444331926746"]` e tags padrão (`ze = porvux`, `Projeto`, `Ambiente`, `GerenciadoPor`, `Repositorio`);
  - `inputs` comuns `basename`, `environment` e `region`.
- Cada unidade aponta para um módulo **por tag** (`git::https://github.com/Health-Prumo/tf-blueprint.git//<modulo>?ref=vX.Y.Z`), nunca pela `main`. Mudou um módulo: nova tag no `tf-blueprint`, depois atualize o `?ref=`.
- Dados sensíveis vêm de variáveis de ambiente. Os e-mails dos alertas vêm de `PRUMO_ALERT_EMAILS` (`budgets`) e `PRUMO_ANOMALY_EMAILS` (`cost-anomaly`), separados por vírgula; sem elas, o Terragrunt para com erro.
- Fluxo: `export AWS_PROFILE=prumo`, `terragrunt plan`, revisar, `terragrunt apply`. Mostre o plan antes de aplicar.

## 6. Identidade visual

Guia completo em [`docs/04-identidade-visual.md`](docs/04-identidade-visual.md).

- **Conceito:** o símbolo é inspirado no **fio de prumo**: equilíbrio, alinhamento, direção, estar no caminho correto. A marca deve parecer profissional e de alto nível.
- **Base branca, verde-esmeralda como contraste, menta como destaque.** Padrão de apps de saúde: o branco é o principal, o verde não é fundo.
- **Não use dourado** em nada, nem na logo. Ele foi removido da identidade.
- **Cores:**

| Token | Hex | Uso |
|---|---|---|
| Esmeralda | `#0B392E` | marca, títulos, logo |
| Verde 800 | `#145C48` | botões, links, linhas principais |
| Verde 700 | `#1D7259` | hover, ícones |
| Verde 500 | `#4E9E83` | detalhes |
| Verde 100 | `#E3F0EA` | fundos suaves |
| Menta | `#7FCFA8` | destaque, progresso |
| Menta claro | `#A8E0C4` | destaque suave |
| Fundo | `#F4F7F5` | fundo da página |
| Grafite | `#46545A` | texto secundário |
| Sucesso / Atenção / Erro | `#1F7A55` / `#9A5B06` / `#B42318` | estados |

- **Fontes:** Cormorant Garamond (logo e títulos) e Inter (texto e interface).
- **Acessibilidade:** WCAG 2.2, contraste de 4,5:1 para texto e 3:1 para gráficos e bordas.
- **Tom de voz:** acolhedor e nunca culpabilizante ("seu sono ficou abaixo do seu padrão", não "você dormiu mal"). Sugestões concretas, com tempo e ação. Frases curtas, sem excesso de emoji ou exclamação. Sempre lembra que não substitui orientação médica.
- Os mockups em `assets/mockups/src/` (`prumo.css` tem os tokens) são a base visual do front-end.

## 7. LGPD e ética

- Dado de saúde é **dado pessoal sensível** (LGPD art. 5º, II): exige **consentimento específico e destacado** (art. 11).
- Os dados ficam em `us-east-1`; a transferência internacional usa o consentimento do titular (art. 33, VIII), e o termo do cadastro informa onde os dados ficam.
- O usuário pode exportar e apagar todos os seus dados.
- Se o usuário relatar sintomas preocupantes, a resposta orienta procurar um profissional de saúde.

## 8. Convenções de trabalho

- **Idioma:** tudo em **português do Brasil**: docs, commits, comentários de código, textos da interface. Nomes de variáveis e recursos Terraform podem ser em inglês.
- **Escrita:** frases curtas e diretas, sem jargão desnecessário. Em docs, prefira tabelas e listas curtas a parágrafos longos.
- **Commits:** mensagem no imperativo em português ("Adiciona…", "Atualiza…"). Use a identidade git **pessoal** do integrante, nunca e-mail de trabalho: o GitHub só credita o commit se o e-mail estiver na conta.
- **Não commite:** segredos, `.terraform/`, `.terragrunt-cache/`, `*.tfstate`, planos do Terraform, nem arquivos gerados que não sejam entregáveis.
- **Fora do repositório, de propósito:** a calculadora interativa de custos e o script Python que gera o diagrama de arquitetura (`arquitetura_prumo.py`, que usa ferramentas que não são do projeto). Se o diagrama mudar, ele é regenerado fora daqui e só o SVG/PNG entra em `assets/arquitetura/`. O diagrama não menciona o plano Free.
- **Ao mudar algo relevante** (conta, repositórios, decisões, cronograma), atualize este arquivo, o `README.md` e o doc correspondente em `docs/`.

## 9. Pendências conhecidas

- Definir o público final (adultos sedentários ou universitários).
- Definir professor mentor e licença.
- Checkpoint 2: montar o código do `prumo-web` e do `prumo-api`, calibrar os pesos da nota de energia, gerar `data/referencias.json` a partir das bases (ver "Pendências" em `docs/02-bases-de-dados.md`).
- Infra: criar no `tf-blueprint` os módulos de rede, dados, login, front-end e API, e o ambiente `dev/` no `tf-environments`.
- Conta AWS: liberar o Nova Micro no Bedrock se o console pedir e fazer as atividades guiadas para ganhar até mais US$ 100 de créditos.
