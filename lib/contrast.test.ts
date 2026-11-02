import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";

describe("brand palette contrast", () => {
  it("moon on night passes AAA", () => expect(contrastRatio("#FFF3D6", "#14233F")).toBeGreaterThanOrEqual(7));
  it("night on amber passes AAA", () => expect(contrastRatio("#14233F", "#F5A524")).toBeGreaterThanOrEqual(7));
  it("moon on ember passes AA", () => expect(contrastRatio("#FFF3D6", "#C93A1C")).toBeGreaterThanOrEqual(4.5));
  it("night on sky passes AAA", () => expect(contrastRatio("#14233F", "#DCEEF5")).toBeGreaterThanOrEqual(7));
  it("is symmetric", () => expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(contrastRatio("#FFFFFF", "#000000")));
  it("black on white is 21", () => expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21));
});
