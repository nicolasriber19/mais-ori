"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Posicao } from "@/base/cabala";
import { BASE_PATH, GUIA_MIDIA } from "@/lib/config";
import type { Fala } from "@/lib/guia";

const CHAVE_MINIMIZADA = "maisori:guia-minimizada";
const CHAVE_VOZ = "maisori:guia-voz";

function lerPreferencia(chave: string): boolean | null {
  try {
    const v = localStorage.getItem(chave);
    if (v !== null) return v === "1";
  } catch {
    // sem armazenamento: fica o padrão
  }
  return null;
}

function gravarPreferencia(chave: string, v: boolean) {
  try {
    localStorage.setItem(chave, v ? "1" : "0");
  } catch {
    // tudo bem: só não lembra na próxima visita
  }
}

/** Sem preferência gravada, começa minimizada no celular. */
const lerMinimizada = () => lerPreferencia(CHAVE_MINIMIZADA) ?? window.innerWidth < 720;
const gravarMinimizada = (v: boolean) => gravarPreferencia(CHAVE_MINIMIZADA, v);

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
    <span className={`guia__avatar guia__avatar--${tamanho}${falando ? " guia__avatar--falando" : ""}`} aria-hidden="true">
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
  const [comVoz, setComVoz] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [i, setI] = useState(0);
  const [letras, setLetras] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMinimizada(lerMinimizada());
    setComVoz(lerPreferencia(CHAVE_VOZ) ?? false);
    setPronta(true);
    return () => audioRef.current?.pause();
  }, []);

  const fala = falas[Math.min(i, falas.length - 1)];
  const { texto, destaque, voz } = fala;
  const digitando = letras < texto.length;

  useEffect(() => {
    onDestaque(minimizada ? null : destaque);
  }, [destaque, minimizada, onDestaque]);

  // Depende só do texto e do áudio: a página pode recriar a lista de falas sem reiniciar a fala.
  useEffect(() => {
    if (minimizada) return;
    setLetras(0);

    if (comVoz) {
      // Com a voz dela, o texto aparece no ritmo do áudio.
      const a = audioRef.current ?? (audioRef.current = new Audio());
      a.src = `${BASE_PATH}/guia/voz/${voz}`;
      let quadro = 0;
      const acompanhar = () => {
        if (a.duration) setLetras(Math.min(texto.length, Math.ceil((texto.length * a.currentTime) / a.duration)));
        quadro = requestAnimationFrame(acompanhar);
      };
      const terminar = () => {
        cancelAnimationFrame(quadro);
        setLetras(texto.length);
        setTocando(false);
      };
      a.addEventListener("ended", terminar);
      a.addEventListener("error", terminar);
      setTocando(true);
      a.play()
        .then(() => (quadro = requestAnimationFrame(acompanhar)))
        .catch(() => {
          // o navegador só deixa tocar som depois de um clique: volta para o texto
          terminar();
          setComVoz(false);
        });
      return () => {
        cancelAnimationFrame(quadro);
        a.removeEventListener("ended", terminar);
        a.removeEventListener("error", terminar);
        a.pause();
        setTocando(false);
      };
    }

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
  }, [texto, voz, minimizada, comVoz]);

  function minimizar(v: boolean) {
    if (!v && i === falas.length - 1) setI(0);
    setMinimizada(v);
    gravarMinimizada(v);
  }

  function alternarVoz() {
    const v = !comVoz;
    setComVoz(v);
    gravarPreferencia(CHAVE_VOZ, v);
  }

  function pular() {
    audioRef.current?.pause();
    setTocando(false);
    setLetras(texto.length);
  }

  if (!pronta) return null;

  if (minimizada) {
    return (
      <div className="guia guia--minimizada">
        <button
          className="guia__bolha"
          onClick={() => {
            minimizar(false);
            if (!comVoz) alternarVoz();
          }}
          aria-label="Abrir a guia que explica a sua cabala"
        >
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
        <Avatar falando={comVoz ? tocando : digitando} tamanho="grande" />
        <div className="guia__conteudo">
          <div className="guia__topo">
            <span className="guia__nome">Sua guia no +Ori</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className={`guia__som${comVoz ? " guia__som--ligado" : ""}`}
                onClick={alternarVoz}
                aria-pressed={comVoz}
                aria-label={comVoz ? "Desligar a voz" : "Ouvir com a voz dela"}
                title={comVoz ? "Desligar a voz" : "Ouvir com a voz dela"}
              >
                {comVoz ? "" : "Ouvir"}
              </button>
              <button className="guia__fechar" onClick={() => minimizar(true)} aria-label="Minimizar a guia">
                ×
              </button>
            </div>
          </div>
          <p className="guia__texto" aria-live="polite" onClick={pular}>
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
                onClick={() => (digitando ? pular() : ultima ? minimizar(true) : setI(i + 1))}
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
