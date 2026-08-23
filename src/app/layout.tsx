import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WebsiteSchema from "@/components/SEO/WebsiteSchema";
import MovmashBackdrop from "@/components/layout/MovmashBackdrop";
import { baseKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const rootMetadata = createPageMetadata({
  title: "Watch Party App | Watch Together Online | Movmash",
  description:
    "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
  keywords: baseKeywords,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  ...rootMetadata,
  title: {
    default: "Watch Party App | Watch Together Online | Movmash",
    template: "%s | Movmash",
  },
  authors: [{ name: "Movmash" }],
  creator: "Movmash",
  publisher: "Movmash",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  other: {
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
