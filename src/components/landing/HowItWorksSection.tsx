import { Link, Play, Share2, ArrowRight } from "lucide-react";

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
    <section id="how-it-works" className="py-20 md:py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background glow - matching costume app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3 md:mb-4 text-white">
            Start in{" "}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            No complicated setup. No downloads. Just share and watch.
          </p>
        </div>

        {/* Steps - Modern card-based design */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative animate-slide-up"
                style={{ 
                  animationDelay: `${index * 0.15}s`
                }}
              >
                {/* Glow effect on hover - matching costume app pattern */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${step.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Card - glass morphism matching costume app with floating animation */}
                <div 
                  className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col h-full animate-float-subtle"
                  style={{
                    animationDelay: `${0.8 + index * 0.15}s`
                  }}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} p-[1px]`}>
                      <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Icon glow on hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Step Number */}
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow space-y-3">
                    <div className="text-xs md:text-sm font-semibold text-white/50 uppercase tracking-wider">
                      Step {step.number}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow indicator for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile connecting line - alternative design */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${step.gradient}`}></div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 bg-gradient-to-r ${step.gradient} opacity-30`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

