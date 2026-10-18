"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { HONEYPOT_FIELD, type FormState } from "@/lib/forms";

function useFieldError(state: FormState, name: string) {
  const t = useTranslations("form.errors");
  const code = state.status === "error" ? state.fieldErrors?.[name] : undefined;
  return code ? t(code) : undefined;
}

function prev(state: FormState, name: string): string | undefined {
  const v = state.values?.[name];
  return typeof v === "string" ? v : undefined;
}

type BaseProps = {
  state: FormState;
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
};

function FieldShell({
  name,
  label,
  hint,
  required,
  error,
  children,
}: Omit<BaseProps, "state"> & { error?: string; children: ReactNode }) {
  const t = useTranslations("form");
  return (
    <div>
      <label htmlFor={name} className="block font-bold">
        {label}{" "}
        <span className="text-sm font-normal text-muted">
          ({required ? t("required") : t("optional")})
        </span>
      </label>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(name: string, hint?: string, error?: string) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
}

export function TextField({
  state,
  name,
  label,
  hint,
  required,
  type = "text",
  autoComplete,
  inputMode,
  min,
  max,
}: BaseProps & {
  type?: "text" | "email" | "url" | "number";
  autoComplete?: string;
  inputMode?: "text" | "email" | "url" | "numeric";
  min?: number;
  max?: number;
}) {
  const error = useFieldError(state, name);
  return (
    <FieldShell name={name} label={label} hint={hint} required={required} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        max={max}
        defaultValue={prev(state, name)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className="field-input"
      />
    </FieldShell>
  );
}

export function TextArea({ state, name, label, hint, required, rows = 5 }: BaseProps & { rows?: number }) {
  const error = useFieldError(state, name);
  return (
    <FieldShell name={name} label={label} hint={hint} required={required} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={prev(state, name)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className="field-input resize-y"
      />
    </FieldShell>
  );
}

export function SelectField({
  state,
  name,
  label,
  hint,
  required,
  placeholder,
  options,
}: BaseProps & { placeholder: string; options: { value: string; label: string }[] }) {
  const error = useFieldError(state, name);
  return (
    <FieldShell name={name} label={label} hint={hint} required={required} error={error}>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={prev(state, name) ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className="field-input"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxGroup({
  state,
  name,
  label,
  hint,
  required,
  options,
}: BaseProps & { options: { value: string; label: string }[] }) {
  const t = useTranslations("form");
  const error = useFieldError(state, name);
  const selected = state.values?.[name];
  const checked = new Set(Array.isArray(selected) ? selected : []);
  return (
    <fieldset aria-describedby={describedBy(name, hint, error)}>
      <legend className="font-bold">
        {label}{" "}
        <span className="text-sm font-normal text-muted">
          ({required ? t("required") : t("optional")})
        </span>
      </legend>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-2 border-line bg-surface px-3 py-2 has-checked:border-accent has-checked:bg-accent-soft"
          >
            <input
              type="checkbox"
              name={name}
              value={o.value}
              defaultChecked={checked.has(o.value)}
              className="size-5 accent-(--accent)"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Consent({ state }: { state: FormState }) {
  const t = useTranslations("form");
  const error = useFieldError(state, "consent");
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          defaultChecked={state.values?.consent === "on"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-1 size-5 shrink-0 accent-(--accent)"
        />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <Link href="/privacy" target="_blank" className="font-semibold text-accent underline underline-offset-4">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {error && (
        <p id="consent-error" className="mt-2 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

// Off-screen field that only bots fill in. Not display:none, since some bots skip those.
export function Honeypot() {
  const t = useTranslations("form");
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>{t("honeypot")}</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
