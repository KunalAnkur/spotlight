import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Shield } from "lucide-react";
import SecondaryInfoCard from "@/components/layout/SecondaryInfoCard";
import SecondaryPageHero from "@/components/layout/SecondaryPageHero";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { ContactForm } from "@/components/landing/ContactForm";
import { Button } from "@/components/ui/button";
import { contactKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Movmash. Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  keywords: contactKeywords.join(", "),
  openGraph: {
    title: "Contact Movmash",
    description: "Get in touch with Movmash. Have questions? We'd love to hear from you.",
    url: `${baseUrl}/contact`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Contact Movmash",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email us",
    description:
      "Send us a message and we will usually get back within one business day.",
    footer: (
      <a href="mailto:support@movmash.com" className="secondary-inline-link text-base">
        support@movmash.com
      </a>
    ),
    gradientClassName: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: MessageCircle,
    title: "Social updates",
    description:
      "Follow the latest product updates, launches, and smaller improvements across our channels.",
    footer: <p className="text-base font-medium text-white/80">@movmash</p>,
    gradientClassName: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Remote team",
    description:
      "Movmash is built remotely, which helps us stay flexible and close to our community.",
    footer: <p className="text-base font-medium text-white/80">Working from everywhere</p>,
    gradientClassName: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

export default function ContactPage() {
  return (
    <SecondaryPageLayout>
      <SecondaryPageHero
        icon={MessageCircle}
        title={
          <>
            Get in <span className="text-gradient">touch</span>
          </>
        }
        description="Questions, feedback, and ideas are always welcome. We want support to feel as easy and clear as the product itself."
      />

      <section className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {contactMethods.map((method) => (
            <SecondaryInfoCard key={method.title} {...method} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="secondary-surface">
          <div className="max-w-2xl">
            <h2 className="secondary-card-title">Send a message</h2>
            <p className="secondary-card-copy mt-3">
              If something feels unclear, broken, or worth improving, tell us directly.
              We read every message.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>

          <div className="mt-8">
            <p className="text-sm text-white/48">Prefer email instead?</p>
            <div className="mt-3">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:support@movmash.com">support@movmash.com</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="secondary-surface-soft">
            <div className="secondary-icon-chip bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="secondary-card-title mt-5 text-xl">Quick responses</h3>
            <p className="secondary-card-copy mt-3">
              We usually reply within 24 hours on business days, and often much sooner.
            </p>
          </div>

          <div className="secondary-surface-soft">
            <div className="secondary-icon-chip bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="secondary-card-title mt-5 text-xl">Private by default</h3>
            <p className="secondary-card-copy mt-3">
              Support messages stay confidential, and we only use them to help you or improve the service.
            </p>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
