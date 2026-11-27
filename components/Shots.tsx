"use client";
import { useEffect, useRef } from "react";

const arrow =
  "size-12 cursor-pointer rounded-full border-[3px] border-ink bg-paper text-[26px] leading-none text-ink";

const SPEED = 35; // px por segundo
const RESUME_MS = 3000; // depois de mexer, espera um pouco antes de voltar a andar sozinho

/**
 * Faixa de fotos que anda sozinha, devagar e em loop (a lista é renderizada duas vezes).
 * Para com o mouse em cima, com foco, fora da tela ou logo depois de a pessoa mexer.
 */
export function Shots({ files }: { files: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const userAt = useRef(-Infinity);
  const hover = useRef(false);

  const touched = () => (userAt.current = performance.now());
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    touched();
    // no começo da faixa, voltar pula para a cópia (loop também para trás)
    const half = (el.children[files.length] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    if (dir < 0 && el.scrollLeft < el.clientWidth) el.scrollLeft += half;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let pos = el.scrollLeft, last = performance.now(), raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const imgs = el.children as HTMLCollectionOf<HTMLElement>;
      // largura de uma cópia da lista = distância até a primeira foto duplicada
      const half = imgs[files.length].offsetLeft - imgs[0].offsetLeft;
      const idle =
        visible && !hover.current && !el.matches(":focus-visible") && now - userAt.current > RESUME_MS;
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // a pessoa rolou
      if (idle) {
        pos += SPEED * dt;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      } else if (el.scrollLeft >= half) {
        pos = el.scrollLeft - half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [files.length]);

  return (
    <>
      <div
        className="shots auto"
        tabIndex={0}
        aria-label="Fotos tiradas pela Ana"
        ref={ref}
        onPointerEnter={(e) => e.pointerType === "mouse" && (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
        onPointerDown={touched}
        onTouchStart={touched}
        onWheel={touched}
      >
        {files.map((src) => (
          <img key={src} src={src} alt="Foto tirada pela Ana" loading="lazy" width={448} height={598} />
        ))}
        {/* cópia para o loop contínuo; escondida dos leitores de tela */}
        {files.map((src) => (
          <img key={`${src}#2`} src={src} alt="" aria-hidden="true" loading="lazy" width={448} height={598} />
        ))}
      </div>
      <div className="mt-2.5 flex gap-2.5">
        <button type="button" className={arrow} aria-label="Fotos anteriores" onClick={() => scroll(-1)}>
          ‹
        </button>
        <button type="button" className={arrow} aria-label="Próximas fotos" onClick={() => scroll(1)}>
          ›
        </button>
      </div>
    </>
  );
}
