import { Tv, Monitor, MessageCircle, Users, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Sync Mode",
    description: "Paste a supported link and everyone watches the exact same moment together.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
    emoji: "🎬",
  },
  {
    icon: Monitor,
    title: "Stream Mode",
    description: "Share your screen or local files when a simple link is not enough.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    bgGradient: "from-pink-600/30 via-fuchsia-600/25 to-purple-600/30",
    emoji: "📺",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat in real time while the video keeps playing in sync for everyone.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgGradient: "from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30",
    emoji: "💬",
  },
  {
    icon: Users,
    title: "Private Rooms",
    description: "Create a private room and invite only the people you want there.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
    emoji: "🔒",
  },
  {
    icon: Shield,
    title: "No Installation",
    description: "Everything runs in the browser, so starting a watch party stays simple.",
    gradient: "from-pink-500 via-rose-500 to-pink-500",
    bgGradient: "from-pink-600/30 via-rose-600/25 to-pink-600/30",
    emoji: "⚡",
  },
  {
    icon: Zap,
    title: "Animated Reactions",
    description: "React live with emoji moments that make the room feel playful and alive.",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    bgGradient: "from-fuchsia-600/30 via-pink-600/25 to-rose-600/30",
    emoji: "🎉",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title mb-3 md:mb-4">
            Everything You Need for a{" "}
            <span className="text-gradient">Smooth Watch Party</span>
          </h2>
          <p className="landing-section-copy">
            Start a watch party with synced links, screen sharing, local files, and live chat that keeps everyone in the same moment.
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
              <div className="landing-card-surface relative w-full p-6 md:p-7">
                <div className="mb-4">
                  <div className={`landing-icon-block bg-gradient-to-br ${feature.gradient}`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content - flex-grow to fill space */}
                <div className="space-y-2 flex-grow">
                  <h3 className="font-parkinsans text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/62 md:text-base">
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
