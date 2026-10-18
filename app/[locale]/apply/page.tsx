import type { Metadata } from "next";
import { use } from "react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { FormPage } from "@/components/FormPage";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { alternatesFor } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/apply">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "apply" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/apply"),
  };
}

export default function Page({ params }: PageProps<"/[locale]/apply">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("apply");
  return (
    <FormPage eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <ApplyForm />
    </FormPage>
  );
}
