import { Lamp } from "@/components/lamp/Lamp";
import { Heading, Section } from "@/components/ui/Section";
import type { AnatomySection } from "@/lib/sanity/types";

export function Anatomy({ section }: { section: AnatomySection }) {
  const points = section.points ?? [];
  return (
    <Section id="anatomy" tone="sky" labelledBy="anatomy-title">
      <Heading id="anatomy-title">{section.heading}</Heading>
      {section.body ? <p className="mt-6 max-w-[52ch]">{section.body}</p> : null}
      {points.length > 0 ? (
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative mx-auto w-full max-w-[320px]">
            <Lamp finish="a" className="w-full" />
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              {points.map((p) => (
                <span
                  key={p._key}
                  className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night bg-amber"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              ))}
            </div>
          </div>
          <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p._key}>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 max-w-[36ch]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
