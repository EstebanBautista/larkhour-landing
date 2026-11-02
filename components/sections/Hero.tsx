import { Lamp } from "@/components/lamp/Lamp";
import { LightStage } from "@/components/motion/LightStage";
import { Button } from "@/components/ui/Button";
import type { HeroSection, Product } from "@/lib/sanity/types";

export function Hero({ section, product }: { section: HeroSection; product: Product }) {
  return (
    <LightStage id="hero" labelledBy="hero-title" pin direction="rise" entrance className="relative overflow-hidden">
      <div className="mx-auto grid min-h-svh max-w-[1200px] items-center gap-10 px-[var(--gutter)] pt-24 pb-12 lg:pt-28 lg:pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] text-balance break-words"
            style={{ fontVariationSettings: '"wdth" calc(78 + var(--light) * 22), "wght" calc(500 + var(--light) * 300)' }}
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
        <div data-entrance className="order-first mx-auto w-full max-w-[150px] sm:max-w-[220px] lg:order-none lg:max-w-none">
          <Lamp finish="a" className="w-full" />
        </div>
      </div>
    </LightStage>
  );
}
