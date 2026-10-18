import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Section } from "../Section";

const ITEMS = ["mentors", "sponsors", "partners"] as const;

export function GetInvolved() {
  const t = useTranslations("involved");
  return (
    <Section id="involved" eyebrow={t("eyebrow")} title={t("title")} alt>
      <dl className="grid gap-6 md:grid-cols-3">
        {ITEMS.map((k) => (
          <div key={k} className="card p-6">
            <dt className="text-xl font-bold">{t(`items.${k}.title`)}</dt>
            <dd className="mt-2 text-muted">{t(`items.${k}.body`)}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <a href={`mailto:${siteConfig.email}`} className="btn btn-primary">
          {t("cta")} <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}
