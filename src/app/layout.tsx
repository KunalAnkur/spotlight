import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WebsiteSchema from "@/components/SEO/WebsiteSchema";
import MovmashBackdrop from "@/components/layout/MovmashBackdrop";
import { baseKeywords } from "@/constants/seo-keywords";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Movmash - Watch Together, Anywhere",
    template: "%s | Movmash",
  },
  description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
  keywords: baseKeywords.join(", "),
  authors: [{ name: "Movmash" }],
  creator: "Movmash",
  publisher: "Movmash",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Movmash",
    title: "Movmash - Watch Together, Anywhere",
    description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Movmash - Watch Together, Anywhere",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movmash - Watch Together, Anywhere",
    description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
    creator: "@movmash",
    images: [`${baseUrl}/assets/logo-square.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-512x512.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  // Hilltop ad service
  other: {
    fd87cbf9bf3e75b83b4c217a0c8b87af091a3348: "fd87cbf9bf3e75b83b4c217a0c8b87af091a3348",
    referrer: "no-referrer-when-downgrade",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen text-white">
          <MovmashBackdrop />
          <div className="relative z-10">
            <OrganizationSchema />
            <WebsiteSchema />
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </div>
        </div>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}
