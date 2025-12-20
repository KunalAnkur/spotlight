import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { BookOpen, FileText, Lightbulb, Users, ArrowRight } from "lucide-react";

const upcomingTopics = [
  {
    icon: FileText,
    title: "Watch Party Tips",
    description: "Learn how to host the perfect watch party with friends and family.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Lightbulb,
    title: "Feature Updates",
    description: "Stay informed about new features and improvements to Movmash.",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Community Stories",
    description: "Read inspiring stories from our community of watch party hosts.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

export default function BlogPage() {
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
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Coming soon! We&apos;re working on content to help you get the most out of Movmash.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main Coming Soon Card with Integrated Topics */}
            <section className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-12 transition-all duration-300">
                {/* Main Content */}
                <div className="text-center mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-4 text-white">
                    Something <span className="text-gradient">Amazing</span> is Coming
                  </h2>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                    We&apos;re crafting valuable content to help you host unforgettable watch parties. 
                    From expert tips to feature deep-dives, we&apos;ve got you covered.
                  </p>
                </div>

                {/* Topics Grid - Integrated Design */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
                  {upcomingTopics.map((topic, index) => (
                    <div
                      key={topic.title}
                      className="relative animate-slide-up h-full flex"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <div 
                        className="relative w-full bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/5 flex flex-col animate-float-subtle" 
                        style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                      >
                        <div className="flex items-start gap-4 flex-grow">
                          <div className={`relative flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${topic.gradient} p-[1px]`}>
                            <div className="w-full h-full rounded-lg bg-[#18181b] flex items-center justify-center">
                              <topic.icon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <h3 className="text-lg md:text-xl font-bold font-display mb-2 text-white">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed flex-grow">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="text-center pt-6 border-t border-white/10">
                  <p className="text-sm md:text-base text-white/70 mb-4">
                    Follow us on social media to be the first to know when we publish!
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10">
                    <span className="text-sm font-medium text-white/80">Get Notified</span>
                    <ArrowRight className="w-4 h-4 text-rose-400" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

