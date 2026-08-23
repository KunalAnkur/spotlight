const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

/**
 * The single WebSite node for the site.
 *
 * This used to be two nodes — one here and one in SiteNavigationSchema — both claiming
 * `@id: <baseUrl>/#website` with different mainEntity lists. Google merges structured data
 * by @id, so a pair of conflicting claims for the same id gets discarded rather than
 * arbitrated. One node, one nav list.
 *
 * Pricing points at the /#pricing section: the marketing site has no /pricing route, and the
 * full plan comparison lives in the app.
 */
const navigation = [
  { name: 'Features', url: `${baseUrl}/#features` },
  { name: 'Games', url: `${baseUrl}/games` },
  { name: 'How It Works', url: `${baseUrl}/#how-it-works` },
  { name: 'Pricing', url: `${baseUrl}/#pricing` },
  { name: 'Watch Together', url: `${baseUrl}/watch-together` },
  { name: 'Long Distance Date Night', url: `${baseUrl}/long-distance-date-night` },
  { name: 'Watch Party Shop', url: `${baseUrl}/watch-party-shop` },
  { name: 'Blog', url: `${baseUrl}/blog` },
  { name: 'About', url: `${baseUrl}/about` },
  { name: 'Contact', url: `${baseUrl}/contact` },
];

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Movmash",
    url: baseUrl,
    description:
      "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: navigation.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
