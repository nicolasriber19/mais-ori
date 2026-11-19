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

  // As jogadas podem começar fora de ordem (a de trabalho é a grátis da amostra): a consulta segue pelas que faltam.
  const feitas = sessao.quedas ?? [];
  const pendentes = AREAS.filter((a) => !feitas.some((q) => q.area === a.id));
  if (pendentes.length === 0 && j.etapa !== "lida") {
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

  const lida = j.etapa === "lida";
  const area = lida ? AREAS.find((a) => a.id === feitas[feitas.length - 1].area)! : pendentes[0];
  const ordem = lida ? feitas.length : feitas.length + 1;
  const proxima = lida ? pendentes[0] : pendentes[1];
  const ultima = !proxima;

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Consulta de {primeiroNome(sessao.nome)}</span>
          <h1>{area.titulo}</h1>
        </div>

        <ol className="limpa progresso" aria-label="Jogadas da consulta">
          {AREAS.map((a, i) => {
            const atual = a.id === area.id;
            const estado = atual ? "atual" : feitas.some((q) => q.area === a.id) ? "feito" : "";
            return (
              <li key={a.id} className={`progresso__item${estado ? ` progresso__item--${estado}` : ""}`} aria-current={atual ? "step" : undefined}>
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
          ordem={ordem}
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
