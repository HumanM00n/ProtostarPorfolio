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
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full border border-ink/5"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <PageHeader
          title={
            <>
              <span className="text-ink/70">Mon <span className="text-volt/70">histoire</span></span>
              <br />
              <span className="text-ink/80">Votre <span className="text-volt/80">marque</span></span>
              <br />
              <span className="text-ink">Notre <span className="text-volt">projet</span></span>
            </>
          }
          aside={
            <>
              <p className="max-w-md text-sm leading-relaxed text-ink/65 md:text-[15px]">
              Un partenariat, c’est donner du sens à une collaboration. Je ne dispose pas encore du statut de micro-entrepreneur ni d’une association sportive, 
              mais une alternative simple existe : le sponsoring en nature.

              <br />
              <br />

              L’entreprise fournit directement au pilote du matériel ou des équipements, sans transaction monétaire. En contrepartie, 
              le pilote s’engage à promouvoir la marque selon les modalités convenues.  
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {/* Au survol : un aplat rouge balaie le bouton de gauche à droite. */}
                <Button
                  href="/dossier"
                  variant="dark"
                  className="relative overflow-hidden px-4 py-3 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-volt before:transition-transform before:duration-300 before:ease-out hover:border-volt hover:shadow-[0_8px_24px_-8px_rgba(255,30,45,0.6)] hover:before:scale-x-100 hover:-translate-y-0.5 *:relative"
                >
                  Télécharger le dossier de sponsoring
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
