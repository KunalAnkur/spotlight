import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

export default function TermsPage() {
  redirect("/legal?tab=terms");
}
