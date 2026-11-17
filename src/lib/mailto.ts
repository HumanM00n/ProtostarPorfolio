type PartnershipMail = {
  to: string;
  name?: string;
  structure?: string;
  email?: string;
  tier?: string;
  message?: string;
};

/** Construit le lien mailto: pré-rempli pour une demande de partenariat. */
export function buildPartnershipMailto({ to, name, structure, email, tier, message }: PartnershipMail) {
  const subject = `Partenariat karting 2026${structure ? ` — ${structure}` : ""}`;
  const body = [
    "Bonjour,",
    "",
    message || "Je souhaite en savoir plus sur vos formules de partenariat.",
    "",
    `Structure : ${structure || "—"}`,
    `Nom : ${name || "—"}`,
    `Email : ${email || "—"}`,
    `Formule envisagée : ${tier || "à discuter"}`,
    "",
    "À bientôt,",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
