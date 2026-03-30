import type { Metadata } from "next";
import Image from "next/image";
import { Clapperboard, MessageCircleHeart, Shield, Sparkles, type LucideIcon } from "lucide-react";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { aboutKeywords } from "@/constants/seo-keywords";
import { cn } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "About Movmash",
  description:
    "Learn about Movmash - our mission to bring people together through shared experiences. Discover our values, what we do, and our commitment to privacy and security.",
  keywords: aboutKeywords.join(", "),
  openGraph: {
    title: "About Movmash",
    description:
      "Learn about Movmash - our mission to bring people together through shared experiences.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "About Movmash",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

interface AboutPoint {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName: string;
}

const roomSignals = [
  {
    label: "Sync playback",
    className: "bg-amber-400/8 text-amber-100",
    dotClassName: "bg-amber-300",
  },
  {
    label: "Room chat",
    className: "bg-rose-400/8 text-rose-100",
    dotClassName: "bg-rose-300",
  },
  {
    label: "Reactions",
    className: "bg-violet-400/8 text-violet-100",
    dotClassName: "bg-violet-300",
  },
  {
    label: "Screen share",
    className: "bg-sky-400/8 text-sky-100",
    dotClassName: "bg-sky-300",
  },
];

const aboutPoints: AboutPoint[] = [
  {
    icon: Sparkles,
    title: "Simple to join",
    description: "Links open fast and guests understand the room right away.",
    iconClassName: "bg-amber-400/12 text-amber-200",
  },
  {
    icon: Clapperboard,
    title: "Video stays central",
    description: "The room keeps the watch experience front and center.",
    iconClassName: "bg-rose-400/12 text-rose-200",
  },
  {
    icon: MessageCircleHeart,
    title: "Social without clutter",
    description: "Chat and reactions feel close, not distracting.",
    iconClassName: "bg-violet-400/12 text-violet-200",
  },
  {
    icon: Shield,
    title: "Comfortable to host",
    description: "Private rooms and clear controls make the space easier to trust.",
    iconClassName: "bg-emerald-400/12 text-emerald-200",
  },
];

export default function AboutPage() {
  return (
    <SecondaryPageLayout mainClassName="pb-16 md:pb-20">
      <section className="mx-auto max-w-6xl space-y-[4.5rem] md:space-y-20">
        <section className="relative overflow-hidden rounded-[2.6rem] px-4 py-10 md:px-6 md:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.10),transparent_66%)] blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="secondary-section-kicker">About</div>
            <h1 className="mt-4 font-parkinsans text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[4rem]">
              Built to make watch parties feel easy.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
              Movmash keeps the room clear, social, and simple to join so people can
              focus on watching together instead of figuring things out first.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {roomSignals.map((signal) => (
                <span
                  key={signal.label}
                  className={cn(
                    "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium",
                    signal.className
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", signal.dotClassName)} />
                  {signal.label}
                </span>
              ))}
            </div>

            <div className="relative mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-[2.1rem] bg-white/[0.03] shadow-[0_32px_90px_rgba(0,0,0,0.32)] ring-1 ring-white/6">
              <div className="pointer-events-none absolute inset-x-20 top-5 h-24 bg-gradient-to-r from-[#f59e0b]/12 via-[#f43f5e]/10 to-[#a855f7]/12 blur-3xl" />
              <Image
                src="/assets/realroomrection.png"
                alt="Movmash room interface with video, chat, and reactions"
                width={1280}
                height={720}
                className="relative z-10 h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="space-y-5">
            <div className="secondary-section-kicker">What guides the product</div>
            <div className="max-w-4xl space-y-4">
              <p className="font-parkinsans text-[1.9rem] font-semibold leading-[1.25] tracking-[-0.04em] md:text-[2.6rem]">
                <span className="text-white/34">Sync, chat, reactions, and sharing </span>
                <span className="text-white">in one room that still feels calm.</span>
              </p>
              <p className="max-w-2xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
                The room should help people settle in quickly, see the video clearly,
                and feel comfortable hosting friends without extra explanation.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] bg-white/[0.02] px-5 py-5 ring-1 ring-white/5 md:px-6 md:py-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" />
            <Image
              src="/assets/app-showcase.png"
              alt="Movmash layout preview"
              width={1000}
              height={562}
              className="h-auto w-full rounded-[1.35rem] object-cover"
            />
          </div>
        </section>

        <section className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {aboutPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="border-t border-white/8 pt-5">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                      point.iconClassName
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 space-y-2">
                    <h2 className="font-parkinsans text-[1.12rem] font-semibold tracking-tight text-white md:text-[1.2rem]">
                      {point.title}
                    </h2>
                    <p className="max-w-[28rem] text-sm leading-7 text-white/62 md:text-[15px]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </SecondaryPageLayout>
  );
}
