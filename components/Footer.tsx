import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

const socials = [
  { key: "discord", label: "Discord", href: siteConfig.links.discord },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
  { key: "github", label: "GitHub", href: siteConfig.links.github },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const linkClass = "underline-offset-4 hover:text-accent hover:underline";

  return (
    <footer className="mt-auto border-t-2 border-line bg-surface-alt">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <p>
            <Logo variant="color" />
            <span className="sr-only">Byte Club</span>
          </p>
          <p className="mt-4 text-muted">{t("tagline")}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider uppercase">{t("contact")}</h2>
          <p className="mt-3">
            <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider uppercase">{t("social")}</h2>
          <ul className="mt-3 space-y-2">
            {socials.map((s) => (
              <li key={s.key}>
                <a href={s.href} className={linkClass} rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider uppercase">{t("legal")}</h2>
          <ul className="mt-3 space-y-3">
            <li>
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
            </li>
            <li>
              <LocaleSwitcher />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-line">
        <div className="container-page flex flex-col gap-1 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("notCharity")}</p>
        </div>
      </div>
    </footer>
  );
}
