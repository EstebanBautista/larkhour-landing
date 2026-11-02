// Run: node scripts/shot-mockup.mjs
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(pathToFileURL(resolve("docs/mockup-basic.html")).href);
await page.screenshot({ path: "docs/mockup-basic.png", fullPage: true });
await browser.close();
