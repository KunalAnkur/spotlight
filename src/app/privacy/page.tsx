import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { privacyKeywords } from "@/constants/seo-keywords";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information. We take your privacy seriously.",
  path: "/privacy",
  keywords: privacyKeywords,
  openGraph: {
    title: "Privacy Policy - Movmash",
    description:
      "Your privacy is important to us. Learn how Movmash collects, uses, and protects your information.",
  },
});

export default function PrivacyPage() {
  redirect("/legal?tab=privacy");
}
