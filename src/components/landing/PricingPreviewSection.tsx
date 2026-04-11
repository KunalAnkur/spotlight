import Link from "next/link";
import PricingPlansGrid from "@/components/pricing/PricingPlansGrid";
import { Button } from "@/components/ui/button";

const PricingPreviewSection = () => {
  return (
    <section id="pricing" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading">
          <p className="mb-4 font-parkinsans text-xs font-semibold uppercase tracking-[0.28em] text-rose-400/78">
            Pricing
          </p>
          <h2 className="landing-section-title mb-4">
            Pick the room that fits the night.
          </h2>
          <p className="landing-section-copy max-w-2xl">
            Start free for smaller private rooms, or move to Premium when you need
            bigger sessions, unlimited time, and audio or video calls.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Button variant="outline" size="lg" asChild className="font-parkinsans">
              <Link href="/pricing">See details</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute left-1/2 top-8 h-40 w-[30rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.12),transparent_72%)] blur-3xl" />
          <PricingPlansGrid className="relative z-10" />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-white/54 md:text-[15px]">
          Need the full breakdown too?{" "}
          <Link href="/pricing" className="secondary-inline-link">
            Open the pricing page
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default PricingPreviewSection;
