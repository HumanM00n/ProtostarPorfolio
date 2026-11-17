import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PartnersGrid } from "@/features/partners/PartnersGrid";
import { ProofPoints } from "@/features/partners/ProofPoints";
import { TierCard } from "@/features/partners/TierCard";

export const metadata: Metadata = {
  title: "Partenaires",
  description: `Formules de partenariat ${site.identity.season.toLowerCase()} : visibilité sur le kart, contenus et activation. Dès ${site.tiers[0]?.price}.`,
};

export default function PartenairesPage() {
  return (
    <section className="section-paper relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full border border-ink/[0.05]"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <PageHeader
          index="04"
          eyebrow="Partenariat"
          tone="dark"
          title={
            <>
              Votre marque.
              <br />
              <span className="text-ink/35">Ma trajectoire.</span>
            </>
          }
          aside={
            <>
              <p className="max-w-md text-sm leading-relaxed text-ink/65 md:text-[15px]">
                Un partenariat karting, ce n&apos;est pas qu&apos;un autocollant. C&apos;est une association entre
                votre entreprise et une saison de sport, de contenu et de rencontres. Voici comment on peut rouler
                ensemble.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/dossier" variant="dark" className="px-4 py-3">
                  Voir le dossier
                </Button>
                <Button href="/contact" variant="ghost" className="px-4 py-3">
                  En parler
                </Button>
              </div>
            </>
          }
        />

        <ProofPoints />

        <div className="mt-14">
          <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="label-mono text-[9px] text-ink/40">Les formules</div>
              <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3rem)] uppercase leading-none">
                Trois façons de rouler avec moi.
              </h2>
            </div>
            <p className="max-w-sm text-[12px] leading-relaxed text-ink/50">{site.tierNote}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {site.tiers.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 80} className="flex">
                <TierCard tier={tier} index={index} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 border-t border-ink/15 pt-8">
          <PartnersGrid partners={site.partners} />
        </Reveal>
      </div>
    </section>
  );
}
