import type { NextConfig } from "next";

// Exportação estática (pasta out/): funciona na Vercel, Netlify ou GitHub Pages.
// Para publicar em um subcaminho (ex.: usuario.github.io/anacreate) defina NEXT_PUBLIC_BASE_PATH=/anacreate.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
