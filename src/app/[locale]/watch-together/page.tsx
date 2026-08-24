import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import IntentLandingPage from "@/components/landing/IntentLandingPage";
import { watchTogetherPageData } from "@/content/intent-landing-pages";
import { watchTogetherKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata } from "@/lib/metadata";

const pageUrl = `${baseUrl}/watch-together`;

export const metadata = createPageMetadata({
  title: watchTogetherPageData.metadataTitle,
  description: watchTogetherPageData.metadataDescription,
  path: "/watch-together",
  keywords: watchTogetherKeywords,
});

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
          "Synced playback across every viewer",
          "Private room links, no guest account required",
          "Live chat and reactions beside the video",
          "Screen sharing for services that block embedding",
          "Local file streaming from the host's computer",
          "Runs in the browser on desktop and mobile",
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
