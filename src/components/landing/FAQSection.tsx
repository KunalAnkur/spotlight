"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Shield, Users, Globe, Zap, FileVideo, Monitor } from "lucide-react";

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
    answer: "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch Netflix, Disney+, or any other streaming service together.",
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
    <section id="faq" className="py-20 md:py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background glow - matching costume app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-3 md:mb-4 text-white">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about Movmash. Your privacy and security are our top priorities.
          </p>
        </div>

        {/* FAQ Accordion - Modern design */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group relative animate-slide-up border-b-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Glow effect on hover - matching costume app pattern */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${faq.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 data-[state=open]:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Card - glass morphism matching costume app */}
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-xl overflow-hidden">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group/trigger [&>svg]:text-white/60 [&>svg]:hover:text-rose-400 [&>svg]:transition-colors">
                    <div className="flex items-center gap-4 w-full text-left">
                      {/* Icon with gradient background */}
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${faq.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                          <faq.icon className="w-6 h-6 text-white" />
                        </div>
                        {/* Icon glow */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${faq.gradient} opacity-0 group-hover/trigger:opacity-30 blur-md transition-opacity duration-300`}></div>
                      </div>
                      
                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-bold font-display text-white">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="pl-16">
                      <div className="relative">
                        {/* Decorative line */}
                        <div className={`absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b ${faq.gradient} opacity-30`}></div>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10">
            <Shield className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-medium text-white/80">
              Your privacy is protected. All data is encrypted and secure.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

