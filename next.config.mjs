/** @type {import('next').NextConfig} */
const nextConfig = {
  // No external image domains needed — all images are local (public folder)
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
