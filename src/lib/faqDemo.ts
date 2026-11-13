// Modo demonstração da FAQ: sem IA, acha na base a resposta que mais combina com a pergunta.
// Usado no site estático (GitHub Pages) e na rota quando não há chave da API.

import { BASE_FAQ } from "@/base/faq";

const PALAVRAS_VAZIAS = new Set(
  "a o as os um uma de da do das dos e em no na nos nas para por com sem que qual quais como eu meu minha voce se me mim isso esse essa este esta ser sao tem ter ja mais muito pode posso preciso".split(" "),
);

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9+ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const palavras = (texto: string) => normalizar(texto).split(" ").filter((p) => p.length > 2 && !PALAVRAS_VAZIAS.has(p));

export const SUGESTOES = ["O que vem na amostra grátis?", "Quanto custa a consulta completa?", "O que é a Cabala dos Odùs?"];

export function respostaDemo(pergunta: string): string {
  const texto = ` ${normalizar(pergunta)} `;
  const daPergunta = new Set(palavras(pergunta));
  let melhor = { pontos: 0, r: "" };
  for (const d of BASE_FAQ) {
    let pontos = 0;
    for (const termo of d.termos) if (texto.includes(` ${termo} `) || (termo.length > 4 && texto.includes(termo))) pontos += termo.includes(" ") ? 3 : 2;
    for (const p of palavras(d.p)) if (daPergunta.has(p)) pontos += 1;
    if (pontos > melhor.pontos) melhor = { pontos, r: d.r };
  }
  if (melhor.pontos >= 2) return melhor.r;
  return `Ainda não tenho essa resposta por aqui. Você pode perguntar, por exemplo: "${SUGESTOES.join('", "')}"`;
}
