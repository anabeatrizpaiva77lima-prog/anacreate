"use client";
import { useState } from "react";

const LINKS = [
  ["#sobre", "sobre"],
  ["#trabalhos", "conteúdo"],
  ["#campanhas", "campanhas"],
  ["#cliques", "tudo por um clique"],
  ["#marcas", "marcas"],
  ["#contato", "contato"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 bg-ink px-gutter py-[18px] text-cream mobile:relative mobile:flex-nowrap">
      <a className="font-hand text-[28px] leading-[normal] no-underline" href="#topo">
        ana <b className="font-normal text-lime">create</b>
      </a>
      <button
        className="hidden min-h-10 cursor-pointer rounded-full border-2 border-cream bg-transparent px-4 font-sans text-[15px] leading-[normal] font-semibold text-cream mobile:inline-flex mobile:items-center"
        type="button"
        aria-expanded={open}
        aria-controls="navlist"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "fechar" : "menu"}
      </button>
      <ul
        id="navlist"
        className={`m-0 flex list-none flex-wrap gap-x-[22px] gap-y-1.5 p-0 mobile:absolute mobile:inset-x-0 mobile:top-full mobile:z-[70] mobile:flex-col mobile:gap-0 mobile:border-b-[3px] mobile:border-lime mobile:bg-ink mobile:px-gutter mobile:pt-1.5 mobile:pb-[18px] ${open ? "" : "mobile:hidden"}`}
      >
        {LINKS.map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              onClick={() => setOpen(false)}
              className="font-medium no-underline hover:text-lime mobile:block mobile:border-b mobile:border-white/12 mobile:py-3 mobile:text-[20px]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
