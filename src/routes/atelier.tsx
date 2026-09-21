import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { atelierImage } from "@/lib/catalog";

export const Route = createFileRoute("/atelier")({
  component: AtelierPage,
  head: () => ({
    meta: [{ title: "Atelier · Fashion House" }],
  }),
});

const craft = [
  {
    title: "Small-batch blending",
    body: "Every cleanser, lotion and balm is blended and filled by hand in Bellevue, so the formula never sits in a warehouse waiting to be wanted.",
  },
  {
    title: "Honest materials",
    body: "We work with sustainably sourced botanicals and packaging that can be returned or refilled through the atelier.",
  },
  {
    title: "Gentle by design",
    body: "Each formula is built around skin-friendly ingredients and finished with a light, considered scent — luxury that respects your skin.",
  },
  {
    title: "Designed in South Africa",
    body: "Formula, scent, and packaging are considered together — a maison, not a catalogue of disconnected objects.",
  },
];

function AtelierPage() {
  return (
    <main className="fh-page">
      <section className="relative overflow-hidden">
        <div className="h-[42dvh] min-h-[280px] overflow-hidden md:h-[52dvh]">
          <img
            src={atelierImage}
            alt="Skincare products laid out on a striped towel at the Fashion House atelier"
            className="fh-hero-ken h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--color-bg)_100%)]" />
        </div>
        <div className="relative mx-auto -mt-16 max-w-3xl px-5 pb-6 text-center md:px-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
            The atelier
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-[1.02] text-fg md:text-[56px]">
            Crafted in Cape Town with quiet intention
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-6 md:px-6">
        <Reveal>
          <p className="text-[17px] leading-relaxed text-fg/90">
            Our Cape Town atelier is where every jar and bottle is filled, every formula refined,
            and every detail considered. We work with natural materials and small-batch production
            to keep integrity in the work.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-6 md:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-[22px] bg-elevated">
            {craft.map((item, i) => (
              <article key={item.title} className={i === 0 ? "p-5" : "border-t border-border p-5"}>
                <h2 className="text-[16px] font-medium text-fg">{item.title}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-8 md:px-6">
        <Reveal>
          <h2 className="mb-3 px-1 text-[13px] font-medium tracking-[0.16em] text-muted uppercase">
            Visit us
          </h2>
          <ul className="overflow-hidden rounded-[22px] bg-elevated">
            <Row icon={MapPin} label="Address" value={"Bellevue\nCape Town, South Africa"} />
            <Row icon={Clock} label="Hours" value={"Tue–Sat 10:00–18:00\nSun 11:00–15:00"} />
            <Row
              icon={Mail}
              label="Email"
              value="fashion@house.com"
              href="mailto:fashion@house.com"
            />
            <Row icon={Phone} label="Atelier" value="+27 21 123 4567" href="tel:+27211234567" />
            <Row icon={Phone} label="Mobile" value="+27 82 123 4567" href="tel:+27821234567" last />
          </ul>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  href,
  last,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
}) {
  const inner = (
    <>
      <span className="flex size-9 items-center justify-center rounded-[10px] bg-bg text-accent">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-muted">{label}</span>
        <span className="block whitespace-pre-line text-[15px] text-fg">{value}</span>
      </span>
    </>
  );

  const className = last
    ? "flex items-center gap-3 p-3.5"
    : "flex items-center gap-3 border-b border-border p-3.5";

  if (href) {
    return (
      <li>
        <a href={href} className={className}>
          {inner}
        </a>
      </li>
    );
  }
  return <li className={className}>{inner}</li>;
}
