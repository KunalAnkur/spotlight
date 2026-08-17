import { ArrowRight } from "lucide-react";
import GameCard from "@/components/games/GameCard";
import { GAMES, PLAY_URL } from "@/components/games/games-content";

const sectionEmojis = [
  {
    emoji: "🎮",
    className: "-left-10 top-16",
    animationClass: "animate-float-gentle",
    delay: "0.16s",
    sizeClass: "text-[1.7rem]",
  },
  {
    emoji: "🧩",
    className: "right-[2%] top-7",
    animationClass: "animate-float-subtle",
    delay: "0.34s",
    sizeClass: "text-[1.5rem]",
  },
  {
    emoji: "🕹️",
    className: "left-[3%] bottom-[14%]",
    animationClass: "animate-float",
    delay: "0.52s",
    sizeClass: "text-[1.55rem]",
  },
  {
    emoji: "✨",
    className: "-right-[34px] bottom-[24%]",
    animationClass: "animate-float-gentle",
    delay: "0.68s",
    sizeClass: "text-[1.4rem]",
  },
];

const GamesSection = () => {
  return (
    <section id="games" className="landing-section">
      {/* Anchored to the section, not the 1152px shell — these live in the outer gutters, and
          against the shell they drift inward and land on top of the cards. */}
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
        <div className="landing-section-heading">
          <p className="landing-kicker">Games</p>
          <h2 className="landing-section-title">
            Online games to play with{" "}
            <span className="text-gradient">friends in the room</span>
          </h2>
        </div>

        <div className="relative z-[3] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => (
            <GameCard key={game.slug} game={game} blurb={game.blurb} />
          ))}
        </div>

        {/* "And more" is a text link, not a card: the row already has three cards and a
            fourth full-width panel was more furniture than the sentence needs. It goes to the
            arcade in the app, same as the cards — the full list of games lives there. */}
        <div className="text-center">
          <a
            href={PLAY_URL}
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 font-parkinsans text-sm font-medium text-white/68 transition-colors hover:text-white"
          >
            And more
            <ArrowRight className="h-[15px] w-[15px] transition-transform [transition-duration:250ms] group-hover:translate-x-[3px]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
