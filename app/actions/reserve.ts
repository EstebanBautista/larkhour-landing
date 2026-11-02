"use server";
import { validateReservation } from "@/lib/reserve-schema";

export type ReserveState = { status: "idle" | "error" | "success"; errors?: Record<string, string>; message?: string };

const DEMO_SUCCESS = "Reserved. This is a demo, so no payment was taken and your email was not stored.";

export async function reserve(_prev: ReserveState, formData: FormData): Promise<ReserveState> {
  const raw = {
    email: formData.get("email") ?? "",
    finish: formData.get("finish") ?? "",
    wakeTime: formData.get("wakeTime") ?? "",
    durationMin: Number(formData.get("durationMin")),
    sound: formData.get("sound") ?? "",
    company: formData.get("company") ?? "",
  };
  const result = validateReservation(raw);
  if (!result.ok) return { status: "error", errors: result.errors as Record<string, string> };
  // Nothing is stored or charged. This is a portfolio demo.
  return { status: "success", message: DEMO_SUCCESS };
}
