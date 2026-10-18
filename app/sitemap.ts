import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

const PAGES: AppPathname[] = ["/", "/partner", "/apply", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (href: AppPathname, locale: (typeof routing.locales)[number]) =>
    new URL(getPathname({ href, locale }), siteConfig.url).toString();

  return PAGES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: url(href, locale),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(href, l)])),
      },
    })),
  );
}
