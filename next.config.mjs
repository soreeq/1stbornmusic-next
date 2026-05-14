/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'soulmanager.pl' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/vision', 'styled-components'],
};

export default nextConfig;
