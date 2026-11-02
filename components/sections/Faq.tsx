import { PortableText } from "next-sanity";
import { Heading, Section } from "@/components/ui/Section";
import type { FaqSection } from "@/lib/sanity/types";
import { FaqItem } from "./FaqItem";

export function Faq({ section }: { section: FaqSection }) {
  const items = section.items ?? [];
  return (
    <Section id="faq" tone="sky" labelledBy="faq-title">
      <Heading id="faq-title">{section.heading}</Heading>
      {items.length > 0 ? (
        <div className="mt-10 max-w-[760px] divide-y-2 divide-night/20 border-y-2 border-night/20">
          {items.map((item) => (
            <FaqItem key={item._key} question={item.question}>
              <PortableText value={item.answer} />
            </FaqItem>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
