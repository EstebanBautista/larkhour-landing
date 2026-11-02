import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { ClosingSection } from "@/lib/sanity/types";

export function Closing({ section }: { section: ClosingSection }) {
  return (
    <Section id="closing" tone="night" labelledBy="closing-title">
      <h2
        id="closing-title"
        className="font-display text-[clamp(2.75rem,10vw,8rem)] leading-[0.95] font-bold text-balance break-words [font-variation-settings:'wdth'_80]"
      >
        {section.headline}
      </h2>
      {section.body ? <p className="mt-6 max-w-[44ch]">{section.body}</p> : null}
      <Button href="#reserve" className="mt-10">
        {section.ctaLabel}
      </Button>
    </Section>
  );
}
