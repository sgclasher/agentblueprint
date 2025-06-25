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

    // Suppress Supabase realtime-js critical dependency warning
    config.module.parser = {
      ...config.module.parser,
      javascript: {
        ...config.module.parser?.javascript,
        exprContextCritical: false,
      },
    };

    // Alternative: Filter out specific warnings
    const originalWarnings = config.stats?.warnings ?? true;
    config.stats = {
      ...config.stats,
      warnings: originalWarnings,
      warningsFilter: [
        ...(config.stats?.warningsFilter || []),
        /Critical dependency: the request of a dependency is an expression/,
        /node_modules\/@supabase\/realtime-js/,
      ],
    };

    return config;
  },
};

export default nextConfig; 