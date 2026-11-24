import { site } from "@/data/site";
import { Highlight } from "@/components/ui/Highlight";
import { telHref } from "@/lib/mailto";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRight, Check, Clock, Lightning, Mail, MapPin, Phone } from "@/components/ui/icons";
import { PrintButton } from "./PrintButton";

/**
 * Dossier de partenariat, généré depuis les données du site.
 * Mis en page pour l'écran et pour l'impression A4 (« Enregistrer en PDF »).
 */
export function DeckDocument() {
  const content = site;
  const { identity, contact, stats, palmares, tiers, calendar, socials, deck } = content;
  const highlights = palmares.slice(0, 5);

  return (
      <div className="deck-document bg-paper text-ink">
        <div className="no-print flex items-center justify-between gap-3 border-b border-ink/10 bg-ink px-5 py-2.5 text-paper">
          <span className="label-mono flex items-center gap-2 text-[8px] text-paper/60">
            <Lightning filled className="h-2.5 w-2.5 text-volt" />
            Document confidentiel · usage partenariat
          </span>
          <div className="flex items-center gap-2">
            <PrintButton className="label-mono flex items-center gap-1.5 bg-volt px-3 py-1.5 text-[8px] text-paper">
              Imprimer / PDF
            </PrintButton>
          </div>
        </div>

        <header className="relative overflow-hidden border-b border-ink/15 px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-ink/10" aria-hidden="true" />
          <div className="pointer-events-none absolute right-6 top-6 hidden md:block" aria-hidden="true">
            <Lightning filled className="h-16 w-16 text-volt" />
          </div>
          <div className="label-mono flex flex-wrap items-center gap-3 text-[8px] text-ink/40">
            <span>Dossier de partenariat</span>
            <span className="h-px w-8 bg-ink/25" />
            <span className="text-ink/70">{identity.season}</span>
          </div>
          <h1
            id="deck-title"
            className="mt-5 max-w-140 font-display text-[clamp(2.8rem,6vw,4.6rem)] uppercase leading-[0.88]"
          >
            {identity.brand}
            <span className="mt-1 block text-ink/35">Pilote de karting.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-ink/60">{deck.intro}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-widest text-ink/45">
            <span>#{identity.number}</span>
            <span>{identity.location}</span>
            {identity.license && <span>{identity.license}</span>}
          </div>
        </header>

        <div className="grid grid-cols-2 border-b border-ink/15 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-ink/15 px-4 py-4 md:px-6 ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index > 0 ? "md:border-l" : ""}`}
            >
              <div
                className={`whitespace-nowrap font-display leading-none ${stat.value.length > 4 ? "text-xl uppercase" : "text-3xl"}`}
              >
                {stat.value}
              </div>
              <div className="label-mono mt-1.5 text-[8px] text-ink/45">{stat.label}</div>
              <div className="mt-0.5 text-[9px] text-ink/30">{stat.detail}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 border-b border-ink/15 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-9">
          <div>
            <div className="label-mono flex items-center gap-2 text-[8px] text-ink/35">
              <span className="bg-ink px-1.5 py-0.5 text-volt">01</span>
              Le pilote
            </div>
            <h3 className="mt-3 font-display text-3xl uppercase leading-[0.95]"><Highlight text={content.bio.heading} /></h3>
            <div className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-ink/65">
              {content.bio.paragraphs.slice(0, 2).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-5 border-l-2 border-volt pl-4 text-[13px] font-medium italic leading-snug text-ink/80">
              « {content.bio.quote} »
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-5">
              {content.bio.facts.slice(0, 4).map((fact) => (
                <div key={fact.label} className="border-t border-ink/15 py-2">
                  <div className="label-mono text-[7px] text-ink/35">{fact.label}</div>
                  <div className="mt-0.5 text-[11px] font-semibold">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="print-keep">
            <SmartImage
              src={identity.portrait}
              alt={`${identity.pilotName}, pilote de karting`}
              className="aspect-4/5 w-full bg-ink"
              imgClassName="grayscale-[20%] contrast-105"
              sizes="(min-width: 768px) 360px, 100vw"
              priority
            />
            <div className="mt-3 bg-volt p-4 text-paper">
              <div className="flex items-start justify-between gap-2">
                <div className="label-mono text-[8px] opacity-60">Objectif 2026</div>
                <Lightning filled className="h-3.5 w-3.5" />
              </div>
              <div className="mt-1 font-display text-2xl uppercase leading-[0.95]">Top 5 national</div>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-paper/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em]">
                <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                Saison complète engagée
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-b border-ink/15 px-6 py-8 md:grid-cols-2 md:px-10 md:py-9">
          <section className="print-keep">
            <div className="label-mono flex items-center gap-2 text-[8px] text-ink/35">
              <span className="bg-ink px-1.5 py-0.5 text-volt">02</span>
              Palmarès sélectif
            </div>
            <div className="mt-3 border-b border-ink/10">
              {highlights.map((item) => (
                <div key={item.id} className="flex items-start gap-3 border-t border-ink/10 py-2.5">
                  <span className="w-9 shrink-0 font-display text-lg leading-none text-ink/30">{item.year}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-semibold leading-snug">{item.competition}</div>
                    <div className="text-[9.5px] text-ink/40">
                      {item.track}
                      {item.category ? ` · ${item.category}` : ""}
                    </div>
                  </div>
                  <span className="max-w-26.25 text-right font-mono text-[8.5px] leading-tight text-ink/65">
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[9px] text-ink/35">
              Détail complet et meilleurs chronos sur le site.
            </p>
          </section>

          <section className="print-keep">
            <div className="label-mono flex items-center gap-2 text-[8px] text-ink/35">
              <span className="bg-ink px-1.5 py-0.5 text-volt">03</span>
              Programme 2026
            </div>
            <div className="mt-3 border-b border-ink/10">
              {calendar.map((race) => (
                <div key={race.id} className="flex items-center gap-3 border-t border-ink/10 py-2.5">
                  <span className="w-12 shrink-0 font-mono text-[8.5px] uppercase tracking-[0.08em] text-ink/45">
                    {race.date}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium">{race.event}</div>
                    <div className="text-[9px] text-ink/35">{race.circuit}</div>
                  </div>
                  {race.result && (
                    <span className="shrink-0 font-mono text-[8.5px] uppercase text-ink/65">{race.result}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 border border-ink/15 p-3">
              <div className="label-mono text-[7px] text-ink/35">Ce que finance votre soutien</div>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink/60">
                Engagement sportif, jeux de pneus, déplacements, préparation physique et création de
                contenus tout au long de la saison.
              </p>
            </div>
          </section>
        </div>

        <section className="print-keep border-b border-ink/15 bg-ink px-6 py-8 text-paper md:px-10 md:py-9">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="label-mono flex items-center gap-2 text-[8px] text-paper/40">
                <span className="bg-volt px-1.5 py-0.5 text-ink">04</span>
                Les formules
              </div>
              <h3 className="mt-2 font-display text-3xl uppercase leading-none">Rouler avec moi.</h3>
            </div>
            <span className="label-mono text-[8px] text-paper/35">Montants indicatifs, hors options</span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`border p-4 ${tier.featured ? "border-volt bg-volt/6" : "border-paper/15"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-xl uppercase leading-none">{tier.name}</h4>
                  {tier.featured && <Lightning filled className="h-3 w-3 text-volt" />}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-2xl leading-none text-volt">{tier.price}</span>
                  <span className="label-mono text-[7px] text-paper/35">{tier.period}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {tier.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[9.5px] leading-snug text-paper/65">
                      <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-volt" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] leading-relaxed text-paper/35">{content.tierNote}</p>
        </section>

        <footer className="px-6 py-7 md:px-10 md:py-8">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <div className="label-mono text-[8px] text-ink/35">Prochaine étape</div>
              <h3 className="mt-2 font-display text-[clamp(1.9rem,4vw,3rem)] uppercase leading-[0.9]">
                Et si votre marque
                <br />
                <span className="text-ink/35">prenait le départ ?</span>
              </h3>
              <div className="no-print mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent("Partenariat karting 2026")}`}
                  className="label-mono inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[8px] text-paper transition-colors hover:bg-volt hover:text-paper"
                >
                  Discuter du partenariat
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="space-y-1.5 border-t border-ink/15 pt-4 text-[10px] md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-ink/70">
                <Mail className="h-3 w-3" />
                {contact.email}
              </a>
              <a href={telHref(contact.phone)} className="flex items-center gap-2 text-ink/70">
                <Phone className="h-3 w-3" />
                {contact.phone}
              </a>
              <div className="flex items-center gap-2 text-ink/50">
                <MapPin className="h-3 w-3" />
                {contact.city}
              </div>
              <div className="flex items-center gap-2 text-ink/50">
                <Clock className="h-3 w-3" />
                {contact.responseTime}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 border-t border-ink/10 pt-2">
                {socials.map((social) => (
                  <a key={social.id} href={social.url} className="text-[9.5px] text-ink/50 underline-offset-2 hover:underline">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 pt-3">
            <span className="label-mono text-[7px] text-ink/30">
              {identity.brand} · Dossier de partenariat {identity.season} · Photos d&apos;illustration
            </span>
            <span className="label-mono flex items-center gap-1 text-[7px] text-ink/30">
              Document généré depuis le site
              <Lightning filled className="h-2 w-2 text-volt-deep" />
            </span>
          </div>
        </footer>
      </div>
  );
}
