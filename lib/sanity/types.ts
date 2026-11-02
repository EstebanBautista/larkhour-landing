import type { PortableTextBlock } from "next-sanity";

export type FinishKey = "a" | "b";
export type Duration = 10 | 20 | 30 | 45;

export interface Finish {
  key: FinishKey;
  name: string;
  color: string;
}

export interface Product {
  name: string;
  price: number;
  deposit: number;
  shipDate: string;
  finishes: Finish[];
}

export interface SiteSettings {
  siteName: string;
  seoTitle: string;
  seoDescription: string;
  disclaimer: string;
  repoUrl?: string;
  videoUrl?: string;
  ogImageUrl?: string;
}

interface Keyed {
  _key: string;
}

export interface HeroSection extends Keyed {
  _type: "heroSection";
  headline: string;
  subhead?: string;
  ctaLabel: string;
}

export interface CompareSection extends Keyed {
  _type: "compareSection";
  heading: string;
  body: string;
  alarmLabel: string;
  larkhourLabel: string;
  alarmCaption: string;
  larkhourCaption: string;
}

export interface ConfiguratorSection extends Keyed {
  _type: "configuratorSection";
  heading: string;
  body: string;
  defaultWakeTime: string;
  defaultDuration: Duration;
  sounds: string[];
}

export interface AnatomyPoint extends Keyed {
  title: string;
  body: string;
  x: number;
  y: number;
}

export interface AnatomySection extends Keyed {
  _type: "anatomySection";
  heading: string;
  body?: string;
  points?: AnatomyPoint[];
}

export interface PromisesSection extends Keyed {
  _type: "promisesSection";
  heading: string;
  promises?: (Keyed & { title: string; body: string })[];
  quotes?: (Keyed & { text: string; attribution: string })[];
}

export interface ReserveSection extends Keyed {
  _type: "reserveSection";
  heading: string;
  body: string;
  ctaLabel: string;
  demoNote: string;
  successMessage: string;
}

export interface FaqSection extends Keyed {
  _type: "faqSection";
  heading: string;
  items?: (Keyed & { question: string; answer: PortableTextBlock[] })[];
}

export interface ClosingSection extends Keyed {
  _type: "closingSection";
  headline: string;
  body?: string;
  ctaLabel: string;
}

export type Section =
  | HeroSection
  | CompareSection
  | ConfiguratorSection
  | AnatomySection
  | PromisesSection
  | ReserveSection
  | FaqSection
  | ClosingSection;

export interface PageDoc {
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: Section[];
}
