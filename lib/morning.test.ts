import { describe, expect, it } from "vitest";
import { computeMorning, formatMorning } from "./morning";

describe("computeMorning", () => {
  it("starts the light duration minutes before wake time", () => {
    expect(computeMorning("06:30", 30)).toEqual({ lightStart: "6:00", fullBrightness: "6:30" });
  });
  it("wraps past midnight to the previous day", () => {
    expect(computeMorning("00:10", 30)).toEqual({ lightStart: "23:40", fullBrightness: "0:10" });
  });
  it("handles a 45 minute sunrise", () => {
    expect(computeMorning("07:05", 45)).toEqual({ lightStart: "6:20", fullBrightness: "7:05" });
  });
});

describe("formatMorning", () => {
  it("announces both times", () => {
    expect(formatMorning({ lightStart: "6:00", fullBrightness: "6:30" })).toBe("Light starts at 6:00. Full brightness at 6:30.");
  });
});
