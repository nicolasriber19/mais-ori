"use client";

import { useState } from "react";
import type { Cabala } from "@/base/cabala";
import { BASE_PATH } from "@/lib/config";
import type { Sessao } from "@/lib/sessao";

export function BaixarPdf({ sessao, cabala }: { sessao: Sessao; cabala: Cabala }) {
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState(false);

  async function baixar() {
    setGerando(true);
    setErro(false);
    try {
      // react-pdf é pesado: só carrega quando a pessoa pede o arquivo.
      const [{ pdf }, { ConsultaPdf, registrarFontes }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/ConsultaPdf"),
      ]);
      registrarFontes(window.location.origin + BASE_PATH);
      const blob = await pdf(<ConsultaPdf sessao={sessao} cabala={cabala} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nome = sessao.nome.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      a.href = url;
      a.download = `consulta-mais-ori-${nome}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setGerando(false);
    }
  }

  return (
    <>
      <button className="botao botao--ouro" onClick={baixar} disabled={gerando}>
        {gerando ? "Preparando o PDF…" : "Salvar em PDF"}
      </button>
      {erro && <span className="campo__erro">Não consegui gerar o PDF. Tente de novo.</span>}
    </>
  );
}
