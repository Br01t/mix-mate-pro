import type { Lang } from "@/i18n/translations";

export function formatEUR(value: number, lang: Lang = "it") {
  const locale = lang === "it" ? "it-IT" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
