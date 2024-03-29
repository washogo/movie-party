/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["image.tmdb.org", "firebasestorage.googleapis.com"],
  },
  trailingSlash: true,
};
