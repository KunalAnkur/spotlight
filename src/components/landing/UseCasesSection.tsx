import Link from "next/link";
import { BookOpen, Gamepad2, GraduationCap, Heart, House, Users } from "lucide-react";

const sectionEmojis = [
  {
    emoji: "🫶",
    className: "-left-9 top-24",
    animationClass: "animate-float-gentle",
    delay: "0.18s",
    sizeClass: "text-[1.7rem]",
  },
  {
    emoji: "✨",
    className: "right-[8%] top-10",
    animationClass: "animate-float-subtle",
    delay: "0.34s",
    sizeClass: "text-[1.45rem]",
  },
];

const useCases = [
  {
    number: "01",
    icon: Heart,
    title: "Date nights",
    description: "Stay in sync and react to every scene together.",
    accent: "#fda4af",
    iconClass: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Study groups",
    description: "Review lectures and explain clips side by side.",
    accent: "#f9a8d4",
    iconClass: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    number: "03",
    icon: Users,
    title: "Friend hangs",
    description: "Start a room fast for premieres, rewatches, or casual nights in.",
    accent: "#f0abfc",
    iconClass: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    // The games one. Same shape as its five neighbours, no special treatment.
    number: "04",
    icon: Gamepad2,
    title: "Game breaks",
    description: "Open Tic-Tac-Toe, Connect 4 or a shared jigsaw without leaving the room.",
    accent: "#c4b5fd",
    iconClass: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    number: "05",
    icon: House,
    title: "Family time",
    description: "Share cartoons, clips, and movie nights across homes.",
    accent: "#fecdd3",
    iconClass: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    number: "06",
    icon: BookOpen,
    title: "Club sessions",
    description: "Pause for discussion without losing the moment.",
    accent: "#f5d0fe",
    iconClass: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const pills = [
  { label: "Watch together online", href: "/watch-together", dot: "rgba(253,164,175,0.8)" },
  { label: "Long-distance date night", href: "/long-distance-date-night", dot: "rgba(240,171,252,0.8)" },
  { label: "Online games with friends", href: "/games", dot: "rgba(196,181,253,0.85)" },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="landing-section">
      {/* Anchored to the section, not the 1152px shell — see GamesSection. */}
      <div className="pointer-events-none absolute inset-0 z-[2] hidden xl:block">
        {sectionEmojis.map((item) => (
          <div
            key={`${item.emoji}-${item.className}`}
            aria-hidden="true"
            className={`absolute leading-none opacity-80 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] ${item.sizeClass} ${item.className} ${item.animationClass}`}
            style={{ animationDelay: item.delay }}
          >
            <span>{item.emoji}</span>
          </div>
        ))}
      </div>

      <div className="landing-shell relative z-10">
        <div className="landing-section-heading mb-0">
          <p className="landing-kicker">Use Cases</p>
          <h2 className="landing-section-title">
            More than just <span className="text-gradient">movie night</span>
          </h2>
          <p className="landing-section-copy">
            Built for private nights in, study sessions, game breaks, club discussions and
            shared community moments.
          </p>

          <div className="mt-[22px] flex flex-wrap items-center justify-center gap-3 text-[13.5px] text-white/56">
            {pills.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="inline-flex items-center gap-[9px] rounded-full bg-white/[0.035] px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: pill.dot }}
                />
                {pill.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-[52px] flex w-full flex-wrap justify-between gap-y-9">
          {useCases.map((useCase) => (
            <article
              key={useCase.title}
              className="flex basis-full flex-col gap-3.5 md:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]"
              style={{ ["--acc" as string]: useCase.accent }}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`landing-icon-block bg-gradient-to-br ${useCase.iconClass}`}
                >
                  <useCase.icon className="h-[21px] w-[21px]" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="font-parkinsans text-[11px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: useCase.accent }}
                    >
                      {useCase.number}
                    </span>
                    <span className="h-px flex-1 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--acc)_55%,transparent),transparent)]" />
                  </div>
                  <h3 className="font-parkinsans text-[19px] font-semibold tracking-tight text-white">
                    {useCase.title}
                  </h3>
                </div>
              </div>

              <p className="pl-[60px] text-sm leading-[1.75] text-white/68">
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
