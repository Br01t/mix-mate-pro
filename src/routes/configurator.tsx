import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GitCompare, Layers } from "lucide-react";
import { useConfigurator, type SlotId } from "@/components/configurator/useConfigurator";
import { ModelGrid } from "@/components/configurator/ModelGrid";
import { OptionalsList } from "@/components/configurator/OptionalsList";
import { SummaryPanel } from "@/components/configurator/SummaryPanel";
import { ComparePanel } from "@/components/configurator/ComparePanel";
import { QuoteDialog } from "@/components/configurator/QuoteDialog";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/mixer-flagship.jpg";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configuratore — Costruisci il tuo mixer MixCore" },
      { name: "description", content: "Configuratore B2B interattivo: scegli il modello, aggiungi gli optional, confronta due configurazioni e richiedi un preventivo ufficiale." },
      { property: "og:title", content: "Configuratore — Costruisci il tuo mixer MixCore" },
      { property: "og:description", content: "Configuratore B2B interattivo con modalità confronto e preventivo ufficiale." },
    ],
  }),
  component: ConfiguratorPage,
});

function ConfiguratorPage() {
  const cfg = useConfigurator();
  const [open, setOpen] = useState(false);
  const [quoteSlot, setQuoteSlot] = useState<SlotId>("A");
  const { t } = useI18n();

  const openQuote = (s: SlotId) => {
    cfg.setActive(s);
    setQuoteSlot(s);
    setOpen(true);
  };

  const quotedSlot = quoteSlot === "A" ? cfg.A : cfg.B;

  return (
    <>
      {/* Immersive hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface text-surface-foreground">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_80%_30%,oklch(0.66_0.13_195/.55),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <Layers className="h-4 w-4" />
                {t("cfg.kicker")}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{t("cfg.title")}</h1>
              <p className="mt-3 text-surface-foreground/75">{t("cfg.intro")}</p>
            </div>

            {/* Compare toggle */}
            <label
              htmlFor="compare-toggle"
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur transition-all",
                cfg.compare
                  ? "border-primary/60 bg-primary/10"
                  : "border-surface-foreground/15 bg-surface-foreground/5 hover:border-surface-foreground/30",
              )}
            >
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-lg transition-colors",
                  cfg.compare ? "bg-primary text-primary-foreground" : "bg-surface-foreground/10 text-surface-foreground/70",
                )}
              >
                <GitCompare className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t("cfg.compareMode")}</p>
                <p className="text-xs text-surface-foreground/65">{t("cfg.compareHint")}</p>
              </div>
              <Switch id="compare-toggle" checked={cfg.compare} onCheckedChange={cfg.toggleCompare} />
            </label>
          </div>
        </div>
      </section>

      {/* Compare floating slot picker */}
      {cfg.compare && (
        <section className="sticky top-16 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
              {t("cfg.editing")}:
            </span>
            <div className="flex flex-1 gap-2 sm:flex-none">
              {(["A", "B"] as const).map((s) => {
                const data = s === "A" ? cfg.A : cfg.B;
                const isActive = cfg.active === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => cfg.setActive(s)}
                    className={cn(
                      "flex flex-1 items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all sm:flex-none",
                      isActive
                        ? s === "A"
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-accent bg-accent/10 shadow-sm"
                        : "border-border bg-card hover:border-foreground/20",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-md text-sm font-bold",
                        s === "A" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
                      )}
                    >
                      {s}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-tight">{data.model.name}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {data.chosen.length} opt · {data.total.toLocaleString()} €
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn("grid gap-10", !cfg.compare && "lg:grid-cols-[1fr_380px]")}>
          {/* Compare panel goes at top when compare mode is on */}
          {cfg.compare && (
            <div className="lg:col-span-1">
              <ComparePanel
                A={cfg.A}
                B={cfg.B}
                active={cfg.active}
                onActivate={cfg.setActive}
                onRequestQuote={openQuote}
                onDuplicate={cfg.duplicateAB}
                onSwap={cfg.swapAB}
                onReset={cfg.reset}
              />
            </div>
          )}

          <div className="space-y-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Step n={1} />
                <h2 className="text-xl font-semibold tracking-tight">{t("cfg.step1")}</h2>
              </div>
              <ModelGrid
                selectedId={cfg.modelId}
                onSelect={cfg.setModelId}
                selectedIdA={cfg.compare ? cfg.A.model.id : undefined}
                selectedIdB={cfg.compare ? cfg.B.model.id : undefined}
                activeSlot={cfg.compare ? cfg.active : undefined}
              />
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <Step n={2} />
                <h2 className="text-xl font-semibold tracking-tight">{t("cfg.step2")}</h2>
              </div>
              <OptionalsList
                selected={cfg.selectedOptionals}
                onToggle={cfg.toggleOptional}
                onSelectAll={cfg.selectAllOptionals}
                onClearAll={cfg.clearAllOptionals}
                selectedA={cfg.compare ? cfg.A.optionals : undefined}
                selectedB={cfg.compare ? cfg.B.optionals : undefined}
                activeSlot={cfg.compare ? cfg.active : undefined}
              />
            </div>
          </div>

          {!cfg.compare && (
            <SummaryPanel
              model={cfg.model}
              chosenOptionals={cfg.chosenOptionals}
              total={cfg.total}
              onRequestQuote={() => openQuote("A")}
              onRemoveOptional={cfg.toggleOptional}
              onReset={cfg.resetActive}
            />
          )}
        </div>
      </section>

      <QuoteDialog
        open={open}
        onOpenChange={setOpen}
        model={quotedSlot.model}
        chosenOptionals={quotedSlot.chosen}
        total={quotedSlot.total}
        onResetConfig={cfg.reset}
      />
    </>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground shadow-md ring-4 ring-primary/15">
      {n}
    </span>
  );
}
