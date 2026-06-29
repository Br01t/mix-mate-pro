import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Video,
  Building2,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "MixCore — Contatti & Appuntamenti" },
      {
        name: "description",
        content:
          "Prenota un appuntamento online o in sede con il team MixCore. Consulenza tecnica per la tua linea di miscelazione industriale.",
      },
    ],
  }),
  component: ContactPage,
});

type ApptType = "online" | "onsite" | "visit";

function ContactPage() {
  const { t, lang } = useI18n();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("contact.err.name")).max(100),
        company: z.string().trim().min(2, t("contact.err.company")).max(120),
        email: z.string().trim().email(t("contact.err.email")).max(255),
        phone: z.string().trim().min(5, t("contact.err.phone")).max(40),
        role: z.string().trim().max(80).optional().or(z.literal("")),
        industry: z.string().trim().max(80).optional().or(z.literal("")),
        type: z.enum(["online", "onsite", "visit"]),
        date: z.string().min(1, t("contact.err.date")),
        time: z.enum(["morning", "afternoon", "flexible"]),
        message: z.string().trim().min(10, t("contact.err.message")).max(2000),
        consent: z.literal(true, { errorMap: () => ({ message: t("contact.err.consent") }) }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );
  type FormValues = z.infer<typeof schema>;

  const [values, setValues] = useState<Omit<FormValues, "consent"> & { consent: boolean }>({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    industry: "",
    type: "online",
    date: "",
    time: "morning",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { ref: string }>(null);

  const set =
    <K extends keyof typeof values>(k: K) =>
    (v: (typeof values)[K]) =>
      setValues((prev) => ({ ...prev, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      // scroll to first error
      const first = document.querySelector("[data-error='true']") as HTMLElement | null;
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const ref = "MCX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitting(false);
    setSubmitted({ ref });
  }

  if (submitted) {
    return (
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("contact.successTitle")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {t("contact.successBody")}
          </p>
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm">
            <span className="text-muted-foreground">{t("contact.reference")}</span>
            <span className="font-mono font-semibold text-foreground">{submitted.ref}</span>
          </div>
          <div className="mt-10">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(null);
                setValues((v) => ({ ...v, message: "", consent: false }));
              }}
            >
              {t("contact.newRequest")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse at 70% 30%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 70% 30%, black 30%, transparent 75%)",
            }}
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-20 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {t("contact.kicker")}
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[44px]">
              {t("contact.title")}
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              {t("contact.intro")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-[12px] font-medium">
              <Pill icon={<ShieldCheck className="h-3.5 w-3.5" />}>NDA su richiesta</Pill>
              <Pill icon={<Sparkles className="h-3.5 w-3.5" />}>30 min · gratuito</Pill>
              <Pill icon={<Clock className="h-3.5 w-3.5" />}>
                {t("contact.hoursValue")}
              </Pill>
            </div>
          </div>

          <aside className="grid gap-3 self-start rounded-xl border border-border bg-background p-5 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">
              {t("contact.infoTitle")}
            </h2>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {t("contact.infoBody")}
            </p>
            <ul className="mt-2 space-y-3 text-sm">
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label={t("contact.hq")}
                value={t("contact.hqAddr")}
              />
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label={t("contact.phoneLabel")}
                value="+39 02 0000 0000"
              />
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label={t("contact.emailLabel")}
                value="sales@mixcore.industrial"
              />
              <InfoRow
                icon={<Clock className="h-4 w-4" />}
                label={t("contact.hoursLabel")}
                value={t("contact.hoursValue")}
              />
            </ul>
          </aside>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t("contact.formTitle")}
              </h2>
              <p className="mt-2 text-[14.5px] text-muted-foreground">
                {t("contact.formIntro")}
              </p>
            </div>
            <CalendarClock className="hidden h-9 w-9 text-muted-foreground sm:block" />
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-6 rounded-2xl border border-border bg-surface/40 p-5 sm:p-8"
          >
            {/* Appointment type */}
            <div className="grid gap-3">
              <Label className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                {t("contact.fType")}
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                <TypeOption
                  active={values.type === "online"}
                  onSelect={() => set("type")("online")}
                  icon={<Video className="h-5 w-5" />}
                  label={t("contact.typeOnline")}
                  desc={t("contact.typeOnlineDesc")}
                />
                <TypeOption
                  active={values.type === "onsite"}
                  onSelect={() => set("type")("onsite")}
                  icon={<Building2 className="h-5 w-5" />}
                  label={t("contact.typeOnsite")}
                  desc={t("contact.typeOnsiteDesc")}
                />
                <TypeOption
                  active={values.type === "visit"}
                  onSelect={() => set("type")("visit")}
                  icon={<Truck className="h-5 w-5" />}
                  label={t("contact.typeVisit")}
                  desc={t("contact.typeVisitDesc")}
                />
              </div>
            </div>

            <Divider />

            {/* Contact fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label={t("contact.fName")}
                error={errors.name}
                value={values.name}
                onChange={(v) => set("name")(v)}
                autoComplete="name"
              />
              <Field
                id="company"
                label={t("contact.fCompany")}
                error={errors.company}
                value={values.company}
                onChange={(v) => set("company")(v)}
                autoComplete="organization"
              />
              <Field
                id="email"
                type="email"
                label={t("contact.fEmail")}
                error={errors.email}
                value={values.email}
                onChange={(v) => set("email")(v)}
                autoComplete="email"
              />
              <Field
                id="phone"
                type="tel"
                label={t("contact.fPhone")}
                error={errors.phone}
                value={values.phone}
                onChange={(v) => set("phone")(v)}
                autoComplete="tel"
              />
              <Field
                id="role"
                label={t("contact.fRole")}
                value={values.role ?? ""}
                onChange={(v) => set("role")(v)}
              />
              <Field
                id="industry"
                label={t("contact.fIndustry")}
                value={values.industry ?? ""}
                onChange={(v) => set("industry")(v)}
                placeholder={t("contact.fIndustryPh")}
              />
            </div>

            <Divider />

            {/* Date + time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5" data-error={errors.date ? "true" : undefined}>
                <Label htmlFor="date" className="text-[13px] font-medium text-foreground">
                  {t("contact.fDate")}
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={values.date}
                  onChange={(e) => set("date")(e.target.value)}
                  aria-invalid={!!errors.date}
                  className={errors.date ? "border-destructive" : ""}
                />
                {errors.date && <ErrText>{errors.date}</ErrText>}
              </div>

              <div className="grid gap-1.5">
                <Label className="text-[13px] font-medium text-foreground">
                  {t("contact.fTime")}
                </Label>
                <div className="grid grid-cols-3 gap-1.5 rounded-md border border-border bg-background p-1">
                  {(["morning", "afternoon", "flexible"] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => set("time")(slot)}
                      className={
                        "rounded-[5px] px-2 py-2 text-[12.5px] font-medium transition-colors " +
                        (values.time === slot
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted")
                      }
                    >
                      {t(`contact.time${slot.charAt(0).toUpperCase() + slot.slice(1)}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="grid gap-1.5" data-error={errors.message ? "true" : undefined}>
              <Label htmlFor="message" className="text-[13px] font-medium text-foreground">
                {t("contact.fMessage")}
              </Label>
              <Textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder={t("contact.fMessagePh")}
                aria-invalid={!!errors.message}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && <ErrText>{errors.message}</ErrText>}
            </div>

            {/* Consent */}
            <label
              className={
                "flex items-start gap-3 rounded-md border p-3 text-[13px] leading-relaxed cursor-pointer transition-colors " +
                (errors.consent
                  ? "border-destructive bg-destructive/5"
                  : "border-border bg-background hover:bg-muted/40")
              }
              data-error={errors.consent ? "true" : undefined}
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-foreground"
                checked={values.consent}
                onChange={(e) => set("consent")(e.target.checked)}
              />
              <span className="text-foreground/85">{t("contact.fConsent")}</span>
            </label>
            {errors.consent && <ErrText>{errors.consent}</ErrText>}

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
              <p className="text-[12px] text-muted-foreground sm:mr-auto">
                * {t("contact.formIntro")}
              </p>
              <Button type="submit" size="lg" disabled={submitting} className="min-w-[200px]">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("contact.submitting")}
                  </>
                ) : (
                  <>
                    <CalendarClock className="h-4 w-4" />
                    {t("contact.submit")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-foreground/80">
      {icon}
      {children}
    </span>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-md bg-muted text-foreground/70">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <div className="text-[13.5px] text-foreground">{value}</div>
      </div>
    </li>
  );
}

function TypeOption({
  active,
  onSelect,
  icon,
  label,
  desc,
}: {
  active: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={
        "group relative flex h-full flex-col gap-2 rounded-lg border p-4 text-left transition-all " +
        (active
          ? "border-foreground bg-background shadow-sm ring-1 ring-foreground/10"
          : "border-border bg-background/60 hover:border-foreground/40 hover:bg-background")
      }
    >
      <div className="flex items-center justify-between">
        <span
          className={
            "grid h-9 w-9 place-items-center rounded-md transition-colors " +
            (active ? "bg-foreground text-background" : "bg-muted text-foreground/70")
          }
        >
          {icon}
        </span>
        <span
          className={
            "grid h-5 w-5 place-items-center rounded-full border transition-all " +
            (active
              ? "border-foreground bg-foreground text-background"
              : "border-border text-transparent")
          }
        >
          <Check className="h-3 w-3" />
        </span>
      </div>
      <div className="mt-1 text-[14px] font-semibold text-foreground">{label}</div>
      <p className="text-[12.5px] leading-relaxed text-muted-foreground">{desc}</p>
    </button>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-1.5" data-error={error ? "true" : undefined}>
      <Label htmlFor={id} className="text-[13px] font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={error ? "border-destructive" : ""}
      />
      {error && <ErrText>{error}</ErrText>}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

function ErrText({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-medium text-destructive">{children}</p>;
}
