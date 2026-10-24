import { SENTIDO_POSICAO, type Posicao } from "@/base/cabala";
import { getOdu } from "@/base/odus";

export function TextoPonto({ posicao, odu, bloqueado }: { posicao: Posicao; odu: number; bloqueado?: boolean }) {
  const o = getOdu(odu);
  const conteudo = (
    <>
      <div className="texto-ponto__topo">
        <span className={`bolinha cor-${posicao}`}>{odu}</span>
        <div>
          <small>
            {SENTIDO_POSICAO[posicao].titulo} · {SENTIDO_POSICAO[posicao].tema}
          </small>
          <h3>{o.nome}</h3>
        </div>
      </div>
      <p>{o.cabala[posicao].resumo}</p>
      <div className="palavras">
        {o.cabala[posicao].palavras.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </>
  );

  if (!bloqueado) return <article className="cartao texto-ponto">{conteudo}</article>;
  return (
    <article className="cartao texto-ponto bloqueado" aria-label={`${SENTIDO_POSICAO[posicao].titulo}: disponível na consulta completa`}>
      <div className="bloqueado__conteudo" aria-hidden="true">
        {conteudo}
      </div>
      <div className="bloqueado__selo">
        <span>
          {SENTIDO_POSICAO[posicao].titulo} · {o.nome}
          <br />
          <small className="texto-suave">Na consulta completa</small>
        </span>
      </div>
    </article>
  );
}
