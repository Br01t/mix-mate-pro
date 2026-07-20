import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="bg-surface text-surface-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-6 px-4 py-12 sm:items-start sm:py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-surface-foreground/70">{t("home.ctaBody")}</p>
        </div>
        <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
          <Link to="/configurator">
            {t("common.openConfigurator")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
