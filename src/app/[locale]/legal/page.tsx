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

// No searchParams here: reading them made this page render on the server for every visit.
// It is now static, and LegalPoliciesTabs picks up ?tab= in the browser.
export default function LegalPage() {
  const initialTab = getLegalPolicy().key as LegalPolicyKey;

  return (
    <SecondaryPageLayout>
      <LegalPoliciesTabs initialTab={initialTab} policies={legalPolicies} />
    </SecondaryPageLayout>
  );
}
