"use client";

import Link from "next/link";
import { useState } from "react";
import type { Posicao } from "@/base/cabala";
import { CabalaCruz } from "@/components/CabalaCruz";
import { Carregando, SemDados } from "@/components/Estados";
import { GuiaCabala } from "@/components/GuiaCabala";
import { TextoPonto } from "@/components/TextoPonto";
import { PRECO } from "@/lib/config";
import { falasDoGuia } from "@/lib/guia";
import { cabalaDe, primeiroNome } from "@/lib/pedido";
import { useSessao } from "@/lib/sessao";

export default function Amostra() {
  const { sessao, pronto } = useSessao();
  const [destaque, setDestaque] = useState<Posicao | "todos" | null>(null);
  if (!pronto) return <Carregando />;
  const cabala = sessao ? cabalaDe(sessao.nascimento) : null;
  if (!sessao || !cabala) return <SemDados />;

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Sua amostra grátis</span>
          <h1>{primeiroNome(sessao.nome)}, esta é a sua cabala</h1>
          <p className="texto-suave">
            Nascimento em {sessao.nascimento}. Cada ponto do seu mapa recebeu um dos 16 Odùs. Aqui você lê o seu Norte,
            que fala da sua personalidade e do seu destino.
          </p>
        </div>

        <div className="amostra">
          <div style={{ display: "grid", gap: 20 }}>
            <div className="cartao" style={{ padding: "30px 16px" }}>
              <CabalaCruz cabala={cabala} destaque={destaque} />
            </div>
            <div className="cartao cartao--ouro resumo-compra">
              <span className="eyebrow">Consulta completa</span>
              <h2 style={{ fontSize: "1.9rem" }}>Os búzios cruzados com o seu mapa</h2>
              <p className="texto-suave">
                Os cinco pontos da sua cabala explicados e cinco quedas dos búzios (amor, dinheiro, trabalho, saúde e
                espiritualidade), cada uma interpretada para você. Tudo em PDF no final.
              </p>
              <div className="linha-valor">
                <span className="texto-suave">Consulta completa</span>
                <strong>{PRECO.texto}</strong>
              </div>
              <Link href="/checkout" className="botao botao--ouro botao--largo">
                Quero a consulta completa
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <TextoPonto posicao="norte" odu={cabala.norte} />
            <TextoPonto posicao="leste" odu={cabala.leste} bloqueado />
            <TextoPonto posicao="oeste" odu={cabala.oeste} bloqueado />
            <TextoPonto posicao="sul" odu={cabala.sul} bloqueado />
            <TextoPonto posicao="centro" odu={cabala.centro} bloqueado />
          </div>
        </div>
      </div>
      <GuiaCabala falas={falasDoGuia(sessao.nome, cabala, "amostra")} onDestaque={setDestaque} />
    </section>
  );
}
