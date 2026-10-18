import teamJson from "@/data/team.json";
import type { Locale } from "next-intl";

type Localized = Record<Locale, string>;

export type TeamMember = {
  name: string;
  role: Localized | null;
  link: string | null;
};

export const team = teamJson as TeamMember[];
