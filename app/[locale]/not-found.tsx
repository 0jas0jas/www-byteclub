import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="container-page max-w-2xl py-24 text-center sm:py-32">
      <p aria-hidden="true" className="font-display text-7xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("body")}</p>
      <Link href="/" className="btn btn-primary mt-8">
        {t("back")}
      </Link>
    </div>
  );
}
