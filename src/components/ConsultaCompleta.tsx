"use client";

import { useState } from "react";
import { AREAS } from "@/base/areas";
import { POSICOES, type Cabala, type Posicao } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import { falasDoGuia } from "@/lib/guia";
import { primeiroNome } from "@/lib/pedido";
import type { Sessao } from "@/lib/sessao";
import { BaixarPdf } from "./BaixarPdf";
import { CabalaCruz } from "./CabalaCruz";
import { GuiaCabala } from "./GuiaCabala";
import { Leitura } from "./Leitura";
import { TextoPonto } from "./TextoPonto";

export function ConsultaCompleta({ sessao, cabala, novaConsulta }: { sessao: Sessao; cabala: Cabala; novaConsulta: () => void }) {
  const [destaque, setDestaque] = useState<Posicao | "todos" | null>(null);
  const quedas = sessao.quedas ?? [];
  const algumaDemo = quedas.some((q) => q.modo === "demo");

  return (
    <section className="pagina">
      <div className="container consulta-final">
        <div className="pagina__cabeca" style={{ marginBottom: 8 }}>
          <span className="eyebrow">Consulta completa</span>
          <h1>{primeiroNome(sessao.nome)}, aqui está a sua consulta</h1>
          <p className="texto-suave">
            O seu mapa da Cabala dos Odùs e as cinco quedas dos búzios, cada uma lida para você. Salve em PDF para reler
            quando quiser.
          </p>
          <div className="acoes">
            <BaixarPdf sessao={sessao} cabala={cabala} />
            <button className="botao botao--contorno" onClick={novaConsulta}>
              Fazer outra consulta
            </button>
          </div>
          {algumaDemo && (
            <p className="aviso-demo">
              <span aria-hidden="true">✦</span>
              <span>Consulta feita em modo demonstração: os textos foram montados da base, sem IA.</span>
            </p>
          )}
        </div>

        <div className="secao__cabeca" style={{ marginBottom: 0, marginTop: 24 }}>
          <span className="eyebrow">Seu mapa</span>
          <h2>A sua Cabala dos Odùs</h2>
        </div>
        <div className="amostra">
          <div className="cartao cruz-fixa" style={{ padding: "30px 16px", alignSelf: "start" }}>
            <CabalaCruz cabala={cabala} destaque={destaque} />
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {POSICOES.map((p) => (
              <TextoPonto key={p} posicao={p} odu={cabala[p]} />
            ))}
          </div>
        </div>

        <div className="secao__cabeca" style={{ marginBottom: 0, marginTop: 40 }}>
          <span className="eyebrow">As cinco quedas</span>
          <h2>O que os búzios disseram</h2>
        </div>
        {quedas.map((q, i) => {
          const odu = getOdu(q.odu);
          const area = AREAS.find((a) => a.id === q.area)!;
          return (
            <article key={q.area} className="cartao leitura">
              <div className="leitura__area">
                <span className="eyebrow">
                  {i + 1}ª queda · {area.titulo}
                </span>
              </div>
              <div className="resultado-queda" style={{ justifyItems: "start" }}>
                <span className="resultado-queda__num">Odù {odu.numero}</span>
                <h2>{odu.nome}</h2>
                <p>“{odu.sentencas[0]}”</p>
              </div>
              <Leitura texto={q.texto} />
            </article>
          );
        })}
      </div>
      <GuiaCabala falas={falasDoGuia(sessao.nome, cabala, "completo")} onDestaque={setDestaque} />
    </section>
  );
}
