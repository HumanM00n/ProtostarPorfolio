"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { ContactForm } from "./ContactForm";

/**
 * Lit ?formule=… (envoyé depuis la page Partenaires) pour pré-sélectionner la formule.
 * Doit être rendu dans un <Suspense> : la page reste statique, seul ce bloc lit l'URL.
 */
export function ContactFormFromQuery(props: Omit<ComponentProps<typeof ContactForm>, "initialTier">) {
  const requested = useSearchParams().get("formule") ?? "";
  const known = props.tiers.some((tier) => tier.name === requested) || requested === "Sur mesure";

  return <ContactForm key={requested} {...props} initialTier={known ? requested : ""} />;
}
