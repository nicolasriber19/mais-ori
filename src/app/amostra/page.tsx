"use client";

import Link from "next/link";
import { useState } from "react";
import { AREAS } from "@/base/areas";
import type { Posicao } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import { CabalaCruz } from "@/components/CabalaCruz";
import { Carregando, SemDados } from "@/components/Estados";
import { GuiaCabala } from "@/components/GuiaCabala";
import { JogoBuzios } from "@/components/JogoBuzios";
import { Leitura } from "@/components/Leitura";
import { MesaJogada } from "@/components/MesaJogada";
import { TextoPonto } from "@/components/TextoPonto";
import { PRECO } from "@/lib/config";
import { falasDoGuia } from "@/lib/guia";
import { cabalaDe, primeiroNome } from "@/lib/pedido";
import { useSessao } from "@/lib/sessao";
import { useJogada } from "@/lib/useJogada";

// A amostra grátis: o Norte da cabala e a 1ª jogada (trabalho, como a mãe pediu). A consulta completa continua dela.
const AREA_GRATIS = AREAS.find((a) => a.id === "trabalho")!;

export default function Amostra() {
  const { sessao, atualizar, pronto } = useSessao();
  const j = useJogada(atualizar);
  const [destaque, setDestaque] = useState<Posicao | "todos" | null>(null);
  if (!pronto) return <Carregando />;
  const cabala = sessao ? cabalaDe(sessao.nascimento) : null;
  if (!sessao || !cabala) return <SemDados />;

  const feita = sessao.quedas?.find((q) => q.area === AREA_GRATIS.id);
  const irParaCompleta = (
    <Link href="/checkout" className="botao botao--ouro">
      Quero as outras quatro jogadas
    </Link>
  );

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Sua amostra grátis</span>
          <h1>{primeiroNome(sessao.nome)}, esta é a sua cabala</h1>
          <p className="texto-suave">
            Nascimento em {sessao.nascimento}. Cada ponto do seu mapa recebeu um dos 16 Odùs. Aqui você lê os seus pontos:
            Norte, Sul, Leste e Oeste, que formam a sua personalidade e o seu destino. E inicia a sua primeira jogada,
            para a área profissional.
          </p>
        </div>

        <div className="amostra">
          <div style={{ display: "grid", gap: 20 }}>
            <div className="cartao" style={{ padding: "30px 16px" }}>
              <CabalaCruz cabala={cabala} destaque={destaque} />
            </div>
            <div className="cartao cartao--ouro resumo-compra">
              <span className="eyebrow">Consulta completa</span>
              <h2 style={{ fontSize: "1.9rem" }}>Seu mapa e os caminhos revelados pelos búzios</h2>
              <p className="texto-suave">
                Uma leitura mais profunda da sua jornada. Conheça os quatro pontos da sua cabala e descubra como eles se
                conectam às cinco jogadas: amor, dinheiro, trabalho, saúde e espiritualidade. Cada uma traz mensagens e
                orientações que ajudam você a compreender melhor seu momento e os caminhos que se apresentam.
              </p>
              <p className="texto-suave">
                Você começa pela jogada do profissional/trabalho gratuitamente, e recebe sua leitura completa em PDF para
                consultar sempre que desejar.
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
          </div>
        </div>

        <div className="secao__cabeca" style={{ marginTop: 56, marginBottom: 24 }} id="primeira-jogada">
          <span className="eyebrow">Sua primeira jogada</span>
          <h2>{AREA_GRATIS.titulo}</h2>
          <p className="texto-suave">
            Nesta primeira jogada, os búzios trazem uma orientação sobre sua vida profissional, considerando também a sua
            cabala e os caminhos que ela revela sobre você.
          </p>
          <p className="texto-suave">
            As outras quatro jogadas — amor, dinheiro, saúde e espiritualidade — fazem parte da consulta completa,
            ampliando seu olhar sobre os diferentes caminhos da sua vida.
          </p>
        </div>

        {feita && j.etapa === "pronto" ? (
          <div className="jogo">
            <div className="cartao jogo__mesa">
              <JogoBuzios abertos={feita.abertos} agitando={false} jogada={0} />
              <div className="resultado-queda">
                <span className="resultado-queda__num">
                  {feita.odu} {feita.odu === 1 ? "búzio aberto" : "búzios abertos"} · Odù {getOdu(feita.odu).numero}
                </span>
                <h2>{getOdu(feita.odu).nome}</h2>
                <p>“{getOdu(feita.odu).sentencas[0]}”</p>
              </div>
            </div>
            <article className="cartao leitura">
              <div className="leitura__area">
                <span className="eyebrow">1ª jogada · {AREA_GRATIS.curto}</span>
              </div>
              <Leitura texto={feita.texto} />
              <div className="acoes">{irParaCompleta}</div>
            </article>
          </div>
        ) : (
          <MesaJogada j={j} sessao={sessao} cabala={cabala} area={AREA_GRATIS} ordem={1} depois={irParaCompleta} />
        )}
      </div>
      <GuiaCabala falas={falasDoGuia(sessao.nome, cabala, "amostra")} onDestaque={setDestaque} />
    </section>
  );
}
