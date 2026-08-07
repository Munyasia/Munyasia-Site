import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The about portrait is hosted on the same Cloudinary account as the
       ambient video, so next/image can optimize it instead of shipping the
       master. Scoped to the account, not the whole CDN. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmvb8o8z2/**",
      },
    ],
  },
};

export default nextConfig;
