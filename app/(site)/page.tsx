import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingPage } from "@/components/LandingPage";
import { getPage, getProduct, getSiteSettings } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage("home"), getSiteSettings()]);
  return buildMetadata(settings, { title: page?.seoTitle || settings.seoTitle, description: page?.seoDescription, path: "/" });
}

export default async function Home() {
  const [settings, product] = await Promise.all([getSiteSettings(), getProduct()]);
  return (
    <>
      <JsonLd settings={settings} product={product} url={siteUrl().href} />
      <LandingPage slug="home" />
    </>
  );
}
