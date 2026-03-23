"use client";

import { ChevronDown, FileVideo, Globe, HelpCircle, Monitor, Shield, Users, Zap } from "lucide-react";

const faqs = [
  {
    question: "Is Movmash free to use?",
    answer: "Yes! Movmash is completely free to use. Create rooms, invite friends, and watch together without any subscription or payment required.",
    icon: Zap,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    emoji: "✨",
  },
  {
    question: "Do my friends need to create an account?",
    answer: "Friends can join and watch without creating an account. However, creating a room or being the host requires signing in with Google for a seamless experience.",
    icon: Users,
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    emoji: "👥",
  },
  {
    question: "What platforms can I watch together?",
    answer: "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch premium streaming services or any other platform together.",
    icon: Globe,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    emoji: "🌐",
  },
  {
    question: "How does screen sharing work?",
    answer: "In Stream mode, you can share your browser tab, application window, or entire screen. For best audio quality, we recommend sharing a browser tab. Everyone in the room will see and hear exactly what you're sharing.",
    icon: Monitor,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    emoji: "🖥️",
  },
  {
    question: "Can I watch local video files with friends?",
    answer: "Absolutely! In Stream mode, you can upload video files from your computer and stream them to everyone in the room. Your files stay on your computer — we don't store them on our servers.",
    icon: FileVideo,
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    emoji: "📁",
  },
  {
    question: "Is there a limit on room participants?",
    answer: "Currently, Movmash supports multiple participants in each room. For the best experience, we recommend keeping rooms under 50 participants.",
    icon: Users,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    emoji: "👫",
  },
  {
    question: "What browsers are supported?",
    answer: "Movmash works best on modern browsers like Chrome, Firefox, Edge, and Safari. For screen sharing features, we recommend using Chrome or Edge for the best audio capture support.",
    icon: Globe,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    emoji: "🌍",
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes, we take privacy seriously. Rooms are private by default — only people with the room link can join. We don't store your video files, and all communications are encrypted.",
    icon: Shield,
    gradient: "from-pink-500 via-rose-500 to-pink-500",
    emoji: "🔒",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="landing-section-title mb-3 md:mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="landing-section-copy">
            Everything you need to know about Movmash. Your privacy and security are our top priorities.
          </p>
        </div>

        {/* FAQ Accordion - Modern design */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="landing-card-surface group relative overflow-hidden rounded-2xl animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-none">
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
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/60 transition-transform duration-200 group-open:rotate-180 group-open:text-rose-300" />
                </summary>

                <div className="px-6 pb-6 pt-0">
                  <div className="pl-16">
                    <p className="text-sm leading-7 text-white/68 md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
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
