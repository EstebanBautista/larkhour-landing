import { z } from "zod";
import { EMAIL_MESSAGE, isValidEmail } from "./email";

export const FIELDS = ["email", "finish", "wakeTime", "durationMin", "sound"] as const;
export type ReservationField = (typeof FIELDS)[number];

const schema = z.object({
  email: z.string().trim().refine(isValidEmail, EMAIL_MESSAGE),
  finish: z.enum(["a", "b"], { error: "Choose a finish." }),
  wakeTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a wake time as HH:MM."),
  durationMin: z.union([z.literal(10), z.literal(20), z.literal(30), z.literal(45)], { error: "Choose 10, 20, 30 or 45 minutes." }),
  sound: z.string().min(1, "Choose a sound."),
  company: z.string().max(0), // honeypot: real people leave it empty
});

export type ReservationInput = z.input<typeof schema>;
export type ValidationResult = { ok: true } | { ok: false; errors: Partial<Record<ReservationField, string>> };

export function validateReservation(input: unknown): ValidationResult {
  const result = schema.safeParse(input);
  if (result.success) return { ok: true };
  const errors: Partial<Record<ReservationField, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ReservationField | "company";
    if (key !== "company" && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
