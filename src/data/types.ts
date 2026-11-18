export type Stat = { value: string; label: string; detail: string };
export type Fact = { label: string; value: string };
export type Value = { title: string; text: string };

export type PalmaresItem = {
  id: string;
  year: string;
  competition: string;
  /** Optionnelle : non affichée si absente. */
  category?: string;
  result: string;
  highlight: boolean;
};

export type CalendarItem = { id: string; date: string; event: string; circuit: string };
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

export type GalleryItem = { id: string; src: string; caption: string; tag: string };
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
    paragraphs: string[];
    facts: Fact[];
    values: Value[];
  };
  palmares: PalmaresItem[];
  calendar: CalendarItem[];
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
