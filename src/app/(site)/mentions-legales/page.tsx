import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import legal from "@/content/legal.json";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Mentions légales & confidentialité",
  description: `Éditeur, hébergeur et traitement des données personnelles du site ${site.identity.brand}.`,
};

/** Contenu modifiable depuis le back-office (Mentions légales) ; champs vides tolérés. */
const info = {
  editorName: "",
  editorEmail: "",
  editorNote: "",
  retention: "",
  updatedAt: "",
  ...(legal as Partial<Record<string, string>>),
};

export default function MentionsLegalesPage() {
  const email = info.editorEmail || site.contact.email;
  const mail = (
    <a href={`mailto:${email}`} className="font-medium text-ink underline decoration-volt/50 underline-offset-4 hover:decoration-volt">
      {email}
    </a>
  );

  return (
    <section className="section-paper relative overflow-hidden py-20 md:py-28">
      <div className="wrap">
        <PageHeader
          title={
            <>
              Mentions légales
              <br />
              <span className="text-ink/35">& confidentialité.</span>
            </>
          }
          aside={
            <p className="max-w-md text-sm leading-relaxed text-ink/65 md:text-[15px]">
              Qui publie ce site, où il est hébergé, et ce qu’il advient des informations envoyées via le
              formulaire de contact.
              {info.updatedAt && <span className="mt-3 block text-[12px] text-ink/45">Mise à jour : {info.updatedAt}</span>}
            </p>
          }
        />

        <div className="mt-14 max-w-3xl space-y-12">
          <Block number="01" title="Éditeur du site">
            <p>
              Le site {site.identity.brand} est édité par <strong>{info.editorName || "[Prénom Nom]"}</strong>,
              responsable de la publication. Contact : {mail}.
            </p>
            {info.editorNote && <p>{info.editorNote}</p>}
            <p>
              Le pilote présenté sur ce site, {site.identity.pilotName}, est mineur ; le site est publié avec
              l’accord de ses représentants légaux.
            </p>
          </Block>

          <Block number="02" title="Hébergement">
            <p>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                vercel.com
              </a>
              .
            </p>
          </Block>

          <Block number="03" title="Propriété intellectuelle">
            <p>
              Les textes, photos, logos et visuels de ce site appartiennent à leurs auteurs. Toute reproduction sans
              autorisation est interdite. Les marques et logos des partenaires restent la propriété de leurs
              détenteurs.
            </p>
          </Block>

          <Block number="04" title="Données personnelles (formulaire de contact)">
            <Dl
              items={[
                ["Responsable", <>{info.editorName || "[Prénom Nom]"}, joignable à {mail}.</>],
                [
                  "Données collectées",
                  "Nom, structure (facultatif), adresse e-mail, formule envisagée et message. Aucune autre donnée n’est demandée.",
                ],
                [
                  "Finalité",
                  "Répondre à votre message et échanger sur un éventuel partenariat. Vos données ne sont ni vendues, ni utilisées pour de la prospection, ni ajoutées à une newsletter.",
                ],
                [
                  "Base légale",
                  "L’intérêt légitime à répondre aux demandes reçues et, pour un partenariat, les mesures préalables à la conclusion d’un contrat.",
                ],
                [
                  "Conservation",
                  `Le message est transmis par e-mail et n’est pas stocké sur le site. Les échanges sont conservés ${
                    info.retention || "3 ans à compter du dernier échange"
                  }, puis supprimés.`,
                ],
                [
                  "Sous-traitants",
                  <>
                    Vercel (hébergement), Resend (envoi de l’e-mail), Upstash (limitation du nombre d’envois : seule
                    une empreinte chiffrée de l’adresse IP est gardée, 24 h maximum) et Cloudflare Turnstile
                    (protection contre les robots). Certains de ces services sont situés aux États-Unis ; les
                    transferts sont encadrés par le Data Privacy Framework UE–États-Unis ou les clauses
                    contractuelles types de la Commission européenne.
                  </>,
                ],
              ]}
            />
          </Block>

          <Block number="05" title="Vos droits">
            <p>
              Vous pouvez accéder à vos données, les faire corriger ou supprimer, vous opposer à leur traitement ou
              en demander la limitation, en écrivant à {mail}. Une réponse vous est apportée dans un délai d’un
              mois.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la{" "}
              <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                CNIL
              </a>
              .
            </p>
          </Block>

          <Block number="06" title="Cookies">
            <p>
              Ce site n’utilise ni cookie publicitaire, ni outil de mesure d’audience. Seule la protection
              anti-robot de Cloudflare Turnstile peut déposer des éléments techniques, strictement nécessaires à la
              sécurité du formulaire : ils ne demandent pas de consentement.
            </p>
          </Block>

          <p className="border-t border-ink/15 pt-6 text-[13px] text-ink/55">
            Une question ? Passez par la{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-ink">
              page Contact
            </Link>{" "}
            ou écrivez à {mail}.
          </p>
        </div>
      </div>
    </section>
  );
}

function Block({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="label-mono flex items-center gap-3 text-[9px] text-volt">
        <span className="h-0.5 w-7 bg-volt" />
        {number}
      </div>
      <h2 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2rem)] uppercase leading-none">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/75">{children}</div>
    </Reveal>
  );
}

function Dl({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map(([term, description]) => (
        <div key={term} className="grid gap-1 py-3.5 sm:grid-cols-[170px_1fr] sm:gap-6">
          <dt className="label-mono pt-0.5 text-[9px] text-ink/45">{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}
