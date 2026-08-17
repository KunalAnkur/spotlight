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

// Pricing lives in the app, not on spotlight — /pricing is not a route here, so pointing at
// it was a 404 from the footer.
const appPricingUrl = "https://app.movmash.com/pricing";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features", hash: "features" },
    { label: "Games", href: "/games" },
    { label: "How It Works", href: "/#how-it-works", hash: "how-it-works" },
    { label: "Pricing", href: appPricingUrl },
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

const footerLinkClassName =
  "inline-block text-sm text-white/60 transition-colors hover:text-white";

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
    <footer className="landing-open-divider relative z-10 mt-[30px] pb-[30px] pt-[42px]">
      <div className="landing-shell">
        {/* Main Footer Content */}
        <div className="flex flex-wrap justify-between gap-9">
          {/* Brand Section */}
          <div className="max-w-[400px] flex-1 basis-[320px]">
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2.5 font-parkinsans text-[22px] font-semibold tracking-[-0.02em] text-white transition-opacity hover:opacity-80"
            >
              <Image
                src="/android-chrome-512x512.png"
                alt="Movmash Logo"
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full"
              />
              Movmash
            </Link>
            <p className="mb-3.5 max-w-[340px] text-sm leading-[1.75] text-white/60">
              Watch videos together, no matter where you are. Real-time sync, live chat, fun
              reactions, and games in the same room.
            </p>

            {/* Social Links */}
            <MovmashSocialLinks
              className="mb-[18px] gap-0.5"
              linkClassName="h-[38px] w-[38px] rounded-[10px] hover:bg-white/[0.05] hover:text-white"
              iconClassName="h-[19px] w-[19px]"
            />

            <Button variant="outline" size="sm" asChild className="font-parkinsans">
              <a href={appPricingUrl} rel="noopener noreferrer">
                Pricing
              </a>
            </Button>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap gap-x-[46px] gap-y-8">
            {/* Product Links */}
            <div className="flex flex-col">
              <h4 className="mb-[13px] font-parkinsans text-[15px] font-semibold tracking-[-0.01em] text-white">
                Product
              </h4>
              <ul className="flex flex-col gap-[9px]">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleProductLinkClick(e, link.hash)}
                      className={footerLinkClassName}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h4 className="mb-[13px] font-parkinsans text-[15px] font-semibold tracking-[-0.01em] text-white">
                Company
              </h4>
              <ul className="flex flex-col gap-[9px]">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={footerLinkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col">
              <h4 className="mb-[13px] font-parkinsans text-[15px] font-semibold tracking-[-0.01em] text-white">
                Legal
              </h4>
              <ul className="flex flex-col gap-[9px]">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={footerLinkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="landing-open-divider mt-[34px] flex flex-wrap items-center justify-between gap-4 pt-[22px] text-[13.5px] text-white/50">
          <p>© {currentYear} Movmash. Made with ❤️ for movie lovers.</p>
          <a
            href="mailto:support@movmash.com"
            className="inline-flex items-center gap-[9px] transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span>support@movmash.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
