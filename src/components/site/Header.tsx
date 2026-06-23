import { Link } from "@tanstack/react-router";
import { Atom, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  const nav = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/technology" as const, label: t("nav.technology") },
    { to: "/configurator" as const, label: t("nav.configurator") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Atom className="h-4 w-4" />
          </span>
          <span className="text-lg">
            MixCore<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitch lang={lang} setLang={setLang} />
          <Button asChild size="sm">
            <Link to="/configurator">{t("common.requestQuote")}</Link>
          </Button>
        </div>

        <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden animate-in slide-in-from-top-4 duration-200 ease-out shadow-lg">
          <div className="space-y-1.5 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border my-2 pt-3 px-3">
              <LangSwitch lang={lang} setLang={setLang} />
            </div>
            <Button asChild className="mt-2 w-full py-5">
              <Link to="/configurator" onClick={() => setOpen(false)}>
                {t("common.requestQuote")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: "it" | "en"; setLang: (l: "it" | "en") => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-0.5 text-xs font-semibold">
      <Globe className="ml-2 mr-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {(["it", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors " +
            (lang === l
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
