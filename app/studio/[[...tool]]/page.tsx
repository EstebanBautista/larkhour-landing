import { NextStudio, metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import config from "@/sanity.config";

export const metadata = { ...studioMetadata, title: "Larkhour Studio", robots: { index: false } };
export const viewport = studioViewport;

export default function StudioPage() {
  return <NextStudio config={config} />;
}
