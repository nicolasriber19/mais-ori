import Link from "next/link";
import { AREAS } from "@/base/areas";
import { POSICOES, SENTIDO_POSICAO } from "@/base/cabala";
import { PERGUNTAS } from "@/base/faq";
import { CabalaCruz } from "@/components/CabalaCruz";
import { FaqIa } from "@/components/FaqIa";
import { FormAmostra } from "@/components/FormAmostra";
import { MesaVitrine } from "@/components/MesaVitrine";
import { LINK_AGENDAMENTO, MARCA, PRECO } from "@/lib/config";

const CAMINHO = [
  { titulo: "Seu mapa de Odùs", texto: "Conheça suas características e tendências." },
  { titulo: "O jogo de búzios", texto: "Encontre orientação para o momento que está vivendo." },
  { titulo: "Acolhimento e clareza", texto: "Uma leitura que considera sua individualidade." },
  { titulo: "Sua consulta registrada", texto: "Guarde sua orientação para consultar depois." },
];

const PASSOS = [
  {
    rotulo: "Seu mapa",
    titulo: "Sua história começa com você",
    texto:
      "Sua data de nascimento revela a sua Cabala dos Odùs: um mapa individual que ajuda a compreender suas características, tendências e caminhos. É o primeiro passo para uma leitura que considera a sua essência.",
  },
  {
    rotulo: "O jogo",
    titulo: "Os búzios falam sobre o seu momento",
    texto:
      "Você participa do jogo e acompanha cinco jogadas de búzios, cada uma trazendo uma orientação para uma área da sua vida. Cada jogada abre espaço para compreender possibilidades, reconhecer alertas e olhar com mais clareza para o momento presente.",
  },
  {
    rotulo: "O cruzamento",
    titulo: "Uma leitura que considera quem você é",
    texto:
      "Cada jogada é interpretada em conjunto com a sua Cabala dos Odùs. É esse cruzamento que conecta o seu mapa pessoal à orientação do momento, seguindo o método e a experiência de quem joga búzios há mais de 30 anos.",
  },
  {
    rotulo: "Sua consulta",
    titulo: "Orientações para guardar e revisitar",
    texto:
      "Ao final, as cinco interpretações ficam reunidas em uma consulta completa, que você pode salvar em PDF e reler sempre que quiser. Um registro para refletir sobre seus caminhos, suas escolhas e as orientações recebidas.",
  },
];

const ESPECIAL = [
  "A sabedoria dos 16 Odùs, respeitando seus significados e ensinamentos.",
  "A sua Cabala individual, calculada a partir da sua data de nascimento, que ajuda a compreender características, tendências e caminhos pessoais.",
  "O encontro entre a sua Cabala e as cinco jogadas do jogo, trazendo orientações conectadas aos diferentes aspectos da sua vida.",
  "Uma base de conhecimento autoral, construída a partir de décadas de experiência, com interpretações que procuram preservar a essência, a sensibilidade e a maneira própria de orientar da sua criadora.",
];

const BENEFICIOS = [
  {
    titulo: "Conheça seu mapa espiritual",
    texto:
      "Compreenda os quatro pontos da sua Cabala dos Odùs e o que eles revelam sobre suas características, tendências e caminhos.",
  },
  {
    titulo: "Cinco jogadas, cinco áreas da vida",
    texto:
      "Amor, dinheiro, trabalho, saúde e espiritualidade: uma oportunidade de olhar com mais atenção para diferentes aspectos da sua caminhada.",
  },
  {
    titulo: "Uma leitura que considera quem você é",
    texto:
      "Cada jogada é interpretada em conexão com a sua Cabala, tornando a orientação mais pessoal e relacionada ao seu próprio caminho.",
  },
  {
    titulo: "Guarde sua leitura com você",
    texto:
      "Receba sua consulta em PDF para reler com calma, refletir sobre as orientações e revisitar esse momento sempre que desejar.",
  },
];

export default function Inicio() {
  return (
    <>
      <section className="heroi">
        <div className="container heroi__grade">
          <div className="heroi__texto">
            <img src={MARCA.logo} alt="+Ori" width={180} height={216} className="heroi__logo" loading="eager" />
            <span className="eyebrow">Búzios e sabedoria ancestral</span>
            <h1>
              Há momentos em que precisamos de <em>clareza</em> para seguir nosso caminho
            </h1>
            <p className="heroi__lead">
              O +Ori une a sabedoria dos búzios ao seu mapa individual de Odùs para oferecer orientação espiritual,
              ajudar você a refletir sobre o momento presente e enxergar novas possibilidades.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="#amostra" className="botao botao--ouro">
                  Começar minha jornada
                </Link>
                <Link href="#como-funciona" className="botao botao--contorno">
                  Como funciona
                </Link>
              </div>
              <small className="heroi__nota">Conheça seu mapa e receba sua primeira orientação.</small>
            </div>
            <div className="heroi__caminho">
              <span className="heroi__caminho-titulo">Um caminho que considera quem você é</span>
              <ul className="limpa heroi__itens">
                {CAMINHO.map((c) => (
                  <li key={c.titulo}>
                    <strong>{c.titulo}</strong>
                    <span>{c.texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <FormAmostra />
        </div>
      </section>

      <section className="secao" id="como-funciona">
        <div className="container">
          <div className="secao__cabeca">
            <span className="eyebrow">Como funciona</span>
            <h2>Conheça sua essência. Compreenda seu momento e encontre novos caminhos.</h2>
            <p className="texto-suave">
              A cabala é o mapa individual sobre quem você é. A jogada dos búzios serve para a orientação do momento
              presente. O +Ori une as duas coisas.
            </p>
          </div>
          <div className="passos">
            {PASSOS.map((p, i) => (
              <article key={p.rotulo} className="cartao passo">
                <span className="passo__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="passo__rotulo">{p.rotulo}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
          <div className="ponte">
            <p>Você já pode começar a conhecer os caminhos que os búzios podem revelar para o seu momento.</p>
            <Link href="#amostra" className="botao botao--ouro">
              Fazer minha amostra grátis
            </Link>
          </div>
        </div>
      </section>

      <section className="secao" id="cabala">
        <div className="container cabala-explica">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="eyebrow">A Cabala dos Odùs</span>
            <h2>Sua história tem caminhos. Sua cabala ajuda a compreender cada um deles.</h2>
            <p className="texto-suave">
              A partir da sua data de nascimento, a cabala revela um mapa individual construído a partir dos 16 Odùs.
              Cada ponto traz uma perspectiva sobre você: sua essência, seus caminhos, suas forças e aquilo que merece
              mais atenção.
            </p>
            <p className="texto-suave">
              É um convite para olhar para si com mais clareza, reconhecer o que já construiu e compreender melhor os
              caminhos que se apresentam.
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
        <div className="container">
          <div className="ponte ponte--texto">
            <h3>Um mapa para compreender você por inteiro</h3>
            <p>
              Cada ponto traz uma parte dessa leitura. Juntos, eles ajudam a compreender melhor suas características, os
              caminhos que você percorreu, suas potencialidades e os aspectos que pedem cuidado.
            </p>
            <p>
              E essa é apenas a primeira parte. Quando a cabala se encontra com a jogada dos búzios, a leitura ganha um
              novo olhar sobre as questões e os caminhos do seu momento atual.
            </p>
          </div>
        </div>
      </section>

      <section className="secao" id="areas">
        <div className="container">
          <div className="secao__cabeca">
            <span className="eyebrow">A consulta completa</span>
            <h2>Cinco jogadas, cinco áreas da sua vida</h2>
            <p className="texto-suave">
              Cada jogada revela uma mensagem dos búzios. Ao cruzar essa mensagem com a sua cabala, o +Ori oferece uma
              leitura personalizada, com orientações, pontos de atenção e caminhos para você refletir sobre o momento
              que está vivendo.
            </p>
          </div>
          <div className="areas">
            {AREAS.map((a, i) => (
              <article key={a.id} className="cartao area">
                <span className="area__num">{i + 1}ª jogada</span>
                <h3>{a.titulo}</h3>
                <p>{a.convite}</p>
              </article>
            ))}
          </div>
          <div className="mesa-demo">
            <MesaVitrine />
            <div className="mesa-demo__texto">
              <span className="eyebrow">O jogo de búzios</span>
              <h3>É aqui que os búzios caem</h3>
              <p className="texto-suave">
                Depois de colocar seu nome e sua data de nascimento, você embaralha e joga os 16 búzios. Os búzios que
                caem abertos mostram o Odù que responde a cada jogada, lido a partir da sua cabala.
              </p>
              <p className="texto-suave">
                A primeira jogada, para a vida profissional, é grátis. As outras quatro estão na consulta completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container autora">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="eyebrow">Por trás do +Ori</span>
            <h2>Mais de 30 anos de sabedoria, agora mais perto de você</h2>
            <p className="texto-suave">
              O +Ori nasceu de uma história construída ao longo de mais de três décadas de leitura dos búzios, escuta e
              orientação espiritual.
            </p>
            <p className="texto-suave">
              Criado a partir da experiência de uma jogadora de búzios, o +Ori leva para o ambiente digital uma forma
              própria de interpretar os Odùs, reconhecendo os sinais, compreendendo seus significados e transformando
              cada leitura em orientação para a vida.
            </p>
            <p className="texto-suave">
              Mais do que apresentar respostas, queremos ajudar você a olhar para o seu momento com mais clareza,
              reconhecer caminhos e refletir sobre as escolhas que estão diante de você.
            </p>
            <h3 className="autora__sub">O que torna o +Ori especial?</h3>
            <ul className="limpa bases">
              {ESPECIAL.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="autora__fecho">
              Uma experiência que une tradição e tecnologia, sem perder a essência do cuidado humano.
            </p>
          </div>
          <figure className="cartao citacao">
            <span className="eyebrow">Uma voz que orienta</span>
            <blockquote>“Quando Okanran se apresenta, é hora de prestar atenção aos movimentos da vida.”</blockquote>
            <p className="citacao__texto">
              Mudanças rápidas podem surgir e pedir de você mais atenção nas palavras, nas atitudes e nas decisões.
              Antes de agir por impulso, respire, observe o que está acontecendo e escolha seus passos com cautela. Nem
              todo movimento exige uma reação imediata.
            </p>
            <figcaption>Exemplo de orientação inspirada na interpretação autoral de Okanran.</figcaption>
          </figure>
        </div>
      </section>

      <section className="secao" id="preco">
        <div className="container">
          <div className="secao__cabeca secao__cabeca--centro">
            <span className="eyebrow">Sua experiência completa</span>
            <h2>Um olhar mais profundo sobre seus caminhos</h2>
            <p className="texto-suave">
              Cada pessoa tem uma história, desafios próprios e caminhos a compreender. O +Ori une a sua Cabala dos Odùs
              à orientação das cinco jogadas para oferecer uma leitura individualizada, conectada ao seu momento de
              vida.
            </p>
          </div>
          <h3 className="beneficios__titulo">O que você vai encontrar</h3>
          <div className="passos beneficios">
            {BENEFICIOS.map((b) => (
              <article key={b.titulo} className="cartao passo">
                <h3>{b.titulo}</h3>
                <p>{b.texto}</p>
              </article>
            ))}
          </div>
          <div className="cartao cartao--ouro preco">
            <span className="eyebrow">Sua consulta completa</span>
            <div className="preco__valor">
              <small>R$ </small>
              {PRECO.valor}
              <small>{PRECO.centavos}</small>
            </div>
            <p className="texto-suave">Conheça primeiro a experiência com a amostra grátis.</p>
            <Link href="#amostra" className="botao botao--ouro botao--largo">
              Começar pela amostra grátis
            </Link>
          </div>
        </div>
      </section>

      <section className="secao" id="perguntas">
        <div className="container">
          <div className="secao__cabeca secao__cabeca--centro">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2>Antes de jogar</h2>
            <p className="texto-suave">Pergunte o que quiser sobre o +Ori, ou veja as dúvidas mais comuns logo abaixo.</p>
          </div>
          <FaqIa />
          <div className="faq">
            {PERGUNTAS.map((q) => (
              <details key={q.p}>
                <summary>{q.p}</summary>
                <p>{q.r}</p>
                {q.agendar && LINK_AGENDAMENTO && (
                  <a href={LINK_AGENDAMENTO} target="_blank" rel="noopener noreferrer" className="botao botao--contorno botao--pequeno faq__agendar">
                    Agendar consulta online
                  </a>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
