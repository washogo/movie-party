/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  images: {
    domains: ["image.tmdb.org", "firebasestorage.googleapis.com"],
  },
  trailingSlash: true,
};
