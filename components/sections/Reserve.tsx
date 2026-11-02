import { Heading, Section } from "@/components/ui/Section";
import type { Product, ReserveSection } from "@/lib/sanity/types";

export function Reserve({ section, product }: { section: ReserveSection; product: Product }) {
  return (
    <Section id="reserve" tone="night" labelledBy="reserve-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Heading id="reserve-title">{section.heading}</Heading>
          <p className="mt-6 max-w-[48ch]">{section.body}</p>
          <p className="mt-8 text-xl">
            <span className="font-bold">${product.deposit} deposit</span> today, ${product.price - product.deposit} when it ships.
          </p>
          <p className="mt-2 text-sm">{product.shipDate}</p>
        </div>
        <div id="reserve-form" />
      </div>
    </Section>
  );
}
