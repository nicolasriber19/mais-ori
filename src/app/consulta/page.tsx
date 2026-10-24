"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AREAS } from "@/base/areas";
import { getOdu } from "@/base/odus";
import { ConsultaCompleta } from "@/components/ConsultaCompleta";
import { Carregando, SemDados } from "@/components/Estados";
import { JogoBuzios } from "@/components/JogoBuzios";
import { Leitura, problemaDa } from "@/components/Leitura";
import { ESTATICO } from "@/lib/config";
import { leituraDemo, textoAosPoucos } from "@/lib/demo";
import { cabalaDe, primeiroNome } from "@/lib/pedido";
import { useSessao, type Sessao } from "@/lib/sessao";

type Etapa = "pronto" | "agitando" | "lendo" | "lida" | "falhou";

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

function sortear(max: number): number {
  const v = new Uint32Array(1);
  crypto.getRandomValues(v);
  return v[0] % max;
}

/** Sorteia o Odù (1 a 16, todos com a mesma chance) e quais búzios caem abertos. */
function lancar(): { odu: number; abertos: number[] } {
  const odu = sortear(16) + 1;
  const ordem = Array.from({ length: 16 }, (_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = sortear(i + 1);
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return { odu, abertos: ordem.slice(0, odu) };
}

export default function Consulta() {
  const router = useRouter();
  const { sessao, atualizar, pronto } = useSessao();
  const [etapa, setEtapa] = useState<Etapa>("pronto");
  const [jogada, setJogada] = useState<{ odu: number; abertos: number[] } | null>(null);
  const [numJogada, setNumJogada] = useState(0);
  const [texto, setTexto] = useState("");
  const [modo, setModo] = useState<"ia" | "demo">("ia");

  useEffect(() => {
    if (pronto && sessao && !sessao.pago) router.replace("/checkout");
  }, [pronto, sessao, router]);

  if (!pronto) return <Carregando />;
  const cabala = sessao ? cabalaDe(sessao.nascimento) : null;
  if (!sessao || !cabala) return <SemDados />;
  if (!sessao.pago) return <Carregando />;

  const feitas = sessao.quedas ?? [];
  if (feitas.length >= AREAS.length && etapa !== "lida") {
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

  const indiceAtual = etapa === "lida" ? feitas.length - 1 : feitas.length;
  const area = AREAS[indiceAtual];
  const odu = jogada ? getOdu(jogada.odu) : null;

  async function ler(base: Sessao, lance: { odu: number; abertos: number[] }) {
    setTexto("");
    setEtapa("lendo");
    let acumulado = "";
    try {
      let corpo: ReadableStream<Uint8Array>;
      let modoResp: "ia" | "demo";
      if (ESTATICO) {
        corpo = textoAosPoucos(leituraDemo(cabala!, { area: area.id, odu: lance.odu }));
        modoResp = "demo";
      } else {
        const resp = await fetch("/api/interpretar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: base.nome,
            nascimento: base.nascimento,
            area: area.id,
            odu: lance.odu,
            ordem: indiceAtual + 1,
          }),
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

  async function jogar() {
    if (!sessao) return;
    const lance = lancar();
    setJogada(lance);
    setNumJogada((n) => n + 1);
    setTexto("");
    setEtapa("agitando");
    await esperar(1600);
    setEtapa("lendo");
    await esperar(1000);
    await ler(sessao, lance);
  }

  const jogou = etapa !== "pronto" && jogada !== null;
  const ultima = feitas.length >= AREAS.length;

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Consulta de {primeiroNome(sessao.nome)}</span>
          <h1>{area.titulo}</h1>
        </div>

        <ol className="limpa progresso" aria-label="Quedas da consulta">
          {AREAS.map((a, i) => {
            const estado = i < feitas.length && !(etapa === "lida" && i === indiceAtual) ? "feito" : i === indiceAtual ? "atual" : "";
            return (
              <li key={a.id} className={`progresso__item${estado ? ` progresso__item--${estado}` : ""}`} aria-current={i === indiceAtual ? "step" : undefined}>
                <b>{i + 1}</b> {a.curto}
              </li>
            );
          })}
        </ol>

        <div className="jogo">
          <div className="cartao jogo__mesa">
            <JogoBuzios abertos={jogo(etapa, jogada)} agitando={etapa === "agitando"} jogada={numJogada} />
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
              <button className="botao botao--ouro" onClick={jogar}>
                Embaralhar e jogar
              </button>
            )}
          </div>

          <div className="cartao leitura" aria-live="polite" aria-busy={etapa === "lendo"}>
            <div className="leitura__area">
              <span className="eyebrow">
                {indiceAtual + 1}ª queda · {area.curto}
              </span>
              {modo === "demo" && jogou && <span className="texto-suave" style={{ fontSize: "0.8rem" }}>modo demonstração</span>}
            </div>

            {!jogou && (
              <p className="texto-suave">
                A interpretação aparece aqui logo depois da queda: o que o Odù traz sobre {area.titulo.toLowerCase()},
                como isso se mostra na sua cabala, os cuidados e o conselho para você.
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
                  <button className="botao botao--contorno" onClick={() => ler(sessao, jogada)}>
                    Tentar de novo
                  </button>
                </div>
              </div>
            )}

            {etapa === "lida" && (
              <div className="acoes">
                <button
                  className="botao botao--ouro"
                  onClick={() => {
                    setEtapa("pronto");
                    setJogada(null);
                    setTexto("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {ultima ? "Ver minha consulta completa" : `Próxima queda: ${AREAS[indiceAtual + 1].curto}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function jogo(etapa: Etapa, jogada: { abertos: number[] } | null): number[] | null {
  if (etapa === "pronto" || !jogada) return null;
  return jogada.abertos;
}
