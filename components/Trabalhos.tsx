"use client";
import { useState } from "react";
import { ACEV, FILTERS, WORKS, type Group } from "@/lib/data";
import { Phone } from "./Player";

const PAGE = 8;
export const AcevTag = () => <span className="acev">desenvolvido via agência ACEV</span>;

export function Trabalhos() {
  const [filter, setFilter] = useState<Group | "tudo">("tudo");
  const [limit, setLimit] = useState(PAGE);

  const list = WORKS.filter((w) => w.group !== "campanhas" && (filter === "tudo" || w.group === filter));
  // No desktop os itens além do limite ficam com .extra (escondidos via CSS); no celular o carrossel mostra todos.
  // Assim todo o portfólio já vem no HTML, legível para buscadores.

  return (
    <section className="band trab" id="trabalhos">
      <div className="wrap">
        <h2 className="big">
          Conteúdo <span className="hand">dá o play</span>
        </h2>
        <div className="mt-7 mb-[34px] flex flex-wrap gap-2.5 mobile:gap-2" role="group" aria-label="Filtrar trabalhos">
          {FILTERS.map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={k === filter}
              onClick={() => {
                setFilter(k);
                setLimit(PAGE);
              }}
              className="min-h-11 cursor-pointer rounded-full border-2 border-cream bg-transparent px-[18px] font-sans text-[16px] leading-[normal] font-medium text-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-lime focus-visible:outline-dashed aria-pressed:border-lime aria-pressed:bg-lime aria-pressed:text-ink mobile:min-h-10 mobile:px-3.5 mobile:text-[15px]"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="swipe">arraste para o lado →</p>
        <div className="works">
          {list.map((w, i) => (
            <article className={`work${i >= limit ? " extra" : ""}`} key={w.code}>
              <Phone list={list} index={i} />
              <p className="role">{w.role}</p>
              {ACEV.has(w.code) && <AcevTag />}
            </article>
          ))}
        </div>
        {list.length > limit && (
          <div className="more mobile:hidden">
            <button className="btn" type="button" onClick={() => setLimit((l) => l + PAGE)}>
              mostrar mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
