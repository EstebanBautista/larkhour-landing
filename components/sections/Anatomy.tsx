"use client";
import { useState } from "react";
import { Lamp } from "@/components/lamp/Lamp";
import { useMorning } from "@/components/MorningProvider";
import { Heading, Section } from "@/components/ui/Section";
import type { AnatomySection } from "@/lib/sanity/types";

export function Anatomy({ section }: { section: AnatomySection }) {
  const morning = useMorning();
  const points = section.points ?? [];
  const [pinned, setPinned] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const active = hover ?? pinned;

  return (
    <Section id="anatomy" tone="sky" labelledBy="anatomy-title">
      <Heading id="anatomy-title">{section.heading}</Heading>
      {section.body ? <p className="mt-6 max-w-[52ch]">{section.body}</p> : null}
      {points.length > 0 ? (
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative mx-auto w-full max-w-[320px]" style={{ "--light": 0.55, "--warmth": 0.2 } as React.CSSProperties}>
            <Lamp finish={morning.finish} className="w-full" />
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              {points.map((p) => {
                const on = active === p._key;
                return (
                  <span key={p._key}>
                    <span
                      data-dot
                      data-active={on}
                      className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night bg-amber transition-transform duration-[120ms] motion-reduce:transition-none ${on ? "scale-150" : active ? "opacity-40" : ""}`}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    />
                    {on ? (
                      <span
                        className="absolute h-0.5 -translate-y-1/2 bg-night"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: `calc(${100 - p.x}% + 48px)` }}
                      />
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>
          <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {points.map((p) => {
              const on = active === p._key;
              return (
                <li key={p._key} className={`border-l-4 pl-4 transition-colors duration-[120ms] ${on ? "border-night" : "border-transparent"}`}>
                  <h3 className="text-xl font-bold">
                    <button
                      type="button"
                      aria-pressed={pinned === p._key}
                      onClick={() => setPinned((k) => (k === p._key ? null : p._key))}
                      onMouseEnter={() => setHover(p._key)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(p._key)}
                      onBlur={() => setHover(null)}
                      className="min-h-11 text-left"
                    >
                      {p.title}
                    </button>
                  </h3>
                  <p className="mt-1 max-w-[36ch]">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
