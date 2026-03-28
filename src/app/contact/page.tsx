import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Mail, MessageCircle, type LucideIcon } from "lucide-react";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { ContactForm } from "@/components/landing/ContactForm";
import { movmashSocialLinks } from "@/components/shared/MovmashSocialLinks";
import { contactKeywords } from "@/constants/seo-keywords";
import { cn } from "@/lib/utils";

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

const contactMethods: Array<{
  icon: LucideIcon;
  title: string;
  content: ReactNode;
  gradientClassName: string;
}> = [
  {
    icon: Mail,
    title: "Email",
    content: (
      <a href="mailto:support@movmash.com" className="secondary-inline-link text-base">
        support@movmash.com
      </a>
    ),
    gradientClassName: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: MessageCircle,
    title: "Social",
    content: (
      <div className="flex flex-wrap gap-2.5 pt-1">
        {movmashSocialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white/[0.04] px-3 py-2 text-sm text-white/72 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              <span
                className={cn(
                  "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                  social.contactChipClassName
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", social.contactIconClassName)} />
              </span>
              <span className="leading-none">{social.label}</span>
            </a>
          );
        })}
      </div>
    ),
    gradientClassName: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
];

export default function ContactPage() {
  return (
    <SecondaryPageLayout mainClassName="pb-10 md:pb-12">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
        <div className="space-y-8 lg:pt-4">
          <div className="max-w-lg space-y-4">
            <div className="secondary-section-kicker">Contact</div>
            <h1 className="landing-section-title text-left text-3xl md:text-[2.75rem]">
              Reach out without the friction.
            </h1>
            <p className="secondary-page-copy max-w-[34rem]">
              Questions, feedback, or something not working right. Send a note and we will take a look.
            </p>
          </div>

          <div className="space-y-1">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;

              return (
                <div
                  key={method.title}
                  className={cn(
                    "flex items-center gap-4 py-4",
                    index > 0 ? "border-t border-white/6" : ""
                  )}
                >
                  <div
                    className={cn(
                      "secondary-icon-chip h-10 w-10 flex-shrink-0 rounded-[1rem] md:h-11 md:w-11",
                      method.gradientClassName
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/36">
                      {method.title}
                    </p>
                    <div className="mt-1 text-sm text-white/74 md:text-[15px]">
                      {method.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="secondary-surface rounded-[1.75rem] p-6 md:p-8 lg:p-9">
          <div className="max-w-xl">
            <div className="secondary-section-kicker">Send a message</div>
            <p className="mt-3 text-sm text-white/58 md:text-[15px]">
              Keep it simple. We will read it carefully.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
