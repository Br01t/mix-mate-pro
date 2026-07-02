import { GitCompare, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

type Props = {
  compare: boolean;
  onToggle: () => void;
  className?: string;
};

/**
 * Compact inline compare toggle used in step headers.
 * Stays visible where the user is currently working, unlike the hero toggle
 * which scrolls off-screen once the wizard is scrolled to.
 */
export function CompareToggleInline({ compare, onToggle, className }: Props) {
  const { lang } = useI18n();
  const label = compare
    ? lang === "it"
      ? "Esci dal confronto"
      : "Exit compare"
    : lang === "it"
      ? "Attiva confronto"
      : "Enable compare";

  return (
    <button
      type="button"
      onClick={onToggle}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3",
        compare
          ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/15"
          : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary",
        className,
      )}
    >
      {compare ? <X className="h-3.5 w-3.5" /> : <GitCompare className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
