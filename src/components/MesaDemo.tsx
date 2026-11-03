"use client";

import { useEffect, useState } from "react";
import { lancar } from "@/lib/lance";
import { JogoBuzios } from "./JogoBuzios";

// A peneira da consulta na página inicial: mostra os búzios caindo, sem leitura.
// Os búzios só entram depois de montar no navegador, porque as posições são sorteadas.
export function MesaDemo() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  const [abertos, setAbertos] = useState<number[] | null>(null);
  const [agitando, setAgitando] = useState(false);
  const [jogada, setJogada] = useState(0);

  async function jogar() {
    const lance = lancar();
    setAbertos(lance.abertos);
    setJogada((n) => n + 1);
    setAgitando(true);
    await new Promise((r) => setTimeout(r, 1600));
    setAgitando(false);
  }

  const caiu = abertos !== null && !agitando;
  const total = abertos?.length ?? 0;

  return (
    <div className="cartao jogo__mesa">
      {montado ? (
        <JogoBuzios abertos={abertos} agitando={agitando} jogada={jogada} />
      ) : (
        <div className="peneira" role="img" aria-label="Os 16 búzios na peneira" />
      )}
      <p className="texto-suave" aria-live="polite" style={{ maxWidth: 340 }}>
        {agitando
          ? "Embaralhando os búzios…"
          : caiu
            ? `${total} ${total === 1 ? "búzio caiu aberto" : "búzios caíram abertos"}. Na consulta, cada jogada revela um Odù e a leitura para você.`
            : "Os 16 búzios na peneira, prontos para a jogada."}
      </p>
      <button className="botao botao--contorno" onClick={jogar} disabled={agitando}>
        {caiu ? "Jogar de novo" : "Embaralhar e jogar"}
      </button>
    </div>
  );
}
