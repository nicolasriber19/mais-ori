"use client";

import { useMemo } from "react";
import { Buzio } from "./Buzio";

interface Lugar {
  left: number;
  top: number;
  rot: number;
}

// Espalha os 16 búzios dentro da peneira sem que fiquem um em cima do outro.
function espalhar(): Lugar[] {
  const lugares: Lugar[] = [];
  for (let i = 0; i < 16; i++) {
    let melhor: Lugar = { left: 44, top: 42, rot: 0 };
    for (let tentativa = 0; tentativa < 60; tentativa++) {
      const r = 8 + Math.sqrt(Math.random()) * 28;
      const ang = Math.random() * Math.PI * 2;
      const cand = { left: 50 + r * Math.cos(ang) - 6, top: 50 + r * Math.sin(ang) - 8, rot: Math.random() * 360 };
      melhor = cand;
      if (lugares.every((l) => Math.hypot(l.left - cand.left, l.top - cand.top) > 11)) break;
    }
    lugares.push(melhor);
  }
  return lugares;
}

function monte(): Lugar[] {
  return Array.from({ length: 16 }, (_, i) => ({
    left: 37 + (i % 4) * 4 + Math.random() * 2,
    top: 33 + Math.floor(i / 4) * 5 + Math.random() * 2,
    rot: Math.random() * 360,
  }));
}

export function JogoBuzios({ abertos, agitando, jogada }: { abertos: number[] | null; agitando: boolean; jogada: number }) {
  const caidos = useMemo(() => espalhar(), [jogada]);
  const juntos = useMemo(() => monte(), [jogada]);
  const espalhados = abertos !== null && !agitando;
  const totalAbertos = abertos?.length ?? 0;

  return (
    <div
      className={`peneira${agitando ? " peneira--agitando" : ""}`}
      role="img"
      aria-label={espalhados ? `${totalAbertos} búzios caíram abertos` : "Os 16 búzios na peneira"}
    >
      {Array.from({ length: 16 }, (_, i) => {
        const lugar = espalhados ? caidos[i] : juntos[i];
        const aberto = espalhados ? abertos.includes(i) : i % 3 === 0;
        return (
          <Buzio
            key={i}
            aberto={aberto}
            className="buzio"
            style={{ left: `${lugar.left}%`, top: `${lugar.top}%`, transform: `rotate(${lugar.rot}deg)` }}
          />
        );
      })}
    </div>
  );
}
