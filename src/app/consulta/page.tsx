"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AREAS } from "@/base/areas";
import { ConsultaCompleta } from "@/components/ConsultaCompleta";
import { Carregando, SemDados } from "@/components/Estados";
import { MesaJogada } from "@/components/MesaJogada";
import { cabalaDe, primeiroNome } from "@/lib/pedido";
import { useSessao } from "@/lib/sessao";
import { useJogada } from "@/lib/useJogada";

export default function Consulta() {
  const router = useRouter();
  const { sessao, atualizar, pronto } = useSessao();
  const j = useJogada(atualizar);

  useEffect(() => {
    if (pronto && sessao && !sessao.pago) router.replace("/checkout");
  }, [pronto, sessao, router]);

  if (!pronto) return <Carregando />;
  const cabala = sessao ? cabalaDe(sessao.nascimento) : null;
  if (!sessao || !cabala) return <SemDados />;
  if (!sessao.pago) return <Carregando />;

  const feitas = sessao.quedas ?? [];
  if (feitas.length >= AREAS.length && j.etapa !== "lida") {
    return (
      <ConsultaCompleta
        sessao={sessao}
        cabala={cabala}
        novaConsulta={() => {
          atualizar({ nome: sessao.nome, nascimento: sessao.nascimento });
          router.push("/checkout");
        }}
      />
    );
  }

  const indiceAtual = j.etapa === "lida" ? feitas.length - 1 : feitas.length;
  const area = AREAS[indiceAtual];
  const proxima = AREAS[indiceAtual + 1];
  const ultima = feitas.length >= AREAS.length || !proxima;

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Consulta de {primeiroNome(sessao.nome)}</span>
          <h1>{area.titulo}</h1>
        </div>

        <ol className="limpa progresso" aria-label="Jogadas da consulta">
          {AREAS.map((a, i) => {
            const estado = i < feitas.length && !(j.etapa === "lida" && i === indiceAtual) ? "feito" : i === indiceAtual ? "atual" : "";
            return (
              <li key={a.id} className={`progresso__item${estado ? ` progresso__item--${estado}` : ""}`} aria-current={i === indiceAtual ? "step" : undefined}>
                <b>{i + 1}</b> {a.curto}
              </li>
            );
          })}
        </ol>

        <MesaJogada
          j={j}
          sessao={sessao}
          cabala={cabala}
          area={area}
          ordem={indiceAtual + 1}
          depois={
            <button
              className="botao botao--ouro"
              onClick={() => {
                j.reiniciar();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {ultima ? "Ver minha consulta completa" : `Próxima jogada: ${proxima.curto}`}
            </button>
          }
        />
      </div>
    </section>
  );
}
