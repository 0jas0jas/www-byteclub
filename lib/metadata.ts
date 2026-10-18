import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

// Canonical + hreflang alternates for a page, in every locale.
export function alternatesFor(
  locale: Locale,
  href: AppPathname,
): Metadata["alternates"] {
  const url = (l: Locale) =>
    new URL(getPathname({ href, locale: l }), siteConfig.url).toString();

  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url(routing.defaultLocale),
    },
  };
}
