import { PortableText } from "next-sanity";
import { Heading, Section } from "@/components/ui/Section";
import type { FaqSection } from "@/lib/sanity/types";

export function Faq({ section }: { section: FaqSection }) {
  const items = section.items ?? [];
  return (
    <Section id="faq" tone="sky" labelledBy="faq-title">
      <Heading id="faq-title">{section.heading}</Heading>
      {items.length > 0 ? (
        <div className="mt-10 max-w-[760px] divide-y-2 divide-night/20 border-y-2 border-night/20">
          {items.map((item) => (
            <details key={item._key} className="group py-5">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden className="text-2xl transition-transform duration-[240ms] group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
              </summary>
              <div className="mt-3 max-w-[56ch]">
                <PortableText value={item.answer} />
              </div>
            </details>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
