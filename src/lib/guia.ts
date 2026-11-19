// Roteiro da guia virtual: falas prontas, montadas da base, que explicam a cabala ponto a ponto.
// Na amostra ela conta só o Norte, aponta a jogada grátis e convida para a consulta; na consulta completa explica os quatro pontos.

import type { Cabala, Posicao } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import { primeiroNome } from "./pedido";

export interface Fala {
  destaque: Posicao | "todos" | null;
  texto: string;
  /** Áudio na voz dela, em public/guia/voz (gerado sem o nome da pessoa). */
  voz: string;
  acao?: "checkout";
}

/** Texto como deve ser lido pela voz: sem o acento de Odù (a voz pronuncia errado) e sem símbolos. */
export function textoFalado(texto: string): string {
  return texto
    .replace(/Odù/g, "Odu")
    .replace("(Ori = Cabeça)", "(Ori, a cabeça)")
    .replace("Vida Profissional/Trabalho", "vida profissional e trabalho");
}

// O Norte não diz qual Odù caiu (a mãe pediu assim); o nome aparece na cruz ao lado.
const ABERTURA_POSICAO: Record<Posicao, (odu: string, n: number) => string> = {
  norte: () => "No ponto Norte (Ori = Cabeça), fala sobre o seu jeito de ser e o seu destino.",
  leste: (odu, n) => `No Leste, o lado que te favorece, está ${odu}, o Odù ${n}.`,
  oeste: (odu, n) => `Agora o Oeste, o lado que pede atenção: ${odu}, o Odù ${n}.`,
  sul: (odu, n) => `No Sul, que são os seus passos e o caminho que você já fez, está ${odu}, o Odù ${n}.`,
};

/** As duas primeiras frases do resumo, para a fala caber no balão (o Norte vai inteiro). */
function resumoCurto(texto: string): string {
  return texto.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
}

function falaDoPonto(cabala: Cabala, p: Posicao): Fala {
  const odu = getOdu(cabala[p]);
  const resumo = p === "norte" ? odu.cabala[p].resumo : resumoCurto(odu.cabala[p].resumo);
  return {
    destaque: p,
    texto: `${ABERTURA_POSICAO[p](odu.nome, odu.numero)} ${resumo}`,
    voz: `${p}-${odu.numero}.mp3`,
  };
}

/** Com nome vazio, sai a versão usada para gravar o áudio ("Oi!"). */
export function falasDoGuia(nome: string, cabala: Cabala, modo: "amostra" | "completo"): Fala[] {
  const quem = primeiroNome(nome);
  const oi = quem ? `Oi, ${quem}!` : "Oi!";

  if (modo === "amostra") {
    return [
      {
        destaque: "todos",
        texto: `${oi} Que bom te ver aqui. Montei o seu mapa individual dos Odùs através da sua data de nascimento. São 4 pontos, e cada um deles recebeu um dos 16 Odùs. Vem comigo que eu te conto.`,
        voz: "amostra-abertura.mp3",
      },
      falaDoPonto(cabala, "norte"),
      {
        destaque: "todos",
        texto: "Agora é o momento de começar a sua primeira jogada: Vida Profissional/Trabalho. Cada jogada revela uma orientação, trazendo reflexões sobre os caminhos da sua vida e aquilo que merece a sua atenção neste momento. Na consulta completa, vamos aprofundar essa jornada explorando também sobre dinheiro, amor, saúde e a espiritualidade. Estarei com você nessa caminhada. Vamos?",
        voz: "amostra-convite.mp3",
        acao: "checkout",
      },
    ];
  }

  return [
    {
      destaque: "todos",
      texto: `${oi} Aqui está o seu mapa completo. São quatro pontos, cada um com um Odù, e eu vou te mostrar um por um.`,
      voz: "completo-abertura.mp3",
    },
    falaDoPonto(cabala, "norte"),
    falaDoPonto(cabala, "leste"),
    falaDoPonto(cabala, "oeste"),
    falaDoPonto(cabala, "sul"),
    {
      destaque: "todos",
      texto: "Esse é o seu mapa. Logo abaixo estão as cinco jogadas de búzios, cada uma lida para você. Se quiser, salve tudo em PDF para reler quando precisar.",
      voz: "completo-fim.mp3",
    },
  ];
}
