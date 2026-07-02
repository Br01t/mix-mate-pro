import { GitCompare, Layers } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/mixer-flagship.jpg";

type Props = {
  compare: boolean;
  onToggleCompare: () => void;
  showCompareToggle?: boolean;
};

export function WizardHero({ compare, onToggleCompare, showCompareToggle = true }: Props) {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface text-surface-foreground grain">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
      <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-30" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_55%_at_82%_28%,oklch(0.68_0.16_42/.35),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-8 lg:py-24">
        <div className={cn("grid items-end gap-4 sm:gap-6", showCompareToggle ? "grid-cols-[minmax(0,1fr)_auto]" : "grid-cols-1")}>
          <div className="min-w-0 max-w-2xl">
            <p className="flex items-center gap-2 eyebrow text-primary">
              <Layers className="h-4 w-4 shrink-0" />
              <span className="truncate">{t("cfg.kicker")}</span>
            </p>
            <h1 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {t("cfg.title")}
            </h1>
            <p className="mt-3 text-sm text-surface-foreground/75 sm:text-base">
              {t("cfg.intro")}
            </p>
          </div>

          {showCompareToggle && (
            <label
              htmlFor="compare-toggle"
              className={cn(
                "flex shrink-0 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 backdrop-blur transition-all sm:gap-3 sm:px-4 sm:py-2.5",
                compare
                  ? "border-primary/60 bg-primary/10"
                  : "border-surface-foreground/15 bg-surface-foreground/5 hover:border-surface-foreground/30",
              )}
            >
              <div
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-md transition-colors sm:h-9 sm:w-9",
                  compare
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-foreground/10 text-surface-foreground/70",
                )}
              >
                <GitCompare className="h-4 w-4" />
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="text-sm font-semibold">{t("cfg.compareMode")}</p>
                <p className="text-[11px] text-surface-foreground/65">{t("cfg.compareHint")}</p>
              </div>
              <Switch id="compare-toggle" checked={compare} onCheckedChange={onToggleCompare} />
            </label>
          )}
        </div>
      </div>
    </section>
  );
}
