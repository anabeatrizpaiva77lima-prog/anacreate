export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-x-5 gap-y-2 bg-ink px-gutter py-[22px] text-[14px] text-cream">
      <span>
        Ana Lima · <b>Ana Create</b>
      </span>
      <span>Fortaleza, CE · {new Date().getFullYear()}</span>
    </footer>
  );
}
