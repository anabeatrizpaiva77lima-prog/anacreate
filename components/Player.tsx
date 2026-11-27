"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CAMPAIGN_INFO, cover, GROUP_LABEL, igUrl, mediaType, videoSrc, type Work } from "@/lib/data";

type Open = (list: Work[], index: number) => void;
const PlayerCtx = createContext<Open>(() => {});
export const usePlayer = () => useContext(PlayerCtx);

const navBtn =
  "min-h-11 cursor-pointer rounded-full border-2 border-cream bg-transparent px-4 font-sans text-[15px] leading-[normal] font-semibold text-cream disabled:cursor-default disabled:opacity-35";

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/** Modal com o player próprio do site; navega entre os itens da lista que o abriu. */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<{ list: Work[]; i: number } | null>(null);

  const open = useCallback<Open>((list, i) => {
    setState({ list, i });
    const d = dlg.current;
    if (d && !d.open) {
      try {
        d.showModal();
      } catch {
        d.setAttribute("open", "");
      }
    }
  }, []);

  const close = () => dlg.current?.open && dlg.current.close();
  const step = useCallback(
    (d: number) => setState((s) => (s && s.list[s.i + d] ? { ...s, i: s.i + d } : s)),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.current?.open) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  const w = state?.list[state.i];
  const hasNext = !!state && state.i < state.list.length - 1;
  const [client, title] = (w && CAMPAIGN_INFO[w.code]) || ["", ""];
  const caption = w ? [client, title].filter(Boolean).join(" · ") || GROUP_LABEL[w.group] : "";

  return (
    <PlayerCtx.Provider value={open}>
      {children}
      <dialog
        className="player"
        ref={dlg}
        aria-label="Vídeo"
        onClick={(e) => e.target === dlg.current && close()}
        onClose={() => setState(null)}
      >
        <button className="x" type="button" aria-label="Fechar" onClick={close}>
          ×
        </button>
        {w && state && (
          <div className="pbox">
            <div className="pframe">
              {mediaType(w) === "video" ? (
                <VideoPlayer key={w.code} work={w} onEnded={() => hasNext && step(1)} />
              ) : mediaType(w) === "embed" ? (
                <iframe
                  key={w.code}
                  src={`${igUrl(w)}embed/`}
                  title="Vídeo no Instagram"
                  allow="autoplay; encrypted-media; fullscreen"
                  scrolling="no"
                />
              ) : (
                <img key={w.code} src={cover(w)} alt={`${GROUP_LABEL[w.group]}: ${w.role}`} />
              )}
            </div>
            <p className="m-0 text-center font-medium text-cream">
              {caption} · {w.role}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button type="button" className={navBtn} disabled={state.i <= 0} onClick={() => step(-1)}>
                ‹ anterior
              </button>
              <a className="btn" href={igUrl(w)} target="_blank" rel="noopener">
                ver no Instagram ↗
              </a>
              <button type="button" className={navBtn} disabled={!hasNext} onClick={() => step(1)}>
                próximo ›
              </button>
            </div>
          </div>
        )}
      </dialog>
    </PlayerCtx.Provider>
  );
}

/** Player próprio: toque no vídeo pausa/continua; barra de progresso arrastável; mudo; espaço e M no teclado. */
function VideoPlayer({ work, onEnded }: { work: Work; onEnded: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    // Foco no vídeo (e não no "×"), para o espaço pausar em vez de fechar.
    box.current?.focus({ preventScroll: true });
    // Aberto por clique: o navegador deixa tocar com som. Se recusar, toca mudo.
    el.play().catch(() => {
      el.muted = true;
      setMuted(true);
      el.play().catch(() => setWaiting(false));
    });
    const onKey = (e: KeyboardEvent) => {
      // Espaço num botão focado já é "clicar" nele; não pausa o vídeo junto.
      const onControl = e.target instanceof Element && e.target.closest("button, a, [role=slider]");
      if ((e.key === " " || e.key === "k") && !onControl) {
        e.preventDefault();
        if (el.paused) el.play();
        else el.pause();
      }
      if (e.key === "m") {
        el.muted = !el.muted;
        setMuted(el.muted);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      el.pause();
    };
  }, []);

  const toggle = () => {
    const el = v.current;
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  };
  const seek = (clientX: number) => {
    const el = v.current, b = bar.current;
    if (!el || !b || !dur) return;
    const r = b.getBoundingClientRect();
    el.currentTime = Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * dur;
    setT(el.currentTime);
  };
  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <div ref={box} tabIndex={-1} aria-label={`Vídeo: ${work.role}`} role="group" className="relative h-full w-full bg-black outline-none">
      <video
        ref={v}
        src={videoSrc(work)}
        poster={cover(work)}
        playsInline
        preload="auto"
        className="block h-full w-full cursor-pointer object-contain"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onEnded={onEnded}
      />

      {/* botão central: aparece quando pausado */}
      {!playing && !waiting && (
        <button
          type="button"
          aria-label="Reproduzir"
          onClick={toggle}
          className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 cursor-pointer place-items-center rounded-full border-[3px] border-ink bg-lime shadow-[5px_5px_0_var(--color-ink)] transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="ml-1 size-9" aria-hidden="true">
            <path d="M6 4l15 8-15 8z" fill="var(--color-ink)" />
          </svg>
        </button>
      )}
      {waiting && playing && (
        <span className="absolute top-1/2 left-1/2 -mt-6 -ml-6 size-12 animate-spin rounded-full border-4 border-lime border-t-transparent" aria-hidden="true" />
      )}

      {/* barra de controles */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3 text-cream">
        <button
          type="button"
          aria-label={playing ? "Pausar" : "Reproduzir"}
          onClick={toggle}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-ink bg-lime"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="var(--color-ink)" /> : <path d="M7 4l13 8-13 8z" fill="var(--color-ink)" />}
          </svg>
        </button>
        <div
          ref={bar}
          role="slider"
          tabIndex={0}
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(t)}
          aria-valuetext={`${fmt(t)} de ${fmt(dur)}`}
          className="relative h-6 flex-1 cursor-pointer touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(e.clientX);
          }}
          onPointerMove={(e) => e.buttons === 1 && seek(e.clientX)}
          onKeyDown={(e) => {
            const el = v.current;
            if (!el || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            el.currentTime += e.key === "ArrowRight" ? 5 : -5;
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-cream/30" />
          <div className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-lime" style={{ width: `${pct}%` }} />
          <div className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-lime" style={{ left: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-xs font-semibold tabular-nums">
          {fmt(t)} / {fmt(dur)}
        </span>
        <button
          type="button"
          aria-label={muted ? "Ativar som" : "Tirar som"}
          aria-pressed={muted}
          onClick={() => {
            const el = v.current;
            if (!el) return;
            el.muted = !el.muted;
            setMuted(el.muted);
          }}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-cream bg-transparent text-cream"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
            {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

/** Capa em formato de celular. Com mouse, passa um preview mudo do vídeo. Sem JS continua sendo um link para o post. */
export function Phone({ list, index }: { list: Work[]; index: number }) {
  const open = usePlayer();
  const w = list[index];
  const [preview, setPreview] = useState(false);
  return (
    <a
      className="phone"
      href={igUrl(w)}
      target="_blank"
      rel="noopener"
      aria-label={`${GROUP_LABEL[w.group]}: ${w.role} (assistir)`}
      onClick={(e) => {
        e.preventDefault();
        setPreview(false);
        open(list, index);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || mediaType(w) !== "video") return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setPreview(true);
      }}
      onPointerLeave={() => setPreview(false)}
    >
      <img src={cover(w)} alt="" loading="lazy" />
      {mediaType(w) !== "image" && (
        <span className="play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 4.5l13 7.5-13 7.5z" fill="currentColor" />
          </svg>
        </span>
      )}
      {preview &&<video className="preview" src={videoSrc(w)} muted loop playsInline autoPlay aria-hidden="true" />}
    </a>
  );
}
