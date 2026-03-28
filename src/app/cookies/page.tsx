import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

export default function CookiesPage() {
  redirect("/legal?tab=cookies");
}
