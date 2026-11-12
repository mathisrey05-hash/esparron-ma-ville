import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Info } from "lucide-react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { EventList } from "@/components/site/EventList";
import { Gallery } from "@/components/site/Gallery";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Todo } from "@/components/site/Todo";
import { articlesFor, associations, eventsFor, getAssociation } from "@/lib/site-data";

export const Route = createFileRoute("/associations/$slug")({
  loader: ({ params }) => {
    const association = getAssociation(params.slug);
    if (!association) throw notFound();
    return { association };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.association;
    if (!a) return { meta: [{ title: "Association introuvable — Esparron" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${a.shortName} — Associations d'Esparron` },
        { name: "description", content: `${a.name} : ${a.tagline}` },
        { property: "og:title", content: a.name },
        { property: "og:description", content: a.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-semibold text-primary">Association introuvable</h1>
      <Link to="/associations" className="mt-6 inline-block font-semibold text-civic-green hover:underline">
        ← Voir les associations
      </Link>
    </div>
  ),
  component: AssociationPage,
});

function AssociationPage() {
  const { association: a } = Route.useLoaderData();
  const news = articlesFor(a.slug);
  const events = eventsFor(a.slug);
  const others = associations.filter((o) => o.slug !== a.slug);

  return (
    <>
      <PageHero eyebrow="Association" title={a.name} intro={a.tagline} image={a.image} />

      <div className="container-site pt-8">
        <Link to="/associations" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Toutes les associations
        </Link>
      </div>

      {/* Présentation + infos pratiques */}
      <section className="container-site grid gap-12 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Présentation" title={`L'association ${a.shortName}`} />
          <div className="prose-civic">
            {a.description.map((p, i) => (
              <p key={i}><Todo value={p} /></p>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-xl border-t-4 border-t-civic-green bg-card p-6 shadow-card">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
            <Info className="h-5 w-5 text-civic-green" /> Informations pratiques
          </h3>
          <dl className="mt-4 divide-y">
            {a.practical.map((p) => (
              <div key={p.label} className="py-3 text-sm">
                <dt className="font-medium text-muted-foreground">{p.label}</dt>
                <dd className="mt-1"><Todo value={p.value} /></dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Événements */}
      <section className="bg-muted py-16">
        <div className="container-site">
          <SectionHeading eyebrow="Agenda" title="Événements à venir" />
          <EventList items={events} empty="Aucun événement programmé pour le moment." />
        </div>
      </section>

      {/* Actualités */}
      <section className="container-site py-16">
        <SectionHeading eyebrow="Actualités" title={`Les nouvelles de l'association`} />
        {news.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-muted-foreground">Aucune actualité publiée pour le moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <ArticleCard key={n.slug} article={n} />
            ))}
          </div>
        )}
      </section>

      {/* Galerie */}
      <section className="container-site pb-16">
        <SectionHeading eyebrow="Galerie" title="Photos" intro="Photos d'illustration — l'association pourra ajouter les siennes." />
        <Gallery items={a.gallery} />
      </section>

      {/* Autres associations */}
      <section className="bg-primary-soft py-14">
        <div className="container-site flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-primary">Découvrir les autres associations</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/associations/$slug"
                params={{ slug: o.slug }}
                className="rounded-full border border-primary bg-card px-5 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {o.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
