import type { CalendarItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { CalendarDays } from "@/components/ui/icons";

export function SeasonCalendar({ season, races }: { season: string; races: CalendarItem[] }) {
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
        {races.map((race, index) => (
          <li
            key={race.id}
            className={cn("flex items-center gap-3 border-b border-paper/[0.07] py-3.5", index === 0 && "bg-volt/4.5")}
          >
            <div className="w-14 shrink-0">
              <div className={cn("label-mono text-[9px]", index === 0 ? "text-volt" : "text-paper/45")}>{race.date}</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-medium text-paper/85">{race.event}</div>
              <div className="mt-0.5 text-[10.5px] text-paper/35">{race.circuit}</div>
            </div>
            {index === 0 && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-label="Prochaine course" />}
          </li>
        ))}
      </ol>
      <div className="mt-4 border border-volt/25 bg-volt/6 p-3.5">
        <div className="label-mono text-[8px] text-paper/40">Objectif de saison</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-3xl uppercase leading-none text-volt">Top 5</span>
          <span className="text-[11px] text-paper/55">national IAME</span>
        </div>
      </div>
    </div>
  );
}
