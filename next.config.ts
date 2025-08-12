import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Recommended: this will reduce output
  // Docker image size by 80%+
  output: 'standalone',
  // Optional: bring your own cache handler
  // cacheHandler: path.resolve('./cache-handler.mjs'),
  // cacheMaxMemorySize: 0, // Disable default in-memory caching
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  // Nginx will do gzip compression. We disable
  // compression here so we can prevent buffering
  // streaming responses
  compress: false,
  // Optional: override the default (1 year) `stale-while-revalidate`
  // header time for static pages
  // swrDelta: 3600 // seconds
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
