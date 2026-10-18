import { z } from "zod";
import { routing } from "@/i18n/routing";
import { MAX_AGE, MIN_AGE, SKILLS, TIMELINES } from "./forms";

// Error messages are codes; the client translates them (form.errors.*).
const text = (max: number) =>
  z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .max(max, { error: "tooLong" });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: "tooLong" })
    .transform((v) => (v === "" ? null : v));

const email = z
  .string({ error: "required" })
  .trim()
  .min(1, { error: "required" })
  .max(254, { error: "tooLong" })
  .pipe(z.email({ error: "email" }))
  .transform((v) => v.toLowerCase());

// Accepts "example.org" as well as "https://example.org".
const optionalUrl = z
  .string()
  .trim()
  .max(300, { error: "tooLong" })
  .transform((v) => (v === "" || /^https?:\/\//i.test(v) ? v : `https://${v}`))
  .pipe(
    z.union([
      z.literal(""),
      z.url({ protocol: /^https?$/, hostname: z.regexes.domain, error: "url" }),
    ]),
  )
  .transform((v) => (v === "" ? null : v));

const locale = z.enum(routing.locales);
const consent = z.literal("on", { error: "consent" });

export const partnerSchema = z.object({
  org_name: text(200),
  contact_name: text(200),
  email,
  website: optionalUrl,
  need: text(5000),
  timeline: z.enum(TIMELINES, { error: "required" }),
  locale,
  consent,
});

export const studentSchema = z.object({
  name: text(200),
  email,
  age: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .pipe(
      z.coerce
        .number<string>({ error: "age" })
        .int({ error: "age" })
        .min(MIN_AGE, { error: "age" })
        .max(MAX_AGE, { error: "age" }),
    ),
  school: text(200),
  country: text(100),
  skills: z
    .array(z.enum(SKILLS, { error: "skills" }))
    .min(1, { error: "skills" })
    .max(SKILLS.length),
  links: optionalText(2000).transform((v) =>
    v
      ? v
          .split(/\s*\n\s*/)
          .map((l) => l.trim())
          .filter(Boolean)
          .slice(0, 10)
      : [],
  ),
  why: text(5000),
  locale,
  consent,
});
