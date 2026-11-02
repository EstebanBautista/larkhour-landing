import type { Product, Section } from "@/lib/sanity/types";
import { Anatomy } from "./sections/Anatomy";
import { Closing } from "./sections/Closing";
import { Compare } from "./sections/Compare";
import { Configurator } from "./sections/Configurator";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { Promises } from "./sections/Promises";
import { Reserve } from "./sections/Reserve";

export function SectionRenderer({ sections, product }: { sections: Section[]; product: Product }) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return <Hero key={section._key} section={section} product={product} />;
          case "compareSection":
            return <Compare key={section._key} section={section} />;
          case "configuratorSection":
            return <Configurator key={section._key} section={section} />;
          case "anatomySection":
            return <Anatomy key={section._key} section={section} />;
          case "promisesSection":
            return <Promises key={section._key} section={section} />;
          case "reserveSection":
            return <Reserve key={section._key} section={section} product={product} />;
          case "faqSection":
            return <Faq key={section._key} section={section} />;
          case "closingSection":
            return <Closing key={section._key} section={section} />;
          default:
            console.warn("Unknown section type", (section as { _type?: string })._type);
            return null;
        }
      })}
    </>
  );
}
