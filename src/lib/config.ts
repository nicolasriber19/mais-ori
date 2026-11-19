// Valores comerciais do protótipo. O preço é provisório: a mãe ainda vai definir.
export const PRECO = { valor: "47", centavos: ",00", texto: "R$ 47,00" };
export const PAGAMENTO_SIMULADO = true;

// Versão estática (GitHub Pages): sem servidor, a leitura é montada no navegador em modo demonstração.
export const ESTATICO = process.env.NEXT_PUBLIC_ESTATICO === "1";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
// Endereço do servidor da FAQ com IA (ex.: o site na Vercel), para a versão estática chamar.
// Vazio: a versão com servidor usa a própria rota, e a estática responde em modo demonstração.
export const API_FAQ = process.env.NEXT_PUBLIC_API_FAQ ?? "";

// WhatsApp da mãe para agendar consulta online (só números, com DDI e DDD, ex.: "5561999999999").
// Vazio: o botão de agendar não aparece.
export const WHATSAPP_AGENDAMENTO = "";
export const LINK_AGENDAMENTO = WHATSAPP_AGENDAMENTO
  ? `https://wa.me/${WHATSAPP_AGENDAMENTO}?text=${encodeURIComponent("Olá! Vim pelo +Ori e gostaria de agendar uma consulta online.")}`
  : "";

// Imagem e vídeos da guia virtual (em public/guia). Os vídeos são opcionais: sem eles, fica a foto.
// A foto é a de rosto e turbante que a mãe escolheu (original em material/guia-turbante.jpg).
export const GUIA_MIDIA = {
  imagem: `${BASE_PATH}/guia/mae.webp`,
  parada: null as string | null,
  falando: null as string | null,
};

// Logo do +Ori (em public/marca, gerada da logo original em material/logo-original.jpg).
// O PDF usa marca/emblema-selo.png, em PNG porque o react-pdf não lê WebP.
export const MARCA = {
  logo: `${BASE_PATH}/marca/logo.webp`,
  emblema: `${BASE_PATH}/marca/emblema.webp`,
};
