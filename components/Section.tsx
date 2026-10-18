import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  alt?: boolean; // alternate background, to separate neighbours
  children: ReactNode;
};

export function Section({ id, eyebrow, title, intro, alt, children }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-20 sm:py-28 ${alt ? "border-y-2 border-line bg-surface-alt" : ""}`}
    >
      <div className="container-page">
        <header className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={headingId}
            className="mt-3 text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 text-lg text-muted sm:text-xl">{intro}</p>}
        </header>
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
