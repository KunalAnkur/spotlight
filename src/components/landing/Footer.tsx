"use client";

import { Twitter, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features", hash: "features" },
    { label: "How It Works", href: "/#how-it-works", hash: "how-it-works" },
    { label: "FAQ", href: "/#faq", hash: "faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal?tab=privacy" },
    { label: "Terms of Service", href: "/legal?tab=terms" },
    { label: "Cookie Policy", href: "/legal?tab=cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/movmash", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/movmash", label: "Instagram" }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleProductLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
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
      <div className="landing-shell py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <div className="mb-4">
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
            <p className="text-base text-white/60 mb-6 leading-relaxed">
              Watch videos together, no matter where you are. Real-time sync, live chat, and fun reactions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center text-white/58 transition-colors duration-200 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {/* Product Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-parkinsans text-lg font-semibold tracking-tight text-white">Product</h4>
              <ul className="space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleProductLinkClick(e, link.hash)}
                      className="text-white/60 hover:text-rose-400 transition-colors text-base inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-parkinsans text-lg font-semibold tracking-tight text-white">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-rose-400 transition-colors text-base inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-parkinsans text-lg font-semibold tracking-tight text-white">Legal</h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-rose-400 transition-colors text-base inline-block"
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
        <div className="landing-open-divider flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} Movmash. Made with <span className="text-rose-400">❤️</span> for movie lovers.
          </p>
          <a 
            href="mailto:support@movmash.com" 
            className="flex items-center gap-2 text-sm text-white/50 hover:text-rose-400 transition-colors"
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
