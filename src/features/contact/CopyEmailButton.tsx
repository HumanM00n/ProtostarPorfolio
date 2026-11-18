"use client";

import { useState } from "react";
import { Check, Clipboard } from "@/components/ui/icons";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label-mono flex w-full items-center justify-between border-b border-paper/10 py-2.5 text-[8px] text-paper/35 transition-colors hover:text-volt"
    >
      {copied ? "Adresse copiée" : "Copier l'adresse email"}
      {copied ? <Check className="h-3 w-3 text-volt" /> : <Clipboard className="h-3.5 w-3.5" />}
    </button>
  );
}
