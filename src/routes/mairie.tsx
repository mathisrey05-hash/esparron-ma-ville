import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ExternalLink, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Todo } from "@/components/site/Todo";
import { demarches, images, mairieInfo, TODO } from "@/lib/site-data";

export const Route = createFileRoute("/mairie")({
  head: () => ({
    meta: [
      { title: "La mairie — Équipe, horaires et démarches | Esparron" },
      {
        name: "description",
        content:
          "Équipe municipale, horaires d'ouverture, coordonnées, services municipaux et démarches administratives de la mairie d'Esparron.",
      },
      { property: "og:title", content: "La mairie d'Esparron" },
      { property: "og:description", content: "Équipe municipale, horaires, services et démarches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mairie,
});

function Mairie() {
  return (
    <>
      <PageHero
        eyebrow="Au service des habitants"
        title="La mairie"
        intro="L'équipe municipale, les services et toutes les informations pratiques pour vos démarches."
        image={images.mairie}
      />

      {/* Infos pratiques */}
      <section className="container-site -mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-lift">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
            <MapPin className="h-5 w-5 text-civic-green" /> Coordonnées
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><Todo value={mairieInfo.address} /></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><Todo value={mairieInfo.phone} /></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><Todo value={mairieInfo.email} /></li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-lift md:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
            <Clock className="h-5 w-5 text-civic-green" /> Horaires d'ouverture
          </h2>
          <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {mairieInfo.hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between gap-4 border-b py-2.5 text-sm">
                <dt className="font-medium">{h.day}</dt>
                <dd><Todo value={h.value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Équipe */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="Équipe municipale"
          title="Vos élus et agents"
          intro="La composition de l'équipe sera renseignée par la mairie."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mairieInfo.team.map((m, i) => (
            <article key={i} className="rounded-xl border bg-card p-5 text-center shadow-card">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
                <UserRound className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">{m.role}</h3>
              <p className="mt-1 text-sm"><Todo value={m.name} /></p>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Services municipaux" title="Ce que la mairie fait pour vous" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {mairieInfo.services.map((s) => (
              <article key={s.title} className="rounded-xl border-t-4 border-t-civic-green bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground"><Todo value={s.text} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Démarches */}
      <section id="demarches" className="container-site py-20">
        <SectionHeading
          eyebrow="Démarches administratives"
          title="Faire une démarche"
          intro="La plupart des démarches se font en ligne sur service-public.fr. En cas de doute, la mairie vous accompagne."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demarches.filter((d) => d.href.startsWith("http")).map((d) => (
            <a
              key={d.title}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border bg-card p-5 transition-all hover:border-civic-green hover:shadow-card"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold text-primary">{d.title}</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-civic-green" />
              </span>
              <span className="mt-2 text-sm text-muted-foreground">{d.text}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-navy-deep p-8 text-navy-deep-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Informations pratiques</h3>
            <p className="mt-1 text-navy-deep-foreground/75">
              <Todo value={TODO("permanences, accessibilité, stationnement")} className="text-placeholder-foreground" />
            </p>
          </div>
          <Button asChild variant="civic" size="lg">
            <Link to="/contact">Contacter la mairie</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
