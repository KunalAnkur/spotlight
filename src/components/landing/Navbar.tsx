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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="landing-header-shell pt-4">
        <nav
          className={cn(
            "relative flex h-10 w-full items-center justify-between",
            isScrolled && "rounded-full bg-black/20 backdrop-blur-md"
          )}
        >
          {/* Logo */}
          <Link href="/" className="z-10 flex items-center gap-2.5 text-white/90 transition-opacity hover:opacity-80">
            <Image 
              src="/android-chrome-512x512.png" 
              alt="Movmash Logo" 
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-parkinsans text-xl font-semibold leading-none tracking-tight text-white/90">
              Movmash
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.hash)}
                className="font-parkinsans text-sm font-medium text-white/72 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="z-10 hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild className="h-10 px-1 font-parkinsans text-sm">
              <a href="https://app.movmash.com/login" rel="noopener noreferrer">
                Login
              </a>
            </Button>
            <Button variant="hero" asChild className="font-parkinsans text-sm">
              <a href="https://app.movmash.com" rel="noopener noreferrer" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Party
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="z-10 flex h-10 w-10 items-center justify-center text-white/72 transition-colors hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="landing-subtle-surface mt-3 animate-slide-up rounded-2xl px-4 py-5 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.hash)}
                  className="rounded-xl px-4 py-3 font-parkinsans text-base font-medium text-white/76 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="landing-open-divider flex flex-col gap-3 pt-4">
                <Button variant="ghost" asChild className="w-full font-parkinsans text-sm">
                  <a href="https://app.movmash.com/login" rel="noopener noreferrer">
                    Login
                  </a>
                </Button>
                <Button variant="hero" asChild className="w-full font-parkinsans text-sm">
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
