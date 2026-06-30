import { ArrowLeftRight, Copy } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { formatEUR } from "@/lib/format";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";

type SlotData = {
  model: Model;
  chosen: Optional[];
  total: number;
};

type Props = {
  A: SlotData;
  B: SlotData;
  onDuplicate: () => void;
  onSwap: () => void;
  /** Top offset in px; matches the sticky <header /> height (68px). */
  topOffset?: number;
};

/**
 * Sticky, always-visible A/B live summary used in compare mode.
 * Designed to coexist with the sticky header (top offset) and with the
 * mobile bottom action bar (no overlap because it sits at top).
 */
export function CompareSummaryBar({ A, B, onDuplicate, onSwap, topOffset = 68 }: Props) {
  const { lang } = useI18n();
  const delta = B.total - A.total;

  return (
    <div
      className="sticky z-30 border-y border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      style={{ top: topOffset }}
    >
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
          <div className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3">
            <SlotPill slot="A" data={A} />
            <SlotPill slot="B" data={B} delta={delta} />
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={onDuplicate}
              title={lang === "it" ? "Copia A in B" : "Duplicate A→B"}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Copy className="h-3 w-3" />
              <span className="hidden sm:inline">A → B</span>
            </button>
            <button
              type="button"
              onClick={onSwap}
              title={lang === "it" ? "Scambia A e B" : "Swap A↔B"}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <ArrowLeftRight className="h-3 w-3" />
              <span className="hidden sm:inline">A ⇄ B</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlotPill({
  slot,
  data,
  delta,
}: {
  slot: "A" | "B";
  data: SlotData;
  delta?: number;
}) {
  const { lang } = useI18n();
  const isA = slot === "A";
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-md border px-2 py-1.5 sm:gap-2.5",
        isA ? "border-primary/30 bg-primary/5" : "border-accent/30 bg-accent/5",
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold",
          isA ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
        )}
      >
        {slot}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold leading-tight text-foreground sm:text-sm">
          {data.model.name}
        </p>
        <p className="text-[10px] text-muted-foreground sm:text-[11px]">
          {data.chosen.length} {lang === "it" ? "optional" : "options"}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold leading-tight tabular-nums text-foreground sm:text-sm">
          {formatEUR(data.total, lang)}
        </p>
        {!isA && delta !== undefined && delta !== 0 && (
          <p
            className={cn(
              "text-[10px] font-semibold tabular-nums leading-tight",
              delta > 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {delta > 0 ? "+" : ""}
            {formatEUR(delta, lang)}
          </p>
        )}
      </div>
    </div>
  );
}
