import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { images } from "@/lib/site-data";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Espace personnel — Mairie d'Esparron" },
      { name: "description", content: "Accès réservé aux élus, agents municipaux et présidents d'association d'Esparron." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Espace personnel — Mairie d'Esparron" },
      { property: "og:description", content: "Accès réservé aux comptes autorisés par la mairie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Connexion,
});

function Connexion() {
  return (
    <section className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy-deep lg:block">
        <img src={images.patrimoine} alt="" width={1280} height={896} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative flex h-full flex-col justify-end p-12 text-navy-deep-foreground">
          <ShieldCheck className="h-10 w-10 text-civic-green" />
          <h2 className="mt-4 text-3xl font-semibold">Un accès réservé</h2>
          <p className="mt-2 max-w-md text-navy-deep-foreground/80">
            Les comptes sont créés uniquement par les administrateurs de la mairie. Chaque personne
            dispose de son propre identifiant et n'accède qu'aux contenus qui la concernent.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-6 text-3xl font-semibold text-primary">Espace personnel</h1>
          <p className="mt-2 text-muted-foreground">
            Élus, agents municipaux et présidents d'association.
          </p>

          <div className="mt-6 rounded-lg border border-dashed border-placeholder-foreground/40 bg-placeholder p-4 text-sm text-placeholder-foreground">
            La connexion sera activée à la prochaine étape du projet, avec la base de données et la
            gestion des comptes.
          </div>

          <form className="mt-6 space-y-4" aria-disabled="true" onSubmit={(e) => e.preventDefault()}>
            <fieldset disabled className="space-y-4">
              <div>
                <Label htmlFor="login-email">Adresse e-mail</Label>
                <Input id="login-email" type="email" className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="login-password">Mot de passe</Label>
                <Input id="login-password" type="password" className="mt-1.5 h-11" />
              </div>
              <Button type="submit" size="xl" className="w-full">Se connecter</Button>
            </fieldset>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">Contactez la mairie</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
