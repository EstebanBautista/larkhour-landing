import { Lamp } from "@/components/lamp/Lamp";
import { Button } from "@/components/ui/Button";
import type { HeroSection, Product } from "@/lib/sanity/types";

export function Hero({ section, product }: { section: HeroSection; product: Product }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-night text-moon"
      style={{ background: "color-mix(in oklab, #14233f, #dceef5 calc(var(--light) * 100%))" }}
    >
      <div className="mx-auto grid min-h-svh max-w-[1200px] items-center gap-10 px-[var(--gutter)] pt-28 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[length:var(--text-display)] leading-[0.95] font-bold text-balance break-words [font-variation-settings:'wdth'_80]"
          >
            {section.headline}
          </h1>
          {section.subhead ? <p className="mt-8 max-w-[34ch] text-lg">{section.subhead}</p> : null}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#reserve">{section.ctaLabel}</Button>
            <p>
              <span className="text-xl font-bold">${product.price}</span>
              <span className="ml-3 text-sm">{product.shipDate}</span>
            </p>
          </div>
        </div>
        <Lamp finish="a" className="mx-auto w-full max-w-[320px] lg:max-w-none" />
      </div>
    </section>
  );
}
