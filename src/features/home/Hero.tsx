import Link from "next/link";
import { site } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowDown, ArrowUpRight, Headphones, Lightning, SpinnerMark } from "@/components/ui/icons";

export function Hero() {
  const { identity, stats, calendar } = site;
  const nextRace = calendar[0];

  return (
    <section className="grain relative overflow-hidden bg-ink text-paper">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="scratches pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full border border-paper/[0.06]"
        aria-hidden="true"
      />
      <div
        className="halftone pointer-events-none absolute -bottom-10 -right-10 hidden h-[420px] w-[420px] opacity-80 md:block"
        aria-hidden="true"
      />

      {identity.monogram && (
        <div
          className="neon-stroke pointer-events-none absolute -top-4 right-[2%] z-0 hidden select-none font-serif text-[clamp(7rem,15vw,13rem)] font-semibold italic leading-none md:block"
          aria-hidden="true"
        >
          {identity.monogram}
        </div>
      )}

      <Headphones className="pointer-events-none absolute -left-8 bottom-16 z-0 hidden h-40 w-40 -rotate-6 text-volt/40 drop-shadow-[0_0_14px_rgba(255,30,45,0.45)] lg:block" />
      <Lightning
        filled
        className="pointer-events-none absolute right-[30%] top-20 z-0 hidden h-16 w-16 rotate-12 text-volt/80 drop-shadow-[0_0_18px_rgba(255,30,45,0.6)] lg:block"
      />

      <div className="wrap relative z-10 pb-10 pt-6 md:pb-14 md:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper/10 pb-5">
          <div className="label-mono flex items-center gap-2.5 text-volt">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
            </span>
            {identity.season} — En piste
          </div>
          <div className="label-mono hidden items-center gap-6 text-[9px] text-paper/35 md:flex">
            <span>IAME Series France</span>
            <span className="h-3 w-px bg-paper/20" />
            <span>45.76° N / 4.83° E</span>
            <span className="h-3 w-px bg-paper/20" />
            <span className="text-paper/60">#{identity.number}</span>
          </div>
        </div>

        <div className="grid gap-12 pt-9 lg:grid-cols-12 lg:gap-10 lg:pt-12">
          <div className="lg:col-span-7">
            <div className="label-mono flex items-center gap-2 text-paper/55">
              <Lightning filled className="h-3 w-3 text-volt" />
              {identity.kicker}
            </div>

            <h1 className="mt-5 font-display text-[clamp(3.1rem,7.6vw,6.7rem)] uppercase leading-[0.88] tracking-[-0.005em]">
              <span className="block">{identity.headlineA}</span>
              <span className="glow-soft mt-1 block text-volt">{identity.headlineB}</span>
            </h1>

            <div className="mt-7 grid gap-6 border-l border-paper/15 pl-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-[15px] leading-relaxed text-paper/65 md:text-base">{identity.intro}</p>
              <div className="hidden shrink-0 border border-paper/15 p-3.5 text-center sm:block">
                <div className="label-mono text-[8px] text-paper/40">Objectif</div>
                <div className="mt-1 font-display text-2xl uppercase leading-none text-volt">Podium</div>
                <div className="label-mono mt-1 text-[8px] text-paper/40">National 2026</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/partenaires"
                className="group inline-flex items-center gap-3 bg-volt px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                Devenir partenaire
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/dossier"
                className="group inline-flex items-center gap-3 border border-paper/25 px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:border-volt hover:text-volt"
              >
                Le dossier 2026
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-px border-y border-paper/10 bg-paper/10 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className="bg-ink px-3 py-4 first:pl-0 sm:px-4">
                  <div className="font-display text-[34px] leading-none text-paper md:text-[38px]">{stat.value}</div>
                  <div className="label-mono mt-2 text-[9px] text-volt">{stat.label}</div>
                  <div className="mt-0.5 text-[10px] leading-tight text-paper/35">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[420px] pb-8 pl-6 pr-4 sm:pb-10 sm:pl-10 lg:max-w-none">
              <div className="pointer-events-none absolute left-0 top-8 hidden h-32 w-px bg-volt/60 lg:block" aria-hidden="true" />
              <div className="pointer-events-none absolute left-0 top-40 hidden origin-left translate-y-12 -rotate-90 whitespace-nowrap pl-1 lg:block">
                <span className="label-mono text-[8px] text-paper/30">Portrait — Paddock 2025</span>
              </div>

              <div className="clip-slant relative aspect-[4/5] overflow-hidden border-[3px] border-white bg-carbon shadow-[0_0_70px_rgba(255,30,45,0.28)]">
                <SmartImage
                  src={identity.portrait}
                  alt={`${identity.pilotName}, pilote de karting, prêt pour la course`}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="contrast-110 grayscale-[18%] transition duration-700 hover:scale-[1.03] hover:grayscale-0"
                  sizes="(min-width: 1024px) 40vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" aria-hidden="true" />

                <div className="absolute left-4 top-4 flex items-center gap-2 border border-paper/20 bg-ink/55 px-2.5 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                  <span className="label-mono text-[8px] text-paper/80">
                    {identity.category} · #{identity.number}
                  </span>
                </div>

                <div className="absolute inset-x-4 bottom-10 flex items-end justify-between gap-3">
                  <div>
                    <div className="label-mono mb-2 text-[8px] text-paper/50">{identity.role}</div>
                    <div className="glow-soft font-display text-4xl uppercase leading-none text-paper sm:text-5xl">
                      {identity.pilotName}
                    </div>
                  </div>
                  <div className="glow-red font-display text-6xl leading-none text-volt sm:text-7xl">#{identity.number}</div>
                </div>
              </div>

              {nextRace && (
                <div className="relative -mt-5 ml-auto mr-1 flex w-[82%] items-center justify-between gap-3 border border-volt/50 bg-volt px-3.5 py-3 text-ink sm:mr-3">
                  <div>
                    <div className="label-mono text-[8px] opacity-70">Prochaine course</div>
                    <div className="mt-0.5 text-sm font-bold">
                      {nextRace.date.toLowerCase()} · {nextRace.circuit}
                    </div>
                  </div>
                  <Link
                    href="/palmares"
                    className="flex h-8 w-8 items-center justify-center border border-ink/25"
                    aria-label="Voir le calendrier"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              <SpinnerMark
                text={`${identity.brand} · Karting · ${identity.season} · ${identity.brand} · Karting ·`}
                className="spin-slow absolute -top-9 right-0 hidden h-24 w-24 text-volt/80 sm:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
