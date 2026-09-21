import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  featuredIds,
  getProduct,
  houseIngredients,
  lookbook,
  productsInGroup,
  ritual,
  shopByGroup,
  storyImages,
  formatZar,
  type Product,
} from "@/lib/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = featuredIds.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));

  return (
    <main className="fh-page">
      <Hero />
      <NotesMarquee />
      <ShopByCategory />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                Signature
              </p>
              <h2 className="mt-2 font-display text-[36px] leading-none text-fg md:text-[44px]">
                This season
              </h2>
            </div>
            <Link
              to="/collection"
              className="hidden items-center gap-1 text-[13px] font-medium text-accent md:inline-flex"
            >
              All products
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link to="/collection">View the collection</Link>
          </Button>
        </div>
      </section>

      <Ritual />
      <StoryBand />
      <Lookbook />
      <Newsletter />
      <SiteFooter />
    </main>
  );
}

function NotesMarquee() {
  const loop = [...houseIngredients, ...houseIngredients];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-3">
      <div className="fh-marquee-track flex gap-8 pr-8 whitespace-nowrap">
        {loop.map((note, i) => (
          <span
            key={`${note}-${i}`}
            className="text-[12px] font-medium tracking-[0.22em] text-muted uppercase"
          >
            {note}
            <span className="ml-8 text-subtle">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ShopByCategory() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 md:px-6 md:pt-24">
      <Reveal>
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          Shop by category
        </p>
        <h2 className="mt-2 font-display text-[36px] leading-none text-fg md:text-[44px]">
          Face, body &amp; scent
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {shopByGroup.map((tile, i) => (
          <Reveal key={tile.group} delay={i * 70}>
            <Link
              to="/collection"
              search={{ group: tile.group }}
              className="group fh-card relative block aspect-[4/5] overflow-hidden rounded-[28px] bg-ink md:aspect-[3/4]"
            >
              <img
                src={tile.image}
                alt=""
                loading="lazy"
                className="fh-photo h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgb(28_16_19/0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-accent-fg">
                <p className="text-[11px] font-medium tracking-[0.2em] text-accent-fg/65 uppercase">
                  {productsInGroup(tile.group).length} products
                </p>
                <h3 className="mt-1 font-display text-[34px] leading-none italic">{tile.label}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-[14px] text-accent-fg/80">
                  {tile.blurb}
                  <ArrowRight className="size-4 shrink-0" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Ritual() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
      <Reveal>
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          The daily ritual
        </p>
        <h2 className="mt-2 font-display text-[36px] leading-none text-fg md:text-[44px]">
          Three quiet steps
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ritual.map((item, i) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <Reveal key={item.step} delay={i * 70}>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="group flex h-full items-center gap-4 rounded-[22px] bg-elevated p-4 fh-card"
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="fh-photo size-[88px] shrink-0 rounded-[16px] object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
                    <span className="font-display text-[15px] tracking-normal text-accent">
                      {item.step}
                    </span>{" "}
                    {item.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-fg/85">{item.body}</p>
                  <p className="mt-1.5 text-[13px] font-medium text-accent">
                    {product.name} {product.category} · {formatZar(product.price)}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function StoryBand() {
  return (
    <section className="bg-ink text-accent-fg">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-6 md:py-24">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent-fg/55 uppercase">
            Our philosophy
          </p>
          <h2 className="mt-3 font-display text-[36px] leading-[1.05] md:text-[48px]">
            A study in atmosphere — refined, tactile, quietly confident.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-accent-fg/75">
            Born in Cape Town, Fashion House turns flowers, resins, and light into skincare and body
            care that feels timeless and modern — scented with intention, gentle on skin. True
            elegance needs no announcement.
          </p>
          <Link
            to="/atelier"
            className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent-fg"
          >
            Visit the atelier
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-3">
            <img
              src={storyImages[0]}
              alt="Pink cosmetic tubes and containers on a pale background"
              className="fh-photo aspect-[3/4] w-full rounded-[22px] object-cover"
            />
            <img
              src={storyImages[1]}
              alt="A hand holding a black glass bottle"
              className="fh-photo mt-8 aspect-[3/4] w-full rounded-[22px] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Lookbook</p>
          <h2 className="mt-2 font-display text-[36px] text-fg">Maison frames</h2>
        </Reveal>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-6">
        {lookbook.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 60} className="shrink-0">
            <figure className="w-[78vw] snap-center sm:w-[320px] md:w-[380px]">
              <div className="overflow-hidden rounded-[28px] bg-surface fh-card">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="fh-photo aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 px-1 text-[13px] text-muted">{shot.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    toast("You are on the list", {
      description: "Private drops and atelier evenings, sent sparingly.",
      className: "fh-toast",
    });
  }

  return (
    <section className="px-5 pb-8 md:px-6">
      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-accent px-6 py-12 text-accent-fg md:px-12 md:py-16">
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent-fg/60 uppercase">
            Private list
          </p>
          <h2 className="mt-2 font-display text-[36px] leading-none md:text-[44px]">
            Join the house
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-accent-fg/75">
            Be first to new formulas, private drops, and atelier evenings. No noise — only the work.
          </p>
          {done ? (
            <p className="mt-8 text-[15px] font-medium">Welcome. We will write soon.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="bg-ink/20 text-accent-fg placeholder:text-accent-fg/45 shadow-[inset_0_0_0_1px_rgb(255_250_244/0.18)] focus:shadow-[inset_0_0_0_2px_rgb(255_250_244/0.55)]"
              />
              <Button
                type="submit"
                variant="outline"
                className="shrink-0 bg-elevated text-fg shadow-none sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
