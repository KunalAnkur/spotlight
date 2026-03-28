import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import IntentLandingPage from "@/components/landing/IntentLandingPage";
import { watchTogetherPageData } from "@/content/intent-landing-pages";
import { watchTogetherKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";
const pageUrl = `${baseUrl}/watch-together`;

export const metadata: Metadata = {
  title: watchTogetherPageData.metadataTitle,
  description: watchTogetherPageData.metadataDescription,
  keywords: watchTogetherKeywords.join(", "),
  openGraph: {
    title: watchTogetherPageData.metadataTitle,
    description: watchTogetherPageData.metadataDescription,
    url: pageUrl,
    type: "website",
    siteName: "Movmash",
    images: [
      {
        url: `${baseUrl}/assets/app-showcase.png`,
        width: 1200,
        height: 630,
        alt: watchTogetherPageData.mediaAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: watchTogetherPageData.metadataTitle,
    description: watchTogetherPageData.metadataDescription,
    creator: "@movmash",
    images: [`${baseUrl}/assets/app-showcase.png`],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function WatchTogetherPage() {
  return (
    <>
      <FAQPageSchema faqs={watchTogetherPageData.faqs} />
      <WebPageSchema
        title={watchTogetherPageData.metadataTitle}
        description={watchTogetherPageData.metadataDescription}
        url={pageUrl}
      />
      <SoftwareApplicationSchema
        url={pageUrl}
        description={watchTogetherPageData.metadataDescription}
        features={[
          "Synced playback",
          "Private room links",
          "Live chat and reactions",
          "Screen sharing",
          "Local file streaming",
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Watch Together", url: pageUrl },
        ]}
      />
      <IntentLandingPage data={watchTogetherPageData} />
    </>
  );
}
