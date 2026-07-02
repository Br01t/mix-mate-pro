import { ChevronLeft, FileDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { formatEUR } from "@/lib/format";
import { downloadGuestQuote } from "@/lib/quote";
import { ComparePanel } from "../ComparePanel";
import { CompareDiffTable } from "../CompareDiffTable";
import { CompareToggleInline } from "../CompareToggleInline";
import { SummaryPanel } from "../SummaryPanel";
import type { useConfigurator, SlotId } from "../useConfigurator";

type Props = {
  cfg: ReturnType<typeof useConfigurator>;
  onOpenQuote: (slot: SlotId) => void;
};

export function StepReview({ cfg, onOpenQuote }: Props) {
  const { lang, t } = useI18n();

  return (
    <div className="animate-in fade-in space-y-8 duration-300">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {lang === "it"
              ? "4. Riepilogo & Preventivo Ufficiale"
              : "4. Technical Review & Official Quote"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "it"
              ? "Verifica le specifiche configurate, scarica il datasheet PDF o invia la richiesta ufficiale."
              : "Verify your configured specifications, export the PDF datasheet or request an official quote."}
          </p>
        </div>
      </header>

      {cfg.compare ? (
        <CompareReview cfg={cfg} onOpenQuote={onOpenQuote} />
      ) : (
        <SingleReview cfg={cfg} onOpenQuote={onOpenQuote} />
      )}

      <div className="flex justify-between border-t border-border pt-6">
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
  );
}

function CompareReview({ cfg, onOpenQuote }: Props) {
  const { lang } = useI18n();
  return (
    <div className="space-y-6">
      <ComparePanel
        A={cfg.A}
        B={cfg.B}
        active={cfg.active}
        onActivate={cfg.setActive}
        onRequestQuote={onOpenQuote}
        onDuplicate={cfg.duplicateAB}
        onSwap={cfg.swapAB}
        onReset={cfg.reset}
      />
      <CompareDiffTable
        selectedA={cfg.A.optionals}
        selectedB={cfg.B.optionals}
        baseA={cfg.A.model.basePrice}
        baseB={cfg.B.model.basePrice}
        modelANameDiffers={cfg.A.model.id !== cfg.B.model.id}
      />
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center text-sm">
        <p className="text-muted-foreground">
          {lang === "it"
            ? "Per procedere al preventivo PDF, scegli una delle configurazioni ed avvia l'esportazione."
            : "To generate a PDF quote, select one of the configurations above and download."}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {(["A", "B"] as const).map((slot) => {
            const data = slot === "A" ? cfg.A : cfg.B;
            return (
              <Button
                key={slot}
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadGuestQuote({
                    model: data.model,
                    chosenOptionals: data.chosen,
                    total: data.total,
                    lang,
                    guestLabel: "Guest Configurator",
                  })
                }
              >
                <FileDown className="mr-1.5 h-4 w-4" />
                {lang === "it" ? `Scarica PDF Config ${slot}` : `Download PDF Config ${slot}`}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SingleReview({ cfg, onOpenQuote }: Props) {
  const { lang, pick, t } = useI18n();
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/40 p-4">
            <h3 className="eyebrow text-foreground">
              {lang === "it" ? "Elementi della Configurazione" : "Configuration Elements"}
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex flex-wrap items-start gap-4">
              <img
                src={cfg.model.image}
                alt={cfg.model.name}
                className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover"
              />
              <div className="min-w-0 flex-1">
                <span className="eyebrow rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                  {t(`categories.${cfg.model.category}`)}
                </span>
                <h4 className="mt-1 text-base font-semibold text-foreground">{cfg.model.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {pick(cfg.model.tagline)} · {cfg.model.capacity}
                </p>
              </div>
              <span className="ml-auto text-sm font-bold tabular-nums text-foreground">
                {formatEUR(cfg.model.basePrice, lang)}
              </span>
            </div>

            {cfg.chosenOptionals.length > 0 && (
              <div className="space-y-2 border-t border-border pt-4">
                <p className="eyebrow text-muted-foreground">
                  {lang === "it"
                    ? "Accessori & Servizi Selezionati"
                    : "Selected Accessories & Services"}
                </p>
                <ul className="space-y-2.5">
                  {cfg.chosenOptionals.map((o) => (
                    <li key={o.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="font-medium text-foreground">{pick(o.name)}</span>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-foreground">
                        +{formatEUR(o.price, lang)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="eyebrow mb-3 text-foreground">
            {lang === "it" ? "Verifica Meccanica Rapida" : "Quick Mechanical Check"}
          </h3>
          <dl className="grid grid-cols-2 gap-4 text-xs">
            <SpecCell label={t("cfg.capacity")} value={cfg.model.capacity} />
            <SpecCell
              label={lang === "it" ? "Contatto FDA" : "FDA Contact"}
              value={
                ["theta", "epsilon", "mu"].includes(cfg.model.id)
                  ? lang === "it"
                    ? "Idoneo (Certificato)"
                    : "Compliant (Certified)"
                  : lang === "it"
                    ? "Disponibile su richiesta"
                    : "Available on request"
              }
            />
            <SpecCell label={t("cfg.industry")} value={pick(cfg.model.industry)} />
            <SpecCell
              label={lang === "it" ? "Materiale" : "Material"}
              value={
                cfg.selectedOptionals.has("stainless")
                  ? "AISI 316L (Elettrolucidato)"
                  : "AISI 304 / 316L Standard"
              }
            />
          </dl>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        <ReviewTotals cfg={cfg} onOpenQuote={onOpenQuote} />
      </div>
      <div className="hidden space-y-4 lg:block">
        <SummaryPanel
          model={cfg.model}
          chosenOptionals={cfg.chosenOptionals}
          total={cfg.total}
          onRequestQuote={() => onOpenQuote("A")}
          onRemoveOptional={cfg.toggleOptional}
          onReset={cfg.resetActive}
        />
      </div>
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-primary pl-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-bold text-foreground">{value}</dd>
    </div>
  );
}

function ReviewTotals({ cfg, onOpenQuote }: Props) {
  const { lang, t } = useI18n();
  return (
    <div className="space-y-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="eyebrow text-muted-foreground">
        {lang === "it" ? "Totale Economico Stimato" : "Estimated Total Cost"}
      </p>
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <span className="text-2xl font-bold tabular-nums text-foreground">
          {formatEUR(cfg.total, lang)}
        </span>
        <span className="text-xs text-muted-foreground">Ex. VAT / IVA</span>
      </div>
      <p className="text-xs leading-normal text-muted-foreground">{t("cfg.priceNote")}</p>
      <div className="space-y-2 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            downloadGuestQuote({
              model: cfg.model,
              chosenOptionals: cfg.chosenOptionals,
              total: cfg.total,
              lang,
            })
          }
          className="w-full gap-2 font-medium"
        >
          <FileDown className="h-4 w-4" />
          {lang === "it" ? "Scarica Scheda & Quote" : "Download PDF Quote"}
        </Button>
        <Button
          type="button"
          onClick={() => onOpenQuote("A")}
          className="w-full gap-2 font-bold"
        >
          <FileText className="h-4 w-4" />
          {lang === "it" ? "Richiedi Preventivo Ufficiale" : "Request Official Quote"}
        </Button>
      </div>
    </div>
  );
}
