import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

export default function PrivacyPage() {
  redirect("/legal?tab=privacy");
}
