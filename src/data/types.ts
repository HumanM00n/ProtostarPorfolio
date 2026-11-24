export type Stat = { value: string; label: string; detail: string };
export type Fact = { label: string; value: string };
export type Value = { title: string; text: string };

export type PalmaresItem = {
  id: string;
  year: string;
  competition: string;
  /** Optionnelle : non affichée si absente. */
  category?: string;
  /** Piste / circuit où la course a eu lieu. */
  track: string;
  result: string;
  highlight: boolean;
};

/** Meilleur tour réalisé sur une piste. `time` vide = chrono pas encore renseigné. */
export type BestLap = {
  id: string;
  track: string;
  /** Format libre, ex. "42.318" ou "1:02.540". */
  time: string;
  /** Optionnel : date ou contexte du chrono (ex. "Iron Kart 2026"). */
  context?: string;
};

export type CalendarItem = {
  id: string;
  /** Ex. "22 MAR". Vide si la date n'est pas encore connue. */
  date: string;
  event: string;
  circuit: string;
  /** Renseigné = course terminée (affiche le classement). Vide = course à venir. */
  result?: string;
};
export type Partner = { id: string; name: string; kind: string };

export type Tier = {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  featured: boolean;
};

/** position : cadrage CSS de la photo (object-position), ex. "50% 80%". Vide = centré. */
export type GalleryItem = { id: string; src: string; caption: string; tag: string; position: string };
export type Social = { id: string; label: string; handle: string; url: string };

export type SiteContent = {
  identity: {
    brand: string;
    monogram: string;
    pilotName: string;
    role: string;
    number: string;
    season: string;
    age: string;
    location: string;
    since: string;
    license: string;
    headlineA: string;
    headlineB: string;
    kicker: string;
    intro: string;
    availability: string;
    portrait: string;
    actionImage: string;
  };
  stats: Stat[];
  bio: {
    kicker: string;
    heading: string;
    quote: string;
    storyTitle: string;
    lastResult: string;
    lastResultDetail: string;
    photo: string;
    paragraphs: string[];
    facts: Fact[];
    values: Value[];
  };
  palmares: PalmaresItem[];
  bestLaps: BestLap[];
  calendar: CalendarItem[];
  seasonGoal: { value: string; detail: string };
  partners: Partner[];
  tiers: Tier[];
  tierNote: string;
  gallery: GalleryItem[];
  contact: {
    kicker: string;
    titleA: string;
    titleB: string;
    intro: string;
    email: string;
    phone: string;
    city: string;
    responseTime: string;
  };
  support: { label: string; url: string };
  socials: Social[];
  deck: {
    intro: string;
    objectives: string;
  };
};
