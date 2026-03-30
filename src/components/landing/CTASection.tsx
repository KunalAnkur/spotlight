import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ctaEmojis = [
  {
    emoji: "✨",
    className: "-left-10 top-10 xl:-left-14",
    animationClass: "animate-float-subtle",
    delay: "0.14s",
    sizeClass: "text-[1.45rem]",
  },
  {
    emoji: "🫶",
    className: "right-2 top-0 xl:-right-8",
    animationClass: "animate-float-gentle",
    delay: "0.28s",
    sizeClass: "text-[1.7rem]",
  },
  {
    emoji: "🎬",
    className: "left-6 bottom-20 xl:-left-4",
    animationClass: "animate-float-delayed",
    delay: "0.42s",
    sizeClass: "text-[1.6rem]",
  },
  {
    emoji: "💫",
    className: "right-12 bottom-14 xl:right-0",
    animationClass: "animate-float-subtle",
    delay: "0.56s",
    sizeClass: "text-[1.5rem]",
  },
];

const CTASection = () => {
  return (
    <section className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {ctaEmojis.map((item) => (
              <div
                key={`${item.emoji}-${item.className}`}
                aria-hidden="true"
                className={`absolute opacity-80 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] ${item.sizeClass} ${item.className} ${item.animationClass}`}
                style={{
                  animationDelay: item.delay,
                }}
              >
                <span>{item.emoji}</span>
              </div>
            ))}
          </div>

          {/* Heading */}
          <h2 className="mb-6 font-parkinsans text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Ready for Your Next{" "}
            <span className="text-gradient">Watch Party?</span>
          </h2>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-white/68">
            Start a room in seconds and bring everyone into the same watch experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild className="font-parkinsans">
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5" />
                Start Free Watch Party
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild className="font-parkinsans">
              <a href="#features">
                Explore Features
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="landing-meta-line mt-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              No downloads required
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Works on all devices
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
