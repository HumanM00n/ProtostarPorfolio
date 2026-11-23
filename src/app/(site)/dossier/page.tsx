import type { Metadata } from "next";
import { site } from "@/data/site";
import { DeckDocument } from "@/features/deck/DeckDocument";

export const metadata: Metadata = {
  title: "Dossier de partenariat",
  description: `Dossier de partenariat ${site.identity.season.toLowerCase()} de ${site.identity.pilotName} : parcours, palmarès, programme et formules. Imprimable en PDF.`,
};

export default function DossierPage() {
  return (
    <section className="section-dark py-10 md:py-16">
      <div className="wrap">
        <div className="no-print mx-auto mb-5 flex max-w-230">
          <p className="label-mono text-[9px] text-paper/45">
            Astuce : « Imprimer / PDF » puis « Enregistrer au format PDF » pour télécharger le dossier.
          </p>
        </div>
        <div className="mx-auto max-w-230 border border-paper/15 shadow-2xl">
          <DeckDocument />
        </div>
      </div>
    </section>
  );
}
