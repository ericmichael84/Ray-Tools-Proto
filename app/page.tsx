import { PrototypeApp } from "@/components/prototype/PrototypeApp";
import { parsePrototypeSearch } from "@/lib/prototype/url-state";

type PageProps = {
  searchParams?: Promise<{ v?: string; t?: string; s?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const initial = parsePrototypeSearch(sp);
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <PrototypeApp initial={initial} />
    </div>
  );
}
