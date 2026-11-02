import { getPage } from "@/lib/sanity/queries";

export default async function Home() {
  const page = await getPage("home");
  return (
    <main>
      <h1>{page?.title ?? "Larkhour"}</h1>
    </main>
  );
}
