import { Heading, Section } from "@/components/ui/Section";
import type { PromisesSection } from "@/lib/sanity/types";

export function Promises({ section }: { section: PromisesSection }) {
  const promises = section.promises ?? [];
  const quotes = section.quotes ?? [];
  return (
    <Section id="promises" tone="sky" labelledBy="promises-title">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
        <Heading id="promises-title" className="lg:sticky lg:top-28 lg:self-start">
          {section.heading}
        </Heading>
        <div>
          {promises.length > 0 ? (
            <ul className="divide-y-2 divide-night/20 border-y-2 border-night/20">
              {promises.map((p) => (
                <li key={p._key} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr] md:gap-8">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="max-w-[48ch]">{p.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
          {quotes.map((q, i) => (
            <figure key={q._key} className={`mt-12 max-w-[44ch] ${i % 2 === 1 ? "md:ml-24" : ""}`}>
              <blockquote className="font-display text-2xl leading-tight [font-variation-settings:'wdth'_90]">{q.text}</blockquote>
              <figcaption className="mt-3 text-sm">{q.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
