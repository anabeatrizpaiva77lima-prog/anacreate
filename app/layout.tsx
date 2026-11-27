import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, DM_Sans } from "next/font/google";
import { SITE } from "@/lib/seo";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--nf-anton", display: "swap" });
const hand = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--nf-hand", display: "swap" });
const dm = DM_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--nf-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.person, url: SITE.url }],
  creator: SITE.person,
  keywords: [
    "Ana Create", "Ana Lima", "social media Fortaleza", "copywriter Fortaleza", "estratégia digital",
    "marketing digital Fortaleza", "marketing para médicos", "filmmaker mobile", "edição de reels", "cobertura de eventos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Ana Create: tudo por um clique" }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: [SITE.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#151515" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${hand.variable} ${dm.variable}`}>
      <body>{children}</body>
    </html>
  );
}
