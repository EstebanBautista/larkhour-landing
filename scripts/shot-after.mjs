// Run against a running production server: node scripts/shot-after.mjs http://localhost:3100
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3100";
const out = "docs/before-after";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function desktop() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector("#hero[data-motion=ready]");
  await page.screenshot({ path: `${out}/after-hero-night-1440.png` });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.55));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/after-hero-dawn-1440.png` });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/after-hero-day-1440.png` });
  for (const id of ["compare", "configurator", "anatomy"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator(`#${id}`).screenshot({ path: `${out}/after-${id}-1440.png` });
  }
  await page.close();
}

async function mobile() {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector("#hero[data-motion=ready]");
  await page.screenshot({ path: `${out}/after-hero-night-375.png` });
  await page.locator("#anatomy").screenshot({ path: `${out}/after-anatomy-375.png` });
  await page.close();
}

await desktop();
await mobile();
await browser.close();
