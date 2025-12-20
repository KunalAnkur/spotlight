import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#18181b]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image 
          src="/assets/hero-bg.jpg" 
          alt="Watch party background" 
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18181b]/80 via-[#18181b]/60 to-[#18181b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.12)_0%,_transparent_70%)]" />
      </div>

      {/* Floating Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-1/4 left-[10%] text-4xl animate-float opacity-60">🎬</span>
        <span className="absolute top-1/3 right-[15%] text-3xl animate-float-delayed opacity-50">🍿</span>
        <span className="absolute bottom-1/3 left-[20%] text-5xl animate-float opacity-40">😍</span>
        <span className="absolute top-1/2 right-[10%] text-4xl animate-float-delayed opacity-50">🎉</span>
        <span className="absolute bottom-1/4 right-[25%] text-3xl animate-float opacity-60">❤️</span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#db2777] to-[#c026d3]" />
            <span className="text-sm font-medium text-white/70">Watch together, anywhere</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 animate-slide-up stagger-1 text-white">
            Movie Night,{" "}
            <span className="text-gradient">Reimagined</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto animate-slide-up stagger-2">
            Watch videos together with friends in perfect sync. 
            Chat, react, and share the moment — no matter the distance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-3">
            <Button variant="hero" size="xl" asChild>
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5" />
                Start Watching Free
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#how-it-works">
                See How It Works
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up stagger-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient font-display">10K+</div>
              <div className="text-sm text-white/50">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient font-display">50K+</div>
              <div className="text-sm text-white/50">Watch Parties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient font-display">99.9%</div>
              <div className="text-sm text-white/50">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-gradient-to-b from-[#e11d48] via-[#db2777] to-[#c026d3] animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

