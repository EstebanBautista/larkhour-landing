import { notFound } from "next/navigation";
import { getPage, getProduct } from "@/lib/sanity/queries";
import type { Section } from "@/lib/sanity/types";
import { MorningProvider, type MorningState } from "./MorningProvider";
import { SectionRenderer } from "./SectionRenderer";

function morningDefaults(sections: Section[]): MorningState {
  const config = sections.find((s) => s._type === "configuratorSection");
  return {
    wakeTime: config?.defaultWakeTime ?? "06:30",
    durationMin: config?.defaultDuration ?? 30,
    sound: config?.sounds?.[0] ?? "No sound",
    finish: "a",
  };
}

export async function LandingPage({ slug }: { slug: string }) {
  const [page, product] = await Promise.all([getPage(slug), getProduct()]);
  if (!page) notFound();
  const sections = page.sections ?? [];
  return (
    <MorningProvider defaults={morningDefaults(sections)}>
      <SectionRenderer sections={sections} product={product} />
    </MorningProvider>
  );
}
