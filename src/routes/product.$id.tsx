import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useBagStore } from "@/lib/bag-store";
import { formatZar, getProduct, productTitle, relatedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.id) };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.product.name} · Fashion House` : "Fashion House",
      },
    ],
  }),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const add = useBagStore((s) => s.add);
  const liked = useBagStore((s) => s.likes.includes(product.id));
  const toggleLike = useBagStore((s) => s.toggleLike);
  const [qty, setQty] = useState(1);

  return (
    <main className="fh-page mx-auto max-w-6xl px-5 pt-2 pb-28 md:px-6 md:pt-8 md:pb-20">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-14">
        <div className="relative overflow-hidden rounded-[28px] bg-surface fh-shine fh-card">
          <img
            src={product.image}
            alt={productTitle(product)}
            className="fh-photo aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
            {product.category} · {product.family} scent
          </p>
          <h1 className="mt-2 font-display text-[42px] leading-none text-fg md:text-[56px]">
            {product.name}
          </h1>
          <p className="mt-2 text-[15px] text-muted">{product.volume} · exclusive to the maison</p>
          <p className="mt-4 font-display text-[36px] leading-none tabular-nums">
            {formatZar(product.price)}
          </p>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-fg/85">{product.story}</p>

          <div className="mt-8 overflow-hidden rounded-[22px] bg-elevated">
            <NoteRow label="Scent" value={product.details.scent.join(" · ")} />
            <NoteRow label="Actives" value={product.details.actives.join(" · ")} />
            <NoteRow label="Ritual" value={product.details.ritual} last />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-[14px] bg-elevated p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex size-11 items-center justify-center"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-[16px] font-medium tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex size-11 items-center justify-center"
                onClick={() => setQty((n) => n + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              className="flex-1"
              onClick={() => {
                add(product.id, qty);
                toast(`${productTitle(product)} added to bag`, {
                  description: `${qty} × ${product.volume}`,
                  className: "fh-toast",
                });
              }}
            >
              Add to bag
            </Button>
            <button
              type="button"
              aria-label={liked ? "Unsave" : "Save"}
              aria-pressed={liked}
              onClick={() => toggleLike(product.id)}
              className="flex size-12 items-center justify-center rounded-[14px] bg-elevated text-fg active:scale-[0.96]"
            >
              <Heart className={cn("size-5", liked ? "fill-accent text-accent" : "text-fg")} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16 md:mt-24">
          <Reveal>
            <h2 className="font-display text-[32px] text-fg">Pairs with</h2>
          </Reveal>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 70}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/collection" className="text-[15px] font-medium text-accent">
              Return to collection
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function NoteRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={last ? "flex gap-4 p-4" : "flex gap-4 border-b border-border p-4"}>
      <span className="w-[4.75rem] shrink-0 pt-0.5 text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
        {label}
      </span>
      <span className="text-[15px] text-fg">{value}</span>
    </div>
  );
}
