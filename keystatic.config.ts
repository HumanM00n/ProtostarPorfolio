import { config, fields, singleton } from "@keystatic/core";

/**
 * Back-office du site (https://keystatic.com), accessible sur /keystatic.
 *
 * - En local (npm run dev) : mode "local", les modifications écrivent directement dans src/content/.
 * - En ligne : mode "github" (NEXT_PUBLIC_KEYSTATIC_STORAGE=github). Connexion avec un compte GitHub
 *   ayant accès au repo ; chaque modification est commitée sur une branche "contenu/…",
 *   puis une PR déclenche la preview Vercel. Merge = mise en production.
 */
export const storage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: "HumanM00n/ProtostarPorfolio", branchPrefix: "contenu/" } as const)
    : ({ kind: "local" } as const);

const text = (label: string, description?: string) => fields.text({ label, description });
const longText = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const photo = (label: string, description: string) =>
  fields.image({
    label,
    description: `${description} Laisser vide pour garder la photo d’illustration.`,
    directory: "public/photos",
    publicPath: "/photos/",
  });
const json = (name: string) => ({ path: `src/content/${name}`, format: { data: "json" as const } });

export default config({
  storage,
  ui: {
    brand: { name: "Protostar · Back-office" },
    navigation: {
      Pages: ["accueil", "pilote", "palmares", "galerie", "partenaires", "contact", "dossier", "legal"],
    },
  },
  singletons: {
    accueil: singleton({
      label: "Accueil & identité",
      ...json("accueil"),
      schema: {
        identity: fields.object(
          {
            brand: text("Marque"),
            monogram: text("Monogramme"),
            pilotName: text("Nom du pilote"),
            role: text("Rôle"),
            number: text("Numéro"),
            season: text("Saison", "Ex. « Saison 2026 »"),
            age: text("Âge"),
            location: text("Localisation"),
            since: text("Pilote depuis (année)"),
            license: text("Licence", "Laisser vide tant qu’il n’y a pas de licence"),
            headlineA: text("Titre — ligne 1"),
            headlineB: text("Titre — ligne 2 (en rouge)"),
            kicker: text("Sur-titre"),
            intro: longText("Texte d'introduction"),
            availability: text("Disponibilité"),
            portrait: photo("Photo portrait", "Accueil (à droite du titre) et dossier sponsor. Format vertical conseillé."),
            actionImage: photo("Photo d’action", "Page Pilote (sous le titre) et page En piste. Format paysage conseillé."),
          },
          { label: "Identité" },
        ),
        stats: fields.array(
          fields.object({
            value: text("Valeur", "Ex. « 04 » ou « À venir »"),
            label: text("Libellé"),
            detail: text("Détail"),
          }),
          { label: "Chiffres clés (bandeau)", itemLabel: (item) => item.fields.label.value || "Chiffre" },
        ),
      },
    }),

    pilote: singleton({
      label: "Le pilote (bio)",
      ...json("pilote"),
      schema: {
        kicker: text("Sur-titre"),
        heading: text("Titre", "Entoure un mot d’astérisques pour le mettre en rouge : Chaque *course*, une nouvelle *leçon*."),
        quote: longText("Citation"),
        photo: fields.image({
          label: "Photo de la page",
          description: "Sous le titre. Laisser vide pour reprendre la photo d’action (Accueil & identité).",
          directory: "public/assets/enPiste",
          publicPath: "/assets/enPiste/",
        }),
        lastResult: text("Dernier résultat", "Ex. P5/8"),
        lastResultDetail: text("Dernier résultat : précision", "Petit texte gris sous le résultat (course, piste…)"),
        storyTitle: text("Titre de l’histoire", "Affiché au-dessus des paragraphes (optionnel)"),
        paragraphs: fields.array(longText("Paragraphe", "Entoure une phrase d’astérisques pour la mettre en évidence : *Vous voulez en faire partie ?*"), {
          label: "Paragraphes",
          itemLabel: (item) => item.value.slice(0, 60) || "Paragraphe",
        }),
        facts: fields.array(fields.object({ label: text("Libellé"), value: text("Valeur") }), {
          label: "Fiche",
          itemLabel: (item) => item.fields.label.value || "Ligne",
        }),
        values: fields.array(fields.object({ title: text("Titre"), text: longText("Texte") }), {
          label: "Valeurs",
          itemLabel: (item) => item.fields.title.value || "Valeur",
        }),
      },
    }),

    palmares: singleton({
      label: "Palmarès, chronos & calendrier",
      ...json("palmares"),
      schema: {
        palmares: fields.array(
          fields.object({
            year: text("Année"),
            competition: text("Course"),
            category: text("Catégorie (optionnelle)"),
            track: text("Piste"),
            result: text("Classement", "Ex. « P7/8 » ou « 23e »"),
            highlight: fields.checkbox({ label: "Mettre en avant (éclair)" }),
          }),
          {
            label: "Résultats",
            description: "Du plus récent au plus ancien.",
            itemLabel: (item) =>
              `${item.fields.year.value} · ${item.fields.competition.value} · ${item.fields.result.value}`,
          },
        ),
        bestLaps: fields.array(
          fields.object({
            track: text("Piste", "Même nom que dans les résultats pour compter les courses."),
            time: text("Meilleur tour", "Ex. « 42.318 ». Vide = « À venir »."),
            context: text("Contexte (optionnel)", "Ex. « Iron Kart 2026 »"),
          }),
          {
            label: "Meilleurs tours",
            itemLabel: (item) => `${item.fields.track.value} · ${item.fields.time.value || "à venir"}`,
          },
        ),
        calendar: fields.array(
          fields.object({
            date: text("Date", "Ex. « 22 MAR ». Vide si inconnue."),
            event: text("Course"),
            circuit: text("Circuit"),
            result: text("Classement", "Vide = course à venir."),
          }),
          {
            label: "Calendrier de la saison",
            itemLabel: (item) => `${item.fields.date.value || "—"} · ${item.fields.event.value}`,
          },
        ),
        seasonGoal: fields.object(
          { value: text("Objectif", "Ex. « Top 5 »"), detail: text("Précision", "Ex. « national »") },
          { label: "Objectif de saison" },
        ),
      },
    }),

    galerie: singleton({
      label: "Galerie (En piste)",
      ...json("galerie"),
      schema: {
        gallery: fields.array(
          fields.object({
            src: text("Photo (URL)", "URL complète ou chemin /photos/xxx.jpg"),
            caption: text("Légende"),
            tag: text("Étiquette"),
            position: text(
              "Cadrage (optionnel)",
              "Partie de la photo à garder visible : « 50% 0% » = haut, « 50% 100% » = bas, « 50% 30% » = un peu au-dessus du centre. Vide = centré.",
            ),
          }),
          { label: "Photos", itemLabel: (item) => item.fields.caption.value || "Photo" },
        ),
      },
    }),

    partenaires: singleton({
      label: "Partenaires & formules",
      ...json("partenaires"),
      schema: {
        partners: fields.array(fields.object({ name: text("Nom"), kind: text("Activité") }), {
          label: "Partenaires actuels",
          itemLabel: (item) => item.fields.name.value || "Partenaire",
        }),
        tiers: fields.array(
          fields.object({
            name: text("Nom de la formule"),
            price: text("Prix", "Ex. « 1 500 € »"),
            period: text("Période", "Ex. « / saison »"),
            tagline: text("Accroche"),
            features: fields.array(text("Avantage"), {
              label: "Avantages",
              itemLabel: (item) => item.value || "Avantage",
            }),
            featured: fields.checkbox({ label: "Formule mise en avant" }),
          }),
          { label: "Formules", itemLabel: (item) => `${item.fields.name.value} · ${item.fields.price.value}` },
        ),
        tierNote: longText("Note sous les formules"),
      },
    }),

    contact: singleton({
      label: "Contact & réseaux",
      ...json("contact"),
      schema: {
        contact: fields.object(
          {
            kicker: text("Sur-titre"),
            titleA: text("Titre — ligne 1"),
            titleB: text("Titre — ligne 2 (en rouge)"),
            intro: longText("Introduction"),
            email: text("E-mail de contact", "Affiché sur le site et destinataire du formulaire."),
            phone: text("Téléphone"),
            city: text("Ville"),
            responseTime: text("Délai de réponse"),
          },
          { label: "Contact" },
        ),
        support: fields.object(
          { label: text("Texte du bouton"), url: text("Lien de la cagnotte") },
          { label: "Bouton « Me soutenir »" },
        ),
        socials: fields.array(
          fields.object({
            label: text("Réseau", "Instagram, YouTube ou TikTok"),
            handle: text("Pseudo"),
            url: text("Lien"),
          }),
          { label: "Réseaux sociaux", itemLabel: (item) => item.fields.label.value || "Réseau" },
        ),
      },
    }),

    dossier: singleton({
      label: "Dossier sponsor",
      ...json("dossier"),
      schema: {
        intro: longText("Introduction du dossier"),
        objectives: longText("Objectifs de la saison"),
      },
    }),

    legal: singleton({
      label: "Mentions légales",
      ...json("legal"),
      schema: {
        editorName: text("Éditeur du site (prénom et nom)", "Personne responsable du site et de la publication."),
        editorEmail: text("E-mail de contact", "Pour joindre l’éditeur et exercer ses droits sur ses données."),
        editorNote: longText("Précision sur l’éditeur", "Ex. site personnel non commercial."),
        retention: text("Durée de conservation des messages", "Ex. « 3 ans à compter du dernier échange »."),
        updatedAt: text("Date de mise à jour", "À changer à chaque modification de la page. Ex. « 25 novembre 2026 »."),
      },
    }),
  },
});
