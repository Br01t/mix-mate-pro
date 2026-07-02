import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { CompareToggleInline } from "../CompareToggleInline";
import { OptionalsList } from "../OptionalsList";
import type { useConfigurator } from "../useConfigurator";

type Props = { cfg: ReturnType<typeof useConfigurator> };

export function StepOptionals({ cfg }: Props) {
  const { lang } = useI18n();
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border pb-4 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            {lang === "it"
              ? "3. Aggiungi Upgrade & Certificazioni"
              : "3. Add Upgrades & Certifications"}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {lang === "it"
              ? "Aggiungi sensori, certificazioni e servizi. I badge indicano gli abbinamenti consigliati per il tuo settore."
              : "Add sensors, certs and support. Badges suggest recommended additions for your industry."}
          </p>
        </div>
        <CompareToggleInline compare={cfg.compare} onToggle={cfg.toggleCompare} />
      </header>

      <OptionalsList
        selected={cfg.selectedOptionals}
        onToggle={cfg.toggleOptional}
        onSelectAll={cfg.selectAllOptionals}
        onClearAll={cfg.clearAllOptionals}
        selectedA={cfg.compare ? cfg.A.optionals : undefined}
        selectedB={cfg.compare ? cfg.B.optionals : undefined}
        activeSlot={cfg.compare ? cfg.active : undefined}
        onToggleFor={cfg.compare ? cfg.toggleOptionalIn : undefined}
        onSelectAllFor={cfg.compare ? cfg.selectAllOptionalsIn : undefined}
        onClearAllFor={cfg.compare ? cfg.clearAllOptionalsIn : undefined}
        industry={cfg.requirements.industry}
      />

      <div className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={cfg.prevStep} size="lg" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          {lang === "it" ? "Indietro" : "Back"}
        </Button>
        <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
          {lang === "it" ? "Vedi Riepilogo" : "Go to Review"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
