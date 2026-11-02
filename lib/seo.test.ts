import { describe, expect, it } from "vitest";
import { ogImageOverride } from "./seo";

describe("ogImageOverride", () => {
  it("returns the CMS image when one is set", () => {
    expect(ogImageOverride({ ogImageUrl: "https://cdn.sanity.io/x.png" })).toEqual(["https://cdn.sanity.io/x.png"]);
  });
  it("returns undefined when none is set, so the generated image is used", () => {
    expect(ogImageOverride({})).toBeUndefined();
    expect(ogImageOverride({ ogImageUrl: "" })).toBeUndefined();
  });
});
