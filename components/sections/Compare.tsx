"use client";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/Switch";
import { Heading, Section } from "@/components/ui/Section";
import { lightAt } from "@/lib/light";
import { loadGsap } from "@/lib/motion/gsap";
import { DURATION, EASE } from "@/lib/motion/tokens";
import type { CompareSection } from "@/lib/sanity/types";

const STEPS = 30; // one point per minute of the sunrise
const X0 = 10;
const BASE = 110;
const HEIGHT = 100;

/** A jump at the last minute: the room is dark until the alarm goes off. */
const ALARM = Array.from({ length: STEPS + 1 }, (_, i) => (i < STEPS ? BASE : BASE - HEIGHT));
/** A smooth rise that reaches full brightness at wake time. */
const RAMP = Array.from({ length: STEPS + 1 }, (_, i) => BASE - lightAt(i / STEPS).light * HEIGHT);

const toPath = (ys: number[]) => "M" + ys.map((y, i) => `${X0 + i * 10},${y.toFixed(1)}`).join(" L");

export function Compare({ section }: { section: CompareSection }) {
  const [larkhour, setLarkhour] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const current = useRef<number[]>(ALARM);
  const tween = useRef<{ kill: () => void } | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const target = larkhour ? RAMP : ALARM;
    const write = (ys: number[]) => {
      current.current = ys;
      pathRef.current?.setAttribute("d", toPath(ys));
    };
    tween.current?.kill();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(target);
      return;
    }
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const from = [...current.current];
      const progress = { t: 0 };
      tween.current = gsap.to(progress, {
        t: 1,
        duration: DURATION.state,
        ease: EASE.state,
        onUpdate: () => write(from.map((v, i) => v + (target[i] - v) * progress.t)),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [larkhour]);

  const caption = larkhour ? section.larkhourCaption : section.alarmCaption;

  return (
    <Section id="compare" tone="sky" labelledBy="compare-title">
      <Heading id="compare-title">{section.heading}</Heading>
      <p className="mt-6 max-w-[56ch]">{section.body}</p>
      <div className="mt-10">
        <Switch
          checked={larkhour}
          onChange={setLarkhour}
          label="Compare wake-up styles"
          offLabel={section.alarmLabel}
          onLabel={section.larkhourLabel}
        />
      </div>
      <figure className="mt-10 max-w-[760px]">
        <svg viewBox="0 0 320 140" role="img" aria-labelledby="compare-caption" className="w-full overflow-visible">
          <line x1={X0} y1={BASE} x2={X0 + STEPS * 10} y2={BASE} stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path ref={pathRef} data-curve d={toPath(ALARM)} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
          <text x={X0} y="134" fontSize="11" fill="currentColor">
            30 min before
          </text>
          <text x={X0 + STEPS * 10} y="134" fontSize="11" fill="currentColor" textAnchor="end">
            Wake time
          </text>
          <text x={X0} y="6" fontSize="11" fill="currentColor">
            Light in the room
          </text>
        </svg>
        <figcaption id="compare-caption" aria-live="polite" className="mt-4 max-w-[44ch] text-lg">
          {caption}
        </figcaption>
      </figure>
    </Section>
  );
}
