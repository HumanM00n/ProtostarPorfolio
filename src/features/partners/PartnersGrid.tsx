import type { Partner } from "@/data/types";
import { Lightning } from "@/components/ui/icons";

/** Nombre de cases par ligne sur grand écran : la grille est complétée par des cases vides. */
const COLUMNS = 4;

export function PartnersGrid({ partners }: { partners: Partner[] }) {
  // « Votre marque ? » d'abord, puis les partenaires, puis des cases vides pour finir la ligne.
  const emptySlots = (COLUMNS - ((partners.length + 1) % COLUMNS)) % COLUMNS;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label-mono text-[9px] text-ink/40">Le réseau</div>
          <h2 className="mt-1.5 font-display text-2xl uppercase leading-none">Ils sont derrière moi cette saison</h2>
        </div>
        {partners.length > 0 && (
          <span className="label-mono text-[8px] text-ink/35">
            {String(partners.length).padStart(2, "0")} partenaire{partners.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 lg:grid-cols-4">
        <div className="flex min-h-30 flex-col justify-between border border-volt bg-volt p-4 text-ink">
          <Lightning filled className="h-3 w-3" />
          <div>
            <div className="font-display text-[22px] uppercase leading-none">Votre marque ?</div>
            <div className="label-mono mt-1.5 text-[8px] opacity-60">Une place à prendre</div>
          </div>
        </div>
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex min-h-30 flex-col justify-between border border-ink/10 bg-paper p-4 transition-colors hover:bg-white"
          >
            <Lightning filled className="h-3 w-3 text-ink/20" />
            <div>
              <div className="font-display text-[22px] uppercase leading-none">{partner.name}</div>
              <div className="label-mono mt-1.5 text-[8px] text-ink/40">{partner.kind}</div>
            </div>
          </div>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <div key={`vide-${index}`} className="min-h-30 border border-ink/10 bg-paper" aria-hidden="true">
            <Lightning filled className="m-4 h-3 w-3 text-ink/10" />
          </div>
        ))}
      </div>
    </>
  );
}
