import type { BestLap, PalmaresItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { Clock, MapPin } from "@/components/ui/icons";

/** Meilleur tour sur chaque piste roulée, avec le nombre de courses disputées dessus. */
export function BestLaps({ laps, races }: { laps: BestLap[]; races: PalmaresItem[] }) {
  if (laps.length === 0) return null;

  return (
    <div>
      <div className="flex items-end justify-between gap-4 border-b border-paper/10 pb-4">
        <div>
          <div className="label-mono text-[9px] text-volt">Chronos</div>
          <h2 className="mt-1 font-display text-3xl uppercase leading-none md:text-4xl">Meilleurs tours</h2>
        </div>
        <Clock className="h-5 w-5 text-paper/40" />
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {laps.map((lap) => {
          const raceCount = races.filter((race) => race.track === lap.track).length;
          return (
            <li key={lap.id} className="border border-paper/12 bg-carbon/70 p-5">
              <div className="label-mono flex items-center gap-1.5 text-[9px] text-paper/45">
                <MapPin className="h-3 w-3" />
                {lap.track}
              </div>
              <div
                className={cn(
                  "mt-3 font-display text-4xl uppercase leading-none tabular-nums",
                  lap.time ? "text-paper" : "text-paper/25",
                )}
              >
                {lap.time || "À venir"}
              </div>
              <div className="mt-3 text-[11px] text-paper/40">
                {lap.context || `${raceCount} course${raceCount > 1 ? "s" : ""} disputée${raceCount > 1 ? "s" : ""}`}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
