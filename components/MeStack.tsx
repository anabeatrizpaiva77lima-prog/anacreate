"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/data";

const PHOTOS = ["me_1", "me_2", "me_3", "me_4"];

/** Fotos no espelho trocando como cliques de câmera, com flash. */
export function MeStack() {
  const [k, setK] = useState(0);
  const flash = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const id = setInterval(() => {
      if (document.hidden) return;
      setK((n) => (n + 1) % PHOTOS.length);
      const fl = flash.current;
      if (fl && !reduced.matches) {
        fl.classList.remove("go");
        void fl.offsetWidth;
        fl.classList.add("go");
      }
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="stack" role="img" aria-label="Fotos da Ana no espelho, alternando como cliques de câmera">
      {PHOTOS.map((p, i) => (
        <img key={p} src={asset(`/img/${p}.webp`)} alt="" width={740} height={875} className={i === k ? "on" : undefined} />
      ))}
      <span className="flash" ref={flash} />
      <span className="vf" aria-hidden="true" />
      <span className="cnt" aria-hidden="true">
        clique {k + 1}/{PHOTOS.length}
      </span>
    </div>
  );
}
