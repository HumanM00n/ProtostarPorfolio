"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import type { Tier } from "@/data/types";
import { buildPartnershipMailto } from "@/lib/mailto";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { sendContactMessage } from "./actions";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  initialContactState,
  type ContactField,
  type ContactState,
} from "./contact-state";
import { Turnstile } from "./Turnstile";

type Fields = { name: string; structure: string; email: string; tier: string; message: string };

const emptyFields = (tier = ""): Fields => ({ name: "", structure: "", email: "", tier, message: "" });
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Formulaire de contact envoyé par une Server Action (voir actions.ts).
 * Protections : honeypot, délai minimum, Cloudflare Turnstile, validation et rate limit côté serveur.
 */
export function ContactForm({
  to,
  tiers,
  responseTime,
  initialTier = "",
}: {
  to: string;
  tiers: Tier[];
  responseTime: string;
  initialTier?: string;
}) {
  const [fields, setFields] = useState<Fields>(() => emptyFields(initialTier));
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const [attempt, setAttempt] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (key: keyof Fields) => (value: string) => setFields((previous) => ({ ...previous, [key]: value }));
  const fieldError = (key: ContactField) => (state.status === "error" ? state.fieldErrors?.[key] : undefined);

  // Envoi intercepté pour garder les champs remplis en cas d'erreur (pas de reset automatique).
  // Sans JavaScript (ou avant hydratation), `action` envoie quand même en POST à la Server Action :
  // les données ne passent jamais dans l'URL.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set(STARTED_AT_FIELD, String(startedAt.current));
    startTransition(() => formAction(formData));
    // Nouveau widget Turnstile pour la prochaine tentative (un jeton = un envoi).
    setAttempt((count) => count + 1);
  };

  if (state.status === "success" && state !== dismissed) {
    return (
      <div className="flex min-h-[430px] flex-col items-start justify-center">
        <div className="flex h-12 w-12 items-center justify-center bg-volt text-ink">
          <Check className="h-6 w-6" />
        </div>
        <div className="label-mono mt-5 text-[9px] text-volt">Message envoyé</div>
        <h2 className="mt-2 font-display text-3xl uppercase leading-none md:text-4xl">
          Merci{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/55">
          Votre message m&apos;a bien été transmis. Je vous réponds personnellement à l&apos;adresse indiquée (
          {responseTime.toLowerCase()}).
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setDismissed(state);
              setFields(emptyFields());
              startedAt.current = Date.now();
            }}
            className="label-mono border border-paper/20 px-4 py-3 text-[10px] text-paper/65 transition-colors hover:border-volt hover:text-volt"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="relative space-y-4">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-paper/10 pb-4">
        <span className="label-mono text-[9px] text-paper/55">Parler du projet</span>
        <span className="label-mono flex items-center gap-1.5 text-[8px] text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {responseTime}
        </span>
      </div>

      {/* Honeypot : invisible pour les humains, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre nom *</span>
          <input
            className="input-dark"
            name="name"
            required
            maxLength={CONTACT_LIMITS.name}
            value={fields.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Prénom et nom"
            autoComplete="name"
            aria-invalid={Boolean(fieldError("name"))}
          />
          <FieldError message={fieldError("name")} />
        </label>
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre structure</span>
          <input
            className="input-dark"
            name="structure"
            maxLength={CONTACT_LIMITS.structure}
            value={fields.structure}
            onChange={(e) => set("structure")(e.target.value)}
            placeholder="Entreprise, marque…"
            autoComplete="organization"
            aria-invalid={Boolean(fieldError("structure"))}
          />
          <FieldError message={fieldError("structure")} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Email *</span>
          <input
            className="input-dark"
            type="email"
            name="email"
            required
            maxLength={CONTACT_LIMITS.email}
            value={fields.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="vous@entreprise.fr"
            autoComplete="email"
            aria-invalid={Boolean(fieldError("email"))}
          />
          <FieldError message={fieldError("email")} />
        </label>
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Formule envisagée</span>
          <select
            className="input-dark appearance-none bg-carbon"
            name="tier"
            value={fields.tier}
            onChange={(e) => set("tier")(e.target.value)}
          >
            <option value="">À discuter</option>
            {tiers.map((tier) => (
              <option key={tier.id} value={tier.name}>
                {tier.name} — {tier.price} {tier.period}
              </option>
            ))}
            <option value="Sur mesure">Sur mesure</option>
          </select>
          <FieldError message={fieldError("tier")} />
        </label>
      </div>

      <label className="block">
        <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre message *</span>
        <textarea
          className="input-dark min-h-[130px] resize-y"
          name="message"
          required
          minLength={CONTACT_LIMITS.message.min}
          maxLength={CONTACT_LIMITS.message.max}
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Parlez-moi de votre marque, de vos objectifs et de ce que vous aimeriez mettre en place."
          aria-invalid={Boolean(fieldError("message"))}
        />
        <FieldError message={fieldError("message")} />
      </label>

      {turnstileSiteKey ? <Turnstile key={attempt} siteKey={turnstileSiteKey} /> : null}

      {state.status === "error" ? (
        <div role="alert" className="border border-volt/40 bg-volt/10 px-4 py-3 text-sm text-paper/80">
          {state.message}{" "}
          <a
            href={buildPartnershipMailto({ to, ...fields })}
            className="text-paper underline decoration-volt/60 underline-offset-4"
          >
            Ou écrivez-moi depuis votre messagerie.
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="max-w-xs text-[11px] leading-relaxed text-paper/35">
          Vos informations servent uniquement à vous répondre et ne sont pas conservées sur ce site.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center justify-center gap-3 bg-volt px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Envoyer mon message"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="mt-1.5 block text-[11px] text-volt">{message}</span>;
}
