import { Fragment, type ReactNode } from "react";
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
import { getGamesPage } from "@/content/games-page";
import { defaultLocale, localizePath } from "@/i18n/config";
import { getTranslations, resolveLocale } from "@/i18n/server";
import { guidesIn } from "@/lib/blog";
import { createPageMetadata, pageUrl } from "@/lib/metadata";

const path = "/games";

/** The guide to all three games at once, linked under the detail rows. */
const overviewGuide = "/blog/how-to-play-games-together-online";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const copy = getGamesPage(locale);

  return createPageMetadata({
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    path,
    // The keyword list is English, so it only belongs on the English page.
    keywords: locale === defaultLocale ? gamesPageKeywords : undefined,
    locale,
  });
}

const heroEmojis = [
  { emoji: "🎮", className: "-left-12 top-9", animationClass: "animate-float-gentle", delay: "0.12s", sizeClass: "text-[1.85rem]" },
  { emoji: "🧩", className: "-right-12 top-7", animationClass: "animate-float", delay: "0.28s", sizeClass: "text-[1.8rem]" },
  { emoji: "🕹️", className: "-left-14 top-[52%]", animationClass: "animate-float-subtle", delay: "0.44s", sizeClass: "text-[1.5rem]" },
  { emoji: "🎲", className: "-right-14 top-[48%]", animationClass: "animate-float-gentle", delay: "0.58s", sizeClass: "text-[1.5rem]" },
  { emoji: "✨", className: "left-[60px] -top-7", animationClass: "animate-float", delay: "0.38s", sizeClass: "text-[1.7rem]" },
  { emoji: "🎉", className: "right-[60px] -bottom-7", animationClass: "animate-float-subtle", delay: "0.66s", sizeClass: "text-[1.65rem]" },
];

/** A sentence with links in it: each {name} is swapped for the link of that name. */
function withLinks(sentence: string, links: Record<string, ReactNode>) {
  return sentence
    .split(/\{(\w+)\}/)
    .map((part, index) => (index % 2 ? <Fragment key={part}>{links[part]}</Fragment> : part));
}

export default async function GamesPage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const copy = getGamesPage(locale);
  const t = getTranslations(locale, "games");
  const stepLabel = getTranslations(locale, "howItWorks")("stepLabel");
  const url = pageUrl(path, locale);

  // A guide is linked only where it is published in this language (see guidesIn).
  const guideHrefs = new Map(
    (
      await guidesIn(locale, [
        ...GAMES.map((game) => ({ key: game.slug as string, href: game.guideHref })),
        { key: overviewGuide, href: overviewGuide },
      ])
    ).map((guide) => [guide.key, guide.href]),
  );
  const overviewHref = guideHrefs.get(overviewGuide);

  // Names and card copy are the home page's; the rest is what this page says about each game.
  const games = GAMES.map((game) => ({
    ...game,
    ...copy.games[game.slug],
    name: t(game.i18nKey),
    blurb: t(`${game.i18nKey}Copy`),
    players: t(game.players === "Up to 8" ? "playersUpTo8" : "players2"),
    mode: t(game.mode === "Co-op" ? "coop" : "turnBased"),
    coop: game.mode === "Co-op",
    guide: guideHrefs.get(game.slug),
  }));

  const inlineLink = "text-white/72 underline-offset-4 hover:underline";

  return (
    <>
      <WebPageSchema
        title={copy.metadataTitle}
        description={copy.metadataDescription}
        url={url}
        inLanguage={locale}
      />
      <FAQPageSchema faqs={copy.faqs} />
      <BreadcrumbSchema
        items={[
          { name: copy.breadcrumbHome, url: pageUrl("/", locale) },
          { name: copy.breadcrumbName, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: copy.listName,
            numberOfItems: games.length,
            itemListElement: games.map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Game",
                name: game.name,
                url: `${url}#${game.slug}`,
                description: game.blurb,
                gamePlatform: "Web browser",
                playMode: game.coop ? "CoOp" : "MultiPlayer",
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
              <p className="landing-kicker">{copy.kicker}</p>

              <h1 className="animate-slide-up font-parkinsans font-semibold leading-[1.08] tracking-[-0.03em] text-white [font-size:clamp(2rem,4.6vw,2.9rem)]">
                {copy.title}
                <br />
                <span className="text-gradient">{copy.titleAccent}</span>
              </h1>

              <p className="mx-auto mt-4 max-w-[600px] animate-slide-up text-base leading-[1.75] text-white/68">
                {copy.intro}
              </p>

              {/* One CTA, straight into the arcade. "Back to Movmash" was a second button
                  competing with it, and the navbar logo already goes home. */}
              <div className="mt-7 flex animate-slide-up items-center justify-center stagger-3">
                <Button variant="hero" asChild className="font-parkinsans">
                  <a href={PLAY_URL} rel="noopener noreferrer">
                    <Play className="fill-current" strokeWidth={0} />
                    {copy.cta}
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
                <DemoVideoPreview label={copy.videoLabel} />
              </div>
            </div>
          </section>

          <section className="landing-section pt-6">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                {/* "more on the way" is the live part of the sentence, so it carries the link
                    into the arcade rather than sitting there as decoration. */}
                <h2 className="landing-section-title">
                  {copy.liveTitle}{" "}
                  <a
                    href={PLAY_URL}
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 transition-opacity hover:opacity-80"
                  >
                    <span className="text-gradient underline-offset-[6px] group-hover:underline">
                      {copy.liveTitleLink}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-[0.7em] w-[0.7em] shrink-0 self-center text-rose-400 transition-transform [transition-duration:250ms] group-hover:translate-x-[3px] rtl:rotate-180 rtl:group-hover:-translate-x-[3px]"
                    />
                  </a>
                </h2>
                <p className="landing-section-copy">{copy.liveCopy}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                  <GameCard
                    key={game.slug}
                    game={game}
                    name={game.name}
                    blurb={game.shortBlurb}
                    players={game.players}
                    mode={game.mode}
                    freeLabel={t("free")}
                    imageAlt={game.imageAlt}
                    label={copy.cardLabel.replace("{name}", game.name)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="mx-auto max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                  {copy.overviewEyebrow}
                </p>
                <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                  {copy.overviewTitle}
                </h2>
                <div className="mt-5 space-y-4">
                  {copy.overview.map((paragraph) => (
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
                <h2 className="landing-section-title">{copy.detailsTitle}</h2>
                <p className="landing-section-copy">{copy.detailsCopy}</p>
              </div>

              <div className="space-y-4">
                {games.map((game) => (
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
                        {" · "}
                        {t("free")}
                      </span>
                    </div>

                    <p className="mt-3.5 max-w-3xl text-sm leading-7 text-white/62">
                      {game.detail}
                    </p>

                    <p className="mt-3 max-w-3xl border-s-2 border-white/10 ps-4 text-sm leading-7 text-white/56">
                      <b className="font-semibold text-white/74">{copy.worthKnowing}</b> {game.tip}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <a
                        href={PLAY_URL}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/74 transition-colors hover:text-white"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                        {copy.play.replace("{name}", game.name)}
                      </a>
                      {game.guide ? (
                        <Link
                          href={game.guide}
                          className="inline-flex items-center gap-2 text-sm text-white/56 transition-colors hover:text-white/80"
                        >
                          {copy.readGuide}
                          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-white/52">
                {withLinks(overviewHref ? copy.broader : copy.broaderWithoutGuide, {
                  guide: overviewHref ? (
                    <Link href={overviewHref} className={inlineLink}>
                      {copy.broaderGuideLabel}
                    </Link>
                  ) : null,
                  watch: (
                    <Link href={localizePath(locale, "/watch-together")} className={inlineLink}>
                      {copy.broaderWatchLabel}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </section>

          <section className="landing-section pt-4">
            <div className="landing-shell relative z-10">
              <div className="landing-section-heading">
                <h2 className="landing-section-title">{copy.stepsTitle}</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {copy.steps.map((step, index) => (
                  <article key={step.title} className="rounded-[1.5rem] bg-white/[0.022] px-5 py-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
                      {stepLabel} {index + 1}
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
                <h2 className="landing-section-title">{copy.faqTitle}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {copy.faqs.map((faq) => (
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
