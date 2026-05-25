/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The protected HTML lives outside /public on purpose so it is never
  // statically served. It is only emitted by /api/content after auth.
  // Force-include it in the serverless function bundle on Vercel:
  experimental: {
    outputFileTracingIncludes: {
      "/api/content": ["./protected/**"],
    },
  },
};
export default nextConfig;
