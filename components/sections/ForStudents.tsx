import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Section } from "../Section";

const ITEMS = ["do", "learn", "time", "resume"] as const;
const FIT = ["age", "built", "reliable"] as const;

export function ForStudents() {
  const t = useTranslations("students");
  return (
    <Section id="students" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
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
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link href="/apply" className="btn btn-primary">
          {t("cta")} <span aria-hidden="true">→</span>
        </Link>
        <a href={siteConfig.links.discord} className="btn btn-secondary" rel="noopener">
          {t("discord")}
        </a>
      </div>
    </Section>
  );
}
