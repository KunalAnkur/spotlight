import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import AffiliateShopCatalog from "@/components/affiliate/AffiliateShopCatalog";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { watchPartyShopKeywords } from "@/constants/seo-keywords";
import { baseUrl, createPageMetadata } from "@/lib/metadata";

const pageUrl = `${baseUrl}/watch-party-shop`;

export const metadata = createPageMetadata({
  title: "Watch Party Shop | Movie Night Finds",
  description:
    "Browse Movmash watch-party finds and affiliate product picks from the same product feed used inside rooms.",
  path: "/watch-party-shop",
  keywords: watchPartyShopKeywords,
});

export default function WatchPartyShopPage() {
  return (
    <>
      <WebPageSchema
        title="Watch Party Shop | Movie Night Finds"
        description="Browse Movmash watch-party finds and affiliate product picks from the same product feed used inside rooms."
        url={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Watch Party Shop", url: pageUrl },
        ]}
      />

      <SecondaryPageLayout mainClassName="pb-20 pt-20 md:pb-24 md:pt-24">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <section className="space-y-3 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300/72">
              Shop
            </p>
            <div className="max-w-3xl space-y-2">
              <h1 className="font-parkinsans text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[2.4rem]">
                Watch Party Shop
              </h1>
              <p className="text-sm leading-7 text-white/58 md:text-[15px]">
                A minimal storefront for the exact same product feed used inside Movmash rooms.
              </p>
            </div>
          </section>

          <AffiliateShopCatalog />
        </div>
      </SecondaryPageLayout>
    </>
  );
}
