import { z } from "zod";

/** Règles du formulaire de contact — réutilisées plus tard côté serveur. */
export const contactSubjects = [
  "Demande d'information",
  "Démarche administrative",
  "Signalement (voirie, éclairage…)",
  "Associations",
  "Autre",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum).").max(100, "100 caractères maximum."),
  email: z.string().trim().email("Adresse e-mail invalide.").max(255, "255 caractères maximum."),
  subject: z.enum(contactSubjects, { errorMap: () => ({ message: "Choisissez un objet." }) }),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(2000, "2000 caractères maximum."),
  consent: z.literal(true, { errorMap: () => ({ message: "Votre accord est nécessaire pour traiter la demande." }) }),
});

export type ContactInput = z.infer<typeof contactSchema>;
