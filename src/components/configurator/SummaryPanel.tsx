import { FileText, X } from "lucide-react";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatEUR } from "@/lib/format";
import { useAnimatedNumber } from "./useAnimatedNumber";

export function SummaryPanel({
  model,
  chosenOptionals,
  total,
  onRequestQuote,
  onRemoveOptional,
}: {
  model: Model;
  chosenOptionals: Optional[];
  total: number;
  onRequestQuote: () => void;
  onRemoveOptional: (id: string) => void;
}) {
  const animated = useAnimatedNumber(total);

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="bg-surface px-5 py-4 text-surface-foreground">
          <p className="text-xs uppercase tracking-wider text-surface-foreground/60">Your configuration</p>
          <h3 className="mt-1 text-lg font-semibold">{model.name}</h3>
          <p className="text-sm text-surface-foreground/70">{model.tagline} · {model.capacity}</p>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Base price</span>
            <span className="font-medium tabular-nums">{formatEUR(model.basePrice)}</span>
          </div>

          {chosenOptionals.length > 0 && (
            <>
              <Separator className="my-3" />
              <ul className="space-y-2">
                {chosenOptionals.map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-2 text-sm">
                    <button
                      onClick={() => onRemoveOptional(o.id)}
                      className="group flex min-w-0 items-center gap-1.5 text-left text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Remove ${o.name}`}
                    >
                      <X className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="truncate">{o.name}</span>
                    </button>
                    <span className="shrink-0 font-medium tabular-nums">+{formatEUR(o.price)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <Separator className="my-4" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Estimated total</span>
            <span className="text-2xl font-semibold tabular-nums text-foreground">
              {formatEUR(animated)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Indicative price, VAT excluded. Final quote includes shipping & commissioning.
          </p>

          <Button onClick={onRequestQuote} className="mt-4 w-full" size="lg">
            <FileText className="mr-2 h-4 w-4" /> Request Official Quote
          </Button>
        </div>
      </div>
    </aside>
  );
}
