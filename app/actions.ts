"use server";

import { headers } from "next/headers";
import type { z } from "zod";
import {
  HONEYPOT_FIELD,
  type FieldErrorCode,
  type FormState,
} from "@/lib/forms";
import { isRateLimited } from "@/lib/rate-limit";
import { partnerSchema, studentSchema } from "@/lib/schemas";
import { getSupabase } from "@/lib/supabase";

type Table = "partner_inquiries" | "student_applications";

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function echoValues(formData: FormData): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key === HONEYPOT_FIELD) continue;
    const all = formData.getAll(key).filter((v) => typeof v === "string");
    values[key] = all.length > 1 || key === "skills" ? all : (all[0] ?? "");
  }
  return values;
}

async function submit<S extends z.ZodType<Record<string, unknown>>>(
  table: Table,
  schema: S,
  raw: Record<string, unknown>,
  formData: FormData,
): Promise<FormState> {
  // Honeypot filled → almost certainly a bot. Pretend it worked.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const values = echoValues(formData);

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: FormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message as FieldErrorCode;
      }
    }
    return { status: "error", error: "invalid", fieldErrors, values };
  }

  if (isRateLimited(`${table}:${await clientIp()}`)) {
    return { status: "error", error: "rateLimit", values };
  }

  // `consent` is required to get here; store it as a boolean.
  const row = { ...parsed.data, consent: true };

  try {
    const { error } = await getSupabase().from(table).insert(row);
    if (error) {
      if (error.message?.includes("rate_limited")) {
        return { status: "error", error: "rateLimit", values };
      }
      console.error(`[${table}] insert failed`, error);
      return { status: "error", error: "generic", values };
    }
  } catch (err) {
    console.error(`[${table}] insert threw`, err);
    return { status: "error", error: "generic", values };
  }

  return { status: "success" };
}

export async function submitPartnerInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return submit(
    "partner_inquiries",
    partnerSchema,
    {
      org_name: formData.get("org_name") ?? "",
      contact_name: formData.get("contact_name") ?? "",
      email: formData.get("email") ?? "",
      website: formData.get("website") ?? "",
      need: formData.get("need") ?? "",
      timeline: formData.get("timeline") ?? "",
      locale: formData.get("locale"),
      consent: formData.get("consent"),
    },
    formData,
  );
}

export async function submitStudentApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return submit(
    "student_applications",
    studentSchema,
    {
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      age: formData.get("age") ?? "",
      school: formData.get("school") ?? "",
      country: formData.get("country") ?? "",
      skills: formData.getAll("skills"),
      links: formData.get("links") ?? "",
      why: formData.get("why") ?? "",
      locale: formData.get("locale"),
      consent: formData.get("consent"),
    },
    formData,
  );
}
