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
      <section className="relative overflow-hidden bg-surface text-surface-foreground grain">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-40" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_55%_at_78%_28%,oklch(0.68_0.16_42/.35),transparent_60%),radial-gradient(40%_45%_at_8%_92%,oklch(0.58_0.135_38/.22),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-surface-foreground/15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 eyebrow text-surface-foreground/65">
              <span className="tech-num text-primary">EP3 482 109</span>
              <span className="hidden sm:inline h-px w-8 bg-surface-foreground/25" />
              <span className="truncate">{t("home.badge")}</span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2rem,7vw,2.75rem)] font-semibold leading-[1.05] tracking-tight break-words sm:text-5xl md:text-[4.25rem] md:leading-[1.02]">
              {t("home.h1a")}
              <br />
              <span className="italic font-normal text-primary">{t("home.h1b")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-surface-foreground/75 sm:text-lg">{t("home.intro")}</p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 w-full sm:w-auto rounded-md px-6 text-[14px]">
                <Link to="/configurator">
                  {t("common.configureMixer")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full sm:w-auto rounded-md border-surface-foreground/25 bg-transparent px-6 text-[14px] text-surface-foreground hover:bg-surface-foreground/10 hover:text-surface-foreground"
              >
                <Link to="/technology">{t("common.seeTechnology")}</Link>
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 border-t border-surface-foreground/15 pt-8">
              <Stat n="1.200+" label={t("home.statDeployed")} idx="01" />
              <Stat n="42" label={t("home.statCountries")} idx="02" />
              <Stat n={t("home.statEngVal")} label={t("home.statEng")} idx="03" />
            </dl>
          </div>

          <div className="relative min-w-0 pt-4">
            <div className="mb-3 flex items-center gap-2 eyebrow text-surface-foreground/55">
              <span className="tech-num">FIG.01</span>
              <span className="h-px w-10 bg-surface-foreground/25" />
              <span className="truncate">Twin-Rotor Core</span>
            </div>
            <div className="tick-frame relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md overflow-hidden border border-surface-foreground/15 bg-gradient-to-br from-surface-foreground/5 to-transparent">
              <img
                src={heroMixer}
                alt="Mixer industriale MixCore"
                width={1024}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-surface/70 via-transparent to-primary/15 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4 text-[10px] sm:text-[11px] eyebrow text-surface-foreground/70">
                <span className="truncate">MX-Σ / 2026</span>
                <span className="tech-num shrink-0">Ø 2400 mm</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="eyebrow text-primary">
            {t("home.whyKicker")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("home.whyTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("home.whyIntro")}</p>
        </div>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="max-w-xl min-w-0">
              <p className="eyebrow text-primary">
                {t("home.howKicker")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                {t("home.howTitle")}
              </h2>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto">
              <Link to="/technology">
                {t("home.fullBreakdown")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
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
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-12 lg:px-8">
        <div className="min-w-0">
          <p className="eyebrow text-primary">
            {t("home.aboutKicker")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("home.aboutTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("home.aboutBody")}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/configurator">{t("common.startConfiguring")}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
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
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:py-10 sm:px-6 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 lg:px-8">
          <p className="eyebrow text-muted-foreground">
            {t("home.trustedBy")}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-70 sm:gap-x-10">
            {["NORDPHARMA", "ITALCHIM", "AURELIA F&B", "PETROVA", "BIOCOSM", "VALSAN"].map((b) => (
              <span key={b} className="text-xs sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] text-foreground/70">
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

function Stat({ n, label, idx }: { n: string; label: string; idx?: string }) {
  return (
    <div>
      {idx && (
        <span className="eyebrow block text-surface-foreground/40">{idx}</span>
      )}
      <dt className="mt-1 font-display tech-num text-2xl font-semibold text-surface-foreground md:text-3xl">
        {n}
      </dt>
      <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-surface-foreground/60">
        {label}
      </dd>
    </div>
  );
}

