/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  serverExternalPackages: ["pdf-parse-new"],
};

module.exports = nextConfig;
