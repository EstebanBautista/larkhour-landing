import { expect, test } from "@playwright/test";

test("home has title, description, canonical and no noindex", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Larkhour: wake up to light, not an alarm");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /sunrise|brightens/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https?:\/\/[^/]+\/?$/);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
});

test("the Open Graph image is a 1200x630 PNG", async ({ page, request }) => {
  await page.goto("/");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toBeTruthy();
  const res = await request.get(new URL(og!).pathname);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
  const png = await res.body();
  expect(png.readUInt32BE(16)).toBe(1200); // IHDR width
  expect(png.readUInt32BE(20)).toBe(630); // IHDR height
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("structured data describes the organization and product, with no offer", async ({ page }) => {
  await page.goto("/");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const json = scripts.join("\n");
  expect(json).toContain('"@type":"Organization"');
  expect(json).toContain('"@type":"Product"');
  expect(json).not.toContain("Offer");
});

test("robots and sitemap are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<loc>");
});
