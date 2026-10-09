/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-67fe5ceccbdf450888e33f1555aad41e.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        pathname: '/**',
      }
    ],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;