import { isTodo } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** Affiche une valeur ; si elle est « À compléter », elle est signalée visuellement. */
export function Todo({ value, className }: { value: string; className?: string }) {
  if (!isTodo(value)) return <span className={className}>{value}</span>;
  return (
    <span
      className={cn(
        "inline-block rounded border border-dashed border-placeholder-foreground/40 bg-placeholder px-1.5 py-0.5 text-[0.85em] font-medium text-placeholder-foreground",
        className,
      )}
    >
      {value}
    </span>
  );
}

export function ExampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-placeholder px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-placeholder-foreground",
        className,
      )}
    >
      Exemple
    </span>
  );
}
