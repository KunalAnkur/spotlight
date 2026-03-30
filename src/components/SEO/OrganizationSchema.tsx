const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Movmash",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    description:
      "Movmash is a watch party app for watching together online with synced playback, private room links, chat, reactions, and screen sharing.",
    sameAs: [
      "https://twitter.com/movmash",
      "https://instagram.com/movmash",
      "https://www.tiktok.com/@movmash",
      "https://www.linkedin.com/company/movmash",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@movmash.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
