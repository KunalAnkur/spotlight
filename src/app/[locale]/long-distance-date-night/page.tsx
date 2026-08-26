import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import IntentLandingPage from "@/components/landing/IntentLandingPage";
import { longDistanceDateNightPageData } from "@/content/intent-landing-pages";
import { longDistanceDateNightKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata } from "@/lib/metadata";

const pageUrl = `${baseUrl}/long-distance-date-night`;

export const metadata = createPageMetadata({
  title: longDistanceDateNightPageData.metadataTitle,
  description: longDistanceDateNightPageData.metadataDescription,
  path: "/long-distance-date-night",
  keywords: longDistanceDateNightKeywords,
});

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
          "Private rooms for two on the free plan",
          "Synced playback held on one shared clock",
          "Live chat and reactions beside the video",
          "Browser join with no account for the guest",
          "Screen sharing for Netflix, Disney+ and Prime Video",
          "Local file streaming from the host's computer",
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
