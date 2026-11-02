import { describe, expect, it } from "vitest";
import { validateReservation } from "./reserve-schema";

const valid = { email: "ana@example.com", finish: "a", wakeTime: "06:30", durationMin: 30, sound: "Birdsong", company: "" };

describe("validateReservation", () => {
  it("accepts a complete valid reservation", () => expect(validateReservation(valid)).toEqual({ ok: true }));
  it("rejects an email without @", () => {
    const r = validateReservation({ ...valid, email: "ana" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeTruthy();
  });
  it("rejects an unknown finish", () => {
    const r = validateReservation({ ...valid, finish: "z" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.finish).toBeTruthy();
  });
  it("rejects a 25 minute duration", () => {
    const r = validateReservation({ ...valid, durationMin: 25 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.durationMin).toBeTruthy();
  });
  it("rejects a malformed wake time", () => {
    const r = validateReservation({ ...valid, wakeTime: "25:99" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.wakeTime).toBeTruthy();
  });
  it("rejects a filled honeypot", () => expect(validateReservation({ ...valid, company: "Acme" }).ok).toBe(false));
});
