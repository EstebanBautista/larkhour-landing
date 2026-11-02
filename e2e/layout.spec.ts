import { expect, test } from "@playwright/test";

const WIDTHS = [375, 768, 1024, 1440];

/** Page-level scroll can hide clipped content, so also check every element sits inside the viewport. */
async function expectNoOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const offenders = await page.evaluate(() => {
    const max = document.documentElement.clientWidth + 1;
    return [...document.querySelectorAll("main *")]
      .filter((el) => !el.closest("svg") || el.tagName === "svg")
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > max || r.left < -1);
      })
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
  });
  expect(offenders).toEqual([]);
}

for (const width of WIDTHS) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("home has no horizontal scroll and a visible h1", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("h1")).toBeVisible();
      await expectNoOverflow(page);
    });

    test("a 120 character headline does not overflow", async ({ page }) => {
      await page.goto("/fixture-long");
      await expect(page.locator("h1")).toBeVisible();
      await expectNoOverflow(page);
    });

    test("sections with no optional content still render", async ({ page }) => {
      const response = await page.goto("/fixture-sparse");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText("Sparse");
      await expect(page.getByRole("heading", { name: "No points" })).toBeVisible();
    });
  });
}
