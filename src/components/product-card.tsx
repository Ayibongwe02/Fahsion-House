import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatZar, productTitle, type Product } from "@/lib/catalog";
import { useBagStore } from "@/lib/bag-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const liked = useBagStore((s) => s.likes.includes(product.id));
  const toggleLike = useBagStore((s) => s.toggleLike);

  return (
    <article className="group" style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative mb-3 overflow-hidden rounded-[22px] bg-surface fh-card">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block aspect-[3/4] overflow-hidden"
        >
          <img
            src={product.image}
            alt={productTitle(product)}
            className="fh-photo h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        {product.tag ? (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-elevated/80 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-fg uppercase shadow-[0_0_0_0.5px_rgb(42_24_28/0.08)] backdrop-blur-xl">
            {product.tag}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={
            liked ? `Remove ${productTitle(product)} from saved` : `Save ${productTitle(product)}`
          }
          aria-pressed={liked}
          onClick={() => toggleLike(product.id)}
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-elevated/80 text-fg shadow-[0_0_0_0.5px_rgb(42_24_28/0.08)] backdrop-blur-xl transition-[transform,background-color] duration-150 ease-out active:scale-[0.96]"
        >
          <Heart
            className={cn(
              "size-[18px] transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
              liked ? "fill-accent text-accent scale-100" : "text-fg scale-100",
            )}
          />
        </button>
      </div>
      <Link to="/product/$id" params={{ id: product.id }} className="block space-y-1 px-0.5">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          {product.category}
        </p>
        <h3 className="font-display text-[22px] leading-tight text-fg">{product.name}</h3>
        <p className="text-[13px] leading-snug text-muted">{product.description}</p>
        <p className="pt-1 text-[15px] font-medium tabular-nums text-fg">
          {formatZar(product.price)}
          <span className="font-normal text-muted"> · {product.volume}</span>
        </p>
      </Link>
    </article>
  );
}
