// Valores comerciais do protótipo. O preço é provisório: a mãe ainda vai definir.
export const PRECO = { valor: "47", centavos: ",00", texto: "R$ 47,00" };
export const PAGAMENTO_SIMULADO = true;

// Versão estática (GitHub Pages): sem servidor, a leitura é montada no navegador em modo demonstração.
export const ESTATICO = process.env.NEXT_PUBLIC_ESTATICO === "1";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
