import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Highlight } from "@/components/ui/Highlight";
import { PilotStory } from "./PilotStory";
import { Lightning } from "@/components/ui/icons";

export function PilotProfile() {
  const { bio, identity } = site;

  return (
    <section className="section-paper relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-1/3 translate-x-1/3 rounded-full border border-ink/6"
        aria-hidden="true"
      />
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h1 className="max-w-lg font-display text-[clamp(2.7rem,5.4vw,4.6rem)] uppercase leading-[0.92]">
                <Highlight text={bio.heading} />
              </h1>
            </Reveal>

            <Reveal delay={120} className="mt-9">
              <figure className="clip-corner relative overflow-hidden bg-ink">
                <SmartImage
                  src={bio.photo || identity.actionImage}
                  alt={`${identity.pilotName} en piste lors d'une course de karting`}
                  className="aspect-16/10 w-full md:aspect-4/3"
                  imgClassName="contrast-105 transition duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-paper">
                  <div>
                    <div className="label-mono text-[8px] text-volt">En course · Saison 2026</div>
                    <div className="mt-1 text-sm font-semibold">Pilote ambitieux et résilient</div>
                  </div>
                  <Lightning filled className="h-5 w-5 text-volt" />
                </figcaption>
              </figure>
              <div className="mt-3 flex items-center justify-between gap-3 border-b border-ink/15 pb-3"/>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/palmares" className="group bg-ink p-4 text-paper transition-colors hover:bg-carbon">
                  <div className="flex items-start justify-between text-volt">
                    <Lightning filled className="h-3.5 w-3.5" />
                    <span className="label-mono text-[8px] text-paper/35">{identity.season}</span>
                  </div>
                  <div className="mt-4 font-display text-[22px] uppercase leading-[0.95]">
                    Le programme
                    <br />
                    complet
                  </div>
                  <div className="label-mono mt-3 flex items-center gap-1.5 text-[8px] text-paper/45 group-hover:text-volt">
                    Voir le calendrier
                    <span aria-hidden="true">↗</span>
                  </div>
                </Link>
                <div className="border border-ink/20 p-4">
                  <div className="label-mono text-[8px] text-ink/35">Dernier résultat</div>
                  <div className="mt-2 font-display text-4xl leading-none">{bio.lastResult || "À venir"}</div>
                  {bio.lastResultDetail && (
                    <div className="mt-2 text-[10px] leading-snug text-ink/45">{bio.lastResultDetail}</div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <blockquote className="relative border-l-2 border-volt pl-5 md:pl-7">
                <Lightning filled className="mb-3 h-4 w-4 text-ink/30" />
                <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-ink/85 md:text-[17px]">
                  {bio.quote}
                </p>
              </blockquote>
            </Reveal>

            <PilotStory title={bio.storyTitle} paragraphs={bio.paragraphs} />

            <Reveal delay={100} className="mt-10">
              <dl className="grid grid-cols-2 gap-x-6">
                {bio.facts.map((fact) => (
                  <div key={fact.label} className="border-t border-ink/15 py-3">
                    <dt className="label-mono text-[9px] text-ink/40">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <div className="label-mono mb-5 flex items-center gap-3 text-[9px] text-volt">
                <span className="h-0.5 w-7 bg-volt" />
                Ma méthode
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {bio.values.map((value, index) => (
                  <div key={value.title} className="border-t-2 border-ink pt-4">
                    <div className="label-mono text-[9px] text-ink/35">0{index + 1}</div>
                    <h2 className="mt-2 font-display text-xl text-volt uppercase leading-none">{value.title}</h2>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/60">{value.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
} 
