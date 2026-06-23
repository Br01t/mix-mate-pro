import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Target, ShieldCheck, Cpu, Cog, Sparkles, Factory, FlaskConical, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MixCore — Patented Industrial Mixing Technology" },
      { name: "description", content: "Patented twin-rotor industrial mixers engineered for precision, safety and uptime. Configure your machine online." },
      { property: "og:title", content: "MixCore — Patented Industrial Mixing Technology" },
      { property: "og:description", content: "Patented twin-rotor industrial mixers engineered for precision, safety and uptime." },
    ],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Gauge,       title: "+38% throughput",  desc: "Patented twin-rotor geometry delivers higher mixing rates at lower energy." },
  { icon: Target,      title: "Sub-micron precision", desc: "Homogenization down to 0.8 µm for pharma-grade reproducibility." },
  { icon: ShieldCheck, title: "Certified safety", desc: "ATEX, CE, FDA & 3-A sanitary compliance across the product line." },
  { icon: Cpu,         title: "Smart control",    desc: "IoT-ready PLC with recipe management and predictive maintenance." },
];

const steps = [
  { n: "01", title: "Counter-flow injection", desc: "Substances enter through opposing inlets, pre-conditioned for shear and temperature." },
  { n: "02", title: "Twin-rotor blending",    desc: "Patented twin-rotor cell creates micro-vortices, eliminating dead zones." },
  { n: "03", title: "Inline verification",    desc: "Optical sensors validate homogeneity in real time before discharge." },
];

const industries = [
  { icon: FlaskConical, label: "Pharmaceutical" },
  { icon: Beaker,       label: "Cosmetics" },
  { icon: Factory,      label: "Chemicals" },
  { icon: Sparkles,     label: "Food & Beverage" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface text-surface-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_50%_at_70%_30%,oklch(0.66_0.13_195/.45),transparent_60%),radial-gradient(50%_40%_at_20%_80%,oklch(0.7_0.13_230/.35),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-surface-foreground/15 bg-surface-foreground/5 px-3 py-1 text-xs font-medium text-surface-foreground/80">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Patent EP3 482 109 — Twin-rotor mixing
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Industrial mixing,<br />
              <span className="text-primary">engineered to the micron.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-surface-foreground/75">
              Our patented twin-rotor process delivers higher throughput, sharper
              precision and unmatched repeatability — for the world's most demanding
              production lines.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/configurator">
                  Configure your mixer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-surface-foreground/20 bg-transparent text-surface-foreground hover:bg-surface-foreground/10 hover:text-surface-foreground">
                <Link to="/technology">See the technology</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-surface-foreground/10 pt-8">
              <Stat n="1,200+" label="Units deployed" />
              <Stat n="42" label="Countries" />
              <Stat n="18 yr" label="Engineering" />
            </dl>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-2xl border border-surface-foreground/10 bg-gradient-to-br from-surface-foreground/5 to-transparent p-8">
              <div className="absolute inset-8 grid place-items-center rounded-xl bg-surface-foreground/[0.03]">
                <Cog className="h-48 w-48 animate-[spin_18s_linear_infinite] text-primary/70" />
              </div>
              <Cog className="absolute right-6 top-6 h-20 w-20 animate-[spin_12s_linear_infinite_reverse] text-accent/70" />
              <Cog className="absolute bottom-6 left-6 h-16 w-16 animate-[spin_14s_linear_infinite] text-surface-foreground/40" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why MixCore</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">A new standard for industrial mixing.</h2>
          <p className="mt-3 text-muted-foreground">
            Built around a single patented innovation, every MixCore unit raises
            throughput, precision and uptime in one engineered package.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
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
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Three engineered stages.</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/technology">Full technical breakdown <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">About MixCore</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            18 years of mixing engineering, one patent that changed the standard.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Founded in 2007 in Milan, MixCore designs and manufactures industrial
            mixing systems for regulated industries. Our patented twin-rotor cell
            (EP3 482 109) is now deployed across pharma, food, chemical and
            petrochemical production lines in 42 countries.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild><Link to="/configurator">Start configuring</Link></Button>
            <Button asChild variant="outline"><Link to="/technology">Read the spec sheet</Link></Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {industries.map((i) => (
            <div key={i.label} className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <i.icon className="h-5 w-5" />
              </div>
              <p className="font-medium">{i.label}</p>
              <p className="text-sm text-muted-foreground">Engineered for the regulatory and process demands of {i.label.toLowerCase()} production.</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted by manufacturers in 42 countries</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 opacity-70">
            {["NORDPHARMA", "ITALCHIM", "AURELIA F&B", "PETROVA", "BIOCOSM", "VALSAN"].map((b) => (
              <span key={b} className="text-sm font-bold tracking-[0.2em] text-foreground/70">{b}</span>
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
