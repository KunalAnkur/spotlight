import Image from "next/image";
import { MessageCircle, Shield, Tv } from "lucide-react";

const quickSignals = ["Private rooms", "Synced playback", "Live chat", "No install"];

const experienceHighlights = [
  {
    icon: Tv,
    title: "Video first",
    description: "Guests know where to look immediately.",
  },
  {
    icon: MessageCircle,
    title: "Chat nearby",
    description: "Social, but never in the way.",
  },
  {
    icon: Shield,
    title: "Simple hosting",
    description: "Clear controls that feel easy to trust.",
  },
];

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="landing-section pt-8 md:pt-10">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading mb-10 md:mb-12">
          <h2 className="landing-section-title mb-3 md:mb-4">
            A Room Layout That Feels{" "}
            <span className="text-gradient">Clear Right Away</span>
          </h2>
          <p className="landing-section-copy">
            The room keeps the video prominent while chat, reactions, and controls stay easy to understand.
          </p>
        </div>

        <div className="landing-meta-line mx-auto mb-6 max-w-6xl justify-center md:mb-8">
          {quickSignals.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
              {item}
            </span>
          ))}
        </div>

        <div className="mx-auto max-w-6xl animate-slide-up">
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-12 top-10 -z-10 h-28 bg-gradient-to-r from-[#e11d48]/14 via-[#db2777]/10 to-[#c026d3]/14 blur-3xl" />
            <Image
              src="/assets/app-showcase.png"
              alt="Movmash app interface showing video player with chat and reactions"
              width={1200}
              height={675}
              className="h-auto w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-6 border-t border-white/[0.08] pt-6 md:grid-cols-3">
          {experienceHighlights.map((item) => (
            <div key={item.title} className="flex items-start gap-4 text-left">
              <div className="flex h-9 w-9 flex-none items-center justify-center text-rose-300">
                <item.icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-parkinsans text-base font-semibold tracking-tight text-white md:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-white/56">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
