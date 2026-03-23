import type { Metadata } from "next";
import {
  AlertCircle,
  CheckCircle2,
  Copyright,
  FileCheck,
  FileText,
  Mail,
  Monitor,
  RefreshCw,
  Users,
} from "lucide-react";
import SecondaryPolicyPage from "@/components/layout/SecondaryPolicyPage";
import { termsKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Movmash's Terms of Service. Understand your rights and responsibilities when using our watch party platform.",
  keywords: termsKeywords.join(", "),
  openGraph: {
    title: "Terms of Service - Movmash",
    description:
      "Read Movmash's Terms of Service. Understand your rights and responsibilities when using our platform.",
    url: `${baseUrl}/terms`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Terms of Service",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
};

const sections = [
  {
    icon: CheckCircle2,
    number: "1",
    title: "Acceptance of terms",
    description:
      "By accessing or using Movmash, you agree to these terms. If you do not agree, please do not use the service.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Monitor,
    number: "2",
    title: "What the service does",
    description:
      "Movmash helps people watch together in real time with synchronized playback, room chat, reactions, and screen sharing tools.",
    items: [],
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Users,
    number: "3",
    title: "User responsibilities",
    description: "When you use Movmash, you agree to:",
    items: [
      "Only share content you have the right to share",
      "Respect copyright and intellectual property rights",
      "Avoid illegal, abusive, or harmful behavior",
      "Avoid disrupting or attempting to compromise the service",
      "Treat other participants respectfully",
    ],
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: FileCheck,
    number: "4",
    title: "Content policy",
    description:
      "You are responsible for the content you bring into rooms. We may remove content or restrict use if it violates these terms or creates harm.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Copyright,
    number: "5",
    title: "Intellectual property",
    description:
      "Movmash and its original product features remain the property of Movmash and are protected under applicable intellectual property laws.",
    items: [],
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: AlertCircle,
    number: "6",
    title: "Limitation of liability",
    description:
      "Movmash is provided as-is. We cannot guarantee uninterrupted service and are not liable for losses arising from ordinary use of the product.",
    items: [],
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: RefreshCw,
    number: "7",
    title: "Changes to terms",
    description:
      "We may update these terms over time. Continued use after an update means you accept the revised version.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "8",
    title: "Contact",
    description: "Questions about these Terms of Service can be sent to",
    items: [],
    email: "support@movmash.com",
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
];

export default function TermsPage() {
  return (
    <SecondaryPolicyPage
      icon={FileText}
      title={
        <>
          Terms of <span className="text-gradient">service</span>
        </>
      }
      updatedLabel="Last updated: December 2024"
      description="These terms explain the responsibilities that help keep Movmash respectful, safe, and dependable for everyone using it."
      sections={sections}
      note="These terms are here to keep the experience fair, safe, and clear for every room participant."
      noteIcon={FileText}
    />
  );
}
