/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.w.org'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
