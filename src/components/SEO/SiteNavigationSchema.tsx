const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export default function SiteNavigationSchema() {
  // SiteNavigationElement schema helps Google understand your navigation structure
  // This helps Google create sitelinks (alt başlıklar) in search results
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Movmash",
    publisher: {
      "@type": "Organization",
      name: "Movmash",
    },
    // Main navigation items that should appear as sitelinks
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          url: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          url: `${baseUrl}/about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Blog",
          url: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 4,
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

