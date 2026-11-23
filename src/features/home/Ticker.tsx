import { Lightning } from "@/components/ui/icons";

const items = ["Discipline", "Travail", "Resilience ", "Ambition ", "Audace"];

export function Ticker() {
  const group = items.map((item) => (
    <span key={item} className="flex items-center gap-7 px-7">
      <span>{item}</span>
      <Lightning filled className="h-3.5 w-3.5 opacity-90" />
    </span>
  ));

  return (
    <div className="marquee border-y border-ink bg-volt py-3 text-ink" aria-label={items.join(", ")}>
      <div className="marquee-track font-display text-lg uppercase tracking-[0.02em] md:text-xl">
        <div className="flex shrink-0 items-center">{group}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
}
