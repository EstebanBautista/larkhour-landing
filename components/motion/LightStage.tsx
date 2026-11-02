"use client";
import { useRef, type ReactNode } from "react";
import { useLightStage, type LightStageOptions } from "@/lib/motion/useLightStage";

interface LightStageProps extends LightStageOptions {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/** A section whose background and text follow the page's light state. */
export function LightStage({ id, labelledBy, className = "", children, ...options }: LightStageProps) {
  const ref = useRef<HTMLElement>(null);
  useLightStage(ref, options);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-tone="night"
      className={`bg-night text-moon data-[tone=day]:text-night ${className}`}
      style={{ background: "color-mix(in oklab, #14233f, #dceef5 calc(var(--light) * 100%))" }}
    >
      {children}
    </section>
  );
}
