import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  GitCompare,
  Layers,
  ChevronRight,
  ChevronLeft,
  Check,
  Settings,
  FileText,
  FileDown,
  Sparkles,
  FlaskConical,
  Beaker,
  Factory,
  Fuel,
  HardHat,
  Info,
} from "lucide-react";
import { useConfigurator, type SlotId } from "@/components/configurator/useConfigurator";
import { ModelGrid } from "@/components/configurator/ModelGrid";
import { OptionalsList } from "@/components/configurator/OptionalsList";
import { SummaryPanel } from "@/components/configurator/SummaryPanel";
import { ComparePanel } from "@/components/configurator/ComparePanel";
import { QuoteDialog } from "@/components/configurator/QuoteDialog";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { formatEUR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { generateQuotePDF } from "@/lib/pdfGenerator";
import heroBg from "@/assets/mixer-flagship.jpg";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configuratore — Costruisci il tuo mixer MixCore" },
      {
        name: "description",
        content:
          "Configuratore B2B interattivo a step guidati: scegli settore, modello, optional, ed esporta il tuo preventivo PDF ufficiale.",
      },
      { property: "og:title", content: "Configuratore — Costruisci il tuo mixer MixCore" },
      {
        property: "og:description",
        content: "Configuratore B2B interattivo a step guidati con export PDF e confronto.",
      },
    ],
  }),
  component: ConfiguratorPage,
});

const industriesList = [
  {
    id: "pharma",
    icon: FlaskConical,
    label: { it: "Farmaceutico", en: "Pharmaceutical" },
    desc: {
      it: "Workflow sterili, formulazione API, conformità FDA ed EHEDG.",
      en: "Sterile workflows, API formulation, FDA and EHEDG compliance.",
    },
  },
  {
    id: "cosm",
    icon: Beaker,
    label: { it: "Cosmetica", en: "Cosmetics" },
    desc: {
      it: "Gommosi, creme, gel ed emulsioni ad alta viscosità.",
      en: "High-viscosity creams, gels, lotions and emulsions.",
    },
  },
  {
    id: "food",
    icon: Sparkles,
    label: { it: "Food & Beverage", en: "Food & Beverage" },
    desc: {
      it: "Salse, latticini, e pulizia CIP/SIP ad alta frequenza.",
      en: "Sauces, dairy, and high-frequency CIP/SIP cleaning.",
    },
  },
  {
    id: "chem",
    icon: Factory,
    label: { it: "Chimico", en: "Chemicals" },
    desc: {
      it: "Miscelazione reattiva, catalizzatori e dispersione polimeri.",
      en: "Reactive mixing, catalysts and polymer dispersion.",
    },
  },
  {
    id: "petro",
    icon: Fuel,
    label: { it: "Petrolchimico", en: "Petrochemical" },
    desc: {
      it: "Miscelazione solventi, atmosfere volatili ed ATEX Zona 1.",
      en: "Solvent blending, volatile environments, ATEX Zone 1.",
    },
  },
  {
    id: "constr",
    icon: HardHat,
    label: { it: "Edilizia", en: "Construction" },
    desc: {
      it: "Slurry abrasive, malte e cementi con elevata coppia motrice.",
      en: "Abrasive slurries, mortars and cements with high drive train.",
    },
  },
];

function ConfiguratorPage() {
  const cfg = useConfigurator();
  const [open, setOpen] = useState(false);
  const [quoteSlot, setQuoteSlot] = useState<SlotId>("A");
  const { lang, pick, t } = useI18n();

  const openQuote = (s: SlotId) => {
    cfg.setActive(s);
    setQuoteSlot(s);
    setOpen(true);
  };

  const quotedSlot = quoteSlot === "A" ? cfg.A : cfg.B;

  // Step definitions
  const steps = [
    { n: 1, label: { it: "Requisiti di Processo", en: "Process Requirements" } },
    { n: 2, label: { it: "Scelta del Mixer", en: "Mixer Selection" } },
    { n: 3, label: { it: "Upgrade & Optional", en: "Upgrades & Optionals" } },
    { n: 4, label: { it: "Riepilogo & Preventivo", en: "Review & Quote" } },
  ];

  return (
    <div className="pb-24 lg:pb-12">
      {/* Immersive hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface text-surface-foreground">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_80%_30%,oklch(0.66_0.13_195/.55),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <Layers className="h-4 w-4" />
                {t("cfg.kicker")}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t("cfg.title")}
              </h1>
              <p className="mt-2 text-sm text-surface-foreground/75 sm:text-base">
                {t("cfg.intro")}
              </p>
            </div>

            {/* Compare toggle */}
            <label
              htmlFor="compare-toggle"
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 backdrop-blur transition-all",
                cfg.compare
                  ? "border-primary/60 bg-primary/10"
                  : "border-surface-foreground/15 bg-surface-foreground/5 hover:border-surface-foreground/30",
              )}
            >
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                  cfg.compare
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-foreground/10 text-surface-foreground/70",
                )}
              >
                <GitCompare className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold sm:text-sm">{t("cfg.compareMode")}</p>
                <p className="text-[10px] text-surface-foreground/65 hidden sm:block">
                  {t("cfg.compareHint")}
                </p>
              </div>
              <Switch
                id="compare-toggle"
                checked={cfg.compare}
                onCheckedChange={cfg.toggleCompare}
              />
            </label>
          </div>
        </div>
      </section>

      {/* Compare live A/B summary bar (only steps 2-3, non-sticky to avoid stack on small screens) */}
      {cfg.compare && (cfg.step === 2 || cfg.step === 3) && (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4">
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "it" ? "Confronto in tempo reale" : "Live comparison"}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={cfg.duplicateAB}
                  className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                  title={lang === "it" ? "Copia A in B" : "Duplicate A→B"}
                >
                  A → B
                </button>
                <button
                  type="button"
                  onClick={cfg.swapAB}
                  className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:border-foreground hover:text-foreground"
                  title={lang === "it" ? "Scambia A e B" : "Swap A↔B"}
                >
                  A ⇄ B
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {(["A", "B"] as const).map((s) => {
                const data = s === "A" ? cfg.A : cfg.B;
                return (
                  <div
                    key={s}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border p-2.5 sm:gap-3 sm:p-3",
                      s === "A"
                        ? "border-primary/30 bg-primary/5"
                        : "border-accent/30 bg-accent/5",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-md text-sm font-bold sm:h-10 sm:w-10",
                        s === "A"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground",
                      )}
                    >
                      {s}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold leading-tight text-foreground sm:text-sm">
                        {data.model.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        {data.chosen.length}{" "}
                        {lang === "it" ? "optional" : "options"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums leading-tight text-foreground sm:text-base">
                        {formatEUR(data.total, lang)}
                      </p>
                      {s === "B" && cfg.B.total !== cfg.A.total && (
                        <p
                          className={cn(
                            "text-[10px] font-semibold tabular-nums",
                            cfg.B.total > cfg.A.total
                              ? "text-destructive"
                              : "text-emerald-600 dark:text-emerald-400",
                          )}
                        >
                          {cfg.B.total > cfg.A.total ? "+" : ""}
                          {formatEUR(cfg.B.total - cfg.A.total, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stepper Progress Bar */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {cfg.step}/4
              </span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {lang === "it" ? "Fase di Configurazione" : "Configuration Phase"}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {pick(steps[cfg.step - 1].label)}
                </p>
              </div>
            </div>

            {/* Visual Stepper Dots */}
            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto py-1">
              {steps.map((st, idx) => {
                const isActive = cfg.step === st.n;
                const isCompleted = cfg.step > st.n;
                return (
                  <button
                    key={st.n}
                    type="button"
                    onClick={() => cfg.setStep(st.n)}
                    className="flex items-center gap-2 shrink-0 group text-left"
                    disabled={st.n > 2 && cfg.step < 2} // Prevent jumping straight to options/review without a model
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-all border",
                        isActive &&
                          "border-primary bg-primary text-primary-foreground shadow-md ring-4 ring-primary/15",
                        isCompleted && "border-primary bg-primary/10 text-primary",
                        !isActive &&
                          !isCompleted &&
                          "border-border bg-muted/50 text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground",
                      )}
                    >
                      {isCompleted ? <Check className="h-3.5 w-3.5" /> : st.n}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium hidden md:inline transition-colors",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {pick(st.label)}
                    </span>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-muted-foreground hidden md:block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main wizard body */}
      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-8",
            (cfg.step === 2 || cfg.step === 3) && !cfg.compare && "lg:grid-cols-[1fr_360px]",
          )}
        >
          <div className="space-y-6">
            {/* STEP 1: Process Requirements */}
            {cfg.step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    {lang === "it"
                      ? "1. Seleziona il Settore di Applicazione"
                      : "1. Select your Target Industry"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lang === "it"
                      ? "I sistemi MixCore sono ottimizzati per le sfide normative e chimiche di specifici mercati. Scegli il tuo."
                      : "MixCore systems are optimized for the regulatory and chemical challenges of specific markets. Select yours."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {industriesList.map((ind) => {
                    const isSelected = cfg.requirements.industry === ind.id;
                    const Icon = ind.icon;
                    return (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => cfg.setRequirement("industry", ind.id)}
                        className={cn(
                          "flex flex-col items-start text-left p-5 rounded-xl border bg-card transition-all duration-200",
                          "hover:-translate-y-0.5 hover:shadow-md",
                          isSelected
                            ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        <div
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-lg mb-4 transition-colors",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-foreground text-base mb-1.5">
                          {pick(ind.label)}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-normal">
                          {pick(ind.desc)}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Dropdowns for Volume & Viscosity */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4 border-t border-border">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                        {lang === "it"
                          ? "Capacità Volumetrica Target"
                          : "Target Volumetric Capacity"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lang === "it"
                          ? "Qual è la dimensione indicativa dei batch?"
                          : "What is the indicative scale of your batch sizes?"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: "small", label: { it: "Lab (<100 L)", en: "Lab (<100 L)" } },
                          {
                            id: "medium",
                            label: { it: "Pilota (100-1k L)", en: "Pilot (100-1k L)" },
                          },
                          { id: "large", label: { it: "Produzione (>1k L)", en: "Plant (>1k L)" } },
                        ] as const
                      ).map((cap) => {
                        const isCapSelected = cfg.requirements.capacity === cap.id;
                        return (
                          <Button
                            key={cap.id}
                            type="button"
                            variant={isCapSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => cfg.setRequirement("capacity", cap.id)}
                            className="text-xs py-5 px-1 h-auto"
                          >
                            {pick(cap.label)}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                        {lang === "it" ? "Viscosità Massima Trattata" : "Maximum Process Viscosity"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lang === "it"
                          ? "Viscosità dei fluidi o delle miscele."
                          : "Maximum thickness of fluids or compounds processed."}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: "low", label: { it: "Bassa (<10k cP)", en: "Low (<10k cP)" } },
                          { id: "medium", label: { it: "Media (10k-100k)", en: "Mid (10k-100k)" } },
                          { id: "high", label: { it: "Alta (>100k cP)", en: "High (>100k cP)" } },
                        ] as const
                      ).map((visc) => {
                        const isViscSelected = cfg.requirements.viscosity === visc.id;
                        return (
                          <Button
                            key={visc.id}
                            type="button"
                            variant={isViscSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => cfg.setRequirement("viscosity", visc.id)}
                            className="text-xs py-5 px-1 h-auto"
                          >
                            {pick(visc.label)}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-border">
                  <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
                    {lang === "it" ? "Trova il mio Mixer" : "Find my Mixer"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Model Grid Selection */}
            {cfg.step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {lang === "it"
                        ? "2. Seleziona il Modello Base"
                        : "2. Select Base Mixer Model"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "it"
                        ? "Scegli il modello ideale. I modelli raccomandati sono evidenziati con la stella."
                        : "Pick the ideal model. Recommended options are highlighted with a star."}
                    </p>
                  </div>
                  {cfg.requirements.industry && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => cfg.setStep(1)}
                      className="text-primary font-semibold hover:bg-primary/10 gap-1"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      {lang === "it" ? "Modifica Requisiti" : "Edit Requirements"}
                    </Button>
                  )}
                </div>

                <ModelGrid
                  selectedId={cfg.modelId}
                  onSelect={cfg.setModelId}
                  selectedIdA={cfg.compare ? cfg.A.model.id : undefined}
                  selectedIdB={cfg.compare ? cfg.B.model.id : undefined}
                  activeSlot={cfg.compare ? cfg.active : undefined}
                  recommendedIds={cfg.recommendedModelIds}
                />

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={cfg.prevStep} size="lg" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    {lang === "it" ? "Indietro" : "Back"}
                  </Button>
                  <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
                    {lang === "it" ? "Personalizza Accessori" : "Customize Upgrades"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Optionals List */}
            {cfg.step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    {lang === "it"
                      ? "3. Aggiungi Upgrade & Certificazioni"
                      : "3. Add Upgrades & Certifications"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lang === "it"
                      ? "Aggiungi sensori, certificazioni e servizi. I badge indicano gli abbinamenti consigliati per il tuo settore."
                      : "Add sensors, certs and support. Badges suggest recommended additions for your industry."}
                  </p>
                </div>

                <OptionalsList
                  selected={cfg.selectedOptionals}
                  onToggle={cfg.toggleOptional}
                  onSelectAll={cfg.selectAllOptionals}
                  onClearAll={cfg.clearAllOptionals}
                  selectedA={cfg.compare ? cfg.A.optionals : undefined}
                  selectedB={cfg.compare ? cfg.B.optionals : undefined}
                  activeSlot={cfg.compare ? cfg.active : undefined}
                  industry={cfg.requirements.industry}
                />

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={cfg.prevStep} size="lg" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    {lang === "it" ? "Indietro" : "Back"}
                  </Button>
                  <Button onClick={cfg.nextStep} size="lg" className="gap-2 font-semibold">
                    {lang === "it" ? "Vedi Riepilogo" : "Go to Review"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Review, Compare & Export */}
            {cfg.step === 4 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {lang === "it"
                        ? "4. Riepilogo & Preventivo Ufficiale"
                        : "4. Technical Review & Official Quote"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "it"
                        ? "Verifica le specifiche configurate, scarica il datasheet PDF o invia la richiesta ufficiale."
                        : "Verify your configured specifications, export the PDF datasheet or request an official quote."}
                    </p>
                  </div>
                </div>

                {/* Compare Mode layout */}
                {cfg.compare ? (
                  <div className="space-y-6">
                    <ComparePanel
                      A={cfg.A}
                      B={cfg.B}
                      active={cfg.active}
                      onActivate={cfg.setActive}
                      onRequestQuote={openQuote}
                      onDuplicate={cfg.duplicateAB}
                      onSwap={cfg.swapAB}
                      onReset={cfg.reset}
                    />
                    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center text-sm">
                      <p className="text-muted-foreground">
                        {lang === "it"
                          ? "Per procedere al preventivo PDF, scegli una delle configurazioni ed avvia l'esportazione."
                          : "To generate a PDF quote, select one of the configurations above and download."}
                      </p>
                      <div className="mt-3 flex justify-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const refCode =
                              "MX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
                            generateQuotePDF({
                              ref: refCode,
                              contact: {
                                name: "Guest Configurator",
                                company: "Simulated Corp",
                                email: "guest@mixcore.industrial",
                                phone: "+39 02 000",
                              },
                              model: cfg.A.model,
                              chosenOptionals: cfg.A.chosen,
                              total: cfg.A.total,
                              lang,
                            });
                          }}
                          size="sm"
                        >
                          <FileDown className="mr-1.5 h-4 w-4" />{" "}
                          {lang === "it" ? "Scarica PDF Config A" : "Download PDF Config A"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const refCode =
                              "MX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
                            generateQuotePDF({
                              ref: refCode,
                              contact: {
                                name: "Guest Configurator",
                                company: "Simulated Corp",
                                email: "guest@mixcore.industrial",
                                phone: "+39 02 000",
                              },
                              model: cfg.B.model,
                              chosenOptionals: cfg.B.chosen,
                              total: cfg.B.total,
                              lang,
                            });
                          }}
                          size="sm"
                        >
                          <FileDown className="mr-1.5 h-4 w-4" />{" "}
                          {lang === "it" ? "Scarica PDF Config B" : "Download PDF Config B"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-6">
                      {/* Configuration Details recap */}
                      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                        <div className="bg-muted/40 p-4 border-b border-border">
                          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                            {lang === "it"
                              ? "Elementi della Configurazione"
                              : "Configuration Elements"}
                          </h3>
                        </div>
                        <div className="p-5 space-y-4">
                          <div className="flex flex-wrap items-start gap-4">
                            <img
                              src={cfg.model.image}
                              alt={cfg.model.name}
                              className="h-16 w-16 object-cover rounded-lg border border-border shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                {t(`categories.${cfg.model.category}`)}
                              </span>
                              <h4 className="font-bold text-foreground text-base mt-1">
                                {cfg.model.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {pick(cfg.model.tagline)} · {cfg.model.capacity}
                              </p>
                            </div>
                            <span className="ml-auto font-bold text-sm tabular-nums text-foreground">
                              {formatEUR(cfg.model.basePrice, lang)}
                            </span>
                          </div>

                          {cfg.chosenOptionals.length > 0 && (
                            <div className="border-t border-border pt-4 space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {lang === "it"
                                  ? "Accessori & Servizi Selezionati"
                                  : "Selected Accessories & Services"}
                              </p>
                              <ul className="space-y-2.5">
                                {cfg.chosenOptionals.map((o) => (
                                  <li
                                    key={o.id}
                                    className="flex justify-between items-center text-sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                      <span className="font-medium text-foreground">
                                        {pick(o.name)}
                                      </span>
                                    </div>
                                    <span className="font-semibold text-foreground text-xs tabular-nums">
                                      +{formatEUR(o.price, lang)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Technical specifications reminder */}
                      <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-3">
                          {lang === "it" ? "Verifica Meccanica Rapida" : "Quick Mechanical Check"}
                        </h3>
                        <dl className="grid grid-cols-2 gap-4 text-xs">
                          <div className="border-l-2 border-primary pl-2">
                            <dt className="text-muted-foreground">{t("cfg.capacity")}</dt>
                            <dd className="font-bold text-foreground text-sm mt-0.5">
                              {cfg.model.capacity}
                            </dd>
                          </div>
                          <div className="border-l-2 border-primary pl-2">
                            <dt className="text-muted-foreground">
                              {lang === "it" ? "Contatto FDA" : "FDA Contact"}
                            </dt>
                            <dd className="font-bold text-foreground text-sm mt-0.5">
                              {cfg.model.id === "theta" ||
                              cfg.model.id === "epsilon" ||
                              cfg.model.id === "mu"
                                ? lang === "it"
                                  ? "Idoneo (Certificato)"
                                  : "Compliant (Certified)"
                                : lang === "it"
                                  ? "Disponibile su richiesta"
                                  : "Available on request"}
                            </dd>
                          </div>
                          <div className="border-l-2 border-primary pl-2">
                            <dt className="text-muted-foreground">{t("cfg.industry")}</dt>
                            <dd className="font-bold text-foreground text-sm mt-0.5">
                              {pick(cfg.model.industry)}
                            </dd>
                          </div>
                          <div className="border-l-2 border-primary pl-2">
                            <dt className="text-muted-foreground">
                              {lang === "it" ? "Materiale" : "Material"}
                            </dt>
                            <dd className="font-bold text-foreground text-sm mt-0.5">
                              {cfg.selectedOptionals.has("stainless")
                                ? "AISI 316L (Elettrolucidato)"
                                : "AISI 304 / 316L Standard"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Right column Summary panel with inline quote trigger */}
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm p-5 space-y-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {lang === "it" ? "Totale Economico Stimato" : "Estimated Total Cost"}
                        </p>

                        <div className="flex items-baseline justify-between border-b border-border pb-4">
                          <span className="text-2xl font-bold text-foreground tabular-nums">
                            {formatEUR(cfg.total, lang)}
                          </span>
                          <span className="text-xs text-muted-foreground">Ex. VAT / IVA</span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-normal">
                          {t("cfg.priceNote")}
                        </p>

                        <div className="space-y-2 pt-2">
                          {/* Direct PDF quote export button */}
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              const refCode =
                                "MX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
                              generateQuotePDF({
                                ref: refCode,
                                contact: {
                                  name: "Guest User",
                                  company: "Self Configuration",
                                  email: "guest@mixcore.industrial",
                                  phone: "N/A",
                                },
                                model: cfg.model,
                                chosenOptionals: cfg.chosenOptionals,
                                total: cfg.total,
                                lang,
                              });
                            }}
                            className="w-full gap-2 font-medium"
                          >
                            <FileDown className="h-4 w-4" />
                            {lang === "it" ? "Scarica Scheda & Quote" : "Download PDF Quote"}
                          </Button>

                          {/* Trigger quote form dialog */}
                          <Button
                            type="button"
                            onClick={() => openQuote("A")}
                            className="w-full gap-2 font-bold"
                          >
                            <FileText className="h-4 w-4" />
                            {lang === "it"
                              ? "Richiedi Preventivo Ufficiale"
                              : "Request Official Quote"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={cfg.prevStep} size="lg" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    {lang === "it" ? "Indietro" : "Back"}
                  </Button>
                  <Button
                    onClick={cfg.reset}
                    variant="ghost"
                    size="lg"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("cfg.reset")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Summary Sidebar (visible on steps 2 and 3) */}
          {(cfg.step === 2 || cfg.step === 3) && !cfg.compare && (
            <div className="hidden lg:block">
              <SummaryPanel
                model={cfg.model}
                chosenOptionals={cfg.chosenOptionals}
                total={cfg.total}
                onRequestQuote={() => cfg.setStep(4)}
                onRemoveOptional={cfg.toggleOptional}
                onReset={cfg.resetActive}
              />
            </div>
          )}
        </div>
      </section>

      {/* Sticky Bottom Bar on Mobile/Tablet during steps 1 to 3 */}
      {cfg.step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur lg:hidden animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">
                {lang === "it" ? "Configurazione" : "Configuration"}
              </p>
              <p className="text-base font-bold text-primary tabular-nums mt-1 leading-none">
                {formatEUR(cfg.total, lang)}
              </p>
            </div>
            <div className="flex gap-2">
              {cfg.step > 1 && (
                <Button variant="outline" size="sm" onClick={cfg.prevStep}>
                  {lang === "it" ? "Indietro" : "Back"}
                </Button>
              )}
              <Button size="sm" onClick={cfg.nextStep}>
                {cfg.step === 3
                  ? lang === "it"
                    ? "Riepilogo"
                    : "Summary"
                  : lang === "it"
                    ? "Avanti"
                    : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog containing the contact form & download trigger */}
      <QuoteDialog
        open={open}
        onOpenChange={setOpen}
        model={quotedSlot.model}
        chosenOptionals={quotedSlot.chosen}
        total={quotedSlot.total}
        onResetConfig={cfg.reset}
      />
    </div>
  );
}
