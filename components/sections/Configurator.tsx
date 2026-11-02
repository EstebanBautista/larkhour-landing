import { Lamp } from "@/components/lamp/Lamp";
import { Heading, Section } from "@/components/ui/Section";
import type { ConfiguratorSection } from "@/lib/sanity/types";

export function Configurator({ section }: { section: ConfiguratorSection }) {
  return (
    <Section id="configurator" tone="sky" labelledBy="configurator-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Heading id="configurator-title">{section.heading}</Heading>
          <p className="mt-6 max-w-[52ch]">{section.body}</p>
        </div>
        <Lamp finish="a" className="mx-auto w-full max-w-[260px]" />
      </div>
    </Section>
  );
}
