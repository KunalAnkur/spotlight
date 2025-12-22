const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

interface WebPageSchemaProps {
  title?: string;
  description?: string;
  url?: string;
  breadcrumbUrl?: string;
}

export default function WebPageSchema({
  title = "Movmash Blog",
  description = "Insights, tips, and stories to help you get the most out of Movmash.",
  url = `${baseUrl}/blog`,
  breadcrumbUrl,
}: WebPageSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    publisher: {
      "@type": "Organization",
      name: "Movmash",
      url: baseUrl,
    },
  };

  // Add breadcrumb reference if provided
  if (breadcrumbUrl) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": breadcrumbUrl,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

