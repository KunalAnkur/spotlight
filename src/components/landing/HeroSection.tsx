import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoVideoPreview from "@/components/landing/DemoVideoPreview";

const demoVideoEmojis = [
  {
    emoji: "🎬",
    className: "-left-8 top-10 xl:-left-12 xl:top-12",
    animationClass: "animate-float-gentle",
    delay: "0.12s",
    sizeClass: "text-[1.85rem]",
  },
  {
    emoji: "🍿",
    className: "-right-8 top-8 xl:-right-12 xl:top-10",
    animationClass: "animate-float-delayed",
    delay: "0.28s",
    sizeClass: "text-[1.95rem]",
  },
  {
    emoji: "🎥",
    className: "-left-10 top-1/2 -translate-y-1/2 xl:-left-14",
    animationClass: "animate-float-subtle",
    delay: "0.44s",
    sizeClass: "text-[1.55rem]",
  },
  {
    emoji: "💬",
    className: "-right-10 top-[46%] -translate-y-1/2 xl:-right-14",
    animationClass: "animate-float-gentle",
    delay: "0.58s",
    sizeClass: "text-[1.55rem]",
  },
  {
    emoji: "✨",
    className: "left-16 -top-6 xl:left-24",
    animationClass: "animate-float-delayed",
    delay: "0.38s",
    sizeClass: "text-[1.8rem]",
  },
  {
    emoji: "🎉",
    className: "right-16 -bottom-6 xl:right-24",
    animationClass: "animate-float-subtle",
    delay: "0.66s",
    sizeClass: "text-[1.75rem]",
  },
];

const HeroSection = () => {
  return (
    <section className="landing-section overflow-visible pb-16 pt-32 md:pb-20 md:pt-56">
      <div className="landing-shell relative z-10">
        <div className="absolute left-1/2 top-8 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.16)_0%,transparent_72%)] blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="animate-slide-up font-parkinsans text-3xl font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Watch together, <span className="text-gradient">feel closer.</span>
            </h1>

            <p className="mx-auto mt-3 max-w-3xl animate-slide-up text-sm font-medium leading-6 text-white/58 md:text-base">
              Private room links, synced playback, and zero setup friction.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-4 animate-slide-up stagger-3 sm:flex-row">
              <Button variant="hero" size="xl" asChild className="font-parkinsans">
                <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5" />
                  Start Watching
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild className="font-parkinsans">
                <a href="#features">
                  Explore Features
                </a>
              </Button>
            </div>
          </div>

          <div id="demo-video" className="relative mt-10 md:mt-12">
            <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
              {demoVideoEmojis.map((item) => (
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
            <div className="absolute inset-x-10 top-10 -z-10 h-28 bg-gradient-to-r from-[#e11d48]/16 via-[#db2777]/10 to-[#c026d3]/16 blur-3xl" />
            <DemoVideoPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
