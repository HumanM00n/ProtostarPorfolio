import Link from "next/link";
import type { Partner } from "@/data/types";
import { ArrowUpRight, Lightning } from "@/components/ui/icons";

export function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label-mono text-[9px] text-ink/40">Le réseau</div>
          <h2 className="mt-1.5 font-display text-2xl uppercase leading-none">Ils m&apos;accompagnent cette saison</h2>
        </div>
        <span className="label-mono text-[8px] text-ink/35">0{partners.length} partenaires techniques</span>
      </div>
      <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 lg:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex min-h-[120px] flex-col justify-between border border-ink/10 bg-paper p-4 transition-colors hover:bg-white"
          >
            <Lightning filled className="h-3 w-3 text-ink/20" />
            <div>
              <div className="font-display text-[22px] uppercase leading-none">{partner.name}</div>
              <div className="label-mono mt-1.5 text-[8px] text-ink/40">{partner.kind}</div>
            </div>
          </div>
        ))}
        <Link
          href="/contact"
          className="group flex min-h-[120px] flex-col justify-between border border-volt bg-volt p-4 text-left text-ink"
        >
          <div className="flex w-full items-start justify-between">
            <Lightning filled className="h-3 w-3" />
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div>
            <div className="font-display text-[22px] uppercase leading-none">Votre marque ?</div>
            <div className="label-mono mt-1.5 text-[8px] opacity-60">Une place à prendre</div>
          </div>
        </Link>
      </div>
    </>
  );
}
