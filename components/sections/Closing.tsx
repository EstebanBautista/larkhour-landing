import { LightStage } from "@/components/motion/LightStage";
import { Button } from "@/components/ui/Button";
import type { ClosingSection } from "@/lib/sanity/types";

export function Closing({ section }: { section: ClosingSection }) {
  return (
    <LightStage id="closing" labelledBy="closing-title" pin={false} direction="fall" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-[var(--gutter)] py-[var(--section-space)]">
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
      </div>
    </LightStage>
  );
}
