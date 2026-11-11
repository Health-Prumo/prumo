# 7. Pesquisa inicial de fontes para o RAG

**Data:** 11/11/2026. **Status:** candidatos para avaliação, sem ingestão no RAG.

## Objetivo e recorte

Selecionar fontes para explicar hábitos e sustentar as sugestões do Prumo para adultos de 18 a 59 anos. O recorte exclusivo para universitários continua em avaliação.

Esta é uma pesquisa exploratória, não uma revisão sistemática. A busca consultou registros do PubMed, páginas de periódicos, textos indexados no PubMed Central (PMC) e publicações oficiais. Priorizou diretrizes, consensos, revisões e ensaios em humanos. Foram usadas combinações de termos sobre sono, atividade física, hidratação, ultraprocessados, humor e tempo de tela, com `guidelines`, `systematic review` e `randomized controlled trial`.

Os títulos, links e contribuições abaixo foram conferidos nos registros e trechos disponíveis. Algumas páginas de texto completo retornaram bloqueios de acesso automatizado. **Ainda não houve leitura integral de todos os artigos, avaliação formal de qualidade, conferência completa de licenças ou busca exaustiva de atualizações e retratações.** As prioridades são propostas de curadoria, não uma classificação formal de certeza da evidência.

## Papel de cada base

| Conteúdo | Papel proposto |
|---|---|
| Vigitel e PNS | Indicadores populacionais estruturados, com ano, população e definição da medida. |
| Metas aprovadas pelo grupo | Referências versionadas para o motor determinístico. |
| Guias e artigos selecionados | Conhecimento recuperado para explicar os resultados e contextualizar sugestões. |
| Histórico individual | Entrada privada do fluxo, separada da biblioteca científica pública. |

O RAG deve preservar a decisão do projeto: **o código calcula; o LLM explica e sugere**. Nenhuma fonte desta lista valida, por si só, a média ponderada chamada de nota de energia. A busca não encontrou validação dessa fórmula específica.

## Fontes científicas candidatas

### R01 — Atividade física e comportamento sedentário

**Bull FC et al. (2020).** *World Health Organization 2020 guidelines on physical activity and sedentary behaviour*. British Journal of Sports Medicine, 54:1451–1462.

- **Tipo e população:** artigo de diretriz; selecionar as recomendações para adultos de 18 a 64 anos.
- **Uso no RAG:** explicar atividade semanal, intensidades, benefícios de começar com pequenas quantidades e redução do comportamento sedentário.
- **Limite:** não fornece uma fórmula de energia diária nem um intervalo universal de pausas ou teto numérico de tela para adultos. Tela no lazer e tempo sedentário total são medidas distintas.
- **Prioridade:** alta, como base normativa.
- **Referência:** [DOI 10.1136/bjsports-2020-102955](https://doi.org/10.1136/bjsports-2020-102955). [Registro PubMed](https://pubmed.ncbi.nlm.nih.gov/33239350/). Texto completo listado no [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/).

### R02 — Duração do sono

**Watson NF et al. (2015).** *Recommended Amount of Sleep for a Healthy Adult: A Joint Consensus Statement of the American Academy of Sleep Medicine and Sleep Research Society*. Journal of Clinical Sleep Medicine, 11:591–592.

- **Tipo e população:** consenso AASM/SRS; adultos de 18 a 60 anos.
- **Uso no RAG:** explicar a recomendação de pelo menos 7 horas regulares e a variação individual de necessidade de sono.
- **Limite:** não equivale à faixa de 7–9 horas da NSF. O próprio consenso admite situações em que mais de 9 horas são apropriadas. Não sustenta penalização automática de qualquer duração acima desse valor.
- **Prioridade:** alta.
- **Referência:** [DOI 10.5664/jcsm.4758](https://doi.org/10.5664/jcsm.4758). [Texto no PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4442216/).

### R03 — Hábitos relacionados ao sono

**Irish LA et al. (2015; publicação antecipada em 2014).** *The role of sleep hygiene in promoting public health: A review of empirical evidence*. Sleep Medicine Reviews, 22:23–36.

- **Tipo e população:** revisão narrativa de evidências; foco em hábitos de sono e população adulta não clínica.
- **Uso no RAG:** contextualizar cafeína, ambiente, horários e outros comportamentos relacionados ao sono.
- **Limite:** a revisão identifica lacunas e apoio desigual às recomendações. Não apresentar higiene do sono como tratamento suficiente para insônia nem garantir melhora por uma ação isolada.
- **Prioridade:** complementar; procurar atualizações antes da ingestão.
- **Referência:** [DOI 10.1016/j.smrv.2014.10.001](https://doi.org/10.1016/j.smrv.2014.10.001). [Registro PubMed](https://pubmed.ncbi.nlm.nih.gov/25454674/). [Texto no PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4400203/).

### R04 — Hidratação

**EFSA Panel on Dietetic Products, Nutrition, and Allergies (2010).** *Scientific Opinion on Dietary Reference Values for water*. EFSA Journal, 8(3):1459.

- **Tipo e população:** parecer científico com valores por grupo populacional; selecionar a seção de adultos.
- **Uso no RAG:** explicar o conceito de ingestão adequada de água total e as condições da referência.
- **Limite:** os 2,0 L/dia para mulheres e 2,5 L/dia para homens incluem alimentos e todas as bebidas, em condições moderadas de temperatura e atividade. Não são metas equivalentes de água pura registrada no app, nem prescrição individual.
- **Prioridade:** alta para esclarecer a medida antes de implementar a pontuação.
- **Referência:** [DOI e página do parecer](https://doi.org/10.2903/j.efsa.2010.1459). A página indica acesso aberto; termos de reutilização ainda devem ser conferidos.

### R05 — Alimentação: evidência experimental

**Hall KD et al. (2019).** *Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain: An Inpatient Randomized Controlled Trial of Ad Libitum Food Intake*. Cell Metabolism, 30:67–77.e3.

- **Tipo e população:** ensaio randomizado cruzado, com 20 adultos internados para controle experimental da alimentação; duas semanas por dieta.
- **Uso no RAG:** complementar o Guia Alimentar ao explicar evidências sobre padrões de alimentação ultraprocessada.
- **Limite:** amostra pequena, duração curta e ambiente controlado. Não permite prever o peso ou a energia de um usuário, atribuir efeito a um alimento isolado ou prescrever calorias.
- **Prioridade:** complementar.
- **Referência:** [DOI 10.1016/j.cmet.2019.05.008](https://doi.org/10.1016/j.cmet.2019.05.008). [Registro do artigo no PubMed](https://pubmed.ncbi.nlm.nih.gov/31105044/). [Texto no PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7946062/). Conferir também a errata vinculada antes de extrair o texto.

### R06 — Alimentação: síntese epidemiológica

**Lane MM et al. (2024).** *Ultra-processed food exposure and adverse health outcomes: umbrella review of epidemiological meta-analyses*. BMJ, 384:e077310.

- **Tipo e população:** revisão de meta-análises epidemiológicas; populações e desfechos variados, que devem acompanhar cada trecho extraído.
- **Uso no RAG:** contextualizar associações entre maior exposição a ultraprocessados e desfechos de saúde.
- **Limite:** associação não equivale a causalidade individual. A certeza varia conforme o desfecho; não usar riscos relativos como previsão pessoal ou como explicação do cansaço de hoje.
- **Prioridade:** complementar.
- **Referência:** [DOI 10.1136/bmj-2023-077310](https://doi.org/10.1136/bmj-2023-077310). [Página do artigo](https://www.bmj.com/content/384/bmj-2023-077310).

### R07 — Atividade física, humor e bem-estar

**Singh B et al. (2023).** *Effectiveness of physical activity interventions for improving depression, anxiety and distress: an overview of systematic reviews*. British Journal of Sports Medicine, 57:1203–1209.

- **Tipo e população:** revisão de revisões sistemáticas de ensaios; diferentes populações adultas, incluindo grupos clínicos.
- **Uso no RAG:** contextualizar possíveis benefícios da atividade física para a saúde mental.
- **Limite:** muitas revisões incluídas têm baixa qualidade metodológica. Resultados de intervenções não significam melhora imediata do humor nem validam a escala diária de energia do Prumo. Não substituir tratamento ou sugerir equivalência com medicamentos.
- **Prioridade:** complementar, com filtro de população e desfecho.
- **Referência:** [DOI 10.1136/bjsports-2022-106195](https://doi.org/10.1136/bjsports-2022-106195). [Página do artigo](https://bjsm.bmj.com/content/early/2023/07/11/bjsports-2022-106195?versioned=true).

### R08 — Tempo de tela

**Pieh C et al. (2025).** *Smartphone screen time reduction improves mental health: a randomized controlled trial*. BMC Medicine, 23:107.

- **Tipo e população:** ensaio randomizado não cego com 111 estudantes saudáveis, média de idade próxima de 23 anos.
- **Uso no RAG:** discutir redução do uso de smartphone e possíveis efeitos sobre bem-estar, estresse e sono.
- **Limite:** intervenção de três semanas; o uso voltou a subir depois. A meta experimental de até 2 horas/dia não é um limite universal de saúde. Smartphone total não equivale a todas as telas no lazer. A generalização para adultos de 18 a 59 anos exige cautela.
- **Prioridade:** exploratória; especialmente relevante se o grupo adotar o recorte universitário.
- **Referência:** [DOI 10.1186/s12916-025-03944-z](https://doi.org/10.1186/s12916-025-03944-z). [Resumo e registro PubMed](https://pubmed.ncbi.nlm.nih.gov/39985031/). [Texto no PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11846175/).

## Guias oficiais que devem acompanhar os artigos

| Fonte | Uso proposto | Acesso |
|---|---|---|
| Ministério da Saúde. Guia Alimentar para a População Brasileira, 2ª edição, 2014 | Fonte principal para sugestões alimentares em contexto brasileiro: escolhas, refeições, planejamento e obstáculos. | [PDF oficial](https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf). A ficha informa CC BY-NC-SA 4.0. |
| OMS. WHO guidelines on physical activity and sedentary behaviour, 2020 | Texto normativo que acompanha R01; selecionar seções pertinentes ao público do Prumo. | [Página oficial e download](https://www.who.int/publications/i/item/9789240015128). |

R01 e o guia da OMS representam a mesma diretriz: não contar como duas evidências independentes. Vigitel e PNS continuam nas funções descritas em [Bases de dados](02-bases-de-dados.md); artigos não substituem a extração dos indicadores populacionais.

## Pontos a revisar no projeto

Estas são pendências de avaliação; esta pesquisa não altera as regras de pontuação.

| Ponto | Revisão proposta |
|---|---|
| Água registrada versus água total | Resolver a diferença entre o formulário e a medida da EFSA antes de usar o percentual da meta. |
| Sono acima de 9 horas | Rever penalização automática e documentar diferenças entre as referências NSF e AASM/SRS. |
| Tela: “quanto menor, melhor” | Considerar contexto de uso e a medida coletada. Não deduzir um limite universal da intervenção R08. |
| Nota de energia | Apresentar como índice próprio de autopercepção, ainda sem validação clínica encontrada nesta pesquisa. |
| Sugestões com duração exata | Separar parâmetros de uma ação escolhida pelo produto de doses comprovadas por estudos. Um artigo não necessariamente valida “20 minutos hoje”. |

## Como transformar a seleção em uma base recuperável

Proposta para o protótipo, ainda sem decisão de ferramenta ou infraestrutura:

1. Ler integralmente as fontes prioritárias e conferir versão, correções, população e licença de cada documento.
2. Criar fichas revisadas em português, com afirmações curtas, limitações e localização exata na fonte. Preservar o trecho original quando a licença permitir.
3. Dividir por assunto e recomendação, mantendo a ressalva junto da afirmação. Não separar uma meta da população e da unidade a que se aplica.
4. Recuperar apenas conteúdo aprovado e compatível com o tema e a população. Na ausência de evidência pertinente, o sistema deve reconhecer a limitação.
5. Enviar ao LLM os resultados calculados e as fichas recuperadas. Conferir que a resposta mantém os números, cita as fontes utilizadas e oferece no máximo duas sugestões.

**Metadados mínimos por ficha:** identificador; tema; título; autores; ano; DOI/URL; idioma; tipo de estudo; população; medida/desfecho; afirmação; limites; seção/página; licença; versão da fonte; data e responsável pela revisão; status (`candidato`, `revisado`, `aprovado`, `descartado`).

Acesso gratuito não comprova autorização de redistribuição. Neste levantamento foram registrados links e sínteses próprias; PDFs não foram copiados para o repositório.

## Próxima rodada de curadoria

- [ ] Começar pelo Guia Alimentar, R01, R02 e R04; depois avaliar R03 e as fontes complementares.
- [ ] Conferir integralmente a referência NSF já citada no projeto e sua relação com R02.
- [ ] Buscar atualizações de sono e hidratação, além de estudos brasileiros em adultos.
- [ ] Conferir correções, retratações, conflitos de interesse e termos de reutilização por documento.
- [ ] Preparar um pequeno conjunto de fichas e perguntas de avaliação antes de ampliar o acervo.
- [ ] Testar perguntas como “2 litros só de água?”, “9 horas de sono é ruim?”, “2 horas de celular é o limite?” e “essa nota diagnostica meu cansaço?”.

O resultado esperado dessa etapa é uma base pequena e rastreável de conhecimento aprovado, mantendo o cálculo determinístico e os dados pessoais fora do acervo público.
