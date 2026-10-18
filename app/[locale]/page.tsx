import { use } from "react";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/sections/Faq";
import { ForNonprofits } from "@/components/sections/ForNonprofits";
import { ForStudents } from "@/components/sections/ForStudents";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Status } from "@/components/sections/Status";
import { Team } from "@/components/sections/Team";

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <HowItWorks />
      <ForNonprofits />
      <ForStudents />
      <Status />
      <Team />
      <GetInvolved />
      <Faq />
    </>
  );
}
