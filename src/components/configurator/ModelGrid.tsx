import { Check, Info, Sparkles } from "lucide-react";
import { models, type Model, type ModelCategory } from "@/data/models";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const cats: (ModelCategory | "all")[] = ["all", "lab", "pilot", "production", "heavy", "flagship"];

const detailedSpecs: Record<string, Record<"it" | "en", Array<{ k: string; v: string }>>> = {
  alpha: {
    it: [
      { k: "Potenza Motore", v: "2.2 kW (Frequenza controllata)" },
      { k: "Dimensioni (LxPxA)", v: "850 x 600 x 1150 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L (Elettrolucidato)" },
      { k: "Classe di Pressione", v: "Atmosferica" },
      { k: "Velocità Rotore", v: "50 - 1500 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta singola a secco" },
    ],
    en: [
      { k: "Motor Power", v: "2.2 kW (Variable frequency drive)" },
      { k: "Dimensions (WxDxH)", v: "850 x 600 x 1150 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel (Electro-polished)" },
      { k: "Pressure Rating", v: "Atmospheric" },
      { k: "Rotor Speed", v: "50 - 1500 RPM" },
      { k: "Shaft Seals", v: "Single dry mechanical seal" },
    ],
  },
  beta: {
    it: [
      { k: "Potenza Motore", v: "4.0 kW (Frequenza controllata)" },
      { k: "Dimensioni (LxPxA)", v: "1100 x 800 x 1450 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 1.5 bar" },
      { k: "Velocità Rotore", v: "40 - 1200 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "4.0 kW (Variable frequency drive)" },
      { k: "Dimensions (WxDxH)", v: "1100 x 800 x 1450 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 1.5 bar" },
      { k: "Rotor Speed", v: "40 - 1200 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  gamma: {
    it: [
      { k: "Potenza Motore", v: "7.5 kW" },
      { k: "Dimensioni (LxPxA)", v: "1350 x 950 x 1750 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 3.0 bar" },
      { k: "Velocità Rotore", v: "30 - 1000 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "7.5 kW" },
      { k: "Dimensions (WxDxH)", v: "1350 x 950 x 1750 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 3.0 bar" },
      { k: "Rotor Speed", v: "30 - 1000 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  delta: {
    it: [
      { k: "Potenza Motore", v: "11.0 kW" },
      { k: "Dimensioni (LxPxA)", v: "1550 x 1100 x 1950 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 4.0 bar" },
      { k: "Velocità Rotore", v: "30 - 900 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "11.0 kW" },
      { k: "Dimensions (WxDxH)", v: "1550 x 1100 x 1950 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 4.0 bar" },
      { k: "Rotor Speed", v: "30 - 900 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  epsilon: {
    it: [
      { k: "Potenza Motore", v: "15.0 kW (Alta velocità per micro-taglio)" },
      { k: "Dimensioni (LxPxA)", v: "1550 x 1100 x 2050 mm" },
      { k: "Materiali di Contatto", v: "Inox 316L lucidato a specchio (Ra < 0.4 um)" },
      { k: "Sanificazione", v: "Completo CIP/SIP pronto con porte tri-clamp" },
      { k: "Velocità Rotore", v: "100 - 3000 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta sterile asettica flussata a vapore" },
    ],
    en: [
      { k: "Motor Power", v: "15.0 kW (High shear rotor drive)" },
      { k: "Dimensions (WxDxH)", v: "1550 x 1100 x 2050 mm" },
      { k: "Contact Materials", v: "Mirror-polished 316L Inox (Ra < 0.4 um)" },
      { k: "Sanitization", v: "Full CIP/SIP-ready with tri-clamp ports" },
      { k: "Rotor Speed", v: "100 - 3000 RPM" },
      { k: "Shaft Seals", v: "Aseptic steam-flushed mechanical seal" },
    ],
  },
  zeta: {
    it: [
      { k: "Potenza Motore", v: "22.0 kW (Coppia elevata per paste)" },
      { k: "Dimensioni (LxPxA)", v: "1800 x 1300 x 2200 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Max Viscosità", v: "Fino a 250.000 cP" },
      { k: "Velocità Rotore", v: "10 - 500 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta a cartuccia rinforzata per alta pressione" },
    ],
    en: [
      { k: "Motor Power", v: "22.0 kW (High-torque drive for paste)" },
      { k: "Dimensions (WxDxH)", v: "1800 x 1300 x 2200 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Max Viscosity", v: "Up to 250,000 cP" },
      { k: "Rotor Speed", v: "10 - 500 RPM" },
      { k: "Shaft Seals", v: "Reinforced high-pressure cartridge seal" },
    ],
  },
  eta: {
    it: [
      { k: "Potenza Motore", v: "30.0 kW (Drive train rinforzato per malte)" },
      { k: "Dimensioni (LxPxA)", v: "2100 x 1400 x 2400 mm" },
      { k: "Materiali di Contatto", v: "Acciaio antiusura rinforzato / AISI 304" },
      { k: "Protezione Abrasione", v: "Rivestimento in carburo di tungsteno sui rotori" },
      { k: "Velocità Rotore", v: "15 - 400 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta meccanica a labirinto per polveri abrasive" },
    ],
    en: [
      { k: "Motor Power", v: "30.0 kW (Reinforced drive train for mortar)" },
      { k: "Dimensions (WxDxH)", v: "2100 x 1400 x 2400 mm" },
      { k: "Contact Materials", v: "Reinforced wear-resistant steel / AISI 304" },
      { k: "Abrasion Protection", v: "Tungsten carbide coating on rotors" },
      { k: "Rotor Speed", v: "15 - 400 RPM" },
      { k: "Shaft Seals", v: "Labyrinth mechanical seal for abrasive powders" },
    ],
  },
  theta: {
    it: [
      { k: "Potenza Motore", v: "22.0 kW (Classe alimentare/pharma)" },
      { k: "Dimensioni (LxPxA)", v: "2200 x 1500 x 2300 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L elettrolucidato" },
      { k: "Certificazioni Sanitarie", v: "3-A Sanitary, FDA-compliant, EHEDG ready" },
      { k: "Velocità Rotore", v: "20 - 800 RPM" },
      { k: "Tenute Meccaniche", v: "Doppia tenuta asettica flussata con barriera sterile" },
    ],
    en: [
      { k: "Motor Power", v: "22.0 kW (Food/pharma grade)" },
      { k: "Dimensions (WxDxH)", v: "2200 x 1500 x 2300 mm" },
      { k: "Contact Materials", v: "Electro-polished AISI 316L Stainless Steel" },
      { k: "Sanitary Certificates", v: "3-A Sanitary, FDA-compliant, EHEDG ready" },
      { k: "Rotor Speed", v: "20 - 800 RPM" },
      { k: "Shaft Seals", v: "Double aseptic flushed seal with sterile barrier" },
    ],
  },
  iota: {
    it: [
      { k: "Potenza Motore", v: "37.0 kW (ATEX antideflagrante Zona 1)" },
      { k: "Dimensioni (LxPxA)", v: "2400 x 1600 x 2500 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L / Hastelloy" },
      { k: "Classe di Pressione", v: "Fino a 6.0 bar (Camicia)" },
      { k: "Conformità Elettrica", v: "Ex d IIB T4 Gb / ATEX Zona 1 / IECEx" },
      { k: "Tenute Meccaniche", v: "Tenuta a gas pressurizzata a doppia barriera" },
    ],
    en: [
      { k: "Motor Power", v: "37.0 kW (ATEX explosion-proof Zone 1)" },
      { k: "Dimensions (WxDxH)", v: "2400 x 1600 x 2500 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel / Hastelloy" },
      { k: "Pressure Rating", v: "Up to 6.0 bar (Jacketed)" },
      { k: "Electrical Compliance", v: "Ex d IIB T4 Gb / ATEX Zone 1 / IECEx" },
      { k: "Shaft Seals", v: "Double barrier pressurized gas seal" },
    ],
  },
  kappa: {
    it: [
      { k: "Potenza Motore", v: "55.0 kW (Grande impianto chimico)" },
      { k: "Dimensioni (LxPxA)", v: "2800 x 2000 x 2900 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L / Hastelloy C-22" },
      { k: "Classe di Pressione", v: "Fino a 6.0 bar (Vaso e Camicia)" },
      { k: "Velocità Rotore", v: "10 - 600 RPM" },
      {
        k: "Tenute Meccaniche",
        v: "Cartuccia doppia bilanciata con sistema di flussaggio thermosiphon",
      },
    ],
    en: [
      { k: "Motor Power", v: "55.0 kW (Large-scale chemical plant)" },
      { k: "Dimensions (WxDxH)", v: "2800 x 2000 x 2900 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel / Hastelloy C-22" },
      { k: "Pressure Rating", v: "Up to 6.0 bar (Vessel & Jacket)" },
      { k: "Rotor Speed", v: "10 - 600 RPM" },
      { k: "Shaft Seals", v: "Double balanced cartridge with thermosiphon barrier system" },
    ],
  },
  mu: {
    it: [
      { k: "Potenza Motore", v: "75.0 kW (Doppio rotore a trazione coassiale)" },
      { k: "Dimensioni (LxPxA)", v: "3400 x 2500 x 3600 mm" },
      { k: "Materiali di Contatto", v: "Hastelloy C-22 / AISI 316L" },
      { k: "Rondelle di Lavaggio", v: "Sfere di spruzzo a scomparsa integrate" },
      { k: "Velocità Rotore", v: "5 - 450 RPM (Rotazione contraria sincrona)" },
      {
        k: "Tenute Meccaniche",
        v: "Doppia tenuta a cartuccia con diagnostica di perdita integrata",
      },
    ],
    en: [
      { k: "Motor Power", v: "75.0 kW (Twin-rotor coaxial drive)" },
      { k: "Dimensions (WxDxH)", v: "3400 x 2500 x 3600 mm" },
      { k: "Contact Materials", v: "Hastelloy C-22 / AISI 316L" },
      { k: "Washing Nozzles", v: "Retractable spray balls built-in" },
      { k: "Rotor Speed", v: "5 - 450 RPM (Synchronous counter-rotation)" },
      { k: "Shaft Seals", v: "Double cartridge seal with inline leak diagnostics" },
    ],
  },
};

export function ModelGrid({
  selectedId,
  onSelect,
  selectedIdA,
  selectedIdB,
  activeSlot,
  onSelectFor,
  recommendedIds = new Set(),
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  selectedIdA?: string;
  selectedIdB?: string;
  activeSlot?: "A" | "B";
  onSelectFor?: (slot: "A" | "B", id: string) => void;
  recommendedIds?: Set<string>;
}) {
  const { lang, pick, t } = useI18n();
  const [filter, setFilter] = useState<(typeof cats)[number]>("all");
  const [selectedDetailsModel, setSelectedDetailsModel] = useState<Model | null>(null);
  const compareMode = selectedIdA !== undefined && selectedIdB !== undefined;

  const visible = useMemo(
    () => (filter === "all" ? models : models.filter((m) => m.category === filter)),
    [filter],
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all",
              filter === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {c === "all" ? t("cfg.filterAll") : t(`categories.${c}`)}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-muted-foreground tabular-nums">
          {visible.length} / {models.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => {
          const inA = compareMode && selectedIdA === m.id;
          const inB = compareMode && selectedIdB === m.id;
          const active = compareMode ? inA || inB : m.id === selectedId;

          const isRecommended = recommendedIds.has(m.id);

          const ringClass = compareMode
            ? inA && inB
              ? "border-primary ring-2 ring-primary/40 shadow-lg"
              : inA
                ? "border-primary ring-2 ring-primary/30 shadow-md"
                : inB
                  ? "border-accent ring-2 ring-accent/30 shadow-md"
                  : "border-border"
            : active
              ? "border-primary ring-2 ring-primary/30 shadow-lg"
              : "border-border";

          return (
            <div
              key={m.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg",
                !active && "hover:border-primary/60",
                ringClass,
              )}
            >
              {/* Image & Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface/10 to-steel/10">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover transition-all duration-700",
                    active ? "scale-105" : "scale-100 group-hover:scale-110",
                  )}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />

                <div className="absolute left-2 top-2 flex flex-col gap-1.5">
                  <span className="self-start rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                    {t(`categories.${m.category}`)}
                  </span>
                  {isRecommended && (
                    <span className="flex self-start items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm animate-pulse">
                      <Sparkles className="h-3 w-3" />
                      {lang === "it" ? "Raccomandato" : "Recommended"}
                    </span>
                  )}
                </div>

                <div className="absolute right-2 top-2 flex gap-1">
                  {compareMode ? (
                    <>
                      {inA && <SlotChip id="A" />}
                      {inB && <SlotChip id="B" />}
                    </>
                  ) : (
                    active && (
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-md animate-in zoom-in-50">
                        <Check className="h-4 w-4" />
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold leading-tight">{m.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-primary">
                      {pick(m.tagline)}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {formatEUR(m.basePrice, lang)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {pick(m.description)}
                </p>

                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div>
                    <dt className="inline">{t("cfg.capacity")}: </dt>
                    <dd className="inline font-medium text-foreground">{m.capacity}</dd>
                  </div>
                  <div>
                    <dt className="inline">{t("cfg.industry")}: </dt>
                    <dd className="inline font-medium text-foreground">{pick(m.industry)}</dd>
                  </div>
                </dl>

                {/* Footer Buttons */}
                <div className="mt-5 flex gap-2 border-t border-border pt-4">
                  <Button
                    type="button"
                    onClick={() => onSelect(m.id)}
                    className="flex-1"
                    variant={active ? "default" : "outline"}
                    size="sm"
                  >
                    {active
                      ? lang === "it"
                        ? "Selezionato"
                        : "Selected"
                      : lang === "it"
                        ? "Seleziona"
                        : "Select"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="px-2.5"
                    onClick={() => setSelectedDetailsModel(m)}
                    title={lang === "it" ? "Specifiche Dettagliate" : "Detailed Specifications"}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Specs Modal */}
      <Dialog
        open={!!selectedDetailsModel}
        onOpenChange={(o) => !o && setSelectedDetailsModel(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {selectedDetailsModel && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(`categories.${selectedDetailsModel.category}`)}
                  </span>
                  {recommendedIds.has(selectedDetailsModel.id) && (
                    <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {lang === "it" ? "Raccomandato" : "Recommended"}
                    </span>
                  )}
                </div>
                <DialogTitle className="mt-2 text-2xl font-bold">
                  {selectedDetailsModel.name}
                </DialogTitle>
                <DialogDescription className="text-base text-primary uppercase font-semibold tracking-wide">
                  {pick(selectedDetailsModel.tagline)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-border bg-muted">
                  <img
                    src={selectedDetailsModel.image}
                    alt={selectedDetailsModel.name}
                    className="h-full w-full object-cover aspect-[4/3]"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {lang === "it" ? "Descrizione Processo" : "Process Description"}
                    </h4>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {pick(selectedDetailsModel.description)}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">{t("cfg.basePrice")}</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatEUR(selectedDetailsModel.basePrice, lang)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="mb-3 font-semibold text-foreground">
                  {lang === "it"
                    ? "Specifiche Tecniche Dettagliate"
                    : "Detailed Technical Specifications"}
                </h4>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
                          {t("cfg.capacity")}
                        </th>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {selectedDetailsModel.capacity}
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
                          {t("cfg.industry")}
                        </th>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {pick(selectedDetailsModel.industry)}
                        </td>
                      </tr>
                      {(detailedSpecs[selectedDetailsModel.id]?.[lang] || []).map((s, idx) => (
                        <tr
                          key={s.k}
                          className={cn(
                            "border-b border-border last:border-0",
                            idx % 2 === 0 ? "bg-muted/20" : "",
                          )}
                        >
                          <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
                            {s.k}
                          </th>
                          <td className="px-4 py-2.5 font-medium text-foreground">{s.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setSelectedDetailsModel(null)}>
                  {t("common.close")}
                </Button>
                <Button
                  onClick={() => {
                    onSelect(selectedDetailsModel.id);
                    setSelectedDetailsModel(null);
                  }}
                >
                  {lang === "it" ? "Seleziona Modello" : "Select Model"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SlotChip({ id }: { id: "A" | "B" }) {
  return (
    <span
      className={cn(
        "grid h-7 w-7 place-items-center rounded-full text-xs font-bold shadow-md animate-in zoom-in-50",
        id === "A" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
      )}
      title={`Configurazione ${id}`}
    >
      {id}
    </span>
  );
}
