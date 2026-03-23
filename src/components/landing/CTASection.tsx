import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="mb-6 font-parkinsans text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Ready for Your Next{" "}
            <span className="text-gradient">Watch Party?</span>
          </h2>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-white/68">
            Start a room in seconds and bring everyone into the same watch experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild className="font-parkinsans">
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5" />
                Start Free Watch Party
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild className="font-parkinsans">
              <a href="#features">
                Explore Features
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="landing-meta-line mt-12">
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
          <nav className="landing-open-divider mt-16 pt-8" aria-label="Quick links">
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
