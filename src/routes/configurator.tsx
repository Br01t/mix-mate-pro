import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useConfigurator } from "@/components/configurator/useConfigurator";
import { ModelGrid } from "@/components/configurator/ModelGrid";
import { OptionalsList } from "@/components/configurator/OptionalsList";
import { SummaryPanel } from "@/components/configurator/SummaryPanel";
import { QuoteDialog } from "@/components/configurator/QuoteDialog";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configuratore — Costruisci il tuo mixer MixCore" },
      { name: "description", content: "Configuratore B2B interattivo: scegli il modello, aggiungi gli optional e richiedi un preventivo ufficiale in pochi minuti." },
      { property: "og:title", content: "Configuratore — Costruisci il tuo mixer MixCore" },
      { property: "og:description", content: "Configuratore B2B interattivo: modello, optional e preventivo ufficiale." },
    ],
  }),
  component: ConfiguratorPage,
});

function ConfiguratorPage() {
  const cfg = useConfigurator();
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <section className="border-b border-border bg-surface text-surface-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("cfg.kicker")}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t("cfg.title")}</h1>
          <p className="mt-3 max-w-2xl text-surface-foreground/75">{t("cfg.intro")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Step n={1} />
                <h2 className="text-xl font-semibold tracking-tight">{t("cfg.step1")}</h2>
              </div>
              <ModelGrid selectedId={cfg.modelId} onSelect={cfg.setModelId} />
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
              />
            </div>
          </div>

          <SummaryPanel
            model={cfg.model}
            chosenOptionals={cfg.chosenOptionals}
            total={cfg.total}
            onRequestQuote={() => setOpen(true)}
            onRemoveOptional={cfg.toggleOptional}
            onReset={cfg.reset}
          />
        </div>
      </section>

      <QuoteDialog
        open={open}
        onOpenChange={setOpen}
        model={cfg.model}
        chosenOptionals={cfg.chosenOptionals}
        total={cfg.total}
        onResetConfig={cfg.reset}
      />
    </>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
      {n}
    </span>
  );
}
