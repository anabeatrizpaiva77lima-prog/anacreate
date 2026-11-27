import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, DM_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--nf-anton", display: "swap" });
const hand = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--nf-hand", display: "swap" });
const dm = DM_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--nf-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anacreate.com.br"),
  title: "Ana Create",
  description:
    "Ana Create — copywriter, social media e líder de estratégia digital. Conteúdo, campanhas, edição e filmmaker mobile. Tudo por um clique.",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${hand.variable} ${dm.variable}`}>
      <body>{children}</body>
    </html>
  );
}
