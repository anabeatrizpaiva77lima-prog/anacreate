export type Group = "saude" | "moda" | "outros" | "campanhas";
export type Work = { group: Group; kind: "reel" | "p"; code: string; role: string };

export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
export const igUrl = (w: Work) => `https://www.instagram.com/${w.kind}/${w.code}/`;
export const cover = (w: Work) => asset(`/covers/${w.code}.webp`);

/**
 * Posts sem vídeo local em public/videos:
 * - "image": post de foto; o player mostra a capa e o link para o Instagram.
 * - "embed": vídeo que o Instagram só libera com login; cai no embed oficial.
 */
const NO_LOCAL_VIDEO: Record<string, "image" | "embed"> = {
  DGgQB6vRXMF: "image",
  DEsIb7zRSRN: "image",
  De_nTEQoDXW: "embed",
};
export const mediaType = (w: Work): "video" | "image" | "embed" => NO_LOCAL_VIDEO[w.code] ?? "video";
export const videoSrc = (w: Work) => asset(`/videos/${w.code}.mp4`);

export const GROUP_LABEL: Record<Group, string> = {
  saude: "Saúde",
  moda: "Moda",
  outros: "Outros segmentos",
  campanhas: "Campanhas",
};

export const FILTERS: [Group | "tudo", string][] = [
  ["tudo", "Tudo"],
  ["saude", "Saúde"],
  ["moda", "Moda"],
  ["outros", "Outros segmentos"],
];

/** desenvolvidos via ACEV: NECI (2), Dr. Sidney, Dr. Érico, Fortal Consórcios (2) */
export const ACEV = new Set(["DdUWzKCzywU", "DcyYhoWBISy", "De_nTEQoDXW", "DeRppH5xN_K", "DdrNSn1xOVQ", "DbobLkQxBQD"]);

export const SKILLS: [string, string, "ink" | "lime"][] = [
  ["Estratégia", "planejamento e posicionamento", "ink"],
  ["Campanhas", "conceito criativo e lançamento", "lime"],
  ["Copywriting", "legendas, roteiros e textos", "ink"],
  ["Social media", "pauta, calendário e gestão", "lime"],
  ["Edição de vídeos", "reels e vídeos curtos", "ink"],
  ["Filmmaker mobile", "captação no celular", "lime"],
  ["Real time", "conteúdo publicado na hora", "lime"],
  ["Cobertura de eventos", "captação e entrega no mesmo dia", "ink"],
];

export const MARQUEE = [
  "tudo por um clique", "social media", "copywriting", "estratégia digital", "campanhas",
  "real time", "cobertura de eventos", "edição de vídeos", "filmmaker mobile",
];

export const CHIPS = ["copywriter", "social media", "líder de estratégia digital", "filmmaker mobile", "real time"];

const pce = "planejamento, captação e edição", pe = "planejamento e edição", ce = "captação e edição";
const w = (group: Group, kind: Work["kind"], code: string, role: string): Work => ({ group, kind, code, role });

export const WORKS: Work[] = [
  w("campanhas", "reel", "DWPXmrUETDv", "conceito criativo"),
  w("campanhas", "reel", "DbobLkQxBQD", "lançamento da empresa no digital"),
  w("campanhas", "reel", "DWj5blIii_s", "conceito criativo de campanha"),
  w("saude", "reel", "DdUWzKCzywU", pe), w("saude", "reel", "DcyYhoWBISy", pe),
  w("saude", "reel", "De_nTEQoDXW", "edição"), w("saude", "reel", "DeRppH5xN_K", ce),
  w("saude", "reel", "Da0mPBjqQWc", pce), w("saude", "reel", "DaduqiGFNxI", pce), w("saude", "reel", "DW9k-a3DTCA", pce),
  w("saude", "reel", "DU_TZXXkmZF", pce), w("saude", "reel", "DXhtizskyZY", pce), w("saude", "reel", "DeMIEjzMHzP", pce),
  w("moda", "reel", "DGTwzSPROvU", "conteúdo de moda"), w("moda", "p", "DHWuDXMRZO-", "conteúdo de moda"),
  w("moda", "p", "DCZd8XJxe-k", "conteúdo de moda"), w("moda", "p", "DGgQB6vRXMF", "conteúdo de moda"),
  w("moda", "p", "DEsIb7zRSRN", "conteúdo de moda"),
  w("moda", "p", "DIPRw7hRyV0", pe), w("moda", "p", "DIMyvDfRx67", pe), w("moda", "p", "DDPAXtXRgbV", pe),
  w("moda", "p", "DFSU22oRWHk", pe), w("moda", "p", "DFJGXVvRNV-", pe),
  w("outros", "reel", "DdrNSn1xOVQ", pce), w("outros", "reel", "DfXoEvfBTRa", "edição"),
  w("outros", "reel", "DfHrRRxxcEU", ce), w("outros", "reel", "DenLUAVjS7v", ce),
];

export const CAMPAIGN_INFO: Record<string, [client: string, title: string]> = {
  DWPXmrUETDv: ["Pediatra Sem Jaleco", "De volta à infância"],
  DbobLkQxBQD: ["", "O militar não promete, ele cumpre"],
  DWj5blIii_s: ["Lapidart", "Retrospectiva entre mulheres"],
};

export const CLIQUES: [file: string, alt: string, caption: string][] = [
  ["clique_chao", "Ana agachada no chão de pedra, fotografando com o celular", "no chão, se precisar"],
  ["clique_banco", "Ana em pé em cima de um banco, fotografando", "em cima do banco"],
  ["clique_muro", "Ana em cima de um muro, fotografando", "em cima do muro"],
];

export const SHOTS = [15, 14, 16, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) => `shot_${String(n).padStart(2, "0")}`);

export type Brand = [name: string, detail?: string];
export const ERAS: [string, Brand[]][] = [
  ["O começo", [["Volkswagen"], ["Mandala Spa"]]],
  ["Na agência", [["Amarelô"], ["Dilady"], ["Cultura Inglesa"], ["Azilados"], ["Love Secret"], ["Linhas e Cores"]]],
  ["Moda", [["Angelique"], ["My Coat", "vestuário para médicos"]]],
  ["Na TriWeb", [
    ["Vale da Serra", "hospedagem em Maranguape"], ["Pediatra Sem Jaleco", "pediatria"],
    ["Dra. Priscila Brasil", "oftalmologista"], ["Dr. Erick", "oftalmologista"], ["Dr. Rodrigo", "ortopedista"],
    ["Lapidart", "clínica de estética"], ["CPDDEM", "endocrinologia"], ["Autoescola Santos"],
    ["TriWeb", "perfil da agência"], ["Dr. André", "ortopedista"],
  ]],
  ["Hoje", [
    ["Dr. Érico Diógenes", "urologista, cirurgia robótica"], ["Dr. Neto", "cirurgião torácico, cirurgia robótica"],
    ["IACR", "8 especialistas em cirurgia robótica"], ["Faculdade INBEC"],
    ["Projeto Shark", "projeto social da Faculdade INBEC"], ["NECI", "instituto de endometriose"],
    ["Dr. Sidney", "ginecologista"], ["Fortal Consórcios", "desde o início"],
  ]],
];

export const TOP_BRANDS = ["Volkswagen", "Cultura Inglesa", "Love Secret", "Mandala Spa", "Amarelô", "IACR", "Fortal Consórcios", "Faculdade INBEC", "Vale da Serra", "Dilady"];

export const CONTACT = {
  whatsapp: "https://wa.me/5585992201634?text=Oi%20Ana!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar.",
  instagram: "https://www.instagram.com/btriz.ana/",
  email: "anablimamkt@gmail.com",
  phone: "(85) 99220-1634",
  handle: "@btriz.ana",
};
