# Protostar — Portfolio pilote de karting

Site vitrine d'un pilote de karting (Next.js 16, App Router, Tailwind CSS v4), destiné à présenter le pilote et à démarcher des partenaires.
Aucune base de données : le contenu vit dans les fichiers JSON de `src/content/`, modifiables via le back-office `/keystatic`.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (toutes les pages sont statiques)
npm run lint
```

## Modifier le contenu (back-office Keystatic)

Textes, palmarès, chronos, calendrier, formules, galerie et contacts sont dans `src/content/*.json`,
édités via [Keystatic](https://keystatic.com) sur `/keystatic`. Les formulaires sont définis dans
`keystatic.config.ts` ; `src/data/site.ts` assemble les JSON (ids générés, champs vides remis à `""`).

**En local** : `npm run dev` puis http://localhost:3000/keystatic. Chaque enregistrement écrit directement
dans `src/content/` (à commiter ensuite).

**En ligne** (mode `github`, sur https://protostarporfolio.vercel.app/keystatic) :

1. Se connecter avec un compte GitHub qui a les droits d'écriture sur le repo.
2. Créer une branche (préfixe `contenu/`) via le sélecteur de branche, modifier, enregistrer :
   chaque enregistrement est un commit sur cette branche, jamais sur `main`.
3. Ouvrir une PR vers `main` → la CI publie une preview Vercel pour vérifier le rendu.
4. Merge → mise en production.

Sécurité : hors `npm run dev`, `/keystatic` et `/api/keystatic` répondent 404 tant que le mode `github`
n'est pas activé (le mode `local` écrit sur le disque sans authentification).

### Activer le mode GitHub (une seule fois)

1. Dans `.env.local` : `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`, puis `npm run dev` et ouvrir `/keystatic`.
2. Suivre l'assistant Keystatic : il crée une **GitHub App** et ajoute à `.env.local`
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` et
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Installer l'app sur ce repo uniquement.
3. Dans les réglages de la GitHub App, ajouter l'URL de callback de prod :
   `https://protostarporfolio.vercel.app/api/keystatic/github/oauth/callback`.
4. Copier ces 4 variables et `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` dans Vercel → Settings →
   Environment Variables (**Production**), puis redéployer.
5. Ajouter le pilote comme collaborateur du repo GitHub (droit « Write »).

## Formulaire de contact

Envoi par une Server Action (`src/features/contact/actions.ts`) via [Resend](https://resend.com).
Protections, dans l'ordre :

1. **Honeypot** : champ invisible ; s'il est rempli, faux succès et rien n'est envoyé.
2. **Délai minimum** : envoi refusé moins de 3 s après l'affichage du formulaire.
3. **Validation serveur** : longueurs max, format e-mail, formule connue, pas de retour à la ligne dans les champs courts.
4. **Rate limit** ([Upstash Redis](https://upstash.com)) : 3 messages / 10 min et 10 / 24 h par IP (hachée), 100 / 24 h au total.
5. **Cloudflare Turnstile** : vérification anti-bot, souvent invisible.

Variables d'environnement : voir `.env.example`. À déclarer dans Vercel → Project → Settings →
Environment Variables (Production **et** Preview). Sans elles en dev local, l'e-mail s'affiche
dans la console et le rate limit est en mémoire.

## Sécurité

- En-têtes HTTP (CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP) dans `next.config.ts`.
  Nouveau domaine externe (images, scripts, iframe) → l'ajouter à la CSP.
- `npm audit` (dépendances de prod, niveau `high`) dans la CI.
- Dependabot (`.github/dependabot.yml`) : PR hebdo pour npm, mensuelle pour les actions GitHub.

## Déploiement (GitHub Actions → Vercel)

Pipeline : `.github/workflows/ci-cd.yml`

| Événement          | Jobs                                              |
| ------------------ | ------------------------------------------------- |
| Pull request       | Lint & Build → Deploy Preview                     |
| Push sur `main`    | Lint & Build → Deploy Production                  |
| Lancement manuel   | Idem push (si lancé sur `main`)                   |

Le déploiement automatique de Vercel via Git est désactivé dans `vercel.json`
(`git.deploymentEnabled: false`) : seul GitHub Actions déploie, et uniquement si la CI passe.

### Configuration (une seule fois)

1. Lier le projet en local : `npx vercel link` → crée `.vercel/project.json` (ignoré par git)
   qui contient `orgId` et `projectId`.
2. Créer un token : vercel.com → Account Settings → Tokens.
3. Dans GitHub → Settings → Secrets and variables → Actions, ajouter :
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` (= `orgId`)
   - `VERCEL_PROJECT_ID` (= `projectId`)

### Notification Discord des PR mergées

`.github/workflows/discord-pr-merged.yml` publie un résumé sur Discord à chaque PR mergée sur `main` :
titre, description, auteur, commits, fichiers modifiés par zone et lien vers la PR
(script : `.github/scripts/discord-pr-summary.cjs`). Les PR fermées sans merge sont ignorées.

1. Discord → paramètres du salon → Intégrations → Webhooks → Nouveau webhook → copier l'URL.
2. GitHub → Settings → Secrets and variables → Actions :
   - secret `DISCORD_PROD_WEBHOOK_URL` (l'URL du webhook des merges) ;
   - optionnel : variable `SITE_URL` (URL du site, affichée dans le message).
3. Preview : à chaque PR dont la CI passe, le job « Deploy Preview » envoie aussi un récap avec le lien
   de la preview. Même salon par défaut ; pour un salon séparé, ajouter le secret `DISCORD_PREVIEW_WEBHOOK_URL`.
4. Pour les PR Dependabot : ajouter aussi `DISCORD_PROD_WEBHOOK_URL` dans Secrets → **Dependabot**,
   sinon ces PR sont simplement ignorées (avertissement dans le job, pas d'échec).

Photos : la photo portrait et la photo d'action s'envoient directement depuis le back-office
(Accueil & identité → Identité → bouton « Choisir un fichier »). Elles sont enregistrées dans `public/photos/`.
Champ vide = photo d'illustration Pexels. Les photos de la galerie restent pour l'instant des URL.

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
```

Principes :

- **Server Components par défaut.** Seuls les composants interactifs sont marqués `"use client"` :
  Nav, Reveal, SmartImage, filtre du palmarès, formulaire de contact, bouton copier, bouton imprimer.
- **`app/` ne contient que le routage** ; l'affichage est dans `features/` et `components/`.
- **Cache Components** est activé : éviter `new Date()` / `Math.random()` dans le rendu ; toute lecture d'URL côté
  client (`useSearchParams`) doit être dans un `<Suspense>` (voir `src/app/(site)/contact/page.tsx`).

## Variables d'environnement

Liste complète et commentée dans `.env.example`.

| Nom                                     | Rôle                                                           |
| --------------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | URL publique (ex. `https://protostar.racing`) pour SEO/sitemap |
| `RESEND_API_KEY`, `CONTACT_*`           | Envoi du formulaire de contact                                 |
| `UPSTASH_REDIS_REST_*`                  | Rate limit du formulaire                                       |
| `*_TURNSTILE_*`                         | Anti-bot du formulaire                                         |
| `NEXT_PUBLIC_KEYSTATIC_STORAGE`         | `github` pour activer le back-office en ligne                  |
| `KEYSTATIC_*`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub App du back-office (créée par l'assistant) |
