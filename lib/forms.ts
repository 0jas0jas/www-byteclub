// Shared between the server actions and the client form components.

export const TIMELINES = ["asap", "3months", "6months", "flexible"] as const;
export const SKILLS = [
  "frontend",
  "backend",
  "mobile",
  "design",
  "data",
  "other",
] as const;

export const MIN_AGE = 14;
export const MAX_AGE = 20;

// Every validation error maps to a key under `form.errors` in messages/*.json.
export type FieldErrorCode =
  | "required"
  | "email"
  | "url"
  | "age"
  | "tooLong"
  | "consent"
  | "skills";

export type FormState = {
  status: "idle" | "success" | "error";
  error?: "generic" | "rateLimit" | "invalid";
  fieldErrors?: Partial<Record<string, FieldErrorCode>>;
  // Echoed back on error so the form keeps what the person typed.
  values?: Record<string, string | string[]>;
};

export const initialFormState: FormState = { status: "idle" };

// Name of the honeypot input. Humans never see it; bots love it.
export const HONEYPOT_FIELD = "company_fax";
