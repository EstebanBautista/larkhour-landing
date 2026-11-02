import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingPage } from "@/components/LandingPage";
import { getPage, getProduct, getSiteSettings } from "@/lib/sanity/queries";
import { siteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage("home"), getSiteSettings()]);
  const title = page?.seoTitle || settings.seoTitle;
  const description = page?.seoDescription || settings.seoDescription;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, type: "website", siteName: settings.siteName, url: "/" },
    twitter: { card: "summary_large_image", title, description },
  };
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
