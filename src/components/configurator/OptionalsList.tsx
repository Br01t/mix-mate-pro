import { optionals } from "@/data/optionals";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function OptionalsList({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {optionals.map((o) => {
        const active = selected.has(o.id);
        return (
          <div
            key={o.id}
            className={cn(
              "flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors",
              active ? "border-primary/60 bg-primary/5" : "border-border",
            )}
          >
            <Switch
              id={`opt-${o.id}`}
              checked={active}
              onCheckedChange={() => onToggle(o.id)}
              className="mt-1"
            />
            <div className="min-w-0 flex-1">
              <Label htmlFor={`opt-${o.id}`} className="flex items-center justify-between gap-3 font-medium">
                <span>{o.name}</span>
                <span className="shrink-0 text-sm font-semibold text-primary tabular-nums">
                  +{formatEUR(o.price)}
                </span>
              </Label>
              <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
