import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Shield, Database, Lock, UserCheck, Mail, CheckCircle2 } from "lucide-react";
import { privacyKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information. We take your privacy seriously.",
  keywords: privacyKeywords.join(", "),
  openGraph: {
    title: "Privacy Policy - Movmash",
    description: "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information.",
    url: `${baseUrl}/privacy`,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
};

const sections = [
  {
    icon: Database,
    number: "1",
    title: "Information We Collect",
    description: "When you use Movmash, we collect minimal information necessary to provide our service:",
    items: [
      "Basic profile information from Google Sign-In (name, email, profile picture)",
      "Room activity data (creation times, participant counts)",
      "Chat messages within rooms (temporarily stored during active sessions)",
    ],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: UserCheck,
    number: "2",
    title: "How We Use Your Information",
    description: "We use the collected information solely to:",
    items: [
      "Provide and maintain the Movmash service",
      "Enable room creation and participant management",
      "Display your name and avatar to other room participants",
      "Improve and optimize our service",
    ],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Lock,
    number: "3",
    title: "Data Storage & Security",
    description: "Your privacy and security are our priority:",
    items: [
      "Local video files are never uploaded to our servers",
      "Chat messages are not permanently stored",
      "All data transmission is encrypted using industry-standard protocols",
      "We do not sell or share your personal information with third parties",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    number: "4",
    title: "Your Rights",
    description: "You have the right to access, correct, or delete your personal data. Contact us at support@movmash.com to exercise these rights.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "5",
    title: "Contact Us",
    description: "If you have questions about this Privacy Policy, please contact us at",
    items: [],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    email: "support@movmash.com",
  },
];

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-2">
              Last updated: December 2024
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

