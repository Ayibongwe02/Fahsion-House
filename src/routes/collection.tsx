import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products, type Group } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collection")({
  component: CollectionPage,
  validateSearch: (search: Record<string, unknown>): { group?: Group } => {
    const g = search.group;
    return g === "Face" || g === "Body" || g === "Mists" ? { group: g } : {};
  },
  head: () => ({
    meta: [{ title: "Collection · Fashion House" }],
  }),
});

const filters = ["All", "Face", "Body", "Mists"] as const;
type Filter = (typeof filters)[number];

function CollectionPage() {
  const { group } = Route.useSearch();
  const [filter, setFilter] = useState<Filter>(group ?? "All");
  const [query, setQuery] = useState("");

  // Keep the tab in sync when arriving from a "Shop by category" link.
  useEffect(() => {
    setFilter(group ?? "All");
  }, [group]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = filter === "All" || p.group === filter;
      const qOk =
        !q ||
        [p.name, p.category, p.family, p.description, ...p.details.scent, ...p.details.actives]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return catOk && qOk;
    });
  }, [filter, query]);

  return (
    <main className="fh-page mx-auto max-w-6xl px-5 pt-6 pb-16 md:px-6 md:pt-10">
      <Reveal>
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          The collection
        </p>
        <h1 className="mt-2 font-display text-[40px] leading-none text-fg md:text-[52px]">
          Skin & body care
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          Each formula is a study in balance — gentle actives, botanical scent, and light in quiet
          harmony.
        </p>
      </Reveal>

      <div className="sticky top-[calc(3.25rem+env(safe-area-inset-top))] z-20 -mx-5 mt-8 bg-bg/80 px-5 py-3 backdrop-blur-xl md:static md:mx-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, ingredients, scents"
            className="h-12 w-full rounded-[14px] bg-surface pr-4 pl-10 text-[16px] text-fg placeholder:text-subtle shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-fg)_8%,transparent)] outline-none focus:shadow-[inset_0_0_0_2px_var(--color-accent)]"
          />
        </label>
        <div className="fh-segmented mt-3" role="tablist" aria-label="Filter by category">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={cn("fh-segment", filter === item && "fh-segment-on")}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-[15px] text-muted">
          Nothing matches that search. Try an ingredient, a scent or a name.
        </p>
      ) : (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
