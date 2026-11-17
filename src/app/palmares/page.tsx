import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Trophy } from "@/components/ui/icons";
import { ResultsList } from "@/features/results/ResultsList";
import { SeasonCalendar } from "@/features/results/SeasonCalendar";

export const metadata: Metadata = {
  title: "Palmarès",
  description: `Résultats de ${site.identity.pilotName} depuis ${site.identity.since} et calendrier de la ${site.identity.season.toLowerCase()}.`,
};

export default function PalmaresPage() {
  return (
    <section className="section-dark relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute right-0 top-20 h-[520px] w-[520px] translate-x-1/3 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(255,30,45,0.09) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="wrap relative">
        <PageHeader
          title={
            <>
              Les résultats
              <br />
              <span className="text-volt">parlent.</span>
            </>
          }
          aside={
            <div className="flex items-start gap-3 border-l border-paper/15 pl-5">
              <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
              <p className="text-sm leading-relaxed text-paper/55">
                Six saisons de compétition, des podiums en régional comme en national, et une progression
                constante au chrono.
              </p>
            </div>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-8">
            <ResultsList items={site.palmares} />
          </Reveal>
          <Reveal delay={150} className="lg:col-span-4">
            <SeasonCalendar season={site.identity.season} races={site.calendar} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
