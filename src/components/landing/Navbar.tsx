"use client";

import { useState, useEffect } from "react";
import { Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Features", href: "/#features", hash: "features" },
  { label: "How It Works", href: "/#how-it-works", hash: "how-it-works" },
  { label: "FAQ", href: "/#faq", hash: "faq" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#18181b]/90 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 hover:opacity-80 transition-opacity">
            <Image 
              src="/assets/logo.svg" 
              alt="Movmash Logo" 
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-bold font-display text-white">Movmash</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.hash)}
                className="text-white/80 hover:text-white transition-all duration-300 font-medium text-base px-3 py-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 z-10">
            <Button variant="ghost" asChild className="hover:bg-white/10">
              <a href="https://app.movmash.com/login" rel="noopener noreferrer">
                Login
              </a>
            </Button>
            <Button variant="hero" asChild>
              <a href="https://app.movmash.com" rel="noopener noreferrer" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Party
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#18181b]/95 backdrop-blur-xl border-b border-white/10 py-6 px-4 animate-slide-up">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.hash)}
                  className="text-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium py-3 px-4 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button variant="ghost" asChild className="w-full">
                  <a href="https://app.movmash.com" rel="noopener noreferrer">
                    Login
                  </a>
                </Button>
                <Button variant="hero" asChild className="w-full">
                  <a href="https://app.movmash.com" rel="noopener noreferrer">
                    <Play className="w-4 h-4" />
                    Start Party
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

