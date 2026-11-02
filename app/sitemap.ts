import type { MetadataRoute } from "next";
import { getPageSlugs } from "@/lib/sanity/queries";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const slugs = await getPageSlugs();
  return [{ url: base.href, changeFrequency: "monthly", priority: 1 }, ...slugs.map((slug) => ({ url: new URL(slug, base).href }))];
}
