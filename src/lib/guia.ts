// Roteiro da guia virtual: falas prontas, montadas da base, que explicam a cabala ponto a ponto.
// Na amostra ela conta só o Norte e convida para a consulta; na consulta completa explica os cinco pontos.

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

/** Texto como deve ser lido pela voz: sem o acento de Odù, que a voz pronuncia errado. */
export function textoFalado(texto: string): string {
  return texto.replace(/Odù/g, "Odu");
}

const ABERTURA_POSICAO: Record<Posicao, (odu: string, n: number) => string> = {
  norte: (odu, n) => `No seu Norte caiu ${odu}, o Odù ${n}. O Norte fala do seu jeito de ser e do seu destino.`,
  leste: (odu, n) => `No Leste, o lado que te favorece, está ${odu}, o Odù ${n}.`,
  oeste: (odu, n) => `Agora o Oeste, o lado que pede atenção: ${odu}, o Odù ${n}.`,
  sul: (odu, n) => `No Sul, que são os seus passos e o caminho que você já fez, está ${odu}, o Odù ${n}.`,
  centro: (odu, n) => `E no Centro, a sua essência, está ${odu}, o Odù ${n}.`,
};

/** As duas primeiras frases do resumo, para a fala caber no balão. */
function resumoCurto(texto: string): string {
  return texto.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
}

function falaDoPonto(cabala: Cabala, p: Posicao): Fala {
  const odu = getOdu(cabala[p]);
  return {
    destaque: p,
    texto: `${ABERTURA_POSICAO[p](odu.nome, odu.numero)} ${resumoCurto(odu.cabala[p].resumo)}`,
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
        texto: `${oi} Que bom te ver aqui. Montei o seu mapa com a sua data de nascimento: são cinco pontos, e cada um recebeu um dos 16 Odùs. Vem comigo que eu te conto o seu Norte.`,
        voz: "amostra-abertura.mp3",
      },
      falaDoPonto(cabala, "norte"),
      {
        destaque: "todos",
        texto: "Os outros quatro pontos do seu mapa estão esperando por você na consulta completa. Lá eu te explico cada um e jogo os búzios para o amor, o dinheiro, o trabalho, a saúde e a espiritualidade.",
        voz: "amostra-convite.mp3",
        acao: "checkout",
      },
    ];
  }

  return [
    {
      destaque: "todos",
      texto: `${oi} Aqui está o seu mapa completo. São cinco pontos, cada um com um Odù, e eu vou te mostrar um por um.`,
      voz: "completo-abertura.mp3",
    },
    falaDoPonto(cabala, "norte"),
    falaDoPonto(cabala, "leste"),
    falaDoPonto(cabala, "oeste"),
    falaDoPonto(cabala, "sul"),
    falaDoPonto(cabala, "centro"),
    {
      destaque: "todos",
      texto: "Esse é o seu mapa. Logo abaixo estão as cinco quedas dos búzios, cada uma lida para você. Se quiser, salve tudo em PDF para reler quando precisar.",
      voz: "completo-fim.mp3",
    },
  ];
}
