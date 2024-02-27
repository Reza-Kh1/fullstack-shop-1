/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.systemgroup.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "roozrang.ir",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  distDir: "build",
};
export default nextConfig;
