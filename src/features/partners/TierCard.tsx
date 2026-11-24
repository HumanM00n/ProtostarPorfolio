import Link from "next/link";
import type { Tier } from "@/data/types";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Check, Lightning } from "@/components/ui/icons";

/** Carte d'une formule. « Choisir » ouvre /contact avec la formule pré-sélectionnée. */
export function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const featured = tier.featured;

  return (
    <article
      className={cn(
        "relative flex w-full flex-col border p-5 md:p-6",
        featured ? "border-ink bg-ink text-paper shadow-[6px_6px_0_0_#ff1e2d]" : "border-ink/15 bg-paper",
      )}
    >
      {featured && (
        <span className="label-mono absolute -top-2.75 left-5 bg-volt px-2.5 py-1 text-[8px] text-ink">Recommandé</span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={cn("label-mono text-[8px]", featured ? "text-paper/40" : "text-ink/35")}>Formule 0{index + 1}</div>
          <h3 className="mt-1 font-display text-3xl uppercase leading-none">{tier.name}</h3>
        </div>
        <Lightning filled className={cn("h-4 w-4", featured ? "text-volt" : "text-ink/25")} />
      </div>
      <p className={cn("mt-2 text-[12.5px]", featured ? "text-paper/55" : "text-ink/55")}>{tier.tagline}</p>
      <div className="mt-5 flex items-baseline gap-1.5 border-t border-current/10 pt-4">
        <span className="font-display text-[42px] leading-none">{tier.price}</span>
        <span className={cn("label-mono text-[8px]", featured ? "text-paper/40" : "text-ink/40")}>{tier.period}</span>
      </div>
      <ul className="mb-6 mt-5 space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[12.5px] leading-snug">
            <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", featured ? "text-volt" : "text-ink/50")} />
            <span className={featured ? "text-paper/75" : "text-ink/70"}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?formule=${encodeURIComponent(tier.name)}`}
        className={cn(
          "label-mono group mt-auto flex items-center justify-between gap-2 border px-4 py-3 text-[10px] transition-colors",
          featured
            ? "border-volt bg-volt text-paper hover:border-paper hover:bg-paper hover:text-ink"
            : "border-ink/25 text-ink hover:bg-ink hover:text-paper",
        )}
      >
        Choisir {tier.name}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
