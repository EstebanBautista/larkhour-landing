import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { getPage, getPageSlugs, getSiteSettings } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Known pages are prerendered. A page published later is rendered on its first visit and then cached,
// so adding a landing page in Sanity needs no redeploy.
export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  // Next needs at least one entry. "home" is a placeholder that answers 404, because the home page lives at "/".
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "home" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "home") return {};
  const [page, settings] = await Promise.all([getPage(slug), getSiteSettings()]);
  if (!page) return {};
  return buildMetadata(settings, { title: page.seoTitle || page.title, description: page.seoDescription, path: `/${slug}` });
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") notFound();
  return <LandingPage slug={slug} />;
}
