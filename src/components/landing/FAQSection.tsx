"use client";

import { Gamepad2, Globe, Monitor, Shield, Sparkles, Tv, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaqs } from "@/components/landing/faq-content";
import { useT } from "@/i18n/LocaleProvider";

const faqIcons = [
  { icon: Zap, gradient: "from-rose-500 via-pink-500 to-fuchsia-500" },
  { icon: Gamepad2, gradient: "from-pink-500 via-fuchsia-500 to-purple-500" },
  { icon: Sparkles, gradient: "from-fuchsia-500 via-purple-500 to-indigo-500" },
  { icon: Users, gradient: "from-rose-500 via-pink-500 to-fuchsia-500" },
  { icon: Globe, gradient: "from-pink-500 via-fuchsia-500 to-purple-500" },
  { icon: Monitor, gradient: "from-fuchsia-500 via-purple-500 to-indigo-500" },
  { icon: Tv, gradient: "from-rose-500 via-pink-500 to-fuchsia-500" },
  { icon: Users, gradient: "from-pink-500 via-fuchsia-500 to-purple-500" },
  { icon: Shield, gradient: "from-fuchsia-500 via-purple-500 to-indigo-500" },
];

const FAQSection = () => {
  const t = useT("faq");
  const tItem = useT("faqItems");

  return (
    <section id="faq" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
            {t("title")}
          </h2>
          <p className="landing-section-copy">
            {t("subtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mx-auto flex max-w-[820px] flex-col gap-3.5"
        >
          {homeFaqs.map((faq, index) => {
            const { icon: Icon, gradient } = faqIcons[index % faqIcons.length];

            return (
              <AccordionItem
                key={faq.key}
                value={`faq-${index}`}
                className="landing-card-surface relative animate-slide-up overflow-hidden rounded-[20px] border-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <AccordionTrigger className="gap-4 px-[22px] py-[18px] text-start hover:no-underline [&>svg]:h-[19px] [&>svg]:w-[19px] [&>svg]:text-white/60 [&>svg]:[transition-duration:320ms] [&[data-state=open]>svg]:text-rose-300">
                  <div className="flex w-full items-center gap-4 text-start">
                    <div className={`landing-icon-block bg-gradient-to-br ${gradient}`}>
                      <Icon className="h-[21px] w-[21px] text-white" />
                    </div>

                    <h3 className="flex-1 font-parkinsans text-[15.5px] font-semibold tracking-[-0.01em] text-white">
                      {tItem(`${faq.key}Q`)}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-5 ps-[22px] pe-[22px] pt-0 sm:ps-[84px]">
                  <p className="text-[14.5px] leading-[1.75] text-white/68">{tItem(`${faq.key}A`)}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
