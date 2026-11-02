import { describe, expect, it } from "vitest";
import { lightAt } from "./light";

describe("lightAt", () => {
  it("clamps progress below 0", () => expect(lightAt(-1)).toEqual(lightAt(0)));
  it("clamps progress above 1", () => expect(lightAt(2)).toEqual(lightAt(1)));
  it("is dark at 0 and fully lit at 1", () => {
    expect(lightAt(0).light).toBe(0);
    expect(lightAt(1).light).toBe(1);
  });
  it("is monotonic", () => {
    let prev = -1;
    for (let i = 0; i <= 10; i++) {
      const { light } = lightAt(i / 10);
      expect(light).toBeGreaterThanOrEqual(prev);
      prev = light;
    }
  });
  it("keeps light and warmth in [0, 1]", () => {
    for (let i = 0; i <= 10; i++) {
      const { light, warmth } = lightAt(i / 10);
      expect(light).toBeGreaterThanOrEqual(0);
      expect(light).toBeLessThanOrEqual(1);
      expect(warmth).toBeGreaterThanOrEqual(0);
      expect(warmth).toBeLessThanOrEqual(1);
    }
  });
});
