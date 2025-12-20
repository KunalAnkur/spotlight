import { Youtube, Monitor, Film, Twitch, Tv, Video, Globe } from "lucide-react";

const platforms = [
  { 
    name: "YouTube", 
    icon: Youtube, 
    gradient: "from-red-500 via-red-600 to-red-700",
    bgGradient: "from-red-600/30 via-red-600/25 to-red-700/30",
  },
  { 
    name: "Vimeo", 
    icon: Film, 
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    bgGradient: "from-blue-600/30 via-blue-600/25 to-blue-700/30",
  },
  { 
    name: "Twitch", 
    icon: Twitch, 
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    bgGradient: "from-purple-600/30 via-purple-600/25 to-purple-700/30",
  },
  { 
    name: "Screen Share", 
    icon: Monitor, 
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
  },
  { 
    name: "Local Files", 
    icon: Tv, 
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    bgGradient: "from-pink-600/30 via-fuchsia-600/25 to-purple-600/30",
  },
  { 
    name: "HLS Streams", 
    icon: Video, 
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgGradient: "from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30",
  },
  { 
    name: "Direct URLs", 
    icon: Globe, 
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
  },
];

const PlatformsSection = () => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background glow - matching costume app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3 md:mb-4 text-white">
            Works With{" "}
            <span className="text-gradient">Everything</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            From streaming platforms to your personal collection, watch anything together seamlessly.
          </p>
        </div>

        {/* Platforms Grid - Modern card design */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Glow effect on hover - matching costume app pattern */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${platform.gradient} rounded-xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-300`}></div>
                
                {/* Platform Card - glass morphism with platform-specific gradient */}
                <div 
                  className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-xl p-4 md:p-5 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1.5 flex flex-col items-center justify-center aspect-square cursor-pointer animate-float-gentle"
                  style={{ animationDelay: `${0.8 + index * 0.15}s` }}
                >
                  {/* Icon Container with gradient background */}
                  <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${platform.gradient} p-[1px] mb-3`}>
                    <div className="w-full h-full rounded-lg bg-[#18181b] flex items-center justify-center relative z-10">
                      <platform.icon className="w-8 h-8 md:w-9 md:h-9 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" strokeWidth={2.5} fill="none" />
                    </div>
                    {/* Icon glow - always visible for better contrast */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${platform.gradient} opacity-15 blur-sm`}></div>
                    {/* Icon glow on hover */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300`}></div>
                    {/* Subtle pulse animation on icon */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${platform.gradient} opacity-10 animate-pulse-icon`} style={{ animationDelay: `${index * 0.3}s` }}></div>
                  </div>
                  
                  {/* Platform Name */}
                  <h3 className="text-xs md:text-sm font-bold font-display text-white text-center  transition-colors leading-tight">
                    {platform.name}
                  </h3>
                  
                  {/* Subtle gradient shimmer effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${platform.gradient.includes('red') ? 'rgba(239, 68, 68, 0.15)' : platform.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.15)' : platform.gradient.includes('purple') && !platform.gradient.includes('fuchsia') ? 'rgba(168, 85, 247, 0.15)' : 'rgba(236, 72, 153, 0.15)'} 50%, transparent 100%)`,
                      backgroundSize: '200% 100%',
                      animation: `shimmer 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
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

