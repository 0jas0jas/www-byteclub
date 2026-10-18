import type { Metadata } from "next";
import { use } from "react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { FormPage } from "@/components/FormPage";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { alternatesFor } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/partner">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "partner" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/partner"),
  };
}

export default function Page({ params }: PageProps<"/[locale]/partner">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("partner");
  return (
    <FormPage eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <PartnerForm />
    </FormPage>
  );
}
