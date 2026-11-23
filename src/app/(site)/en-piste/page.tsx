import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRight, Instagram } from "@/components/ui/icons";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "En piste",
  description: `La saison de ${site.identity.pilotName} en images : départs, paddock, réglages et coulisses.`,
};

export default function EnPistePage() {
  const instagram = site.socials.find((social) => social.label.toLowerCase().includes("insta"));

  return (
    <section className="section-paper relative overflow-hidden py-20 md:py-28">
      <div className="wrap">
        <PageHeader
          title={
            <>
              Votre Pilote,
              <br />
              En Photo<span className="text-ink/30">.</span>
            </>
          }
          aside={
            <div className="max-w-sm">
              <p className="text-sm leading-relaxed text-ink/60">
                Les vendredis de roulage, les départs, les réglages, les gens du paddock. La saison se raconte
                aussi en images.
              </p>
              {instagram && (
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono mt-4 urlinline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[10px] text-ink transition-colors hover:border-volt hover:text-ink/60"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  {instagram.handle}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          }
        />

        <GalleryGrid images={site.gallery} />

        <Reveal delay={100} className="mt-14">
          <div className="relative overflow-hidden bg-ink">
            <SmartImage
              src={site.identity.actionImage}
              alt="Karting en pleine vitesse sur la piste"
              className="absolute inset-0 h-full w-full"
              imgClassName="opacity-35 grayscale-[40%]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/20" aria-hidden="true" />
            <div className="relative z-10 flex flex-col justify-between gap-6 p-6 text-paper md:flex-row md:items-end md:p-10">
              <div>
                <div className="label-mono text-[9px] text-volt">Le récit d&apos;une saison</div>
                <p className="mt-3 max-w-xl text-xl font-medium leading-snug md:text-[28px]">{site.deck.objectives}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
