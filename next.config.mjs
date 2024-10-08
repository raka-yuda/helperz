import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // Additional MDX options can go here
  },
})(nextConfig);