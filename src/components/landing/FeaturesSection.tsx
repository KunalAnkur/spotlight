import { Tv, Monitor, MessageCircle, Users, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Sync Mode",
    description: "Watch YouTube, Vimeo, Twitch and more together. Perfect sync means everyone sees the same frame at the exact same time.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
    emoji: "🎬",
  },
  {
    icon: Monitor,
    title: "Stream Mode",
    description: "Share your screen or upload local files. Perfect for Netflix, Disney+, or your personal video collection.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    bgGradient: "from-pink-600/30 via-fuchsia-600/25 to-purple-600/30",
    emoji: "📺",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Real-time messaging with typing indicators. Express yourself with emojis and stay connected with friends.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgGradient: "from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30",
    emoji: "💬",
  },
  {
    icon: Users,
    title: "Private Rooms",
    description: "Create private rooms and invite only who you want. Your movie night, your rules. Full control over your space.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
    emoji: "🔒",
  },
  {
    icon: Shield,
    title: "No Installation",
    description: "Works in your browser. No downloads, no plugins, no hassle. Just click and start watching together instantly.",
    gradient: "from-pink-500 via-rose-500 to-pink-500",
    bgGradient: "from-pink-600/30 via-rose-600/25 to-pink-600/30",
    emoji: "⚡",
  },
  {
    icon: Zap,
    title: "Animated Reactions",
    description: "Send emoji reactions that fly across the screen. Express joy, surprise, or love in real-time with your friends.",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    bgGradient: "from-fuchsia-600/30 via-pink-600/25 to-rose-600/30",
    emoji: "🎉",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background glow - matching costume app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 ">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3 md:mb-4 text-white">
            Everything You Need to{" "}
            <span className="text-gradient">Watch Together</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Two powerful modes, endless possibilities. Whether you&apos;re syncing YouTube or streaming Netflix, we&apos;ve got you covered.
          </p>
        </div>

        {/* Features Grid - Modern glass morphism design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative animate-slide-up h-full flex"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover - matching costume app pattern */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Card - glass morphism matching costume app with floating effect */}
              <div className="relative w-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-7 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col">
                {/* Icon Container - modern gradient border */}
                <div className="mb-4">
                  <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    {/* Icon glow on hover */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}></div>
                  </div>
                </div>

                {/* Content - flex-grow to fill space */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

