import type { SiteSettings } from "@/lib/sanity/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const hasLinks = Boolean(settings.repoUrl || settings.videoUrl);
  return (
    <footer className="bg-night text-moon">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-10 text-sm">
        <p>
          {settings.siteName}. {settings.disclaimer}.
        </p>
        {hasLinks ? (
        <nav aria-label="Project links" className="flex gap-6">
          {settings.repoUrl ? (
            <a href={settings.repoUrl} className="underline underline-offset-4">
              Case study and source code
            </a>
          ) : null}
          {settings.videoUrl ? (
            <a href={settings.videoUrl} className="underline underline-offset-4">
              CMS walkthrough
            </a>
          ) : null}
        </nav>
        ) : null}
      </div>
    </footer>
  );
}
