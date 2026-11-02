import type { Metadata } from "next";
import type { SiteSettings } from "./sanity/types";

/** The CMS Open Graph image, when an editor has set one. Otherwise the generated image is used. */
export function ogImageOverride(settings: Pick<SiteSettings, "ogImageUrl">): string[] | undefined {
  return settings.ogImageUrl ? [settings.ogImageUrl] : undefined;
}

/** Shared by every CMS page so the home page and pages made in Sanity get the same tags. */
export function buildMetadata(settings: SiteSettings, page: { title: string; description?: string; path: string }): Metadata {
  const description = page.description || settings.seoDescription;
  const images = ogImageOverride(settings);
  return {
    title: page.title,
    description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description, type: "website", siteName: settings.siteName, url: page.path, ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title: page.title, description, ...(images ? { images } : {}) },
  };
}
