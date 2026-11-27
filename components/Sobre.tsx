import { SKILLS } from "@/lib/data";
import { Icon } from "./Icons";
import { MeStack } from "./MeStack";

export function Sobre() {
  return (
    <section className="band sobre" id="sobre">
      <div className="wrap">
        <div>
          <h2 className="big">
            Oi, eu sou
            <br />a Ana.
          </h2>
          <p className="lead mt-7">
            Estou há 4 anos no marketing, a maior parte como social media e copywriter. Hoje sou líder de estratégia digital.
          </p>
          <p>
            Crio, escrevo, edito e filmo. Gosto de desenvolver campanha, de escrever e da conversa com o cliente. Lido bem com
            feedback, porque o que eu busco é o melhor para a marca e para quem está do outro lado.
          </p>
          <p>E não me acomodo: se existe um jeito mais criativo de fazer, eu vou atrás.</p>
        </div>
        <div className="side">
          <figure className="me">
            <MeStack />
            <figcaption>
              um pouco
              <br />
              sobre mim
            </figcaption>
            <Icon name="spark" className="mstar" />
          </figure>
          <div className="win">
            <div className="bar">
              <i />
              <i />
              <i />
              <em>~/ana/o-que-eu-faço</em>
            </div>
            <div className="desk">
              {SKILLS.map(([title, desc, color]) => (
                <div className="skill" tabIndex={0} key={title}>
                  <Icon name="folder" viewBox="0 0 120 92" style={{ color: `var(--color-${color})` }} />
                  <b>{title}</b>
                  <small>{desc}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
