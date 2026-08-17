import { ArrowRight, Play } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoVideoPreview from "@/components/landing/DemoVideoPreview";
import GameCard from "@/components/games/GameCard";
import { GAMES, PLAY_URL } from "@/components/games/games-content";
import { Button } from "@/components/ui/button";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import { gamesPageKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata, toAbsoluteUrl } from "@/lib/metadata";

// No "| Movmash" suffix: the root layout's title template already appends it on child routes.
const title = "Online Games to Play with Friends | Free, No Download";
const description =
  "Free online games you can play with friends in one link — Tic-Tac-Toe, Connect 4 and a co-op jigsaw puzzle. In the browser, no download, no sign-up for guests.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/games",
  keywords: gamesPageKeywords,
});

const heroEmojis = [
  { emoji: "🎮", className: "-left-12 top-9", animationClass: "animate-float-gentle", delay: "0.12s", sizeClass: "text-[1.85rem]" },
  { emoji: "🧩", className: "-right-12 top-7", animationClass: "animate-float", delay: "0.28s", sizeClass: "text-[1.8rem]" },
  { emoji: "🕹️", className: "-left-14 top-[52%]", animationClass: "animate-float-subtle", delay: "0.44s", sizeClass: "text-[1.5rem]" },
  { emoji: "🎲", className: "-right-14 top-[48%]", animationClass: "animate-float-gentle", delay: "0.58s", sizeClass: "text-[1.5rem]" },
  { emoji: "✨", className: "left-[60px] -top-7", animationClass: "animate-float", delay: "0.38s", sizeClass: "text-[1.7rem]" },
  { emoji: "🎉", className: "right-[60px] -bottom-7", animationClass: "animate-float-subtle", delay: "0.66s", sizeClass: "text-[1.65rem]" },
];

export default function GamesPage() {
  return (
    <>
      <WebPageSchema title={title} description={description} url={toAbsoluteUrl("/games")} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Games", url: toAbsoluteUrl("/games") },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Online games to play with friends on Movmash",
            numberOfItems: GAMES.length,
            itemListElement: GAMES.map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Game",
                name: game.name,
                url: `${toAbsoluteUrl("/games")}#${game.slug}`,
                description: game.blurb,
                gamePlatform: "Web browser",
                playMode: game.mode === "Co-op" ? "CoOp" : "MultiPlayer",
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative overflow-visible pb-[60px] pt-[104px] text-center">
            <div className="landing-shell relative z-10">
              <p className="landing-kicker">Games · Free · No download</p>

              <h1 className="animate-slide-up font-parkinsans font-semibold leading-[1.08] tracking-[-0.03em] text-white [font-size:clamp(2rem,4.6vw,2.9rem)]">
                Online games to play with friends,
                <br />
                <span className="text-gradient">in one link.</span>
              </h1>

              <p className="mx-auto mt-4 max-w-[600px] animate-slide-up text-base leading-[1.75] text-white/68">
                Games that run inside a Movmash room. Send the link, your friend opens it in
                any browser, and you play. No app, no sign-up for guests, no cost.
              </p>

              {/* One CTA, straight into the arcade. "Back to Movmash" was a second button
                  competing with it, and the navbar logo already goes home. */}
              <div className="mt-7 flex animate-slide-up items-center justify-center stagger-3">
                <Button variant="hero" asChild className="font-parkinsans">
                  <a href={PLAY_URL} rel="noopener noreferrer">
                    <Play className="fill-current" strokeWidth={0} />
                    Open a room and play
                  </a>
                </Button>
              </div>

              <div className="relative mx-auto mt-11 max-w-[900px]">
                <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
                  {heroEmojis.map((item) => (
                    <div
                      key={item.emoji}
                      aria-hidden="true"
                      className={`absolute leading-none opacity-80 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] ${item.sizeClass} ${item.className} ${item.animationClass}`}
                      style={{ animationDelay: item.delay }}
                    >
                      <span>{item.emoji}</span>
                    </div>
                  ))}
                </div>
                <DemoVideoPreview />
                <p className="mt-3.5 text-center text-[13px] text-white/46">
                  Placeholder — the games video replaces this one.
                </p>
              </div>
            </div>
          </section>

          <section className="landing-section pt-6">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                {/* "more on the way" is the live part of the sentence, so it carries the link
                    into the arcade rather than sitting there as decoration. */}
                <h2 className="landing-section-title">
                  Three games live now,{" "}
                  <a
                    href={PLAY_URL}
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 transition-opacity hover:opacity-80"
                  >
                    <span className="text-gradient underline-offset-[6px] group-hover:underline">
                      more on the way
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-[0.7em] w-[0.7em] shrink-0 self-center text-rose-400 transition-transform [transition-duration:250ms] group-hover:translate-x-[3px]"
                    />
                  </a>
                </h2>
                <p className="landing-section-copy">
                  Every one of them is free, browser-based, and opens inside the room you are
                  already in.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {GAMES.map((game) => (
                  <GameCard key={game.slug} game={game} blurb={game.shortBlurb} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
