import { ChevronLeft, ChevronRight, GitCompare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { CompareToggleInline } from "../CompareToggleInline";
import { ModelGrid } from "../ModelGrid";
import type { useConfigurator } from "../useConfigurator";

type Props = { cfg: ReturnType<typeof useConfigurator> };

export function StepModel({ cfg }: Props) {
  const { lang } = useI18n();
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border pb-4 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            {lang === "it" ? "2. Seleziona il Modello Base" : "2. Select Base Mixer Model"}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {lang === "it"
              ? "Scegli il modello ideale. I modelli raccomandati sono evidenziati con la stella."
              : "Pick the ideal model. Recommended options are highlighted with a star."}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <CompareToggleInline compare={cfg.compare} onToggle={cfg.toggleCompare} />
          {cfg.requirements.industry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => cfg.setStep(1)}
              className="h-8 gap-1 px-2 text-xs font-semibold text-primary hover:bg-primary/10"
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {lang === "it" ? "Modifica Requisiti" : "Edit Requirements"}
              </span>
            </Button>
          )}
        </div>
      </header>

      <ModelGrid
        selectedId={cfg.modelId}
        onSelect={cfg.setModelId}
        selectedIdA={cfg.compare ? cfg.A.model.id : undefined}
        selectedIdB={cfg.compare ? cfg.B.model.id : undefined}
        activeSlot={cfg.compare ? cfg.active : undefined}
        onSelectFor={cfg.compare ? cfg.setModelIdFor : undefined}
        recommendedIds={cfg.recommendedModelIds}
      />

      {!cfg.compare && (
        <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-4 sm:p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                <GitCompare className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">
                  {lang === "it"
                    ? `Hai scelto ${cfg.model.name}. Vuoi confrontarlo?`
                    : `You picked ${cfg.model.name}. Want to compare it?`}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {lang === "it"
                    ? "Attiva la modalità confronto per valutare due configurazioni fianco a fianco."
                    : "Enable compare mode to evaluate two configurations side by side."}
                </p>
              </div>
            </div>
            <Button
              onClick={cfg.enableCompare}
              size="lg"
              className="w-full shrink-0 gap-2 font-semibold sm:w-auto"
            >
              <GitCompare className="h-4 w-4" />
              {lang === "it" ? "Attiva confronto" : "Enable compare"}
            </Button>
          </div>
        </div>
      )}


      <div className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={cfg.prevStep} size="lg" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          {lang === "it" ? "Indietro" : "Back"}
        </Button>
        <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
          {lang === "it" ? "Personalizza Accessori" : "Customize Upgrades"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
