import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Wind, Activity, CheckCircle2, FlaskConical, Beaker, Factory, Sparkles, Fuel, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — MixCore Patented Mixing Process" },
      { name: "description", content: "How the patented MixCore twin-rotor mixing process works, technical specifications and target industries." },
      { property: "og:title", content: "Technology — MixCore Patented Mixing Process" },
      { property: "og:description", content: "How the patented MixCore twin-rotor mixing process works, with technical specifications and use cases." },
    ],
  }),
  component: TechnologyPage,
});

const process = [
  { icon: Droplets, title: "Counter-flow injection", desc: "Two substances enter the mixing chamber through opposing inlets, each pre-conditioned for shear, temperature and flow rate." },
  { icon: Wind,     title: "Twin-rotor vortex",      desc: "Our patented twin-rotor geometry generates synchronized micro-vortices, eliminating dead zones and overshear." },
  { icon: Activity, title: "Inline verification",    desc: "Optical and ultrasonic sensors validate particle distribution in real time before discharge." },
  { icon: CheckCircle2, title: "Closed-loop control", desc: "The PLC adjusts rotor speed and dwell time on the fly to hold the recipe within target tolerance." },
];

const specs: [string, string][] = [
  ["Throughput",                "50 — 5,000 L per batch"],
  ["Mixing precision",          "Down to 0.8 µm homogenization"],
  ["Viscosity range",           "1 cP — 250,000 cP"],
  ["Drive power",               "1.5 — 75 kW (frequency controlled)"],
  ["Contact materials",         "AISI 304 / 316L / Hastelloy C-22"],
  ["Operating temperature",     "-10 °C to +180 °C"],
  ["Working pressure",          "Up to 6 bar (jacketed)"],
  ["Certifications",            "CE, ATEX, FDA, 3-A sanitary, IECEx"],
  ["Control system",            "Siemens S7-1500 / Rockwell ControlLogix"],
  ["Connectivity",              "OPC-UA, Modbus TCP, REST API, MQTT"],
];

const industries = [
  { icon: FlaskConical, name: "Pharmaceutical",  desc: "API formulation, vaccine adjuvants, sterile sanitary builds with full traceability." },
  { icon: Sparkles,     name: "Food & Beverage", desc: "Emulsions, sauces, dairy and plant-based blends with CIP/SIP cleaning." },
  { icon: Factory,      name: "Chemicals",       desc: "Reactive mixing, polymer dispersion, catalyst homogenization at scale." },
  { icon: Beaker,       name: "Cosmetics",       desc: "High-viscosity creams, gels and lotions with controlled aeration." },
  { icon: Fuel,         name: "Petrochemical",   desc: "ATEX-rated solvent and additive blending for hazardous environments." },
  { icon: HardHat,      name: "Construction",    desc: "Abrasive slurries, mortars and resin systems with reinforced drive train." },
];

function TechnologyPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Patented technology</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            The twin-rotor mixing cell. A patent that re-engineers homogenization.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-surface-foreground/75">
            Our EP3 482 109 patent replaces single-shaft turbulence with a synchronized
            twin-rotor architecture — delivering higher throughput, finer precision and
            zero dead zones across the full viscosity range.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">How the process works</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Four stages, one closed loop.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, idx) => (
            <div key={p.title} className="relative rounded-xl border border-border bg-card p-6">
              <span className="absolute right-4 top-4 text-xs font-mono text-muted-foreground">0{idx + 1}</span>
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Technical specifications</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Engineered envelope.</h2>
            <p className="mt-3 text-muted-foreground">
              MixCore units cover the full range from R&D pilot to plant-scale production,
              with materials and certifications selected per application.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/configurator">Configure your specs <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-muted/30" : ""}>
                    <th className="w-1/2 px-5 py-3 text-left font-medium text-muted-foreground">{k}</th>
                    <td className="px-5 py-3 font-medium text-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Use cases</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Industries we engineer for.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.name} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
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
