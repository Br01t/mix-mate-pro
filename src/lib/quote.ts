import { generateQuotePDF } from "@/lib/pdfGenerator";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import type { Lang } from "@/i18n/translations";

export function generateRefCode() {
  return "MX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

type GuestQuoteArgs = {
  model: Model;
  chosenOptionals: Optional[];
  total: number;
  lang: Lang;
  /** Label used as the contact name in the PDF (defaults to a generic guest). */
  guestLabel?: string;
};

/**
 * Generates an anonymous (no-contact-form) PDF quote used by the in-app
 * "download" buttons. Real submissions go through QuoteDialog.
 */
export function downloadGuestQuote({
  model,
  chosenOptionals,
  total,
  lang,
  guestLabel = "Guest User",
}: GuestQuoteArgs) {
  generateQuotePDF({
    ref: generateRefCode(),
    contact: {
      name: guestLabel,
      company: "Self Configuration",
      email: "guest@mixcore.industrial",
      phone: "N/A",
    },
    model,
    chosenOptionals,
    total,
    lang,
  });
}
