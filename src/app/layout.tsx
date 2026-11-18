import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const { identity } = site;
const year = identity.season.replace(/\D/g, "");

export const metadata: Metadata = {
  // À remplacer par le domaine définitif une fois branché sur Vercel.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${identity.brand} — Pilote de karting · Partenariats ${year}`,
    template: `%s · ${identity.brand}`,
  },
  description: `${identity.pilotName}, pilote de karting. Palmarès, saison ${year} et formules de partenariat pour associer votre marque à une trajectoire sportive authentique.`,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: identity.brand,
    title: `${identity.brand} — Pilote de karting · Partenariats ${year}`,
    description: `${identity.headlineA} ${identity.headlineB} Découvrez le parcours de ${identity.pilotName} et rejoignez le projet sportif de la saison ${year}.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="min-h-screen bg-ink">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-volt focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-ink"
        >
          Aller au contenu
        </a>
        <div id="top" />
        <Nav brand={identity.brand} support={site.support} />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
