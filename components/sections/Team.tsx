import { useLocale, useTranslations } from "next-intl";
import { team } from "@/lib/data";
import { Section } from "../Section";

export function Team() {
  const t = useTranslations("team");
  const locale = useLocale();
  return (
    <Section id="team" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <ul className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {team.map((m) => (
          <li key={m.name} className="card p-5 sm:p-6">
            <h3 className="text-lg leading-tight font-bold">
              {m.link ? (
                <a
                  href={m.link}
                  rel="noopener"
                  aria-label={t("link", { name: m.name })}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {m.name} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                m.name
              )}
            </h3>
            {m.role && <p className="mt-1 text-sm text-muted">{m.role[locale]}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
