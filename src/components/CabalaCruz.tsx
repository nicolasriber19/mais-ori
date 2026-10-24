import { POSICOES, SENTIDO_POSICAO, type Cabala, type Posicao } from "@/base/cabala";
import { getOdu } from "@/base/odus";

const LETRA: Record<Posicao, string> = { norte: "N", sul: "S", leste: "L", oeste: "O", centro: "C" };
const CURTO: Record<Posicao, string> = {
  norte: "Destino e Ori",
  sul: "Caminhos e passos",
  leste: "O que te favorece",
  oeste: "O que pede atenção",
  centro: "Essência",
};

export function CabalaCruz({ cabala }: { cabala?: Cabala }) {
  return (
    <ul className="cruz limpa" aria-label={cabala ? "Sua Cabala dos Odùs" : "As cinco posições da cabala"}>
      {POSICOES.map((p) => (
        <li key={p} className={`cruz__pos cruz__pos--${p}`}>
          <span className={`bolinha cor-${p}`}>{cabala ? cabala[p] : LETRA[p]}</span>
          <span className="cruz__titulo">{SENTIDO_POSICAO[p].titulo}</span>
          {cabala ? (
            <span className="cruz__nome">{getOdu(cabala[p]).nome}</span>
          ) : (
            <span className="cruz__tema">{CURTO[p]}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
