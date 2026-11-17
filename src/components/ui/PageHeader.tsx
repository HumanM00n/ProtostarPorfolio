import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/** En-tête commun aux pages intérieures : eyebrow numéroté, grand titre, texte d'accroche. */
export function PageHeader({
  index,
  eyebrow,
  title,
  aside,
  tone = "light",
  className,
}: {
  index: string;
  eyebrow: ReactNode;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <Reveal className="lg:col-span-7">
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,6.4vw,5.6rem)] uppercase leading-[0.9]">
          {title}
        </h1>
      </Reveal>
      {aside && (
        <Reveal delay={100} className="lg:col-span-5">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
