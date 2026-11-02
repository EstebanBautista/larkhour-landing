import { Heading, Section } from "@/components/ui/Section";
import type { CompareSection } from "@/lib/sanity/types";

export function Compare({ section }: { section: CompareSection }) {
  return (
    <Section id="compare" tone="sky" labelledBy="compare-title">
      <Heading id="compare-title">{section.heading}</Heading>
      <p className="mt-6 max-w-[56ch]">{section.body}</p>
      <dl className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <dt className="text-xl font-bold">{section.alarmLabel}</dt>
          <dd className="mt-2 max-w-[40ch]">{section.alarmCaption}</dd>
        </div>
        <div>
          <dt className="text-xl font-bold">{section.larkhourLabel}</dt>
          <dd className="mt-2 max-w-[40ch]">{section.larkhourCaption}</dd>
        </div>
      </dl>
    </Section>
  );
}
