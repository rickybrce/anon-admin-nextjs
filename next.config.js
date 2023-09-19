/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.kinance.io", "localhost"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
