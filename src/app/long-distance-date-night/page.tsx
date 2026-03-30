import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import IntentLandingPage from "@/components/landing/IntentLandingPage";
import { longDistanceDateNightPageData } from "@/content/intent-landing-pages";
import { longDistanceDateNightKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";
const pageUrl = `${baseUrl}/long-distance-date-night`;

export const metadata: Metadata = {
  title: longDistanceDateNightPageData.metadataTitle,
  description: longDistanceDateNightPageData.metadataDescription,
  keywords: longDistanceDateNightKeywords.join(", "),
  openGraph: {
    title: longDistanceDateNightPageData.metadataTitle,
    description: longDistanceDateNightPageData.metadataDescription,
    url: pageUrl,
    type: "website",
    siteName: "Movmash",
    images: [
      {
        url: `${baseUrl}/assets/app-showcase.png`,
        width: 1200,
        height: 630,
        alt: longDistanceDateNightPageData.mediaAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: longDistanceDateNightPageData.metadataTitle,
    description: longDistanceDateNightPageData.metadataDescription,
    creator: "@movmash",
    images: [`${baseUrl}/assets/app-showcase.png`],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function LongDistanceDateNightPage() {
  return (
    <>
      <FAQPageSchema faqs={longDistanceDateNightPageData.faqs} />
      <WebPageSchema
        title={longDistanceDateNightPageData.metadataTitle}
        description={longDistanceDateNightPageData.metadataDescription}
        url={pageUrl}
      />
      <SoftwareApplicationSchema
        url={pageUrl}
        description={longDistanceDateNightPageData.metadataDescription}
        features={[
          "Private rooms",
          "Synced movie watching",
          "Live chat and reactions",
          "Guest-friendly browser join",
          "Screen sharing",
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Long Distance Date Night", url: pageUrl },
        ]}
      />
      <IntentLandingPage data={longDistanceDateNightPageData} />
    </>
  );
}
