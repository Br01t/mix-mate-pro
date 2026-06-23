import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import { formatEUR } from "@/lib/format";
import { useI18n } from "@/i18n/I18nProvider";
import { generateQuotePDF } from "@/lib/pdfGenerator";

export function QuoteDialog({
  open,
  onOpenChange,
  model,
  chosenOptionals,
  total,
  onResetConfig,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  model: Model;
  chosenOptionals: Optional[];
  total: number;
  onResetConfig: () => void;
}) {
  const { lang, pick, t } = useI18n();

  const schema = z.object({
    name: z.string().trim().min(2, t("quote.errors.name")).max(100),
    company: z.string().trim().min(2, t("quote.errors.company")).max(120),
    email: z.string().trim().email(t("quote.errors.email")).max(255),
    phone: z.string().trim().min(5, t("quote.errors.phone")).max(40),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
  });
  type FormValues = z.infer<typeof schema>;

  const [values, setValues] = useState<FormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { ref: string }>(null);

  const update =
    (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const ref = "MX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    // eslint-disable-next-line no-console
    console.log("Quote request submitted", {
      ref,
      contact: parsed.data,
      configuration: { model, chosenOptionals, total },
    });
    setSubmitting(false);
    setSubmitted({ ref });
  };

  const handleClose = (v: boolean) => {
    if (!v && submitted) {
      setSubmitted(null);
      setValues({ name: "", company: "", email: "", phone: "", notes: "" });
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{t("quote.received")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("quote.receivedBody")}</p>
            <div className="mx-auto mt-5 max-w-sm rounded-lg border bg-muted/40 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quote.reference")}</span>
                <span className="font-mono font-semibold">{submitted.ref}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">{t("quote.model")}</span>
                <span className="font-medium">{model.name}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">{t("quote.options")}</span>
                <span className="font-medium">{chosenOptionals.length}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">{t("quote.total")}</span>
                <span className="font-semibold">{formatEUR(total, lang)}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button variant="outline" onClick={() => handleClose(false)}>
                {t("common.close")}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  generateQuotePDF({
                    ref: submitted.ref,
                    contact: {
                      name: values.name,
                      company: values.company,
                      email: values.email,
                      phone: values.phone,
                      notes: values.notes,
                    },
                    model,
                    chosenOptionals,
                    total,
                    lang,
                  });
                }}
              >
                <FileDown className="mr-1.5 h-4 w-4" />
                {lang === "it" ? "Scarica PDF" : "Download PDF"}
              </Button>
              <Button
                onClick={() => {
                  onResetConfig();
                  handleClose(false);
                }}
              >
                {t("quote.configAnother")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("quote.title")}</DialogTitle>
              <DialogDescription>{t("quote.desc")}</DialogDescription>
            </DialogHeader>

            <div className="rounded-lg border bg-muted/40 p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{model.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {pick(model.tagline)} · {model.capacity}
                  </p>
                </div>
                <p className="text-lg font-semibold tabular-nums">{formatEUR(total, lang)}</p>
              </div>
              {chosenOptionals.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                    {chosenOptionals.map((o) => (
                      <li key={o.id} className="flex justify-between gap-2">
                        <span className="truncate">{pick(o.name)}</span>
                        <span className="tabular-nums">+{formatEUR(o.price, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label={t("quote.fullName")}
                value={values.name}
                onChange={update("name")}
                error={errors.name}
              />
              <Field
                id="company"
                label={t("quote.company")}
                value={values.company}
                onChange={update("company")}
                error={errors.company}
              />
              <Field
                id="email"
                type="email"
                label={t("quote.email")}
                value={values.email}
                onChange={update("email")}
                error={errors.email}
              />
              <Field
                id="phone"
                label={t("quote.phone")}
                value={values.phone}
                onChange={update("phone")}
                error={errors.phone}
              />
              <div className="sm:col-span-2">
                <Label htmlFor="notes">
                  {t("quote.notes")}{" "}
                  <span className="text-muted-foreground">({t("common.optional")})</span>
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={values.notes}
                  onChange={update("notes")}
                  className="mt-1.5"
                  placeholder={t("quote.notesPh")}
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("common.submit")}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1.5"
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
