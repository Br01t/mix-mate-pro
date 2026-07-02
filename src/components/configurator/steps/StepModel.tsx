import { ChevronLeft, ChevronRight, GitCompare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { ModelGrid } from "../ModelGrid";
import type { useConfigurator } from "../useConfigurator";

type Props = { cfg: ReturnType<typeof useConfigurator> };

export function StepModel({ cfg }: Props) {
  const { lang } = useI18n();
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {lang === "it" ? "2. Seleziona il Modello Base" : "2. Select Base Mixer Model"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "it"
              ? "Scegli il modello ideale. I modelli raccomandati sono evidenziati con la stella."
              : "Pick the ideal model. Recommended options are highlighted with a star."}
          </p>
        </div>
        {cfg.requirements.industry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => cfg.setStep(1)}
            className="gap-1 font-semibold text-primary hover:bg-primary/10"
          >
            <Settings className="h-3.5 w-3.5" />
            {lang === "it" ? "Modifica Requisiti" : "Edit Requirements"}
          </Button>
        )}
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
