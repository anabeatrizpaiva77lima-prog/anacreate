import { Fragment } from "react";
import { MARQUEE } from "@/lib/data";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marq" aria-hidden="true">
      <div className="row">
        {items.map((t, i) => (
          <Fragment key={i}>
            <span>{t}</span>
            <span>✱</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
