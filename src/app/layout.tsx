import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WebsiteSchema from "@/components/SEO/WebsiteSchema";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Movmash - Watch Together, Anywhere",
    template: "%s | Movmash",
  },
  description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
  keywords: ["watch party", "video sync", "watch together", "virtual watch party", "movie night", "friends", "streaming", "synchronized video"],
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
        url: `${baseUrl}/og-image.png`,
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
    images: [`${baseUrl}/og-image.png`],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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
        <OrganizationSchema />
        <WebsiteSchema />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}

