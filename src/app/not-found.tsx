import Link from "next/link";
import { ArrowUpRight, Lightning } from "@/components/ui/icons";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
    <section className="section-dark grain relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <div className="label-mono flex items-center gap-2 text-volt">
          <Lightning filled className="h-3 w-3" />
          Erreur 404
        </div>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.88]">
          Sortie de piste.
          <br />
          <span className="text-volt">Cette page n&apos;existe pas.</span>
        </h1>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-3 bg-volt px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Retour aux stands
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
    </SiteChrome>
  );
}
