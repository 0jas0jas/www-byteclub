"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { submitStudentApplication } from "@/app/actions";
import { initialFormState, MAX_AGE, MIN_AGE, SKILLS } from "@/lib/forms";
import { CheckboxGroup, TextArea, TextField } from "./Fields";
import { FormShell } from "./FormShell";

export function ApplyForm() {
  const t = useTranslations("apply");
  const [state, action] = useActionState(submitStudentApplication, initialFormState);

  return (
    <FormShell state={state} action={action}>
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField state={state} name="name" label={t("fields.name")} required autoComplete="name" />
        <TextField state={state} name="email" type="email" label={t("fields.email")} required autoComplete="email" inputMode="email" />
      </div>
      <div className="grid gap-7 sm:grid-cols-[8rem_1fr]">
        <TextField state={state} name="age" type="number" label={t("fields.age")} required inputMode="numeric" min={MIN_AGE} max={MAX_AGE} />
        <TextField state={state} name="school" label={t("fields.school")} required />
      </div>
      <TextField state={state} name="country" label={t("fields.country")} required autoComplete="country-name" />
      <CheckboxGroup
        state={state}
        name="skills"
        label={t("fields.skills")}
        hint={t("fields.skillsHint")}
        required
        options={SKILLS.map((v) => ({ value: v, label: t(`fields.skillOptions.${v}`) }))}
      />
      <TextArea state={state} name="links" label={t("fields.links")} hint={t("fields.linksHint")} rows={3} />
      <TextArea state={state} name="why" label={t("fields.why")} hint={t("fields.whyHint")} required rows={5} />
      <p className="rounded-xl bg-accent-soft p-4 text-sm text-accent-soft-ink">{t("minorNote")}</p>
    </FormShell>
  );
}
