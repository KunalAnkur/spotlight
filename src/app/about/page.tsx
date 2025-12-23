import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Heart, Users, Zap, Shield, Lock, Sparkles, Target, Globe } from "lucide-react";
import { aboutKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  title: "About Movmash",
  description: "Learn about Movmash - our mission to bring people together through shared experiences. Discover our values, what we do, and our commitment to privacy and security.",
  keywords: aboutKeywords.join(", "),
  openGraph: {
    title: "About Movmash",
    description: "Learn about Movmash - our mission to bring people together through shared experiences.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Movmash",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

const values = [
  {
    icon: Heart,
    title: "Built with Love",
    description: "Every feature is designed with user experience in mind. We care about making your watch parties seamless and enjoyable.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-600/30 via-pink-600/25 to-fuchsia-600/30",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We listen to our users and build what matters to them. Your feedback shapes our platform.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
    bgGradient: "from-pink-600/30 via-fuchsia-600/25 to-purple-600/30",
  },
  {
    icon: Zap,
    title: "Always Improving",
    description: "We're constantly adding new features and improvements to make Movmash even better.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgGradient: "from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30",
  },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your rooms are private by default. Only people with the link can join.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Lock,
    title: "Secure & Encrypted",
    description: "All communications are encrypted. Your data stays safe and secure.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "No Data Storage",
    description: "We don't store your video files. Everything stays on your device.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#18181b]">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.06)_0%,_transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-4 animate-float-subtle">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              About <span className="text-gradient">Movmash</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Bringing people together through shared experiences.
            </p>
          </div>

          <div className="max-w-5xl mx-auto  space-y-12">
            {/* Mission Section */}
            <section className="group relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-white">Our Mission</h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                      Movmash was born from a simple idea: distance shouldn&apos;t keep friends and family 
                      from enjoying movies together. We believe that shared experiences create lasting 
                      bonds, and watching something together — even when apart — can feel just as 
                      meaningful as being in the same room.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Do Section */}
            <section className="group relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500 p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-white">What We Do</h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                      We&apos;ve built a platform that makes virtual watch parties effortless. Whether you&apos;re 
                      syncing a YouTube video, sharing your screen to watch Netflix, or streaming your 
                      personal video collection, Movmash keeps everyone perfectly in sync. Add in 
                      real-time chat and animated reactions, and it&apos;s the closest thing to being there.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative animate-slide-up h-full flex"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${value.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <div className="relative w-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-7 transition-all duration-300 group-hover:-translate-y-2 flex flex-col">
                    <div className="mb-4">
                      <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                          <value.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}></div>
                      </div>
                    </div>
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                        {value.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust & Safety Section */}
            <section className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-3 text-white">
                  Your <span className="text-gradient">Privacy & Security</span>
                </h2>
                <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                  We take your privacy seriously. Your data is protected, encrypted, and never stored on our servers.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {trustFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group relative animate-slide-up"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-7 transition-all duration-300 group-hover:-translate-y-2">
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-4`}>
                        <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}></div>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold font-display mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Join Us Section */}
            <section className="group relative animate-slide-up" style={{ animationDelay: "1s" }}>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 transition-all duration-300 text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-white">Join Us</h2>
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                  Whether it&apos;s movie night with friends, a family gathering, or watching the latest 
                  episode with your online community, Movmash is here to make it happen. We&apos;re 
                  excited to be part of your shared moments.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

