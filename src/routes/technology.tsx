import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Droplets,
  Wind,
  Activity,
  CheckCircle2,
  FlaskConical,
  Beaker,
  Factory,
  Sparkles,
  Fuel,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Tecnologia — Processo di miscelazione brevettato MixCore" },
      {
        name: "description",
        content:
          "Come funziona il processo brevettato twin-rotor MixCore, specifiche tecniche e settori target.",
      },
      { property: "og:title", content: "Tecnologia — Processo di miscelazione brevettato MixCore" },
      {
        property: "og:description",
        content: "Come funziona il processo twin-rotor MixCore, specifiche tecniche e casi d'uso.",
      },
    ],
  }),
  component: TechnologyPage,
});

function TechnologyPage() {
  const { t } = useI18n();

  const process = [
    { icon: Droplets, title: t("tech.p1Title"), desc: t("tech.p1Desc") },
    { icon: Wind, title: t("tech.p2Title"), desc: t("tech.p2Desc") },
    { icon: Activity, title: t("tech.p3Title"), desc: t("tech.p3Desc") },
    { icon: CheckCircle2, title: t("tech.p4Title"), desc: t("tech.p4Desc") },
  ];

  const specs: [string, string][] = [
    [t("tech.spec.throughput.k"), t("tech.spec.throughput.v")],
    [t("tech.spec.precision.k"), t("tech.spec.precision.v")],
    [t("tech.spec.viscosity.k"), t("tech.spec.viscosity.v")],
    [t("tech.spec.power.k"), t("tech.spec.power.v")],
    [t("tech.spec.materials.k"), t("tech.spec.materials.v")],
    [t("tech.spec.temp.k"), t("tech.spec.temp.v")],
    [t("tech.spec.pressure.k"), t("tech.spec.pressure.v")],
    [t("tech.spec.certs.k"), t("tech.spec.certs.v")],
    [t("tech.spec.control.k"), t("tech.spec.control.v")],
    [t("tech.spec.connect.k"), t("tech.spec.connect.v")],
  ];

  const industries = [
    {
      icon: FlaskConical,
      name: t("tech.industries.pharma.n"),
      desc: t("tech.industries.pharma.d"),
    },
    { icon: Sparkles, name: t("tech.industries.food.n"), desc: t("tech.industries.food.d") },
    { icon: Factory, name: t("tech.industries.chem.n"), desc: t("tech.industries.chem.d") },
    { icon: Beaker, name: t("tech.industries.cosm.n"), desc: t("tech.industries.cosm.d") },
    { icon: Fuel, name: t("tech.industries.petro.n"), desc: t("tech.industries.petro.d") },
    { icon: HardHat, name: t("tech.industries.constr.n"), desc: t("tech.industries.constr.d") },
  ];

  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow text-primary">
            {t("tech.kicker")}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl break-words">
            {t("tech.h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-surface-foreground/75">{t("tech.intro")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="eyebrow text-primary">
          {t("tech.howKicker")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {t("tech.howTitle")}
        </h2>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, idx) => (
            <div key={p.title} className="relative rounded-xl border border-border bg-card p-6">
              <span className="absolute right-4 top-4 text-xs font-mono text-muted-foreground">
                0{idx + 1}
              </span>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:gap-10 sm:px-6 sm:py-20 md:grid-cols-2 lg:px-8">
          <div className="min-w-0">
            <p className="eyebrow text-primary">
              {t("tech.specsKicker")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              {t("tech.specsTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("tech.specsIntro")}</p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/configurator">
                  {t("tech.configureSpecs")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Desktop View */}
            <table className="hidden sm:table w-full text-sm">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-muted/30" : ""}>
                    <th className="w-1/2 px-5 py-3 text-left font-medium text-muted-foreground">
                      {k}
                    </th>
                    <td className="px-5 py-3 font-medium text-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="sm:hidden flex flex-col divide-y divide-border text-sm">
              {specs.map(([k, v], i) => (
                <div
                  key={k}
                  className={cn("px-4 py-3 flex flex-col gap-1", i % 2 ? "bg-muted/20" : "")}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {k}
                  </span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="eyebrow text-primary">
          {t("tech.casesKicker")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {t("tech.casesTitle")}
        </h2>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div
              key={i.name}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
