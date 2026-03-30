"use client";

import { FileVideo, Globe, Monitor, Shield, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do guests need to download anything?",
    answer: "No. Guests can join from the browser with the room link, so the room can start without an extra install step.",
    icon: Zap,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    question: "Do my friends need to create an account?",
    answer: "Friends can join and watch without creating an account. However, creating a room or being the host requires signing in with Google for a seamless experience.",
    icon: Users,
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    question: "What platforms can I watch together?",
    answer: "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch premium streaming services or any other platform together.",
    icon: Globe,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    question: "How does screen sharing work?",
    answer: "In Stream mode, you can share your browser tab, application window, or entire screen. For best audio quality, we recommend sharing a browser tab. Everyone in the room will see and hear exactly what you're sharing.",
    icon: Monitor,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    question: "Can I watch local video files with friends?",
    answer: "Absolutely! In Stream mode, you can upload video files from your computer and stream them to everyone in the room. Your files stay on your computer — we don't store them on our servers.",
    icon: FileVideo,
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    question: "Is there a limit on room participants?",
    answer: "Currently, Movmash supports multiple participants in each room. For the best experience, we recommend keeping rooms under 50 participants.",
    icon: Users,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    question: "What browsers are supported?",
    answer: "Movmash works best on modern browsers like Chrome, Firefox, Edge, and Safari. For screen sharing features, we recommend using Chrome or Edge for the best audio capture support.",
    icon: Globe,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes, we take privacy seriously. Rooms are private by default — only people with the room link can join. We don't store your video files, and all communications are encrypted.",
    icon: Shield,
    gradient: "from-pink-500 via-rose-500 to-pink-500",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title mb-3 md:mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="landing-section-copy max-w-6xl mx-auto">
            Everything you need to know about Movmash. Your privacy and security are our top priorities.
          </p>
        </div>

        {/* FAQ Accordion - Modern design */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="landing-card-surface relative overflow-hidden rounded-2xl border-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <AccordionTrigger className="gap-4 px-6 py-5 text-left hover:no-underline [&>svg]:text-white/60 [&>svg]:duration-300 [&[data-state=open]>svg]:text-rose-300">
                  <div className="flex w-full items-center gap-4 text-left">
                    <div className={`landing-icon-block flex-shrink-0 bg-gradient-to-br ${faq.gradient}`}>
                      <faq.icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-parkinsans text-base font-semibold tracking-tight text-white md:text-lg">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="pl-16">
                    <p className="text-sm leading-7 text-white/68 md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-1 py-1 text-sm text-white/72">
            <Shield className="w-5 h-5 text-rose-400" />
            <span className="font-medium">
              Your privacy is protected. All data is encrypted and secure.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
