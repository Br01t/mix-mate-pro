import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gauge,
  Target,
  ShieldCheck,
  Cpu,
  Sparkles,
  Factory,
  FlaskConical,
  Beaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { useI18n } from "@/i18n/I18nProvider";
import heroMixer from "@/assets/mixer-flagship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MixCore — Tecnologia brevettata di miscelazione industriale" },
      {
        name: "description",
        content:
          "Mixer industriali twin-rotor brevettati per precisione, sicurezza e continuità operativa. Configura la tua macchina online.",
      },
      {
        property: "og:title",
        content: "MixCore — Tecnologia brevettata di miscelazione industriale",
      },
      {
        property: "og:description",
        content:
          "Mixer industriali twin-rotor brevettati per precisione, sicurezza e continuità operativa.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  const benefits = [
    { icon: Gauge, title: t("home.benefit1Title"), desc: t("home.benefit1Desc") },
    { icon: Target, title: t("home.benefit2Title"), desc: t("home.benefit2Desc") },
    { icon: ShieldCheck, title: t("home.benefit3Title"), desc: t("home.benefit3Desc") },
    { icon: Cpu, title: t("home.benefit4Title"), desc: t("home.benefit4Desc") },
  ];
  const steps = [
    { n: "01", title: t("home.step1Title"), desc: t("home.step1Desc") },
    { n: "02", title: t("home.step2Title"), desc: t("home.step2Desc") },
    { n: "03", title: t("home.step3Title"), desc: t("home.step3Desc") },
  ];
  const industries = [
    { icon: FlaskConical, label: t("tech.industries.pharma.n") },
    { icon: Beaker, label: t("tech.industries.cosm.n") },
    { icon: Factory, label: t("tech.industries.chem.n") },
    { icon: Sparkles, label: t("tech.industries.food.n") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface text-surface-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_50%_at_70%_30%,oklch(0.66_0.13_195/.45),transparent_60%),radial-gradient(50%_40%_at_20%_80%,oklch(0.7_0.13_230/.35),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-surface-foreground/15 bg-surface-foreground/5 px-3 py-1 text-xs font-medium text-surface-foreground/80">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("home.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {t("home.h1a")}
              <br />
              <span className="text-primary">{t("home.h1b")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-surface-foreground/75">{t("home.intro")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/configurator">
                  {t("common.configureMixer")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-surface-foreground/20 bg-transparent text-surface-foreground hover:bg-surface-foreground/10 hover:text-surface-foreground"
              >
                <Link to="/technology">{t("common.seeTechnology")}</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 border-t border-surface-foreground/10 pt-8">
              <Stat n="1.200+" label={t("home.statDeployed")} />
              <Stat n="42" label={t("home.statCountries")} />
              <Stat n={t("home.statEngVal")} label={t("home.statEng")} />
            </dl>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-surface-foreground/10 bg-gradient-to-br from-surface-foreground/5 to-transparent">
              <img
                src={heroMixer}
                alt="Mixer industriale MixCore"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-surface/60 via-transparent to-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("home.whyKicker")}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("home.whyTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("home.whyIntro")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t("home.howKicker")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.howTitle")}
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/technology">
                {t("home.fullBreakdown")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-6">
                <span className="text-sm font-mono font-semibold text-primary">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("home.aboutKicker")}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("home.aboutTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("home.aboutBody")}</p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link to="/configurator">{t("common.startConfiguring")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/technology">{t("common.readSpecs")}</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industries.map((i) => (
            <div
              key={i.label}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <i.icon className="h-5 w-5" />
              </div>
              <p className="font-medium">{i.label}</p>
              <p className="text-sm text-muted-foreground">
                {t("home.industryDesc")} {i.label.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("home.trustedBy")}
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 opacity-70">
            {["NORDPHARMA", "ITALCHIM", "AURELIA F&B", "PETROVA", "BIOCOSM", "VALSAN"].map((b) => (
              <span key={b} className="text-sm font-bold tracking-[0.2em] text-foreground/70">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-semibold text-surface-foreground md:text-3xl">{n}</dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-surface-foreground/60">{label}</dd>
    </div>
  );
}
