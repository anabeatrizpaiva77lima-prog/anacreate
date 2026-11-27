import { CONTACT } from "@/lib/data";
import { Icon } from "./Icons";

export function Contato() {
  return (
    <section className="band contato" id="contato">
      <div className="wrap">
        <Icon name="burst" className="burst2" />
        <h2 className="big">Bora criar?</h2>
        <p className="lead">Campanha, conteúdo, estratégia ou aquela ideia que ainda não tem nome. Me chama.</p>
        <div className="relative flex flex-wrap justify-center gap-4">
          <a className="btn" href={CONTACT.whatsapp} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a className="btn bg-cream" href={CONTACT.instagram} target="_blank" rel="noopener">
            Instagram
          </a>
          <a className="btn" href={`mailto:${CONTACT.email}`}>
            E-mail
          </a>
          <small className="mt-3.5 block w-full opacity-80">
            {CONTACT.phone} · {CONTACT.handle} · {CONTACT.email}
          </small>
        </div>
      </div>
    </section>
  );
}
