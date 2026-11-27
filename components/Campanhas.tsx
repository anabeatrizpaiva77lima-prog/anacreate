import { ACEV, CAMPAIGN_INFO, WORKS } from "@/lib/data";
import { Phone } from "./Player";
import { AcevTag } from "./Trabalhos";

const CAMPAIGNS = WORKS.filter((w) => w.group === "campanhas");

export function Campanhas() {
  return (
    <section className="band camp" id="campanhas">
      <div className="wrap">
        <h2 className="big">Campanhas</h2>
        <p className="kick hand">o combustível do branding</p>
        <p className="lead">
          Toda marca, e toda pessoa, já tem uma mensagem. A campanha é o que dá volume a ela: um conceito criativo que pega o
          que já existe, enfatiza e faz ser lembrado.
        </p>
        <p className="swipe mt-[30px]">arraste para o lado →</p>
        <div className="camps">
          {CAMPAIGNS.map((w, i) => {
            const [client, title] = CAMPAIGN_INFO[w.code] ?? ["", ""];
            return (
              <article className="cc" key={w.code}>
                <Phone list={CAMPAIGNS} index={i} />
                {client && <span className="cl">{client}</span>}
                <h3>{title}</h3>
                <p>{w.role}</p>
                {ACEV.has(w.code) && <AcevTag />}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
