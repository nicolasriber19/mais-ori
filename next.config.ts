import type { NextConfig } from "next";

// GITHUB_PAGES=1 gera o site estático para nicolasriber19.github.io/mais-ori (sem servidor:
// a leitura sai do modo demonstração, montada no navegador). Sem a variável, é o site normal com a rota da IA.
const paginas = process.env.GITHUB_PAGES === "1";
const basePath = paginas ? "/mais-ori" : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(paginas && { output: "export", basePath, trailingSlash: true }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ESTATICO: paginas ? "1" : "",
  },
};

export default nextConfig;
