import type { ReactNode } from "react";

type Tone = "night" | "sky";
const tones: Record<Tone, string> = { night: "bg-night text-moon", sky: "bg-sky text-night" };

interface SectionProps {
  id: string;
  tone: Tone;
  children: ReactNode;
  labelledBy?: string;
  className?: string;
}

export function Section({ id, tone, children, labelledBy, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-[var(--gutter)] py-[var(--section-space)]">{children}</div>
    </section>
  );
}

export function Heading({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`font-display text-3xl leading-[1.05] font-bold text-balance break-words [font-variation-settings:'wdth'_85] md:text-[3.5rem] ${className}`}>
      {children}
    </h2>
  );
}
