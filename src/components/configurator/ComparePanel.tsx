import { FileText, RotateCcw, Copy, ArrowLeftRight, X, Check, Minus } from "lucide-react";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import { optionals as allOptionals } from "@/data/optionals";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatEUR } from "@/lib/format";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { useI18n } from "@/i18n/I18nProvider";
import type { SlotId } from "./useConfigurator";
import { cn } from "@/lib/utils";

type SlotData = { model: Model; chosen: Optional[]; total: number; optionals: Set<string> };

export function ComparePanel({
  A, B, active, onActivate,
  onRequestQuote, onDuplicate, onSwap, onReset,
}: {
  A: SlotData;
  B: SlotData;
  active: SlotId;
  onActivate: (s: SlotId) => void;
  onRequestQuote: (s: SlotId) => void;
  onDuplicate: () => void;
  onSwap: () => void;
  onReset: () => void;
}) {
  const { t, pick, lang } = useI18n();
  const sameModel = A.model.id === B.model.id;
  const delta = B.total - A.total;
  const animA = useAnimatedNumber(A.total);
  const animB = useAnimatedNumber(B.total);

  // Build merged optional list (only those selected in A or B), preserving canonical order
  const mergedIds = allOptionals
    .filter((o) => A.optionals.has(o.id) || B.optionals.has(o.id))
    .map((o) => o.id);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("cfg.compareMode")}
        </p>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={onDuplicate} className="h-8 gap-1.5 text-xs">
            <Copy className="h-3.5 w-3.5" /> {t("cfg.duplicateToB")}
          </Button>
          <Button size="sm" variant="ghost" onClick={onSwap} className="h-8 gap-1.5 text-xs">
            <ArrowLeftRight className="h-3.5 w-3.5" /> {t("cfg.swapAB")}
          </Button>
          <Button size="sm" variant="ghost" onClick={onReset} className="h-8 gap-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> {t("cfg.reset")}
          </Button>
        </div>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-2">
        <SlotCard
          id="A" slot={A} active={active === "A"} animatedTotal={animA}
          onActivate={() => onActivate("A")} onRequestQuote={() => onRequestQuote("A")}
        />
        <SlotCard
          id="B" slot={B} active={active === "B"} animatedTotal={animB}
          onActivate={() => onActivate("B")} onRequestQuote={() => onRequestQuote("B")}
        />
      </div>

      {/* Diff section */}
      <div className="space-y-3 border-t border-border bg-muted/20 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-muted-foreground">
            {sameModel ? t("cfg.sameModel") : t("cfg.diffModel")}
          </span>
          <span className={cn(
            "rounded-full px-2.5 py-1 font-semibold tabular-nums",
            delta === 0 ? "bg-muted text-muted-foreground" :
            delta < 0 ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent",
          )}>
            B vs A: {delta > 0 ? "+" : ""}{formatEUR(delta, lang)}
            {delta !== 0 && (
              <span className="ml-1 font-normal opacity-70">
                ({delta < 0 ? t("cfg.cheaper") : t("cfg.moreExpensive")})
              </span>
            )}
          </span>
        </div>

        {mergedIds.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-card px-3 py-3 text-center text-xs text-muted-foreground">
            {t("cfg.noOptions")}
          </p>
        ) : (
          <ul className="grid gap-1.5 rounded-lg border border-border bg-card p-2 text-sm">
            {mergedIds.map((id) => {
              const o = allOptionals.find((x) => x.id === id)!;
              const inA = A.optionals.has(id);
              const inB = B.optionals.has(id);
              return (
                <li key={id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-2 py-1.5">
                  <span className="truncate">{pick(o.name)}</span>
                  <DiffPill present={inA} side="A" highlight={inA !== inB} />
                  <DiffPill present={inB} side="B" highlight={inA !== inB} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function SlotCard({
  id, slot, active, animatedTotal, onActivate, onRequestQuote,
}: {
  id: SlotId;
  slot: SlotData;
  active: boolean;
  animatedTotal: number;
  onActivate: () => void;
  onRequestQuote: () => void;
}) {
  const { t, pick, lang } = useI18n();
  const accent = id === "A" ? "primary" : "accent";

  return (
    <div
      className={cn(
        "relative flex flex-col bg-card transition-all",
        active && (id === "A" ? "ring-2 ring-primary/40" : "ring-2 ring-accent/40"),
      )}
    >
      <button
        type="button"
        onClick={onActivate}
        className="relative aspect-[16/9] w-full overflow-hidden text-left"
        aria-label={`${t("cfg.activeSlot")} ${id}`}
      >
        <img
          key={slot.model.id}
          src={slot.model.image}
          alt={slot.model.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 animate-in fade-in zoom-in-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full text-xs font-bold shadow-md",
              id === "A" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
            )}
          >
            {id}
          </span>
          {active && (
            <span className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur",
              id === "A" ? "bg-primary/85 text-primary-foreground" : "bg-accent/85 text-accent-foreground",
            )}>
              {t("cfg.editing")}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 text-surface-foreground">
          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{t(`categories.${slot.model.category}`)}</p>
          <p className="font-semibold leading-tight">{slot.model.name}</p>
          <p className="text-xs opacity-70">{pick(slot.model.tagline)} · {slot.model.capacity}</p>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{t("cfg.basePrice")}</span>
          <span className="font-medium tabular-nums">{formatEUR(slot.model.basePrice, lang)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {slot.chosen.length} {slot.chosen.length === 1 ? t("cfg.optionSelected") : t("cfg.optionsSelected")}
          </span>
          <span className="font-medium tabular-nums text-muted-foreground">
            +{formatEUR(slot.chosen.reduce((s, o) => s + o.price, 0), lang)}
          </span>
        </div>

        <Separator className="my-3" />

        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">{t("cfg.estimatedTotal")}</span>
          <span className={cn(
            "text-xl font-bold tabular-nums",
            accent === "primary" ? "text-primary" : "text-accent",
          )}>
            {formatEUR(animatedTotal, lang)}
          </span>
        </div>

        <Button
          size="sm"
          variant={active ? "default" : "outline"}
          onClick={onRequestQuote}
          className={cn(
            "mt-3 w-full",
            !active && (id === "A" ? "border-primary/40 text-primary hover:bg-primary/10 hover:text-primary" : "border-accent/40 text-accent hover:bg-accent/10 hover:text-accent"),
          )}
        >
          <FileText className="mr-1.5 h-4 w-4" /> {t("cfg.requestThis")} {id}
        </Button>
      </div>
    </div>
  );
}

function DiffPill({ present, side, highlight }: { present: boolean; side: SlotId; highlight: boolean }) {
  const base = "grid h-6 w-6 place-items-center rounded-md text-xs font-bold";
  const onClasses = side === "A" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";
  const offClasses = "bg-muted text-muted-foreground/40";
  return (
    <span
      className={cn(base, present ? onClasses : offClasses, highlight && present && "ring-2 ring-offset-1 ring-offset-card",
        highlight && present && (side === "A" ? "ring-primary/60" : "ring-accent/60"))}
      title={present ? `${side}: ✓` : `${side}: —`}
    >
      {present ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3 w-3" />}
    </span>
  );
}

// Re-export tiny X if needed
export { X };
