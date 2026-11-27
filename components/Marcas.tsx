"use client";
import { useEffect, useRef, useState } from "react";
import { ERAS, TOP_BRANDS } from "@/lib/data";

const TOTAL = ERAS.reduce((n, [, list]) => n + list.length, 0);

// Mesmo ritmo de cores do original: 3n lima, 5n rosa, 4n preto (o último que casa vence).
const pill = (i: number) => {
  const n = i + 1;
  if (n % 4 === 0) return "bg-ink text-cream border-ink";
  if (n % 5 === 0) return "bg-pink text-ink border-ink";
  if (n % 3 === 0) return "bg-lime text-ink border-ink";
  return "bg-paper border-ink";
};

/** Espalha as pílulas em pontos aleatórios; ao entrar na tela elas voam e se juntam. Sai da tela, espalha de novo. */
function useAssemble() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current;
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scatter = () => {
      const w = innerWidth, h = innerHeight;
      Array.from(box.children as HTMLCollectionOf<HTMLElement>).forEach((el, i) => {
        el.style.setProperty("--x", `${Math.round((Math.random() * 2 - 1) * w * 0.7)}px`);
        el.style.setProperty("--y", `${Math.round((Math.random() * 2 - 1) * h * 0.6)}px`);
        el.style.setProperty("--r", `${Math.round((Math.random() * 2 - 1) * 70)}deg`);
        el.style.setProperty("--d", `${(i * 0.06 + Math.random() * 0.15).toFixed(2)}s`);
      });
      box.classList.remove("in");
      box.classList.add("scatter");
    };
    scatter();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.4) {
          void box.offsetWidth; // garante que o estado espalhado foi aplicado antes da transição
          box.classList.remove("scatter");
          box.classList.add("in");
        } else if (!e.isIntersecting && box.classList.contains("in")) scatter(); // só re-espalha fora da tela
      },
      { threshold: [0, 0.4] },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Marcas() {
  const [open, setOpen] = useState(false);
  const brands = useAssemble();
  return (
    <section className="band" id="marcas">
      <div className="wrap text-center">
        <h2 className="big text-ink">
          Marcas que
          <br />
          passaram por aqui
        </h2>
        <div ref={brands} className="brands mx-auto mt-9 mb-10 flex max-w-[1000px] flex-wrap justify-center gap-x-3.5 gap-y-2.5">
          {TOP_BRANDS.map((t, i) => (
            <span key={t} className={`bp rounded-full border-[3px] px-4 py-1 font-display text-[length:clamp(22px,3vw,34px)] leading-[1.2] uppercase ${pill(i)}`}>
              {t}
            </span>
          ))}
        </div>
        <button className="btn" type="button" aria-expanded={open} aria-controls="todas" onClick={() => setOpen((o) => !o)}>
          {open ? "fechar lista" : `ver todas as marcas (+${TOTAL})`}
        </button>
        {/* Lista completa fica no HTML (só escondida) para os buscadores lerem. */}
        <div id="todas" hidden={!open} className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 text-left">
          {ERAS.map(([era, brands]) => (
            <div key={era} className="rounded-2xl border-[3px] border-ink bg-paper px-[22px] py-5 shadow-[5px_5px_0_var(--color-ink)]">
              <h3 className="m-0 mb-3 font-hand text-[30px] leading-none font-normal text-ink">{era}</h3>
              <ul className="m-0 list-none p-0">
                {brands.map(([name, detail]) => (
                  <li key={name} className="border-b border-dashed border-[#c9bfae] py-[5px] last:border-0">
                    {name}
                    {detail && <small className="block text-[13px] text-muted">{detail}</small>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
