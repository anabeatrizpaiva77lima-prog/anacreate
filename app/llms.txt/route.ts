import { CAMPAIGN_INFO, CONTACT, ERAS, GROUP_LABEL, igUrl, SKILLS, WORKS } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

/** Resumo em texto para assistentes de IA (padrão llms.txt), montado a partir dos mesmos dados do site. */
export function GET() {
  const works = WORKS.map((w) => {
    const [client, title] = CAMPAIGN_INFO[w.code] ?? ["", ""];
    const name = [client, title].filter(Boolean).join(": ") || GROUP_LABEL[w.group];
    return `- [${name}](${igUrl(w)}): ${w.role}`;
  });
  const text = `# ${SITE.name}

> ${SITE.person} (Ana Create) é social media, copywriter e líder de estratégia digital em Fortaleza, Ceará. Bacharel em Design e pós-graduanda em Gestão Estratégica de Marketing e Gestão da Reputação e Imagem, está há 4 anos no marketing. Cria campanhas, escreve, edita e filma com o celular. Slogan: "Tudo por um clique."

Atende marcas e profissionais de saúde (médicos, clínicas, cirurgia robótica), moda, educação e outros segmentos, em Fortaleza e no Brasil.

## Serviços

${SKILLS.map(([t, d]) => `- ${t}: ${d}`).join("\n")}

## Marcas que já atendeu

${ERAS.map(([era, list]) => `- ${era}: ${list.map(([n, d]) => (d ? `${n} (${d})` : n)).join(", ")}`).join("\n")}

## Trabalhos (Instagram)

${works.join("\n")}

## Contato

- Site: ${SITE.url}/
- Instagram: ${CONTACT.instagram} (${CONTACT.handle})
- WhatsApp: ${CONTACT.phone}
- E-mail: ${CONTACT.email}
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
