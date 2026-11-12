import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { contactSchema } from "@/lib/contact-schema";
import { associations, eventsFor, upcomingEvents } from "@/lib/site-data";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
const leaf = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

describe("pages publiques", () => {
  it.each([
    "/la-commune",
    "/mairie",
    "/actualites",
    "/actualites/exemple-conseil-municipal",
    "/associations",
    "/associations/bouliste",
    "/associations/chasseurs",
    "/associations/comite",
    "/contact",
    "/connexion",
  ])("la page %s existe", (path) => {
    expect(leaf(path)).not.toBe(rootRouteId);
  });

  it("il y a exactement trois associations : bouliste, chasseurs, comité", () => {
    expect(associations.map((a) => a.slug)).toEqual(["bouliste", "chasseurs", "comite"]);
  });
});

describe("événements", () => {
  it("n'affiche que les événements à venir", () => {
    const list = upcomingEvents(new Date("2026-11-12T00:00:00Z"));
    expect(list.some((e) => e.date < "2026-11-12")).toBe(false);
  });

  it("une association ne voit que ses propres événements", () => {
    const list = eventsFor("bouliste", new Date("2026-01-01T00:00:00Z"));
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((e) => e.association === "bouliste")).toBe(true);
  });
});

describe("formulaire de contact", () => {
  const valid = {
    name: "Jean Dupont",
    email: "jean@example.com",
    subject: "Autre",
    message: "Bonjour, ceci est un message.",
    consent: true,
  };

  it("accepte un message complet", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("refuse une adresse e-mail invalide", () => {
    expect(contactSchema.safeParse({ ...valid, email: "pas-un-email" }).success).toBe(false);
  });
  it("refuse un message de plus de 2000 caractères", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success).toBe(false);
  });
  it("refuse l'envoi sans accord", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
});
