import type { CSSProperties } from "react";

export type IconName = "folder" | "star" | "squig" | "loop" | "burst" | "spark" | "arrow";

/** Sprite SVG único; cada ícone é reutilizado via <use>. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="folder" viewBox="0 0 120 92"><path d="M6 14q0-8 8-8h30l10 10h52q8 0 8 8v56q0 8-8 8H14q-8 0-8-8z" fill="currentColor" /><path d="M6 30h108v50q0 8-8 8H14q-8 0-8-8z" fill="currentColor" opacity=".8" /></symbol>
        <symbol id="star" viewBox="0 0 100 100"><path d="M50 10 59 40 90 42 65 60 75 90 50 71 25 90 35 60 10 42 41 40Z" fill="none" stroke="currentColor" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" /></symbol>
        <symbol id="squig" viewBox="0 0 140 100"><path d="M10 50C30 10 50 90 70 50S110 10 130 50" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" /></symbol>
        <symbol id="loop" viewBox="0 0 120 100"><path d="M18 62C14 22 80 18 72 56 64 88 22 74 40 46 58 18 112 30 102 72" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" /></symbol>
        <symbol id="burst" viewBox="0 0 100 100"><path d="M50.0 4.1 L53.7 31.5 L68.3 5.7 L60.2 34.7 L83.4 16.6 L66.8 38.8 L91.0 33.0 L70.6 45.9 L94.2 50.0 L70.2 54.0 L91.0 67.0 L65.4 60.3 L82.9 82.9 L62.8 69.1 L67.1 91.3 L53.8 69.0 L50.0 97.8 L45.4 73.2 L31.8 93.8 L38.7 66.9 L14.7 85.3 L34.8 60.2 L4.6 68.8 L30.6 53.9 L5.1 50.0 L31.7 46.4 L7.6 32.5 L31.0 37.3 L18.1 18.1 L38.1 32.1 L31.7 5.8 L46.1 30.2Z" fill="currentColor" /></symbol>
        <symbol id="spark" viewBox="0 0 100 100"><path d="M50 0C54 36 64 46 100 50 64 54 54 64 50 100 46 64 36 54 0 50 36 46 46 36 50 0Z" fill="currentColor" /></symbol>
        <symbol id="arrow" viewBox="0 0 100 100"><path d="M18 82C30 52 50 36 80 22M80 22 54 20M80 22 74 48" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name, className, style, viewBox }: { name: IconName; className?: string; style?: CSSProperties; viewBox?: string }) {
  return (
    <svg className={className} style={style} viewBox={viewBox} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
