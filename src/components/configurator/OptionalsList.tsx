import { optionals, type Optional } from "@/data/optionals";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { Sparkles, AlertCircle } from "lucide-react";

interface Category {
  id: string;
  name: { it: string; en: string };
  desc: { it: string; en: string };
  optionIds: string[];
}

const categories: Category[] = [
  {
    id: "performance",
    name: { it: "Performance & Sensoristica", en: "Performance & Telemetry" },
    desc: {
      it: "Monitoraggio viscosità, telemetria cloud e upgrade serbatoio.",
      en: "Viscosity monitoring, cloud telemetry and tank upgrades.",
    },
    optionIds: ["sensors", "tank", "iot"],
  },
  {
    id: "safety",
    name: { it: "Sicurezza & Conformità", en: "Safety & Compliance" },
    desc: {
      it: "Antideflagrante ATEX, acciaio inox 316L e sanificazione CIP.",
      en: "ATEX explosion-proof, 316L stainless steel and CIP sanitization.",
    },
    optionIds: ["atex", "stainless", "cip"],
  },
  {
    id: "services",
    name: { it: "Operatività & Servizi", en: "Support & Operations" },
    desc: {
      it: "Installazione professionale, training e garanzia 5 anni.",
      en: "Professional installation, training and 5-year warranty.",
    },
    optionIds: ["install", "warranty"],
  },
];

function getOptionRecommendation(optId: string, industry: string | null, lang: "it" | "en") {
  if (!industry) return null;
  const ind = industry.toLowerCase();

  if (ind === "pharma") {
    if (optId === "stainless")
      return {
        type: "recommended",
        label: lang === "it" ? "Consigliato Asettico" : "Aseptic Recommended",
      };
    if (optId === "cip")
      return { type: "recommended", label: lang === "it" ? "Consigliato FDA" : "FDA Recommended" };
  }
  if (ind === "food") {
    if (optId === "cip")
      return { type: "recommended", label: lang === "it" ? "Lavaggio Critico" : "Critical Wash" };
    if (optId === "stainless")
      return { type: "recommended", label: lang === "it" ? "Uso Alimentare" : "Food Grade" };
  }
  if (ind === "cosm") {
    if (optId === "stainless" || optId === "cip")
      return { type: "recommended", label: lang === "it" ? "Consigliato" : "Recommended" };
  }
  if (ind === "petro") {
    if (optId === "atex")
      return { type: "critical", label: lang === "it" ? "Richiesto ATEX" : "ATEX Required" };
  }
  if (ind === "chem") {
    if (optId === "sensors" || optId === "atex")
      return { type: "recommended", label: lang === "it" ? "Consigliato" : "Recommended" };
  }
  if (ind === "constr") {
    if (optId === "tank" || optId === "install")
      return { type: "recommended", label: lang === "it" ? "Consigliato" : "Recommended" };
  }
  return null;
}

export function OptionalsList({
  selected,
  onToggle,
  onSelectAll,
  onClearAll,
  selectedA,
  selectedB,
  activeSlot,
  onToggleFor,
  onSelectAllFor,
  onClearAllFor,
  industry = null,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  selectedA?: Set<string>;
  selectedB?: Set<string>;
  activeSlot?: "A" | "B";
  onToggleFor?: (slot: "A" | "B", id: string) => void;
  onSelectAllFor?: (slot: "A" | "B") => void;
  onClearAllFor?: (slot: "A" | "B") => void;
  industry?: string | null;
}) {
  const { lang, pick, t } = useI18n();
  const compareMode = selectedA !== undefined && selectedB !== undefined;

  return (
    <div className="space-y-8">
      {/* Header controls */}
      {compareMode ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                A
              </span>
              <span className="font-bold tabular-nums">{selectedA!.size}</span>
              <span className="text-muted-foreground">/ {optionals.length}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                B
              </span>
              <span className="font-bold tabular-nums">{selectedB!.size}</span>
              <span className="text-muted-foreground">/ {optionals.length}</span>
            </span>
          </div>
          {onSelectAllFor && onClearAllFor && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onClearAllFor("A")}
                className="rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:border-primary hover:text-primary"
              >
                {lang === "it" ? "Svuota A" : "Clear A"}
              </button>
              <button
                type="button"
                onClick={() => onClearAllFor("B")}
                className="rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:border-accent hover:text-accent"
              >
                {lang === "it" ? "Svuota B" : "Clear B"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs border-b border-border pb-3">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">{selected.size}</span> /{" "}
            {optionals.length}{" "}
            {selected.size === 1 ? t("cfg.optionSelected") : t("cfg.optionsSelected")}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onSelectAll}
              className="font-semibold text-primary hover:underline"
            >
              {t("cfg.selectAll")}
            </button>
            <span className="text-border">·</span>
            <button
              type="button"
              onClick={onClearAll}
              className="font-semibold text-muted-foreground hover:text-foreground hover:underline"
            >
              {t("cfg.clearAll")}
            </button>
          </div>
        </div>
      )}

      {/* Categorized optionals */}
      {categories.map((cat) => {
        const catOptionals = optionals.filter((o) => cat.optionIds.includes(o.id));
        if (catOptionals.length === 0) return null;

        return (
          <div key={cat.id} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">{pick(cat.name)}</h3>
              <p className="text-sm text-muted-foreground">{pick(cat.desc)}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {catOptionals.map((o) => {
                const active = selected.has(o.id);
                const inA = compareMode && selectedA!.has(o.id);
                const inB = compareMode && selectedB!.has(o.id);
                const Icon = o.icon;

                const recommendation = getOptionRecommendation(o.id, industry, lang);

                const cardClass = compareMode
                  ? cn(
                      "border-border",
                      active && activeSlot === "A" && "border-primary/60 bg-primary/5 shadow-sm",
                      active && activeSlot === "B" && "border-accent/60 bg-accent/5 shadow-sm",
                      !active && (inA || inB) && "border-border bg-muted/20",
                    )
                  : active
                    ? "border-primary/60 bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30 hover:bg-muted/30";

                return (
                  <label
                    key={o.id}
                    htmlFor={`opt-${o.id}`}
                    className={cn(
                      "group relative flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 transition-all duration-200",
                      cardClass,
                    )}
                  >
                    {/* Compare markers */}
                    {compareMode && (inA || inB) && (
                      <div className="absolute right-3 top-3 flex gap-1">
                        {inA && <SlotDot id="A" />}
                        {inB && <SlotDot id="B" />}
                      </div>
                    )}

                    <div
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors",
                        active
                          ? activeSlot === "B"
                            ? "bg-accent text-accent-foreground"
                            : "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-12">
                        <Label
                          htmlFor={`opt-${o.id}`}
                          className="cursor-pointer font-semibold text-foreground text-sm"
                        >
                          {pick(o.name)}
                        </Label>

                        {/* Recommendation badge */}
                        {recommendation && (
                          <span
                            className={cn(
                              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                              recommendation.type === "critical"
                                ? "bg-destructive/15 text-destructive border border-destructive/20 animate-pulse"
                                : "bg-primary/10 text-primary border border-primary/20",
                            )}
                          >
                            {recommendation.type === "critical" ? (
                              <AlertCircle className="h-2.5 w-2.5" />
                            ) : (
                              <Sparkles className="h-2.5 w-2.5" />
                            )}
                            {recommendation.label}
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 text-xs text-muted-foreground leading-normal">
                        {pick(o.description)}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-primary tabular-nums">
                          +{formatEUR(o.price, lang)}
                        </span>

                        <Switch
                          id={`opt-${o.id}`}
                          checked={active}
                          onCheckedChange={() => onToggle(o.id)}
                          className="scale-90"
                        />
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SlotDot({ id }: { id: "A" | "B" }) {
  return (
    <span
      className={cn(
        "grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold shadow-sm",
        id === "A" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
      )}
    >
      {id}
    </span>
  );
}
