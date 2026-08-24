import { Mail } from "lucide-react";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { ContactForm } from "@/components/landing/ContactForm";
import { movmashSocialLinks } from "@/components/shared/MovmashSocialLinks";
import { contactKeywords } from "@/constants/seo-keywords";
import { createPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Movmash. Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  path: "/contact",
  keywords: contactKeywords,
  openGraph: {
    title: "Contact Movmash",
    description: "Get in touch with Movmash. Have questions? We'd love to hear from you.",
  },
});

export default function ContactPage() {
  return (
    <SecondaryPageLayout mainClassName="pb-16 pt-28 md:pb-20 md:pt-32">
      <section className="mx-auto max-w-6xl space-y-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-6">
          <div className="space-y-6 lg:pe-3">
            <div>
              <h1 className="font-parkinsans text-[1.65rem] font-semibold tracking-tight text-white md:text-[2rem]">
                Contact Us
              </h1>
            </div>

            <div className="space-y-4 border-t border-white/6 pt-5">
              <a
                href="mailto:support@movmash.com"
                className="group flex w-full items-center gap-4 py-1 text-start text-white/78 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 shadow-[0_12px_28px_rgba(244,63,94,0.16)]">
                  <Mail className="h-5 w-5 text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/36">
                    Email
                  </span>
                  <span className="mt-1 block truncate font-medium text-white md:text-[15px]">
                    support@movmash.com
                  </span>
                </span>
              </a>

              {movmashSocialLinks.map((social) => {
                const Icon = social.icon;
                const socialLinkLabel = social.href.replace(/^https?:\/\/(www\.)?/, "");

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex w-full items-center gap-4 py-1 text-start text-white/72 transition-colors duration-200 hover:text-white"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.035] transition-colors duration-200 group-hover:bg-white/[0.06]",
                        social.contactChipClassName
                      )}
                    >
                      <Icon className={cn("h-5 w-5", social.contactIconClassName)} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/36">
                        {social.label}
                      </span>
                      <span className="mt-1 block truncate font-medium text-white/72 md:text-[15px]">
                        {socialLinkLabel}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="secondary-surface rounded-[1.75rem] p-6 md:p-8 lg:p-10 xl:p-11">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
