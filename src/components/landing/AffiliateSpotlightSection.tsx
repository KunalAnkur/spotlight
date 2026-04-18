import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AffiliateProductsPreview from "@/components/affiliate/AffiliateProductsPreview";
import { Button } from "@/components/ui/button";

export default function AffiliateSpotlightSection() {
  return (
    <section id="shop" className="landing-section py-16 md:py-20">
      <div className="landing-shell relative z-10">
        <div className="pointer-events-none absolute inset-x-0 top-14 -z-10 h-48 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_62%)] blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="space-y-5">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300/72">
                Watch Party Shop
              </p>
              <h2 className="mt-4 font-parkinsans text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-[3rem]">
                The same room products, on a public shelf.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/64">
                We are using the same Guardian product feed that powers the room carousel, so links and
                images stay aligned across both apps.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" asChild className="font-parkinsans">
                <Link href="/watch-party-shop">
                  Browse all picks
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="font-parkinsans">
                <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                  Start a room
                </a>
              </Button>
            </div>
          </div>

          <AffiliateProductsPreview />
        </div>
      </div>
    </section>
  );
}
