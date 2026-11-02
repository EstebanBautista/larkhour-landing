import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
});

test.describe("comparison", () => {
  test("the switch toggles with the keyboard and redraws the curve", async ({ page }) => {
    await page.locator("#compare").scrollIntoViewIfNeeded();
    const toggle = page.locator("#compare").getByRole("switch");
    const curve = page.locator("#compare path[data-curve]");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    const before = await curve.getAttribute("d");
    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => curve.getAttribute("d")).not.toBe(before);
    await expect(page.locator("#compare")).toContainText("Light rises for 30 minutes");
  });

  test("the alarm curve is a jump and the Larkhour curve is a ramp", async ({ page }) => {
    await page.locator("#compare").scrollIntoViewIfNeeded();
    const curve = page.locator("#compare path[data-curve]");
    const ys = async () => ((await curve.getAttribute("d")) ?? "").match(/-?\d+(\.\d+)?,(-?\d+(\.\d+)?)/g)!.map((p) => parseFloat(p.split(",")[1]));
    const alarm = await ys();
    expect(alarm[Math.floor(alarm.length / 2)]).toBeCloseTo(alarm[0], 0);
    await page.locator("#compare").getByRole("switch").click();
    await expect.poll(async () => { const r = await ys(); return r[Math.floor(r.length / 2)]; }).toBeLessThan(alarm[0] - 20);
  });
});

test.describe("anatomy", () => {
  test("Tab walks the parts in order and shows the matching text", async ({ page }) => {
    await page.locator("#anatomy").scrollIntoViewIfNeeded();
    const titles = ["Glass diffuser", "Set", "Snooze", "Off", "Speaker"];
    await page.locator("#anatomy button").first().focus();
    for (const [i, title] of titles.entries()) {
      const active = page.locator("#anatomy button:focus");
      await expect(active).toHaveText(title);
      await expect(page.locator("#anatomy li:has(button:focus)")).toBeVisible();
      if (i < titles.length - 1) await page.keyboard.press("Tab");
    }
  });

  test("the focused part is marked on the lamp", async ({ page }) => {
    await page.locator("#anatomy").scrollIntoViewIfNeeded();
    await page.locator("#anatomy button", { hasText: "Snooze" }).focus();
    await expect(page.locator("#anatomy [data-dot][data-active=true]")).toHaveCount(1);
  });
});

test.describe("faq", () => {
  test("Enter opens a question and shows the answer", async ({ page }) => {
    await page.locator("#faq").scrollIntoViewIfNeeded();
    const first = page.locator("#faq details").first();
    await first.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(first).toHaveAttribute("open", "");
    await expect(first.getByText("No. Everything is set with the buttons")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(first).not.toHaveAttribute("open", "");
  });

  test("animates the height when it opens", async ({ page }) => {
    await page.locator("#faq").scrollIntoViewIfNeeded();
    const heightRightAfterClick = await page.locator("#faq details").first().evaluate((el) => {
      el.querySelector("summary")!.click();
      return (el as HTMLElement).style.height;
    });
    expect(heightRightAfterClick).not.toBe("");
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");
    await expect.poll(() => page.locator("#faq details").first().evaluate((el) => (el as HTMLElement).style.height)).toBe("");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("opens at once with no height animation", async ({ page }) => {
      await page.locator("#faq").scrollIntoViewIfNeeded();
      const first = page.locator("#faq details").first();
      await first.locator("summary").click();
      await expect(first).toHaveAttribute("open", "");
      expect(await first.evaluate((el) => (el as HTMLElement).style.height)).toBe("");
    });
  });
});
