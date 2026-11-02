import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1024, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#configurator").scrollIntoViewIfNeeded();
});

const announcement = (page: import("@playwright/test").Page) => page.locator("#configurator [aria-live]");

test("announces when the light starts and when it is full", async ({ page }) => {
  await page.getByLabel("Wake time").fill("06:30");
  await page.getByRole("radio", { name: "30 min" }).check({ force: true });
  await expect(announcement(page)).toHaveText("Light starts at 6:00. Full brightness at 6:30.");
});

test("handles a sunrise that starts before midnight", async ({ page }) => {
  await page.getByLabel("Wake time").fill("00:10");
  await page.getByRole("radio", { name: "30 min" }).check({ force: true });
  await expect(announcement(page)).toHaveText("Light starts at 23:40. Full brightness at 0:10.");
});

test("a longer sunrise moves the start time earlier", async ({ page }) => {
  await page.getByLabel("Wake time").fill("07:05");
  await page.getByRole("radio", { name: "45 min" }).check({ force: true });
  await expect(announcement(page)).toHaveText("Light starts at 6:20. Full brightness at 7:05.");
});

test("the preview slider changes the lamp light", async ({ page }) => {
  const lamp = page.locator("#configurator [data-lamp-preview]");
  const light = () => lamp.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue("--light")));
  const slider = page.locator("#configurator input[type=range]");
  await slider.fill("0");
  expect(await light()).toBe(0);
  await slider.fill("100");
  expect(await light()).toBe(1);
});

test("a keyboard user can pick a sound with the arrow keys", async ({ page }) => {
  await page.getByRole("radio", { name: "Birdsong" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Soft bell" })).toBeChecked();
});
