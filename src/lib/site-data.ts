/**
 * Contenus temporaires du site public.
 *
 * Étape 1 du projet : ces données sont locales. Leur forme reprend volontairement
 * celle des futures tables (associations, articles, events, municipal_content)
 * afin que le passage à la base de données ne demande que de remplacer ces
 * fonctions de lecture.
 *
 * Règle : aucune information officielle n'est inventée. Tout ce qui manque est
 * marqué « À compléter » et les actualités/événements sont marqués « Exemple ».
 */
import villageHero from "@/assets/village-hero.jpg";
import patrimoine from "@/assets/patrimoine.jpg";
import bouliste from "@/assets/bouliste.jpg";
import chasseurs from "@/assets/chasseurs.jpg";
import comite from "@/assets/comite.jpg";
import mairie from "@/assets/mairie.jpg";
import ruelle from "@/assets/ruelle.jpg";
import paysage from "@/assets/paysage.jpg";

export const images = { villageHero, patrimoine, bouliste, chasseurs, comite, mairie, ruelle, paysage };

export const TODO = (label: string) => `[À compléter : ${label}]`;

/* ---------------------------------------------------------------- Associations */

export type AssociationSlug = "bouliste" | "chasseurs" | "comite";

export type Association = {
  slug: AssociationSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  image: string;
  practical: { label: string; value: string }[];
  gallery: { src: string; alt: string }[];
};

export const associations: Association[] = [
  {
    slug: "bouliste",
    name: "Association Bouliste d'Esparron",
    shortName: "Bouliste",
    tagline: "La pétanque, un art de vivre provençal partagé entre générations.",
    description: [
      "Texte temporaire — l'association bouliste réunit les amateurs de pétanque de la commune autour de rencontres conviviales et de concours.",
      TODO("présentation rédigée par le président de l'association"),
    ],
    image: bouliste,
    practical: [
      { label: "Président(e)", value: TODO("nom") },
      { label: "Lieu", value: TODO("boulodrome / adresse") },
      { label: "Entraînements", value: TODO("jours et horaires") },
      { label: "Adhésion", value: TODO("tarif et modalités") },
      { label: "Contact", value: TODO("e-mail de l'association") },
    ],
    gallery: [
      { src: bouliste, alt: "Partie de pétanque sous les platanes (photo d'illustration)" },
      { src: ruelle, alt: "Ruelle du village (photo d'illustration)" },
      { src: patrimoine, alt: "Place du village (photo d'illustration)" },
    ],
  },
  {
    slug: "chasseurs",
    name: "Société de Chasse d'Esparron",
    shortName: "Chasseurs",
    tagline: "Gestion du territoire, respect de la faune et des usagers de la nature.",
    description: [
      "Texte temporaire — la société de chasse participe à la gestion de la faune et des espaces naturels de la commune, en lien avec les autres usagers.",
      TODO("présentation rédigée par le président de l'association"),
    ],
    image: chasseurs,
    practical: [
      { label: "Président(e)", value: TODO("nom") },
      { label: "Siège", value: TODO("adresse") },
      { label: "Jours de chasse", value: TODO("calendrier de la saison") },
      { label: "Adhésion", value: TODO("tarif et modalités") },
      { label: "Contact", value: TODO("e-mail de l'association") },
    ],
    gallery: [
      { src: chasseurs, alt: "Sentier dans la garrigue au lever du jour (photo d'illustration)" },
      { src: paysage, alt: "Collines et forêts (photo d'illustration)" },
    ],
  },
  {
    slug: "comite",
    name: "Comité des Fêtes d'Esparron",
    shortName: "Comité",
    tagline: "Fêtes, repas et animations qui font vivre le village toute l'année.",
    description: [
      "Texte temporaire — le comité des fêtes organise les moments festifs de la commune : fête du village, repas partagés et animations de saison.",
      TODO("présentation rédigée par le président de l'association"),
    ],
    image: comite,
    practical: [
      { label: "Président(e)", value: TODO("nom") },
      { label: "Siège", value: TODO("adresse") },
      { label: "Réunions", value: TODO("fréquence et lieu") },
      { label: "Bénévolat", value: TODO("comment rejoindre l'équipe") },
      { label: "Contact", value: TODO("e-mail de l'association") },
    ],
    gallery: [
      { src: comite, alt: "Repas de fête sur la place (photo d'illustration)" },
      { src: villageHero, alt: "Vue du village (photo d'illustration)" },
      { src: ruelle, alt: "Ruelle fleurie (photo d'illustration)" },
    ],
  },
];

export const getAssociation = (slug: string) => associations.find((a) => a.slug === slug);

/* -------------------------------------------------------------------- Articles */

export const articleCategories = [
  "Vie municipale",
  "Travaux",
  "Environnement",
  "Culture",
  "Associations",
] as const;
export type ArticleCategory = (typeof articleCategories)[number];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: ArticleCategory;
  publishedAt: string; // ISO
  image: string;
  association?: AssociationSlug;
  isExample: true;
};

const exampleBody = (topic: string) => [
  `Ceci est un article d'exemple destiné à montrer la mise en page d'une actualité sur le thème « ${topic} ».`,
  "Une fois l'espace d'administration en place, les secrétaires de mairie et les présidents d'association pourront rédiger et publier leurs propres articles, avec une image et une catégorie.",
  TODO("contenu réel de l'article"),
];

export const articles: Article[] = [
  {
    slug: "exemple-conseil-municipal",
    title: "Compte rendu du conseil municipal",
    excerpt: "Exemple d'actualité : les principales décisions prises lors de la dernière séance.",
    body: exampleBody("Vie municipale"),
    category: "Vie municipale",
    publishedAt: "2026-11-06",
    image: images.mairie,
    isExample: true,
  },
  {
    slug: "exemple-travaux-voirie",
    title: "Travaux de voirie dans le village",
    excerpt: "Exemple d'actualité : information sur un chantier et ses conséquences sur la circulation.",
    body: exampleBody("Travaux"),
    category: "Travaux",
    publishedAt: "2026-10-28",
    image: images.ruelle,
    isExample: true,
  },
  {
    slug: "exemple-debroussaillement",
    title: "Rappel : obligations de débroussaillement",
    excerpt: "Exemple d'actualité : prévention des risques d'incendie autour des habitations.",
    body: exampleBody("Environnement"),
    category: "Environnement",
    publishedAt: "2026-10-15",
    image: images.paysage,
    isExample: true,
  },
  {
    slug: "exemple-concours-petanque",
    title: "Retour sur le concours de pétanque",
    excerpt: "Exemple d'actualité publiée par l'association bouliste.",
    body: exampleBody("Associations"),
    category: "Associations",
    publishedAt: "2026-10-04",
    image: images.bouliste,
    association: "bouliste",
    isExample: true,
  },
  {
    slug: "exemple-ouverture-saison",
    title: "Ouverture de la saison et consignes de sécurité",
    excerpt: "Exemple d'actualité publiée par la société de chasse.",
    body: exampleBody("Associations"),
    category: "Associations",
    publishedAt: "2026-09-20",
    image: images.chasseurs,
    association: "chasseurs",
    isExample: true,
  },
  {
    slug: "exemple-fete-du-village",
    title: "Merci aux bénévoles de la fête du village",
    excerpt: "Exemple d'actualité publiée par le comité des fêtes.",
    body: exampleBody("Associations"),
    category: "Associations",
    publishedAt: "2026-09-02",
    image: images.comite,
    association: "comite",
    isExample: true,
  },
  {
    slug: "exemple-patrimoine",
    title: "Journées du patrimoine : visite du village",
    excerpt: "Exemple d'actualité : découverte du patrimoine communal.",
    body: exampleBody("Culture"),
    category: "Culture",
    publishedAt: "2026-08-25",
    image: images.patrimoine,
    isExample: true,
  },
];

export const sortedArticles = () =>
  [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesFor = (slug: AssociationSlug) =>
  sortedArticles().filter((a) => a.association === slug);

/* ---------------------------------------------------------------------- Events */

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO
  time?: string;
  location: string;
  description: string;
  association?: AssociationSlug;
  isExample: true;
};

export const events: EventItem[] = [
  {
    id: "ev-ceremonie",
    title: "Cérémonie commémorative",
    date: "2026-11-11",
    time: "11h00",
    location: TODO("lieu"),
    description: "Exemple d'événement municipal.",
    isExample: true,
  },
  {
    id: "ev-marche-noel",
    title: "Marché de Noël",
    date: "2026-12-13",
    time: "10h00",
    location: TODO("lieu"),
    description: "Exemple d'événement organisé par le comité des fêtes.",
    association: "comite",
    isExample: true,
  },
  {
    id: "ev-voeux",
    title: "Vœux du maire",
    date: "2027-01-09",
    time: "18h00",
    location: TODO("salle"),
    description: "Exemple d'événement municipal.",
    isExample: true,
  },
  {
    id: "ev-battue",
    title: "Assemblée générale de la société de chasse",
    date: "2027-01-17",
    time: "10h00",
    location: TODO("lieu"),
    description: "Exemple d'événement de l'association des chasseurs.",
    association: "chasseurs",
    isExample: true,
  },
  {
    id: "ev-galette",
    title: "Concours de la galette",
    date: "2027-01-24",
    time: "14h00",
    location: TODO("boulodrome"),
    description: "Exemple d'événement de l'association bouliste.",
    association: "bouliste",
    isExample: true,
  },
];

/** Événements à venir à partir d'une date donnée (par défaut : aujourd'hui). */
export const upcomingEvents = (from: Date = new Date()) => {
  const today = from.toISOString().slice(0, 10);
  return [...events].filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
};
export const eventsFor = (slug: AssociationSlug, from?: Date) =>
  upcomingEvents(from).filter((e) => e.association === slug);

/* ------------------------------------------------------------ Mairie (municipal) */

export const mairieInfo = {
  address: TODO("adresse postale de la mairie"),
  phone: TODO("téléphone de la mairie"),
  email: TODO("e-mail de la mairie"),
  hours: [
    { day: "Lundi", value: TODO("horaires") },
    { day: "Mardi", value: TODO("horaires") },
    { day: "Mercredi", value: TODO("horaires") },
    { day: "Jeudi", value: TODO("horaires") },
    { day: "Vendredi", value: TODO("horaires") },
    { day: "Samedi", value: TODO("horaires") },
  ],
  team: [
    { role: "Maire", name: TODO("nom") },
    { role: "Adjoint(e)", name: TODO("nom") },
    { role: "Secrétaire de mairie", name: TODO("nom") },
    { role: "Secrétaire de mairie", name: TODO("nom") },
    { role: "Conseillers municipaux", name: TODO("liste des conseillers") },
  ],
  services: [
    { title: "État civil", text: "Actes de naissance, mariage, décès, livret de famille." },
    { title: "Urbanisme", text: "Permis de construire, déclarations préalables, certificats." },
    { title: "Élections", text: "Inscription sur les listes électorales." },
    { title: "Location de salle", text: TODO("conditions de location de la salle communale") },
  ],
};

export type Demarche = { title: string; text: string; href: string };

/** Liens vers les services officiels de l'État (service-public.fr). */
export const demarches: Demarche[] = [
  {
    title: "Carte d'identité et passeport",
    text: "Pré-demande en ligne et prise de rendez-vous.",
    href: "https://www.service-public.fr/particuliers/vosdroits/N358",
  },
  {
    title: "Actes d'état civil",
    text: "Demande d'acte de naissance, de mariage ou de décès.",
    href: "https://www.service-public.fr/particuliers/vosdroits/N359",
  },
  {
    title: "Inscription sur les listes électorales",
    text: "S'inscrire pour voter dans la commune.",
    href: "https://www.service-public.fr/particuliers/vosdroits/F1367",
  },
  {
    title: "Urbanisme",
    text: "Permis de construire, déclaration préalable de travaux.",
    href: "https://www.service-public.fr/particuliers/vosdroits/N319",
  },
  {
    title: "Recensement citoyen",
    text: "Obligatoire pour les jeunes dès 16 ans.",
    href: "https://www.service-public.fr/particuliers/vosdroits/F870",
  },
  {
    title: "Signaler un problème",
    text: "Voirie, éclairage, propreté : contactez la mairie.",
    href: "/contact",
  },
];

/* ------------------------------------------------------------------ Utilitaires */

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) =>
  new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));

export const isTodo = (value: string) => value.startsWith("[À compléter");
