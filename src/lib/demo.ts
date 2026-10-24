// Leitura de demonstração, montada só com a base, para o site funcionar sem chave da API.
// Não é o produto: serve para testar o fluxo e o visual.

import { AREAS } from "@/base/areas";
import type { Cabala } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import type { Queda } from "./pedido";

function juntar(itens: string[]): string {
  if (itens.length <= 1) return itens[0] ?? "";
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

export function leituraDemo(cabala: Cabala, queda: Queda): string {
  const odu = getOdu(queda.odu);
  const area = AREAS.find((a) => a.id === queda.area)!;
  const norte = getOdu(cabala.norte).cabala.norte;
  const leste = getOdu(cabala.leste).cabala.leste;
  const oeste = getOdu(cabala.oeste).cabala.oeste;
  const centro = getOdu(cabala.centro).cabala.centro;

  return `## Mensagem do Odù
${odu.nome} caiu para ${area.titulo.toLowerCase()}. ${odu.queda.geral} Como diz a sentença: "${odu.sentencas[0]}" Para esta área, ele aponta: ${juntar(odu.queda[queda.area].slice(0, 3))}.

## Como isso se mostra em você
Seu jeito de ser é marcado por ${juntar(norte.palavras)}. A seu favor estão ${juntar(leste.palavras)}, e o que pede atenção é ${juntar(oeste.palavras)}.

## Cuidados
Atenção a ${juntar(odu.queda.alertas.slice(0, 3))}.

## Conselho
${centro.resumo}`;
}

/** Entrega o texto em pedaços, como a IA faria. Usado pela rota e pela versão estática. */
export function textoAosPoucos(texto: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const partes = texto.match(/\S+\s*/g) ?? [texto];
  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < partes.length; i += 3) {
        controller.enqueue(encoder.encode(partes.slice(i, i + 3).join("")));
        await new Promise((r) => setTimeout(r, 35));
      }
      controller.close();
    },
  });
}
