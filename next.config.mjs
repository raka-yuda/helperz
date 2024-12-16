import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  output: 'standalone',
  env: {
    UMAMI_SCRIPT_URL: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
    UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // Additional MDX options can go here
  },
})(nextConfig);