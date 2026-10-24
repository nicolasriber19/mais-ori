const MARCAS = /\n?\[\[(recusa|erro|cortada)\]\]/g;

export function problemaDa(texto: string): "recusa" | "erro" | "cortada" | null {
  const m = texto.match(/\[\[(recusa|erro|cortada)\]\]/);
  return (m?.[1] as "recusa" | "erro" | "cortada" | undefined) ?? null;
}

export function partirSecoes(texto: string): { titulo: string; corpo: string }[] {
  return texto
    .replace(MARCAS, "")
    .split(/^##\s+/m)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((parte, i) => {
      if (i === 0 && !texto.trimStart().startsWith("##")) return { titulo: "", corpo: parte };
      const [titulo, ...resto] = parte.split("\n");
      return { titulo: titulo.trim(), corpo: resto.join("\n").trim() };
    });
}

export function Leitura({ texto, escrevendo }: { texto: string; escrevendo?: boolean }) {
  const secoes = partirSecoes(texto);
  return (
    <>
      {secoes.map((s, i) => (
        <div className="leitura__secao" key={i}>
          {s.titulo && <h4>{s.titulo}</h4>}
          {s.corpo.split(/\n{2,}/).map((p, j, todos) => (
            <p key={j} className={escrevendo && i === secoes.length - 1 && j === todos.length - 1 ? "cursor" : undefined}>
              {p}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
