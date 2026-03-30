const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Movmash",
    url: baseUrl,
    description:
      "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
    publisher: {
      "@type": "Organization",
      name: "Movmash",
      url: baseUrl,
    },
    // Help Google understand main navigation for sitelinks
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "About",
          url: `${baseUrl}/about`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          url: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contact",
          url: `${baseUrl}/contact`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
