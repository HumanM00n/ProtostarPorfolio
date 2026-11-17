/**
 * Contenu du site — source unique de vérité.
 *
 * Pour modifier le site : éditer ce fichier, commit, push.
 * Vercel redéploie automatiquement à chaque push sur la branche principale.
 */
import type { SiteContent } from "./types";

/** Photo d'illustration Pexels. Remplacer par un chemin local ("/photos/xxx.jpg") une fois les vraies photos ajoutées dans /public. */
const px = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const site: SiteContent = {
  identity: {
    brand: "PROTOSTAR",
    monogram: "AB",
    pilotName: "Protostar",
    role: "Pilote de karting",
    number: "48",
    season: "Saison 2026",
    category: "X30 Senior",
    age: "17",
    location: "Lyon, France",
    since: "2019",
    license: "FFSA · 2026-84127",
    headlineA: "Pas encore une étoile.",
    headlineB: "Déjà une trajectoire.",
    kicker: "Saison 2026 · X30 Senior",
    intro:
      "17 ans, pilote X30 Senior, basé à Lyon. Je construis ma saison 2026 avec des partenaires qui veulent de la visibilité réelle, une histoire authentique et un projet qui va vite.",
    availability: "Recherche active de partenaires pour la saison 2026",
    portrait: px("16753309"),
    actionImage: px("11086446"),
  },
  stats: [
    { value: "04", label: "Victoires", detail: "en course depuis 2019" },
    { value: "12", label: "Podiums", detail: "en compétition" },
    { value: "06", label: "Saisons", detail: "de karting" },
    { value: "P4", label: "National 2025", detail: "IAME X30 Senior" },
  ],
  bio: {
    kicker: "Le pilote",
    heading: "La régularité avant la vitesse.",
    quote:
      "Je ne cours pas pour faire du bruit. Je cours pour faire la différence, tour après tour.",
    paragraphs: [
      "Tout a commencé sur un kart de location, à 11 ans. Une première session, un premier chrono, et cette évidence : je voulais comprendre pourquoi certains pilotes trouvent la trajectoire juste, encore et encore.",
      "Depuis, le karting est devenu mon école. La compétition m'a appris à travailler mes données, à soigner ma condition physique et à garder la tête froide quand la piste se resserre. En 2025, j'ai terminé 4e du classement général X30 Senior en IAME Series France.",
      "Aujourd'hui, je prépare la saison 2026 avec une ambition claire : jouer le podium national. Pour franchir ce cap, je recherche des marques partenaires qui souhaitent s'associer à une progression, pas seulement à une victoire.",
    ],
    facts: [
      { label: "Pilote", value: "Protostar" },
      { label: "Âge", value: "17 ans" },
      { label: "Catégorie", value: "X30 Senior" },
      { label: "Licence", value: "FFSA · 2026-84127" },
      { label: "Basé à", value: "Lyon, France" },
      { label: "Karting depuis", value: "2019" },
    ],
    values: [
      {
        title: "Régularité",
        text: "Terminer les courses, ramener des points, éviter la faute qui coûte le week-end. La constance fait les classements.",
      },
      {
        title: "Données",
        text: "Chaque session est décryptée : télémétrie, vidéo, ressenti. On ne pilote pas au hasard, on pilote avec un plan.",
      },
      {
        title: "Partage",
        text: "Un partenaire n'est pas un logo. Je documente la saison et je raconte ce que votre soutien rend possible, concrètement.",
      },
    ],
  },
  palmares: [
    {
      id: "p1",
      year: "2025",
      competition: "IAME Series France",
      category: "X30 Senior",
      result: "4e du classement général",
      highlight: true,
    },
    {
      id: "p2",
      year: "2025",
      competition: "Championnat de France",
      category: "X30 Senior",
      result: "Top 10 sur 24 engagés",
      highlight: false,
    },
    {
      id: "p3",
      year: "2024",
      competition: "IAME Series France",
      category: "X30 Junior",
      result: "6e général · 2 podiums",
      highlight: true,
    },
    {
      id: "p4",
      year: "2024",
      competition: "Trophée de France",
      category: "X30 Junior",
      result: "Finaliste",
      highlight: false,
    },
    {
      id: "p5",
      year: "2023",
      competition: "Coupe de France",
      category: "Minime",
      result: "Vainqueur · 1 victoire",
      highlight: true,
    },
    {
      id: "p6",
      year: "2022",
      competition: "Championnat régional AURA",
      category: "Minime",
      result: "3e au général",
      highlight: false,
    },
    {
      id: "p7",
      year: "2019",
      competition: "Karting découverte",
      category: "Loisir",
      result: "Premiers tours en compétition",
      highlight: false,
    },
  ],
  calendar: [
    { id: "c1", date: "22 MAR", event: "IAME Series · Manche 1", circuit: "Salbris" },
    { id: "c2", date: "26 AVR", event: "IAME Series · Manche 2", circuit: "Angerville" },
    { id: "c3", date: "24 MAI", event: "IAME Series · Manche 3", circuit: "Laval" },
    { id: "c4", date: "21 JUIN", event: "Championnat de France", circuit: "Le Mans" },
    { id: "c5", date: "13 SEPT", event: "Finale IAME France", circuit: "Essay" },
  ],
  partners: [
    { id: "s1", name: "Atelier 27", kind: "Préparation moteur" },
    { id: "s2", name: "Vélocité", kind: "Équipement pilote" },
    { id: "s3", name: "KartData", kind: "Télémétrie" },
  ],
  tiers: [
    {
      id: "t1",
      name: "Copilote",
      price: "500 €",
      period: "/ saison",
      tagline: "Le premier virage ensemble.",
      features: [
        "Logo sur la page partenaires",
        "1 mention Instagram dédiée",
        "Carte de saison dédicacée",
        "Rapport de saison PDF",
      ],
      featured: false,
    },
    {
      id: "t2",
      name: "Partenaire",
      price: "1 500 €",
      period: "/ saison",
      tagline: "Votre marque sur la piste.",
      features: [
        "Logo sur le kart et la combinaison",
        "6 posts + 4 stories",
        "Photos pro & droit d'usage",
        "2 invitations en paddock",
        "Rapport de saison détaillé",
      ],
      featured: true,
    },
    {
      id: "t3",
      name: "Écurie",
      price: "3 500 €",
      period: "/ saison",
      tagline: "Un projet à l'année.",
      features: [
        "Espace principal sur le kart",
        "Activation sur les courses",
        "Contenus vidéo dédiés",
        "Journée pilote privée",
        "Programme co-construit",
      ],
      featured: false,
    },
  ],
  tierNote:
    "Les montants couvrent l'engagement sportif, l'équipement et les déplacements. Chaque formule peut être ajustée, en visibilité comme en budget.",
  gallery: [
    {
      id: "g1",
      src: px("11086446"),
      caption: "Départ, IAME Series France",
      tag: "Course",
    },
    {
      id: "g2",
      src: px("5640511"),
      caption: "Duel en tête de peloton",
      tag: "Bagarre",
    },
    {
      id: "g3",
      src: px("13245019"),
      caption: "Prêt pour la manche",
      tag: "Paddock",
    },
    {
      id: "g4",
      src: px("14148109"),
      caption: "Trajectoire intérieure",
      tag: "Technique",
    },
    {
      id: "g5",
      src: px("34481274"),
      caption: "Sous les projecteurs",
      tag: "Indoor",
    },
    {
      id: "g6",
      src: px("8368861"),
      caption: "Objectif : la prochaine ligne droite",
      tag: "Saison 2026",
    },
  ],
  contact: {
    kicker: "Contact",
    titleA: "Et si on passait à la",
    titleB: "vitesse supérieure ?",
    intro:
      "Un partenariat, une question, une simple envie de venir me voir sur la piste ? Écrivez-moi. Je réponds personnellement sous 48 h.",
    email: "contact@protostar.racing",
    phone: "+33 6 12 34 56 78",
    city: "Lyon, France",
    responseTime: "Réponse sous 48 h",
  },
  socials: [
    {
      id: "r1",
      label: "Instagram",
      handle: "@protostar.racing",
      url: "https://instagram.com/protostar.racing",
    },
    {
      id: "r2",
      label: "YouTube",
      handle: "/protostar",
      url: "https://youtube.com",
    },
    {
      id: "r3",
      label: "TikTok",
      handle: "@protostar.racing",
      url: "https://tiktok.com",
    },
  ],
  deck: {
    intro:
      "Ce dossier présente mon parcours, mon programme 2026 et les formules de partenariat. Une base de discussion, à adapter à vos objectifs.",
    objectives:
      "Objectif 2026 : top 5 national en IAME Series France et une saison complète avec un partenaire principal.",
  },
};
