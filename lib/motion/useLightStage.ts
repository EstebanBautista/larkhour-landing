"use client";
import { useEffect, type RefObject } from "react";
import { lightAt } from "@/lib/light";
import { loadGsap } from "./gsap";
import { DURATION, EASE } from "./tokens";

export interface LightStageOptions {
  /** Pin the section while the light changes. */
  pin: boolean;
  /** "rise": night to day as you scroll. "fall": day back to night. */
  direction: "rise" | "fall";
  /** Lift elements marked data-entrance once on load. The only autoplay motion. */
  entrance?: boolean;
}

/** Text switches colour at one fixed point, never through an unreadable mix. */
const DAY_THRESHOLD = 0.55;

/**
 * Writes --light and --warmth on the element from scroll progress.
 * Reduced motion skips ScrollTrigger and sets the final state at once.
 */
export function useLightStage(ref: RefObject<HTMLElement | null>, { pin, direction, entrance = false }: LightStageOptions) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let mm: { revert: () => void } | undefined;

    const apply = (progress: number) => {
      const { light, warmth } = lightAt(direction === "rise" ? progress : 1 - progress);
      el.style.setProperty("--light", light.toFixed(3));
      el.style.setProperty("--warmth", warmth.toFixed(3));
      el.dataset.tone = light > DAY_THRESHOLD ? "day" : "night";
    };

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const matchMedia = gsap.matchMedia();
      mm = matchMedia;

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: pin ? "top top" : "top bottom",
          end: pin ? "+=150%" : "top 40%",
          pin,
          scrub: true,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
        apply(trigger.progress);
        el.dataset.motion = "ready";
        if (entrance) {
          gsap.from(el.querySelectorAll("[data-entrance]"), { y: 40, duration: DURATION.hero, ease: EASE.hero });
        }
        // Pinning measures layout, so measure again once the fonts have loaded.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        return () => trigger.kill();
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        apply(1);
        el.dataset.motion = "static";
      });
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [ref, pin, direction, entrance]);
}
