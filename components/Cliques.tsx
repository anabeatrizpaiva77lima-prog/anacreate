import { asset, CLIQUES, SHOTS } from "@/lib/data";
import { Shots } from "./Shots";

export function Cliques() {
  return (
    <section className="band cliques" id="cliques">
      <div className="wrap">
        <h2 className="big">
          Tudo por
          <br />
          um clique
        </h2>
        <p className="lead mt-6">
          Filmmaker mobile na prática. No fim, o que importa é o projeto final, e eu faço o que for preciso para chegar nele.
        </p>
        <p className="swipe mt-[30px]">arraste para o lado →</p>
        <div className="pols">
          {CLIQUES.map(([file, alt, caption]) => (
            <figure className="pol m-0" key={file}>
              <div className="ph">
                <img src={asset(`/img/${file}.webp`)} alt={alt} loading="lazy" width={600} height={750} />
              </div>
              <p>{caption}</p>
            </figure>
          ))}
        </div>
        <h3 className="sub">O que sai da câmera</h3>
        <Shots files={SHOTS.map((s) => asset(`/img/${s}.webp`))} />
      </div>
    </section>
  );
}
