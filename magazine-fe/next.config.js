/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/magazines",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
