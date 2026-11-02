"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/motion/gsap";
import { DURATION, EASE } from "@/lib/motion/tokens";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];

/** Native details/summary, with the height animated once GSAP has loaded. */
export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const gsapRef = useRef<Gsap | null>(null);

  useEffect(() => {
    loadGsap().then(({ gsap }) => {
      gsapRef.current = gsap;
    });
  }, []);

  const onToggle = (event: React.MouseEvent) => {
    const el = ref.current;
    const gsap = gsapRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !gsap || reduce) return; // the browser opens and closes it at once

    event.preventDefault();
    gsap.killTweensOf(el);
    const opening = !el.open;
    const startHeight = el.offsetHeight;
    const style = getComputedStyle(el);
    const summary = el.querySelector("summary")!;
    const closedHeight = summary.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

    if (opening) el.open = true;
    const endHeight = opening ? el.scrollHeight : closedHeight;
    el.style.overflow = "hidden";
    gsap.fromTo(
      el,
      { height: startHeight },
      {
        height: endHeight,
        duration: DURATION.state,
        ease: EASE.state,
        onComplete: () => {
          if (!opening) el.open = false;
          el.style.height = "";
          el.style.overflow = "";
        },
      },
    );
  };

  return (
    <details ref={ref} className="group py-5">
      <summary
        onClick={onToggle}
        className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden"
      >
        {question}
        <span aria-hidden className="text-2xl transition-transform duration-[240ms] group-open:rotate-45 motion-reduce:transition-none">
          +
        </span>
      </summary>
      <div className="mt-3 max-w-[56ch]">{children}</div>
    </details>
  );
}
