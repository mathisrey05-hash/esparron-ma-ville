# Architecture du site — Mairie d'Esparron

Projet TanStack Start (React 19 + Vite) avec Tailwind CSS v4.

## Étape 1 : site public

| Fichier | Rôle |
| --- | --- |
| `src/styles.css` | Charte graphique : couleurs (bleu marine, blanc, vert), polices, effets |
| `src/routes/__root.tsx` | Gabarit commun : en-tête, pied de page, polices, notifications |
| `src/routes/index.tsx` | Accueil `/` |
| `src/routes/la-commune.tsx` | `/la-commune` : présentation, histoire, patrimoine, vie locale, photos |
| `src/routes/mairie.tsx` | `/mairie` : équipe, horaires, coordonnées, services, démarches |
| `src/routes/actualites.index.tsx` | `/actualites` : liste filtrable par catégorie (`?categorie=`) |
| `src/routes/actualites.$slug.tsx` | `/actualites/<article>` : article détaillé |
| `src/routes/associations.index.tsx` | `/associations` : les trois associations |
| `src/routes/associations.$slug.tsx` | `/associations/bouliste`, `/chasseurs`, `/comite` |
| `src/routes/contact.tsx` | `/contact` : formulaire vérifié + coordonnées |
| `src/routes/connexion.tsx` | `/connexion` : Espace personnel (activé à l'étape 3) |
| `src/components/site/*` | Blocs réutilisables : en-tête, pied de page, cartes, agenda, galerie |
| `src/lib/site-data.ts` | Contenus temporaires (même forme que les futures tables) |
| `src/lib/contact-schema.ts` | Règles de validation du formulaire de contact |
| `src/assets/*.jpg` | Photos d'illustration (à remplacer par de vraies photos d'Esparron) |
| `src/test/public-site.test.ts` | Tests : pages existantes, filtrage des événements, formulaire |

## Conventions

- Une information inconnue s'écrit avec `TODO("...")` → affichée en jaune « [À compléter : …] ».
- Les actualités et événements de démonstration portent le badge « Exemple ».
- Les couleurs ne sont jamais écrites en dur dans les pages : on utilise les classes
  `bg-primary`, `text-civic-green`, `bg-navy-deep`, etc. définies dans `src/styles.css`.
- Chaque page déclare son propre titre et sa description (fonction `head()`).

## Lancer le projet dans VS Code

```bash
bun install
bun run dev     # http://localhost:8080
bun run test    # lance les tests
```
