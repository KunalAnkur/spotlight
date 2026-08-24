import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import WebPageSchema from "@/components/SEO/WebPageSchema";
import AffiliateShopCatalog from "@/components/affiliate/AffiliateShopCatalog";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { watchPartyShopKeywords } from "@/constants/seo-keywords";
import { fetchAffiliateProducts } from "@/lib/affiliate-products";
import { baseUrl, createPageMetadata } from "@/lib/metadata";

const pageUrl = `${baseUrl}/watch-party-shop`;

const title = "Watch Party Gifts & Movie Night Finds";
const description =
  "Gift ideas for movie nights and long-distance couples — mugs, cushions, keepsakes and comfort picks, hand-checked and linked straight to Amazon.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/watch-party-shop",
  keywords: watchPartyShopKeywords,
});

// The feed changes rarely and the page has to be crawlable, so it is rebuilt on a timer
// rather than per request.
export const revalidate = 1800;

const buyingNotes = [
  {
    title: "Pick the thing that gets used weekly",
    body: "A mug or a blanket earns its keep because it shows up on an ordinary Tuesday, not just once. Keepsakes that live in a drawer stop meaning much after the first week, which is why the list leans toward everyday objects rather than occasion pieces.",
  },
  {
    title: "Comfort beats gadgets for long sessions",
    body: "Most watch parties run two hours or more. Something warm and something to lean on does more for that than another accessory, especially when one person is watching late at night in a different time zone.",
  },
  {
    title: "Shared objects work better than solo ones",
    body: "Matching pairs — two mugs, two bracelets — give a long-distance night a small shared ritual. Both people reach for the same thing at the same time, which is the whole point of watching together in the first place.",
  },
];

const shopFaqs = [
  {
    question: "Does Movmash sell these products?",
    answer:
      "No. Every item links out to Amazon, which handles the sale, payment, shipping, and returns. Movmash is not the merchant and never sees your order.",
  },
  {
    question: "Does Movmash make money from these links?",
    answer:
      "Yes, when a purchase is made through one of them, at no extra cost to you. It is the same price you would pay reaching Amazon any other way.",
  },
  {
    question: "Why are prices shown in rupees?",
    answer:
      "The current feed links to Amazon India, so prices show in INR. Opening a link from another country will usually redirect you to your local Amazon storefront, where pricing and availability may differ.",
  },
];

export default async function WatchPartyShopPage() {
  const products = await fetchAffiliateProducts();

  return (
    <>
      <WebPageSchema title={title} description={description} url={pageUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Watch Party Shop", url: pageUrl },
        ]}
      />
      {/* Plain ListItems rather than Product nodes: Movmash is not the merchant, so claiming
          Product/Offer markup for someone else's listing would misrepresent who is selling. */}
      {products.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: title,
              description,
              url: pageUrl,
              numberOfItems: products.length,
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: product.name,
                url: product.href,
              })),
            }),
          }}
        />
      ) : null}

      <SecondaryPageLayout mainClassName="pb-20 pt-20 md:pb-24 md:pt-24">
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <section className="space-y-3 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300/72">
              Shop
            </p>
            <div className="max-w-3xl space-y-4">
              <h1 className="font-parkinsans text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[2.4rem]">
                Watch party gifts and movie night finds
              </h1>
              <p className="text-sm leading-8 text-white/62 md:text-[15px]">
                A short, deliberately unglamorous list of things that make a shared movie night
                or a long-distance evening a bit better — mugs, cushions, small keepsakes. It is
                the same feed that shows up inside Movmash rooms, so nothing here is padding.
              </p>
              <p className="text-sm leading-8 text-white/62 md:text-[15px]">
                Everything links out to Amazon. Movmash does not sell, ship, or handle returns on
                any of it, and we earn a commission when something is bought through a link —
                at no extra cost to you.
              </p>
            </div>
          </section>

          <AffiliateShopCatalog initialProducts={products} />

          <section className="space-y-5 border-t border-white/6 pt-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/36">
                How to choose
              </p>
              <h2 className="mt-3 font-parkinsans text-[1.5rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[1.9rem]">
                What actually gets used after the first week.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {buyingNotes.map((note) => (
                <article key={note.title} className="rounded-[1.5rem] bg-white/[0.022] px-5 py-5">
                  <h3 className="font-parkinsans text-base font-semibold tracking-tight text-white">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{note.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-5 border-t border-white/6 pt-10">
            <h2 className="font-parkinsans text-[1.5rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[1.9rem]">
              Before you buy
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {shopFaqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] bg-white/[0.022] px-5 py-5">
                  <h3 className="font-parkinsans text-[0.98rem] font-semibold tracking-tight text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/60">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </SecondaryPageLayout>
    </>
  );
}
