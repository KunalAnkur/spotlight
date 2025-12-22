const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Movmash",
    url: baseUrl,
    description: "Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


