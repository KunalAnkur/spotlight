import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import PricingPlansGrid from "@/components/pricing/PricingPlansGrid";
import { pricingKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata } from "@/lib/metadata";

const pageUrl = `${baseUrl}/pricing`;

export const metadata = createPageMetadata({
  title: "Pricing | Free and Premium Plans | Movmash",
  description:
    "Compare Movmash Free and Premium plans. Start with 2-person rooms and 2-hour sessions, or upgrade for 50+ participants, unlimited sessions, audio and video calls, and enhanced room UI.",
  path: "/pricing",
  keywords: pricingKeywords,
  openGraph: {
    title: "Movmash Pricing",
    description:
      "See the difference between Movmash Free and Premium for room size, session length, calls, and room experience.",
  },
});

export default function PricingPage() {
  return (
    <>
      <WebPageSchema
        title="Movmash Pricing"
        description="Compare the Free and Premium Movmash plans for room size, session timing, calls, and room experience."
        url={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Pricing", url: pageUrl },
        ]}
      />

      <SecondaryPageLayout mainClassName="pb-16 pt-28 md:pb-20 md:pt-32">
        <section className="mx-auto max-w-6xl space-y-8 md:space-y-10">
          <section className="mx-auto max-w-2xl text-center">
            <div className="secondary-section-kicker">Pricing</div>
            <h1 className="mt-4 font-parkinsans text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-[3.4rem]">
              Choose your plan
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
              Free is for small rooms. Premium is for bigger rooms, longer time,
              and audio or video calls.
            </p>
          </section>

          <PricingPlansGrid />
        </section>
      </SecondaryPageLayout>
    </>
  );
}
