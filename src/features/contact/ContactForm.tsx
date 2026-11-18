"use client";

import { useState, type FormEvent } from "react";
import type { Tier } from "@/data/types";
import { buildPartnershipMailto } from "@/lib/mailto";
import { ArrowUpRight, Check } from "@/components/ui/icons";

type Fields = { name: string; structure: string; email: string; tier: string; message: string };

/**
 * Formulaire sans serveur : il rédige un e-mail pré-rempli (mailto:) que le visiteur
 * envoie depuis sa messagerie. Aucune donnée n'est stockée.
 * Pour passer à un vrai envoi plus tard : remplacer handleSubmit par une Server Action.
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
  const [fields, setFields] = useState<Fields>({
    name: "",
    structure: "",
    email: "",
    tier: initialTier,
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (value: string) => setFields((previous) => ({ ...previous, [key]: value }));
  const mailto = buildPartnershipMailto({ to, ...fields });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[430px] flex-col items-start justify-center">
        <div className="flex h-12 w-12 items-center justify-center bg-volt text-ink">
          <Check className="h-6 w-6" />
        </div>
        <div className="label-mono mt-5 text-[9px] text-volt">Message prêt à partir</div>
        <h2 className="mt-2 font-display text-3xl uppercase leading-none md:text-4xl">
          Merci{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/55">
          Votre message est rédigé. Il ne reste plus qu&apos;à l&apos;envoyer depuis votre messagerie. Aucune donnée
          n&apos;est enregistrée sur ce site.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="group inline-flex items-center gap-3 bg-volt px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Ouvrir l&apos;email
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="label-mono border border-paper/20 px-4 py-3 text-[10px] text-paper/65 transition-colors hover:border-volt hover:text-volt"
          >
            Modifier le message
          </button>
        </div>
        <p className="mt-5 text-[11px] text-paper/35">
          Pas de messagerie configurée ? Écrivez à{" "}
          <a href={`mailto:${to}`} className="text-paper/70 underline decoration-volt/60 underline-offset-4">
            {to}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-paper/10 pb-4">
        <span className="label-mono text-[9px] text-paper/55">Parler du projet</span>
        <span className="label-mono flex items-center gap-1.5 text-[8px] text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {responseTime}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre nom *</span>
          <input
            className="input-dark"
            required
            value={fields.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Prénom et nom"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre structure</span>
          <input
            className="input-dark"
            value={fields.structure}
            onChange={(e) => set("structure")(e.target.value)}
            placeholder="Entreprise, marque…"
            autoComplete="organization"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Email *</span>
          <input
            className="input-dark"
            type="email"
            required
            value={fields.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="vous@entreprise.fr"
            autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="label-mono mb-2 block text-[8px] text-paper/45">Formule envisagée</span>
          <select
            className="input-dark appearance-none bg-carbon"
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
        </label>
      </div>

      <label className="block">
        <span className="label-mono mb-2 block text-[8px] text-paper/45">Votre message *</span>
        <textarea
          className="input-dark min-h-[130px] resize-y"
          required
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Parlez-moi de votre marque, de vos objectifs et de ce que vous aimeriez mettre en place."
        />
      </label>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-3 bg-volt px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Rédiger mon message
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
