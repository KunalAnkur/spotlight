import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection, { features } from "@/components/landing/FeaturesSection";
import GamesSection from "@/components/landing/GamesSection";
import PricingPreviewSection from "@/components/landing/PricingPreviewSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import { homeFaqs } from "@/components/landing/faq-content";
import { homePageKeywords } from "@/constants/seo-keywords";
import { createPageMetadata, pageUrl } from "@/lib/metadata";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getTranslations, resolveLocale } from "@/i18n/server";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const t = getTranslations(locale, "meta");

  return createPageMetadata({
    title: t("homeTitle"),
    description: t("homeDescription"),
    // The keyword list is English, so it only belongs on the English page.
    keywords: locale === defaultLocale ? homePageKeywords : undefined,
    locale,
  });
}

export default function Home({ params }: { params: { locale: string } }) {
  // A lone segment with a file extension (/wp-login.php, /llms.txt) skips the middleware and
  // arrives here as a "locale". It used to render the English home page with a 200.
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale;
  const url = pageUrl("/", locale);
  const tMeta = getTranslations(locale, "meta");
  const tFeatures = getTranslations(locale, "features");
  const tFaq = getTranslations(locale, "faqItems");
  const faqs = homeFaqs.map(({ key }) => ({
    question: tFaq(`${key}Q`),
    answer: tFaq(`${key}A`),
  }));

  return (
    <>
      {/* Kept for answer engines and LLM extraction, not for a SERP rich result: Google
          restricted FAQ rich results to authoritative government and health sites in 2023. */}
      <FAQPageSchema faqs={faqs} />

      {/* WebPage Schema for home page */}
      <WebPageSchema
        title={tMeta("homeTitle")}
        description={tMeta("homeDescription")}
        url={url}
        inLanguage={locale}
      />

      {/* Lists the same feature copy the page shows, so the structured data always matches
          what is on screen, in whichever language that is. */}
      <SoftwareApplicationSchema
        url={url}
        description={tMeta("homeDescription")}
        features={features.map(({ key }) => tFeatures(`${key}Copy`))}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection locale={locale} />
          <FeaturesSection locale={locale} />
          <GamesSection locale={locale} />
          <PricingPreviewSection locale={locale} />
          <UseCasesSection locale={locale} />
          <HowItWorksSection locale={locale} />
          <PlatformsSection locale={locale} />
          <FAQSection />
          <CTASection locale={locale} />
        </main>
        <Footer />
      </div>
    </>
  );
}
