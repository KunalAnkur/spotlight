const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

interface BlogSchemaProps {
  title?: string;
  description?: string;
  url?: string;
  posts?: Array<{
    title: string;
    url: string;
    datePublished?: string;
  }>;
}

export default function BlogSchema({
  title = "Movmash Blog",
  description = "Insights, tips, and stories to help you get the most out of Movmash.",
  url = `${baseUrl}/blog`,
  posts = [],
}: BlogSchemaProps) {
  // Use ItemList schema - Google recognizes this as a rich result type for listing pages
  // This will show up as a separate valid item in Google Rich Results Test
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description: description,
    url: url,
    publisher: {
      "@type": "Organization",
      name: "Movmash",
      url: baseUrl,
    },
  };

  // Add blog posts as list items (but don't make them full Article schemas)
  if (posts.length > 0) {
    schema.numberOfItems = posts.length;
    schema.itemListElement = posts.map((post: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: post.url,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

