import Link from "next/link";
import { MARCA } from "@/lib/config";

export function Marca() {
  return (
    <Link href="/" className="marca" aria-label="+Ori, página inicial">
      <img src={MARCA.emblema} alt="" width={53} height={40} className="marca__emblema" />
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
          <Link href="/#cabala">Seu mapa de Odùs</Link>
          <Link href="/#areas">As cinco jogadas</Link>
          <Link href="/#perguntas">Dúvidas frequentes</Link>
        </nav>
        <Link href="/#amostra" className="botao botao--contorno botao--pequeno">
          Experimente grátis
        </Link>
      </div>
    </header>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape__linha">
        <Link href="/" aria-label="+Ori, página inicial">
          <img src={MARCA.logo} alt="+Ori" width={110} height={132} className="rodape__logo" />
        </Link>
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
