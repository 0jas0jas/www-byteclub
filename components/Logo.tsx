import Image from "next/image";

// Wordmarks live in public/logos/. "mono" swaps black/light with the color
// scheme; "color" is the multicolor version and works on both.
// Alt is empty because every place we use it already has an accessible name.
export function Logo({ variant = "mono" }: { variant?: "mono" | "color" }) {
  const props = { width: 508, height: 150, className: "h-9 w-auto" };
  if (variant === "color") {
    return <Image alt="" src="/logos/wordmark-color.svg" {...props} />;
  }
  return (
    <>
      <Image alt="" src="/logos/wordmark-black.svg" {...props} className={`${props.className} dark:hidden`} />
      <Image alt="" src="/logos/wordmark-light.svg" {...props} className={`${props.className} hidden dark:block`} />
    </>
  );
}
