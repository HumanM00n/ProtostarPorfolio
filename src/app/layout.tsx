import type { Metadata, Viewport } from "next";
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
      <body className="min-h-screen bg-ink">{children}</body>
    </html>
  );
}
