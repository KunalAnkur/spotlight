import type { Metadata } from "next";
import { Heart, Shield, Sparkles, Target, Users, Zap, type LucideIcon } from "lucide-react";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { aboutKeywords } from "@/constants/seo-keywords";

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

interface AboutHighlight {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconClass: string;
  numberClass: string;
  lineClass: string;
}

const summaryItems: AboutHighlight[] = [
  {
    number: "01",
    icon: Target,
    title: "The goal",
    description: "Make shared watching feel quick to start and calm to use.",
    iconClass: "from-rose-500 via-pink-500 to-fuchsia-500",
    numberClass: "text-rose-300/80",
    lineClass: "from-rose-400/55 via-pink-400/20 to-transparent",
  },
  {
    number: "02",
    icon: Zap,
    title: "What we build",
    description: "Sync, chat, reactions, screen sharing, and local file streaming in one room.",
    iconClass: "from-pink-500 via-fuchsia-500 to-purple-500",
    numberClass: "text-pink-300/80",
    lineClass: "from-pink-400/55 via-fuchsia-400/22 to-transparent",
  },
  {
    number: "03",
    icon: Users,
    title: "Why it works",
    description: "Guests understand the room quickly, so hosting feels easy and reassuring.",
    iconClass: "from-fuchsia-500 via-purple-500 to-indigo-500",
    numberClass: "text-fuchsia-300/80",
    lineClass: "from-fuchsia-400/55 via-purple-400/22 to-transparent",
  },
];

const principles: AboutHighlight[] = [
  {
    number: "04",
    icon: Shield,
    title: "Private by default",
    description: "Rooms stay invite-based, so sharing feels more controlled and easier to trust.",
    iconClass: "from-rose-500 via-pink-500 to-fuchsia-500",
    numberClass: "text-rose-200/80",
    lineClass: "from-rose-300/50 via-pink-400/20 to-transparent",
  },
  {
    number: "05",
    icon: Heart,
    title: "Made to feel welcoming",
    description: "The room layout stays social without becoming noisy, cluttered, or hard to follow.",
    iconClass: "from-pink-500 via-fuchsia-500 to-purple-500",
    numberClass: "text-pink-200/80",
    lineClass: "from-pink-300/50 via-fuchsia-400/20 to-transparent",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Always being refined",
    description: "We keep improving sync, flow, and small details that make the product feel smoother.",
    iconClass: "from-fuchsia-500 via-purple-500 to-indigo-500",
    numberClass: "text-fuchsia-200/80",
    lineClass: "from-fuchsia-300/50 via-purple-400/18 to-transparent",
  },
];

function AboutHighlightsSection({
  kicker,
  title,
  copy,
  items,
}: {
  kicker: string;
  title: string;
  copy: string;
  items: AboutHighlight[];
}) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <div className="secondary-section-kicker">{kicker}</div>
        <h2 className="landing-section-title text-left text-2xl md:text-[2.35rem]">{title}</h2>
        <p className="secondary-page-copy max-w-[38rem]">{copy}</p>
      </div>

      <div className="flex w-full flex-wrap justify-between gap-y-10">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="flex basis-full flex-col gap-4 md:basis-[calc((100%-1.5rem)/2)] xl:basis-[calc((100%-3rem)/3)]"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconClass} text-white shadow-[0_14px_30px_rgba(244,63,94,0.12)]`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`font-parkinsans text-[11px] font-semibold uppercase tracking-[0.24em] ${item.numberClass}`}
                    >
                      {item.number}
                    </span>
                    <span className={`h-px flex-1 bg-gradient-to-r ${item.lineClass}`} />
                  </div>
                  <h3 className="font-parkinsans text-xl font-semibold tracking-tight text-white md:text-[1.35rem]">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="pl-16 text-sm leading-7 text-white/68 md:text-[15px]">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <SecondaryPageLayout mainClassName="pb-12 md:pb-14">
      <section className="mx-auto max-w-6xl space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="secondary-section-kicker">About</div>
          <h1 className="landing-section-title text-left text-3xl md:text-[2.9rem]">
            Shared watching should feel effortless.
          </h1>
          <p className="secondary-page-copy max-w-[40rem]">
            Movmash is built for movie nights, episode drops, and the small moments where
            people want to watch together without fighting the setup first.
          </p>
        </div>

        <AboutHighlightsSection
          kicker="Movmash in short"
          title="A calmer way to understand the product"
          copy="The core idea is simple: help people get into a room fast, stay in sync, and keep the experience clear once they are inside."
          items={summaryItems}
        />

        <AboutHighlightsSection
          kicker="Principles"
          title="Built to feel clear, safe, and social"
          copy="Good watch-party tools should stay out of the way. We keep the product focused on comfort, trust, and clarity."
          items={principles}
        />
      </section>
    </SecondaryPageLayout>
  );
}
