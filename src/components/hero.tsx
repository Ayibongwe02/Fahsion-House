import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/catalog";

const headline = ["The softness", "of iris,", "the glow", "of skin"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[78dvh] md:min-h-[calc(100dvh-5.5rem)]">
        <div className="absolute inset-0 overflow-hidden bg-ink">
          <img
            src={heroImage}
            alt="Amber glass bottle on a wooden pedestal in dappled light"
            className="fh-hero-ken h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_16_19/0.15)_0%,rgb(28_16_19/0.28)_45%,rgb(28_16_19/0.72)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-5 pb-10 md:min-h-[calc(100dvh-5.5rem)] md:justify-center md:px-6 md:pb-16">
          <div className="max-w-xl text-accent-fg">
            <p
              className="fh-word text-[11px] font-medium tracking-[0.28em] text-accent-fg/80 uppercase"
              style={{ animationDelay: "40ms" }}
            >
              Cape Town Atelier
            </p>
            <h1 className="mt-3 font-display text-[48px] leading-[0.95] tracking-[-0.03em] md:text-[72px]">
              {headline.map((word, i) => (
                <span
                  key={word}
                  className="fh-word mr-[0.28em] inline-block italic last:mr-0 last:text-accent-fg/80"
                  style={{ animationDelay: `${120 + i * 80}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p
              className="fh-word mt-5 max-w-md text-[16px] leading-relaxed text-accent-fg/82"
              style={{ animationDelay: "460ms" }}
            >
              Skincare and scented body care through quiet contrast — refined, tactile, and made for
              skin that lives well.
            </p>
            <div className="fh-word mt-7 flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
              <Button asChild className="min-w-[9.5rem] pr-4">
                <Link to="/collection">
                  Explore collection
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-w-[9.5rem] border-0 bg-elevated/18 text-accent-fg shadow-[0_0_0_1px_rgb(255_250_244/0.28)] hover:bg-elevated/28"
              >
                <Link to="/atelier">Our story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
