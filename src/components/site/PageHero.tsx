import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <img
        src={image}
        alt=""
        width={1280}
        height={896}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" />
      <div className="container-site py-16 md:py-24">
        <div className="max-w-2xl animate-fade-up">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-4xl font-semibold text-navy-deep-foreground md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 text-lg text-navy-deep-foreground/85">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
