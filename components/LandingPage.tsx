import { notFound } from "next/navigation";
import { getPage, getProduct } from "@/lib/sanity/queries";
import { SectionRenderer } from "./SectionRenderer";

export async function LandingPage({ slug }: { slug: string }) {
  const [page, product] = await Promise.all([getPage(slug), getProduct()]);
  if (!page) notFound();
  return <SectionRenderer sections={page.sections ?? []} product={product} />;
}
