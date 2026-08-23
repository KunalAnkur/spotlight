import LegalPoliciesTabs from "@/components/layout/LegalPoliciesTabs";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { getLegalPolicy, legalPolicies, type LegalPolicyKey } from "@/content/legal-policies";
import { legalKeywords } from "@/constants/seo-keywords";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Legal Policies",
  description:
    "Review Movmash's Privacy Policy, Terms of Service, and Cookie Policy in one place.",
  path: "/legal",
  keywords: legalKeywords,
  openGraph: {
    title: "Movmash Legal Policies",
  },
});

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
