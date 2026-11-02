// Run: node --env-file=.env.local scripts/seed.ts
import { createClient } from "@sanity/client";
import { seedPage, seedProduct, seedSite } from "../sanity/seed/content.ts";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is empty. Add it to .env.local.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

const { slug, ...page } = seedPage;
await client
  .transaction()
  .createOrReplace({ _id: "siteSettings", _type: "siteSettings", ...seedSite })
  .createOrReplace({
    _id: "product",
    _type: "product",
    ...seedProduct,
    finishes: seedProduct.finishes.map((f) => ({ _key: f.key, ...f })),
  })
  .createOrReplace({ _id: "page-home", _type: "page", ...page, slug: { _type: "slug", current: slug } })
  .commit();
console.log("Seeded siteSettings, product and page-home.");
