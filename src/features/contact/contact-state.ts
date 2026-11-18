/** Partagé client / serveur : état renvoyé par l'action d'envoi et limites des champs. */

export const CONTACT_LIMITS = {
  name: 100,
  structure: 120,
  email: 254,
  message: { min: 10, max: 5000 },
} as const;

export type ContactField = "name" | "structure" | "email" | "tier" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ContactField, string>> };

export const initialContactState: ContactState = { status: "idle" };

/** Noms des champs anti-spam ajoutés au formulaire. */
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";
export const TURNSTILE_FIELD = "cf-turnstile-response";
