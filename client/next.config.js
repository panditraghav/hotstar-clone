/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"]
  },
  reactStrictMode: true,
  env: {
    API_ROUTE: "http://localhost:4848"
  }
}

module.exports = nextConfig
