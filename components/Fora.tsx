import { Icon, type IconName } from "./Icons";

const TILES: [IconName, string, string][] = [
  ["arrow", "bg-cream", "text-lime"],
  ["star", "bg-ink", "text-cream"],
  ["burst", "bg-pink", "text-ink"],
  ["squig", "bg-ink", "text-lime"],
  ["loop", "bg-cream", "text-ink"],
  ["star", "bg-ink", "text-lime"],
];

export function Fora() {
  return (
    <section className="band border-t-[3px] border-ink bg-cream">
      <div className="wrap grid grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-center gap-[clamp(30px,5vw,80px)] tablet:grid-cols-1">
        <div className="grid grid-cols-3 border-[3px] border-ink" aria-hidden="true">
          {TILES.map(([icon, bg, fg], i) => (
            <div key={i} className={`grid aspect-square place-items-center ${bg} ${fg}`}>
              <Icon name={icon} className="w-[78%]" />
            </div>
          ))}
        </div>
        <div>
          <h2 className="big text-ink text-[length:clamp(48px,7vw,96px)]">
            Fora do
            <br />
            expediente
          </h2>
          <p className="lead mt-6">
            Crochê, artesanato e tudo que é feito à mão. A criatividade não desliga quando o expediente acaba, ela só muda de
            ferramenta.
          </p>
        </div>
      </div>
    </section>
  );
}
