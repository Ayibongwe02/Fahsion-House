import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct, type Product } from "./catalog";

export type BagLine = { id: string; qty: number };

type BagState = {
  lines: BagLine[];
  likes: string[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  clear: () => void;
};

export const useBagStore = create<BagState>()(
  persist(
    (set, get) => ({
      lines: [],
      likes: [],
      add: (id, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.id === id);
        if (i >= 0) {
          const current = lines[i];
          if (current) lines[i] = { id, qty: current.qty + qty };
        } else {
          lines.push({ id, qty });
        }
        set({ lines });
      },
      setQty: (id, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.id === id ? { id, qty } : l)),
        });
      },
      remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
      toggleLike: (id) => {
        const likes = get().likes;
        set({
          likes: likes.includes(id)
            ? likes.filter((x) => x !== id)
            : [...likes, id],
        });
      },
      isLiked: (id) => get().likes.includes(id),
      clear: () => set({ lines: [] }),
    }),
    { name: "fashion-house-bag-v2", skipHydration: true },
  ),
);

export function useBagHydration() {
  useEffect(() => {
    void useBagStore.persist.rehydrate();
  }, []);
}

export function bagCount(lines: BagLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function bagTotal(lines: BagLine[]) {
  return lines.reduce((n, l) => {
    const product = getProduct(l.id);
    return n + (product ? product.price * l.qty : 0);
  }, 0);
}

export function bagProducts(lines: BagLine[]): Array<{
  product: Product;
  qty: number;
}> {
  return lines.flatMap((line) => {
    const product = getProduct(line.id);
    return product ? [{ product, qty: line.qty }] : [];
  });
}
