import Anthropic from "@anthropic-ai/sdk";
import { AREAS } from "@/base/areas";
import { instrucoesDoSistema } from "@/base/regras";
import { leituraDemo } from "@/lib/demo";
import { cabalaDe, montarPedido, type Queda } from "@/lib/pedido";

export const runtime = "nodejs";

const MODELO = "claude-opus-5-5";
const temChave = () => Boolean(process.env.ANTHROPIC_API_KEY) && process.env.MAIS_ORI_MODO !== "demo";

// Freio simples contra abuso enquanto o pagamento é simulado (por instância do servidor).
const janela = new Map<string, number[]>();
function permitido(ip: string): boolean {
  const agora = Date.now();
  const recentes = (janela.get(ip) ?? []).filter((t) => agora - t < 60 * 60 * 1000);
  if (recentes.length >= 40) return false;
  recentes.push(agora);
  janela.set(ip, recentes);
  return true;
}

export async function POST(req: Request) {
  const corpo = (await req.json().catch(() => null)) as
    | { nome?: string; nascimento?: string; area?: string; odu?: number; ordem?: number }
    | null;

  const cabala = corpo?.nascimento ? cabalaDe(corpo.nascimento) : null;
  const area = AREAS.find((a) => a.id === corpo?.area)?.id;
  const odu = Number(corpo?.odu);
  const ordem = Number(corpo?.ordem ?? 1);
  if (!corpo?.nome?.trim() || !cabala || !area || !(odu >= 1 && odu <= 16)) {
    return Response.json({ erro: "Dados da consulta incompletos." }, { status: 400 });
  }
  const queda: Queda = { area, odu };

  if (!temChave()) {
    return new Response(textoAosPoucos(leituraDemo(cabala, queda)), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Modo": "demo" },
    });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!permitido(ip)) {
    return Response.json({ erro: "Muitas consultas seguidas. Tente de novo mais tarde." }, { status: 429 });
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium" },
    system: [{ type: "text", text: instrucoesDoSistema(), cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: montarPedido(corpo.nome, cabala, queda, ordem) }],
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(encoder.encode("\n[[recusa]]"));
        if (final.stop_reason === "max_tokens") controller.enqueue(encoder.encode("\n[[cortada]]"));
      } catch (erro) {
        if (erro instanceof Anthropic.RateLimitError) console.error("Limite da API atingido");
        else if (erro instanceof Anthropic.AuthenticationError) console.error("Chave da API inválida");
        else if (erro instanceof Anthropic.APIError) console.error(`Erro da API ${erro.status}:`, erro.message);
        else console.error(erro);
        controller.enqueue(encoder.encode("\n[[erro]]"));
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Modo": "ia", "Cache-Control": "no-store" },
  });
}

/** Entrega o texto da demonstração em pedaços, como a IA faria. */
function textoAosPoucos(texto: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const partes = texto.match(/\S+\s*/g) ?? [texto];
  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < partes.length; i += 3) {
        controller.enqueue(encoder.encode(partes.slice(i, i + 3).join("")));
        await new Promise((r) => setTimeout(r, 35));
      }
      controller.close();
    },
  });
}
