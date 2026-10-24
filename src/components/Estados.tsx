import Link from "next/link";

export function Carregando() {
  return (
    <section className="pagina">
      <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "40vh" }}>
        <span className="carregando" aria-label="Carregando">
          <i />
          <i />
          <i />
        </span>
      </div>
    </section>
  );
}

export function SemDados() {
  return (
    <section className="pagina">
      <div className="container pagina__cabeca">
        <span className="eyebrow">+Ori</span>
        <h1>Vamos começar pelo seu mapa</h1>
        <p className="texto-suave">Para montar a sua cabala, precisamos do seu nome e da sua data de nascimento.</p>
        <div>
          <Link href="/#amostra" className="botao botao--ouro">
            Fazer minha amostra grátis
          </Link>
        </div>
      </div>
    </section>
  );
}
