import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { ArrowUpRight, Lightning, SocialIcon } from "@/components/ui/icons";

export function Footer() {
  const { identity, socials, contact } = site;
  const instagram = socials.find((social) => social.label.toLowerCase().includes("insta"));
  // Année tirée des données (pas de new Date() : la page reste entièrement statique).
  const year = identity.season.replace(/\D/g, "");

  return (
    <footer className="section-dark no-print relative overflow-hidden border-t border-paper/10">
      <div className="wrap relative z-10 pt-14">
        <div className="grid gap-10 border-b border-paper/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 -rotate-3 items-center justify-center bg-volt text-ink">
                <Lightning filled className="h-4 w-4" />
              </span>
              <span className="font-display text-2xl uppercase tracking-[0.04em]">{identity.brand}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-paper/45">
              {identity.pilotName} · pilote de karting. Un projet sportif construit avec des marques qui
              aiment aller vite.
            </p>
            <div className="label-mono mt-5 inline-flex items-center gap-2 border border-paper/15 px-3 py-2 text-[8px] text-paper/55">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              Partenariats {year} ouverts
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="label-mono mb-4 text-[8px] text-paper/30">Navigation</div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-paper/65 transition-colors hover:text-volt">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dossier" className="text-[13px] text-paper/65 transition-colors hover:text-volt">
                  Dossier sponsor
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="label-mono mb-4 text-[8px] text-paper/30">Sur les réseaux</div>
            <div className="space-y-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-paper/10 py-2.5 text-[12.5px] text-paper/65 transition-colors hover:text-volt"
                >
                  <span className="flex items-center gap-2.5">
                    <SocialIcon label={social.label} className="h-3.5 w-3.5" />
                    {social.label}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] text-paper/30 group-hover:text-volt">
                    {social.handle}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-paper/65 transition-colors hover:text-volt"
            >
              {contact.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="label-mono text-[8px] leading-relaxed text-paper/25">
            © {year} {identity.brand} — Tous droits réservés · Photographies d’illustration
          </p>
          <div className="flex items-center gap-5">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="label-mono flex items-center gap-1.5 text-[8px] text-paper/35 transition-colors hover:text-volt"
              >
                <SocialIcon label="instagram" className="h-3 w-3" />
                {instagram.handle}
              </a>
            )}
            <a
              href="#top"
              className="label-mono flex items-center gap-1.5 text-[8px] text-paper/35 transition-colors hover:text-volt"
            >
              Retour en haut
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative -mb-3 flex w-full items-end justify-center overflow-hidden px-2 md:-mb-6">
        <span className="outline-neon whitespace-nowrap font-display text-[clamp(3.4rem,17vw,15rem)] uppercase leading-[0.78] tracking-[-0.01em]">
          {identity.brand}
        </span>
      </div>
    </footer>
  );
}
