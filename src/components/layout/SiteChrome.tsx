import type { ReactNode } from "react";
import { site } from "@/data/site";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** Habillage commun des pages publiques : lien d'évitement, navigation, contenu, pied de page. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-volt focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-ink"
      >
        Aller au contenu
      </a>
      <div id="top" />
      <Nav brand={site.identity.brand} support={site.support} />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
}
