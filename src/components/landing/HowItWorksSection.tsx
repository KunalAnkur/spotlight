import { Link, Play, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Create or Join",
    description: "Start a new watch party by pasting a video link, or join an existing room with a shared link. It's that simple.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
  },
  {
    number: "02",
    icon: Share2,
    title: "Invite Friends",
    description: "Share your unique room link with friends. They can join instantly — no account required to watch together.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    bgGradient: "from-pink-600/30 via-fuchsia-600/25 to-purple-600/30",
  },
  {
    number: "03",
    icon: Play,
    title: "Watch Together",
    description: "Hit play and enjoy perfectly synced playback. Chat, react, and experience it together in real-time.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgGradient: "from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="landing-section scroll-mt-28 md:scroll-mt-32">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title mb-3 md:mb-4">
            Start in{" "}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="landing-section-copy">
            No complicated setup. No downloads. Just share and watch.
          </p>
        </div>

        {/* Steps - Modern card-based design */}
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative animate-slide-up"
                style={{ 
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div
                  className="landing-card-surface relative flex h-full flex-col p-6 md:p-8"
                  style={{
                    animationDelay: `${0.8 + index * 0.15}s`
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`landing-icon-block-lg bg-gradient-to-br ${step.gradient}`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className={`font-parkinsans text-3xl font-semibold tracking-tight bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-70 md:text-4xl`}>
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-grow space-y-3">
                    <div className="text-xs md:text-sm font-medium text-white/48 uppercase tracking-[0.18em]">
                      Step {step.number}
                    </div>
                    <h3 className="font-parkinsans text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/62 md:text-base">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
