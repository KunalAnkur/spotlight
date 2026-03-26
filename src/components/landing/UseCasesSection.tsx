import { BookOpen, Gamepad2, GraduationCap, Heart, House, Users } from "lucide-react";

const useCases = [
  {
    number: "01",
    icon: Heart,
    title: "Date nights",
    description: "Stay in sync and react to every scene together.",
    iconClass: "from-rose-500 via-pink-500 to-fuchsia-500",
    numberClass: "text-rose-300/80",
    lineClass: "from-rose-400/55 via-pink-400/20 to-transparent",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Study groups",
    description: "Review lectures and explain clips side by side.",
    iconClass: "from-pink-500 via-fuchsia-500 to-rose-500",
    numberClass: "text-pink-300/80",
    lineClass: "from-pink-400/55 via-fuchsia-400/22 to-transparent",
  },
  {
    number: "03",
    icon: Users,
    title: "Friend hangs",
    description: "Start a room fast for premieres, rewatches, or casual nights in.",
    iconClass: "from-fuchsia-500 via-pink-500 to-rose-500",
    numberClass: "text-fuchsia-300/80",
    lineClass: "from-fuchsia-400/55 via-pink-400/22 to-transparent",
  },
  {
    number: "04",
    icon: House,
    title: "Family time",
    description: "Share cartoons, clips, and movie nights across homes.",
    iconClass: "from-rose-500 via-fuchsia-500 to-pink-500",
    numberClass: "text-rose-200/80",
    lineClass: "from-rose-300/50 via-fuchsia-400/20 to-transparent",
  },
  {
    number: "05",
    icon: BookOpen,
    title: "Club sessions",
    description: "Pause for discussion without losing the moment.",
    iconClass: "from-pink-500 via-rose-500 to-fuchsia-500",
    numberClass: "text-pink-200/80",
    lineClass: "from-pink-300/50 via-rose-400/20 to-transparent",
  },
  {
    number: "06",
    icon: Gamepad2,
    title: "Communities",
    description: "Watch reveals, events, and walkthroughs in one room.",
    iconClass: "from-fuchsia-500 via-rose-500 to-pink-500",
    numberClass: "text-fuchsia-200/80",
    lineClass: "from-fuchsia-300/50 via-rose-400/18 to-transparent",
  },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="mx-auto flex w-full justify-center">
          <div className="max-w-3xl text-center">
            <p className="mb-4 font-parkinsans text-xs font-semibold uppercase tracking-[0.28em] text-rose-400/80">
              Use Cases
            </p>
            <h2 className="landing-section-title mb-4">
              More than just{" "}
              <span className="text-gradient">movie night</span>
            </h2>
            <p className="landing-section-copy max-w-2xl">
              Built for private nights in, study sessions, club discussions, and shared community moments.
            </p>
          </div>
        </div>

        <div className="mt-14 flex w-full flex-wrap justify-between gap-y-10 md:mt-16">
          <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-40 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.12),transparent_65%)] blur-3xl" />

          {useCases.map((useCase) => (
            <article
              key={useCase.title}
              className="flex basis-full flex-col gap-4 md:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.iconClass} text-white shadow-[0_14px_30px_rgba(244,63,94,0.16)]`}
                >
                  <useCase.icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`font-parkinsans text-[11px] font-semibold uppercase tracking-[0.24em] ${useCase.numberClass}`}
                    >
                      {useCase.number}
                    </span>
                    <span className={`h-px flex-1 bg-gradient-to-r ${useCase.lineClass}`} />
                  </div>
                  <h3 className="font-parkinsans text-xl font-semibold tracking-tight text-white md:text-[1.35rem]">
                    {useCase.title}
                  </h3>
                </div>
              </div>

              <p className="pl-16 text-sm leading-7 text-white/68 md:text-[15px]">
                {useCase.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
