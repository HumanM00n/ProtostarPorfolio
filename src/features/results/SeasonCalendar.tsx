import type { CalendarItem, SiteContent } from "@/data/types";
import { cn } from "@/lib/cn";
import { CalendarDays, Check } from "@/components/ui/icons";

/** Première course sans résultat = prochaine course. */
export function nextRaceIndex(races: CalendarItem[]) {
  return races.findIndex((race) => !race.result);
}

export function SeasonCalendar({
  season,
  races,
  goal,
}: {
  season: string;
  races: CalendarItem[];
  goal: SiteContent["seasonGoal"];
}) {
  const next = nextRaceIndex(races);

  return (
    <div className="border border-paper/12 bg-carbon/90 p-5 md:p-6 lg:sticky lg:top-28">
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-4">
        <div>
          <div className="label-mono text-[9px] text-volt">Calendrier</div>
          <h2 className="mt-1 font-display text-2xl uppercase leading-none">{season}</h2>
        </div>
        <CalendarDays className="h-5 w-5 text-paper/40" />
      </div>
      <ol>
        {races.map((race, index) => {
          const done = Boolean(race.result);
          const isNext = index === next;
          return (
            <li
              key={race.id}
              className={cn("flex items-center gap-3 border-b border-paper/[0.07] py-3.5", isNext && "bg-volt/4.5")}
            >
              <div className="w-14 shrink-0">
                <div className={cn("label-mono text-[9px]", isNext ? "text-volt" : "text-paper/45")}>
                  {race.date || (done ? "Courue" : "À venir")}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className={cn("truncate text-[12.5px] font-medium", done ? "text-paper/60" : "text-paper/85")}>
                  {race.event}
                </div>
                <div className="mt-0.5 text-[10.5px] text-paper/35">{race.circuit}</div>
              </div>
              {done ? (
                <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase text-paper/60">
                  <Check className="h-3 w-3 text-volt" />
                  {race.result}
                </span>
              ) : (
                isNext && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-label="Prochaine course" />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 border border-volt/25 bg-volt/6 p-3.5">
        <div className="label-mono text-[8px] text-paper/40">Objectif de saison</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-3xl uppercase leading-none text-volt">{goal.value}</span>
          {goal.detail && <span className="text-[11px] text-paper/55">{goal.detail}</span>}
        </div>
      </div>
    </div>
  );
}
