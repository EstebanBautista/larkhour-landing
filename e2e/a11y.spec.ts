import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const width of [375, 1440]) {
  test(`axe finds no serious or critical issues at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    // Open one FAQ item so its content is checked too.
    await page.locator("#faq summary").first().click();
    const { violations } = await new AxeBuilder({ page }).analyze();
    const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });
}

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("axe finds no serious or critical issues, header included", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("#hero")).toHaveAttribute("data-motion", "static");
    const { violations } = await new AxeBuilder({ page }).analyze();
    const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });
});

test("keyboard focus on a button over a dark background draws a light ring", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const cta = page.locator("#hero").getByRole("link", { name: "Reserve yours" });
  await cta.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(cta).toBeFocused();
  const ring = await cta.evaluate((el) => getComputedStyle(el).outlineColor);
  expect(ring).toBe("rgb(255, 243, 214)"); // moon, readable on night
});

test("the skip link is the first tab stop and leads into main", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => !!document.activeElement?.closest("main"))).toBe(true);
});

test("a keyboard user can reach the CTA, configurator, reservation and FAQ with no trap", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const reached = new Set<string>();
  let last = "";
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const here = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return "body";
      const section = el.closest("section")?.id ?? (el.closest("header") ? "header" : el.closest("footer") ? "footer" : "other");
      return `${section}:${el.tagName.toLowerCase()}:${(el as HTMLInputElement).name || el.id || el.textContent?.slice(0, 20)}`;
    });
    reached.add(here.split(":")[0]);
    last = here;
    if (here === "body") break; // focus left the page content: no trap
  }
  for (const id of ["hero", "configurator", "reserve", "faq", "closing", "footer"]) expect(reached, `reached ${id}`).toContain(id);
  expect(last).toBe("body");
});
