import Image from "next/image";

const ShowcaseSection = () => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background glow - more subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
      </div>

      {/* Floating emojis in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-[15%] left-[8%] text-3xl md:text-4xl animate-float opacity-40">🎬</span>
        <span className="absolute top-[25%] right-[12%] text-2xl md:text-3xl animate-float-delayed opacity-30">💬</span>
        <span className="absolute bottom-[20%] left-[10%] text-3xl md:text-4xl animate-float opacity-35" style={{ animationDelay: '1s' }}>🎉</span>
        <span className="absolute bottom-[30%] right-[8%] text-2xl md:text-3xl animate-float-delayed opacity-30" style={{ animationDelay: '1.5s' }}>❤️</span>
        <span className="absolute top-[40%] left-[5%] text-2xl md:text-3xl animate-float opacity-25" style={{ animationDelay: '2s' }}>⭐</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3 md:mb-4 text-white">
            See It In{" "}
            <span className="text-gradient">Action</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            A beautiful interface designed for watching together. Video, chat, and reactions — all in perfect harmony.
          </p>
        </div>

        {/* App Showcase Image - smaller and more refined */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Subtle glow effect behind image */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-[#e11d48]/10 via-[#db2777]/10 to-[#c026d3]/10 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl" />
            
            {/* Image container with modern frame */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl group-hover:border-white/20 transition-all duration-500">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#e11d48]/0 via-[#db2777]/0 to-[#c026d3]/0 group-hover:from-[#e11d48]/10 group-hover:via-[#db2777]/10 group-hover:to-[#c026d3]/10 transition-all duration-500 pointer-events-none" />
              
              <Image
                src="/assets/app-showcase.png"
                alt="Movmash app interface showing video player with chat and reactions"
                width={1200}
                height={675}
                className="w-full h-auto relative z-10"
              />
              
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/30 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Modern feature callouts with better positioning */}
            <div className="absolute -left-3 md:-left-6 top-[20%] hidden lg:block animate-slide-in-left z-30">
              <div className="glass glass-hover px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg backdrop-blur-xl group/callout">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">🎬</span>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover/callout:text-gradient transition-colors">
                    Synced Playback
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-3 md:-right-6 top-[30%] hidden lg:block animate-slide-in-right z-30" style={{ animationDelay: '0.1s' }}>
              <div className="glass glass-hover px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg backdrop-blur-xl group/callout">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">💬</span>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover/callout:text-gradient transition-colors">
                    Live Chat
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-3 md:-right-6 bottom-[35%] hidden lg:block animate-slide-in-right z-30" style={{ animationDelay: '0.2s' }}>
              <div className="glass glass-hover px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg backdrop-blur-xl group/callout">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">🎉</span>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover/callout:text-gradient transition-colors">
                    Flying Reactions
                  </span>
                </div>
              </div>
            </div>

            {/* Additional floating feature badge */}
            <div className="absolute -left-3 md:-left-6 bottom-[25%] hidden xl:block animate-slide-in-left z-30" style={{ animationDelay: '0.3s' }}>
              <div className="glass glass-hover px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg backdrop-blur-xl group/callout">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">⚡</span>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover/callout:text-gradient transition-colors">
                    Real-time Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;

