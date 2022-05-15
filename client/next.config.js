/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ROUTE: "http://localhost:4848"
  }
}

module.exports = nextConfig
