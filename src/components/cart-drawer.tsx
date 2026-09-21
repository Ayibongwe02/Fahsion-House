import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatZar } from "@/lib/catalog";
import { bagCount, bagProducts, bagTotal, useBagStore } from "@/lib/bag-store";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const lines = useBagStore((s) => s.lines);
  const setQty = useBagStore((s) => s.setQty);
  const remove = useBagStore((s) => s.remove);
  const clear = useBagStore((s) => s.clear);
  const items = bagProducts(lines);
  const total = bagTotal(lines);
  const count = bagCount(lines);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[52dvh]">
        <div className="flex items-start justify-between px-5 pt-4 pb-3">
          <div>
            <DrawerTitle className="font-display text-[28px] leading-none text-fg">Bag</DrawerTitle>
            <DrawerDescription className="mt-1 text-[13px] text-muted">
              {count === 0 ? "Your bag is empty" : `${count} ${count === 1 ? "item" : "items"}`}
            </DrawerDescription>
          </div>
          {count > 0 ? (
            <button
              type="button"
              onClick={() => clear()}
              className="h-11 px-2 text-[13px] font-medium text-accent"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-bg text-muted">
                <ShoppingBag className="size-6" />
              </div>
              <p className="max-w-[16rem] text-[15px] leading-relaxed text-muted">
                The collection is waiting. Add a ritual to begin.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => onOpenChange(false)}
              >
                Continue browsing
              </Button>
            </div>
          ) : (
            <ul className="overflow-hidden rounded-[22px] bg-elevated">
              {items.map(({ product, qty }, i) => (
                <li
                  key={product.id}
                  className={i === 0 ? "flex gap-3 p-3" : "flex gap-3 border-t border-border p-3"}
                >
                  <Link
                    to="/product/$id"
                    params={{ id: product.id }}
                    onClick={() => onOpenChange(false)}
                    className="size-[72px] shrink-0 overflow-hidden rounded-[14px] bg-bg"
                  >
                    <img src={product.image} alt="" className="fh-photo size-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[15px] text-fg">{product.name}</p>
                    <p className="text-[12px] text-muted">
                      {product.volume} · {product.category}
                    </p>
                    <p className="mt-1 text-[14px] font-medium tabular-nums">
                      {formatZar(product.price * qty)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.id)}
                      className="flex size-8 items-center justify-center text-muted"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <div className="flex items-center rounded-full bg-bg p-0.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="flex size-8 items-center justify-center"
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-5 text-center text-[13px] font-medium tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="flex size-8 items-center justify-center"
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {count > 0 ? (
          <div className="border-t border-border bg-surface px-4 pt-3 pb-3">
            <div className="mb-3 flex items-baseline justify-between px-1">
              <span className="text-[13px] text-muted">Total</span>
              <span className="font-display text-[28px] leading-none tabular-nums">
                {formatZar(total)}
              </span>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                toast("Request received", {
                  description: "The atelier will confirm availability by email.",
                  className: "fh-toast",
                });
                onOpenChange(false);
              }}
            >
              Request this order
            </Button>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
