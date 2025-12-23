interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorImage?: string;
  publisherName?: string;
  publisherLogo?: string;
  categories?: string[];
  keywords?: string[];
}

export default function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorImage,
  publisherName = "Movmash",
  publisherLogo,
  categories = [],
  keywords = [],
}: ArticleSchemaProps) {
  // Build schema object following Google's Article schema requirements
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url, // Add URL directly to Article
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  // Add image if available
  if (image) {
    schema.image = [image];
  }

  // Add author image if available
  if (authorImage) {
    schema.author.image = authorImage;
  }

  // Add publisher logo (use provided or default)
  const logoUrl = publisherLogo || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com'}/assets/logo.svg`;
  schema.publisher.logo = {
    "@type": "ImageObject",
    url: logoUrl,
    width: 512,
    height: 512,
  };

  // Add articleSection (categories) if available
  if (categories.length > 0) {
    schema.articleSection = categories[0]; // Primary category
    schema.keywords = categories.join(", "); // All categories as keywords
  }

  // Add keywords if provided
  if (keywords.length > 0) {
    schema.keywords = schema.keywords 
      ? `${schema.keywords}, ${keywords.join(", ")}`
      : keywords.join(", ");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}


