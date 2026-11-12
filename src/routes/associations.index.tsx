import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { associations, images } from "@/lib/site-data";

export const Route = createFileRoute("/associations/")({
  head: () => ({
    meta: [
      { title: "Associations — Mairie d'Esparron" },
      {
        name: "description",
        content: "Les associations d'Esparron : Bouliste, Chasseurs et Comité des fêtes.",
      },
      { property: "og:title", content: "Les associations d'Esparron" },
      { property: "og:description", content: "Bouliste, Chasseurs et Comité des fêtes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Associations,
});

function Associations() {
  return (
    <>
      <PageHero
        eyebrow="Vie associative"
        title="Les associations"
        intro="Trois associations font vivre le village. Chacune gère sa propre page."
        image={images.comite}
      />
      <section className="container-site space-y-8 py-16 md:py-20">
        {associations.map((a, i) => (
          <Link
            key={a.slug}
            to="/associations/$slug"
            params={{ slug: a.slug }}
            className="group grid overflow-hidden rounded-2xl border bg-card shadow-card transition-shadow hover:shadow-lift md:grid-cols-2"
          >
            <div className={`aspect-[16/10] overflow-hidden md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
              <img
                src={a.image}
                alt=""
                loading="lazy"
                width={1280}
                height={896}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="eyebrow">Association</span>
              <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">{a.shortName}</h2>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{a.name}</p>
              <p className="mt-4 text-lg">{a.tagline}</p>
              <span className="mt-6 inline-flex items-center gap-1 font-semibold text-civic-green">
                Voir la page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
