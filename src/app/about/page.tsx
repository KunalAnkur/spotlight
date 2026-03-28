import type { Metadata } from "next";
import { Globe, Heart, Lock, Shield, Sparkles, Target, Users, Zap } from "lucide-react";
import SecondaryInfoCard from "@/components/layout/SecondaryInfoCard";
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

const values = [
  {
    icon: Heart,
    title: "Built with care",
    description:
      "Every detail is shaped around making watch parties feel easy, reliable, and genuinely fun to use.",
    gradientClassName: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Users,
    title: "Community first",
    description:
      "We keep listening to the people using Movmash so the product keeps evolving in the right direction.",
    gradientClassName: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Always improving",
    description:
      "We keep refining sync, streaming, and room interactions so shared viewing keeps feeling smoother over time.",
    gradientClassName: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Privacy protected",
    description:
      "Rooms stay private by default, and only people with the link can join your session.",
    gradientClassName: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Lock,
    title: "Secure by design",
    description:
      "Core communication stays encrypted so your rooms, messages, and activity feel dependable.",
    gradientClassName: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "File-friendly",
    description:
      "Local video files stay on your own device, which keeps the experience lighter and more private.",
    gradientClassName: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

export default function AboutPage() {
  return (
    <SecondaryPageLayout>
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="secondary-surface">
          <div className="secondary-section-kicker">Our mission</div>
          <div className="secondary-icon-chip mt-5 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
            <Target className="h-6 w-6" />
          </div>
          <div className="mt-5 space-y-4">
            <h2 className="secondary-card-title">Make shared watching feel easy again.</h2>
            <p className="secondary-card-copy">
              Distance should not make movie nights, episode drops, or spontaneous
              “watch this with me” moments feel harder than they need to be. We want
              people to get into the room fast and stay focused on the experience, not
              the setup.
            </p>
          </div>
        </section>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <section className="secondary-surface-soft">
            <div className="secondary-icon-chip bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500">
              <Zap className="h-6 w-6" />
            </div>
            <div className="mt-5 space-y-3">
              <h2 className="secondary-card-title text-[1.2rem] md:text-[1.35rem]">
                What we build
              </h2>
              <p className="secondary-card-copy">
                Sync, room chat, reactions, screen sharing, and file streaming in one
                calm room layout.
              </p>
            </div>
          </section>

          <section className="secondary-surface-soft">
            <div className="secondary-icon-chip bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="mt-5 space-y-3">
              <h2 className="secondary-card-title text-[1.2rem] md:text-[1.35rem]">
                Why people stay
              </h2>
              <p className="secondary-card-copy">
                The product aims to feel familiar right away, so hosting and joining are
                both easy to understand.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="secondary-section-heading">
          <div className="secondary-section-kicker">Principles</div>
          <h2 className="landing-section-title mt-3 text-2xl md:text-3xl">What guides the product</h2>
          <p className="landing-section-copy">
            Every decision tries to keep the room welcoming, lightweight, and easy to
            read.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <SecondaryInfoCard key={value.title} {...value} className="secondary-surface-soft" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="max-w-xl">
          <div className="secondary-section-kicker">Trust</div>
          <h2 className="landing-section-title mt-3 text-left text-2xl md:text-3xl">
            Built to feel safe and clear
          </h2>
          <p className="landing-section-copy mt-4 text-left">
            Shared experiences work best when rooms feel private, dependable, and easy to
            host without second guessing what is happening.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {trustFeatures.map((feature) => (
            <SecondaryInfoCard key={feature.title} {...feature} className="secondary-surface-soft" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl text-center">
        <div className="secondary-surface">
          <div className="secondary-page-hero-icon bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 mb-5">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="secondary-card-title text-2xl md:text-3xl">Why it matters</h2>
          <p className="secondary-page-copy mt-4">
            Whether it is a movie night with friends, a long-distance date, or a room
            full of your community, Movmash is here to make those moments quicker to
            start and nicer to share.
          </p>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
