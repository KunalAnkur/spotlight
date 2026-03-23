import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="landing-section flex min-h-screen items-center">
      <div className="landing-shell relative z-10 pb-16 pt-28 text-center sm:pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#db2777] to-[#c026d3]" />
            <span className="font-parkinsans text-sm font-medium text-white/72">
              Sync links, share screens, and watch together
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 animate-slide-up font-parkinsans text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Watch together
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">without the setup headache</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-3xl animate-slide-up text-lg leading-8 text-white/68 md:text-[22px] md:leading-10">
            Create a room, paste a link, or share your screen. Movmash keeps video, chat, and reactions in sync so everyone stays in the same moment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-3">
            <Button variant="hero" size="xl" asChild className="font-parkinsans">
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5" />
                Start Watching
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild className="font-parkinsans">
              <a href="#how-it-works">
                See How It Works
              </a>
            </Button>
          </div>

          <div className="landing-meta-line mx-auto max-w-2xl">
            <span>Free to start</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>No downloads</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>Works anywhere</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
