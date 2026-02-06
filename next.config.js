/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.BASE_PATH || (isProd ? '/cursor-review' : '')

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig
