import type { Metadata } from "next";
import { Database, Lock, Mail, Shield, UserCheck } from "lucide-react";
import SecondaryPolicyPage from "@/components/layout/SecondaryPolicyPage";
import { privacyKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information. We take your privacy seriously.",
  keywords: privacyKeywords.join(", "),
  openGraph: {
    title: "Privacy Policy - Movmash",
    description:
      "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information.",
    url: `${baseUrl}/privacy`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
};

const sections = [
  {
    icon: Database,
    number: "1",
    title: "Information we collect",
    description:
      "When you use Movmash, we only collect the minimum information needed to run the service:",
    items: [
      "Basic profile details from Google Sign-In such as your name, email, and avatar",
      "Room activity details like creation time and participant counts",
      "Room chat messages while sessions are active",
    ],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: UserCheck,
    number: "2",
    title: "How we use it",
    description: "That information is used to keep Movmash working well and keep rooms usable:",
    items: [
      "Create and maintain rooms",
      "Show your name and avatar to other room participants",
      "Support synchronized playback and participant management",
      "Improve reliability and overall product quality",
    ],
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Lock,
    number: "3",
    title: "Storage and security",
    description: "Privacy and security are part of the product, not an afterthought:",
    items: [
      "Local video files are not uploaded to our servers",
      "Chat messages are not stored permanently",
      "Data is transmitted using encrypted, industry-standard protocols",
      "We do not sell your personal information",
    ],
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    number: "4",
    title: "Your rights",
    description:
      "You can request access, correction, or deletion of your personal data at any time by contacting support.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "5",
    title: "Contact us",
    description: "If you have questions about this Privacy Policy, reach us at",
    items: [],
    email: "support@movmash.com",
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
];

export default function PrivacyPage() {
  return (
    <SecondaryPolicyPage
      icon={Shield}
      title={
        <>
          Privacy <span className="text-gradient">policy</span>
        </>
      }
      updatedLabel="Last updated: December 2024"
      description="This page explains what we collect, why we collect it, and how we protect it while you use Movmash."
      sections={sections}
    />
  );
}
