import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-ink text-accent-fg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-6">
        <div className="space-y-3 md:col-span-1">
          <p className="font-display text-[22px] tracking-[0.16em] uppercase">Fashion House</p>
          <p className="text-[13px] leading-relaxed text-accent-fg/70">
            Luxury skincare and scented body care, composed in Bellevue, Cape Town.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-accent-fg/50 uppercase">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-[14px] text-accent-fg/80">
            <li>
              <Link to="/collection" className="hover:text-accent-fg">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/collection" search={{ group: "Face" }} className="hover:text-accent-fg">
                Face
              </Link>
            </li>
            <li>
              <Link to="/collection" search={{ group: "Body" }} className="hover:text-accent-fg">
                Body
              </Link>
            </li>
            <li>
              <Link to="/collection" search={{ group: "Mists" }} className="hover:text-accent-fg">
                Mists
              </Link>
            </li>
            <li>
              <Link to="/atelier" className="hover:text-accent-fg">
                The Atelier
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-accent-fg/50 uppercase">
            Visit
          </p>
          <p className="mt-3 flex items-start gap-2 text-[14px] leading-relaxed text-accent-fg/80">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            Bellevue
            <br />
            Cape Town, South Africa
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-accent-fg/50 uppercase">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-[14px] text-accent-fg/80">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a href="mailto:fashion@house.com">fashion@house.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a href="tel:+27211234567">+27 21 123 4567</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a href="tel:+27821234567">+27 82 123 4567</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 px-5 py-5 text-center text-[11px] tracking-wide text-accent-fg/45">
        © {new Date().getFullYear()} Fashion House. All rights reserved.
      </div>
    </footer>
  );
}
