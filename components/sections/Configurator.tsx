"use client";
import { useState } from "react";
import { Lamp } from "@/components/lamp/Lamp";
import { useMorning } from "@/components/MorningProvider";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Heading, Section } from "@/components/ui/Section";
import { lightAt } from "@/lib/light";
import { computeMorning, formatMorning } from "@/lib/morning";
import type { ConfiguratorSection, Duration } from "@/lib/sanity/types";

const DURATIONS: Duration[] = [10, 20, 30, 45];

export function Configurator({ section }: { section: ConfiguratorSection }) {
  const morning = useMorning();
  const [preview, setPreview] = useState(70);
  const { light, warmth } = lightAt(preview / 100);
  const announcement = formatMorning(computeMorning(morning.wakeTime, morning.durationMin));

  return (
    <Section id="configurator" tone="sky" labelledBy="configurator-title">
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Heading id="configurator-title">{section.heading}</Heading>
          <p className="mt-6 max-w-[52ch]">{section.body}</p>
          <div className="mt-10 grid gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="wake-time" className="text-sm font-medium">
                Wake time
              </label>
              <input
                id="wake-time"
                type="time"
                value={morning.wakeTime}
                onChange={(e) => e.target.value && morning.set({ wakeTime: e.target.value })}
                className="min-h-12 w-40 rounded-xl border-2 border-current bg-transparent px-4"
              />
            </div>
            <RadioGroup
              name="duration"
              legend="Sunrise length"
              options={DURATIONS.map((d) => ({ value: String(d), label: `${d} min` }))}
              value={String(morning.durationMin)}
              onChange={(v) => morning.set({ durationMin: Number(v) as Duration })}
            />
            <RadioGroup
              name="sound"
              legend="Sound at the end"
              options={section.sounds.map((s) => ({ value: s, label: s }))}
              value={morning.sound}
              onChange={(v) => morning.set({ sound: v })}
            />
            <p aria-live="polite" className="text-xl font-bold">
              {announcement}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div data-lamp-preview style={{ "--light": light, "--warmth": warmth } as React.CSSProperties} className="w-full max-w-[260px]">
            <Lamp finish={morning.finish} className="w-full" />
          </div>
          <div className="flex w-full max-w-[320px] flex-col gap-2">
            <label htmlFor="sunrise-preview" className="text-sm font-medium">
              Preview the sunrise
            </label>
            <input
              id="sunrise-preview"
              type="range"
              min={0}
              max={100}
              value={preview}
              aria-valuetext={`${preview}% of the sunrise`}
              onChange={(e) => setPreview(Number(e.target.value))}
              className="h-12 w-full accent-night"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
