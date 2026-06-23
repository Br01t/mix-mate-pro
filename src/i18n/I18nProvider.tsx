import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dict, type Lang } from "./translations";

type BiString = { it: string; en: string };

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Look up a UI string by dotted path, e.g. t("cfg.step1"). */
  t: (path: string) => string;
  /** Pick the right language from a `{it,en}` value. */
  pick: <T extends BiString>(b: T) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

function resolve(path: string): BiString | undefined {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else return undefined;
  }
  if (cur && typeof cur === "object" && "it" in (cur as object) && "en" in (cur as object)) {
    return cur as BiString;
  }
  return undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mixcore.lang");
      if (saved === "it" || saved === "en") setLangState(saved);
    } catch {
      /* SSR */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("mixcore.lang", l);
    } catch {
      /* noop */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => setLang(lang === "it" ? "en" : "it"), [lang, setLang]);

  const pick = useCallback(<T extends BiString>(b: T) => b[lang], [lang]);

  const t = useCallback(
    (path: string) => {
      const v = resolve(path);
      return v ? v[lang] : path;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t, pick }),
    [lang, setLang, toggle, t, pick],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
