import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { keystaticEnabled } from "@/lib/keystatic-guard";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Back-office",
  robots: { index: false, follow: false },
};

/** Back-office Keystatic : hors du groupe (site), donc sans navigation ni footer. */
export default function KeystaticLayout() {
  if (!keystaticEnabled) notFound();
  return <KeystaticApp/>;
}
