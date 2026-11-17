import type { Metadata } from "next";
import { PilotProfile } from "@/features/pilot/PilotProfile";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Le pilote",
  description: `${site.identity.pilotName}, ${site.identity.age} ans, pilote de karting basé à ${site.identity.location}. Parcours, méthode et ambitions.`,
};

export default function PilotePage() {
  return <PilotProfile />;
}
