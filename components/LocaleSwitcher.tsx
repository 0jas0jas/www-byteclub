"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// The section whose top is closest above the nav line is "current".
function currentSectionId(): string | null {
  const sections = document.querySelectorAll<HTMLElement>("main section[id]");
  let current: string | null = null;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= 120) current = s.id;
  }
  return current;
}

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex rounded-full border-2 border-ink p-0.5 text-sm font-bold ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        const href = getPathname({ href: pathname, locale: l });
        return active ? (
          <span
            key={l}
            aria-current="true"
            lang={l}
            className="rounded-full bg-ink px-3 py-1.5 text-bg"
          >
            {t(l)}
          </span>
        ) : (
          <a
            key={l}
            href={href}
            hrefLang={l}
            lang={l}
            aria-label={t("switchTo")}
            className="rounded-full px-3 py-1.5 hover:bg-accent-soft"
            onClick={(e) => {
              // Keep the reader on the same section in the other language.
              const id = currentSectionId();
              if (!id) return;
              e.preventDefault();
              // Full load on purpose: <html lang> and the root layout change with the locale.
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination
              window.location.assign(`${href}#${id}`);
            }}
          >
            {t(l)}
          </a>
        );
      })}
    </div>
  );
}
