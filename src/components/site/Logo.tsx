import { Link } from "@tanstack/react-router";

/** Logo provisoire (ce n'est pas le blason officiel de la commune). */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Mairie d'Esparron — accueil">
      <svg viewBox="0 0 40 46" className="h-11 w-auto shrink-0" aria-hidden="true">
        <path
          d="M20 1 L38 7 V22 C38 34 30 41 20 45 C10 41 2 34 2 22 V7 Z"
          className={inverted ? "fill-navy-deep-foreground" : "fill-primary"}
        />
        <path
          d="M6 30 C11 22 15 25 19 20 C23 15 28 21 34 17 V24 C34 32 28 38 20 41 C12 38 7 34 6 30 Z"
          className="fill-civic-green"
        />
        <circle cx="27" cy="13" r="3.2" className={inverted ? "fill-primary" : "fill-primary-foreground"} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${inverted ? "text-navy-deep-foreground/70" : "text-muted-foreground"}`}
        >
          Mairie d'
        </span>
        <span
          className={`font-display text-2xl font-semibold ${inverted ? "text-navy-deep-foreground" : "text-primary"}`}
        >
          Esparron
        </span>
      </span>
    </Link>
  );
}
