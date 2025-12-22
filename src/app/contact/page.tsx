import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Mail, MessageCircle, MapPin, Send, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Movmash. Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  openGraph: {
    title: "Contact Movmash",
    description: "Get in touch with Movmash. Have questions? We'd love to hear from you.",
    url: `${baseUrl}/contact`,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Movmash",
      },
    ],
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours.",
    value: "support@movmash.com",
    href: "mailto:support@movmash.com",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    description: "Connect with us on social media for updates and support.",
    value: "@movmash",
    href: "#",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "We're a remote-first company, working from around the world.",
    value: "Remote-first",
    href: "#",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#18181b]">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.06)_0%,_transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12  animate-slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-4 animate-float-subtle">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Contact Methods Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className="group relative animate-slide-up h-full flex"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${method.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <div className="relative w-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-7 transition-all duration-300 group-hover:-translate-y-2 flex flex-col">
                    <div className="mb-4">
                      <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}></div>
                      </div>
                    </div>
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                        {method.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed mb-3">
                        {method.description}
                      </p>
                      {method.href !== "#" ? (
                        <a 
                          href={method.href}
                          className="text-base md:text-lg font-medium text-rose-400 hover:text-rose-300 transition-colors inline-block"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-base md:text-lg font-medium text-white/80">
                          {method.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Contact Card */}
            <section className="relative animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 transition-all duration-300">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-white">
                    Ready to <span className="text-gradient">Connect</span>?
                  </h2>
                  <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                    Whether you have a question, feedback, or just want to say hello, we&apos;re here to help.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                    <a href="mailto:support@movmash.com" className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send us an Email
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display mb-2 text-white">Quick Response</h3>
                    <p className="text-sm text-white/60">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500 p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#18181b] flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display mb-2 text-white">Secure & Private</h3>
                    <p className="text-sm text-white/60">
                      Your messages are encrypted and kept confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

