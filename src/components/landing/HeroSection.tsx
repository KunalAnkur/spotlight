import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoVideoPreview from "@/components/landing/DemoVideoPreview";
import Link from "next/link";

const demoVideoEmojis = [
  {
    emoji: "🎬",
    className: "-left-[46px] top-10",
    animationClass: "animate-float-gentle",
    delay: "0.12s",
    sizeClass: "text-[1.85rem]",
  },
  {
    emoji: "🍿",
    className: "-right-[46px] top-8",
    animationClass: "animate-float",
    delay: "0.28s",
    sizeClass: "text-[1.95rem]",
  },
  {
    emoji: "🎥",
    className: "-left-[56px] top-1/2",
    animationClass: "animate-float-subtle",
    delay: "0.44s",
    sizeClass: "text-[1.55rem]",
  },
  {
    emoji: "💬",
    className: "-right-[56px] top-[46%]",
    animationClass: "animate-float-gentle",
    delay: "0.58s",
    sizeClass: "text-[1.55rem]",
  },
  {
    emoji: "✨",
    className: "left-16 -top-7",
    animationClass: "animate-float",
    delay: "0.38s",
    sizeClass: "text-[1.8rem]",
  },
  {
    emoji: "🎉",
    className: "right-16 -bottom-7",
    animationClass: "animate-float-subtle",
    delay: "0.66s",
    sizeClass: "text-[1.75rem]",
  },
];

const HeroSection = () => {
  return (
    // pt-26 (104px) clears the 60px fixed header with room to breathe.
    <section className="relative overflow-visible pb-[60px] pt-[104px] text-center">
      <div className="landing-shell relative z-10">
        <p className="landing-kicker animate-slide-up">Watch Party App</p>

        <h1 className="animate-slide-up font-parkinsans font-semibold leading-[1.08] tracking-[-0.03em] text-white [font-size:clamp(2rem,4.6vw,2.9rem)]">
          Online movie nights are easy!
          <br />
          <span className="text-gradient">Watch together with Movmash.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[600px] animate-slide-up text-base leading-[1.75] text-white/68">
          Start a watch party in seconds with synced playback, private room links, chat,
          reactions and screen sharing. Plus games you can play in the same room.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3.5 animate-slide-up stagger-3 sm:flex-row">
          <Button variant="hero" asChild className="font-parkinsans">
            <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
              <Play className="fill-current" strokeWidth={0} />
              Start Watch Party
            </a>
          </Button>
          <Button variant="outline" asChild className="font-parkinsans">
            <Link href="/games">See the games</Link>
          </Button>
        </div>

        <p className="mt-[22px] animate-slide-up text-sm text-white/46">
          Also exploring?{" "}
          <Link href="/watch-together" className="text-white/72 transition-colors hover:text-white">
            Watch together online
          </Link>{" "}
          and{" "}
          <Link
            href="/long-distance-date-night"
            className="text-white/72 transition-colors hover:text-white"
          >
            long-distance date night
          </Link>
          .
        </p>

        <div id="demo-video" className="relative mx-auto mt-11 max-w-[900px]">
          <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
            {demoVideoEmojis.map((item) => (
              <div
                key={`${item.emoji}-${item.className}`}
                aria-hidden="true"
                className={`absolute leading-none opacity-80 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] ${item.sizeClass} ${item.className} ${item.animationClass}`}
                style={{
                  animationDelay: item.delay,
                }}
              >
                <span>{item.emoji}</span>
              </div>
            ))}
          </div>
          <DemoVideoPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
