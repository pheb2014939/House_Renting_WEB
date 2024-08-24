/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "a0.muscache.com",
      
    ],
  },
};

export default nextConfig;
