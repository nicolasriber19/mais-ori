import Link from "next/link";

export function Marca() {
  return (
    <Link href="/" className="marca" aria-label="+Ori, página inicial">
      <span className="marca__mais">+</span>
      <span className="marca__ori">Ori</span>
    </Link>
  );
}

export function Topo() {
  return (
    <header className="topo">
      <div className="container topo__linha">
        <Marca />
        <nav className="topo__nav" aria-label="Principal">
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/#cabala">A cabala</Link>
          <Link href="/#areas">As cinco quedas</Link>
          <Link href="/#perguntas">Perguntas</Link>
        </nav>
        <Link href="/#amostra" className="botao botao--contorno botao--pequeno">
          Amostra grátis
        </Link>
      </div>
    </header>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape__linha">
        <Marca />
        <div style={{ display: "grid", gap: 8 }}>
          <p>
            O +Ori é uma ferramenta de acolhimento e orientação espiritual baseada no jogo de búzios e na Cabala dos
            Odùs. Não substitui acompanhamento médico, psicológico, jurídico ou financeiro.
          </p>
          <p>© {new Date().getFullYear()} +Ori. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
