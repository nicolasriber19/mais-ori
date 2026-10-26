// Cálculo da Cabala dos Odùs, como no material "Cabala dos Odùs — Guia visual de cálculo".
//
// 1. A data DD/MM/AAAA vira quatro pares: DD, MM, os dois primeiros e os dois últimos dígitos do ano.
// 2. Soma-se a coluna da esquerda (dezenas) → Norte; a coluna da direita (unidades) → Sul.
// 3. Norte + Sul → lado esquerdo (negativo) = Oeste.
// 4. Norte + Sul + Oeste → lado direito (positivo) = Leste.
// 5. Norte + Sul + Oeste + Leste → Centro.
// Em todos os passos: passou de 16, somam-se os algarismos.
//
// Leste/Oeste seguem as fichas dos 16 Odùs (Leste = lado direito/positivo, Oeste = lado esquerdo/negativo),
// que é também a convenção do caso de teste combinado (Norte 3, Sul 4, Leste 14, Oeste 7).

export type Posicao = "norte" | "sul" | "leste" | "oeste" | "centro";

export const POSICOES: Posicao[] = ["norte", "sul", "leste", "oeste", "centro"];

export const SENTIDO_POSICAO: Record<Posicao, { titulo: string; tema: string; descricao: string }> = {
  norte: {
    titulo: "Norte",
    tema: "Seu Ori, seu destino e sua essência",
    descricao: "O que revela sua maneira de ser, suas características e a direção que se conecta ao seu propósito de vida.",
  },
  sul: {
    titulo: "Sul",
    tema: "Sua história e os caminhos que construiu",
    descricao:
      "Os passos que você já deu, as experiências que carrega e aquilo que pode precisar de fortalecimento para seguir adiante.",
  },
  leste: {
    titulo: "Leste",
    tema: "Suas forças e oportunidades",
    descricao:
      "Aquilo que pode favorecer sua caminhada, fortalecer suas escolhas e ajudar a reconhecer caminhos que merecem ser aproveitados.",
  },
  oeste: {
    titulo: "Oeste",
    tema: "O que pede atenção e cuidado",
    descricao:
      "Tendências, desafios e questões que merecem ser observados com consciência para que você possa agir com mais equilíbrio.",
  },
  centro: {
    titulo: "Centro",
    tema: "Sua essência e seu ponto de equilíbrio",
    descricao:
      "O ponto que reúne a energia principal da leitura e ajuda a compreender como os diferentes aspectos da sua cabala se relacionam.",
  },
};

export type Cabala = Record<Posicao, number>;

export interface CalculoCabala {
  cabala: Cabala;
  pares: [string, string, string, string];
  somaEsquerda: number;
  somaDireita: number;
}

/** Passou de 16, somam-se os algarismos. Zero (só possível na soma das unidades) vira 16. */
export function reduzir(n: number): number {
  let r = n;
  while (r > 16) r = String(r).split("").reduce((s, d) => s + Number(d), 0);
  return r === 0 ? 16 : r;
}

export function parseData(texto: string): { dia: number; mes: number; ano: number } | null {
  const m = texto.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) ?? texto.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const [dia, mes, ano] = texto.includes("/") ? [m[1], m[2], m[3]] : [m[3], m[2], m[1]];
  const d = Number(dia), mo = Number(mes), a = Number(ano);
  const data = new Date(a, mo - 1, d);
  if (data.getFullYear() !== a || data.getMonth() !== mo - 1 || data.getDate() !== d) return null;
  if (a < 1900 || data > new Date()) return null;
  return { dia: d, mes: mo, ano: a };
}

export function calcularCabala(dia: number, mes: number, ano: number): CalculoCabala {
  const dd = String(dia).padStart(2, "0");
  const mm = String(mes).padStart(2, "0");
  const aaaa = String(ano).padStart(4, "0");
  const pares: [string, string, string, string] = [dd, mm, aaaa.slice(0, 2), aaaa.slice(2)];

  const somaEsquerda = pares.reduce((s, p) => s + Number(p[0]), 0);
  const somaDireita = pares.reduce((s, p) => s + Number(p[1]), 0);

  const norte = reduzir(somaEsquerda);
  const sul = reduzir(somaDireita);
  const oeste = reduzir(norte + sul);
  const leste = reduzir(norte + sul + oeste);
  const centro = reduzir(norte + sul + oeste + leste);

  return { cabala: { norte, sul, leste, oeste, centro }, pares, somaEsquerda, somaDireita };
}
