import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1024, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#reserve").scrollIntoViewIfNeeded();
});

const form = (page: import("@playwright/test").Page) => page.locator("#reserve");

test("an invalid email shows an associated error and moves focus to it", async ({ page }) => {
  await form(page).getByLabel("Email").fill("foo");
  await form(page).getByRole("button", { name: "Reserve yours" }).click();
  const email = form(page).getByLabel("Email");
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(email).toHaveAttribute("aria-describedby", "email-error");
  await expect(email).toBeFocused();
});

test("a valid reservation shows loading, then a demo success message", async ({ page }) => {
  await page.route("**/*", async (route) => {
    if (route.request().method() === "POST") await new Promise((r) => setTimeout(r, 700));
    await route.continue();
  });
  await form(page).getByLabel("Email").fill("ana@example.com");
  await form(page).getByRole("button", { name: "Reserve yours" }).click();
  await expect(form(page).getByRole("button", { name: "Reserving…" })).toBeDisabled();
  await expect(form(page).getByRole("status")).toContainText(/demo/i);
});

test("the summary reflects the morning set in the configurator", async ({ page }) => {
  await page.locator("#configurator").scrollIntoViewIfNeeded();
  await page.getByLabel("Wake time").fill("06:30");
  await page.getByRole("radio", { name: "30 min" }).check({ force: true });
  await expect(form(page).getByTestId("morning-summary")).toContainText("Light starts at 6:00. Full brightness at 6:30.");
});

test("choosing a finish changes the lamp", async ({ page }) => {
  const lamp = form(page).locator("svg[data-finish]");
  await expect(lamp).toHaveAttribute("data-finish", "a");
  await form(page).locator("label", { hasText: "Slate" }).click();
  await expect(lamp).toHaveAttribute("data-finish", "b");
});

test("the honeypot is hidden from people and assistive tech", async ({ page }) => {
  const trap = form(page).locator("input[name=company]");
  await expect(trap).toHaveAttribute("tabindex", "-1");
  await expect(trap).toBeHidden();
});
