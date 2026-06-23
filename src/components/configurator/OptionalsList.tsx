import { optionals } from "@/data/optionals";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

export function OptionalsList({
  selected,
  onToggle,
  onSelectAll,
  onClearAll,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}) {
  const { lang, pick, t } = useI18n();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">{selected.size}</span> / {optionals.length} {selected.size === 1 ? t("cfg.optionSelected") : t("cfg.optionsSelected")}
        </span>
        <div className="flex gap-3">
          <button type="button" onClick={onSelectAll} className="font-semibold text-primary hover:underline">
            {t("cfg.selectAll")}
          </button>
          <span className="text-border">·</span>
          <button type="button" onClick={onClearAll} className="font-semibold text-muted-foreground hover:text-foreground hover:underline">
            {t("cfg.clearAll")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {optionals.map((o) => {
          const active = selected.has(o.id);
          const Icon = o.icon;
          return (
            <label
              key={o.id}
              htmlFor={`opt-${o.id}`}
              className={cn(
                "group flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 transition-all",
                active
                  ? "border-primary/60 bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/30",
              )}
            >
              <div
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor={`opt-${o.id}`} className="cursor-pointer font-medium">{pick(o.name)}</Label>
                  <span className="shrink-0 text-sm font-semibold text-primary tabular-nums">
                    +{formatEUR(o.price, lang)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{pick(o.description)}</p>
              </div>
              <Switch
                id={`opt-${o.id}`}
                checked={active}
                onCheckedChange={() => onToggle(o.id)}
                className="mt-1"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
