import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArticleCard } from "@/components/site/ArticleCard";
import { PageHero } from "@/components/site/PageHero";
import { articleCategories, images, sortedArticles } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  categorie: z.enum(articleCategories).optional().catch(undefined),
});

export const Route = createFileRoute("/actualites/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Actualités — Mairie d'Esparron" },
      {
        name: "description",
        content: "Toutes les actualités municipales et associatives de la commune d'Esparron.",
      },
      { property: "og:title", content: "Actualités d'Esparron" },
      { property: "og:description", content: "Les dernières informations de la mairie et des associations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Actualites,
});

function Actualites() {
  const { categorie } = Route.useSearch();
  const list = sortedArticles().filter((a) => !categorie || a.category === categorie);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "bg-card text-foreground/80 hover:border-primary hover:text-primary",
    );

  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Actualités"
        intro="Les informations de la mairie et des associations de la commune."
        image={images.ruelle}
      />
      <section className="container-site py-14 md:py-20">
        <nav aria-label="Catégories" className="mb-10 flex flex-wrap gap-2">
          <Link to="/actualites" search={{ categorie: undefined }} className={chip(!categorie)}>
            Toutes
          </Link>
          {articleCategories.map((c) => (
            <Link key={c} to="/actualites" search={{ categorie: c }} className={chip(categorie === c)}>
              {c}
            </Link>
          ))}
        </nav>
        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            Aucune actualité dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
