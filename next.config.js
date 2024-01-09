/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, 
    serverComponentsExternalPackages: ["mongoose"],
    typedRoutes: true
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Adjust the path according to your API routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Use specific domain here for better security
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
