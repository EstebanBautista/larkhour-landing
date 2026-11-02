import { afterEach, describe, expect, it, vi } from "vitest";
import { reserve } from "./reserve";

const idle = { status: "idle" as const };
const form = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries({ email: "ana@example.com", finish: "a", wakeTime: "06:30", durationMin: "30", sound: "Birdsong", company: "", ...o })) f.set(k, v);
  return f;
};

afterEach(() => vi.restoreAllMocks());

describe("reserve", () => {
  it("returns field errors for invalid input", async () => {
    const r = await reserve(idle, form({ email: "nope" }));
    expect(r.status).toBe("error");
    expect(r.errors?.email).toBeTruthy();
  });
  it("succeeds with a demo message and makes no network call", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const r = await reserve(idle, form({}));
    expect(r.status).toBe("success");
    expect(r.message).toMatch(/demo/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
