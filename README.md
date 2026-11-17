# Protostar — Portfolio pilote de karting

Site vitrine d'un pilote de karting (Next.js 16, App Router, Tailwind CSS v4), destiné à présenter le pilote et à démarcher des partenaires.
Aucune base de données : tout le contenu vit dans `src/data/site.ts`.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (toutes les pages sont statiques)
npm run lint
```

## Modifier le contenu

1. Éditer `src/data/site.ts` (textes, palmarès, calendrier, formules, galerie, contacts…).
2. Commit + push sur `main`.
3. Vercel redéploie automatiquement (une URL d'aperçu est créée pour chaque autre branche).

Les photos actuelles sont des images d'illustration Pexels. Pour mettre les vraies photos :
les déposer dans `public/photos/` et remplacer `px("…")` par `"/photos/mon-image.jpg"` dans `site.ts`.

## Pages

| URL            | Contenu                                                  |
| -------------- | -------------------------------------------------------- |
| `/`            | Hero, chiffres clés, accès aux autres pages              |
| `/pilote`      | Biographie, citation, fiche, méthode                     |
| `/palmares`    | Résultats filtrables par année + calendrier de la saison |
| `/en-piste`    | Galerie photo                                            |
| `/partenaires` | Arguments, formules, partenaires actuels                 |
| `/contact`     | Formulaire `mailto:` (accepte `?formule=Partenaire`)     |
| `/dossier`     | Dossier sponsor imprimable / exportable en PDF           |

## Architecture

```
src/
├── app/                  # Routage uniquement : une page = un dossier
│   ├── layout.tsx        # Polices, métadonnées, Nav + Footer
│   ├── page.tsx          # Accueil
│   ├── pilote/ palmares/ en-piste/ partenaires/ contact/ dossier/
│   ├── not-found.tsx, sitemap.ts, robots.ts, icon.svg
│   └── globals.css       # Thème Tailwind (couleurs, effets, styles d'impression)
├── components/
│   ├── layout/           # Nav (client), Footer
│   └── ui/               # Briques réutilisables : Button, Eyebrow, PageHeader, Reveal, SmartImage, icons
├── features/             # Sections métier, regroupées par page
│   └── home/ pilot/ results/ gallery/ partners/ contact/ deck/
├── data/
│   ├── site.ts           # ← tout le contenu du site
│   ├── navigation.ts     # Entrées de la navbar (= pages)
│   └── types.ts
└── lib/                  # Utilitaires : cn, mailto, polices
```

Principes :

- **Server Components par défaut.** Seuls les composants interactifs sont marqués `"use client"` :
  Nav, Reveal, SmartImage, filtre du palmarès, formulaire de contact, bouton copier, bouton imprimer.
- **`app/` ne contient que le routage** ; l'affichage est dans `features/` et `components/`.
- **Cache Components** est activé : éviter `new Date()` / `Math.random()` dans le rendu ; toute lecture d'URL côté
  client (`useSearchParams`) doit être dans un `<Suspense>` (voir `src/app/contact/page.tsx`).

## Variables d'environnement

| Nom                    | Rôle                                                           |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (ex. `https://protostar.racing`) pour SEO/sitemap |

## Évolutions prévues

- Envoi réel du formulaire (Server Action + service d'e-mail) puis tableau de bord des messages : remplacer
  `handleSubmit` dans `src/features/contact/ContactForm.tsx`.
