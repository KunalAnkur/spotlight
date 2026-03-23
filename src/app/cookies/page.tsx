import type { Metadata } from "next";
import { Cookie, Info, Layers, Mail, Settings, Sliders } from "lucide-react";
import SecondaryPolicyPage from "@/components/layout/SecondaryPolicyPage";
import { cookiesKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Movmash uses cookies to enhance your experience and protect your privacy. Understand our cookie policy and how to manage your preferences.",
  keywords: cookiesKeywords.join(", "),
  openGraph: {
    title: "Cookie Policy - Movmash",
    description:
      "Learn how Movmash uses cookies to enhance your experience and protect your privacy.",
    url: `${baseUrl}/cookies`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Cookie Policy",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/cookies`,
  },
};

const sections = [
  {
    icon: Info,
    number: "1",
    title: "What cookies are",
    description:
      "Cookies are small text files saved on your device to help a website remember settings and improve how the experience feels from visit to visit.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Settings,
    number: "2",
    title: "How we use them",
    description: "Movmash uses cookies for a small set of practical reasons:",
    items: [
      "Authentication so you stay signed in during your session",
      "Preferences so your settings do not need to be chosen again",
      "Analytics so we can understand usage patterns and improve the product",
    ],
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Layers,
    number: "3",
    title: "Types of cookies",
    description: "Different cookies support different parts of the experience:",
    items: [
      "Essential cookies for core product functionality",
      "Functional cookies for remembering choices and preferences",
      "Analytics cookies for measuring and improving service quality",
    ],
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Sliders,
    number: "4",
    title: "Managing cookies",
    description:
      "You can control or remove cookies from your browser settings. Disabling some cookies may affect how parts of Movmash work.",
    items: [],
    gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Mail,
    number: "5",
    title: "Contact",
    description: "Questions about our cookie policy can be sent to",
    items: [],
    email: "support@movmash.com",
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
  },
];

export default function CookiesPage() {
  return (
    <SecondaryPolicyPage
      icon={Cookie}
      title={
        <>
          Cookie <span className="text-gradient">policy</span>
        </>
      }
      updatedLabel="Last updated: December 2024"
      description="Here is how cookies help Movmash remember your preferences and improve the product without overwhelming your privacy."
      sections={sections}
      note="We use cookies responsibly to keep the experience smoother while respecting your privacy."
      noteIcon={Cookie}
    />
  );
}
