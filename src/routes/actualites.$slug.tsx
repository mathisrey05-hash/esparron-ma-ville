import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ExampleBadge } from "@/components/site/Todo";
import { formatDate, getArticle, getAssociation, sortedArticles } from "@/lib/site-data";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article introuvable — Mairie d'Esparron" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${a.title} — Actualités d'Esparron` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-semibold text-primary">Article introuvable</h1>
      <p className="mt-2 text-muted-foreground">Cet article n'existe pas ou a été retiré.</p>
      <Link to="/actualites" search={{ categorie: undefined }} className="mt-6 inline-block font-semibold text-civic-green hover:underline">
        ← Retour aux actualités
      </Link>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const assoc = article.association ? getAssociation(article.association) : undefined;
  const related = sortedArticles().filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <div className="container-site max-w-4xl pt-10 md:pt-14">
        <Link
          to="/actualites"
          search={{ categorie: undefined }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Toutes les actualités
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/actualites"
            search={{ categorie: article.category }}
            className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary"
          >
            {article.category}
          </Link>
          {assoc && (
            <Link
              to="/associations/$slug"
              params={{ slug: assoc.slug }}
              className="rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground"
            >
              {assoc.shortName}
            </Link>
          )}
          <ExampleBadge />
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary md:text-5xl">{article.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-civic-green" />
          Publié le <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
      </div>
      <div className="container-site mt-8 max-w-5xl">
        <img
          src={article.image}
          alt=""
          width={1280}
          height={896}
          className="aspect-[16/8] w-full rounded-2xl object-cover shadow-lift"
        />
      </div>
      <div className="container-site prose-civic max-w-3xl py-12">
        <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <section className="bg-muted py-16">
        <div className="container-site">
          <h2 className="mb-8 text-2xl font-semibold text-primary">À lire aussi</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
