import type { ReactNode } from "react";

export function FormPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page max-w-3xl py-14 sm:py-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg text-muted sm:text-xl">{intro}</p>
      <div className="mt-12">{children}</div>
    </div>
  );
}
