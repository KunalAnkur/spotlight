import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Cookie, Settings, Layers, Sliders, Mail, CheckCircle2, Info } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn how Movmash uses cookies to enhance your experience and protect your privacy. Understand our cookie policy and how to manage your preferences.",
  openGraph: {
    title: "Cookie Policy - Movmash",
    description: "Learn how Movmash uses cookies to enhance your experience and protect your privacy.",
    url: `${baseUrl}/cookies`,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cookie Policy",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/cookies`,
  },
};

const sections = [
  {
    icon: Info,
    number: "1",
    title: "What Are Cookies",
    description: "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and provide a better experience.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Settings,
    number: "2",
    title: "How We Use Cookies",
    description: "Movmash uses cookies for:",
    items: [
      "Authentication: To keep you signed in during your session",
      "Preferences: To remember your settings and preferences",
      "Analytics: To understand how our service is used and improve it",
    ],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Layers,
    number: "3",
    title: "Types of Cookies We Use",
    description: "We use different types of cookies to enhance your experience:",
    items: [
      "Essential Cookies: Required for the service to function",
      "Functional Cookies: Remember your preferences",
      "Analytics Cookies: Help us improve our service",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Sliders,
    number: "4",
    title: "Managing Cookies",
    description: "You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of Movmash.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "5",
    title: "Contact",
    description: "For questions about our cookie policy, contact us at",
    items: [],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    email: "support@movmash.com",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#18181b]">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.06)_0%,_transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-4 animate-float-subtle">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              Cookie <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-2">
              Last updated: December 2024
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto">
              Learn how we use cookies to enhance your experience and protect your privacy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.number}
                className="relative animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} p-[1px]`}>
                      <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white/40">{section.number}</span>
                        <h2 className="text-xl md:text-2xl font-bold font-display text-white">
                          {section.title}
                        </h2>
                      </div>
                      <p className="text-base text-white/70 leading-relaxed mb-4">
                        {section.description}
                        {section.email && (
                          <>
                            {" "}
                            <a 
                              href={`mailto:${section.email}`} 
                              className="text-rose-400 hover:text-rose-300 transition-colors"
                            >
                              {section.email}
                            </a>
                          </>
                        )}
                      </p>
                      {section.items.length > 0 && (
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                              <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Trust Badge */}
            <div className="text-center pt-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10">
                <Cookie className="w-5 h-5 text-rose-400" />
                <span className="text-sm md:text-base font-medium text-white/80">
                  We use cookies responsibly to improve your experience while respecting your privacy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

