"use client";

// Os dados do consulente ficam só no navegador dele (localStorage).

import { useCallback, useEffect, useState } from "react";
import type { Area } from "@/base/odus";

export interface QuedaFeita {
  area: Area;
  odu: number;
  abertos: number[]; // quais dos 16 búzios caíram abertos (índices)
  texto: string;
  modo: "ia" | "demo";
}

export interface Sessao {
  nome: string;
  nascimento: string; // DD/MM/AAAA
  pago?: boolean;
  quedas?: QuedaFeita[];
  iniciadaEm?: string;
}

const CHAVE = "maisori:sessao:v1";

export function lerSessao(): Sessao | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    return bruto ? (JSON.parse(bruto) as Sessao) : null;
  } catch {
    return null;
  }
}

export function gravarSessao(s: Sessao | null) {
  try {
    if (s) localStorage.setItem(CHAVE, JSON.stringify(s));
    else localStorage.removeItem(CHAVE);
  } catch {
    // navegador sem armazenamento: a consulta segue só na memória
  }
}

export function useSessao() {
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setSessao(lerSessao());
    setPronto(true);
  }, []);

  const atualizar = useCallback((s: Sessao | null) => {
    setSessao(s);
    gravarSessao(s);
  }, []);

  return { sessao, atualizar, pronto };
}
