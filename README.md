# Esparron Ma Ville

PROJET COMPLET : SITE INTERNET OFFICIEL DE LA MAIRIE D'ESPARRON

Je souhaite créer depuis zéro un site internet moderne, professionnel, responsive et fonctionnel pour la mairie d'Esparron, en France.

Il s'agit d'un projet informatique scolaire qui doit pouvoir être présenté comme un véritable site municipal.

IMPORTANT : Ne crée pas uniquement une maquette graphique. Je veux une véritable application web avec navigation fonctionnelle, base de données Supabase, authentification et gestion individuelle des permissions.

1. IDENTITÉ VISUELLE

Créer un site institutionnel moderne, élégant et facile à utiliser.

Style souhaité :

Design municipal français.
Couleurs principales : bleu foncé, blanc et quelques touches de vert.
Interface claire et moderne.
Menu de navigation simple.
Typographie lisible.
Photos de la commune et de ses paysages.
Adaptation parfaite aux ordinateurs, tablettes et téléphones.

Le site doit être professionnel et donner confiance aux habitants.

Ne pas inventer de coordonnées, de numéros de téléphone ou d'informations officielles sur la commune. Utiliser des textes temporaires clairement identifiés lorsque les informations manquent.

2. PARTIE PUBLIQUE DU SITE

Créer les pages suivantes :

ACCUEIL
Grand bandeau de présentation de la mairie.
Photo principale de la commune.
Message de bienvenue.
Présentation rapide d'Esparron.
Actualités récentes.
Événements à venir.
Accès rapide aux démarches administratives.
Accès aux trois associations.
LA COMMUNE
Présentation du village.
Histoire de la commune.
Patrimoine.
Vie locale.
Photos de la commune.
MAIRIE
Présentation de l'équipe municipale.
Horaires d'ouverture.
Coordonnées.
Services municipaux.
Informations pratiques.
Démarches administratives.
ACTUALITÉS
Liste des actualités municipales.
Dates de publication.
Images.
Articles détaillés.
Catégories.
ASSOCIATIONS

Créer trois rubriques indépendantes :

BOULISTE
CHASSEURS
COMITÉ

Chaque rubrique doit avoir :

Une présentation de l'association.
Une image.
Les actualités.
Les événements.
Les informations pratiques.
Une galerie de photos.
CONTACT
Formulaire de contact.
Adresse de la mairie à compléter.
Coordonnées à compléter.
Horaires à compléter.
3. ESPACE DE CONNEXION

Créer une page de connexion privée accessible depuis un bouton « Espace personnel » dans le menu.

Utiliser Supabase Auth.

Chaque utilisateur doit posséder :

Son adresse e-mail.
Son mot de passe individuel.
Son propre compte.
Son propre rôle.
Ses propres autorisations.

Prévoir :

Connexion.
Déconnexion.
Réinitialisation du mot de passe.
Protection des pages privées.
Redirection vers le tableau de bord correspondant au rôle.

Ne pas autoriser les visiteurs à créer librement des comptes.

4. GESTION DES UTILISATEURS ET DES DROITS

Prévoir les rôles suivants :

ADMINISTRATEURS :

Secrétaire 1.
Secrétaire 2.
Maire.
Adjoint.

Ils peuvent gérer toutes les pages et tous les contenus ainsi que les comptes utilisateurs.

EMPLOYÉ MUNICIPAL :

Modification des informations municipales autorisées.
Gestion des actualités municipales.
Pas de gestion des comptes.
Pas de modification des autorisations.

PRÉSIDENT BOULISTE :

Accès uniquement à la rubrique Bouliste.
Modification de ses textes.
Ajout de photos.
Publication d'actualités et d'événements de son association.

PRÉSIDENT CHASSEURS :

Accès uniquement à la rubrique Chasseurs.
Modification de ses textes.
Ajout de photos.
Publication d'actualités et d'événements de son association.

PRÉSIDENT COMITÉ :

Accès uniquement à la rubrique Comité.
Modification de ses textes.
Ajout de photos.
Publication d'actualités et d'événements de son association.

IMPORTANT : Les présidents ne doivent absolument pas pouvoir modifier les autres associations ou les pages municipales.

Cette restriction doit être garantie par les politiques RLS de Supabase, et pas seulement par l'interface graphique.

5. TABLEAU DE BORD ADMINISTRATEUR

Créer une interface d'administration moderne avec :

Tableau de bord.
Gestion des pages.
Gestion des actualités.
Gestion des événements.
Gestion des associations.
Gestion des images.
Gestion des comptes utilisateurs.
Gestion des rôles et permissions.

L'administrateur doit pouvoir modifier le contenu sans avoir besoin de programmer.

6. TABLEAU DE BORD DES ASSOCIATIONS

Créer un tableau de bord simplifié.

Le président des Boulistes ne voit que :

Gestion de la page Bouliste.
Actualités Bouliste.
Événements Bouliste.
Photos Bouliste.

Faire exactement la même chose pour les Chasseurs et le Comité, avec leurs propres contenus.

Ne jamais afficher de lien de modification vers les autres associations.

7. BASE DE DONNÉES SUPABASE

Connecter réellement l'application à Supabase.

Créer les tables nécessaires :

profiles.
associations.
articles.
municipal_content.
events.
audit_logs.

Créer les relations nécessaires.

Activer RLS sur toutes les tables concernées.

Écrire des politiques SQL strictes pour contrôler les lectures, créations, modifications et suppressions.

Vérifier les permissions côté serveur pour chaque opération.

Empêcher les utilisateurs de modifier leur propre rôle ou leur association.

Utiliser Supabase Storage pour les images si nécessaire, avec des règles d'accès adaptées.

8. SÉCURITÉ
Ne jamais placer la clé service_role dans le navigateur.
Utiliser uniquement la clé publique anon/publishable côté client.
Utiliser des politiques RLS.
Vérifier les permissions à chaque modification.
Protéger les routes privées.
Sécuriser les formulaires.
Ne jamais stocker les mots de passe en clair.
Ne pas faire confiance aux rôles transmis par le navigateur.
9. EXPÉRIENCE UTILISATEUR

Le site doit être simple à utiliser pour des personnes qui ne sont pas informaticiennes.

Les secrétaires de mairie doivent pouvoir modifier facilement les actualités.

Les présidents d'association doivent pouvoir ajouter une photo, modifier un texte et publier un événement sans compétences informatiques.

Prévoir des messages clairs :

Modification enregistrée.
Publication effectuée.
Accès refusé.
Connexion réussie.
10. MÉTHODE DE DÉVELOPPEMENT

Construire le projet progressivement.

Commencer par :

Créer l'architecture complète du site.
Construire les pages publiques.
Créer le design responsive.
Connecter Supabase.
Créer l'authentification.
Créer les profils et les rôles.
Mettre en place les politiques RLS.
Créer les tableaux de bord personnalisés.
Tester chaque rôle avec des comptes différents.

Ne pas simuler les connexions ou les autorisations.

Je veux un véritable site fonctionnel et sécurisé.

Présenter les étapes techniques et les fichiers créés afin que nous puissions comprendre le fonctionnement du projet et le modifier dans Visual Studio Code.

Commencer maintenant par créer la structure du site et ses pages publiques avant de développer le système d'administration.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a80d1350-e4af-45d2-9180-3332a5a0cb9f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
