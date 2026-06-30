import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { industries, CAPACITY_OPTIONS, VISCOSITY_OPTIONS } from "@/data/industries";
import type { useConfigurator } from "../useConfigurator";

type Props = {
  cfg: ReturnType<typeof useConfigurator>;
};

export function StepRequirements({ cfg }: Props) {
  const { lang, pick } = useI18n();
  return (
    <div className="animate-in fade-in space-y-8 duration-300">
      <header className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">
          {lang === "it"
            ? "1. Seleziona il Settore di Applicazione"
            : "1. Select your Target Industry"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "it"
            ? "I sistemi MixCore sono ottimizzati per le sfide normative e chimiche di specifici mercati. Scegli il tuo."
            : "MixCore systems are optimized for the regulatory and chemical challenges of specific markets. Select yours."}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {industries.map((ind) => {
          const selected = cfg.requirements.industry === ind.id;
          const Icon = ind.icon;
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => cfg.setRequirement("industry", ind.id)}
              className={cn(
                "flex flex-col items-start rounded-xl border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div
                className={cn(
                  "mb-4 grid h-10 w-10 place-items-center rounded-lg transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-foreground">{pick(ind.label)}</h3>
              <p className="text-xs leading-normal text-muted-foreground">{pick(ind.desc)}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-border pt-4 sm:grid-cols-2">
        <ChoiceGroup
          title={lang === "it" ? "Capacità Volumetrica Target" : "Target Volumetric Capacity"}
          hint={
            lang === "it"
              ? "Qual è la dimensione indicativa dei batch?"
              : "What is the indicative scale of your batch sizes?"
          }
          options={CAPACITY_OPTIONS}
          selected={cfg.requirements.capacity}
          onSelect={(id) => cfg.setRequirement("capacity", id)}
        />
        <ChoiceGroup
          title={lang === "it" ? "Viscosità Massima Trattata" : "Maximum Process Viscosity"}
          hint={
            lang === "it"
              ? "Viscosità dei fluidi o delle miscele."
              : "Maximum thickness of fluids or compounds processed."
          }
          options={VISCOSITY_OPTIONS}
          selected={cfg.requirements.viscosity}
          onSelect={(id) => cfg.setRequirement("viscosity", id)}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-6">
        <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
          {lang === "it" ? "Trova il mio Mixer" : "Find my Mixer"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ChoiceGroup<T extends string>({
  title,
  hint,
  options,
  selected,
  onSelect,
}: {
  title: string;
  hint: string;
  options: ReadonlyArray<{ id: T; label: { it: string; en: string } }>;
  selected: string | null;
  onSelect: (id: T) => void;
}) {
  const { pick } = useI18n();
  return (
    <div className="space-y-3">
      <div>
        <h3 className="eyebrow text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSel = selected === opt.id;
          return (
            <Button
              key={opt.id}
              type="button"
              variant={isSel ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(opt.id)}
              className="h-auto px-1 py-5 text-xs"
            >
              {pick(opt.label)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
