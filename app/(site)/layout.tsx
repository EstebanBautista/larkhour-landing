import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { StickyCta } from "@/components/StickyCta";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <SkipLink />
      <Header name={settings.siteName} ctaLabel="Reserve yours" />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <StickyCta label="Reserve yours" />
    </>
  );
}
