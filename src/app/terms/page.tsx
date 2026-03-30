import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { termsKeywords } from "@/constants/seo-keywords";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read Movmash's Terms of Service. Understand your rights and responsibilities when using our watch party platform.",
  path: "/terms",
  keywords: termsKeywords,
  openGraph: {
    title: "Terms of Service - Movmash",
    description:
      "Read Movmash's Terms of Service. Understand your rights and responsibilities when using our platform.",
  },
});

export default function TermsPage() {
  redirect("/legal?tab=terms");
}
