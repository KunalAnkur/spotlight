"use client";

import { useState, useEffect } from "react";
import { Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useLocale, useT } from "@/i18n/LocaleProvider";

const navLinks = [
  { key: "features", href: "/#features", hash: "features" },
  { key: "games", href: "/games", hash: "" },
  { key: "howItWorks", href: "/#how-it-works", hash: "how-it-works" },
  { key: "pricing", href: "/#pricing", hash: "pricing" },
  { key: "shop", href: "/watch-party-shop", hash: "" },
  { key: "faq", href: "/#faq", hash: "faq" },
  { key: "blog", href: "/blog", hash: "" },
];

const Navbar = () => {
  const t = useT("nav");
  const locale = useLocale();
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
    // If it's a regular page link (not a hash link), let it navigate normally
    if (!hash) {
      setIsMobileMenuOpen(false);
      return;
    }

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
    /* Pinned flush to the top edge, full-bleed. The bar used to float 16px down with
       transparent gutters, so while scrolling you could see the page sliding through the gap
       above and beside it. Nothing passes above this bar now: it is transparent at rest, and
       on scroll an opaque wash and blur fade in edge to edge. */
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors [transition-duration:250ms]",
        isScrolled && "bg-[#09090c]/[0.88] backdrop-blur-[16px]"
      )}
    >
      <div className="landing-header-shell">
        <nav className="flex h-[60px] w-full items-center gap-[26px]">
          {/* Logo */}
          <Link
            href="/"
            className="me-auto flex items-center gap-2.5 font-parkinsans text-lg font-semibold tracking-[-0.02em] text-white/90 transition-opacity hover:opacity-80"
          >
            <Image
              src="/android-chrome-512x512.png"
              alt="Movmash Logo"
              width={26}
              height={26}
              className="h-[26px] w-[26px] shrink-0 rounded-full"
            />
            Movmash
          </Link>

          {/* Desktop Navigation — right-aligned next to the buttons rather than absolutely
              centred, so it never collides with the brand on a narrow desktop window. */}
          <div className="hidden items-center gap-[22px] font-parkinsans text-[13.5px] font-medium text-white/72 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.hash)}
                className={cn(
                  "whitespace-nowrap transition-colors duration-200 hover:text-white",
                  link.href === pathname && "text-white"
                )}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* One CTA, a notch smaller than the page button — a header control, not a CTA
              block. Login lived here too, but it lands in the same place: app.movmash.com
              sends you to sign-in when you are not already in. */}
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSwitcher locale={locale} label={t("language")} />
            <Button
              variant="hero"
              asChild
              className="h-[34px] rounded-[10px] px-3.5 font-parkinsans text-[13px] [&_svg]:size-3.5"
            >
              <a href="https://app.movmash.com" rel="noopener noreferrer">
                <Play className="fill-current" strokeWidth={0} />
                {t("startParty")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center text-white/72 transition-colors hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("toggleMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
          </button>
        </nav>
      </div>

      {/* The hairline only exists once the bar has a body to sit under. */}
      <div
        aria-hidden="true"
        className={cn(
          "h-px w-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-opacity [transition-duration:250ms]",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile Menu — hangs off the bar and is tinted, because it opens over the hero video. */}
      {isMobileMenuOpen && (
        <div className="animate-slide-up border-t border-white/[0.07] bg-[#0c0b0f]/[0.96] backdrop-blur-[16px] md:hidden">
          <div className="landing-header-shell pb-[18px] pt-3">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.hash)}
                  className="rounded-[10px] px-3 py-3 font-parkinsans text-[15px] font-medium text-white/76 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="landing-open-divider mt-3 flex items-center justify-between gap-2 pt-3.5">
                <LanguageSwitcher locale={locale} label={t("language")} />
                <Button variant="hero" size="sm" asChild className="flex-1 font-parkinsans">
                  <a href="https://app.movmash.com" rel="noopener noreferrer">
                    <Play className="fill-current" strokeWidth={0} />
                    {t("startParty")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
