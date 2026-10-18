"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { FormState } from "@/lib/forms";
import { Consent, Honeypot } from "./Fields";

function SubmitButton() {
  const t = useTranslations("form");
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className="btn btn-primary disabled:opacity-70">
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}

type Props = {
  state: FormState;
  action: (formData: FormData) => void;
  children: ReactNode;
};

export function FormShell({ state, action, children }: Props) {
  const t = useTranslations("form");
  const locale = useLocale();
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so screen reader + keyboard users know what happened.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card border-accent p-8 outline-none sm:p-10">
        <p aria-hidden="true" className="text-4xl">🎉</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{t("successTitle")}</h2>
        <p className="mt-3 text-lg text-muted">{t("successBody")}</p>
        <Link href="/" className="btn btn-secondary mt-8">
          {t("backHome")}
        </Link>
      </div>
    );
  }

  const errorMessage =
    state.status === "error"
      ? state.error === "rateLimit"
        ? t("errorRateLimit")
        : state.error === "invalid"
          ? t("errorSummary")
          : t("errorGeneric", { email: siteConfig.email })
      : null;

  return (
    <form action={action} noValidate className="relative space-y-7">
      <div ref={statusRef} tabIndex={-1} role="alert" className="outline-none">
        {errorMessage && (
          <p className="rounded-xl border-2 border-danger bg-danger-soft p-4 font-semibold text-danger">
            {errorMessage}
          </p>
        )}
      </div>

      <input type="hidden" name="locale" value={locale} />
      <Honeypot />
      {children}
      <Consent state={state} />
      <SubmitButton />
    </form>
  );
}
