"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { site } from "@/data/site";
import { sendMail } from "@/lib/email";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  TURNSTILE_FIELD,
  type ContactField,
  type ContactState,
} from "./contact-state";

/** Un humain met plus de 3 s à remplir le formulaire ; un bot, non. */
const MIN_FILL_MS = 3000;

const RATE_RULES = {
  perIp: [
    { id: "contact-ip-10m", limit: 3, windowSeconds: 10 * 60 },
    { id: "contact-ip-24h", limit: 10, windowSeconds: 24 * 60 * 60 },
  ],
  global: [{ id: "contact-global-24h", limit: 100, windowSeconds: 24 * 60 * 60 }],
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
// Caractères de contrôle (dont \r et \n) : interdits dans les champs d'une ligne.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

/** On ne stocke jamais l'IP en clair dans les compteurs. */
function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

const genericError = (message: string): ContactState => ({ status: "error", message });

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // 1. Honeypot : champ invisible pour un humain. Rempli → bot. On simule un succès.
  if (text(formData, HONEYPOT_FIELD)) return { status: "success" };

  // 2. Délai minimum entre l'affichage du formulaire et l'envoi.
  const startedAt = Number(text(formData, STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return genericError("Le formulaire n'a pas pu être vérifié. Rechargez la page puis réessayez.");
  }
  if (Date.now() - startedAt < MIN_FILL_MS) {
    return genericError("Envoi trop rapide. Patientez quelques secondes puis réessayez.");
  }

  // 3. Validation stricte côté serveur (le navigateur peut être contourné).
  const fields = {
    name: text(formData, "name"),
    structure: text(formData, "structure"),
    email: text(formData, "email"),
    tier: text(formData, "tier"),
    message: text(formData, "message"),
  };
  const allowedTiers = new Set(["", "Sur mesure", ...site.tiers.map((tier) => tier.name)]);
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (!fields.name) fieldErrors.name = "Indiquez votre nom.";
  else if (fields.name.length > CONTACT_LIMITS.name || CONTROL_CHARS.test(fields.name))
    fieldErrors.name = "Nom invalide.";

  if (fields.structure.length > CONTACT_LIMITS.structure || CONTROL_CHARS.test(fields.structure))
    fieldErrors.structure = "Nom de structure invalide.";

  if (!EMAIL_RE.test(fields.email) || fields.email.length > CONTACT_LIMITS.email)
    fieldErrors.email = "Adresse e-mail invalide.";

  if (!allowedTiers.has(fields.tier)) fieldErrors.tier = "Formule inconnue.";

  if (fields.message.length < CONTACT_LIMITS.message.min)
    fieldErrors.message = `Votre message doit faire au moins ${CONTACT_LIMITS.message.min} caractères.`;
  else if (fields.message.length > CONTACT_LIMITS.message.max)
    fieldErrors.message = `Votre message dépasse ${CONTACT_LIMITS.message.max} caractères.`;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Certains champs sont à corriger.", fieldErrors };
  }

  // 4. Rate limit : par IP, puis plafond global pour protéger la boîte mail.
  const ip = await clientIp();
  const perIp = await rateLimit(hashIp(ip ?? "unknown"), RATE_RULES.perIp);
  if (!perIp.allowed) {
    return genericError("Vous avez envoyé plusieurs messages récemment. Réessayez un peu plus tard.");
  }
  const global = await rateLimit("all", RATE_RULES.global);
  if (!global.allowed) {
    return genericError("Le formulaire est temporairement saturé. Réessayez demain ou écrivez-moi directement.");
  }

  // 5. Vérification anti-bot Cloudflare Turnstile.
  if (!(await verifyTurnstile(text(formData, TURNSTILE_FIELD), ip))) {
    return genericError("La vérification anti-robot a échoué. Réessayez.");
  }

  // 6. Envoi (texte brut uniquement : aucune injection HTML possible).
  const subject = `Contact site — ${fields.name}${fields.structure ? ` (${fields.structure})` : ""}`;
  const body = [
    `Nom : ${fields.name}`,
    `Structure : ${fields.structure || "—"}`,
    `Email : ${fields.email}`,
    `Formule envisagée : ${fields.tier || "à discuter"}`,
    "",
    fields.message,
  ].join("\n");

  const sent = await sendMail({
    to: process.env.CONTACT_TO_EMAIL ?? site.contact.email,
    replyTo: fields.email,
    subject,
    text: body,
  });

  return sent
    ? { status: "success" }
    : genericError("Le message n'a pas pu être envoyé. Réessayez ou écrivez-moi directement.");
}
