import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, House, Landmark, LayoutGrid, ShoppingBag } from "lucide-react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { bagCount, useBagHydration, useBagStore } from "@/lib/bag-store";
import { CartDrawer } from "@/components/cart-drawer";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: House, exact: true },
  { to: "/collection", label: "Collection", icon: LayoutGrid, exact: false },
  { to: "/atelier", label: "Atelier", icon: Landmark, exact: false },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  useBagHydration();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lines = useBagStore((s) => s.lines);
  const count = bagCount(lines);
  const [bagOpen, setBagOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBack = pathname.startsWith("/product/");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header
        className={cn(
          "fh-glass fixed top-0 right-0 left-0 pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-200 ease-out",
          bagOpen ? "z-20" : "z-40",
          scrolled ? "shadow-[0_0.5px_0_color-mix(in_oklab,var(--color-fg)_12%,transparent)]" : "",
        )}
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-3 md:h-14 md:px-6">
          <div className="flex w-14 items-center">
            {showBack ? (
              <button
                type="button"
                aria-label="Back"
                onClick={() => router.history.back()}
                className="flex h-11 items-center gap-0.5 pr-2 text-[17px] font-medium text-accent active:opacity-50"
              >
                <ChevronLeft className="size-6" strokeWidth={2.25} />
                <span className="sr-only md:not-sr-only md:text-[15px]">Back</span>
              </button>
            ) : (
              <span className="hidden md:block" />
            )}
          </div>

          <Link
            to="/"
            className="font-display text-[20px] tracking-[0.18em] text-fg uppercase md:text-[22px]"
          >
            Fashion House
          </Link>

          <div className="flex w-14 justify-end">
            <button
              type="button"
              aria-label="Open bag"
              onClick={() => setBagOpen(true)}
              className="relative flex size-11 items-center justify-center text-fg active:scale-[0.96]"
            >
              <ShoppingBag className="size-[22px]" strokeWidth={1.75} />
              {count > 0 ? (
                <span
                  key={count}
                  className="fh-badge-pop absolute top-1 right-1 flex size-[18px] items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-fg tabular-nums"
                >
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-6xl items-center justify-center gap-8 px-6 pb-3 text-[13px] font-medium tracking-[0.14em] text-muted uppercase md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="transition-colors duration-150 hover:text-fg data-[status=active]:text-fg"
          >
            Home
          </Link>
          <Link
            to="/collection"
            className="transition-colors duration-150 hover:text-fg data-[status=active]:text-fg"
          >
            Collection
          </Link>
          <Link
            to="/atelier"
            className="transition-colors duration-150 hover:text-fg data-[status=active]:text-fg"
          >
            Atelier
          </Link>
        </nav>
      </header>

      <div className="min-h-dvh pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(4.85rem+env(safe-area-inset-bottom))] md:pt-[calc(5.75rem+env(safe-area-inset-top))] md:pb-0">
        {children}
      </div>

      <nav
        className={cn(
          "fh-tabbar fixed right-0 bottom-0 left-0 md:hidden",
          bagOpen ? "z-20" : "z-40",
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4 px-2 pt-1">
          {tabs.map((tab) => {
            const active = tab.exact
              ? pathname === tab.to
              : pathname === tab.to || pathname.startsWith(`${tab.to}/`);
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-12 flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide",
                    active ? "text-accent" : "text-muted",
                  )}
                >
                  <Icon
                    className="size-[22px]"
                    strokeWidth={active ? 2.2 : 1.7}
                    fill={active ? "currentColor" : "none"}
                    fillOpacity={active ? 0.18 : 0}
                  />
                  {tab.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              className={cn(
                "flex h-12 w-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide",
                bagOpen ? "text-accent" : "text-muted",
              )}
            >
              <span className="relative">
                <ShoppingBag
                  className="size-[22px]"
                  strokeWidth={bagOpen ? 2.2 : 1.7}
                />
                {count > 0 ? (
                  <span className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-fg tabular-nums">
                    {count}
                  </span>
                ) : null}
              </span>
              Bag
            </button>
          </li>
        </ul>
      </nav>

      <CartDrawer open={bagOpen} onOpenChange={setBagOpen} />
    </div>
  );
}
