import { Suspense } from "react";
import { LandingPage } from "@/components/LandingPage";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LandingPage slug={slug} />;
}

// Landing pages beyond the home page render on demand, so a new page published
// in Sanity needs no redeploy.
export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={null}>
      <Page params={params} />
    </Suspense>
  );
}
