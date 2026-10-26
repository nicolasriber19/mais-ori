import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Rodape, Topo } from "@/components/Moldura";
import "./globals.css";

// Fontes do próprio projeto (as mesmas do PDF): o build não depende do Google Fonts.
const display = localFont({
  src: [
    { path: "../../public/fonts/cormorant-garamond-latin-500-normal.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-latin-600-normal.woff", weight: "600", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-latin-700-normal.woff", weight: "700", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-latin-500-italic.woff", weight: "500", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});
const texto = localFont({
  src: [
    { path: "../../public/fonts/manrope-latin-400-normal.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/manrope-latin-600-normal.woff", weight: "600", style: "normal" },
    { path: "../../public/fonts/manrope-latin-700-normal.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-texto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "+Ori · Consulta de búzios com a sua Cabala dos Odùs",
  description:
    "Acolhimento, clareza e direcionamento espiritual: cinco jogadas de búzios cruzadas com a sua Cabala dos Odùs, uma para cada área da vida.",
};

export const viewport: Viewport = { themeColor: "#0e0a07" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${texto.variable}`} data-scroll-behavior="smooth">
      <body>
        <Topo />
        <main>{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
