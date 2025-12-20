import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FileText, Monitor, Users, FileCheck, Copyright, AlertCircle, RefreshCw, Mail, CheckCircle2 } from "lucide-react";

const sections = [
  {
    icon: CheckCircle2,
    number: "1",
    title: "Acceptance of Terms",
    description: "By accessing or using Movmash, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Monitor,
    number: "2",
    title: "Description of Service",
    description: "Movmash is a watch party platform that enables users to watch videos together in real-time. Our service includes synchronized video playback, live chat, and screen sharing capabilities.",
    items: [],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Users,
    number: "3",
    title: "User Responsibilities",
    description: "When using Movmash, you agree to:",
    items: [
      "Only share content you have the right to share",
      "Respect copyright and intellectual property rights",
      "Not use the service for illegal or harmful purposes",
      "Not attempt to disrupt or compromise the service",
      "Treat other users with respect in chat and interactions",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: FileCheck,
    number: "4",
    title: "Content Policy",
    description: "You are responsible for the content you share through Movmash. We do not pre-screen content, but we reserve the right to remove content that violates these terms or is deemed inappropriate.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Copyright,
    number: "5",
    title: "Intellectual Property",
    description: "Movmash and its original content, features, and functionality are owned by Movmash and are protected by international copyright, trademark, and other intellectual property laws.",
    items: [],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: AlertCircle,
    number: "6",
    title: "Limitation of Liability",
    description: "Movmash is provided \"as is\" without warranties of any kind. We are not responsible for any damages or losses resulting from your use of the service.",
    items: [],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: RefreshCw,
    number: "7",
    title: "Changes to Terms",
    description: "We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.",
    items: [],
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "8",
    title: "Contact",
    description: "For questions about these Terms of Service, contact us at",
    items: [],
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    email: "support@movmash.com",
  },
];

export default function TermsPage() {
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-2">
              Last updated: December 2024
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto">
              Please read these terms carefully. By using Movmash, you agree to be bound by these terms.
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
            <div className="text-center pt-6 animate-slide-up" style={{ animationDelay: "0.9s" }}>
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10">
                <FileText className="w-5 h-5 text-rose-400" />
                <span className="text-sm md:text-base font-medium text-white/80">
                  These terms help ensure a safe and respectful experience for all users.
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

