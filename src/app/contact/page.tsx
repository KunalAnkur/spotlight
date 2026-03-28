import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Shield } from "lucide-react";
import SecondaryInfoCard from "@/components/layout/SecondaryInfoCard";
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
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => (
            <SecondaryInfoCard key={method.title} {...method} className="secondary-surface-soft" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="secondary-surface">
          <div className="max-w-2xl">
            <div className="secondary-section-kicker">Message us</div>
            <h2 className="secondary-card-title mt-3">Tell us what is happening</h2>
            <p className="secondary-card-copy mt-3">
              If something feels unclear, broken, or worth improving, send it our way.
              We read every message.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>

          <div className="mt-8 border-t border-white/8 pt-6">
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
            <h3 className="secondary-card-title mt-5 text-xl">What to expect</h3>
            <p className="secondary-card-copy mt-3">
              Most replies go out within one business day, and often quite a bit sooner.
            </p>
          </div>

          <div className="secondary-surface-soft">
            <div className="secondary-icon-chip bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="secondary-card-title mt-5 text-xl">Helpful details</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/64 md:text-[15px]">
              <li>Include the room flow or feature you were using.</li>
              <li>Tell us what felt confusing, broken, or missing.</li>
              <li>Support messages stay private and only help us respond or improve the product.</li>
            </ul>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
