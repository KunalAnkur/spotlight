import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

// FAQ data for schema (matching FAQSection component)
const faqs = [
  {
    question: "Is Movmash free to use?",
    answer: "Yes! Movmash is completely free to use. Create rooms, invite friends, and watch together without any subscription or payment required.",
  },
  {
    question: "Do my friends need to create an account?",
    answer: "Friends can join and watch without creating an account. However, creating a room or being the host requires signing in with Google for a seamless experience.",
  },
  {
    question: "What platforms can I watch together?",
    answer: "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch Netflix, Disney+, or any other streaming service together.",
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
  title: "Watch Together, Anywhere",
  description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance. Perfect for movie nights, TV shows, and shared experiences. Free to use, no account required for guests.",
  keywords: [
    "watch party",
    "watch together",
    "video sync",
    "virtual watch party",
    "movie night",
    "watch movies together",
    "synchronized video",
    "long distance relationships",
    "screen sharing",
    "YouTube watch party",
    "Netflix party",
    "streaming together",
  ],
  openGraph: {
    title: "Movmash - Watch Together, Anywhere",
    description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
    url: baseUrl,
    type: "website",
    siteName: "Movmash",
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
  alternates: {
    canonical: baseUrl,
  },
};

export default function Home() {
  return (
    <>
      {/* FAQPage Schema - Google recognizes this as a rich result type */}
      <FAQPageSchema faqs={faqs} />
      
      {/* WebPage Schema for home page */}
      <WebPageSchema
        title="Movmash - Watch Together, Anywhere"
        description="Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance."
        url={baseUrl}
      />
      
      {/* Breadcrumb Schema for home page */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ShowcaseSection />
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

