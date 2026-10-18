import type { Metadata } from "next";
import { use } from "react";
import { useFormatter, useTranslations, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { alternatesFor } from "@/lib/metadata";

// Bump this whenever the policy changes.
const LAST_UPDATED = new Date("2026-10-02");

const SECTIONS = [
  "responsible",
  "collect",
  "why",
  "where",
  "retention",
  "minors",
  "rights",
  "changes",
] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/privacy"),
    // TODO: remove once the policy has been reviewed.
    robots: { index: false },
  };
}

export default function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("privacy");
  const format = useFormatter();

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      {/* REVIEW BEFORE LAUNCH: delete this banner once the policy is final. */}
      <p role="note" className="rounded-xl border-2 border-dashed border-danger bg-danger-soft p-4 font-bold text-danger">
        {t("draft")}
      </p>

      <h1 className="mt-10 text-4xl font-extrabold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-3 text-muted">
        {t("updated", { date: format.dateTime(LAST_UPDATED, { dateStyle: "long", timeZone: "UTC" }) })}
      </p>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((k) => (
          <section key={k} aria-labelledby={`privacy-${k}`}>
            <h2 id={`privacy-${k}`} className="text-2xl font-bold">
              {t(`sections.${k}.title`)}
            </h2>
            <p className="mt-3 text-lg leading-relaxed">
              {t(`sections.${k}.body`, { email: siteConfig.privacyEmail })}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
