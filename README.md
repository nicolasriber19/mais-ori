# +Ori

Consulta de búzios com a Cabala dos Odùs: a pessoa informa nome e data de nascimento, o site calcula a cabala (Norte, Sul, Leste, Oeste e Centro), ela joga os búzios cinco vezes (amor, dinheiro, trabalho, saúde e espiritualidade) e cada queda é interpretada pela IA cruzando o Odù que caiu com a cabala, as regras de cruzamento e a voz autoral da mãe. No final, a consulta pode ser salva em PDF.

Primeiro bloco, conforme o pedido de 23/10/2026. Pagamento ainda simulado.

## Rodar no computador

```bash
npm install
npm run dev
```

Abre em http://localhost:3020.

Sem chave da API, o site roda em **modo demonstração**: os textos são montados direto da base, sem IA, só para testar o fluxo e o visual.

## Ligar a IA

1. Crie uma chave em https://console.anthropic.com (precisa de crédito na conta).
2. Crie o arquivo `.env.local` nesta pasta (use o `.env.example` como modelo) com `ANTHROPIC_API_KEY=...`.
3. Reinicie o `npm run dev`.

Modelo: `claude-opus-5-5`, com esforço médio e fallback automático do servidor se o modelo recusar. Estimativa (ainda não medida): cerca de US$ 0,20 por consulta completa (5 quedas).

## Onde fica cada coisa

| O quê | Arquivo |
|---|---|
| Cálculo da cabala (regra do PDF) | `src/base/cabala.ts` (testes em `cabala.test.ts`, rode `npm test`) |
| Os 16 Odùs: textos da cabala, temas de cada queda, interpretação autoral | `src/base/odus.ts` |
| Regras de cruzamento, voz dela e formato da resposta | `src/base/regras.ts` |
| As cinco áreas | `src/base/areas.ts` |
| Preço | `src/lib/config.ts` |
| Chamada da IA | `src/app/api/interpretar/route.ts` |
| PDF | `src/lib/ConsultaPdf.tsx` |

Os textos de `odus.ts` foram resumidos com palavras próprias a partir dos PDFs que ela mandou (que trazem a marca @biblioteca dos guardiões). A camada autoral, que é o diferencial, ainda só existe para Okanran Meji.

## Publicar

Pensado para a Vercel: importar o projeto, colocar `ANTHROPIC_API_KEY` nas variáveis de ambiente e publicar. Antes de abrir ao público, falta ligar o pagamento de verdade; hoje a rota da IA só tem um limite simples de 40 leituras por hora por IP.

## Pendências para a mãe

- Interpretação autoral dos Odùs 2 a 16 (hoje só Okanran tem a fala dela).
- Textos do Sul de Owónrin (11) e de Ejilaxebora (12): no PDF vieram com o quadro de "Momento de equilíbrio".
- Textos do Norte e do Leste de Ejiologbon (13) e de Iká (14): no PDF estão cortados.
- Confirmar Leste = lado direito (positivo) e Oeste = lado esquerdo (negativo). As fichas dos Odùs e o caso de teste usam assim; a página "Mapa de interpretação" do PDF desenha invertido.
- Confirmar o Centro: o PDF calcula um quinto ponto (Centro), além dos quatro citados nas mensagens.
- Quando a soma das unidades dá 0 (ex.: 10/10/2000), o site usa 16. Confirmar a regra.
- Preço da consulta (hoje R$ 47,00, provisório), nome e foto dela na seção "Por trás do +Ori".
- Pagamento (Pix/cartão) e a segunda etapa: banhos, parcerias, oferendas e proteções.
