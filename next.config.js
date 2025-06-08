/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Configure which pages to export
  trailingSlash: true,
  output: 'export',
};

module.exports = nextConfig; 