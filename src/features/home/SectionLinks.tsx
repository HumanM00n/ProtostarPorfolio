import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

/** Accroches de la page d'accueil vers chaque page du site. */
const teasers: Record<string, string> = {
  "/pilote": "Parcours, méthode et ambitions : qui se cache derrière le casque.",
  "/palmares": "Six saisons de résultats et le calendrier complet de 2026.",
  "/en-piste": "Le paddock, les départs, les réglages : la saison en images.",
  "/partenaires": "Trois formules pour associer votre marque à une trajectoire.",
  "/contact": "Un projet, une question ? Réponse personnelle sous 48 h.",
};

export function SectionLinks() {
  return (
    <section className="section-paper py-20 md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2.6rem,5.6vw,4.8rem)] uppercase leading-[0.9]">
              Le projet,
              <br />
              <span className="text-ink/35">tour par tour.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {navLinks.map((link, index) => (
            <Reveal key={link.href} delay={index * 60} className="flex">
              <Link
                href={link.href}
                className="group flex min-h-[220px] w-full flex-col justify-between bg-paper p-5 transition-colors hover:bg-ink hover:text-paper"
              >
                <div className="flex items-start justify-between">
                  <span className="label-mono text-[9px] text-volt">0{index + 1}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-display text-[28px] uppercase leading-none">{link.label}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed opacity-60">{teasers[link.href]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
