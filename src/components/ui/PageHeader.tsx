import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** En-tête commun aux pages intérieures : grand titre + texte d'accroche optionnel. */
export function PageHeader({
  title,
  aside,
  className,
}: {
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <Reveal className="lg:col-span-7">
        <h1 className="font-display text-[clamp(2.8rem,6.4vw,5.6rem)] uppercase leading-[0.9]">{title}</h1>
      </Reveal>
      {aside && (
        <Reveal delay={100} className="lg:col-span-5">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
