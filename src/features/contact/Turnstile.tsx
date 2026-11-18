"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { TURNSTILE_FIELD } from "./contact-state";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Widget Cloudflare Turnstile (anti-bot, souvent invisible).
 * Il ajoute au formulaire un champ caché `cf-turnstile-response` vérifié par le serveur.
 * Remonter le composant (changement de `key`) génère un nouveau jeton : chaque jeton ne sert qu'une fois.
 */
export function Turnstile({ siteKey }: { siteKey: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!ready || !element || !window.turnstile) return;
    const widgetId = window.turnstile.render(element, {
      sitekey: siteKey,
      theme: "dark",
      language: "fr",
      "response-field-name": TURNSTILE_FIELD,
    });
    return () => window.turnstile?.remove(widgetId);
  }, [ready, siteKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="min-h-16.25" />
    </>
  ); 
}
