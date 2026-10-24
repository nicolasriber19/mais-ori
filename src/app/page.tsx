import Link from "next/link";
import { AREAS } from "@/base/areas";
import { POSICOES, SENTIDO_POSICAO } from "@/base/cabala";
import { CabalaCruz } from "@/components/CabalaCruz";
import { FormAmostra } from "@/components/FormAmostra";
import { PRECO } from "@/lib/config";

const PASSOS = [
  { titulo: "Seu mapa", texto: "Seu nome e sua data de nascimento montam a sua Cabala dos Odùs: cinco pontos que mostram quem você é." },
  { titulo: "O jogo", texto: "Você embaralha os búzios e eles caem cinco vezes, uma para cada área da sua vida." },
  { titulo: "O cruzamento", texto: "Cada queda é lida junto com a sua cabala, pelo método de quem joga búzios há mais de 30 anos." },
  { titulo: "Sua consulta", texto: "As cinco interpretações ficam reunidas na tela e você salva tudo em PDF para reler quando quiser." },
];

const PERGUNTAS = [
  {
    p: "Preciso saber a hora em que nasci?",
    r: "Não. A Cabala dos Odùs usa apenas o dia, o mês e o ano do seu nascimento.",
  },
  {
    p: "As respostas são iguais para todo mundo?",
    r: "Não. Duas pessoas podem tirar o mesmo Odù, mas a leitura muda conforme a cabala de cada uma. O Odù que caiu traz a mensagem; a sua cabala mostra como essa mensagem se aplica a você.",
  },
  {
    p: "O +Ori substitui um jogo presencial?",
    r: "Não. O +Ori é uma ferramenta de acolhimento e reflexão. Questões que pedem ebó, obrigação ou acompanhamento devem ser conduzidas por quem tem fundamento.",
  },
  {
    p: "Como recebo a minha consulta?",
    r: "Na hora, na tela, logo depois de cada queda. No final você salva as cinco interpretações em um PDF.",
  },
  {
    p: "O que acontece com os meus dados?",
    r: "Seu nome e sua data de nascimento ficam guardados só no seu aparelho e são usados para calcular a cabala e escrever a sua leitura.",
  },
];

export default function Inicio() {
  return (
    <>
      <section className="heroi">
        <div className="container heroi__grade">
          <div className="heroi__texto">
            <span className="eyebrow">Búzios e Cabala dos Odùs</span>
            <h1>
              Uma consulta que <em>conhece você</em> antes de falar com você
            </h1>
            <p className="heroi__lead">
              O +Ori cruza a queda dos búzios com o seu mapa de Odùs para trazer acolhimento, clareza e
              direcionamento espiritual, sem respostas robotizadas ou iguais para todos.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="#amostra" className="botao botao--ouro">
                Fazer minha amostra grátis
              </Link>
              <Link href="#como-funciona" className="botao botao--contorno">
                Como funciona
              </Link>
            </div>
            <div className="heroi__selos">
              <span>Mais de 30 anos de búzios</span>
              <span>5 áreas da vida</span>
              <span>Consulta em PDF</span>
            </div>
          </div>
          <FormAmostra />
        </div>
      </section>

      <section className="secao" id="como-funciona">
        <div className="container">
          <div className="secao__cabeca">
            <span className="eyebrow">Como funciona</span>
            <h2>Do seu nascimento à queda do momento</h2>
            <p className="texto-suave">
              A cabala é o mapa de quem você é. A queda é a orientação para agora. O +Ori une as duas.
            </p>
          </div>
          <div className="passos">
            {PASSOS.map((p, i) => (
              <article key={p.titulo} className="cartao passo">
                <span className="passo__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="secao" id="cabala">
        <div className="container cabala-explica">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="eyebrow">A Cabala dos Odùs</span>
            <h2>Cinco pontos, um mapa só seu</h2>
            <p className="texto-suave">
              A partir da sua data de nascimento, cada posição recebe um dos 16 Odùs. Juntas, elas mostram seu jeito de
              ser, o caminho que você percorreu, o que te favorece, o que pede cuidado e onde está o seu equilíbrio.
            </p>
            <ul className="limpa legenda">
              {POSICOES.map((p) => (
                <li key={p} className="legenda__item">
                  <span className={`bolinha cor-${p}`}>{SENTIDO_POSICAO[p].titulo[0]}</span>
                  <div>
                    <strong>
                      {SENTIDO_POSICAO[p].titulo} · {SENTIDO_POSICAO[p].tema}
                    </strong>
                    <span>{SENTIDO_POSICAO[p].descricao}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cartao" style={{ padding: "34px 18px" }}>
            <CabalaCruz />
          </div>
        </div>
      </section>

      <section className="secao" id="areas">
        <div className="container">
          <div className="secao__cabeca">
            <span className="eyebrow">A consulta completa</span>
            <h2>Cinco quedas, cinco áreas da vida</h2>
            <p className="texto-suave">
              Em cada queda, o Odù que cai traz a mensagem central, os alertas e os caminhos. A sua cabala mostra como
              isso se aplica a você.
            </p>
          </div>
          <div className="areas">
            {AREAS.map((a, i) => (
              <article key={a.id} className="cartao area">
                <span className="area__num">{i + 1}ª queda</span>
                <h3>{a.titulo}</h3>
                <p>{a.foco.charAt(0).toUpperCase() + a.foco.slice(1)}.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container autora">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="eyebrow">Por trás do +Ori</span>
            <h2>Três décadas de búzios, agora ao seu alcance</h2>
            <p className="texto-suave">
              O +Ori nasce da experiência de uma jogadora de búzios com mais de 30 anos de prática. A ferramenta foi
              pensada para preservar o jeito dela de ler cada Odù: o que observa, como interpreta os sinais e como
              transforma o significado em orientação.
            </p>
            <ul className="limpa bases">
              <li>Os 16 Odùs e seus significados tradicionais</li>
              <li>A Cabala dos Odùs, calculada pela sua data de nascimento</li>
              <li>Regras de cruzamento entre a queda e a cabala</li>
              <li>A base autoral: a forma dela de falar com o consulente</li>
            </ul>
          </div>
          <figure className="cartao citacao">
            <span className="ornamento">✦</span>
            <blockquote>
              “Esse Odu, Okaran, ele traz acontecimentos rápidos. São mudanças rápidas, iminentes, que vão acontecer.
              (…) Falaria para pensar, agir com cautela para não se envolver em conflitos, em acidentes, em brigas.”
            </blockquote>
            <figcaption>Como ela orienta o consulente quando cai Okanran Meji</figcaption>
          </figure>
        </div>
      </section>

      <section className="secao" id="preco">
        <div className="container">
          <div className="cartao cartao--ouro preco">
            <span className="eyebrow">Consulta completa</span>
            <div className="preco__valor">
              <small>R$ </small>
              {PRECO.valor}
              <small>{PRECO.centavos}</small>
            </div>
            <ul className="limpa preco__itens">
              <li>O seu mapa completo da Cabala dos Odùs, com os cinco pontos explicados</li>
              <li>Cinco quedas dos búzios: amor, dinheiro, trabalho, saúde e espiritualidade</li>
              <li>Uma interpretação individual para cada queda, cruzada com a sua cabala</li>
              <li>Tudo em PDF para salvar e reler depois</li>
            </ul>
            <Link href="#amostra" className="botao botao--ouro botao--largo">
              Começar pela amostra grátis
            </Link>
          </div>
        </div>
      </section>

      <section className="secao" id="perguntas">
        <div className="container">
          <div className="secao__cabeca secao__cabeca--centro">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Antes de jogar</h2>
          </div>
          <div className="faq">
            {PERGUNTAS.map((q) => (
              <details key={q.p}>
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
