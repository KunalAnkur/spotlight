import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clapperboard,
  Heart,
  LockKeyhole,
  MessageCircle,
  MonitorPlay,
  Play,
  Share2,
  Sparkles,
  Tv2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IntentLandingPageData } from "@/content/intent-landing-pages";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface IntentLandingPageProps {
  data: IntentLandingPageData;
}

export default function IntentLandingPage({ data }: IntentLandingPageProps) {
  const isDateNight = data.slug === "long-distance-date-night";
  const visibleBenefits = data.benefits;

  const heroIcons: LucideIcon[] = isDateNight
    ? [Heart, LockKeyhole, Sparkles]
    : [Tv2, Users, MessageCircle];

  const stepIcons: LucideIcon[] = isDateNight
    ? [LockKeyhole, Share2, Heart]
    : [MonitorPlay, Share2, Clapperboard];

  const scenarioIcons: LucideIcon[] = isDateNight
    ? [Heart, Sparkles, LockKeyhole]
    : [Clapperboard, Tv2, Users];

  const linkIcons: LucideIcon[] = isDateNight
    ? [Tv2, MessageCircle, Clapperboard]
    : [Heart, MessageCircle, Tv2];

  const pageMedia = isDateNight
    ? {
        heroSrc: "/assets/ldrcouple.png",
        heroAlt: "Long-distance couple spending time together online",
        heroCaption: "A softer room setup for nights that should feel calm before they feel technical.",
        heroObject: "object-cover object-center",
        heroAspect: "aspect-[5/4] md:aspect-[6/5]",
        stepsSrc: "/assets/ldrcouple2.png",
        stepsAlt: "Long-distance couple visual for a movie date night",
        stepsObject: "object-cover object-center",
        stepsAspect: "aspect-[16/11]",
        featureSrc: "/assets/ldrcouple3.png",
        featureAlt: "Couple visual for a cozy long-distance date night",
        featureObject: "object-cover object-center",
        featureAspect: "aspect-[5/4] md:aspect-[6/5]",
      }
    : {
        heroSrc: "/assets/friendgroup.png",
        heroAlt: "Friends getting ready for a watch party together online",
        heroCaption: "A friend-first watch party feel that still leads people into a simple room setup.",
        heroObject: "object-cover object-center",
        heroAspect: "aspect-[16/10]",
        stepsSrc: "/assets/remotefriends.png",
        stepsAlt: "Friends joining a watch party together online",
        stepsObject: "object-cover object-center",
        stepsAspect: "aspect-square md:aspect-[1/1]",
        featureSrc: "/assets/friendgroup.png",
        featureAlt: "Friends together for an online watch party",
        featureObject: "object-cover object-center",
        featureAspect: "aspect-[3/2]",
      };

  const theme = isDateNight
    ? {
        accent: "bg-gradient-to-r from-[#e11d48] via-[#db2777] to-[#c026d3] bg-clip-text text-transparent",
        glow: "from-[#e11d48]/16 via-[#db2777]/10 to-[#c026d3]/12",
        chip: "bg-[linear-gradient(180deg,rgba(225,29,72,0.11)_0%,rgba(192,38,211,0.08)_100%)] text-white/74",
        stepCard: "bg-[linear-gradient(180deg,rgba(225,29,72,0.08)_0%,rgba(255,255,255,0.02)_100%)]",
        stepIcon: "bg-[linear-gradient(135deg,rgba(225,29,72,0.18)_0%,rgba(192,38,211,0.14)_100%)] text-[#ffd7e6]",
        featureIcon: "bg-[linear-gradient(135deg,rgba(225,29,72,0.16)_0%,rgba(192,38,211,0.12)_100%)] text-[#ffd7e6]",
        scenarioCard: "bg-[linear-gradient(180deg,rgba(225,29,72,0.07)_0%,rgba(255,255,255,0.018)_100%)]",
        scenarioIcon: "text-rose-200/90",
        faqItem: "bg-white/[0.022] hover:bg-white/[0.034]",
        cta: "bg-[linear-gradient(180deg,rgba(225,29,72,0.05)_0%,rgba(255,255,255,0.02)_100%)]",
        line: "from-[#e11d48]/42 via-[#c026d3]/18 to-transparent",
        check: "text-rose-200/90",
      }
    : {
        accent: "bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#db2777] bg-clip-text text-transparent",
        glow: "from-[#38bdf8]/16 via-[#818cf8]/10 to-[#db2777]/12",
        chip: "bg-[linear-gradient(180deg,rgba(56,189,248,0.11)_0%,rgba(129,140,248,0.08)_100%)] text-white/74",
        stepCard: "bg-[linear-gradient(180deg,rgba(56,189,248,0.08)_0%,rgba(255,255,255,0.02)_100%)]",
        stepIcon: "bg-[linear-gradient(135deg,rgba(56,189,248,0.18)_0%,rgba(129,140,248,0.15)_100%)] text-[#d8f4ff]",
        featureIcon: "bg-[linear-gradient(135deg,rgba(56,189,248,0.16)_0%,rgba(129,140,248,0.12)_100%)] text-[#d8f4ff]",
        scenarioCard: "bg-[linear-gradient(180deg,rgba(129,140,248,0.07)_0%,rgba(255,255,255,0.018)_100%)]",
        scenarioIcon: "text-sky-200/90",
        faqItem: "bg-white/[0.022] hover:bg-white/[0.034]",
        cta: "bg-[linear-gradient(180deg,rgba(56,189,248,0.05)_0%,rgba(255,255,255,0.02)_100%)]",
        line: "from-[#38bdf8]/38 via-[#818cf8]/18 to-transparent",
        check: "text-sky-200/90",
      };

  return (
    <SecondaryPageLayout mainClassName="pb-20 pt-20 md:pb-24 md:pt-24">
      <div className="mx-auto w-full max-w-6xl space-y-16 md:space-y-20">
        <section className="grid gap-10 pt-6 md:gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-center xl:grid-cols-[0.74fr_1.26fr]">
          <div className="w-full text-center lg:max-w-[32rem] lg:text-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40 lg:text-start">
              {data.kicker}
            </p>

            <h1 className="mt-3 font-parkinsans text-[1.72rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white md:text-[2.12rem] lg:text-[2.45rem]">
              {data.title}
              {data.titleAccent ? (
                <>
                  <br />
                  <span className={theme.accent}>{data.titleAccent}</span>
                </>
              ) : null}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/62 md:text-[15px] md:leading-7 lg:mx-0 lg:max-w-lg">
              {data.intro}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button variant="hero" size="lg" asChild className="font-parkinsans">
                <a href={data.ctaHref} target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5" />
                  {data.ctaLabel}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="font-parkinsans">
                <Link href={data.secondaryCtaHref}>
                  {data.secondaryCtaLabel}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              {data.heroSignals.map((signal, index) => {
                const Icon = heroIcons[index] || MonitorPlay;

                return (
                  <span
                    key={signal}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] ${theme.chip}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {signal}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="relative w-full lg:ps-4 xl:ps-8">
            <div className={`pointer-events-none absolute inset-x-10 top-10 -z-10 h-28 bg-gradient-to-r blur-3xl ${theme.glow}`} />
            <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_72px_rgba(0,0,0,0.22)]">
              <Image
                src={pageMedia.heroSrc}
                alt={pageMedia.heroAlt}
                width={1400}
                height={860}
                className={`h-auto w-full ${pageMedia.heroAspect} ${pageMedia.heroObject}`}
                priority
              />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[13px] leading-6 text-white/52 lg:mx-0 lg:text-start">
              {pageMedia.heroCaption}
            </p>
          </div>
        </section>

        {data.overview ? (
          <section className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
              {data.overview.eyebrow}
            </p>
            <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
              {data.overview.title}
            </h2>
            <div className="mt-5 space-y-4">
              {data.overview.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-8 text-white/62 md:text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className={`grid gap-8 lg:items-center ${
            isDateNight ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.84fr_1.16fr]"
          }`}
        >
          <div className={isDateNight ? "space-y-5" : "space-y-4"}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.stepsEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.stepsTitle}
              </h2>
              <p className={`mt-4 text-sm leading-7 text-white/60 md:text-[15px] ${isDateNight ? "max-w-2xl" : "max-w-xl"}`}>
                {data.stepsCopy}
              </p>
            </div>

            <div className="space-y-3.5">
              {data.steps.map((step, index) => {
                const Icon = stepIcons[index] || MonitorPlay;

                return (
                  <article
                    key={step.title}
                    className={`flex gap-4 rounded-[1.5rem] px-5 py-5 md:px-6 ${theme.stepCard}`}
                  >
                    <div className="pt-0.5">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${theme.stepIcon}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-parkinsans text-[1.02rem] font-semibold tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
            <div className="min-w-0">
              <Image
                src={pageMedia.stepsSrc}
                alt={pageMedia.stepsAlt}
                width={1400}
                height={860}
                className={`h-full w-full ${pageMedia.stepsAspect} ${pageMedia.stepsObject}`}
              />
            </div>

            {isDateNight ? (
              <div className="px-6 py-6 md:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/34">
                  Inside the room
                </p>
                <h3 className="mt-3 font-parkinsans text-[1.22rem] font-semibold tracking-tight text-white md:text-[1.38rem]">
                  Clear enough that people can focus on the night, not the layout.
                </h3>
                <div className="mt-5 space-y-3">
                  {data.heroSignals.map((signal) => (
                    <div key={signal} className="flex items-center gap-3 text-sm text-white/64">
                      <Check className={`h-4 w-4 shrink-0 ${theme.check}`} />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {data.modes && data.modes.length > 0 ? (
          <section className="space-y-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.modesEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.modesTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-[15px]">
                {data.modesCopy}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {data.modes.map((mode) => (
                <article key={mode.name} className={`flex flex-col rounded-[1.5rem] px-5 py-5 ${theme.stepCard}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${theme.stepIcon}`}>
                    <mode.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 font-parkinsans text-lg font-semibold tracking-tight text-white">
                    {mode.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/62">{mode.summary}</p>

                  <dl className="mt-5 space-y-3 border-t border-white/6 pt-4 text-sm">
                    {[
                      { term: "Best for", detail: mode.bestFor },
                      { term: "You need", detail: mode.needs },
                      { term: "Worth knowing", detail: mode.limit },
                    ].map((row) => (
                      <div key={row.term}>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                          {row.term}
                        </dt>
                        <dd className="mt-1 leading-6 text-white/60">{row.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_26px_70px_rgba(0,0,0,0.18)]">
            <Image
              src={pageMedia.featureSrc}
              alt={pageMedia.featureAlt}
              width={1400}
              height={860}
              className={`h-full w-full ${pageMedia.featureAspect} ${pageMedia.featureObject}`}
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.benefitEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.benefitTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60 md:text-[15px]">
                {data.benefitCopy}
              </p>
            </div>

            <div className="space-y-5">
              {visibleBenefits.map((benefit) => (
                <article key={benefit.title} className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${theme.featureIcon}`}>
                    <benefit.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-parkinsans text-lg font-semibold tracking-tight text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-7 text-white/62">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {data.scenarios.length > 0 ? (
          <section className="space-y-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.scenarioEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.scenarioTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-[15px]">
                {data.scenarioCopy}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {data.scenarios.map((scenario, index) => {
                const Icon = scenarioIcons[index] || Sparkles;

                return (
                  <article key={scenario.title} className={`rounded-[1.5rem] px-5 py-5 ${theme.scenarioCard}`}>
                    <Icon className={`h-5 w-5 ${theme.scenarioIcon}`} />
                    <h3 className="mt-4 font-parkinsans text-lg font-semibold tracking-tight text-white">
                      {scenario.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-white/62">
                      {scenario.description}
                    </p>
                    <div className={`mt-4 h-px w-16 bg-gradient-to-r ${theme.line}`} />
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {data.guides && data.guides.length > 0 ? (
          <section className="space-y-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.guidesEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.guidesTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-[15px]">
                {data.guidesCopy}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {data.guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-[1.4rem] bg-white/[0.022] px-5 py-5 transition-colors hover:bg-white/[0.035]"
                >
                  <h3 className="font-parkinsans text-[1.02rem] font-semibold tracking-tight text-white transition-colors group-hover:text-white/88">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{guide.description}</p>
                  <span className="mt-3.5 inline-flex items-center gap-2 text-sm text-white/62 transition-colors group-hover:text-white/82">
                    Read the guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {data.platformGroups && data.platformGroups.length > 0 ? (
          <section className="space-y-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                {data.platformsEyebrow}
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
                {data.platformsTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-[15px]">
                {data.platformsCopy}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {data.platformGroups.map((group) => (
                <article key={group.label} className={`rounded-[1.5rem] px-5 py-5 ${theme.scenarioCard}`}>
                  <h3 className="font-parkinsans text-base font-semibold tracking-tight text-white">
                    {group.label}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] ${theme.chip}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-6 text-white/58">{group.note}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
              FAQ
            </p>
            <h2 className="mt-3 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
              Quick answers, kept simple.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className={`overflow-hidden rounded-[1.4rem] border-0 px-4 sm:px-5 ${theme.faqItem}`}
              >
                <AccordionTrigger className="py-4 text-start font-parkinsans text-[0.98rem] font-semibold tracking-tight text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pe-4 text-sm leading-7 text-white/60 sm:pe-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="grid gap-5 pt-2 md:grid-cols-3">
            {data.exploreLinks.map((link, index) => {
              const Icon = linkIcons[index] || ArrowRight;

              return (
                <Link key={link.href} href={link.href} className="group rounded-[1.4rem] bg-white/[0.02] px-5 py-5 transition-colors hover:bg-white/[0.03]">
                  <Icon className={`h-5 w-5 ${theme.scenarioIcon}`} />
                  <h3 className="mt-4 font-parkinsans text-base font-semibold tracking-tight text-white transition-colors group-hover:text-white/86">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {link.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/66 transition-colors group-hover:text-white/82">
                    <span>Open page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 font-parkinsans text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[2rem]">
            {data.finalTitle}
          </h2>

          <p className="mx-auto mb-9 max-w-2xl text-[15px] leading-7 text-white/66 md:text-base md:leading-8">
            {data.finalCopy}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="lg" asChild className="font-parkinsans">
              <a href={data.ctaHref} target="_blank" rel="noopener noreferrer">
                <Play className="h-5 w-5" />
                {data.ctaLabel}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="font-parkinsans">
              <Link href={data.secondaryCtaHref}>
                {data.secondaryCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="landing-meta-line mt-12">
            {data.finalSignals.map((signal) => (
              <div key={signal} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {signal}
              </div>
            ))}
          </div>
        </section>
      </div>
    </SecondaryPageLayout>
  );
}
