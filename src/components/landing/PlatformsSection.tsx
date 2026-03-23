import { Youtube, Monitor, Film, Twitch, Tv, Video, Globe } from "lucide-react";

const platforms = [
  { 
    name: "YouTube", 
    icon: Youtube, 
    gradient: "from-red-500 via-red-600 to-red-700",
  },
  { 
    name: "Vimeo", 
    icon: Film, 
    gradient: "from-blue-400 via-blue-500 to-blue-600",
  },
  { 
    name: "Twitch", 
    icon: Twitch, 
    gradient: "from-purple-500 via-purple-600 to-purple-700",
  },
  { 
    name: "Screen Share", 
    icon: Monitor, 
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  { 
    name: "Local Files", 
    icon: Tv, 
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  { 
    name: "HLS Streams", 
    icon: Video, 
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  { 
    name: "Direct URLs", 
    icon: Globe, 
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
];

const PlatformsSection = () => {
  return (
    <section className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title mb-3 md:mb-4">
            Works With{" "}
            <span className="text-gradient">Everything</span>
          </h2>
          <p className="landing-section-copy">
            From streaming platforms to your personal collection, watch anything together seamlessly.
          </p>
        </div>

        {/* Platforms Grid - Modern card design */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div 
                  className={`landing-platform-tile flex-col gap-3 bg-gradient-to-br ${platform.gradient}`}
                >
                  <div className="landing-platform-tile-overlay" />
                  <platform.icon className="landing-platform-icon h-8 w-8 opacity-95 md:h-9 md:w-9" strokeWidth={2.5} fill="none" />
                  
                  {/* Platform Name */}
                  <h3 className="landing-platform-label max-w-[84px] md:max-w-[96px]">
                    {platform.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-10 ">
          <p className="text-sm md:text-base text-white/50">
            Plus Dailymotion, and any direct video URL you can think of
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
