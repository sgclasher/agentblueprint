/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cssChunking: 'strict',
  },
  
  // Optimize for PDF generation with Puppeteer
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude puppeteer from webpack bundling on server
      config.externals = [...(config.externals || []), 'puppeteer-core'];
    }
    return config;
  },
};

export default nextConfig; 