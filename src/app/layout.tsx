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
    default: "Watch Party App | Watch Together Online | Movmash",
    template: "%s | Movmash",
  },
  description:
    "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
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
    title: "Watch Party App | Watch Together Online | Movmash",
    description:
      "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Movmash watch party app for watching together online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Party App | Watch Together Online | Movmash",
    description:
      "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
