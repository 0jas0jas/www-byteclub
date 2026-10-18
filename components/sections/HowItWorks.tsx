import { useTranslations } from "next-intl";
import { Section } from "../Section";

const STEPS = ["form", "call", "decide", "build"] as const;
// One logo color per step, in the logo's order.
const COLORS = ["bg-brand-red", "bg-brand-purple", "bg-brand-yellow", "bg-brand-green"];

export function HowItWorks() {
  const t = useTranslations("how");
  return (
    <Section id="how" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step} className="card relative flex flex-col p-6">
            <span
              aria-hidden="true"
              className={`grid size-12 place-items-center rounded-full border-2 border-ink ${COLORS[i]} font-display text-xl font-extrabold text-brand-ink`}
            >
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 text-muted">{t(`steps.${step}.body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
