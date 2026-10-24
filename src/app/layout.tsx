import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Rodape, Topo } from "@/components/Moldura";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const texto = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-texto" });

export const metadata: Metadata = {
  title: "+Ori · Consulta de búzios com a sua Cabala dos Odùs",
  description:
    "Acolhimento, clareza e direcionamento espiritual: a queda dos búzios cruzada com a sua Cabala dos Odùs, em cinco áreas da vida.",
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
