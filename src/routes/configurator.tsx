import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useConfigurator, type SlotId } from "@/components/configurator/useConfigurator";
import { WizardHero } from "@/components/configurator/WizardHero";
import { WizardStepper, type WizardStep } from "@/components/configurator/WizardStepper";
import { CompareSummaryBar } from "@/components/configurator/CompareSummaryBar";
import { CompareDiffTable } from "@/components/configurator/CompareDiffTable";
import { MobileBottomBar } from "@/components/configurator/MobileBottomBar";
import { SummaryPanel } from "@/components/configurator/SummaryPanel";
import { QuoteDialog } from "@/components/configurator/QuoteDialog";
import { StepRequirements } from "@/components/configurator/steps/StepRequirements";
import { StepModel } from "@/components/configurator/steps/StepModel";
import { StepOptionals } from "@/components/configurator/steps/StepOptionals";
import { StepReview } from "@/components/configurator/steps/StepReview";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configuratore — Costruisci il tuo mixer MixCore" },
      {
        name: "description",
        content:
          "Configuratore B2B interattivo a step guidati: scegli settore, modello, optional, ed esporta il tuo preventivo PDF ufficiale.",
      },
      { property: "og:title", content: "Configuratore — Costruisci il tuo mixer MixCore" },
      {
        property: "og:description",
        content: "Configuratore B2B interattivo a step guidati con export PDF e confronto.",
      },
    ],
  }),
  component: ConfiguratorPage,
});

const STEPS: WizardStep[] = [
  { n: 1, label: { it: "Requisiti di Processo", en: "Process Requirements" } },
  { n: 2, label: { it: "Scelta del Mixer", en: "Mixer Selection" } },
  { n: 3, label: { it: "Upgrade & Optional", en: "Upgrades & Optionals" } },
  { n: 4, label: { it: "Riepilogo & Preventivo", en: "Review & Quote" } },
];

function ConfiguratorPage() {
  const cfg = useConfigurator();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSlot, setQuoteSlot] = useState<SlotId>("A");

  const openQuote = (s: SlotId) => {
    cfg.setActive(s);
    setQuoteSlot(s);
    setQuoteOpen(true);
  };

  const quotedSlot = quoteSlot === "A" ? cfg.A : cfg.B;
  const showCompareBar = cfg.compare && cfg.step >= 2 && cfg.step <= 3;
  const showSideSummary = (cfg.step === 2 || cfg.step === 3) && !cfg.compare;

  return (
    <div className="pb-28 lg:pb-12">
      <WizardHero />

      <div className="sticky top-[68px] z-30 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto max-w-7xl px-3 pt-3 pb-3 sm:px-6 lg:px-8">
          <WizardStepper steps={STEPS} current={cfg.step} onJump={cfg.setStep} />
        </div>
        {showCompareBar && (
          <CompareSummaryBar
            A={cfg.A}
            B={cfg.B}
            onDuplicate={cfg.duplicateAB}
            onSwap={cfg.swapAB}
            onDisable={cfg.disableCompare}
          />
        )}
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-8",
            showSideSummary && "lg:grid-cols-[minmax(0,1fr)_360px]",
          )}
        >
          <div className="min-w-0 space-y-6">
            {showCompareBar && (
              <CompareDiffTable
                selectedA={cfg.A.optionals}
                selectedB={cfg.B.optionals}
                baseA={cfg.A.model.basePrice}
                baseB={cfg.B.model.basePrice}
                modelANameDiffers={cfg.A.model.id !== cfg.B.model.id}
              />
            )}

            {cfg.step === 1 && <StepRequirements cfg={cfg} />}
            {cfg.step === 2 && <StepModel cfg={cfg} />}
            {cfg.step === 3 && <StepOptionals cfg={cfg} />}
            {cfg.step === 4 && <StepReview cfg={cfg} onOpenQuote={openQuote} />}
          </div>

          {showSideSummary && (
            <aside className="hidden lg:block">
              <SummaryPanel
                model={cfg.model}
                chosenOptionals={cfg.chosenOptionals}
                total={cfg.total}
                onRequestQuote={() => cfg.setStep(4)}
                onRemoveOptional={cfg.toggleOptional}
                onReset={cfg.resetActive}
              />
            </aside>
          )}
        </div>
      </section>

      {cfg.step < 4 && (
        <MobileBottomBar
          step={cfg.step}
          total={cfg.total}
          compare={cfg.compare ? { A: cfg.A, B: cfg.B } : undefined}
          onPrev={cfg.prevStep}
          onNext={cfg.nextStep}
        />
      )}

      <QuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        model={quotedSlot.model}
        chosenOptionals={quotedSlot.chosen}
        total={quotedSlot.total}
        onResetConfig={cfg.reset}
      />
    </div>
  );
}
