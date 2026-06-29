import { Link } from "@tanstack/react-router";
import { Atom, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-surface text-surface-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Atom className="h-4 w-4" />
            </span>
            <span className="text-lg">MixCore</span>
          </div>
          <p className="mt-4 text-sm text-surface-foreground/70">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("footer.product")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-surface-foreground/70">
            <li>
              <Link to="/technology" className="hover:text-surface-foreground">
                {t("nav.technology")}
              </Link>
            </li>
            <li>
              <Link to="/configurator" className="hover:text-surface-foreground">
                {t("nav.configurator")}
              </Link>
            </li>
            <li>
              <Link to="/configurator" className="hover:text-surface-foreground">
                {t("common.requestQuote")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("footer.company")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-surface-foreground/70">
            <li>{t("footer.about")}</li>
            <li>{t("footer.careers")}</li>
            <li>{t("footer.press")}</li>
            <li>{t("footer.certifications")}</li>
            <li>
              <Link to="/contact" className="hover:text-surface-foreground">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("footer.contact")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-surface-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" /> Via dell'Industria 14, 20010 Milano, Italia
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4" /> +39 02 0000 0000
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4" /> sales@mixcore.industrial
            </li>
            <li className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("nav.contact")} →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-surface-foreground/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} MixCore S.p.A. — {t("footer.rights")} Patent EP3 482 109.
          </p>
          <p>{t("footer.legal")}</p>
        </div>
      </div>
    </footer>
  );
}
