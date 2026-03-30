import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookiesKeywords } from "@/constants/seo-keywords";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Learn how Movmash uses cookies to enhance your experience and protect your privacy. Understand our cookie policy and how to manage your preferences.",
  path: "/cookies",
  keywords: cookiesKeywords,
  openGraph: {
    title: "Cookie Policy - Movmash",
    description:
      "Learn how Movmash uses cookies to enhance your experience and protect your privacy.",
  },
});

export default function CookiesPage() {
  redirect("/legal?tab=cookies");
}
