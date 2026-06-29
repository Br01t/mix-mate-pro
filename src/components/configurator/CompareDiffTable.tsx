import { Check, Minus, TrendingUp, TrendingDown, Equal } from "lucide-react";
import { optionals as allOptionals } from "@/data/optionals";
import { useI18n } from "@/i18n/I18nProvider";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  selectedA: Set<string>;
  selectedB: Set<string>;
  baseA: number;
  baseB: number;
  modelANameDiffers: boolean;
};

/**
 * Real-time per-optional diff between Slot A and Slot B.
 * Mobile-first: no hidden columns, compact grid that scales up.
 * Each row: [icon] [name] [A] [B] [Δ €]
 */
export function CompareDiffTable({
  selectedA,
  selectedB,
  baseA,
  baseB,
  modelANameDiffers,
}: Props) {
  const { pick, lang } = useI18n();

  // All optionals selected in either slot, preserving canonical order.
  const rows = allOptionals.filter((o) => selectedA.has(o.id) || selectedB.has(o.id));

  const sumA = allOptionals
    .filter((o) => selectedA.has(o.id))
    .reduce((s, o) => s + o.price, 0);
  const sumB = allOptionals
    .filter((o) => selectedB.has(o.id))
    .reduce((s, o) => s + o.price, 0);

  const totalA = baseA + sumA;
  const totalB = baseB + sumB;
  const delta = totalB - totalA;

  return (
    <section
      aria-label={lang === "it" ? "Confronto opzionali in tempo reale" : "Real-time options diff"}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]">
            {lang === "it" ? "Differenze opzionali" : "Options diff"}
          </p>
          <p className="text-[10px] text-muted-foreground/80 hidden sm:block">
            {lang === "it"
              ? "Aggiornato in tempo reale mentre modifichi A e B"
              : "Updates live as you edit A and B"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <LegendDot tone="A" />
          <LegendDot tone="B" />
        </div>
      </header>

      {/* Column headers — always visible (5 cols) */}
      <div className="grid grid-cols-[24px_minmax(0,1fr)_36px_36px_72px] items-center gap-2 border-b border-border bg-muted/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:grid-cols-[28px_minmax(0,1fr)_44px_44px_96px] sm:px-4 sm:text-[11px]">
        <span />
        <span>{lang === "it" ? "Voce" : "Item"}</span>
        <span className="text-center text-primary">A</span>
        <span className="text-center text-accent">B</span>
        <span className="text-right">Δ</span>
      </div>

      {/* Rows */}
      {rows.length === 0 ? (
        <div className="px-4 py-6 text-center text-xs text-muted-foreground">
          {lang === "it"
            ? "Nessun opzionale selezionato in A o B."
            : "No optionals selected in A or B."}
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((o) => {
            const inA = selectedA.has(o.id);
            const inB = selectedB.has(o.id);
            const rowDelta = (inB ? o.price : 0) - (inA ? o.price : 0);
            const differs = inA !== inB;
            const Icon = o.icon;
            return (
              <li
                key={o.id}
                className={cn(
                  "grid grid-cols-[24px_minmax(0,1fr)_36px_36px_72px] items-center gap-2 px-3 py-2 text-xs transition-colors sm:grid-cols-[28px_minmax(0,1fr)_44px_44px_96px] sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm",
                  differs ? "bg-amber-50/40 dark:bg-amber-950/10" : "bg-card",
                )}
              >
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-md sm:h-7 sm:w-7",
                    differs ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>

                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{pick(o.name)}</p>
                  <p className="truncate text-[10px] tabular-nums text-muted-foreground sm:text-[11px]">
                    {formatEUR(o.price, lang)}
                  </p>
                </div>

                <Mark on={inA} tone="A" />
                <Mark on={inB} tone="B" />

                <span
                  className={cn(
                    "text-right text-[11px] font-semibold tabular-nums sm:text-xs",
                    rowDelta === 0
                      ? "text-muted-foreground"
                      : rowDelta > 0
                        ? "text-destructive"
                        : "text-emerald-600 dark:text-emerald-400",
                  )}
                >
                  {rowDelta === 0
                    ? "—"
                    : (rowDelta > 0 ? "+" : "") + formatEUR(rowDelta, lang)}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer: subtotals + total delta */}
      <footer className="space-y-1.5 border-t border-border bg-muted/30 px-3 py-3 text-xs sm:px-4">
        <Row
          label={lang === "it" ? "Base macchina" : "Base machine"}
          a={baseA}
          b={baseB}
          lang={lang}
          dim={!modelANameDiffers}
        />
        <Row
          label={lang === "it" ? "Totale opzionali" : "Options subtotal"}
          a={sumA}
          b={sumB}
          lang={lang}
        />
        <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {lang === "it" ? "Differenza totale (B − A)" : "Total difference (B − A)"}
            </p>
            <p className="truncate text-[10px] text-muted-foreground/80">
              A {formatEUR(totalA, lang)} · B {formatEUR(totalB, lang)}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-bold tabular-nums sm:text-base",
              delta === 0
                ? "bg-muted text-muted-foreground"
                : delta > 0
                  ? "bg-destructive/10 text-destructive"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
            )}
          >
            {delta === 0 ? (
              <Equal className="h-3.5 w-3.5" />
            ) : delta > 0 ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {delta > 0 ? "+" : ""}
            {formatEUR(delta, lang)}
          </span>
        </div>
      </footer>
    </section>
  );
}

function Mark({ on, tone }: { on: boolean; tone: "A" | "B" }) {
  const onClass =
    tone === "A"
      ? "bg-primary text-primary-foreground"
      : "bg-accent text-accent-foreground";
  return (
    <span
      className={cn(
        "mx-auto grid h-6 w-6 place-items-center rounded-md sm:h-7 sm:w-7",
        on ? onClass : "bg-muted text-muted-foreground/50",
      )}
      aria-label={on ? `${tone}: ✓` : `${tone}: —`}
    >
      {on ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3 w-3" />}
    </span>
  );
}

function LegendDot({ tone }: { tone: "A" | "B" }) {
  return (
    <span
      className={cn(
        "grid h-5 w-5 place-items-center rounded-md text-[10px] font-bold",
        tone === "A"
          ? "bg-primary text-primary-foreground"
          : "bg-accent text-accent-foreground",
      )}
    >
      {tone}
    </span>
  );
}

function Row({
  label,
  a,
  b,
  lang,
  dim,
}: {
  label: string;
  a: number;
  b: number;
  lang: "it" | "en";
  dim?: boolean;
}) {
  const d = b - a;
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2 text-[11px] sm:gap-3 sm:text-xs",
        dim && "opacity-70",
      )}
    >
      <span className="truncate text-muted-foreground">{label}</span>
      <span className="tabular-nums text-foreground/80">{formatEUR(a, lang)}</span>
      <span className="tabular-nums text-foreground/80">{formatEUR(b, lang)}</span>
      <span
        className={cn(
          "min-w-[64px] text-right font-semibold tabular-nums sm:min-w-[80px]",
          d === 0
            ? "text-muted-foreground"
            : d > 0
              ? "text-destructive"
              : "text-emerald-600 dark:text-emerald-400",
        )}
      >
        {d === 0 ? "—" : (d > 0 ? "+" : "") + formatEUR(d, lang)}
      </span>
    </div>
  );
}
