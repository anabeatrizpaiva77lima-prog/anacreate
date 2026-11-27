import { asset, CHIPS } from "@/lib/data";
import { Icon } from "./Icons";

export function Hero() {
  return (
    <header className="band hero" id="topo">
      <div className="wrap">
        <div>
          <h1 className="big name">
            Ana<span className="create">create</span>
          </h1>
          <p className="slogan hand">Tudo por um clique.</p>
          <p className="tag">Formada em design, criativa desde que peguei o primeiro lápis de cor.</p>
          <div className="flex flex-wrap gap-2.5">
            {CHIPS.map((c) => (
              <span key={c} className="rounded-full border-2 border-cream px-3.5 py-1.5 text-[15px] font-medium mobile:px-3 mobile:py-[5px] mobile:text-[14px]">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="stage">
          <img className="hero-ph" src={asset("/img/hero_bw.webp")} alt="Ana Lima" width={800} height={958} fetchPriority="high" />
          <Icon name="spark" className="spark s1" />
          <Icon name="spark" className="spark s2" />
          <Icon name="spark" className="spark s3" />
          <Icon name="star" className="ostar" />
          <div className="label" aria-hidden="true">Ana Create</div>
          <p className="eu hand" aria-hidden="true">
            essa sou eu!
            <svg><use href="#arrow" /></svg>
          </p>
          <div className="menu" aria-hidden="true">
            <div>Copiar</div>
            <div>Colar</div>
            <div className="on">Criar</div>
            <div>Postar</div>
            <svg className="cursor" viewBox="0 0 24 24"><path d="M3 2l17 10-7 2-3 7z" fill="#fff" stroke="#161616" strokeWidth="1.8" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </header>
  );
}
