import type { Metadata } from "next";
import LegalPoliciesTabs from "@/components/layout/LegalPoliciesTabs";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { getLegalPolicy, legalPolicies, type LegalPolicyKey } from "@/content/legal-policies";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Legal Policies",
  description:
    "Review Movmash's Privacy Policy, Terms of Service, and Cookie Policy in one place.",
  openGraph: {
    title: "Movmash Legal Policies",
    description:
      "Review Movmash's Privacy Policy, Terms of Service, and Cookie Policy in one place.",
    url: `${baseUrl}/legal`,
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Movmash Legal Policies",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/legal`,
  },
};

interface LegalPageProps {
  searchParams?: {
    tab?: string;
  };
}

export default function LegalPage({ searchParams }: LegalPageProps) {
  const initialTab = getLegalPolicy(searchParams?.tab).key as LegalPolicyKey;

  return (
    <SecondaryPageLayout>
      <LegalPoliciesTabs initialTab={initialTab} policies={legalPolicies} />
    </SecondaryPageLayout>
  );
}
