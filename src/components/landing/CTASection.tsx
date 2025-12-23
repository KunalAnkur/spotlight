import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#18181b]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e11d48]/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c026d3]/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 text-white">
            Ready for Your Next{" "}
            <span className="text-gradient">Watch Party?</span>
          </h2>
          
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join thousands of friends, families, and communities watching together every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5" />
                Start Free Watch Party
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#features">
                Explore Features
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              No downloads required
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Works on all devices
            </div>
          </div>

          {/* Quick Links for SEO - Helps Google understand site structure for sitelinks */}
          <nav className="mt-16 pt-8 border-t border-white/10" aria-label="Quick links">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/about" className="text-white/60 hover:text-rose-400 transition-colors">
                About Us
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/blog" className="text-white/60 hover:text-rose-400 transition-colors">
                Blog
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/contact" className="text-white/60 hover:text-rose-400 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

