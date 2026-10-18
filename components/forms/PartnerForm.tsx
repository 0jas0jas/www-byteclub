"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { submitPartnerInquiry } from "@/app/actions";
import { initialFormState, TIMELINES } from "@/lib/forms";
import { SelectField, TextArea, TextField } from "./Fields";
import { FormShell } from "./FormShell";

export function PartnerForm() {
  const t = useTranslations("partner.fields");
  const [state, action] = useActionState(submitPartnerInquiry, initialFormState);

  return (
    <FormShell state={state} action={action}>
      <TextField state={state} name="org_name" label={t("orgName")} required autoComplete="organization" />
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField state={state} name="contact_name" label={t("contactName")} required autoComplete="name" />
        <TextField state={state} name="email" type="email" label={t("email")} required autoComplete="email" inputMode="email" />
      </div>
      <TextField state={state} name="website" type="url" label={t("website")} hint={t("websiteHint")} autoComplete="url" inputMode="url" />
      <TextArea state={state} name="need" label={t("need")} hint={t("needHint")} required rows={6} />
      <SelectField
        state={state}
        name="timeline"
        label={t("timeline")}
        required
        placeholder={t("choose")}
        options={TIMELINES.map((v) => ({ value: v, label: t(`timelineOptions.${v}`) }))}
      />
    </FormShell>
  );
}
