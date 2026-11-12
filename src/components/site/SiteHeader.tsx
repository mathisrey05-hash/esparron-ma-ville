import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { associations } from "@/lib/site-data";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Accueil", exact: true },
  { to: "/la-commune", label: "La commune" },
  { to: "/mairie", label: "Mairie" },
  { to: "/actualites", label: "Actualités" },
] as const;

const linkBase =
  "rounded-md px-3 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-primary-soft hover:text-primary";
const linkActive = "text-primary bg-primary-soft";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="bg-navy-deep text-navy-deep-foreground">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <span className="font-medium tracking-wide">Site officiel de la commune d'Esparron</span>
          <Link to="/contact" className="hidden opacity-80 hover:opacity-100 sm:inline">
            Nous contacter
          </Link>
        </div>
      </div>
      <div className="tricolor-rule h-[3px]" />
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkBase}
              activeProps={{ className: linkActive }}
              activeOptions={{ exact: "exact" in item }}
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={`${linkBase} inline-flex items-center gap-1 outline-none`}>
              Associations <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/associations">Toutes les associations</Link>
              </DropdownMenuItem>
              {associations.map((a) => (
                <DropdownMenuItem key={a.slug} asChild>
                  <Link to="/associations/$slug" params={{ slug: a.slug }}>
                    {a.shortName}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/contact" className={linkBase} activeProps={{ className: linkActive }}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/connexion">
              <UserRound /> Espace personnel
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-display text-xl text-primary">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Navigation mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={linkBase}
                    activeProps={{ className: linkActive }}
                    activeOptions={{ exact: "exact" in item }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/associations" onClick={() => setOpen(false)} className={linkBase}>
                  Associations
                </Link>
                {associations.map((a) => (
                  <Link
                    key={a.slug}
                    to="/associations/$slug"
                    params={{ slug: a.slug }}
                    onClick={() => setOpen(false)}
                    className={`${linkBase} pl-7 text-sm`}
                    activeProps={{ className: linkActive }}
                  >
                    {a.shortName}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={linkBase}
                  activeProps={{ className: linkActive }}
                >
                  Contact
                </Link>
                <Button asChild className="mt-4">
                  <Link to="/connexion" onClick={() => setOpen(false)}>
                    <UserRound /> Espace personnel
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
