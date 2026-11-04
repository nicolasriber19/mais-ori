"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { JogoBuzios } from "./JogoBuzios";

// A peneira na página inicial, só para mostrar o jogo: a jogada de verdade vem depois do nome e da data.
// Os búzios só entram depois de montar no navegador, porque as posições são sorteadas.
export function MesaVitrine() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  return (
    <div className="cartao jogo__mesa">
      {montado ? (
        <JogoBuzios abertos={null} agitando={false} jogada={0} />
      ) : (
        <div className="peneira" role="img" aria-label="Os 16 búzios na peneira" />
      )}
      <p className="texto-suave" style={{ maxWidth: 340 }}>
        Os 16 búzios na peneira, esperando a sua jogada.
      </p>
      <Link href="#amostra" className="botao botao--ouro">
        Jogar meus búzios
      </Link>
    </div>
  );
}
