"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Posicao } from "@/base/cabala";
import { GUIA_MIDIA } from "@/lib/config";
import type { Fala } from "@/lib/guia";

const CHAVE_MINIMIZADA = "maisori:guia-minimizada";

function lerMinimizada(): boolean {
  try {
    const v = localStorage.getItem(CHAVE_MINIMIZADA);
    if (v !== null) return v === "1";
  } catch {
    // sem armazenamento: decide pelo tamanho da tela
  }
  return window.innerWidth < 720;
}

function gravarMinimizada(v: boolean) {
  try {
    localStorage.setItem(CHAVE_MINIMIZADA, v ? "1" : "0");
  } catch {
    // tudo bem: só não lembra na próxima visita
  }
}

function Avatar({ falando, tamanho }: { falando: boolean; tamanho: "grande" | "bolha" }) {
  const [semVideo, setSemVideo] = useState(false);
  const [semImagem, setSemImagem] = useState(false);
  const [movimentoReduzido, setMovimentoReduzido] = useState(false);
  const falandoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMovimentoReduzido(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = falandoRef.current;
    if (!v) return;
    if (falando) v.play().catch(() => {});
    else v.pause();
  }, [falando]);

  const usarVideo = !semVideo && !movimentoReduzido;
  return (
    <span className={`guia__avatar guia__avatar--${tamanho}`} aria-hidden="true">
      {semImagem && semVideo ? (
        <span className="guia__avatar-reserva">+</span>
      ) : usarVideo ? (
        <>
          <video src={GUIA_MIDIA.parada} poster={GUIA_MIDIA.imagem} autoPlay muted loop playsInline onError={() => setSemVideo(true)} />
          {GUIA_MIDIA.falando && (
            <video
              ref={falandoRef}
              src={GUIA_MIDIA.falando}
              muted
              loop
              playsInline
              className={falando ? "guia__video-falando guia__video-falando--ativo" : "guia__video-falando"}
            />
          )}
        </>
      ) : (
        <img src={GUIA_MIDIA.imagem} alt="" onError={() => setSemImagem(true)} />
      )}
    </span>
  );
}

export function GuiaCabala({ falas, onDestaque }: { falas: Fala[]; onDestaque: (d: Posicao | "todos" | null) => void }) {
  const [pronta, setPronta] = useState(false);
  const [minimizada, setMinimizada] = useState(true);
  const [i, setI] = useState(0);
  const [letras, setLetras] = useState(0);

  useEffect(() => {
    setMinimizada(lerMinimizada());
    setPronta(true);
  }, []);

  const fala = falas[Math.min(i, falas.length - 1)];
  const { texto, destaque } = fala;
  const digitando = letras < texto.length;

  useEffect(() => {
    onDestaque(minimizada ? null : destaque);
  }, [destaque, minimizada, onDestaque]);

  // Depende só do texto: a página pode recriar a lista de falas sem reiniciar a digitação.
  useEffect(() => {
    if (minimizada) return;
    setLetras(0);
    const id = setInterval(() => {
      setLetras((n) => {
        if (n >= texto.length) {
          clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 22);
    return () => clearInterval(id);
  }, [texto, minimizada]);

  function minimizar(v: boolean) {
    if (!v && i === falas.length - 1) setI(0);
    setMinimizada(v);
    gravarMinimizada(v);
  }

  if (!pronta) return null;

  if (minimizada) {
    return (
      <div className="guia guia--minimizada">
        <button className="guia__bolha" onClick={() => minimizar(false)} aria-label="Abrir a guia que explica a sua cabala">
          <Avatar falando={false} tamanho="bolha" />
          <span className="guia__bolha-dica">Quer que eu explique o seu mapa?</span>
        </button>
      </div>
    );
  }

  const ultima = i === falas.length - 1;
  return (
    <aside className="guia" aria-label="Guia da sua cabala">
      <div className="guia__cartao">
        <Avatar falando={digitando} tamanho="grande" />
        <div className="guia__conteudo">
          <div className="guia__topo">
            <span className="guia__nome">Sua guia no +Ori</span>
            <button className="guia__fechar" onClick={() => minimizar(true)} aria-label="Minimizar a guia">
              ×
            </button>
          </div>
          <p className="guia__texto" aria-live="polite" onClick={() => setLetras(texto.length)}>
            {texto.slice(0, letras)}
            {digitando && <span className="guia__cursor" aria-hidden="true" />}
          </p>
          {fala.acao === "checkout" && !digitando && (
            <Link href="/checkout" className="botao botao--ouro botao--pequeno">
              Quero a consulta completa
            </Link>
          )}
          <div className="guia__controles">
            <span className="guia__contador">
              {i + 1} de {falas.length}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {i > 0 && (
                <button className="botao botao--contorno botao--pequeno" onClick={() => setI(i - 1)}>
                  Voltar
                </button>
              )}
              <button
                className="botao botao--contorno botao--pequeno"
                onClick={() => (digitando ? setLetras(texto.length) : ultima ? minimizar(true) : setI(i + 1))}
              >
                {digitando ? "Pular" : ultima ? "Fechar" : "Próximo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
