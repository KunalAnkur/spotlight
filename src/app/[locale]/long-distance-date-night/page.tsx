import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import IntentLandingPage from "@/components/landing/IntentLandingPage";
import { getIntentLandingPage } from "@/content/intent-landing-pages";
import { longDistanceDateNightKeywords } from "@/constants/seo-keywords";
import { defaultLocale } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { guidesIn } from "@/lib/blog";
import { createPageMetadata, pageUrl } from "@/lib/metadata";

const path = "/long-distance-date-night";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const page = getIntentLandingPage("long-distance-date-night", locale);

  return createPageMetadata({
    title: page.metadataTitle,
    description: page.metadataDescription,
    path,
    // The keyword list is English, so it only belongs on the English page.
    keywords: locale === defaultLocale ? longDistanceDateNightKeywords : undefined,
    locale,
  });
}

export default async function LongDistanceDateNightPage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const page = getIntentLandingPage("long-distance-date-night", locale);
  const url = pageUrl(path, locale);

  return (
    <>
      <FAQPageSchema faqs={page.faqs} />
      <WebPageSchema
        title={page.metadataTitle}
        description={page.metadataDescription}
        url={url}
        inLanguage={locale}
      />
      <SoftwareApplicationSchema
        url={url}
        description={page.metadataDescription}
        features={page.schemaFeatures}
      />
      <BreadcrumbSchema
        items={[
          { name: page.labels.home, url: pageUrl("/", locale) },
          { name: page.breadcrumbName, url },
        ]}
      />
      <IntentLandingPage data={{ ...page, guides: await guidesIn(locale, page.guides ?? []) }} />
    </>
  );
}
