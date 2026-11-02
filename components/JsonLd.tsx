import type { Product, SiteSettings } from "@/lib/sanity/types";

/** Organization and Product only. No Offer: the product is fictional, so no real price is published as an offer. */
export function JsonLd({ settings, product, url }: { settings: SiteSettings; product: Product; url: string }) {
  const data = [
    { "@context": "https://schema.org", "@type": "Organization", name: settings.siteName, url },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: settings.seoDescription,
      brand: { "@type": "Brand", name: settings.siteName },
      image: `${url}opengraph-image`,
    },
  ];
  // "<" is escaped so CMS text can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
