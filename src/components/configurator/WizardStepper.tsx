import { Check, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export type WizardStep = {
  n: number;
  label: { it: string; en: string };
};

type Props = {
  steps: WizardStep[];
  current: number;
  onJump: (n: number) => void;
};

export function WizardStepper({ steps, current, onJump }: Props) {
  const { pick, lang } = useI18n();
  const active = steps[current - 1];

  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:flex md:flex-row md:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/10 text-xs font-bold text-primary tech-num">
            {current}/{steps.length}
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">
              {lang === "it" ? "Fase di Configurazione" : "Configuration Phase"}
            </p>
            <p className="truncate text-sm font-semibold text-foreground">{pick(active.label)}</p>
          </div>
        </div>

        <div className="-mx-3 flex items-center gap-1.5 overflow-x-auto px-3 py-1 md:mx-0 md:gap-3 md:overflow-visible md:px-0">
          {steps.map((st, idx) => {
            const isActive = current === st.n;
            const isDone = current > st.n;
            const disabled = st.n > 2 && current < 2;
            return (
              <button
                key={st.n}
                type="button"
                disabled={disabled}
                onClick={() => onJump(st.n)}
                className="group flex shrink-0 items-center gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full border text-xs font-bold tech-num transition-all",
                    isActive &&
                      "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15",
                    isDone && "border-primary bg-primary/10 text-primary",
                    !isActive &&
                      !isDone &&
                      "border-border bg-muted/50 text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground",
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : st.n}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium md:inline",
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {pick(st.label)}
                </span>
                {idx < steps.length - 1 && (
                  <ChevronRight className="hidden h-3 w-3 text-muted-foreground/70 md:block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
