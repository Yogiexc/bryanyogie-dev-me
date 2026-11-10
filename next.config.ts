import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "bryanyogie-dev-me.vercel.app",
          },
        ],
        destination: "https://bryanyogie.is-a.dev/:path*",
        permanent: true, // 301 Permanent Redirect (SEO safe)
      },
    ];
  },
};

export default nextConfig;
