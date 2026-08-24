import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
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
import { baseUrl, createPageMetadata } from "@/lib/metadata";
import { getTranslations, resolveLocale } from "@/i18n/server";

export const metadata = createPageMetadata({
  title: "Watch Party App with Online Games | Watch Together | Movmash",
  description:
    "Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions and screen sharing — plus online games to play with friends in the same room.",
  keywords: homePageKeywords,
});

export default function Home({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
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
        title="Watch Party App with Online Games | Watch Together | Movmash"
        description="Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions and screen sharing — plus online games to play with friends in the same room."
        url={baseUrl}
      />

      <SoftwareApplicationSchema
        url={baseUrl}
        description="Watch party app for watching videos together in sync and playing online games with friends in the same room."
        features={[
          "Synced watch party rooms",
          "Screen sharing and local file streaming",
          "Live chat and animated reactions",
          "Online games: Tic-Tac-Toe, Connect 4, Jigsaw",
          "Private room links, no download required",
        ]}
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
