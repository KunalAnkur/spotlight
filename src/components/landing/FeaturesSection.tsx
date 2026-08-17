import { Tv, Monitor, MessageCircle, Users, Gamepad2, Zap } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Sync Mode",
    description: "Paste a supported link and everyone watches the exact same moment together.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Monitor,
    title: "Stream Mode",
    description: "Share your screen or local files when a simple link is not enough.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat in real time while the video keeps playing in sync for everyone.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Private Rooms",
    description: "Create a private room and invite only the people you want there.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Gamepad2,
    title: "Games in the Room",
    description: "Open a game without leaving the room. Free on every plan, with more being added.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "No Installation",
    description: "Everything runs in the browser, so starting a watch party stays simple.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
            Everything You Need for a{" "}
            <span className="text-gradient">Smooth Watch Party</span>
          </h2>
          <p className="landing-section-copy">
            Synced links, screen sharing, local files and live chat that keeps everyone in the same moment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative flex h-full animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article className="landing-card-surface relative flex w-full flex-col p-6">
                <div className={`landing-icon-block mb-4 bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="h-[21px] w-[21px] text-white" />
                </div>

                <h3 className="mb-2 font-parkinsans text-xl font-semibold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-white/68">
                  {feature.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
