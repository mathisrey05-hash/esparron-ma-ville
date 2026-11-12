import { Link } from "@tanstack/react-router";
import { associations, mairieInfo } from "@/lib/site-data";
import { Logo } from "./Logo";
import { Todo } from "./Todo";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-deep-foreground">
      <div className="tricolor-rule h-[3px]" />
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo inverted />
          <p className="mt-4 text-sm text-navy-deep-foreground/70">
            Site internet de la commune d'Esparron. Les informations marquées « À compléter » seront
            renseignées par la mairie.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold">Mairie</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-deep-foreground/80">
            <li>
              <Todo value={mairieInfo.address} />
            </li>
            <li>
              <Todo value={mairieInfo.phone} />
            </li>
            <li>
              <Todo value={mairieInfo.email} />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Le site</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-deep-foreground/80">
            <li><Link to="/la-commune" className="hover:underline">La commune</Link></li>
            <li><Link to="/mairie" className="hover:underline">Mairie & démarches</Link></li>
            <li><Link to="/actualites" className="hover:underline">Actualités</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Associations</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-deep-foreground/80">
            {associations.map((a) => (
              <li key={a.slug}>
                <Link to="/associations/$slug" params={{ slug: a.slug }} className="hover:underline">
                  {a.shortName}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/connexion" className="font-semibold text-civic-green-soft hover:underline">
                Espace personnel →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-deep-foreground/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-navy-deep-foreground/60 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Commune d'Esparron</span>
          <span>Photos d'illustration — à remplacer par des photos de la commune</span>
        </div>
      </div>
    </footer>
  );
}
