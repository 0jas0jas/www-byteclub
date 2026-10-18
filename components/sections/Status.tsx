import { useTranslations } from "next-intl";
import { Section } from "../Section";

const KEYS = ["one", "two", "three"] as const;

export function Status() {
  const t = useTranslations("status");
  return (
    <Section id="status" eyebrow={t("eyebrow")} title={t("title")} intro={t("body")} alt>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <h3 className="text-xl font-bold">{t("doneTitle")}</h3>
          <ul className="mt-4 space-y-3">
            {KEYS.map((k) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden="true" className="font-bold text-accent">✓</span>
                {t(`done.${k}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="card border-dashed p-6 sm:p-8">
          <h3 className="text-xl font-bold">{t("nextTitle")}</h3>
          <ul className="mt-4 space-y-3">
            {KEYS.map((k) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden="true" className="font-bold text-accent">→</span>
                {t(`next.${k}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
