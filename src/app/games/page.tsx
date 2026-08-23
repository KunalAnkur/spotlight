import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoVideoPreview from "@/components/landing/DemoVideoPreview";
import GameCard from "@/components/games/GameCard";
import { GAMES, PLAY_URL } from "@/components/games/games-content";
import { Button } from "@/components/ui/button";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
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


const overview = [
  "Playing a game with someone in another city is rarely blocked by the game itself — it is blocked by everything around it. One of you has an account, the other does not. The app is on the wrong platform. There is a download, then an update, then a login, and by the time everyone is finally in, the twenty minutes you actually had together is gone.",
  "That overhead is why so many long-distance game nights quietly stop happening. The games on Movmash are built the other way round: they run inside the room you are already in, in the browser, on the same link you were using to watch something. Nobody installs anything and guests do not make an account.",
  "That also means you are not choosing between watching and playing. The room does both. Put something on, play a round of Connect 4 while the next episode loads, go back to the film — same tab, same people, nothing closed or reopened in between.",
  "All three games are on the free plan. Paid plans raise room size, watch time, video calls and screen-share quality; they do not gate the games or add extra ones.",
];

const startSteps = [
  {
    title: "Open a room",
    description:
      "Sign in with Google and start a room. You do not need to decide between watching and playing — the games live in the same room either way.",
  },
  {
    title: "Send the link",
    description:
      "Share it however you normally talk. Whoever opens it joins in the browser with no account and no install, on a phone or a computer.",
  },
  {
    title: "Pick a game",
    description:
      "Open the arcade inside the room and choose. Head-to-head games start as soon as the second player is in; the jigsaw takes as many as eight.",
  },
];

const gameFaqs = [
  {
    question: "Are the games free?",
    answer:
      "Yes, all three are on the free plan, with no trial and no per-game charge. Paid plans add room size, watch time, video calls and screen-share quality — they do not unlock games or add extra ones.",
  },
  {
    question: "Do my friends need an account to play?",
    answer:
      "No. Guests join from the browser with the room link and start playing straight away. Only the person creating the room signs in, with Google, so the room stays tied to them.",
  },
  {
    question: "Do we need to download anything?",
    answer:
      "No. Every game runs in the browser on desktop and mobile. There is nothing to install, nothing to update, and nothing that only works on one platform.",
  },
  {
    question: "How many people can play at once?",
    answer:
      "Tic-Tac-Toe and Connect 4 are two-player, turn-based games. The jigsaw is co-op and takes up to eight people working the same board at the same time.",
  },
  {
    question: "Can we watch something and play in the same room?",
    answer:
      "Yes, and that is the point of putting them in the room rather than on a separate site. Play between episodes or while people are still arriving, then go back to the video without closing anything.",
  },
  {
    question: "Can we play on a phone?",
    answer:
      "Yes. The games work in a mobile browser with the same room link, so it does not matter if one person is on a laptop and the other is on a phone.",
  },
  {
    question: "What games are you adding next?",
    answer:
      "More are in progress. The three here are the ones that are live and stable today — we would rather list what actually works than a roadmap you cannot play yet.",
  },
];

export default function GamesPage() {
  return (
    <>
      <WebPageSchema title={title} description={description} url={toAbsoluteUrl("/games")} />
      <FAQPageSchema faqs={gameFaqs} />
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
                {/* <p className="mt-3.5 text-center text-[13px] text-white/46">
                  Placeholder — the games video replaces this one.
                </p> */}
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

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="mx-auto max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                  Why in the room
                </p>
                <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                  What playing games together online actually needs.
                </h2>
                <div className="mt-5 space-y-4">
                  {overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 44)} className="text-sm leading-8 text-white/62 md:text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                <h2 className="landing-section-title">A closer look at each one</h2>
                <p className="landing-section-copy">
                  What each game is actually like to play, and one thing worth knowing before
                  you start.
                </p>
              </div>

              <div className="space-y-4">
                {GAMES.map((game) => (
                  <article
                    key={game.slug}
                    id={game.slug}
                    className="scroll-mt-24 rounded-[1.5rem] bg-white/[0.022] px-5 py-6 md:px-7"
                    style={{ ["--acc" as string]: game.accent }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="game-glyph">{game.glyph}</span>
                      <h3 className="font-parkinsans text-[1.15rem] font-semibold tracking-tight text-white md:text-[1.3rem]">
                        {game.name}
                      </h3>
                      <span className="text-[12.5px] text-white/44">
                        <b className="font-semibold" style={{ color: game.accent }}>
                          {game.players}
                        </b>
                        {" · "}
                        {game.mode}
                        {" · Free"}
                      </span>
                    </div>

                    <p className="mt-3.5 max-w-3xl text-sm leading-7 text-white/62">
                      {game.detail}
                    </p>

                    <p className="mt-3 max-w-3xl border-l-2 border-white/10 pl-4 text-sm leading-7 text-white/56">
                      <b className="font-semibold text-white/74">Worth knowing:</b> {game.tip}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <a
                        href={PLAY_URL}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/74 transition-colors hover:text-white"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                        Play {game.name}
                      </a>
                      <Link
                        href={game.guideHref}
                        className="inline-flex items-center gap-2 text-sm text-white/56 transition-colors hover:text-white/80"
                      >
                        Read the full guide
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-white/52">
                Want the broader version?{" "}
                <Link href="/blog/how-to-play-games-together-online" className="text-white/72 underline-offset-4 hover:underline">
                  How to play games together online
                </Link>{" "}
                covers the setup end to end, and{" "}
                <Link href="/watch-together" className="text-white/72 underline-offset-4 hover:underline">
                  watching together online
                </Link>{" "}
                covers the video side of the same room.
              </p>
            </div>
          </section>

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                <h2 className="landing-section-title">Starting a game takes about a minute</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {startSteps.map((step, index) => (
                  <article key={step.title} className="rounded-[1.5rem] bg-white/[0.022] px-5 py-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-3 font-parkinsans text-base font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-white/60">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                <h2 className="landing-section-title">Questions about playing together</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {gameFaqs.map((faq) => (
                  <article key={faq.question} className="rounded-[1.4rem] bg-white/[0.022] px-5 py-5">
                    <h3 className="font-parkinsans text-[0.98rem] font-semibold tracking-tight text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-white/60">{faq.answer}</p>
                  </article>
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
