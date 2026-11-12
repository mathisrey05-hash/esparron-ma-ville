import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ExternalLink, FileText, Landmark, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/site/ArticleCard";
import { EventList } from "@/components/site/EventList";
import { SectionHeading } from "@/components/site/SectionHeading";
import { associations, demarches, images, sortedArticles, upcomingEvents } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mairie d'Esparron — Bienvenue sur le site de la commune" },
      {
        name: "description",
        content:
          "Actualités municipales, événements, démarches administratives et associations de la commune d'Esparron.",
      },
      { property: "og:title", content: "Mairie d'Esparron — Bienvenue" },
      {
        property: "og:description",
        content: "Toute l'actualité et la vie locale de la commune d'Esparron.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const news = sortedArticles().slice(0, 3);
  const events = upcomingEvents().slice(0, 4);

  return (
    <>
      {/* Bandeau principal */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img
          src={images.villageHero}
          alt="Vue d'un village provençal (photo d'illustration)"
          width={1376}
          height={768}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="container-site flex min-h-[78vh] flex-col justify-center py-20 md:min-h-[640px]">
          <div className="max-w-2xl animate-fade-up">
            <span className="eyebrow">Commune d'Esparron</span>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy-deep-foreground md:text-7xl">
              Bienvenue à Esparron
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-deep-foreground/85 md:text-xl">
              Retrouvez ici les actualités de la mairie, les événements du village, vos démarches
              administratives et la vie de nos associations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="civic">
                <Link to="/mairie">
                  Démarches & mairie <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="on-dark">
                <Link to="/actualites">Les actualités</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accès rapides */}
      <section className="relative z-10 -mt-12">
        <div className="container-site">
          <div className="grid gap-px overflow-hidden rounded-xl border bg-border shadow-lift sm:grid-cols-2 lg:grid-cols-4">
            {([
              { to: "/mairie", icon: Landmark, title: "La mairie", text: "Équipe, horaires, services" },
              { to: "/actualites", icon: Newspaper, title: "Actualités", text: "Informations municipales" },
              { to: "/la-commune", icon: FileText, title: "La commune", text: "Histoire et patrimoine" },
              { to: "/contact", icon: CalendarDays, title: "Contact", text: "Écrire à la mairie" },
            ] as const).map(({ to, icon: Icon, title, text }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-4 bg-card p-5 transition-colors hover:bg-primary-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-primary">{title}</span>
                  <span className="block text-sm text-muted-foreground">{text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="container-site grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="eyebrow">Le mot d'accueil</span>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
            Un village où il fait bon vivre
          </h2>
          <div className="prose-civic mt-5 text-muted-foreground">
            <p>
              Texte temporaire — Esparron est une commune à taille humaine, entourée de collines et
              d'espaces naturels. La mairie est au service de tous les habitants pour les démarches
              du quotidien et l'organisation de la vie communale.
            </p>
            <p>
              <span className="rounded border border-dashed border-placeholder-foreground/40 bg-placeholder px-1.5 py-0.5 text-placeholder-foreground">
                [À compléter : mot de bienvenue du maire]
              </span>
            </p>
          </div>
          <Button asChild variant="link" className="mt-4 px-0 text-base">
            <Link to="/la-commune">
              Découvrir la commune <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <img
            src={images.paysage}
            alt="Paysage de collines provençales (photo d'illustration)"
            loading="lazy"
            width={1280}
            height={896}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
          />
          <img
            src={images.patrimoine}
            alt="Chapelle et fontaine (photo d'illustration)"
            loading="lazy"
            width={1280}
            height={896}
            className="absolute -bottom-8 -left-6 hidden aspect-square w-44 rounded-xl border-4 border-card object-cover shadow-lift md:block"
          />
        </div>
      </section>

      {/* Actualités */}
      <section className="bg-muted py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Actualités"
            title="Les dernières nouvelles"
            action={
              <Button asChild variant="outline">
                <Link to="/actualites">
                  Toutes les actualités <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Événements + démarches */}
      <section className="container-site grid gap-14 py-20 md:py-24 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow="Agenda" title="Événements à venir" />
          <EventList items={events} />
        </div>
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Démarches" title="Accès rapide" />
          <ul className="space-y-3">
            {demarches.map((d) => {
              const external = d.href.startsWith("http");
              const inner = (
                <>
                  <span>
                    <span className="block font-semibold text-primary">{d.title}</span>
                    <span className="block text-sm text-muted-foreground">{d.text}</span>
                  </span>
                  {external ? (
                    <ExternalLink className="h-4 w-4 shrink-0 text-civic-green" />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 text-civic-green" />
                  )}
                </>
              );
              const cls =
                "flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-civic-green hover:bg-civic-green-soft";
              return (
                <li key={d.title}>
                  {external ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link to="/contact" className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Les liens externes mènent vers service-public.fr, le site officiel de l'administration.
          </p>
        </div>
      </section>

      {/* Associations */}
      <section className="bg-navy-deep py-20 text-navy-deep-foreground md:py-24">
        <div className="container-site">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">Vie associative</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Nos associations</h2>
            <p className="mt-3 text-lg text-navy-deep-foreground/75">
              Trois associations animent la vie du village tout au long de l'année.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {associations.map((a) => (
              <Link
                key={a.slug}
                to="/associations/$slug"
                params={{ slug: a.slug }}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl p-6"
              >
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="bg-image-fade absolute inset-0 -z-10" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-civic-green-soft">
                  Association
                </span>
                <h3 className="mt-1 text-3xl font-semibold">{a.shortName}</h3>
                <p className="mt-2 text-sm text-navy-deep-foreground/80">{a.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
