import { Link, Play, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Create or Join",
    description: "Start a new watch party by pasting a video link, or join an existing room with a shared link.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    number: "02",
    icon: Share2,
    title: "Invite Friends",
    description: "Share your unique room link with friends. They can join instantly, with no account required to watch.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    number: "03",
    icon: Play,
    title: "Watch Together",
    description: "Hit play and enjoy perfectly synced playback. Chat, react, and open a game when the video ends.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
            Start in <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="landing-section-copy">
            No complicated setup. No downloads. Just share and watch.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="landing-card-surface flex h-full animate-slide-up flex-col p-[26px]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-[22px] flex items-center justify-between">
                <div className={`landing-icon-block-lg bg-gradient-to-br ${step.gradient}`}>
                  <step.icon className="h-[25px] w-[25px] text-white" />
                </div>

                <div className="bg-gradient-to-br from-[#f43f5e] via-[#ec4899] to-[#d946ef] bg-clip-text font-parkinsans text-[30px] font-semibold leading-none tracking-[-0.03em] text-transparent opacity-70">
                  {step.number}
                </div>
              </div>

              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/48">
                Step {step.number}
              </span>
              <h3 className="mb-2 font-parkinsans text-xl font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-white/68">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
