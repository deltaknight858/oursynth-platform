/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enable styled-components support
    styledComponents: true,
  },
  experimental: {
    // Enable SWC minification
    swcMinify: true,
  },
  // Add support for importing SVGs as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

export default nextConfig;
