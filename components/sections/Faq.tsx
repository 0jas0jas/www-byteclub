import { useTranslations } from "next-intl";
import { Section } from "../Section";

const ITEMS = [
  "capable",
  "wrong",
  "disappear",
  "cost",
  "timeline",
  "ip",
  "age",
  "experience",
] as const;

// Split into two independent columns so opening a question only pushes down
// its own column, not the one beside it.
const HALF = Math.ceil(ITEMS.length / 2);
const COLUMNS = [ITEMS.slice(0, HALF), ITEMS.slice(HALF)];

// Native <details>/<summary>: keyboard accessible and works without JS.
export function Faq() {
  const t = useTranslations("faq");
  return (
    <Section id="faq" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-x-12 md:grid-cols-2">
        {COLUMNS.map((items, i) => (
          <div
            key={i}
            className={`divide-y-2 divide-line border-b-2 border-line ${i === 0 ? "border-t-2" : "md:border-t-2"}`}
          >
            {items.map((k) => (
              <details key={k} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold hover:text-accent [&::-webkit-details-marker]:hidden">
                  {t(`items.${k}.q`)}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-current text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 text-muted">{t(`items.${k}.a`)}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
