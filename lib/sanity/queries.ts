import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { fixturePages, seedPage, seedProduct, seedSite } from "@/sanity/seed/content";
import { client } from "./client";
import type { PageDoc, Product, SiteSettings } from "./types";

// CONTENT_SOURCE=local serves seed content, so e2e tests never depend on the network.
const isLocal = () => process.env.CONTENT_SOURCE === "local";

const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{ title, "slug": slug.current, seoTitle, seoDescription, sections }`,
);
const SLUGS_QUERY = defineQuery(`*[_type == "page" && defined(slug.current) && slug.current != "home"].slug.current`);
const SETTINGS_QUERY = defineQuery(
  `*[_id == "siteSettings"][0]{ siteName, seoTitle, seoDescription, disclaimer, repoUrl, videoUrl, "ogImageUrl": ogImage.asset->url }`,
);
const PRODUCT_QUERY = defineQuery(`*[_id == "product"][0]{ name, price, deposit, shipDate, finishes }`);

export async function getPage(slug: string): Promise<PageDoc | null> {
  "use cache";
  cacheTag("page");
  cacheLife("max");
  if (isLocal()) return [seedPage, ...fixturePages].find((p) => p.slug === slug) ?? null;
  return client.fetch<PageDoc | null>(PAGE_QUERY, { slug });
}

export async function getPageSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("page");
  cacheLife("max");
  if (isLocal()) return fixturePages.map((p) => p.slug);
  return client.fetch<string[]>(SLUGS_QUERY, {});
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag("siteSettings");
  cacheLife("max");
  if (isLocal()) return seedSite;
  const settings = await client.fetch<SiteSettings | null>(SETTINGS_QUERY, {});
  return settings ?? seedSite;
}

export async function getProduct(): Promise<Product> {
  "use cache";
  cacheTag("product");
  cacheLife("max");
  if (isLocal()) return seedProduct;
  const product = await client.fetch<Product | null>(PRODUCT_QUERY, {});
  return product ?? seedProduct;
}
