/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  // Retired blog posts. Each of these was thin content that duplicated a stronger
  // article, so the URL is consolidated into the post that replaced it rather than
  // left to 404 — anything pointing at the old slug keeps its value.
  async redirects() {
    return [
      {
        source: '/blog/virtual-date-ideas-for-long-distance-relationships-that-actually-work',
        destination: '/blog/ldr-date-night-ideas',
        permanent: true,
      },
      {
        source: '/blog/ldr-solution',
        destination: '/blog/watch-movies-together-online-free',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
