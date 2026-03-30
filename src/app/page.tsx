import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import SiteNavigationSchema from "@/components/SEO/SiteNavigationSchema";
import SoftwareApplicationSchema from "@/components/SEO/SoftwareApplicationSchema";
import { homePageKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

// FAQ data for schema (matching FAQSection component)
const faqs = [
  {
    question: "Do guests need to download anything?",
    answer: "No. Guests can join from the browser with the room link, so the room can start without an extra install step.",
  },
  {
    question: "Do my friends need to create an account?",
    answer: "Friends can join and watch without creating an account. However, creating a room or being the host requires signing in with Google for a seamless experience.",
  },
  {
    question: "What platforms can I watch together?",
    answer: "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch premium streaming services or any other platform together.",
  },
  {
    question: "How does screen sharing work?",
    answer: "In Stream mode, you can share your browser tab, application window, or entire screen. For best audio quality, we recommend sharing a browser tab. Everyone in the room will see and hear exactly what you're sharing.",
  },
  {
    question: "Can I watch local video files with friends?",
    answer: "Absolutely! In Stream mode, you can upload video files from your computer and stream them to everyone in the room. Your files stay on your computer — we don't store them on our servers.",
  },
  {
    question: "Is there a limit on room participants?",
    answer: "Currently, Movmash supports multiple participants in each room. For the best experience, we recommend keeping rooms under 50 participants.",
  },
  {
    question: "What browsers are supported?",
    answer: "Movmash works best on modern browsers like Chrome, Firefox, Edge, and Safari. For screen sharing features, we recommend using Chrome or Edge for the best audio capture support.",
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes, we take privacy seriously. Rooms are private by default — only people with the room link can join. We don't store your video files, and all communications are encrypted.",
  },
];

export const metadata: Metadata = {
  title: "Watch Party App | Watch Together Online | Movmash",
  description:
    "Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions, screen sharing, and local file streaming.",
  keywords: homePageKeywords.join(", "),
  openGraph: {
    title: "Watch Party App | Watch Together Online | Movmash",
    description:
      "Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions, screen sharing, and local file streaming.",
    url: baseUrl,
    type: "website",
    siteName: "Movmash",
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Movmash watch party app for watching together online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Party App | Watch Together Online | Movmash",
    description:
      "Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions, screen sharing, and local file streaming.",
    creator: "@movmash",
    images: [`${baseUrl}/assets/logo-square.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function Home() {
  return (
    <>
      {/* Site Navigation Schema - Helps Google understand site structure for sitelinks */}
      <SiteNavigationSchema />
      
      {/* FAQPage Schema - Google recognizes this as a rich result type */}
      <FAQPageSchema faqs={faqs} />
      
      {/* WebPage Schema for home page */}
      <WebPageSchema
        title="Watch Party App | Watch Together Online | Movmash"
        description="Start a watch party in seconds. Watch together online with synced playback, private room links, live chat, reactions, screen sharing, and local file streaming."
        url={baseUrl}
      />

      <SoftwareApplicationSchema
        url={baseUrl}
        description="Watch party app for watching together online with synced playback, private room links, live chat, reactions, screen sharing, and local file streaming."
        features={[
          "Watch party rooms",
          "Synced playback",
          "Private room links",
          "Live chat and reactions",
          "Screen sharing",
          "Local file streaming",
        ]}
      />
      
      {/* Breadcrumb Schema for home page */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
        ]}
      />
      
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ShowcaseSection />
          <UseCasesSection />
          <HowItWorksSection />
          <PlatformsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
