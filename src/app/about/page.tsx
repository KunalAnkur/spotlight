import type { Metadata } from "next";
import { Globe, Heart, Lock, Shield, Sparkles, Target, Users, Zap } from "lucide-react";
import SecondaryInfoCard from "@/components/layout/SecondaryInfoCard";
import SecondaryPageHero from "@/components/layout/SecondaryPageHero";
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
      <SecondaryPageHero
        icon={Sparkles}
        title={
          <>
            About <span className="text-gradient">Movmash</span>
          </>
        }
        description="We are building a calmer, more human way to watch together online — with less friction and more shared moments."
      />

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <section className="secondary-surface">
          <div className="secondary-icon-chip bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
            <Target className="h-6 w-6" />
          </div>
          <div className="mt-5 space-y-3">
            <h2 className="secondary-card-title">Our mission</h2>
            <p className="secondary-card-copy">
              Movmash started from a simple belief: distance should not make shared
              experiences feel distant. We want movie nights, episode drops, and
              spontaneous “watch this with me” moments to feel easy again.
            </p>
          </div>
        </section>

        <section className="secondary-surface">
          <div className="secondary-icon-chip bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500">
            <Zap className="h-6 w-6" />
          </div>
          <div className="mt-5 space-y-3">
            <h2 className="secondary-card-title">What we do</h2>
            <p className="secondary-card-copy">
              We bring together synchronized playback, room chat, reactions, file
              streaming, and screen sharing so people can spend less time setting up and
              more time actually enjoying something together.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-5xl">
        <div className="landing-section-heading mb-8 md:mb-10">
          <h2 className="landing-section-title text-2xl md:text-3xl">What guides us</h2>
          <p className="landing-section-copy">
            The product should feel welcoming, fast, and quietly reliable — never noisy
            or complicated.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <SecondaryInfoCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl">
        <div className="landing-section-heading mb-8 md:mb-10">
          <h2 className="landing-section-title text-2xl md:text-3xl">
            Privacy and trust
          </h2>
          <p className="landing-section-copy">
            Good shared experiences only work when people feel safe, respected, and in
            control.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trustFeatures.map((feature) => (
            <SecondaryInfoCard key={feature.title} {...feature} className="secondary-surface-soft" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl text-center">
        <div className="secondary-surface">
          <div className="secondary-page-hero-icon bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 mb-5">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="secondary-card-title text-2xl md:text-3xl">Why it matters</h2>
          <p className="secondary-page-copy mt-4">
            Whether it is a movie night with friends, a long-distance date, or a room
            full of your community, Movmash exists to make those moments easier to start
            and nicer to share.
          </p>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
