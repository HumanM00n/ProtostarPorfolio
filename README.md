# Protostar — Portfolio pilote de karting

Site vitrine d'un pilote de karting (Next.js 16, App Router, Tailwind CSS v4), destiné à présenter le pilote et à démarcher des partenaires.
Aucune base de données : le contenu vit dans les fichiers JSON de `src/content/`, modifiables via le back-office `/keystatic`.

## Pages

| URL            | Contenu                                                  |
| -------------- | -------------------------------------------------------- |
| `/`            | Hero, chiffres clés, accès aux autres pages              |
| `/pilote`      | Biographie, citation, fiche, méthode                     |
| `/palmares`    | Résultats filtrables par année + calendrier de la saison |
| `/en-piste`    | Galerie photo                                            |
| `/partenaires` | Arguments, formules, partenaires actuels                 |
| `/contact`     | Formulaire de contact (accepte `?formule=Partenaire`)    |
| `/dossier`     | Dossier sponsor imprimable / exportable en PDF           |
| `/keystatic`   | Back-office (non indexé)                                 |

## Architecture

```
src/
├── app/                  # Routage uniquement : une page = un dossier
│   ├── layout.tsx        # Racine : polices, métadonnées, <html>/<body>
│   ├── (site)/           # Pages publiques (layout avec Nav + Footer)
│   │   ├── page.tsx      # Accueil
│   │   └── pilote/ palmares/ en-piste/ partenaires/ contact/ dossier/
│   ├── keystatic/        # Back-office (sans Nav ni Footer)
│   ├── api/keystatic/    # API du back-office
│   ├── not-found.tsx, sitemap.ts, robots.ts, icon.svg
│   └── globals.css       # Thème Tailwind (couleurs, effets, styles d'impression)
├── components/
│   ├── layout/           # SiteChrome, Nav (client), Footer
│   └── ui/               # Briques réutilisables : Button, PageHeader, Reveal, SmartImage, icons
├── content/              # ← contenu du site (JSON édités par Keystatic)
├── features/             # Sections métier, regroupées par page
│   └── home/ pilot/ results/ gallery/ partners/ contact/ deck/
├── data/
│   ├── site.ts           # Assemble src/content/*.json
│   ├── navigation.ts     # Entrées de la navbar (= pages)
│   └── types.ts
└── lib/                  # Utilitaires : cn, mailto, polices, email, security/, keystatic-guard
keystatic.config.ts       # Schéma du back-office