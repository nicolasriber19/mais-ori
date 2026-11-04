"use client";

// Uma jogada de búzios: embaralha, sorteia, escreve a leitura e guarda na sessão.
// Usada na amostra (1ª jogada, grátis) e na consulta completa (as outras).

import { useState } from "react";
import type { AREAS } from "@/base/areas";
import type { Cabala } from "@/base/cabala";
import { problemaDa } from "@/components/Leitura";
import { ESTATICO } from "./config";
import { leituraDemo, textoAosPoucos } from "./demo";
import { lancar } from "./lance";
import type { Sessao } from "./sessao";

export type Etapa = "pronto" | "agitando" | "lendo" | "lida" | "falhou";
export type Lance = { odu: number; abertos: number[] };
type AreaInfo = (typeof AREAS)[number];

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useJogada(atualizar: (s: Sessao) => void) {
  const [etapa, setEtapa] = useState<Etapa>("pronto");
  const [jogada, setJogada] = useState<Lance | null>(null);
  const [numJogada, setNumJogada] = useState(0);
  const [texto, setTexto] = useState("");
  const [modo, setModo] = useState<"ia" | "demo">("ia");

  async function ler(base: Sessao, cabala: Cabala, lance: Lance, area: AreaInfo, ordem: number) {
    setTexto("");
    setEtapa("lendo");
    let acumulado = "";
    try {
      let corpo: ReadableStream<Uint8Array>;
      let modoResp: "ia" | "demo";
      if (ESTATICO) {
        corpo = textoAosPoucos(leituraDemo(cabala, { area: area.id, odu: lance.odu }));
        modoResp = "demo";
      } else {
        const resp = await fetch("/api/interpretar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: base.nome, nascimento: base.nascimento, area: area.id, odu: lance.odu, ordem }),
        });
        if (!resp.ok || !resp.body) throw new Error(String(resp.status));
        corpo = resp.body;
        modoResp = resp.headers.get("X-Modo") === "demo" ? "demo" : "ia";
      }
      setModo(modoResp);
      const leitor = corpo.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await leitor.read();
        if (done) break;
        acumulado += decoder.decode(value, { stream: true });
        setTexto(acumulado);
      }
      if (problemaDa(acumulado)) {
        setEtapa("falhou");
        return;
      }
      atualizar({
        ...base,
        quedas: [...(base.quedas ?? []), { area: area.id, odu: lance.odu, abertos: lance.abertos, texto: acumulado, modo: modoResp }],
      });
      setEtapa("lida");
    } catch {
      setEtapa("falhou");
    }
  }

  async function jogar(base: Sessao, cabala: Cabala, area: AreaInfo, ordem: number) {
    const lance = lancar();
    setJogada(lance);
    setNumJogada((n) => n + 1);
    setTexto("");
    setEtapa("agitando");
    await esperar(1600);
    setEtapa("lendo");
    await esperar(1000);
    await ler(base, cabala, lance, area, ordem);
  }

  function reiniciar() {
    setEtapa("pronto");
    setJogada(null);
    setTexto("");
  }

  return { etapa, jogada, numJogada, texto, modo, jogar, ler, reiniciar };
}

export type Jogada = ReturnType<typeof useJogada>;
