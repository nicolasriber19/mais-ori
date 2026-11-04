"use client";

import type { ReactNode } from "react";
import type { AREAS } from "@/base/areas";
import type { Cabala } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import type { Jogada } from "@/lib/useJogada";
import type { Sessao } from "@/lib/sessao";
import { JogoBuzios } from "./JogoBuzios";
import { Leitura } from "./Leitura";

// A peneira com os búzios e, ao lado, a leitura da jogada. `depois` aparece quando a leitura termina.
export function MesaJogada({
  j,
  sessao,
  cabala,
  area,
  ordem,
  depois,
}: {
  j: Jogada;
  sessao: Sessao;
  cabala: Cabala;
  area: (typeof AREAS)[number];
  ordem: number;
  depois: ReactNode;
}) {
  const { etapa, jogada, numJogada, texto, modo } = j;
  const odu = jogada ? getOdu(jogada.odu) : null;
  const jogou = etapa !== "pronto" && jogada !== null;

  return (
    <div className="jogo">
      <div className="cartao jogo__mesa">
        <JogoBuzios abertos={etapa === "pronto" || !jogada ? null : jogada.abertos} agitando={etapa === "agitando"} jogada={numJogada} />
        {jogou && odu && etapa !== "agitando" ? (
          <div className="resultado-queda" aria-live="polite">
            <span className="resultado-queda__num">
              {jogada.odu} {jogada.odu === 1 ? "búzio aberto" : "búzios abertos"} · Odù {odu.numero}
            </span>
            <h2>{odu.nome}</h2>
            <p>“{odu.sentencas[0]}”</p>
          </div>
        ) : (
          <p className="texto-suave" style={{ maxWidth: 340 }}>
            {etapa === "agitando"
              ? "Embaralhando os búzios…"
              : `Concentre-se no que você quer saber sobre ${area.titulo.toLowerCase()}. Quando sentir que é a hora, jogue os búzios.`}
          </p>
        )}
        {etapa === "pronto" && (
          <button className="botao botao--ouro" onClick={() => j.jogar(sessao, cabala, area, ordem)}>
            Embaralhar e jogar
          </button>
        )}
      </div>

      <div className="cartao leitura" aria-live="polite" aria-busy={etapa === "lendo"}>
        <div className="leitura__area">
          <span className="eyebrow">
            {ordem}ª jogada · {area.curto}
          </span>
          {modo === "demo" && jogou && <span className="texto-suave" style={{ fontSize: "0.8rem" }}>modo demonstração</span>}
        </div>

        {!jogou && (
          <p className="texto-suave">
            A interpretação aparece aqui logo depois da jogada: o que o Odù traz sobre {area.titulo.toLowerCase()}, como
            isso se mostra na sua cabala, os cuidados e o conselho para você.
          </p>
        )}
        {etapa === "agitando" && <p className="texto-suave">Os búzios estão sendo embaralhados.</p>}
        {etapa === "lendo" && !texto && (
          <span className="carregando" aria-label="Escrevendo a interpretação">
            <i />
            <i />
            <i />
          </span>
        )}
        {texto && <Leitura texto={texto} escrevendo={etapa === "lendo"} />}

        {modo === "demo" && etapa === "lida" && (
          <p className="aviso-demo">
            <span aria-hidden="true">✦</span>
            <span>Modo demonstração: este texto foi montado direto da base, sem IA. Com a chave da API ligada, a leitura é escrita para a pessoa.</span>
          </p>
        )}

        {etapa === "falhou" && jogada && (
          <div style={{ display: "grid", gap: 12 }}>
            <p className="campo__erro">Não foi possível escrever esta interpretação agora.</p>
            <div>
              <button className="botao botao--contorno" onClick={() => j.ler(sessao, cabala, jogada, area, ordem)}>
                Tentar de novo
              </button>
            </div>
          </div>
        )}

        {etapa === "lida" && <div className="acoes">{depois}</div>}
      </div>
    </div>
  );
}
