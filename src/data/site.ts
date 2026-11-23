/**
 * Contenu du site — assemblé depuis les fichiers JSON de `src/content/`.
 *
 * Pour modifier le contenu : back-office /keystatic (recommandé) ou éditer les JSON directement.
 * - Les `id` des listes sont générés ici : inutile de les saisir.
 * - Keystatic supprime les champs texte laissés vides : on les remet à "" ici,
 *   pour que le reste du code reçoive toujours des chaînes.
 */
import accueil from "@/content/accueil.json";
import contact from "@/content/contact.json";
import dossier from "@/content/dossier.json";
import galerie from "@/content/galerie.json";
import palmares from "@/content/palmares.json";
import partenaires from "@/content/partenaires.json";
import pilote from "@/content/pilote.json";
import type {
  BestLap,
  CalendarItem,
  Fact,
  GalleryItem,
  PalmaresItem,
  Partner,
  SiteContent,
  Social,
  Stat,
  Tier,
  Value,
} from "./types";

/** Objet dont chaque clé listée vaut "" par défaut. */
const blank = <K extends string>(...keys: K[]) => Object.fromEntries(keys.map((key) => [key, ""])) as Record<K, string>;

const obj = <T extends object>(defaults: T, value: Partial<T> | undefined): T => ({ ...defaults, ...value });

const list = <T extends { id: string }>(
  prefix: string,
  defaults: Omit<T, "id">,
  items: Partial<Omit<T, "id">>[] | undefined,
): T[] => (items ?? []).map((item, index) => ({ ...defaults, ...item, id: `${prefix}${index + 1}` }) as T);

export const site: SiteContent = {
  identity: obj(
    blank(
      "brand",
      "monogram",
      "pilotName",
      "role",
      "number",
      "season",
      "age",
      "location",
      "since",
      "license",
      "headlineA",
      "headlineB",
      "kicker",
      "intro",
      "availability",
      "portrait",
      "actionImage",
    ),
    accueil.identity,
  ),
  stats: (accueil.stats as Partial<Stat>[]).map((stat) => obj<Stat>(blank("value", "label", "detail"), stat)),
  bio: {
    ...obj(blank("kicker", "heading", "quote"), pilote),
    paragraphs: pilote.paragraphs ?? [],
    facts: (pilote.facts as Partial<Fact>[]).map((fact) => obj<Fact>(blank("label", "value"), fact)),
    values: (pilote.values as Partial<Value>[]).map((value) => obj<Value>(blank("title", "text"), value)),
  },
  palmares: list<PalmaresItem>(
    "p",
    { ...blank("year", "competition", "category", "track", "result"), highlight: false },
    palmares.palmares,
  ),
  bestLaps: list<BestLap>("bl", blank("track", "time", "context"), palmares.bestLaps),
  calendar: list<CalendarItem>("c", blank("date", "event", "circuit", "result"), palmares.calendar),
  seasonGoal: obj(blank("value", "detail"), palmares.seasonGoal),
  partners: list<Partner>("s", blank("name", "kind"), partenaires.partners),
  tiers: list<Tier>(
    "t",
    { ...blank("name", "price", "period", "tagline"), features: [], featured: false },
    partenaires.tiers,
  ),
  tierNote: partenaires.tierNote ?? "",
  gallery: list<GalleryItem>("g", blank("src", "caption", "tag"), galerie.gallery),
  contact: obj(
    blank("kicker", "titleA", "titleB", "intro", "email", "phone", "city", "responseTime"),
    contact.contact,
  ),
  support: obj(blank("label", "url"), contact.support),
  socials: list<Social>("r", blank("label", "handle", "url"), contact.socials),
  deck: obj(blank("intro", "objectives"), dossier),
};
