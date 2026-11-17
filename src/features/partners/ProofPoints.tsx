import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Flag, Gauge, Lightning } from "@/components/ui/icons";

const proofPoints = [
  {
    icon: Gauge,
    title: "Visibilité réelle",
    text: "Un logo sur le kart, mais aussi des contenus réguliers : photos, vidéos, stories et retours de course.",
    label: "Toute la saison",
  },
  {
    icon: Lightning,
    title: "Une histoire authentique",
    text: "Vous accompagnez une progression, pas une image figée. Le récit se construit course après course.",
    label: "6 saisons de récit",
  },
  {
    icon: Flag,
    title: "Une formule sur mesure",
    text: "Du coup de pouce local au partenariat principal, on ajuste la visibilité et le budget à vos objectifs.",
    label: "Dès 500 €",
  },
];

export function ProofPoints() {
  return (
    <div className="mt-14 grid gap-6 border-y border-ink/15 py-8 md:grid-cols-3 md:gap-0">
      {proofPoints.map((point, index) => {
        const Icon = point.icon;
        return (
          <Reveal
            key={point.title}
            delay={index * 80}
            className={cn("md:px-7", index > 0 && "md:border-l md:border-ink/15", index === 0 && "md:pl-0")}
          >
            <div className="flex items-start justify-between gap-3">
              <Icon className="h-5 w-5 text-ink" />
              <span className="label-mono text-[8px] text-ink/35">{point.label}</span>
            </div>
            <h2 className="mt-4 font-display text-xl uppercase leading-none">{point.title}</h2>
            <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-ink/60">{point.text}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
