import { Button } from "./ui/Button";

export function Header({ name, ctaLabel }: { name: string; ctaLabel: string }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[var(--gutter)] py-5">
        <a href="#hero" className="font-display text-xl font-bold [font-variation-settings:'wdth'_85]">
          {name}
        </a>
        <Button href="#reserve" className="hidden min-h-11 py-0 sm:inline-flex">
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}
