# 3. Proposta de solução tecnológica

## Visão geral

O **Prumo** é um app web responsivo que responde a uma pergunta simples: **"Como estou hoje?"**

Em menos de um minuto o usuário registra o dia:

| Hábito | Como é informado |
|---|---|
| 😴 Sono | horas dormidas e qualidade (1 a 5) |
| 🏃 Atividade física | minutos e intensidade (leve, moderada, vigorosa) |
| 💧 Água | copos ou litros |
| 🍽️ Alimentação | 3 perguntas baseadas no Guia Alimentar (frutas e verduras, refeições caseiras, ultraprocessados) |
| 😐 Humor e energia | escala de 1 a 5 |
| 📱 Tempo de tela no lazer | horas |

E recebe de volta um card com um pequeno plano de bem-estar:

> **Seu dia**
> Energia: 6/10
> Sono: abaixo do seu padrão (5h40 contra 6h50 da sua média)
> Atividade: boa, faltam 40 min para a meta semanal da OMS
>
> **Sugestão para hoje:** faça uma caminhada de 20 min depois do almoço e tente dormir 30 min mais cedo.

## Como a solução ataca o problema

| Problema | Resposta do Prumo |
|---|---|
| A pessoa não enxerga a própria rotina | Registro diário rápido, histórico e gráficos de evolução. |
| Recomendações são genéricas | Comparação com o **próprio padrão** (média dos últimos 7 dias) e com metas oficiais. |
| Não sabe por onde começar | No máximo **2 sugestões pequenas e concretas** por dia. |
| Falta de referência confiável | Metas e médias vêm de **bases públicas** (OMS, Guia Alimentar, Vigitel, PNS). |

## Decisão central: separar o cálculo da explicação

```
Registro do dia ──► Motor de regras (código) ──► Números calculados ──► LLM ──► Card "Seu dia"
                         │                                                 ▲
                         ├── média dos últimos 7 dias do usuário            │
                         ├── metas OMS / Guia Alimentar                     │
                         └── médias populacionais Vigitel / PNS ────────────┘
```

1. **O código calcula as notas** com regras fixas, sem LLM: nota de energia (0 a 10), avaliação de cada hábito, comparação com o padrão do usuário e com as metas. O resultado é **determinístico**: os mesmos dados dão sempre a mesma nota, e o grupo consegue explicar a conta para a banca.
2. **O LLM só explica e sugere.** Recebe os números já prontos e o resumo do histórico, e escreve o card em linguagem simples, com 1 ou 2 sugestões. Ele não inventa números: só usa os que recebeu.
3. **Chatbot (função secundária).** Um chat que conhece o histórico do usuário e responde perguntas como "por que estou cansado essa semana?".

### Regras de pontuação (versão inicial, a calibrar no Checkpoint 2)

| Hábito | Referência | Regra proposta |
|---|---|---|
| Sono | 7 a 9 h (NSF) | 10 dentro da faixa; cai proporcionalmente fora dela |
| Atividade | 150 min/semana moderada ou 75 vigorosa (OMS) | soma dos últimos 7 dias; 1 min vigoroso conta como 2 moderados |
| Água | 2,0 L (mulheres) / 2,5 L (homens) (EFSA) | proporcional à meta, limitado a 10 |
| Alimentação | Guia Alimentar | pontos por frutas/verduras e refeição caseira, desconto por ultraprocessados |
| Tela no lazer | indicador do Vigitel | quanto menor, melhor |
| Humor e energia | autodeclarado | entra direto na nota |

A **nota de energia do dia** é uma média ponderada dessas notas. Os pesos serão definidos e documentados no Checkpoint 2.

## Fluxo principal (o que precisa funcionar ao vivo)

```
Login ─► Registrar o dia ─► Receber a análise da IA ─► Ver histórico e gráficos
```

## Tecnologias e justificativa

O desenvolvimento começa **100% local**, para o grupo evoluir rápido e sem custo. A arquitetura-alvo para a apresentação final é **AWS serverless**. A decisão final de hospedagem fica para o Checkpoint 2.

| Camada | Tecnologia | Por que |
|---|---|---|
| Front-end | **React + TypeScript (Vite)**, web responsivo | Funciona no celular e no computador sem publicar em loja. Tipagem reduz erros. |
| Gráficos | **Recharts** | Biblioteca React simples para os gráficos de evolução. |
| API | **Python** (rodando localmente; na AWS, **API Gateway + AWS Lambda**) | Python é forte em análise de dados (útil para tratar Vigitel e PNS). Lambda cobra só pelo uso. |
| Banco de dados | Local na fase de desenvolvimento; na AWS, **DynamoDB** | Registros diários por usuário e data cabem bem numa tabela chave-valor. Free tier generoso. |
| Login | Na AWS, **Amazon Cognito** | Autenticação pronta e segura, sem guardar senha no nosso código. |
| IA (LLM) | **Amazon Bedrock** com modelo barato (Claude Haiku ou Amazon Nova Micro). No dev local, um **modo mock** com respostas fixas | Modelos baratos bastam para escrever um card curto. O mock permite desenvolver e testar sem custo. |
| Dados públicos | Arquivo `data/referencias.json` gerado a partir das bases | Os números ficam versionados e com a fonte de cada um. |

**Custo:** contas novas da AWS recebem até US$ 200 em créditos e um plano gratuito de 6 meses. O volume de uma demo fica em centavos. Um alerta no AWS Budgets será criado no primeiro dia de uso da conta.

**Alternativa (se a AWS complicar):** Vercel (front e API) + Supabase (login e Postgres) + API do Gemini (nível gratuito).

## Ética e LGPD

- Pela LGPD (art. 5º, II), dado referente à saúde é **dado pessoal sensível**. O tratamento depende de **consentimento específico e destacado** (art. 11).
- O cadastro terá um **termo de consentimento** claro, explicando quais dados são coletados e para quê.
- Aviso fixo no app: **"O Prumo não substitui orientação médica."**
- O usuário pode **exportar e apagar** todos os seus dados.
- Ao LLM vão apenas os números do dia e o resumo do histórico, **sem nome, e-mail ou outros identificadores**.
- O app não faz diagnóstico. Se o usuário relatar sintomas preocupantes no chat, a resposta orienta a procurar um profissional de saúde.

## Viabilidade no semestre

| Etapa | Entrega |
|---|---|
| Checkpoint 1 (até 30/10) | Problema, bases, proposta, identidade visual, pitch |
| Checkpoint 2 (09/11 a 27/11) | Fluxo principal funcionando com dados reais de referência, README com prints, vídeo |
| Final (07 e 08/12) | Chatbot, ajustes da banca e do mentor, deploy estável |

O escopo é viável porque o fluxo principal tem apenas 4 telas e a parte de IA se limita a gerar texto a partir de números já calculados.
