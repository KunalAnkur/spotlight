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
import { defaultLocale, dirFor, locales, type Locale } from "@/i18n/config";
import { getMessages, resolveLocale } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "../globals.css";

const rootMetadata = createPageMetadata({
  title: "Watch Party App | Watch Together Online | Movmash",
  description:
    "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
  keywords: baseKeywords,
});

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = resolveLocale(params.locale);
  const isDefault = locale === defaultLocale;

  return {
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
  // Translated variants render at the same clean URL through a middleware rewrite, and
  // Googlebot never sends a locale cookie — so in practice the crawler only ever sees
  // English. If a non-default variant is reached directly it must not compete with the
  // English page it duplicates, which is what keeps SEO English-only as intended.
  robots: {
    index: isDefault,
    follow: true,
    googleBot: {
      index: isDefault,
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
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale: Locale = resolveLocale(params.locale);

  return (
    <html lang={locale} dir={dirFor(locale)}>
      <body>
        <div className="relative min-h-screen text-white">
          <MovmashBackdrop />
          <div className="relative z-10">
            <OrganizationSchema />
            <WebsiteSchema />
            <LocaleProvider locale={locale} messages={getMessages(locale)}>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {children}
              </TooltipProvider>
            </LocaleProvider>
          </div>
        </div>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}
