import { expect, test, type Page } from "@playwright/test";

const light = (page: Page, selector: string) =>
  page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)!).getPropertyValue("--light")), selector);

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the headline and reserve CTA are in the served HTML", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wake up to light, not an alarm.");
    await expect(page.locator("#hero").getByRole("link", { name: "Reserve yours" })).toBeVisible();
  });
});

test.describe("with motion", () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  test("scrolling the pinned hero raises the light", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero")).toHaveAttribute("data-motion", "ready");
    const before = await light(page, "#hero");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5 * 0.75));
    await expect.poll(() => light(page, "#hero")).toBeGreaterThan(Math.max(before, 0.5));
    await expect(page.locator("#hero")).toHaveAttribute("data-tone", "day");
  });

  test("the closing section returns the page to night", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#closing")).toHaveAttribute("data-motion", "ready");
    await page.locator("#closing").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => light(page, "#closing")).toBeLessThan(0.1);
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1024, height: 800 } });

  test("the hero is not pinned and shows its final state", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero")).toHaveAttribute("data-motion", "static");
    await expect(page.locator("h1")).toBeVisible();
    expect(await light(page, "#hero")).toBe(1);
    const position = await page.locator("#hero").evaluate((el) => getComputedStyle(el).position);
    expect(position).not.toBe("fixed");
    await page.evaluate(() => window.scrollTo(0, 400));
    const top = await page.locator("#hero").evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeLessThan(0);
  });

  test("the closing section is night with no scrub", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#closing")).toHaveAttribute("data-motion", "static");
    expect(await light(page, "#closing")).toBe(0);
  });
});
