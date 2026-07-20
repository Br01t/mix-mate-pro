import { Layers } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import heroBg from "@/assets/mixer-flagship.jpg";

export function WizardHero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface text-surface-foreground grain">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
      <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-30" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_55%_at_82%_28%,oklch(0.68_0.16_42/.35),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 md:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
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
      </div>
    </section>
  );
}

