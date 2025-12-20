"use client";

import { Twitter, Instagram, Mail } from "lucide-react";
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
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
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
    <footer className="bg-[#18181b] border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <div className="mb-4">
              <Link href="/" className="inline-block">
                <span className="text-3xl md:text-4xl font-bold font-display text-gradient">Movmash</span>
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
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-white/60 hover:text-rose-400 hover:from-rose-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-110 border border-white/5"
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
              <h4 className="font-bold font-display mb-4 text-white text-lg">Product</h4>
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
              <h4 className="font-bold font-display mb-4 text-white text-lg">Company</h4>
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
              <h4 className="font-bold font-display mb-4 text-white text-lg">Legal</h4>
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
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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

