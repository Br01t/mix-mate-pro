import { Check } from "lucide-react";
import { models, type ModelCategory } from "@/data/models";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { useMemo, useState } from "react";

const cats: (ModelCategory | "all")[] = ["all", "lab", "pilot", "production", "heavy", "flagship"];

export function ModelGrid({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { lang, pick, t } = useI18n();
  const [filter, setFilter] = useState<(typeof cats)[number]>("all");

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
          const active = m.id === selectedId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg",
                active
                  ? "border-primary ring-2 ring-primary/30 shadow-lg"
                  : "border-border",
              )}
            >
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
                <span className="absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                  {t(`categories.${m.category}`)}
                </span>
                {active && (
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-md animate-in zoom-in-50">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold leading-tight">{m.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-primary">{pick(m.tagline)}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {formatEUR(m.basePrice, lang)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{pick(m.description)}</p>
                <dl className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <div><dt className="inline">{t("cfg.capacity")}: </dt><dd className="inline font-medium text-foreground">{m.capacity}</dd></div>
                  <div><dt className="inline">{t("cfg.industry")}: </dt><dd className="inline font-medium text-foreground">{pick(m.industry)}</dd></div>
                </dl>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
