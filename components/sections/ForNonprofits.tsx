import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Section } from "../Section";

const ITEMS = ["get", "cost", "need", "after"] as const;
const FIT = ["slow", "mistakes", "students"] as const;

export function ForNonprofits() {
  const t = useTranslations("nonprofits");
  return (
    <Section id="nonprofits" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} alt>
      <dl className="grid gap-6 sm:grid-cols-2">
        {ITEMS.map((k) => (
          <div key={k} className="card p-6 sm:p-8">
            <dt className="text-xl font-bold">{t(`items.${k}.title`)}</dt>
            <dd className="mt-2 text-muted">{t(`items.${k}.body`)}</dd>
          </div>
        ))}
      </dl>
      <div className="card mt-6 border-dashed p-6 sm:p-8">
        <h3 className="text-xl font-bold">{t("fitTitle")}</h3>
        <p className="mt-2 text-muted">{t("fitIntro")}</p>
        <ul className="mt-4 space-y-3">
          {FIT.map((k) => (
            <li key={k} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-accent">→</span>
              {t(`fit.${k}`)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <a href={siteConfig.partnerFormUrl} className="btn btn-primary">
          {t("cta")} <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}
