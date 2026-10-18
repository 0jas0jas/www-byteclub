import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/partner" className="btn btn-primary">
              {t("ctaNonprofit")} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/apply" className="btn btn-secondary">
              {t("ctaStudent")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 size-full rounded-[2rem] bg-brand-purple"
          />
          <Image
            src="/images/hero.jpg"
            alt={t("imageAlt")}
            width={2048}
            height={1365}
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="relative aspect-3/2 rounded-[2rem] border-2 border-ink object-cover"
          />
        </div>
      </div>
    </section>
  );
}
