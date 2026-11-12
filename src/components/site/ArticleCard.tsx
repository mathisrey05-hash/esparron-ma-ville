import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatDate, type Article } from "@/lib/site-data";
import { ExampleBadge } from "./Todo";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/actualites/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          width={1280}
          height={896}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-semibold text-primary">
            {article.category}
          </span>
          <time dateTime={article.publishedAt} className="text-muted-foreground">
            {formatDate(article.publishedAt)}
          </time>
          {article.isExample && <ExampleBadge />}
        </div>
        <h3 className="text-xl font-semibold text-primary group-hover:underline">{article.title}</h3>
        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-civic-green">
          Lire l'article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
