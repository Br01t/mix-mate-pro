import { FileText, X, RotateCcw } from "lucide-react";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatEUR } from "@/lib/format";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { useI18n } from "@/i18n/I18nProvider";

export function SummaryPanel({
  model,
  chosenOptionals,
  total,
  onRequestQuote,
  onRemoveOptional,
  onReset,
}: {
  model: Model;
  chosenOptionals: Optional[];
  total: number;
  onRequestQuote: () => void;
  onRemoveOptional: (id: string) => void;
  onReset: () => void;
}) {
  const animated = useAnimatedNumber(total);
  const { lang, pick, t } = useI18n();

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Live image preview */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <img
            key={model.id}
            src={model.image}
            alt={model.name}
            className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-surface-foreground">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t(`categories.${model.category}`)}</p>
            <h3 className="mt-0.5 text-lg font-semibold">{model.name}</h3>
            <p className="text-xs text-surface-foreground/70">{pick(model.tagline)} · {model.capacity}</p>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{t("cfg.yourConfig")}</span>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 normal-case tracking-normal text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" /> {t("cfg.reset")}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("cfg.basePrice")}</span>
            <span className="font-medium tabular-nums">{formatEUR(model.basePrice, lang)}</span>
          </div>

          {chosenOptionals.length > 0 ? (
            <>
              <Separator className="my-3" />
              <ul className="space-y-2">
                {chosenOptionals.map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-2 text-sm animate-in fade-in slide-in-from-right-2 duration-300">
                    <button
                      onClick={() => onRemoveOptional(o.id)}
                      className="group flex min-w-0 items-center gap-1.5 text-left text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`Remove ${pick(o.name)}`}
                    >
                      <X className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                      <span className="truncate">{pick(o.name)}</span>
                    </button>
                    <span className="shrink-0 font-medium tabular-nums">+{formatEUR(o.price, lang)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 rounded-md border border-dashed border-border bg-muted/30 px-3 py-2 text-center text-xs text-muted-foreground">
              {t("cfg.noOptions")}
            </p>
          )}

          <Separator className="my-4" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">{t("cfg.estimatedTotal")}</span>
            <span className="text-2xl font-semibold tabular-nums text-foreground">
              {formatEUR(animated, lang)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("cfg.priceNote")}</p>

          <Button onClick={onRequestQuote} className="mt-4 w-full" size="lg">
            <FileText className="mr-2 h-4 w-4" /> {t("cfg.requestOfficial")}
          </Button>
        </div>
      </div>
    </aside>
  );
}
