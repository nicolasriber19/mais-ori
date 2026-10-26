"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseData } from "@/base/cabala";
import { gravarSessao, lerSessao } from "@/lib/sessao";

function mascararData(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

export function FormAmostra() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function seguir(destino: "/amostra" | "/checkout") {
    if (nome.trim().length < 2) return setErro("Escreva seu nome completo.");
    if (!parseData(nascimento)) return setErro("Confira a data de nascimento (dia/mês/ano).");
    const anterior = lerSessao();
    const mesmaPessoa = anterior?.nome === nome.trim() && anterior?.nascimento === nascimento;
    gravarSessao(mesmaPessoa && anterior ? anterior : { nome: nome.trim(), nascimento });
    router.push(destino);
  }

  return (
    <form
      id="amostra"
      className="cartao cartao--ouro amostra-form"
      onSubmit={(e) => {
        e.preventDefault();
        seguir("/amostra");
      }}
      noValidate
    >
      <div style={{ display: "grid", gap: 6 }}>
        <span className="eyebrow">Sua primeira etapa</span>
        <h2>Vamos começar pelo seu Ori?</h2>
        <p className="texto-suave" style={{ fontSize: "0.95rem" }}>
          Conheça seu mapa individual de Odùs e dê o primeiro passo para sua consulta.
        </p>
      </div>
      <div className="campo">
        <label htmlFor="nome">Seu nome completo</label>
        <input
          id="nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setErro(null);
          }}
          placeholder="Digite seu nome completo"
        />
      </div>
      <div className="campo">
        <label htmlFor="nascimento">Sua data de nascimento</label>
        <input
          id="nascimento"
          inputMode="numeric"
          autoComplete="bday"
          value={nascimento}
          onChange={(e) => {
            setNascimento(mascararData(e.target.value));
            setErro(null);
          }}
          placeholder="dd/mm/aaaa"
        />
      </div>
      {erro && (
        <p className="campo__erro" role="alert">
          {erro}
        </p>
      )}
      <button type="submit" className="botao botao--ouro botao--largo">
        Conhecer meu mapa
      </button>
      <div className="amostra-form__ou">ou</div>
      <button type="button" className="botao botao--contorno botao--largo" onClick={() => seguir("/checkout")}>
        Comprar a consulta completa
      </button>
      <p className="amostra-form__nota">Seus dados ficam só neste aparelho e servem para montar a sua leitura.</p>
    </form>
  );
}
