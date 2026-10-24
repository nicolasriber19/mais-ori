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
    tema: "Destino, Ori e personalidade",
    descricao: "A direção maior da vida, o jeito de ser e o que está ligado ao propósito individual.",
  },
  sul: {
    titulo: "Sul",
    tema: "Os pés, os passos e o caminho",
    descricao: "O caminho já percorrido e a estrutura que precisa ser organizada, construída ou fortalecida.",
  },
  leste: {
    titulo: "Leste",
    tema: "Lado direito: o que te favorece",
    descricao: "A força a favor: o que protege, impulsiona e abre caminhos.",
  },
  oeste: {
    titulo: "Oeste",
    tema: "Lado esquerdo: o que pede atenção",
    descricao: "Herança, cobranças e tendências que podem atrapalhar quando não são cuidadas.",
  },
  centro: {
    titulo: "Centro",
    tema: "Essência, cargo e momento de equilíbrio",
    descricao: "O ponto que reúne a energia principal da leitura e mostra onde está o equilíbrio.",
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
