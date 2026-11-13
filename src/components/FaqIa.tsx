"use client";

import { useEffect, useRef, useState } from "react";
import { API_FAQ, ESTATICO, MARCA } from "@/lib/config";
import { textoAosPoucos } from "@/lib/demo";
import { respostaDemo, SUGESTOES } from "@/lib/faqDemo";

type Turno = { de: "pessoa" | "ori"; texto: string };

const MAX_PERGUNTA = 400;
const ERRO = "Não consegui responder agora. Tente de novo daqui a pouco, ou veja as perguntas logo abaixo.";

/** Troca as marcas que a rota manda no fim do texto por um aviso para a pessoa. */
function limpar(texto: string): string {
  if (texto.includes("[[erro]]")) return texto.replace(/\s*\[\[erro\]\]/g, "").trim() || ERRO;
  return texto.replace(/\s*\[\[cortada\]\]/g, "…");
}

// Caixa de perguntas da seção "Dúvidas frequentes": a assistente responde com base nas informações do +Ori.
export function FaqIa() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [pergunta, setPergunta] = useState("");
  const [respondendo, setRespondendo] = useState(false);
  const local = ESTATICO && !API_FAQ;
  const [modo, setModo] = useState<"ia" | "demo" | null>(local ? "demo" : null);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (local) return;
    fetch(`${API_FAQ}/api/duvidas`)
      .then((r) => r.json() as Promise<{ modo?: string }>)
      .then((r) => setModo(r.modo === "ia" ? "ia" : "demo"))
      .catch(() => setModo("demo"));
  }, [local]);

  const escrever = (texto: string) =>
    setTurnos((t) => [...t.slice(0, -1), { de: "ori", texto }]);

  async function perguntar(texto: string) {
    const p = texto.trim().slice(0, MAX_PERGUNTA);
    if (p.length < 2 || respondendo) return;
    const historico = turnos;
    setTurnos([...historico, { de: "pessoa", texto: p }, { de: "ori", texto: "" }]);
    setPergunta("");
    setRespondendo(true);
    requestAnimationFrame(() => fim.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));

    let acumulado = "";
    try {
      let corpo: ReadableStream<Uint8Array>;
      if (local) {
        corpo = textoAosPoucos(respostaDemo(p));
      } else {
        const resp = await fetch(`${API_FAQ}/api/duvidas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pergunta: p, historico }),
        });
        if (!resp.ok || !resp.body) {
          const erro = (await resp.json().catch(() => null)) as { erro?: string } | null;
          escrever(erro?.erro ?? ERRO);
          return;
        }
        setModo(resp.headers.get("X-Modo") === "demo" ? "demo" : "ia");
        corpo = resp.body;
      }
      const leitor = corpo.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await leitor.read();
        if (done) break;
        acumulado += decoder.decode(value, { stream: true });
        escrever(limpar(acumulado));
      }
      if (!acumulado.trim()) escrever(ERRO);
    } catch {
      escrever(ERRO);
    } finally {
      setRespondendo(false);
    }
  }

  return (
    <div className="cartao cartao--ouro faq-ia">
      <div className="faq-ia__topo">
        <img src={MARCA.emblema} alt="" width={40} height={30} />
        <div>
          <h3>Pergunte ao +Ori</h3>
          <p>Tire suas dúvidas sobre a consulta, a cabala e as jogadas.</p>
        </div>
      </div>

      {turnos.length > 0 && (
        <div className="faq-ia__conversa" aria-live="polite">
          {turnos.map((t, i) => (
            <p key={i} className={`faq-ia__msg faq-ia__msg--${t.de}`}>
              {t.texto || (
                <span className="carregando" aria-label="Escrevendo a resposta">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </p>
          ))}
          <div ref={fim} />
        </div>
      )}

      {turnos.length === 0 && (
        <div className="faq-ia__sugestoes">
          {SUGESTOES.map((s) => (
            <button key={s} type="button" className="faq-ia__sugestao" onClick={() => perguntar(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="faq-ia__form"
        onSubmit={(e) => {
          e.preventDefault();
          perguntar(pergunta);
        }}
      >
        <label htmlFor="faq-pergunta" className="sr-only">
          Sua dúvida
        </label>
        <input
          id="faq-pergunta"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          maxLength={MAX_PERGUNTA}
          placeholder="Escreva sua dúvida"
          autoComplete="off"
        />
        <button type="submit" className="botao botao--ouro" disabled={respondendo || pergunta.trim().length < 2}>
          Perguntar
        </button>
      </form>

      <p className="faq-ia__nota">
        {modo === "demo" && "Modo demonstração: as respostas vêm das perguntas frequentes do site, sem IA."}
        {modo === "ia" && "Respostas geradas por IA (Gemini, do Google) a partir das informações do +Ori. Não escreva dados pessoais."}
        {modo === null && "Não escreva dados pessoais nas perguntas."}
      </p>
    </div>
  );
}
