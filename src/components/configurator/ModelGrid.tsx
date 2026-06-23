import { Check, Cog } from "lucide-react";
import { models } from "@/data/models";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ModelGrid({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((m) => {
        const active = m.id === selectedId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={cn(
              "group relative flex flex-col rounded-xl border bg-card p-4 text-left transition-all",
              "hover:border-primary/60 hover:shadow-md",
              active
                ? "border-primary ring-2 ring-primary/30 shadow-md"
                : "border-border",
            )}
          >
            <div className="relative mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-surface to-steel/50">
              <Cog
                className={cn(
                  "h-16 w-16 text-surface-foreground/40 transition-transform duration-500",
                  active ? "rotate-180 text-primary/80" : "group-hover:rotate-45",
                )}
              />
              {active && (
                <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold leading-tight">{m.name}</h3>
                <p className="text-xs uppercase tracking-wide text-primary">{m.tagline}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums">
                {formatEUR(m.basePrice)}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
            <dl className="mt-3 flex gap-4 text-xs text-muted-foreground">
              <div><dt className="inline">Capacity: </dt><dd className="inline font-medium text-foreground">{m.capacity}</dd></div>
              <div><dt className="inline">Industry: </dt><dd className="inline font-medium text-foreground">{m.industry}</dd></div>
            </dl>
          </button>
        );
      })}
    </div>
  );
}
