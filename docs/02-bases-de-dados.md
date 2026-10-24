# 2. Bases de dados públicas e reais

O edital exige bases públicas e reais. No Prumo elas cumprem dois papéis:

1. **Metas de referência:** o que é considerado saudável (OMS, Guia Alimentar).
2. **Comparação populacional:** como o usuário está em relação aos adultos brasileiros (Vigitel, PNS).

Com isso o app consegue dizer, por exemplo: *"faltam 40 min para a meta semanal da OMS"* ou *"seu tempo de tela está acima do da maioria dos adultos das capitais"*.

## Bases escolhidas

### Vigitel (Ministério da Saúde)

Inquérito telefônico anual com adultos (18+) das 26 capitais e do Distrito Federal.

- **Indicadores que vamos usar:** atividade física no tempo livre (≥ 150 min/semana de intensidade moderada), inatividade física, tempo de tela no tempo livre, consumo recomendado de frutas e hortaliças, consumo de alimentos ultraprocessados e de refrigerantes.
- **Recortes:** sexo, faixa etária, escolaridade e capital.
- **Uso no app:** comparação "você × média da sua faixa etária e sexo".
- **Fonte:** https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vigitel

### PNS — Pesquisa Nacional de Saúde (IBGE, 2019)

Pesquisa domiciliar de abrangência nacional, que inclui áreas fora das capitais.

- **Indicadores que vamos usar:** atividade física no lazer, comportamento sedentário (tempo de TV e de tela) e consumo alimentar.
- **Uso no app:** complementa o Vigitel com dados nacionais e por região.
- **Fonte:** https://www.pns.icict.fiocruz.br/ e tabelas no SIDRA/IBGE (https://sidra.ibge.gov.br/pesquisa/pns)

### Diretrizes da OMS para atividade física e comportamento sedentário (2020)

- **Adultos de 18 a 64 anos:** de 150 a 300 min/semana de atividade aeróbica moderada, ou de 75 a 150 min de atividade vigorosa, mais fortalecimento muscular em 2 ou mais dias por semana. Reduzir o tempo sedentário.
- **Uso no app:** meta semanal de atividade e cálculo de "quanto falta".
- **Fonte:** https://www.who.int/publications/i/item/9789240015128

### Guia Alimentar para a População Brasileira (Ministério da Saúde, 2ª ed., 2014)

- **Regra de ouro:** preferir alimentos in natura ou minimamente processados e preparações culinárias a alimentos ultraprocessados.
- **Uso no app:** base das perguntas sobre alimentação (frutas e verduras, refeições caseiras, ultraprocessados) e do texto das sugestões.
- **Fonte:** https://www.gov.br/saude/pt-br/assuntos/saude-brasil/publicacoes-para-promocao-a-saude/guia_alimentar_populacao_brasileira_2ed.pdf

### Referências complementares (sono e água)

A OMS **não** publica uma meta diária de sono nem de água para adultos. Para esses dois hábitos usamos:

- **Sono:** National Sleep Foundation (Hirshkowitz et al., *Sleep Health*, 2015), que recomenda **de 7 a 9 horas** para adultos de 18 a 64 anos. A Academia Americana de Medicina do Sono (AASM) recomenda **7 horas ou mais**.
- **Água:** EFSA (Autoridade Europeia para a Segurança dos Alimentos, 2010), com ingestão adequada total de **2,0 L/dia para mulheres e 2,5 L/dia para homens** (inclui a água dos alimentos).

## Pendências para o Checkpoint 2

- [ ] Baixar os microdados ou tabelas do Vigitel mais recente e extrair os indicadores por sexo e faixa etária.
- [ ] Baixar as tabelas da PNS 2019 no SIDRA para os mesmos indicadores.
- [ ] Converter tudo num arquivo `data/referencias.json` versionado no repositório, com a fonte e o ano de cada número.
- [ ] Conferir se o indicador de tempo de tela tem o mesmo critério nas duas pesquisas.
