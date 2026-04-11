"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MovmashSocialLinks from "@/components/shared/MovmashSocialLinks";
import { Button } from "@/components/ui/button";

interface FooterLinkItem {
  label: string;
  href: string;
  hash?: string;
}

const footerLinks = {
  product: [
    { label: "Features", href: "/#features", hash: "features" },
    { label: "How It Works", href: "/#how-it-works", hash: "how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Watch Party Shop", href: "/watch-party-shop" },
    { label: "Watch Together", href: "/watch-together" },
    { label: "Date Night", href: "/long-distance-date-night" },
    { label: "FAQ", href: "/#faq", hash: "faq" },
  ] satisfies FooterLinkItem[],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ] satisfies FooterLinkItem[],
  legal: [
    { label: "Privacy Policy", href: "/legal?tab=privacy" },
    { label: "Terms of Service", href: "/legal?tab=terms" },
    { label: "Cookie Policy", href: "/legal?tab=cookies" },
  ] satisfies FooterLinkItem[],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleProductLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash?: string) => {
    if (!hash) {
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
  };

  return (
    <footer className="landing-open-divider">
      <div className="landing-shell py-8 md:py-9">
        {/* Main Footer Content */}
        <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-10">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <div className="mb-3">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Movmash Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
                <span className="font-parkinsans text-2xl font-semibold tracking-tight text-white">Movmash</span>
              </Link>
            </div>
            <p className="mb-4 max-w-sm text-sm leading-7 text-white/60 md:text-[15px]">
              Watch videos together, no matter where you are. Real-time sync, live chat, and fun reactions.
            </p>
            {/* Social Links */}
            <MovmashSocialLinks />
            <div className="mt-5">
              <Button variant="outline" asChild className="font-parkinsans">
                <Link href="/pricing">Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap gap-7 md:gap-9 lg:gap-10">
            {/* Product Links */}
            <div className="flex flex-col">
              <h4 className="mb-3 font-parkinsans text-base font-semibold tracking-tight text-white">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleProductLinkClick(e, link.hash)}
                      className="inline-block text-sm text-white/60 transition-colors hover:text-white md:text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h4 className="mb-3 font-parkinsans text-base font-semibold tracking-tight text-white">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-white/60 transition-colors hover:text-white md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col">
              <h4 className="mb-3 font-parkinsans text-base font-semibold tracking-tight text-white">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-white/60 transition-colors hover:text-white md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="landing-open-divider flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} Movmash. Made with ❤️ for movie lovers.
          </p>
          <a 
            href="mailto:support@movmash.com" 
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>support@movmash.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
