import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
      </div>
      {action}
    </div>
  );
}
