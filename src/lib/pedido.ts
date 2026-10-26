// Monta o pedido de uma jogada: os dados do consulente, a cabala dele e o Odù que caiu,
// já recortados da base para a área consultada.

import { AREAS } from "@/base/areas";
import { AUTORAL } from "@/base/autoral";
import { calcularCabala, parseData, POSICOES, SENTIDO_POSICAO, type Cabala } from "@/base/cabala";
import { getOdu, type Area } from "@/base/odus";

export interface Queda {
  area: Area;
  odu: number;
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? "";
}

export function cabalaDe(nascimento: string): Cabala | null {
  const d = parseData(nascimento);
  return d ? calcularCabala(d.dia, d.mes, d.ano).cabala : null;
}

export function montarPedido(nome: string, cabala: Cabala, queda: Queda, ordem: number): string {
  const area = AREAS.find((a) => a.id === queda.area)!;
  const odu = getOdu(queda.odu);

  const linhasCabala = POSICOES.map((p) => {
    const o = getOdu(cabala[p]);
    const s = SENTIDO_POSICAO[p];
    return `- ${s.titulo} (${s.tema}): Odù ${o.numero}, ${o.nome}. ${o.cabala[p].resumo} [${o.cabala[p].palavras.join(", ")}]`;
  }).join("\n");

  const fala = AUTORAL[odu.numero];
  const autoral = fala
    ? `\nInterpretação autoral dela para ${odu.nome} (prioridade máxima, é assim que ela lê este Odù):\n"${fala.fala}"\nElementos dessa leitura:\n${fala.elementos.map((e) => `- ${e}`).join("\n")}\n`
    : "";

  return `Consulente: ${primeiroNome(nome)}
Jogada ${ordem} de 5: ${area.titulo} (${area.foco}).

ODÙ QUE CAIU: ${odu.numero}, ${odu.nome}
Sentença: ${odu.sentencas.map((s) => `"${s}"`).join(" / ")}
Sentido geral: ${odu.queda.geral}
${odu.observacao ? `Observação: ${odu.observacao}\n` : ""}Para ${area.titulo.toLowerCase()}:
${odu.queda[queda.area].map((t) => `- ${t}`).join("\n")}
Alertas do Odù:
${odu.queda.alertas.map((t) => `- ${t}`).join("\n")}
${autoral}
CABALA DO CONSULENTE (lente individualizadora):
${linhasCabala}

Escreva a interpretação desta jogada para ${primeiroNome(nome)}.`;
}
