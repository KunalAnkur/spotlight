import { DefaultSeoProps } from 'next-seo';

// Base URL for your site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

// Default SEO configuration
export const defaultSEO: DefaultSeoProps = {
  defaultTitle: 'Movmash - Watch Together, Anywhere',
  titleTemplate: '%s | Movmash',
  description: 'Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.',
  canonical: baseUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Movmash',
    title: 'Movmash - Watch Together, Anywhere',
    description: 'Watch videos together with friends in perfect sync. Chat, react, and share the moment — no matter the distance.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Movmash - Watch Together, Anywhere',
      },
    ],
  },
  twitter: {
    handle: '@movmash',
    site: '@movmash',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#18181b',
    },
    {
      name: 'keywords',
      content: 'watch party, video sync, watch together, virtual watch party, movie night, friends, streaming, synchronized video',
    },
  ],
};

// Helper function to create page-specific SEO metadata
export function createPageSEO({
  title,
  description,
  path = '',
  image,
  noindex = false,
  nofollow = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}) {
  const url = `${baseUrl}${path}`;
  const imageUrl = image || `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },
    noindex,
    nofollow,
  };
}

