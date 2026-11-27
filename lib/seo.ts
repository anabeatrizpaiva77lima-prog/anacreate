import { CONTACT, SKILLS } from "./data";

export const SITE = {
  url: "https://www.anacreate.com.br",
  name: "Ana Create",
  person: "Ana Lima",
  title: "Ana Create · Social media e copywriter em Fortaleza | Ana Lima",
  description:
    "Portfólio de Ana Lima (Ana Create): social media, copywriter e líder de estratégia digital em Fortaleza-CE. Campanhas, reels, edição de vídeo e filmmaker mobile.",
  ogImage: "/og.jpg",
};

const id = (frag: string) => `${SITE.url}/#${frag}`;

/** Dados estruturados (schema.org) para Google e IAs entenderem quem é a Ana, o que ela faz e onde. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": id("site"),
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "pt-BR",
      publisher: { "@id": id("ana") },
    },
    {
      "@type": "ProfilePage",
      "@id": id("pagina"),
      url: `${SITE.url}/`,
      name: SITE.title,
      description: SITE.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": id("site") },
      mainEntity: { "@id": id("ana") },
      primaryImageOfPage: `${SITE.url}/img/hero_bw.webp`,
    },
    {
      "@type": "Person",
      "@id": id("ana"),
      name: SITE.person,
      alternateName: SITE.name,
      url: `${SITE.url}/`,
      image: `${SITE.url}/img/hero_bw.webp`,
      jobTitle: "Líder de estratégia digital",
      description:
        "Social media e copywriter há 4 anos, hoje líder de estratégia digital. Formada em design. Cria campanhas, escreve, edita e filma com o celular.",
      email: `mailto:${CONTACT.email}`,
      telephone: "+55-85-99220-1634",
      address: { "@type": "PostalAddress", addressLocality: "Fortaleza", addressRegion: "CE", addressCountry: "BR" },
      knowsAbout: SKILLS.map(([title]) => title).concat(["Marketing digital", "Marketing para saúde", "Design"]),
      knowsLanguage: "pt-BR",
      sameAs: [CONTACT.instagram],
      worksFor: { "@id": id("servico") },
    },
    {
      "@type": "ProfessionalService",
      "@id": id("servico"),
      name: SITE.name,
      slogan: "Tudo por um clique.",
      url: `${SITE.url}/`,
      image: `${SITE.url}${SITE.ogImage}`,
      email: CONTACT.email,
      telephone: "+55-85-99220-1634",
      founder: { "@id": id("ana") },
      address: { "@type": "PostalAddress", addressLocality: "Fortaleza", addressRegion: "CE", addressCountry: "BR" },
      areaServed: [{ "@type": "City", name: "Fortaleza" }, { "@type": "Country", name: "Brasil" }],
      sameAs: [CONTACT.instagram],
      knowsAbout: ["Social media", "Copywriting", "Estratégia digital", "Produção de conteúdo"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços",
        itemListElement: SKILLS.map(([title, desc]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: title, description: desc },
        })),
      },
    },
  ],
};
