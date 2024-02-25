/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "dkstatics-public.digikala.com",
            pathname: "**",
          },
        ],
      },
      reactStrictMode: true,
      distDir: "build",
};
export default nextConfig;
