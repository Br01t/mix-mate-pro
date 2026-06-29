import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/technology" as const, label: t("nav.technology") },
    { to: "/configurator" as const, label: t("nav.configurator") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header
      className={
        "sticky top-0 z-40 border-b transition-[background,border,box-shadow] duration-200 " +
        (scrolled
          ? "border-border/80 bg-background/95 backdrop-blur shadow-[0_1px_0_0_rgba(15,23,42,0.04)]"
          : "border-transparent bg-background/70 backdrop-blur-sm")
      }
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label="MixCore"
        >
          <Monogram />
          <span className="flex items-baseline text-[17px] leading-none">
            <span className="font-semibold text-foreground">Mix</span>
            <span className="font-semibold text-primary">Core</span>
            <span className="ml-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              industrial
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className: "text-foreground after:scale-x-100 after:bg-primary",
              }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground after:scale-x-0",
              }}
              className="relative px-3 py-2 text-[13.5px] font-medium tracking-tight transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LangSwitch lang={lang} setLang={setLang} />
          <span className="h-5 w-px bg-border" aria-hidden />
          <Button
            asChild
            size="sm"
            className="h-9 rounded-md px-4 text-[13px] font-medium shadow-none"
          >
            <Link to="/contact">{t("common.requestQuote")}</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden animate-in slide-in-from-top-2 duration-200 ease-out">
          <div className="space-y-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-muted text-foreground" }}
                inactiveProps={{ className: "text-foreground/85 hover:bg-muted" }}
                className="block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="px-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Lingua
              </span>
              <LangSwitch lang={lang} setLang={setLang} />
            </div>
            <Button asChild className="mt-3 h-11 w-full text-[14px]">
              <Link to="/contact" onClick={() => setOpen(false)}>
                {t("common.requestQuote")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[7px] bg-foreground text-background"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="9" cy="12" r="4.2" />
        <circle cx="15" cy="12" r="4.2" />
      </svg>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    </span>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: "it" | "en";
  setLang: (l: "it" | "en") => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
      role="group"
      aria-label="Language"
    >
      {(["it", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span className="mx-1 text-border" aria-hidden>
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={
              "transition-colors " +
              (lang === l
                ? "text-foreground"
                : "text-muted-foreground/70 hover:text-foreground")
            }
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
