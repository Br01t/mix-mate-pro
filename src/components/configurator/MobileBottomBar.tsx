import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { formatEUR } from "@/lib/format";

type SlotTotals = { total: number };

type Props = {
  /** Current single-slot total (when compare is off). */
  total: number;
  /** Compare slots — when present, render A/B totals instead. */
  compare?: { A: SlotTotals; B: SlotTotals };
  step: number;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Fixed sticky bottom bar shown on mobile/tablet during steps 1-3.
 * Sits at the viewport bottom; the page container reserves pb-24
 * to avoid covering content.
 */
export function MobileBottomBar({ total, compare, step, onPrev, onNext }: Props) {
  const { lang } = useI18n();
  const nextLabel =
    step === 3
      ? lang === "it"
        ? "Riepilogo"
        : "Summary"
      : lang === "it"
        ? "Avanti"
        : "Next";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 shadow-lg backdrop-blur lg:hidden animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        {compare ? (
          <div className="grid min-w-0 grid-cols-2 gap-2">
            <TotalChip slot="A" total={compare.A.total} />
            <TotalChip slot="B" total={compare.B.total} />
          </div>
        ) : (
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">
              {lang === "it" ? "Configurazione" : "Configuration"}
            </p>
            <p className="mt-0.5 truncate text-base font-bold tabular-nums leading-none text-primary">
              {formatEUR(total, lang)}
            </p>
          </div>
        )}
        <div className="flex shrink-0 gap-2">
          {step > 1 && (
            <Button variant="outline" size="sm" onClick={onPrev}>
              {lang === "it" ? "Indietro" : "Back"}
            </Button>
          )}
          <Button size="sm" onClick={onNext}>
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TotalChip({ slot, total }: { slot: "A" | "B"; total: number }) {
  const { lang } = useI18n();
  const isA = slot === "A";
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={
          "grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold " +
          (isA
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground")
        }
      >
        {slot}
      </span>
      <p className="truncate text-sm font-bold tabular-nums text-foreground">
        {formatEUR(total, lang)}
      </p>
    </div>
  );
}
