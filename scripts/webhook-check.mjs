// Run: node --env-file=.env.local scripts/webhook-check.mjs https://your-site.vercel.app
// Changes the hero headline, waits for the site to show it (proving the webhook revalidates), then restores it.
import { createClient } from "@sanity/client";

const site = process.argv[2];
if (!site) throw new Error("Pass the site URL as the first argument.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const path = 'sections[_key=="hero"].headline';
const current = await client.fetch(`*[_id=="page-home"][0].sections[_key=="hero"][0].headline`);
const marker = `Webhook check ${Date.now()}`;

const siteShows = async (text) => (await (await fetch(site, { cache: "no-store" })).text()).includes(text);

async function waitFor(text, label) {
  const start = Date.now();
  while (Date.now() - start < 60_000) {
    if (await siteShows(text)) return console.log(`${label}: site updated after ${Math.round((Date.now() - start) / 1000)}s`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.log(`${label}: site did NOT update within 60s`);
  process.exitCode = 1;
}

try {
  await client.patch("page-home").set({ [path]: marker }).commit();
  await waitFor(marker, "change");
} finally {
  await client.patch("page-home").set({ [path]: current }).commit();
  await waitFor(current, "restore");
}
