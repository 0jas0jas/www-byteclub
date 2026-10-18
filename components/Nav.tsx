"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS } from "@/lib/sections";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = NAV_SECTIONS.map((id) => (
    <li key={id}>
      <Link
        href={{ pathname: "/", hash: id }}
        onClick={() => setOpen(false)}
        className="block rounded-lg px-2 py-2 font-semibold hover:text-accent lg:py-1"
      >
        {t(`links.${id}`)}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-line bg-bg/90 backdrop-blur supports-backdrop-filter:bg-bg/75">
      <nav aria-label={t("main")} className="container-page flex h-18 items-center gap-4">
        <Link href="/" aria-label={t("home")} className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <ul className="ml-auto hidden items-center gap-x-3 text-[0.95rem] lg:flex xl:gap-x-5">
          {links}
        </ul>

        <ThemeToggle className="ml-auto hidden shrink-0 sm:inline-flex lg:ml-2" />
        <LocaleSwitcher className="ml-auto shrink-0 sm:ml-0" />

        <button
          type="button"
          className="btn-secondary btn min-h-11 min-w-11 px-3 py-2 text-sm whitespace-nowrap sm:px-4 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "×" : "≡"}
          </span>
          {/* Icon-only on small phones so longer French labels never wrap. */}
          <span className="sr-only sm:not-sr-only">
            {open ? t("menuClose") : t("menuOpen")}
          </span>
        </button>
      </nav>

      <div
        id={menuId}
        hidden={!open}
        className="border-t-2 border-line bg-bg lg:hidden"
      >
        <ul className="container-page grid gap-1 py-4 text-lg">{links}</ul>
        {/* No room in the bar on small phones, so the toggle lives in the menu there. */}
        <div className="container-page pb-5 sm:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
