"use client";

import { useRouter } from "next/navigation";
import { CabalaCruz } from "@/components/CabalaCruz";
import { Carregando, SemDados } from "@/components/Estados";
import { PAGAMENTO_SIMULADO, PRECO } from "@/lib/config";
import { cabalaDe } from "@/lib/pedido";
import { useSessao } from "@/lib/sessao";

export default function Checkout() {
  const router = useRouter();
  const { sessao, atualizar, pronto } = useSessao();
  if (!pronto) return <Carregando />;
  const cabala = sessao ? cabalaDe(sessao.nascimento) : null;
  if (!sessao || !cabala) return <SemDados />;

  function pagar() {
    if (!sessao) return;
    atualizar({ ...sessao, pago: true, quedas: sessao.quedas ?? [], iniciadaEm: sessao.iniciadaEm ?? new Date().toISOString() });
    router.push("/consulta");
  }

  return (
    <section className="pagina">
      <div className="container">
        <div className="pagina__cabeca">
          <span className="eyebrow">Consulta completa</span>
          <h1>Falta pouco para o seu jogo</h1>
          <p className="texto-suave">Confira os dados da consulta antes de seguir.</p>
        </div>

        <div className="amostra">
          <div className="cartao resumo-compra">
            <h2 style={{ fontSize: "1.7rem" }}>{sessao.nome}</h2>
            <p className="texto-suave">Nascimento em {sessao.nascimento}</p>
            <ul className="limpa preco__itens">
              <li>Mapa completo da Cabala dos Odùs (cinco pontos)</li>
              <li>Cinco quedas dos búzios, uma para cada área da vida</li>
              <li>Interpretação individual de cada queda</li>
              <li>Consulta completa em PDF</li>
            </ul>
            <div className="linha-valor">
              <span className="texto-suave">Total</span>
              <strong>{PRECO.texto}</strong>
            </div>
            {PAGAMENTO_SIMULADO && (
              <p className="aviso-demo">
                <span aria-hidden="true">✦</span>
                <span>
                  Protótipo: o pagamento (Pix ou cartão) ainda não está ligado. O botão abaixo libera a consulta sem
                  cobrança, só para teste.
                </span>
              </p>
            )}
            <button className="botao botao--ouro botao--largo" onClick={pagar}>
              {sessao.pago ? "Voltar para a minha consulta" : "Simular pagamento e começar"}
            </button>
          </div>
          <div className="cartao" style={{ padding: "30px 16px", alignSelf: "start" }}>
            <CabalaCruz cabala={cabala} />
          </div>
        </div>
      </div>
    </section>
  );
}
