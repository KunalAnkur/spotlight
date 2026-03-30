interface SoftwareApplicationSchemaProps {
  name?: string;
  description: string;
  url: string;
  features?: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export default function SoftwareApplicationSchema({
  name = "Movmash",
  description,
  url,
  features = [],
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Watch Party App",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    url,
    description,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Movmash",
      url: baseUrl,
    },
    featureList: features,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
