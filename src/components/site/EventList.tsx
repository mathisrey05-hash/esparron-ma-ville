import { MapPin, Clock } from "lucide-react";
import { getAssociation, type EventItem } from "@/lib/site-data";
import { ExampleBadge, Todo } from "./Todo";

export function EventList({ items, empty = "Aucun événement à venir pour le moment." }: { items: EventItem[]; empty?: string }) {
  if (items.length === 0) {
    return <p className="rounded-xl border border-dashed p-6 text-muted-foreground">{empty}</p>;
  }
  return (
    <ul className="divide-y overflow-hidden rounded-xl border bg-card shadow-card">
      {items.map((e) => {
        const d = new Date(e.date + "T00:00:00Z");
        const day = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", timeZone: "UTC" }).format(d);
        const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(d);
        const assoc = e.association ? getAssociation(e.association) : undefined;
        return (
          <li key={e.id} className="flex gap-4 p-4 md:gap-6 md:p-5">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary py-2 text-primary-foreground">
              <span className="font-display text-2xl font-semibold leading-none">{day}</span>
              <span className="mt-1 text-xs uppercase tracking-wider">{month}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-primary">{e.title}</h3>
                {e.isExample && <ExampleBadge />}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {e.time && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-civic-green" /> {e.time}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-civic-green" /> <Todo value={e.location} />
                </span>
                {assoc && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                    {assoc.shortName}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
