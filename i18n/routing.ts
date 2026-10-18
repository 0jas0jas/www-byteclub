import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // French first: it's the default and must be at least as prominent as English.
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  // No cookies by default. Locale comes from the URL; `/` uses Accept-Language.
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/partner": "/partner",
    "/apply": "/apply",
    "/privacy": {
      fr: "/confidentialite",
      en: "/privacy",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
