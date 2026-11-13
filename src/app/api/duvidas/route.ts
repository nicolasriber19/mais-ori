import { GoogleGenAI } from "@google/genai";
import { instrucoesDaFaq } from "@/base/faq";
import { textoAosPoucos } from "@/lib/demo";
import { respostaDemo } from "@/lib/faqDemo";

// Assistente da FAQ. Com GEMINI_API_KEY, responde com o Gemini (plano grátis do Google AI Studio);
// sem a chave, responde pela base de dúvidas (modo demonstração).
export const runtime = "nodejs";
// A chave é lida em cada pedido (não no build), para a Vercel ligar a IA só com a variável de ambiente.
export const dynamic = "force-dynamic";

const MODELO = "gemini-3.5-flash-lite";
const MAX_PERGUNTA = 400;
const MAX_TURNOS = 6;

// O site estático do GitHub Pages chama esta rota de outro endereço.
const ORIGENS = ["https://nicolasriber19.github.io"];

type Turno = { de: "pessoa" | "ori"; texto: string };

function cabecalhosCors(req: Request): Record<string, string> {
  const origem = req.headers.get("origin");
  if (!origem || !ORIGENS.includes(origem)) return {};
  return { "Access-Control-Allow-Origin": origem, "Access-Control-Expose-Headers": "X-Modo", Vary: "Origin" };
}

// Freio simples contra abuso do plano grátis (por instância do servidor).
const janela = new Map<string, number[]>();
function permitido(ip: string): boolean {
  const agora = Date.now();
  const recentes = (janela.get(ip) ?? []).filter((t) => agora - t < 60 * 60 * 1000);
  if (recentes.length >= 30) return false;
  recentes.push(agora);
  janela.set(ip, recentes);
  return true;
}

/** A conversa anterior vai como texto dentro da pergunta: a FAQ é curta e não precisa do histórico do Gemini. */
function montarEntrada(pergunta: string, historico: Turno[]): string {
  const anteriores = historico
    .slice(-MAX_TURNOS)
    .map((t) => `${t.de === "pessoa" ? "Pessoa" : "+Ori"}: ${t.texto.slice(0, 600)}`)
    .join("\n");
  return anteriores ? `Conversa até aqui:\n${anteriores}\n\nPergunta da pessoa: ${pergunta}` : pergunta;
}

/** Diz à caixa da FAQ se as respostas vêm da IA ou da base, para o aviso certo aparecer antes da primeira pergunta. */
export function GET(req: Request) {
  return Response.json({ modo: process.env.GEMINI_API_KEY ? "ia" : "demo" }, { headers: cabecalhosCors(req) });
}

export function OPTIONS(req: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...cabecalhosCors(req),
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST(req: Request) {
  const cors = cabecalhosCors(req);
  const corpo = (await req.json().catch(() => null)) as { pergunta?: unknown; historico?: unknown } | null;
  const pergunta = typeof corpo?.pergunta === "string" ? corpo.pergunta.trim() : "";
  if (pergunta.length < 2 || pergunta.length > MAX_PERGUNTA) {
    return Response.json({ erro: "Escreva uma dúvida de até 400 caracteres." }, { status: 400, headers: cors });
  }
  const historico = (Array.isArray(corpo?.historico) ? corpo.historico : []).filter(
    (t): t is Turno => (t?.de === "pessoa" || t?.de === "ori") && typeof t?.texto === "string",
  );

  const texto = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", ...cors };
  const chave = process.env.GEMINI_API_KEY;
  if (!chave) {
    return new Response(textoAosPoucos(respostaDemo(pergunta)), { headers: { ...texto, "X-Modo": "demo" } });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!permitido(ip)) {
    return Response.json({ erro: "Muitas perguntas seguidas. Tente de novo daqui a pouco." }, { status: 429, headers: cors });
  }

  const ai = new GoogleGenAI({ apiKey: chave });
  const parar = new AbortController();
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = await ai.interactions.create(
          {
            model: MODELO,
            input: montarEntrada(pergunta, historico),
            system_instruction: instrucoesDaFaq(),
            stream: true,
            store: false,
            generation_config: { max_output_tokens: 600 },
          },
          { signal: parar.signal, timeout_ms: 30_000 },
        );
        for await (const evento of stream) {
          if (evento.event_type === "step.delta" && evento.delta.type === "text") {
            controller.enqueue(encoder.encode(evento.delta.text));
          } else if (evento.event_type === "error") {
            console.error("Erro do Gemini:", evento.error?.code, evento.error?.message);
            controller.enqueue(encoder.encode("\n[[erro]]"));
          } else if (evento.event_type === "interaction.completed" && evento.interaction.status === "incomplete") {
            controller.enqueue(encoder.encode("\n[[cortada]]"));
          }
        }
      } catch (erro) {
        if (!parar.signal.aborted) {
          console.error("Falha ao chamar o Gemini:", erro);
          controller.enqueue(encoder.encode("\n[[erro]]"));
        }
      }
      controller.close();
    },
    cancel() {
      parar.abort();
    },
  });

  return new Response(body, { headers: { ...texto, "X-Modo": "ia" } });
}
