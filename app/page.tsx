import { Sprite } from "@/components/Icons";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Sobre } from "@/components/Sobre";
import { PlayerProvider } from "@/components/Player";
import { Trabalhos } from "@/components/Trabalhos";
import { Campanhas } from "@/components/Campanhas";
import { Cliques } from "@/components/Cliques";
import { Marcas } from "@/components/Marcas";
import { Fora } from "@/components/Fora";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Sprite />
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <Sobre />
        <PlayerProvider>
          <Trabalhos />
          <Campanhas />
        </PlayerProvider>
        <Cliques />
        <Marcas />
        <Fora />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
