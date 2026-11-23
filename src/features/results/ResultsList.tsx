"use client";

import { useState } from "react";
import type { PalmaresItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { Lightning, MapPin } from "@/components/ui/icons";

const ALL = "Tous";

/** Liste du palmarès, filtrable par année (seule partie interactive de la page). */
export function ResultsList({ items }: { items: PalmaresItem[] }) {
  const years = Array.from(new Set(items.map((item) => item.year)));
  const [filter, setFilter] = useState(ALL);
  const filtered = items.filter((item) => filter === ALL || item.year === filter);

  return (
    <>
      <div className="hide-scrollbar mb-1 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrer par année">
        {[ALL, ...years].map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setFilter(year)}
            className={cn(
              "shrink-0 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
              filter === year
                ? "border-volt bg-volt text-ink"
                : "border-paper/15 text-paper/50 hover:border-paper/40 hover:text-paper",
            )}
            aria-pressed={filter === year}
          >
            {year}
          </button>
        ))}
      </div>

      <ul className="border-b border-paper/10">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="group grid grid-cols-[52px_1fr_auto] items-start gap-3 border-t border-paper/10 py-5 transition-colors hover:bg-paper/[0.035] md:grid-cols-[76px_1fr_auto] md:items-center md:gap-6 md:px-3"
          >
            <div className="font-display text-[26px] leading-none text-paper/30 transition-colors group-hover:text-volt md:text-[30px]">
              {item.year}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold leading-snug text-paper">
                {item.competition}
                {item.highlight && <Lightning filled className="h-3 w-3 text-volt" />}
              </div>
              <div className="label-mono mt-1 flex flex-wrap items-center gap-x-2 text-[9px] text-paper/35">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-paper/30" />
                  <span className="sr-only">Piste :</span>
                  {item.track}
                </span>
                {item.category && <span>· {item.category}</span>}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-volt md:hidden">{item.result}</div>
            </div>
            <span className="hidden justify-self-end border border-paper/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-paper/70 transition-colors group-hover:border-volt/50 group-hover:text-volt md:inline-flex">
              {item.result}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
