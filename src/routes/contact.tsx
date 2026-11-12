import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { Todo } from "@/components/site/Todo";
import { contactSchema, contactSubjects } from "@/lib/contact-schema";
import { images, mairieInfo } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mairie d'Esparron" },
      { name: "description", content: "Écrire à la mairie d'Esparron : formulaire de contact, adresse et horaires." },
      { property: "og:title", content: "Contacter la mairie d'Esparron" },
      { property: "og:description", content: "Formulaire de contact, adresse et horaires de la mairie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "subject" | "message" | "consent", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
    });
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      toast.error("Merci de corriger les champs signalés.");
      return;
    }
    setErrors({});
    // Étape suivante du projet : enregistrement du message dans la base de données.
    toast.info("Formulaire valide.", {
      description: "L'envoi des messages sera activé à l'étape de connexion de la base de données.",
    });
  }

  const field = (name: keyof Errors) =>
    errors[name] ? <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{errors[name]}</p> : null;

  return (
    <>
      <PageHero
        eyebrow="Nous écrire"
        title="Contacter la mairie"
        intro="Une question, une démarche, un signalement ? Écrivez-nous, nous vous répondrons dans les meilleurs délais."
        image={images.mairie}
      />
      <section className="container-site grid gap-10 py-16 lg:grid-cols-5">
        <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border bg-card p-6 shadow-card md:p-8 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-primary">Formulaire de contact</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Nom et prénom</Label>
              <Input id="name" name="name" autoComplete="name" maxLength={100} className="mt-1.5 h-11" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              {field("name")}
            </div>
            <div>
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} className="mt-1.5 h-11" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              {field("email")}
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Objet</Label>
            <select
              id="subject"
              name="subject"
              defaultValue=""
              className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-invalid={!!errors.subject}
            >
              <option value="" disabled>Choisir un objet…</option>
              {contactSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {field("subject")}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={6} maxLength={2000} className="mt-1.5" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            {field("message")}
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-primary" />
              <span className="text-muted-foreground">
                J'accepte que mes informations soient utilisées par la mairie uniquement pour répondre à ma demande.
              </span>
            </label>
            {field("consent")}
          </div>
          <Button type="submit" size="xl" className="w-full sm:w-auto">
            <Send /> Envoyer le message
          </Button>
        </form>

        <aside className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl bg-navy-deep p-6 text-navy-deep-foreground md:p-8">
            <h2 className="text-xl font-semibold">Mairie d'Esparron</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-civic-green" /><Todo value={mairieInfo.address} /></li>
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-civic-green" /><Todo value={mairieInfo.phone} /></li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-civic-green" /><Todo value={mairieInfo.email} /></li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
              <Clock className="h-5 w-5 text-civic-green" /> Horaires
            </h2>
            <dl className="mt-4 divide-y text-sm">
              {mairieInfo.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 py-2.5">
                  <dt className="font-medium">{h.day}</dt>
                  <dd><Todo value={h.value} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
}
