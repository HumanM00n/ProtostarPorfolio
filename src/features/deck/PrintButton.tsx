"use client";

import type { ReactNode } from "react";
import { Printer } from "@/components/ui/icons";

/** Ouvre la boîte d'impression du navigateur (« Enregistrer en PDF »). */
export function PrintButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="h-3 w-3" />
      {children}
    </button>
  );
}
